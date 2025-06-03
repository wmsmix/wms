import { supabase } from '~/utils/supabase';
import { getSupabaseStorageUrl, uploadImageToSupabase, deleteImageFromSupabase } from './gallery-supabase';
import type { DetailedProject } from '~/types/cms';

// Re-export for convenience
export { getSupabaseStorageUrl, uploadImageToSupabase, deleteImageFromSupabase };

// Database error handling
interface _DatabaseError {
  message: string;
  code?: string;
}

// Custom error class for detailed project operations
export class DetailedProjectError extends Error {
  public code?: string;

  constructor(message: string, code?: string) {
    super(message);
    this.name = 'DetailedProjectError';
    this.code = code;
  }
}

// Get all detailed projects from Supabase
export async function getDetailedProjectsFromSupabase(): Promise<DetailedProject[]> {
  try {
    const result = await supabase
      .from('detailed_projects')
      .select('*')
      .order('sort_order', { ascending: true });

    if (result.error) {
      console.error('Error fetching detailed projects:', result.error);
      throw new DetailedProjectError(`Failed to fetch detailed projects: ${result.error.message}`, result.error.code);
    }

    if (!result.data) {
      return [];
    }

    return result.data as DetailedProject[];
  } catch (error) {
    if (error instanceof DetailedProjectError) {
      throw error;
    }
    console.error('Unexpected error in getDetailedProjectsFromSupabase:', error);
    throw new DetailedProjectError('An unexpected error occurred while fetching detailed projects');
  }
}

// Get a single detailed project by slug
export async function getDetailedProjectBySlugFromSupabase(slug: string): Promise<DetailedProject | null> {
  try {
    if (!slug) {
      throw new DetailedProjectError('Slug parameter is required');
    }

    const result = await supabase
      .from('detailed_projects')
      .select('*')
      .eq('slug', slug)
      .single();

    if (result.error) {
      if (result.error.code === 'PGRST116') {
        // No rows found
        return null;
      }
      console.error(`Error fetching detailed project with slug "${slug}":`, result.error);
      throw new DetailedProjectError(`Failed to fetch detailed project: ${result.error.message}`, result.error.code);
    }

    return result.data as DetailedProject;
  } catch (error) {
    if (error instanceof DetailedProjectError) {
      throw error;
    }
    console.error(`Unexpected error in getDetailedProjectBySlugFromSupabase for slug "${slug}":`, error);
    throw new DetailedProjectError('An unexpected error occurred while fetching the detailed project');
  }
}

// Get featured detailed project
export async function getFeaturedDetailedProjectFromSupabase(): Promise<DetailedProject | null> {
  try {
    const result = await supabase
      .from('detailed_projects')
      .select('*')
      .eq('is_featured', true)
      .single();

    if (result.error) {
      if (result.error.code === 'PGRST116') {
        // No featured project found
        return null;
      }
      console.error('Error fetching featured detailed project:', result.error);
      throw new DetailedProjectError(`Failed to fetch featured detailed project: ${result.error.message}`, result.error.code);
    }

    return result.data as DetailedProject;
  } catch (error) {
    if (error instanceof DetailedProjectError) {
      throw error;
    }
    console.error('Unexpected error in getFeaturedDetailedProjectFromSupabase:', error);
    throw new DetailedProjectError('An unexpected error occurred while fetching the featured detailed project');
  }
}

// Type guard to validate DetailedProject structure
export function isValidDetailedProject(obj: unknown): obj is DetailedProject {
  if (!obj || typeof obj !== 'object') return false;

  const project = obj as Record<string, unknown>;

  return (
    typeof project.title === 'string' &&
    typeof project.slug === 'string' &&
    typeof project.category === 'string' &&
    (project.period === undefined || typeof project.period === 'string') &&
    (project.location === undefined || typeof project.location === 'string') &&
    (project.client === undefined || typeof project.client === 'string') &&
    (project.value === undefined || typeof project.value === 'string')
  );
}

// Create a new detailed project
export async function createDetailedProjectInSupabase(projectData: Omit<DetailedProject, 'id' | 'created_at' | 'updated_at'>): Promise<DetailedProject | null> {
  try {
    const result = await supabase
      .from('detailed_projects')
      .insert([projectData])
      .select()
      .single();

    if (result.error) {
      console.error('Error creating detailed project:', result.error);
      throw new DetailedProjectError(`Failed to create detailed project: ${result.error.message}`, result.error.code);
    }

    return result.data as DetailedProject;
  } catch (error) {
    if (error instanceof DetailedProjectError) {
      throw error;
    }
    console.error('Unexpected error in createDetailedProjectInSupabase:', error);
    throw new DetailedProjectError('An unexpected error occurred while creating the detailed project');
  }
}

// Update an existing detailed project
export async function updateDetailedProjectInSupabase(id: number, projectData: Partial<Omit<DetailedProject, 'id' | 'created_at' | 'updated_at'>>): Promise<DetailedProject | null> {
  try {
    const result = await supabase
      .from('detailed_projects')
      .update({ ...projectData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (result.error) {
      console.error(`Error updating detailed project with id ${id}:`, result.error);
      throw new DetailedProjectError(`Failed to update detailed project: ${result.error.message}`, result.error.code);
    }

    return result.data as DetailedProject;
  } catch (error) {
    if (error instanceof DetailedProjectError) {
      throw error;
    }
    console.error(`Unexpected error in updateDetailedProjectInSupabase for id ${id}:`, error);
    throw new DetailedProjectError('An unexpected error occurred while updating the detailed project');
  }
}

// Delete a detailed project
export async function deleteDetailedProjectFromSupabase(id: number): Promise<boolean> {
  try {
    const result = await supabase
      .from('detailed_projects')
      .delete()
      .eq('id', id);

    if (result.error) {
      console.error(`Error deleting detailed project with id ${id}:`, result.error);
      throw new DetailedProjectError(`Failed to delete detailed project: ${result.error.message}`, result.error.code);
    }

    return true;
  } catch (error) {
    if (error instanceof DetailedProjectError) {
      throw error;
    }
    console.error(`Unexpected error in deleteDetailedProjectFromSupabase for id ${id}:`, error);
    throw new DetailedProjectError('An unexpected error occurred while deleting the detailed project');
  }
}

// Generate a URL-friendly slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

// Check if a slug already exists
export async function checkSlugExists(slug: string, excludeId?: number): Promise<boolean> {
  try {
    let query = supabase
      .from('detailed_projects')
      .select('id')
      .eq('slug', slug);

    if (excludeId) {
      query = query.neq('id', excludeId);
    }

    const result = await query.single();

    // If no error, slug exists
    if (!result.error) {
      return true;
    }

    // If error code is PGRST116 (no rows found), slug doesn't exist
    if (result.error.code === 'PGRST116') {
      return false;
    }

    // Other errors should be thrown
    throw new DetailedProjectError(`Failed to check slug: ${result.error.message}`, result.error.code);
  } catch (error) {
    if (error instanceof DetailedProjectError) {
      throw error;
    }
    console.error('Unexpected error in checkSlugExists:', error);
    throw new DetailedProjectError('An unexpected error occurred while checking slug');
  }
}

// Generate a unique slug
export async function generateUniqueSlug(title: string, excludeId?: number): Promise<string> {
  const baseSlug = generateSlug(title);
  let slug = baseSlug;
  let counter = 1;

  while (await checkSlugExists(slug, excludeId)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
}

// Default categories for detailed projects (same as gallery)
export const defaultCategories = [
  { id: 'all', label: 'All Categories' },
  { id: 'jalan', label: 'Jalan' },
  { id: 'infrastruktur', label: 'Infrastruktur' },
  { id: 'komersial', label: 'Komersial' },
  { id: 'perumahan', label: 'Perumahan' }
];
