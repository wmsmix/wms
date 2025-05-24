import { createClient } from '@supabase/supabase-js';
import type { InsightsPageContent } from '~/types/cms';
import { defaultInsightsPageContent } from './insights';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper to check if an object has the shape of InsightsPageContent
const isInsightsPageContent = (obj: unknown): obj is InsightsPageContent => {
  if (!obj || typeof obj !== 'object') return false;

  // Check for required top-level properties
  const requiredProps = ['hero', 'featuredArticle', 'sideArticles', 'newsGrid', 'videoSection'];
  for (const prop of requiredProps) {
    if (!(prop in obj)) return false;
  }

  return true;
};

// Get insights page content from Supabase
export const getInsightsPageContentFromSupabase = async (): Promise<InsightsPageContent> => {
  try {
    // Get latest insights page content
    const { data, error } = await supabase
      .from('insights_page_content')
      .select('content')
      .order('updated_at', { ascending: false })
      .limit(1);

    if (error) {
      console.error('Error fetching insights page content:', error);
      return defaultInsightsPageContent;
    }

    // Check if data exists and content is valid
    if (data?.length > 0 &&
        typeof data[0]?.content === 'object' &&
        data[0]?.content &&
        isInsightsPageContent(data[0]?.content)) {
      return data[0].content;
    }

    // If no content is found or content is empty, initialize with default content
    await saveInsightsPageContentToSupabase(defaultInsightsPageContent);
    return defaultInsightsPageContent;
  } catch (e) {
    console.error('Failed to get insights page content from Supabase:', e);
    return defaultInsightsPageContent;
  }
};

// Save insights page content to Supabase
export const saveInsightsPageContentToSupabase = async (content: InsightsPageContent): Promise<boolean> => {
  try {
    // Check if we have any records
    const { data: existingData, error: checkError } = await supabase
      .from('insights_page_content')
      .select('id')
      .limit(1);

    if (checkError) {
      console.error('Error checking insights page content:', checkError);
      return false;
    }

    let saveResult;

    if (existingData?.length > 0 && existingData[0]?.id) {
      // Update the existing record
      saveResult = await supabase
        .from('insights_page_content')
        .update({ content })
        .eq('id', existingData[0].id);
    } else {
      // Insert a new record
      saveResult = await supabase
        .from('insights_page_content')
        .insert([{ content }]);
    }

    if (saveResult.error) {
      console.error('Error saving insights page content:', saveResult.error);
      return false;
    }

    return true;
  } catch (e) {
    console.error('Failed to save insights page content to Supabase:', e);
    return false;
  }
};
