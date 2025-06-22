"use client";

import React from 'react';

interface PrecastProductsSectionEditorProps {
  data: {
    title: string;
  };
  onChange: (data: { title: string }) => void;
}

const PrecastProductsSectionEditor: React.FC<PrecastProductsSectionEditorProps> = ({ data, onChange }) => {
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      title: e.target.value,
    });
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-medium text-gray-900">Products Section</h3>

      <div className="mb-6">
        <label htmlFor="sectionTitle" className="mb-2 block text-sm font-medium text-gray-700">
          Section Title
        </label>
        <input
          type="text"
          id="sectionTitle"
          value={data.title}
          onChange={handleTitleChange}
          className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>

      <div className="rounded-lg bg-blue-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1v-3a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h4 className="text-sm font-medium text-blue-800">
              Automatic Product Display
            </h4>
            <div className="mt-2 text-sm text-blue-700">
              <p>
                Products in this section are automatically populated from the{' '}
                <a href="/cms/products/precast-subproducts" className="font-medium underline hover:text-blue-600">
                  Precast Subproducts
                </a>
                {' '}page. Only published products with images will be displayed, sorted by their sort order.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrecastProductsSectionEditor;
