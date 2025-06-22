"use client";

import React from 'react';
import type { AspalProductSection } from '~/types/cms';
import FileUploader from './FileUploader';

interface AspalProductSectionEditorProps {
  data: AspalProductSection;
  onChange: (data: AspalProductSection) => void;
  title: string;
  folderPath: string;
}

const AspalProductSectionEditor: React.FC<AspalProductSectionEditorProps> = ({
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

  const handleProductChange = (index: number, field: string, value: string) => {
    const updatedProducts = [...data.products];
    const currentProduct = updatedProducts[index];
    if (currentProduct) {
      updatedProducts[index] = {
        ...currentProduct,
        [field]: value,
      };
      onChange({
        ...data,
        products: updatedProducts,
      });
    }
  };

  const handleProductImageChange = (index: number, url: string) => {
    handleProductChange(index, 'imageSrc', url);
  };

  const addProduct = () => {
    const newProduct = {
      title: '',
      subtitle: '',
      description: '',
      imageSrc: '',
      buttonText: 'PILIH LASTON INI',
      whatsappMessage: '',
    };
    onChange({
      ...data,
      products: [...data.products, newProduct],
    });
  };

  const removeProduct = (index: number) => {
    const updatedProducts = data.products.filter((_, i) => i !== index);
    onChange({
      ...data,
      products: updatedProducts,
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
          <h4 className="text-md font-medium text-gray-900">Products</h4>
          <button
            type="button"
            onClick={addProduct}
            className="rounded-md bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
          >
            Add Product
          </button>
        </div>

        {data.products.map((product, index) => (
          <div key={index} className="mb-6 rounded-lg border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-4">
              <h5 className="text-sm font-medium text-gray-800">Product {index + 1}</h5>
              <button
                type="button"
                onClick={() => removeProduct(index)}
                className="rounded-md bg-red-500 px-2 py-1 text-xs text-white hover:bg-red-600"
              >
                Remove
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  value={product.title}
                  onChange={(e) => handleProductChange(index, 'title', e.target.value)}
                  className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={product.subtitle}
                  onChange={(e) => handleProductChange(index, 'subtitle', e.target.value)}
                  className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                rows={3}
                value={product.description}
                onChange={(e) => handleProductChange(index, 'description', e.target.value)}
                className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div className="mt-4">
              <FileUploader
                currentImageUrl={product.imageSrc}
                onImageUploaded={(url) => handleProductImageChange(index, url)}
                label="Product Image"
                folderPath={folderPath}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Button Text
                </label>
                <input
                  type="text"
                  value={product.buttonText}
                  onChange={(e) => handleProductChange(index, 'buttonText', e.target.value)}
                  className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  WhatsApp Message
                </label>
                <input
                  type="text"
                  value={product.whatsappMessage}
                  onChange={(e) => handleProductChange(index, 'whatsappMessage', e.target.value)}
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

export default AspalProductSectionEditor;
