"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { supabase } from '~/utils/supabase';
import { getImageUrl } from '~/utils/supabase';

interface BucketImageSelectorProps {
  bucketName?: string;
  folderPath?: string;
  onImageSelected: (url: string) => void;
  onClose: () => void;
}

const BucketImageSelector: React.FC<BucketImageSelectorProps> = ({
  bucketName = 'cms-uploads',
  folderPath,
  onImageSelected,
  onClose
}) => {
  const [images, setImages] = useState<Array<{ name: string, url: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [folders, setFolders] = useState<string[]>([]);
  const [currentFolder, setCurrentFolder] = useState(folderPath ?? '');

  // Fetch folders in the bucket
  const fetchFolders = useCallback(async () => {
    try {
      const { data, error } = await supabase.storage.from(bucketName).list();

      if (error) throw error;

      const folderList = data
        ?.filter(item => item.id?.endsWith('/') || item.name?.endsWith('/'))
        .map(item => item.name ?? item.id ?? '')
        .filter(Boolean);

      setFolders(folderList);
    } catch (err) {
      console.error('Error fetching folders:', err);
      setError('Failed to load folders');
    }
  }, [bucketName]);

  // Fetch images from the bucket
  const fetchImages = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const path = currentFolder ? currentFolder : undefined;
      const { data, error } = await supabase.storage.from(bucketName).list(path);

      if (error) throw error;

      // Filter out folders and process only files with image extensions
      const imageFiles = data
        ?.filter(item => {
          const name = item.name ?? '';
          const isFolder = name.endsWith('/');
          const isImage = /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(name);
          return !isFolder && isImage;
        })
        .map(item => {
          const name = item.name ?? '';
          const storagePath = currentFolder ? `${currentFolder}/${name}` : name;
          return {
            name,
            url: getImageUrl(storagePath, bucketName)
          };
        }) ?? [];

      setImages(imageFiles);
    } catch (err) {
      console.error('Error fetching images:', err);
      setError('Failed to load images');
    } finally {
      setLoading(false);
    }
  }, [bucketName, currentFolder]);

  // Initialize data loading
  useEffect(() => {
    void fetchFolders();
  }, [fetchFolders]);

  // Load images when folder changes
  useEffect(() => {
    void fetchImages();
  }, [fetchImages]);

  // Handle manual refresh
  const handleRefresh = () => {
    void fetchImages();
    if (!currentFolder) {
      void fetchFolders();
    }
  };

  // Filter images based on search term
  const filteredImages = images.filter(img =>
    img.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Navigate to a folder
  const navigateToFolder = (folder: string) => {
    setCurrentFolder(folder);
  };

  // Navigate up one level
  const navigateUp = () => {
    if (!currentFolder) return;

    const parts = currentFolder.split('/').filter(Boolean);
    if (parts.length <= 1) {
      setCurrentFolder('');
    } else {
      parts.pop();
      setCurrentFolder(parts.join('/'));
    }
  };

  // Handle image selection
  const handleImageSelect = (imagePath: string) => {
    onImageSelected(imagePath);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-4xl max-h-[90vh] bg-white rounded-lg shadow-xl overflow-hidden" style={{ backgroundColor: 'white' }}>
        <div className="flex items-center justify-between p-4 border-b bg-white">
          <h2 className="text-lg font-medium">Select from Uploaded Images</h2>
          <button
            className="p-2 rounded-md hover:bg-gray-100"
            onClick={onClose}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <div className="p-4 border-b bg-white">
          <div className="flex gap-2 mb-4">
            <button
              onClick={navigateUp}
              disabled={!currentFolder}
              className={`px-3 py-1 rounded-md ${!currentFolder ? 'bg-gray-100 text-gray-400' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}
            >
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back
              </span>
            </button>

            <button
              onClick={handleRefresh}
              className="px-3 py-1 rounded-md bg-green-50 text-green-600 hover:bg-green-100"
            >
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
                Refresh
              </span>
            </button>

            <div className="text-sm text-gray-500 flex items-center ml-2">
              Current path: {currentFolder || 'Root'}
            </div>
          </div>

          <input
            type="text"
            placeholder="Search images..."
            className="w-full px-4 py-2 border rounded-md"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        {folders.length > 0 && !currentFolder && (
          <div className="p-4 border-b bg-white">
            <h3 className="text-sm font-medium mb-2">Folders</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {folders.map(folder => (
                <button
                  key={folder}
                  onClick={() => navigateToFolder(folder)}
                  className="p-2 border rounded-md hover:bg-gray-50 text-left flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                  </svg>
                  <span className="truncate">{folder}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="overflow-y-auto p-4 bg-white" style={{ maxHeight: 'calc(90vh - 200px)' }}>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-8">{error}</div>
          ) : filteredImages.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              {searchTerm ? 'No images found matching your search' : 'No images in this folder'}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filteredImages.map((image) => (
                <div
                  key={image.name}
                  className="border rounded-md overflow-hidden hover:border-blue-500 cursor-pointer transition-all"
                  onClick={() => handleImageSelect(currentFolder ? `${currentFolder}/${image.name}` : image.name)}
                >
                  <div className="relative h-32 bg-gray-100">
                    <Image
                      src={image.url}
                      alt={image.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="p-2">
                    <p className="text-xs text-gray-700 truncate">{image.name}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BucketImageSelector;
