import React from 'react';
import type { BetonClippedSection } from '~/types/cms';

interface BetonClippedSectionEditorProps {
  clippedSection: BetonClippedSection;
  onChange: (clippedSection: BetonClippedSection) => void;
}

const BetonClippedSectionEditor: React.FC<BetonClippedSectionEditorProps> = ({
  clippedSection,
  onChange,
}) => {
  const handleInputChange = (field: keyof BetonClippedSection, value: string) => {
    onChange({
      ...clippedSection,
      [field]: value,
    });
  };

  return (
    <div className="rounded-lg border bg-white p-6">
      <h3 className="mb-4 text-lg font-semibold text-gray-800">Clipped Section</h3>

      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            value={clippedSection.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Enter section title"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={clippedSection.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={3}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Enter section description"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Button Text
          </label>
          <input
            type="text"
            value={clippedSection.buttonText}
            onChange={(e) => handleInputChange('buttonText', e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="PILIH PRODUK INI"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Button Link
          </label>
          <input
            type="text"
            value={clippedSection.buttonHref}
            onChange={(e) => handleInputChange('buttonHref', e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="/contact"
          />
        </div>
      </div>
    </div>
  );
};

export default BetonClippedSectionEditor;
