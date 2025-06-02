"use client";

import React from 'react';
import type { ProductsSupportLetterSection } from '~/types/cms';
import FileUploader from './FileUploader';

interface ProductsSupportLetterEditorProps {
  data: ProductsSupportLetterSection;
  onChange: (data: ProductsSupportLetterSection) => void;
}

const ProductsSupportLetterEditor: React.FC<ProductsSupportLetterEditorProps> = ({ data, onChange }) => {
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
      <h3 className="mb-4 text-lg font-medium text-gray-900">Surat Dukungan Section</h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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

        <div className="mb-4">
          <label htmlFor="subtitle" className="mb-2 block text-sm font-medium text-gray-700">
            Subtitle
          </label>
          <input
            type="text"
            id="subtitle"
            name="subtitle"
            value={data.subtitle}
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
          rows={4}
          value={data.description}
          onChange={handleChange}
          className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>

      <FileUploader
        currentImageUrl={data.imageSrc}
        onImageUploaded={handleImageChange}
        label="Support Letter Image"
        folderPath="support-letter"
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="mb-4">
          <label htmlFor="buttonText" className="mb-2 block text-sm font-medium text-gray-700">
            Button Text
          </label>
          <input
            type="text"
            id="buttonText"
            name="buttonText"
            value={data.buttonText}
            onChange={handleChange}
            className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="buttonHref" className="mb-2 block text-sm font-medium text-gray-700">
            Button Link
          </label>
          <input
            type="text"
            id="buttonHref"
            name="buttonHref"
            value={data.buttonHref}
            onChange={handleChange}
            placeholder="/contact"
            className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductsSupportLetterEditor;
