"use client";

import React from 'react';
import type { ProcessStep } from '~/types/cms';
import FileUploader from './FileUploader';

interface ProcessStepsEditorProps {
  data: ProcessStep[];
  onChange: (data: ProcessStep[]) => void;
}

const ProcessStepsEditor: React.FC<ProcessStepsEditorProps> = ({ data, onChange }) => {
  const handleStepChange = (index: number, field: keyof ProcessStep, value: string | number) => {
    const updatedSteps = [...data];
    updatedSteps[index] = {
      ...updatedSteps[index],
      [field]: value,
    } as ProcessStep;
    onChange(updatedSteps);
  };

  const handleImageChange = (index: number, url: string) => {
    handleStepChange(index, 'image', url);
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-medium text-gray-900">Process Steps</h3>

      <div className="space-y-6">
        {data.map((step, index) => (
          <div
            key={index}
            className="rounded-lg border border-gray-200 p-4 transition-all hover:border-gray-300 hover:shadow-sm"
          >
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-md font-medium text-gray-700">Step {step.number}</h4>
            </div>

            <div className="mb-4">
              <label
                htmlFor={`step-number-${index}`}
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Number
              </label>
              <input
                type="number"
                id={`step-number-${index}`}
                value={step.number}
                onChange={(e) => handleStepChange(index, 'number', parseInt(e.target.value) || 1)}
                min="1"
                className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor={`step-title-${index}`}
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                id={`step-title-${index}`}
                value={step.title}
                onChange={(e) => handleStepChange(index, 'title', e.target.value)}
                className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor={`step-description-${index}`}
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id={`step-description-${index}`}
                value={step.description}
                onChange={(e) => handleStepChange(index, 'description', e.target.value)}
                rows={3}
                className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <FileUploader
              currentImageUrl={step.image}
              onImageUploaded={(url) => handleImageChange(index, url)}
              label={`Step Image ${index + 1}`}
              folderPath="process-steps"
            />
          </div>
        ))}
      </div>

      <div className="mt-4 text-right">
        <button
          type="button"
          className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
          disabled
        >
          + Add Step (Coming Soon)
        </button>
      </div>
    </div>
  );
};

export default ProcessStepsEditor;
