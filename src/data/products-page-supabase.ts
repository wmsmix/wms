import { createClient } from '@supabase/supabase-js';
import type { ProductsPageContent } from '~/types/cms';
import { defaultProductsPageContent } from './products-page';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper to check if an object has the shape of ProductsPageContent
const isProductsPageContent = (obj: unknown): obj is ProductsPageContent => {
  if (!obj || typeof obj !== 'object') return false;

  // Check for required top-level properties
  const requiredProps = ['hero', 'introduction', 'services', 'supportLetter', 'clippedSection', 'insightsSectionTitle'];
  for (const prop of requiredProps) {
    if (!(prop in obj)) return false;
  }

  return true;
};

// Get products page content from Supabase
export const getProductsPageContentFromSupabase = async (): Promise<ProductsPageContent> => {
  try {
    // Get latest products page content
    const { data, error } = await supabase
      .from('products_page_content')
      .select('content')
      .order('updated_at', { ascending: false })
      .limit(1);

    if (error) {
      console.error('Error fetching products page content:', error);
      return defaultProductsPageContent;
    }

    // Check if data exists and content is valid
    if (data?.length > 0 &&
        typeof data[0]?.content === 'object' &&
        data[0]?.content &&
        isProductsPageContent(data[0]?.content)) {
      return data[0].content;
    }

    // If no content is found or content is empty, initialize with default content
    await saveProductsPageContentToSupabase(defaultProductsPageContent);
    return defaultProductsPageContent;
  } catch (e) {
    console.error('Failed to get products page content from Supabase:', e);
    return defaultProductsPageContent;
  }
};

// Save products page content to Supabase
export const saveProductsPageContentToSupabase = async (content: ProductsPageContent): Promise<boolean> => {
  try {
    // Check if we have any records
    const { data: existingData, error: checkError } = await supabase
      .from('products_page_content')
      .select('id')
      .limit(1);

    if (checkError) {
      console.error('Error checking products page content:', checkError);
      return false;
    }

    let saveResult;

    if (existingData?.length > 0 && existingData[0]?.id) {
      // Update the existing record
      saveResult = await supabase
        .from('products_page_content')
        .update({ content })
        .eq('id', existingData[0].id);
    } else {
      // Insert a new record
      saveResult = await supabase
        .from('products_page_content')
        .insert([{ content }]);
    }

    if (saveResult.error) {
      console.error('Error saving products page content:', saveResult.error);
      return false;
    }

    return true;
  } catch (e) {
    console.error('Failed to save products page content to Supabase:', e);
    return false;
  }
};
