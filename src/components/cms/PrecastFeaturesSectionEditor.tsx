"use client";

import React from 'react';

import type { PrecastFeature } from '~/types/cms';
import FileUploader from './FileUploader';

interface PrecastFeaturesSectionEditorProps {
  data: PrecastFeature[];
  onChange: (data: PrecastFeature[]) => void;
}

const PrecastFeaturesSectionEditor: React.FC<PrecastFeaturesSectionEditorProps> = ({ data, onChange }) => {
  const handleFeatureChange = (index: number, field: keyof PrecastFeature, value: string) => {
    const newFeatures = [...data];
    const existingFeature = newFeatures[index];
    if (!existingFeature) {
      return;
    }
    newFeatures[index] = {
      ...existingFeature,
      [field]: value,
    };
    onChange(newFeatures);
  };

  const handleIconChange = (index: number, url: string) => {
    handleFeatureChange(index, 'icon', url);
  };

  const addFeature = () => {
    const newFeature: PrecastFeature = {
      icon: '',
      title: '',
      description: '',
    };
    onChange([...data, newFeature]);
  };

  const removeFeature = (index: number) => {
    const newFeatures = data.filter((_, i) => i !== index);
    onChange(newFeatures);
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Features Section</h3>
        <button
          onClick={addFeature}
          className="rounded-md bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
        >
          Add Feature
        </button>
      </div>

      <div className="space-y-6">
        {data.map((feature, index) => (
          <div key={index} className="rounded-lg border border-gray-200 p-4">
            <div className="mb-3 flex items-center justify-between">
              <h4 className="font-medium text-gray-900">Feature {index + 1}</h4>
              {data.length > 1 && (
                <button
                  onClick={() => removeFeature(index)}
                  className="rounded-md bg-red-500 px-2 py-1 text-xs text-white hover:bg-red-600"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div>
                <FileUploader
                  currentImageUrl={feature.icon}
                  onImageUploaded={(url) => handleIconChange(index, url)}
                  label="Feature Icon"
                  folderPath="precast/features"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    value={feature.title}
                    onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                    className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={feature.description}
                    onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                    className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {data.length === 0 && (
        <div className="py-8 text-center text-gray-500">
          No features added yet. Click &quot;Add Feature&quot; to get started.
        </div>
      )}
    </div>
  );
};

export default PrecastFeaturesSectionEditor;
