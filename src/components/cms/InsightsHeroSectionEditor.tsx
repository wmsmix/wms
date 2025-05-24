"use client";

import React from 'react';
import type { InsightsHeroSection } from '~/types/cms';
import FileUploader from './FileUploader';

interface InsightsHeroSectionEditorProps {
  data: InsightsHeroSection;
  onChange: (data: InsightsHeroSection) => void;
}

const InsightsHeroSectionEditor: React.FC<InsightsHeroSectionEditorProps> = ({ data, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({
      ...data,
      [name]: value,
    });
  };

  const handleImageChange = (field: keyof InsightsHeroSection, url: string) => {
    onChange({
      ...data,
      [field]: url,
    });
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-medium text-gray-900">Hero Section</h3>

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

      <FileUploader
        currentImageUrl={data.backgroundImage}
        onImageUploaded={(url) => handleImageChange('backgroundImage', url)}
        label="Background Image"
        folderPath="hero"
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="mb-4">
          <label htmlFor="breadcrumbsLeftPosition" className="mb-2 block text-sm font-medium text-gray-700">
            Breadcrumbs Left Position
          </label>
          <input
            type="text"
            id="breadcrumbsLeftPosition"
            name="breadcrumbsLeftPosition"
            value={data.breadcrumbsLeftPosition}
            onChange={handleChange}
            className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="breadcrumbsTopPosition" className="mb-2 block text-sm font-medium text-gray-700">
            Breadcrumbs Top Position
          </label>
          <input
            type="text"
            id="breadcrumbsTopPosition"
            name="breadcrumbsTopPosition"
            value={data.breadcrumbsTopPosition}
            onChange={handleChange}
            className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default InsightsHeroSectionEditor;
