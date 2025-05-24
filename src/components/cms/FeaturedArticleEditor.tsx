"use client";

import React from 'react';
import type { Article } from '~/types/cms';
import FileUploader from './FileUploader';

interface FeaturedArticleEditorProps {
  data: Article;
  onChange: (data: Article) => void;
}

const FeaturedArticleEditor: React.FC<FeaturedArticleEditorProps> = ({ data, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({
      ...data,
      [name]: value,
    });
  };

  const handleImageChange = (url: string) => {
    onChange({
      ...data,
      imageSrc: url,
    });
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-medium text-gray-900">Featured Article</h3>

      <div className="mb-4">
        <label htmlFor="title" className="mb-2 block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={data.title}
          onChange={handleChange}
          className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="mb-4">
          <label htmlFor="date" className="mb-2 block text-sm font-medium text-gray-700">
            Date (Number)
          </label>
          <input
            type="text"
            id="date"
            name="date"
            value={data.date}
            onChange={handleChange}
            className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="month" className="mb-2 block text-sm font-medium text-gray-700">
            Month (Text)
          </label>
          <input
            type="text"
            id="month"
            name="month"
            value={data.month}
            onChange={handleChange}
            className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="mb-2 block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          value={data.description}
          onChange={handleChange}
          className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="url" className="mb-2 block text-sm font-medium text-gray-700">
          Article URL
        </label>
        <input
          type="text"
          id="url"
          name="url"
          value={data.url}
          onChange={handleChange}
          className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>

      <FileUploader
        currentImageUrl={data.imageSrc}
        onImageUploaded={handleImageChange}
        label="Article Image"
        folderPath="articles"
      />
    </div>
  );
};

export default FeaturedArticleEditor;
