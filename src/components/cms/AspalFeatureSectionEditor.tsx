"use client";

import React from 'react';
import type { AspalFeatureSection } from '~/types/cms';
import FileUploader from './FileUploader';

interface AspalFeatureSectionEditorProps {
  data: AspalFeatureSection;
  onChange: (data: AspalFeatureSection) => void;
  title: string;
  folderPath: string;
}

const AspalFeatureSectionEditor: React.FC<AspalFeatureSectionEditorProps> = ({
  data,
  onChange,
  title,
  folderPath
}) => {
  const handleSectionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({
      ...data,
      [name]: value,
    });
  };

  const handleFeatureChange = (index: number, field: string, value: string) => {
    const updatedFeatures = [...data.features];
    const currentFeature = updatedFeatures[index];
    if (currentFeature) {
      updatedFeatures[index] = {
        ...currentFeature,
        [field]: value,
      };
      onChange({
        ...data,
        features: updatedFeatures,
      });
    }
  };

  const handleFeatureImageChange = (index: number, url: string) => {
    handleFeatureChange(index, 'imageSrc', url);
  };

  const addFeature = () => {
    const newFeature = {
      title: '',
      description: '',
      imageSrc: '',
      buttonText: 'PILIH LASTON INI',
      whatsappMessage: '',
      imagePosition: 'right' as const,
      backgroundColor: 'bg-black',
      textColor: 'text-white-10',
    };
    onChange({
      ...data,
      features: [...data.features, newFeature],
    });
  };

  const removeFeature = (index: number) => {
    const updatedFeatures = data.features.filter((_, i) => i !== index);
    onChange({
      ...data,
      features: updatedFeatures,
    });
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-medium text-gray-900">{title}</h3>

      <div className="mb-4">
        <label htmlFor="title" className="mb-2 block text-sm font-medium text-gray-700">
          Section Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={data.title}
          onChange={handleSectionChange}
          className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="description" className="mb-2 block text-sm font-medium text-gray-700">
          Section Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          value={data.description}
          onChange={handleSectionChange}
          className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-md font-medium text-gray-900">Features</h4>
          <button
            type="button"
            onClick={addFeature}
            className="rounded-md bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
          >
            Add Feature
          </button>
        </div>

        {data.features.map((feature, index) => (
          <div key={index} className="mb-6 rounded-lg border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-4">
              <h5 className="text-sm font-medium text-gray-800">Feature {index + 1}</h5>
              <button
                type="button"
                onClick={() => removeFeature(index)}
                className="rounded-md bg-red-500 px-2 py-1 text-xs text-white hover:bg-red-600"
              >
                Remove
              </button>
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                value={feature.title}
                onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                rows={3}
                value={feature.description}
                onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <FileUploader
                currentImageUrl={feature.imageSrc}
                onImageUploaded={(url) => handleFeatureImageChange(index, url)}
                label="Feature Image"
                folderPath={folderPath}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Button Text
                </label>
                <input
                  type="text"
                  value={feature.buttonText}
                  onChange={(e) => handleFeatureChange(index, 'buttonText', e.target.value)}
                  className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  WhatsApp Message
                </label>
                <input
                  type="text"
                  value={feature.whatsappMessage}
                  onChange={(e) => handleFeatureChange(index, 'whatsappMessage', e.target.value)}
                  className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Image Position
                </label>
                <select
                  value={feature.imagePosition}
                  onChange={(e) => handleFeatureChange(index, 'imagePosition', e.target.value)}
                  className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Background Color
                </label>
                <input
                  type="text"
                  value={feature.backgroundColor}
                  onChange={(e) => handleFeatureChange(index, 'backgroundColor', e.target.value)}
                  placeholder="e.g., bg-black, bg-white-20"
                  className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Text Color
                </label>
                <input
                  type="text"
                  value={feature.textColor}
                  onChange={(e) => handleFeatureChange(index, 'textColor', e.target.value)}
                  placeholder="e.g., text-white-10, text-black"
                  className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AspalFeatureSectionEditor;
