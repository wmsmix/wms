import { createClient } from '@supabase/supabase-js';
import type { ProjectsPageContent } from '~/types/cms';
import { defaultProjectsPageContent } from './projects';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper to check if an object has the shape of ProjectsPageContent
const isProjectsPageContent = (obj: unknown): obj is ProjectsPageContent => {
  if (!obj || typeof obj !== 'object') return false;

  // Check for required top-level properties
  const requiredProps = ['hero', 'featuredProject', 'callToAction', 'insightsSectionTitle'];
  for (const prop of requiredProps) {
    if (!(prop in obj)) return false;
  }

  return true;
};

// Get projects page content from Supabase
export const getProjectsPageContentFromSupabase = async (): Promise<ProjectsPageContent> => {
  try {
    // Get latest projects page content
    const { data, error } = await supabase
      .from('projects_page_content')
      .select('content')
      .order('updated_at', { ascending: false })
      .limit(1);

    if (error) {
      console.error('Error fetching projects page content:', error);
      return defaultProjectsPageContent;
    }

    // Check if data exists and content is valid
    if (data?.length > 0 &&
        typeof data[0]?.content === 'object' &&
        data[0]?.content &&
        isProjectsPageContent(data[0]?.content)) {
      return data[0].content;
    }

    // If no content is found or content is empty, initialize with default content
    await saveProjectsPageContentToSupabase(defaultProjectsPageContent);
    return defaultProjectsPageContent;
  } catch (e) {
    console.error('Failed to get projects page content from Supabase:', e);
    return defaultProjectsPageContent;
  }
};

// Save projects page content to Supabase
export const saveProjectsPageContentToSupabase = async (content: ProjectsPageContent): Promise<boolean> => {
  try {
    // Check if we have any records
    const { data: existingData, error: checkError } = await supabase
      .from('projects_page_content')
      .select('id')
      .limit(1);

    if (checkError) {
      console.error('Error checking projects page content:', checkError);
      return false;
    }

    let saveResult;

    if (existingData?.length > 0 && existingData[0]?.id) {
      // Update the existing record
      saveResult = await supabase
        .from('projects_page_content')
        .update({ content })
        .eq('id', existingData[0].id);
    } else {
      // Insert a new record
      saveResult = await supabase
        .from('projects_page_content')
        .insert([{ content }]);
    }

    if (saveResult.error) {
      console.error('Error saving projects page content:', saveResult.error);
      return false;
    }

    return true;
  } catch (e) {
    console.error('Failed to save projects page content to Supabase:', e);
    return false;
  }
};
