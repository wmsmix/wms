"use client";

import React from 'react';
import type { FeaturedProject } from '~/types/cms';
import FileUploader from './FileUploader';

interface FeaturedProjectEditorProps {
  data: FeaturedProject;
  onChange: (data: FeaturedProject) => void;
}

const FeaturedProjectEditor: React.FC<FeaturedProjectEditorProps> = ({ data, onChange }) => {
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
      <h3 className="mb-4 text-lg font-medium text-gray-900">Featured Project</h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium text-gray-700">
            Project Title
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
          <label htmlFor="period" className="mb-2 block text-sm font-medium text-gray-700">
            Project Period
          </label>
          <input
            type="text"
            id="period"
            name="period"
            value={data.period}
            onChange={handleChange}
            placeholder="(2022-2024)"
            className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="mb-2 block text-sm font-medium text-gray-700">
          Project Description
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
        label="Project Image"
        folderPath="projects"
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="mb-4">
          <label htmlFor="projectValue" className="mb-2 block text-sm font-medium text-gray-700">
            Project Value (e.g., 103M)
          </label>
          <input
            type="text"
            id="projectValue"
            name="projectValue"
            value={data.projectValue}
            onChange={handleChange}
            className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="projectValueText" className="mb-2 block text-sm font-medium text-gray-700">
            Project Value Text
          </label>
          <input
            type="text"
            id="projectValueText"
            name="projectValueText"
            value={data.projectValueText}
            onChange={handleChange}
            placeholder="NILAI PROYEK"
            className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="mb-4">
          <label htmlFor="roadLength" className="mb-2 block text-sm font-medium text-gray-700">
            Road Length (e.g., 7.98 KM)
          </label>
          <input
            type="text"
            id="roadLength"
            name="roadLength"
            value={data.roadLength}
            onChange={handleChange}
            className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="roadLengthText" className="mb-2 block text-sm font-medium text-gray-700">
            Road Length Text
          </label>
          <input
            type="text"
            id="roadLengthText"
            name="roadLengthText"
            value={data.roadLengthText}
            onChange={handleChange}
            placeholder="TOTAL PANJANG JALAN"
            className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
      </div>

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
          <label htmlFor="projectSlug" className="mb-2 block text-sm font-medium text-gray-700">
            Project URL Slug
          </label>
          <input
            type="text"
            id="projectSlug"
            name="projectSlug"
            value={data.projectSlug}
            onChange={handleChange}
            placeholder="jalan-lingkar-tuban"
            className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default FeaturedProjectEditor;
