import { createClient } from '@supabase/supabase-js';
import type { AboutPageContent } from '~/types/cms';
import { defaultAboutPageContent } from './about';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper to check if an object has the shape of AboutPageContent
const isAboutPageContent = (obj: unknown): obj is AboutPageContent => {
  if (!obj || typeof obj !== 'object') return false;

  // Check for required top-level properties
  const requiredProps = ['hero', 'mainTitle', 'features', 'processSteps', 'profiles', 'certificateSections'];
  for (const prop of requiredProps) {
    if (!(prop in obj)) return false;
  }

  return true;
};

// Get about page content from Supabase
export const getAboutPageContentFromSupabase = async (): Promise<AboutPageContent> => {
  try {
    // Get latest about page content
    const { data, error } = await supabase
      .from('about_page_content')
      .select('content')
      .order('updated_at', { ascending: false })
      .limit(1);

    if (error) {
      console.error('Error fetching about page content:', error);
      return defaultAboutPageContent;
    }

    // Check if data exists and content is valid
    if (data?.length > 0 &&
        typeof data[0]?.content === 'object' &&
        data[0]?.content &&
        isAboutPageContent(data[0]?.content)) {
      return data[0].content;
    }

    // If no content is found or content is empty, initialize with default content
    await saveAboutPageContentToSupabase(defaultAboutPageContent);
    return defaultAboutPageContent;
  } catch (e) {
    console.error('Failed to get about page content from Supabase:', e);
    return defaultAboutPageContent;
  }
};

// Save about page content to Supabase
export const saveAboutPageContentToSupabase = async (content: AboutPageContent): Promise<boolean> => {
  try {
    // Check if we have any records
    const { data: existingData, error: checkError } = await supabase
      .from('about_page_content')
      .select('id')
      .limit(1);

    if (checkError) {
      console.error('Error checking about page content:', checkError);
      return false;
    }

    let saveResult;

    if (existingData?.length > 0 && existingData[0]?.id) {
      // Update the existing record
      saveResult = await supabase
        .from('about_page_content')
        .update({ content })
        .eq('id', existingData[0].id);
    } else {
      // Insert a new record
      saveResult = await supabase
        .from('about_page_content')
        .insert([{ content }]);
    }

    if (saveResult.error) {
      console.error('Error saving about page content:', saveResult.error);
      return false;
    }

    return true;
  } catch (e) {
    console.error('Failed to save about page content to Supabase:', e);
    return false;
  }
};
