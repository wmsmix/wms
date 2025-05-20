import { useMemo } from 'react';
import { getImageUrl } from '~/utils/supabase';

/**
 * A hook that converts Supabase storage paths to public URLs
 *
 * @param path The image path or URL
 * @param bucket Optional bucket name, defaults to 'cms-uploads'
 * @returns The public URL for the image
 */
export function useSupabaseImage(path: string, bucket = 'cms-uploads'): string {
  const imageUrl = useMemo(() => {
    return getImageUrl(path, bucket);
  }, [path, bucket]);

  return imageUrl;
}

/**
 * A hook that processes multiple image paths in a props object
 *
 * @param props The props object containing image paths
 * @param imageFields Array of prop keys that contain image paths
 * @param bucket Optional bucket name, defaults to 'cms-uploads'
 * @returns A new props object with converted image URLs
 */
export function useSupabaseImages<T extends Record<string, unknown>>(
  props: T,
  imageFields: (keyof T & string)[],
  bucket = 'cms-uploads'
): T {
  return useMemo(() => {
    const result = { ...props };

    for (const field of imageFields) {
      if (field in result && typeof result[field] === 'string') {
        result[field] = getImageUrl(result[field] as string, bucket) as unknown as T[typeof field];
      }
    }

    return result;
  }, [props, imageFields, bucket]);
}
