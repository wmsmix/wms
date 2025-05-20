import React from 'react';
import { Certification } from '~/types/cms';

interface CertificationsEditorProps {
  data: Certification[];
  onChange: (data: Certification[]) => void;
}

const CertificationsEditor: React.FC<CertificationsEditorProps> = ({ data, onChange }) => {
  const handleCertificationChange = (index: number, field: keyof Certification, value: string) => {
    const updatedCertifications = [...data];
    updatedCertifications[index] = {
      ...updatedCertifications[index],
      [field]: value,
    } as Certification;
    onChange(updatedCertifications);
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-medium text-gray-900">Certifications</h3>

      <div className="space-y-6">
        {data.map((certification, index) => (
          <div
            key={index}
            className="rounded-lg border border-gray-200 p-4 transition-all hover:border-gray-300 hover:shadow-sm"
          >
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-md font-medium text-gray-700">Certification {index + 1}</h4>
            </div>

            <div className="mb-4">
              <label
                htmlFor={`cert-title-${index}`}
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                id={`cert-title-${index}`}
                value={certification.title}
                onChange={(e) => handleCertificationChange(index, 'title', e.target.value)}
                className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor={`cert-subtitle-${index}`}
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Subtitle
              </label>
              <input
                type="text"
                id={`cert-subtitle-${index}`}
                value={certification.subtitle}
                onChange={(e) => handleCertificationChange(index, 'subtitle', e.target.value)}
                className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor={`cert-image-${index}`}
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Image URL
              </label>
              <input
                type="text"
                id={`cert-image-${index}`}
                value={certification.image}
                onChange={(e) => handleCertificationChange(index, 'image', e.target.value)}
                className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-right">
        <button
          type="button"
          className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
          disabled
        >
          + Add Certification (Coming Soon)
        </button>
      </div>
    </div>
  );
};

export default CertificationsEditor;
