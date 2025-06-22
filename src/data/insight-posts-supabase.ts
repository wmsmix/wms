import { createClient } from '@supabase/supabase-js';
import type { InsightPost } from '~/types/cms';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export const getInsightPostsFromSupabase = async (): Promise<InsightPost[]> => {
  try {
    const { data, error } = await supabase
      .from('insight_posts')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('published_date', { ascending: false });

    if (error) {
      console.error('Error fetching insight posts:', error);
      throw error;
    }

    return (data as InsightPost[]) ?? [];
  } catch (error) {
    console.error('Error in getInsightPostsFromSupabase:', error);
    throw error;
  }
};

export const getInsightPostBySlugFromSupabase = async (slug: string): Promise<InsightPost | null> => {
  try {
    const response = await supabase
      .from('insight_posts')
      .select('*')
      .eq('slug', slug)
      .single();

    if (response.error) {
      if (response.error.code === 'PGRST116') {
        return null; // No rows found
      }
      console.error('Error fetching insight post by slug:', response.error);
      throw response.error;
    }

    return response.data as InsightPost;
  } catch (error) {
    console.error('Error in getInsightPostBySlugFromSupabase:', error);
    throw error;
  }
};

export const createInsightPostInSupabase = async (insightPost: Omit<InsightPost, 'id' | 'created_at' | 'updated_at'>): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('insight_posts')
      .insert([insightPost]);

    if (error) {
      console.error('Error creating insight post:', error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error in createInsightPostInSupabase:', error);
    return false;
  }
};

export const updateInsightPostInSupabase = async (id: number, insightPost: Partial<InsightPost>): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('insight_posts')
      .update(insightPost)
      .eq('id', id);

    if (error) {
      console.error('Error updating insight post:', error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error in updateInsightPostInSupabase:', error);
    return false;
  }
};

export const deleteInsightPostFromSupabase = async (id: number): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('insight_posts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting insight post:', error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error in deleteInsightPostFromSupabase:', error);
    return false;
  }
};

export const generateUniqueSlugForInsight = async (title: string): Promise<string> => {
  const baseSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();

  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existingPost = await getInsightPostBySlugFromSupabase(slug);
    if (!existingPost) {
      break;
    }
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
};

export const uploadImageToSupabase = async (file: File, folder = 'insights'): Promise<string | null> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('cms-uploads')
      .upload(filePath, file);

    if (uploadError) {
      console.error('Error uploading image:', uploadError);
      return null;
    }

    // Return the storage path, not the full URL
    return filePath;
  } catch (error) {
    console.error('Error in uploadImageToSupabase:', error);
    return null;
  }
};

export const deleteImageFromSupabase = async (imagePath: string): Promise<boolean> => {
  try {
    // If it's a full URL, extract the path
    let cleanPath = imagePath;
    if (imagePath.includes('/storage/v1/object/public/cms-uploads/')) {
      const pathParts = imagePath.split('/storage/v1/object/public/cms-uploads/');
      cleanPath = pathParts[1] ?? imagePath;
    } else if (imagePath.startsWith('/')) {
      cleanPath = imagePath.slice(1);
    }

    const { error } = await supabase.storage
      .from('cms-uploads')
      .remove([cleanPath]);

    if (error) {
      console.error('Error deleting image:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in deleteImageFromSupabase:', error);
    return false;
  }
};

export const getSupabaseStorageUrl = (path: string): string => {
  const { data } = supabase.storage
    .from('cms-uploads')
    .getPublicUrl(path);

  return data.publicUrl;
};

export const defaultCategories = [
  'Teknologi',
  'Pemeliharaan',
  'Konstruksi',
  'Infrastruktur',
  'Inovasi',
  'Sustainability'
];
