"use client";

import React, { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { createClient } from '@supabase/supabase-js';
import BucketImageSelector from './BucketImageSelector';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface FileUploaderProps {
  currentImageUrl: string;
  onImageUploaded: (url: string) => void;
  bucketName?: string;
  folderPath?: string;
  label?: string;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  currentImageUrl,
  onImageUploaded,
  bucketName = 'cms-uploads',
  folderPath = 'images',
  label = 'Image'
}) => {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>(currentImageUrl);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [showImageSelector, setShowImageSelector] = useState(false);

  // Set image URL when component receives new props
  useEffect(() => {
    setImageUrl(currentImageUrl);
  }, [currentImageUrl]);

  // Helper to get public URL from storage path
  const getPublicUrl = useCallback((filePath: string) => {
    if (filePath.startsWith('http')) return filePath; // Already a full URL

    const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);
    return data.publicUrl;
  }, [bucketName]);

  // Load and display the current image
  useEffect(() => {
    if (imageUrl) {
      if (imageUrl.startsWith('/')) {
        // Local path starting with / - show as is
        setFilePreview(imageUrl);
      } else if (imageUrl.startsWith('http')) {
        // External URL - show as is
        setFilePreview(imageUrl);
      } else {
        // Supabase storage path - convert to public URL
        setFilePreview(getPublicUrl(imageUrl));
      }
    }
  }, [imageUrl, getPublicUrl]);

  const uploadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      setUploadError(null);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      if (!file) {
        throw new Error('Selected file is not valid.');
      }

      const fileExt = file.name.split('.').pop();
      const filePath = `${folderPath}/${Math.random().toString(36).substring(2)}.${fileExt}`;

      // Create object URL for preview
      setFilePreview(URL.createObjectURL(file));

      // Upload file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL and update state
      const fullPath = filePath; // The storage path
      setImageUrl(fullPath);
      onImageUploaded(fullPath);
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadError(error instanceof Error ? error.message : 'Error uploading file');
    } finally {
      setUploading(false);
    }
  };

  const handleSelectImage = (path: string) => {
    // Set the raw storage path for the form value
    setImageUrl(path);
    onImageUploaded(path);

    // Generate and set the public URL for preview
    const publicUrl = getPublicUrl(path);
    setFilePreview(publicUrl);
  };

  return (
    <div className="mb-4">
      <label htmlFor={`file-upload-${label}`} className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <div className="mb-3 flex flex-wrap gap-2">
        <div className="relative">
          <input
            type="file"
            id={`file-upload-${label}`}
            accept="image/*"
            onChange={uploadFile}
            disabled={uploading}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70">
              <div className="flex items-center">
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
                <span className="text-sm text-gray-500">Uploading...</span>
              </div>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => setShowImageSelector(true)}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
          Select from Bucket
        </button>
      </div>

      {uploadError && (
        <div className="mt-2 text-sm text-red-500">{uploadError}</div>
      )}

      {filePreview && (
        <div className="mt-3 overflow-hidden rounded-md border border-gray-200">
          <div className="relative h-48 w-full bg-gray-100">
            <Image
              src={filePreview}
              alt="Preview"
              fill
              className="object-contain"
            />
          </div>
          <div className="p-2 text-xs text-gray-500 truncate">
            {imageUrl}
          </div>
        </div>
      )}

      {/* Current URL input - Hidden but still used for form state */}
      <input
        type="hidden"
        value={imageUrl || ''}
        onChange={(e) => {
          setImageUrl(e.target.value);
          onImageUploaded(e.target.value);
        }}
      />

      {/* Manual URL input as fallback */}
      <div className="mt-3">
        <label htmlFor={`manual-url-${label}`} className="block text-xs font-medium text-gray-500">
          Or enter URL manually:
        </label>
        <input
          type="text"
          id={`manual-url-${label}`}
          value={imageUrl || ''}
          onChange={(e) => {
            setImageUrl(e.target.value);
            onImageUploaded(e.target.value);
          }}
          className="mt-1 block w-full rounded-md border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Enter image URL or path"
        />
      </div>

      {showImageSelector && (
        <BucketImageSelector
          bucketName={bucketName}
          folderPath={folderPath}
          onImageSelected={handleSelectImage}
          onClose={() => setShowImageSelector(false)}
        />
      )}
    </div>
  );
};

export default FileUploader;
