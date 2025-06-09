import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Converts a Supabase storage path to a public URL
 * If the path is already a full URL, returns it as-is
 */
export function getImagePublicUrl(filePath: string, bucketName = 'cms-uploads'): string {
  if (!filePath) return '';

  // If it's already a full URL, return as-is
  if (filePath.startsWith('http')) return filePath;

  // If it's a local path starting with /, return as-is
  if (filePath.startsWith('/')) return filePath;

  // Convert Supabase storage path to public URL
  const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);
  return data.publicUrl;
}

/**
 * Converts an array of image paths to public URLs
 */
export function getImagePublicUrls(filePaths: string[], bucketName = 'cms-uploads'): string[] {
  return filePaths.map(path => getImagePublicUrl(path, bucketName));
}
