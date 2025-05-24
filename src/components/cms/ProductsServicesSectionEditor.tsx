"use client";

import React from 'react';
import type { ProductsServicesSection, ServiceCard } from '~/types/cms';
import FileUploader from './FileUploader';

interface ProductsServicesSectionEditorProps {
  data: ProductsServicesSection;
  onChange: (data: ProductsServicesSection) => void;
}

const ProductsServicesSectionEditor: React.FC<ProductsServicesSectionEditorProps> = ({ data, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({
      ...data,
      [name]: value,
    });
  };

  const handleServiceChange = (index: number, field: keyof ServiceCard, value: string | boolean | string[]) => {
    const updatedServices = [...data.services];
    updatedServices[index] = {
      ...updatedServices[index]!,
      [field]: value,
    } as ServiceCard;
    onChange({
      ...data,
      services: updatedServices,
    });
  };

  const handleServiceImageChange = (index: number, url: string) => {
    handleServiceChange(index, 'imageSrc', url);
  };

  const addService = () => {
    const newService: ServiceCard = {
      imageSrc: "",
      title: "",
      description: "",
      imagePosition: "top"
    };
    onChange({
      ...data,
      services: [...data.services, newService],
    });
  };

  const removeService = (index: number) => {
    const updatedServices = data.services.filter((_, i) => i !== index);
    onChange({
      ...data,
      services: updatedServices,
    });
  };

  const handleItalicWordsChange = (index: number, value: string) => {
    const words = value.split(',').map(word => word.trim()).filter(word => word.length > 0);
    handleServiceChange(index, 'italicWords', words);
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-medium text-gray-900">Services Section</h3>

      <div className="mb-4">
        <label htmlFor="title" className="mb-2 block text-sm font-medium text-gray-700">
          Section Title
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

      <div className="mb-6">
        <label htmlFor="description" className="mb-2 block text-sm font-medium text-gray-700">
          Section Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={2}
          value={data.description}
          onChange={handleChange}
          className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-md font-medium text-gray-800">Service Cards</h4>
          <button
            type="button"
            onClick={addService}
            className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
          >
            Add Service
          </button>
        </div>

        <div className="space-y-6">
          {data.services.map((service, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="flex items-center justify-between mb-4">
                <h5 className="text-sm font-medium text-gray-800">Service {index + 1}</h5>
                <button
                  type="button"
                  onClick={() => removeService(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>

              <FileUploader
                currentImageUrl={service.imageSrc}
                onImageUploaded={(url) => handleServiceImageChange(index, url)}
                label="Service Image"
                folderPath="services"
              />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="mb-4">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Service Title
                  </label>
                  <input
                    type="text"
                    value={service.title}
                    onChange={(e) => handleServiceChange(index, 'title', e.target.value)}
                    className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div className="mb-4">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Image Position
                  </label>
                  <select
                    value={service.imagePosition}
                    onChange={(e) => handleServiceChange(index, 'imagePosition', e.target.value as 'top' | 'bottom')}
                    className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="top">Top</option>
                    <option value="bottom">Bottom</option>
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Service Description
                </label>
                <textarea
                  rows={3}
                  value={service.description}
                  onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
                  className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="mb-4">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    <input
                      type="checkbox"
                      checked={service.italicTitle ?? false}
                      onChange={(e) => handleServiceChange(index, 'italicTitle', e.target.checked)}
                      className="mr-2"
                    />
                    Italic Title
                  </label>
                </div>

                <div className="mb-4">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Italic Words (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={service.italicWords?.join(', ') ?? ''}
                    onChange={(e) => handleItalicWordsChange(index, e.target.value)}
                    placeholder="word1, word2, word3"
                    className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsServicesSectionEditor;
