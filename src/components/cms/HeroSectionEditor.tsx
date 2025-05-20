import React from 'react';
import { HeroSection } from '~/types/cms';

interface HeroSectionEditorProps {
  data: HeroSection;
  onChange: (data: HeroSection) => void;
}

const HeroSectionEditor: React.FC<HeroSectionEditorProps> = ({ data, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({
      ...data,
      [name]: value,
    });
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-medium text-gray-900">Hero Section</h3>

      <div className="mb-4">
        <label htmlFor="headline" className="mb-2 block text-sm font-medium text-gray-700">
          Headline
        </label>
        <input
          type="text"
          id="headline"
          name="headline"
          value={data.headline}
          onChange={handleChange}
          className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="subheadline" className="mb-2 block text-sm font-medium text-gray-700">
          Subheadline
        </label>
        <textarea
          id="subheadline"
          name="subheadline"
          rows={3}
          value={data.subheadline}
          onChange={handleChange}
          className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="backgroundImage" className="mb-2 block text-sm font-medium text-gray-700">
          Background Image URL (Desktop)
        </label>
        <input
          type="text"
          id="backgroundImage"
          name="backgroundImage"
          value={data.backgroundImage}
          onChange={handleChange}
          className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="mobileBackgroundImage" className="mb-2 block text-sm font-medium text-gray-700">
          Background Image URL (Mobile)
        </label>
        <input
          type="text"
          id="mobileBackgroundImage"
          name="mobileBackgroundImage"
          value={data.mobileBackgroundImage}
          onChange={handleChange}
          className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="mb-4">
          <label htmlFor="ctaText" className="mb-2 block text-sm font-medium text-gray-700">
            CTA Button Text
          </label>
          <input
            type="text"
            id="ctaText"
            name="ctaText"
            value={data.ctaText}
            onChange={handleChange}
            className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="ctaHref" className="mb-2 block text-sm font-medium text-gray-700">
            CTA Button URL
          </label>
          <input
            type="text"
            id="ctaHref"
            name="ctaHref"
            value={data.ctaHref}
            onChange={handleChange}
            className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="mt-4 flex items-center">
        <span className="mr-2 text-sm text-gray-500">Preview:</span>
        <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
          Coming Soon
        </span>
      </div>
    </div>
  );
};

export default HeroSectionEditor;
