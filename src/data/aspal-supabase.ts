import { createClient } from '@supabase/supabase-js';
import type { AspalPageContent } from '~/types/cms';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

// Type for database record
interface AspalContentRecord {
  id: number;
  content: AspalPageContent;
  created_at: string;
  updated_at: string;
}

export async function getAspalContentFromSupabase(): Promise<AspalPageContent> {
  try {
    const response = await supabase
      .from('aspal_page_content')
      .select('*')
      .order('id', { ascending: false })
      .limit(1)
      .single();

    if (response.error) {
      console.error('Error fetching aspal content:', response.error);
      throw response.error;
    }

    const record = response.data as AspalContentRecord;
    if (!record?.content) {
      throw new Error('No aspal content found');
    }

    return record.content;
  } catch (error) {
    console.error('Error in getAspalContentFromSupabase:', error);
    throw error;
  }
}

export async function saveAspalContentToSupabase(content: AspalPageContent): Promise<boolean> {
  try {
    const response = await supabase
      .from('aspal_page_content')
      .insert({
        content: content,
        updated_at: new Date().toISOString()
      });

    if (response.error) {
      console.error('Error saving aspal content:', response.error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in saveAspalContentToSupabase:', error);
    return false;
  }
}

export async function updateAspalContentInSupabase(id: number, content: AspalPageContent): Promise<boolean> {
  try {
    const response = await supabase
      .from('aspal_page_content')
      .update({
        content: content,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (response.error) {
      console.error('Error updating aspal content:', response.error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in updateAspalContentInSupabase:', error);
    return false;
  }
}

export async function getAllAspalContentFromSupabase(): Promise<AspalContentRecord[]> {
  try {
    const response = await supabase
      .from('aspal_page_content')
      .select('*')
      .order('id', { ascending: false });

    if (response.error) {
      console.error('Error fetching all aspal content:', response.error);
      throw response.error;
    }

    return (response.data as AspalContentRecord[]) ?? [];
  } catch (error) {
    console.error('Error in getAllAspalContentFromSupabase:', error);
    throw error;
  }
}

export async function deleteAspalContentFromSupabase(id: number): Promise<boolean> {
  try {
    const response = await supabase
      .from('aspal_page_content')
      .delete()
      .eq('id', id);

    if (response.error) {
      console.error('Error deleting aspal content:', response.error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in deleteAspalContentFromSupabase:', error);
    return false;
  }
}
