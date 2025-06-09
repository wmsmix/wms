import React from 'react';
import type { BetonHeroSection } from '~/types/cms';

interface BetonHeroSectionEditorProps {
  hero: BetonHeroSection;
  onChange: (hero: BetonHeroSection) => void;
}

const BetonHeroSectionEditor: React.FC<BetonHeroSectionEditorProps> = ({
  hero,
  onChange,
}) => {
  const handleInputChange = (field: keyof BetonHeroSection, value: string) => {
    onChange({
      ...hero,
      [field]: value,
    });
  };

  return (
    <div className="rounded-lg border bg-white p-6">
      <h3 className="mb-4 text-lg font-semibold text-gray-800">Hero Section</h3>

      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            value={hero.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Enter hero title"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={hero.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={3}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Enter hero description"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Image Source
          </label>
          <input
            type="text"
            value={hero.imageSrc}
            onChange={(e) => handleInputChange('imageSrc', e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="/images/your-image.png"
          />
          <p className="mt-1 text-xs text-gray-500">
            Enter the image path (e.g., /images/img-hero-beton.png)
          </p>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Button Text
          </label>
          <input
            type="text"
            value={hero.buttonText}
            onChange={(e) => handleInputChange('buttonText', e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="TANYA LEBIH LANJUT"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Button Link
          </label>
          <input
            type="text"
            value={hero.buttonHref}
            onChange={(e) => handleInputChange('buttonHref', e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="/contact"
          />
        </div>
      </div>
    </div>
  );
};

export default BetonHeroSectionEditor;
