import { supabase } from '~/utils/supabase';
import { getImageUrl } from '~/utils/supabase';
import type { GalleryProject, GalleryCategory } from '~/types/cms';

// Default categories for gallery
export const defaultCategories: GalleryCategory[] = [
  { id: "semua", label: "SEMUA" },
  { id: "jalan", label: "JALAN" },
  { id: "infrastruktur", label: "INFRASTRUKTUR" },
  { id: "komersil", label: "KOMERSIL" },
  { id: "perumahan", label: "PERUMAHAN" },
];

// Get all gallery projects from Supabase
export async function getGalleryProjectsFromSupabase(): Promise<GalleryProject[]> {
  try {
    const { data, error } = await supabase
      .from('gallery_projects')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Error fetching gallery projects:', error);
      return [];
    }

    return data as GalleryProject[];
  } catch (error) {
    console.error('Error in getGalleryProjectsFromSupabase:', error);
    return [];
  }
}

// Get a single gallery project by ID
export async function getGalleryProjectByIdFromSupabase(id: number): Promise<GalleryProject | null> {
  try {
    const result = await supabase
      .from('gallery_projects')
      .select('*')
      .eq('id', id)
      .single();

    if (result.error) {
      console.error('Error fetching gallery project:', result.error);
      return null;
    }

    return result.data as GalleryProject;
  } catch (error) {
    console.error('Error in getGalleryProjectByIdFromSupabase:', error);
    return null;
  }
}

// Create a new gallery project in Supabase
export async function createGalleryProjectInSupabase(projectData: Omit<GalleryProject, 'id' | 'created_at' | 'updated_at'>): Promise<GalleryProject | null> {
  try {
    const result = await supabase
      .from('gallery_projects')
      .insert(projectData)
      .select()
      .single();

    if (result.error) {
      console.error('Error creating gallery project:', result.error);
      return null;
    }

    return result.data as GalleryProject;
  } catch (error) {
    console.error('Error in createGalleryProjectInSupabase:', error);
    return null;
  }
}

// Update an existing gallery project in Supabase
export async function updateGalleryProjectInSupabase(id: number, projectData: Partial<GalleryProject>): Promise<GalleryProject | null> {
  try {
    const result = await supabase
      .from('gallery_projects')
      .update(projectData)
      .eq('id', id)
      .select()
      .single();

    if (result.error) {
      console.error('Error updating gallery project:', result.error);
      return null;
    }

    return result.data as GalleryProject;
  } catch (error) {
    console.error('Error in updateGalleryProjectInSupabase:', error);
    return null;
  }
}

// Delete a gallery project from Supabase
export async function deleteGalleryProjectFromSupabase(id: number): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('gallery_projects')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting gallery project:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in deleteGalleryProjectFromSupabase:', error);
    return false;
  }
}

// Get Supabase storage URL for image - using main utility
export function getSupabaseStorageUrl(imagePath: string): string {
  return getImageUrl(imagePath, 'cms-uploads');
}

// Upload image to Supabase storage
export async function uploadImageToSupabase(file: File, folder = 'gallery'): Promise<string | null> {
  try {
    const fileExt = file.name.split('.').pop() ?? 'jpg';
    const fileName = `${folder}/${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from('cms-uploads')
      .upload(fileName, file);

    if (error) {
      console.error('Error uploading image:', error);
      return null;
    }

    return data.path;
  } catch (error) {
    console.error('Error in uploadImageToSupabase:', error);
    return null;
  }
}

// Delete image from Supabase storage
export async function deleteImageFromSupabase(imagePath: string): Promise<boolean> {
  try {
    // Extract path from full URL if needed
    let cleanPath = imagePath;
    if (imagePath.includes('/storage/v1/object/public/cms-uploads/')) {
      cleanPath = imagePath.split('/storage/v1/object/public/cms-uploads/')[1] ?? imagePath;
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
}
