"use client";

import React from 'react';
import Image, { ImageProps } from 'next/image';
import { useSupabaseImage } from '~/hooks/useSupabaseImage';

interface SupabaseImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  bucket?: string;
}

/**
 * A component that renders images from Supabase storage with proper URL conversion
 *
 * This component automatically converts Supabase storage paths to public URLs
 * and renders them using Next.js Image component
 *
 * @example
 * ```jsx
 * <SupabaseImage
 *   src="hero/background.png"
 *   alt="Hero background"
 *   fill
 *   bucket="cms-uploads" // optional
 * />
 * ```
 */
const SupabaseImage: React.FC<SupabaseImageProps> = ({
  src,
  bucket = 'cms-uploads',
  ...props
}) => {
  const imageUrl = useSupabaseImage(src, bucket);

  return <Image src={imageUrl} {...props} />;
};

export default SupabaseImage;
