import React from 'react';
import type { FeatureSection } from '~/types/cms';
import FileUploader from './FileUploader';

interface FeaturesEditorProps {
  data: FeatureSection[];
  onChange: (data: FeatureSection[]) => void;
}

const FeaturesEditor: React.FC<FeaturesEditorProps> = ({ data, onChange }) => {
  const handleFeatureChange = (index: number, field: keyof FeatureSection, value: string | boolean) => {
    const updatedFeatures = [...data];
    updatedFeatures[index] = {
      ...updatedFeatures[index],
      [field]: value,
    } as FeatureSection;
    onChange(updatedFeatures);
  };

  const handleImageUpload = (index: number, url: string) => {
    handleFeatureChange(index, 'imageSrc', url);
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-medium text-gray-900">Feature Sections</h3>

      <div className="space-y-6">
        {data.map((feature, index) => (
          <div
            key={index}
            className="rounded-lg border border-gray-200 p-4 transition-all hover:border-gray-300 hover:shadow-sm"
          >
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-md font-medium text-gray-700">Feature Section {index + 1}</h4>
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
                rows={3}
                value={feature.description}
                onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <FileUploader
              currentImageUrl={feature.imageSrc}
              onImageUploaded={(url) => handleImageUpload(index, url)}
              label={`Feature Image ${index + 1}`}
              folderPath="features"
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="mb-4">
                <label
                  htmlFor={`feature-buttonText-${index}`}
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Button Text (Optional)
                </label>
                <input
                  type="text"
                  id={`feature-buttonText-${index}`}
                  value={feature.buttonText ?? ''}
                  onChange={(e) => handleFeatureChange(index, 'buttonText', e.target.value)}
                  className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor={`feature-buttonHref-${index}`}
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Button URL (Optional)
                </label>
                <input
                  type="text"
                  id={`feature-buttonHref-${index}`}
                  value={feature.buttonHref ?? ''}
                  onChange={(e) => handleFeatureChange(index, 'buttonHref', e.target.value)}
                  className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center">
                <input
                  id={`feature-inverted-${index}`}
                  type="checkbox"
                  checked={feature.isInverted ?? false}
                  onChange={(e) => handleFeatureChange(index, 'isInverted', e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor={`feature-inverted-${index}`}
                  className="ml-2 block text-sm text-gray-700"
                >
                  Invert Layout (Image on left)
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="mb-4">
                <label
                  htmlFor={`feature-bgColor-${index}`}
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Background Color Class
                </label>
                <input
                  type="text"
                  id={`feature-bgColor-${index}`}
                  value={feature.bgColor ?? ''}
                  onChange={(e) => handleFeatureChange(index, 'bgColor', e.target.value)}
                  className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="e.g. bg-white-10"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor={`feature-textColor-${index}`}
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Text Color Class
                </label>
                <input
                  type="text"
                  id={`feature-textColor-${index}`}
                  value={feature.textColor ?? ''}
                  onChange={(e) => handleFeatureChange(index, 'textColor', e.target.value)}
                  className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="e.g. text-black"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesEditor;
