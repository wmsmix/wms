import React from 'react';
import type { ProjectShowcase } from '~/types/cms';
import FileUploader from './FileUploader';

interface ShowcaseEditorProps {
  data: ProjectShowcase;
  onChange: (data: ProjectShowcase) => void;
}

const ShowcaseEditor: React.FC<ShowcaseEditorProps> = ({ data, onChange }) => {
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
      <h3 className="mb-4 text-lg font-medium text-gray-900">Project Showcase</h3>

      <div className="mb-4">
        <label htmlFor="period" className="mb-2 block text-sm font-medium text-gray-700">
          Period
        </label>
        <input
          type="text"
          id="period"
          name="period"
          value={data.period}
          onChange={handleChange}
          className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="e.g. (2022-2024)"
        />
      </div>

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
        <label htmlFor="description" className="mb-2 block text-sm font-medium text-gray-700">
          Project Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
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

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="mb-4">
          <label htmlFor="projectValue" className="mb-2 block text-sm font-medium text-gray-700">
            Project Value
          </label>
          <input
            type="text"
            id="projectValue"
            name="projectValue"
            value={data.projectValue}
            onChange={handleChange}
            className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="e.g. 103M"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="projectLength" className="mb-2 block text-sm font-medium text-gray-700">
            Project Length
          </label>
          <input
            type="text"
            id="projectLength"
            name="projectLength"
            value={data.projectLength}
            onChange={handleChange}
            className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="e.g. 7.98 KM"
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
            className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="e.g. jalan-lingkar-tuban"
          />
        </div>
      </div>
    </div>
  );
};

export default ShowcaseEditor;
