"use client";

import React, { useState } from 'react';
import type { CertificateSection } from '~/types/cms';
import FileUploader from './FileUploader';

interface CertificateSectionsEditorProps {
  data: CertificateSection[];
  onChange: (data: CertificateSection[]) => void;
}

const CertificateSectionsEditor: React.FC<CertificateSectionsEditorProps> = ({ data, onChange }) => {
  const [activeSection, setActiveSection] = useState<number>(0);

  const handleSectionChange = (index: number, field: keyof CertificateSection, value: string | boolean | CertificateSection['certificates']) => {
    const updatedSections = [...data];
    updatedSections[index] = {
      ...updatedSections[index],
      [field]: value,
    } as CertificateSection;
    onChange(updatedSections);
  };

  const handleCertificateChange = (
    sectionIndex: number,
    certIndex: number,
    field: keyof CertificateSection['certificates'][0],
    value: string
  ) => {
    const updatedSections = [...data];
    const section = { ...updatedSections[sectionIndex] };
    const certs = [...(section.certificates ?? [])];

    certs[certIndex] = {
      ...certs[certIndex],
      [field]: value,
    } as CertificateSection['certificates'][0];

    section.certificates = certs;
    updatedSections[sectionIndex] = section as CertificateSection;
    onChange(updatedSections);
  };

  const handleCertificateImageChange = (
    sectionIndex: number,
    certIndex: number,
    field: 'image' | 'fullImage',
    url: string
  ) => {
    handleCertificateChange(sectionIndex, certIndex, field, url);
  };

  const addCertificate = (sectionIndex: number) => {
    const updatedSections = [...data];
    const section = { ...updatedSections[sectionIndex] };

    const newCert = {
      id: Date.now(), // Use timestamp as a simple unique ID
      title: `New Certificate ${(section.certificates?.length ?? 0) + 1}`,
      image: '',
      fullImage: '',
    };

    section.certificates = [...(section.certificates ?? []), newCert];
    updatedSections[sectionIndex] = section as CertificateSection;
    onChange(updatedSections);
  };

  const removeCertificate = (sectionIndex: number, certIndex: number) => {
    const updatedSections = [...data];
    const section = { ...updatedSections[sectionIndex] };

    if (!section.certificates) return;

    section.certificates = section.certificates.filter((_, i) => i !== certIndex);
    updatedSections[sectionIndex] = section as CertificateSection;
    onChange(updatedSections);
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-medium text-gray-900">Certificate Sections</h3>

      {/* Section Tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {data.map((section, index) => (
          <button
            key={index}
            className={`rounded-md px-3 py-1.5 text-sm font-medium ${
              activeSection === index
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setActiveSection(index)}
          >
            {section.title || `Section ${index + 1}`}
          </button>
        ))}
      </div>

      {/* Active Section Editor */}
      {data[activeSection] && (
        <div className="space-y-6">
          <div className="rounded-lg border border-gray-200 p-4">
            <h4 className="mb-4 text-md font-medium text-gray-700">Section Settings</h4>

            <div className="mb-4">
              <label
                htmlFor="section-title"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Section Title
              </label>
              <input
                type="text"
                id="section-title"
                value={data[activeSection].title}
                onChange={(e) => handleSectionChange(activeSection, 'title', e.target.value)}
                className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div className="mb-4 flex flex-wrap gap-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="section-default"
                  checked={!!data[activeSection].isDefault}
                  onChange={(e) => handleSectionChange(activeSection, 'isDefault', e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="section-default" className="ml-2 text-sm text-gray-700">
                  Use Default Certificates
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="section-large"
                  checked={!!data[activeSection].large}
                  onChange={(e) => handleSectionChange(activeSection, 'large', e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="section-large" className="ml-2 text-sm text-gray-700">
                  Large Size
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="section-landscape"
                  checked={!!data[activeSection].landscape}
                  onChange={(e) => handleSectionChange(activeSection, 'landscape', e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="section-landscape" className="ml-2 text-sm text-gray-700">
                  Landscape Orientation
                </label>
              </div>
            </div>
          </div>

          {/* Certificates list */}
          <div className="rounded-lg border border-gray-200 p-4">
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-md font-medium text-gray-700">Certificates</h4>
              <button
                type="button"
                onClick={() => addCertificate(activeSection)}
                className="inline-flex items-center rounded-md bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 hover:bg-blue-100"
                disabled={data[activeSection].isDefault}
              >
                + Add Certificate
              </button>
            </div>

            {data[activeSection].isDefault ? (
              <div className="rounded-md bg-gray-50 p-4 text-center text-sm text-gray-500">
                Using default certificates from the system.
              </div>
            ) : data[activeSection].certificates?.length === 0 ? (
              <div className="rounded-md bg-gray-50 p-4 text-center text-sm text-gray-500">
                No certificates added yet. Click &quot;Add Certificate&quot; to add one.
              </div>
            ) : (
              <div className="space-y-6">
                {data[activeSection].certificates?.map((cert, certIndex) => (
                  <div
                    key={cert.id}
                    className="rounded-lg border border-gray-200 p-4 transition-all hover:border-gray-300 hover:shadow-sm"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <h5 className="text-sm font-medium text-gray-700">Certificate {certIndex + 1}</h5>
                      <button
                        type="button"
                        onClick={() => removeCertificate(activeSection, certIndex)}
                        className="rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 hover:bg-red-100"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor={`cert-title-${certIndex}`}
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        id={`cert-title-${certIndex}`}
                        value={cert.title}
                        onChange={(e) =>
                          handleCertificateChange(activeSection, certIndex, 'title', e.target.value)
                        }
                        className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>

                    <FileUploader
                      currentImageUrl={cert.image}
                      onImageUploaded={(url) =>
                        handleCertificateImageChange(activeSection, certIndex, 'image', url)
                      }
                      label={`Thumbnail Image`}
                      folderPath="certificates"
                    />

                    <FileUploader
                      currentImageUrl={cert.fullImage}
                      onImageUploaded={(url) =>
                        handleCertificateImageChange(activeSection, certIndex, 'fullImage', url)
                      }
                      label={`Full Size Image`}
                      folderPath="certificates"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <p className="mt-1 text-xs text-gray-500">
        Format: Use HTML for ordered list. Example: &lt;ol class=&ldquo;text-white/60 list-decimal space-y-3 pl-5&rdquo;&gt;&lt;li&gt;Item 1&lt;/li&gt;&lt;/ol&gt;
      </p>
    </div>
  );
};

export default CertificateSectionsEditor;
