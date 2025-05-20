import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Convert a Supabase storage path to a public URL
 * @param path Storage path or URL
 * @param bucket Bucket name, defaults to 'cms-uploads'
 * @returns Public URL for the file
 */
export function getImageUrl(path: string, bucket = 'cms-uploads'): string {
  // If already a full URL or local path, return as is
  if (!path || path.startsWith('http') || path.startsWith('/')) {
    return path;
  }

  // Convert Supabase storage path to public URL
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

/**
 * Process props object to convert any image URLs from Supabase storage paths
 * to full public URLs
 *
 * @param props Component props
 * @param imageFields Array of prop keys that contain image paths
 * @param bucket Supabase storage bucket name
 * @returns Processed props with converted image URLs
 */
export function withSupabaseImages<T extends Record<string, unknown>>(
  props: T,
  imageFields: (keyof T & string)[],
  bucket = 'cms-uploads'
): T {
  const result = { ...props };

  for (const field of imageFields) {
    if (field in result && typeof result[field] === 'string') {
      result[field] = getImageUrl(result[field] as string, bucket) as unknown as T[typeof field];
    }
  }

  return result;
}
