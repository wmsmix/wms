import { createClient } from '@supabase/supabase-js';

import type {
  PrecastPageContent,
  PrecastProduct,
  PrecastProductFeature,
  PrecastProductSpecification,
  PrecastProductVariant,
  PrecastProductSchematicNote
} from '~/types/cms';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

// Types for database records
interface PrecastContentRecord {
  id: number;
  content: PrecastPageContent;
  created_at: string;
  updated_at: string;
}

interface PrecastProductRecord {
  id: string;
  slug: string;
  title: string;
  description?: string;
  images: string[];
  features: string; // JSON string
  specifications: string; // JSON string
  variants?: string; // JSON string
  running_text?: string;
  schematic_image?: string;
  schematic_notes?: string; // JSON string
  is_published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

// ============ Page Content Functions ============

export async function getPrecastContentFromSupabase(): Promise<PrecastPageContent> {
  try {
    const response = await supabase
      .from('precast_page_content')
      .select('*')
      .order('id', { ascending: false })
      .limit(1)
      .single();

    if (response.error) {
      console.error('Error fetching precast content:', response.error);
      throw response.error;
    }

    const record = response.data as PrecastContentRecord;
    if (!record?.content) {
      throw new Error('No precast content found');
    }

    return record.content;
  } catch (error) {
    console.error('Error in getPrecastContentFromSupabase:', error);
    throw error;
  }
}

export async function savePrecastContentToSupabase(content: PrecastPageContent): Promise<boolean> {
  try {
    const response = await supabase
      .from('precast_page_content')
      .insert({
        content,
        updated_at: new Date().toISOString()
      });

    if (response.error) {
      console.error('Error saving precast content:', response.error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in savePrecastContentToSupabase:', error);
    return false;
  }
}

export async function updatePrecastContentInSupabase(id: number, content: PrecastPageContent): Promise<boolean> {
  try {
    const response = await supabase
      .from('precast_page_content')
      .update({
        content,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (response.error) {
      console.error('Error updating precast content:', response.error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in updatePrecastContentInSupabase:', error);
    return false;
  }
}

// ============ Individual Products Functions ============

export async function getPrecastProductsFromSupabase(): Promise<PrecastProduct[]> {
  try {
    const response = await supabase
      .from('precast_products')
      .select('*')
      .order('sort_order', { ascending: true });

    if (response.error) {
      console.error('Error fetching precast products:', response.error);
      throw response.error;
    }

    const records = response.data as PrecastProductRecord[];
    return records.map(transformPrecastProductRecord);
  } catch (error) {
    console.error('Error in getPrecastProductsFromSupabase:', error);
    throw error;
  }
}

export async function getPrecastProductBySlugFromSupabase(slug: string): Promise<PrecastProduct | null> {
  try {
    const response = await supabase
      .from('precast_products')
      .select('*')
      .eq('slug', slug)
      .single();

    if (response.error) {
      if (response.error.code === 'PGRST116') {
        return null; // No rows found
      }
      console.error('Error fetching precast product:', response.error);
      throw response.error;
    }

    const record = response.data as PrecastProductRecord;
    return transformPrecastProductRecord(record);
  } catch (error) {
    console.error('Error in getPrecastProductBySlugFromSupabase:', error);
    throw error;
  }
}

export async function savePrecastProductToSupabase(product: Omit<PrecastProduct, 'id' | 'created_at' | 'updated_at'>): Promise<boolean> {
  try {
    const response = await supabase
      .from('precast_products')
      .insert({
        slug: product.slug,
        title: product.title,
        description: product.description,
        images: product.images,
        features: JSON.stringify(product.features),
        specifications: JSON.stringify(product.specifications),
        variants: product.variants ? JSON.stringify(product.variants) : null,
        running_text: product.running_text,
        schematic_image: product.schematic_image,
        schematic_notes: product.schematic_notes ? JSON.stringify(product.schematic_notes) : null,
        is_published: product.is_published,
        sort_order: product.sort_order,
        updated_at: new Date().toISOString()
      });

    if (response.error) {
      console.error('Error saving precast product:', response.error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in savePrecastProductToSupabase:', error);
    return false;
  }
}

export async function updatePrecastProductInSupabase(id: string, product: Omit<PrecastProduct, 'id' | 'created_at' | 'updated_at'>): Promise<boolean> {
  try {
    const response = await supabase
      .from('precast_products')
      .update({
        slug: product.slug,
        title: product.title,
        description: product.description,
        images: product.images,
        features: JSON.stringify(product.features),
        specifications: JSON.stringify(product.specifications),
        variants: product.variants ? JSON.stringify(product.variants) : null,
        running_text: product.running_text,
        schematic_image: product.schematic_image,
        schematic_notes: product.schematic_notes ? JSON.stringify(product.schematic_notes) : null,
        is_published: product.is_published,
        sort_order: product.sort_order,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (response.error) {
      console.error('Error updating precast product:', response.error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in updatePrecastProductInSupabase:', error);
    return false;
  }
}

export async function deletePrecastProductFromSupabase(id: string): Promise<boolean> {
  try {
    const response = await supabase
      .from('precast_products')
      .delete()
      .eq('id', id);

    if (response.error) {
      console.error('Error deleting precast product:', response.error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in deletePrecastProductFromSupabase:', error);
    return false;
  }
}

// ============ Helper Functions ============

export async function getPublishedPrecastProductsForDisplay(): Promise<Array<{
  href: string;
  title: string;
  imageSrc: string;
  description: string;
}>> {
  try {
    const response = await supabase
      .from('precast_products')
      .select('slug, title, description, images')
      .eq('is_published', true)
      .order('sort_order', { ascending: true });

    if (response.error) {
      console.error('Error fetching published precast products:', response.error);
      return [];
    }

    const records = response.data as Array<{
      slug: string;
      title: string;
      description?: string;
      images: string[];
    }>;

    return records
      .filter(record => record.images && record.images.length > 0) // Only products with images
      .map(record => ({
        href: `/products/precast-concrete/${record.slug}`,
        title: record.title,
        imageSrc: record.images[0] ?? '',
        description: record.description ?? '',
      }));
  } catch (error) {
    console.error('Error in getPublishedPrecastProductsForDisplay:', error);
    return [];
  }
}

function transformPrecastProductRecord(record: PrecastProductRecord): PrecastProduct {
  // Helper function to safely parse JSON
  const safeJsonParse = <T>(jsonData: unknown, fallback: T): T => {
    // If it's null or undefined, return fallback
    if (jsonData == null) {
      return fallback;
    }

    // If it's already an object/array, return it as-is
    if (typeof jsonData === 'object') {
      return jsonData as T;
    }

    // If it's a string, try to parse it
    if (typeof jsonData === 'string') {
      if (jsonData.trim() === '') {
        return fallback;
      }
      try {
        return JSON.parse(jsonData) as T;
      } catch (error) {
        console.error('JSON parse error:', error, 'for string:', jsonData);
        return fallback;
      }
    }

    // For any other type, return fallback
    return fallback;
  };

  return {
    id: record.id,
    slug: record.slug,
    title: record.title,
    description: record.description,
    images: record.images ?? [],
    features: safeJsonParse<PrecastProductFeature[]>(record.features, []),
    specifications: safeJsonParse<PrecastProductSpecification[]>(record.specifications, []),
    variants: record.variants ? safeJsonParse<PrecastProductVariant | undefined>(record.variants, undefined) : undefined,
    running_text: record.running_text,
    schematic_image: record.schematic_image,
    schematic_notes: record.schematic_notes ? safeJsonParse<PrecastProductSchematicNote | undefined>(record.schematic_notes, undefined) : undefined,
    is_published: record.is_published,
    sort_order: record.sort_order,
    created_at: record.created_at,
    updated_at: record.updated_at,
  };
}
