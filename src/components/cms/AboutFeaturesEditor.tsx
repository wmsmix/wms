"use client";

import React from 'react';
import type { AboutFeatureCard } from '~/types/cms';
import FileUploader from './FileUploader';

interface AboutFeaturesEditorProps {
  data: AboutFeatureCard[];
  onChange: (data: AboutFeatureCard[]) => void;
}

const AboutFeaturesEditor: React.FC<AboutFeaturesEditorProps> = ({ data, onChange }) => {
  const handleFeatureChange = (index: number, field: keyof AboutFeatureCard, value: string) => {
    const updatedFeatures = [...data];
    updatedFeatures[index] = {
      ...updatedFeatures[index],
      [field]: value,
    } as AboutFeatureCard;
    onChange(updatedFeatures);
  };

  const handleIconChange = (index: number, url: string) => {
    handleFeatureChange(index, 'icon', url);
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-medium text-gray-900">Features</h3>

      <div className="space-y-6">
        {data.map((feature, index) => (
          <div
            key={index}
            className="rounded-lg border border-gray-200 p-4 transition-all hover:border-gray-300 hover:shadow-sm"
          >
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-md font-medium text-gray-700">Feature {index + 1}</h4>
            </div>

            <div className="mb-4">
              <label
                htmlFor={`feature-title-${index}`}
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                id={`feature-title-${index}`}
                value={feature.title}
                onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor={`feature-description-${index}`}
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id={`feature-description-${index}`}
                value={feature.description}
                onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                rows={3}
                className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <FileUploader
              currentImageUrl={feature.icon}
              onImageUploaded={(url) => handleIconChange(index, url)}
              label={`Feature Icon ${index + 1}`}
              folderPath="icons"
            />
          </div>
        ))}
      </div>

      <div className="mt-4 text-right">
        <button
          type="button"
          className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
          disabled
        >
          + Add Feature (Coming Soon)
        </button>
      </div>
    </div>
  );
};

export default AboutFeaturesEditor;
