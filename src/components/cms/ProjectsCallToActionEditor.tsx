"use client";

import React from 'react';
import type { ProjectsCallToAction } from '~/types/cms';

interface ProjectsCallToActionEditorProps {
  data: ProjectsCallToAction;
  onChange: (data: ProjectsCallToAction) => void;
  insightsSectionTitle: string;
  onInsightsTitleChange: (title: string) => void;
}

const ProjectsCallToActionEditor: React.FC<ProjectsCallToActionEditorProps> = ({
  data,
  onChange,
  insightsSectionTitle,
  onInsightsTitleChange
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({
      ...data,
      [name]: value,
    });
  };

  const handleInsightsTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onInsightsTitleChange(e.target.value);
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-medium text-gray-900">Call to Action & Insights Section</h3>

      <div className="mb-6">
        <h4 className="mb-3 text-md font-medium text-gray-800">Call to Action</h4>

        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium text-gray-700">
            Call to Action Title
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

      <div className="border-t pt-6">
        <h4 className="mb-3 text-md font-medium text-gray-800">Insights Section</h4>

        <div className="mb-4">
          <label htmlFor="insightsSectionTitle" className="mb-2 block text-sm font-medium text-gray-700">
            Insights Section Title
          </label>
          <input
            type="text"
            id="insightsSectionTitle"
            value={insightsSectionTitle}
            onChange={handleInsightsTitleChange}
            className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectsCallToActionEditor;
