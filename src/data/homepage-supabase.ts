import { createClient } from '@supabase/supabase-js';
import type { HomepageContent } from '~/types/cms';
import { defaultHomepageContent } from './homepage';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper to check if an object has the shape of HomepageContent
const isHomepageContent = (obj: unknown): obj is HomepageContent => {
  if (!obj || typeof obj !== 'object') return false;

  // Check for required top-level properties
  const requiredProps = ['hero', 'tagline', 'certifications', 'products', 'features', 'showcase'];
  for (const prop of requiredProps) {
    if (!(prop in obj)) return false;
  }

  return true;
};

// Get homepage content from Supabase
export const getHomepageContentFromSupabase = async (): Promise<HomepageContent> => {
  try {
    // Get latest homepage content
    const { data, error } = await supabase
      .from('homepage_content')
      .select('content')
      .order('updated_at', { ascending: false })
      .limit(1);

    if (error) {
      console.error('Error fetching homepage content:', error);
      return defaultHomepageContent;
    }

    // Check if data exists and content is valid
    if (data?.length > 0 &&
        typeof data[0]?.content === 'object' &&
        data[0]?.content &&
        isHomepageContent(data[0]?.content)) {
      return data[0].content;
    }

    // If no content is found or content is empty, initialize with default content
    await saveHomepageContentToSupabase(defaultHomepageContent);
    return defaultHomepageContent;
  } catch (e) {
    console.error('Failed to get homepage content from Supabase:', e);
    return defaultHomepageContent;
  }
};

// Save homepage content to Supabase
export const saveHomepageContentToSupabase = async (content: HomepageContent): Promise<boolean> => {
  try {
    // Check if we have any records
    const { data: existingData, error: checkError } = await supabase
      .from('homepage_content')
      .select('id')
      .limit(1);

    if (checkError) {
      console.error('Error checking homepage content:', checkError);
      return false;
    }

    let saveResult;

    if (existingData?.length > 0 && existingData[0]?.id) {
      // Update the existing record
      saveResult = await supabase
        .from('homepage_content')
        .update({ content })
        .eq('id', existingData[0].id);
    } else {
      // Insert a new record
      saveResult = await supabase
        .from('homepage_content')
        .insert([{ content }]);
    }

    if (saveResult.error) {
      console.error('Error saving homepage content:', saveResult.error);
      return false;
    }

    return true;
  } catch (e) {
    console.error('Failed to save homepage content to Supabase:', e);
    return false;
  }
};
