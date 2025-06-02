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

  // Section management functions
  const addSection = () => {
    const newSection: CertificateSection = {
      title: `New Certificate Type ${data.length + 1}`,
      certificates: [],
      isDefault: false,
      large: false,
      landscape: false,
    };

    const updatedSections = [...data, newSection];
    onChange(updatedSections);
    setActiveSection(updatedSections.length - 1); // Switch to the new section
  };

  const removeSection = (sectionIndex: number) => {
    if (data.length <= 1) {
      alert('Cannot remove the last section. At least one section is required.');
      return;
    }

    const updatedSections = data.filter((_, index) => index !== sectionIndex);
    onChange(updatedSections);

    // Adjust active section if needed
    if (activeSection >= updatedSections.length) {
      setActiveSection(updatedSections.length - 1);
    } else if (activeSection > sectionIndex) {
      setActiveSection(activeSection - 1);
    }
  };

  const moveSectionUp = (sectionIndex: number) => {
    if (sectionIndex === 0) return;

    const updatedSections = [...data];
    const currentSection = updatedSections[sectionIndex];
    const previousSection = updatedSections[sectionIndex - 1];

    if (currentSection && previousSection) {
      updatedSections[sectionIndex - 1] = currentSection;
      updatedSections[sectionIndex] = previousSection;

      onChange(updatedSections);
      setActiveSection(sectionIndex - 1);
    }
  };

  const moveSectionDown = (sectionIndex: number) => {
    if (sectionIndex === data.length - 1) return;

    const updatedSections = [...data];
    const currentSection = updatedSections[sectionIndex];
    const nextSection = updatedSections[sectionIndex + 1];

    if (currentSection && nextSection) {
      updatedSections[sectionIndex] = nextSection;
      updatedSections[sectionIndex + 1] = currentSection;

      onChange(updatedSections);
      setActiveSection(sectionIndex + 1);
    }
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
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Certificate Sections</h3>
        <button
          type="button"
          onClick={addSection}
          className="inline-flex items-center rounded-md bg-green-50 px-3 py-2 text-sm font-medium text-green-700 hover:bg-green-100"
        >
          + Add New Section
        </button>
      </div>

      {/* Section Tabs with Management Controls */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {data.map((section, index) => (
            <div key={index} className="flex items-center gap-1">
              <button
                className={`rounded-md px-3 py-1.5 text-sm font-medium ${
                  activeSection === index
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setActiveSection(index)}
              >
                {section.title || `Section ${index + 1}`}
              </button>

              {/* Section management buttons - only show for active section */}
              {activeSection === index && (
                <div className="flex items-center gap-1 ml-1">
                  <button
                    type="button"
                    onClick={() => moveSectionUp(index)}
                    disabled={index === 0}
                    className={`p-1 rounded text-xs ${
                      index === 0
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                    }`}
                    title="Move up"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => moveSectionDown(index)}
                    disabled={index === data.length - 1}
                    className={`p-1 rounded text-xs ${
                      index === data.length - 1
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                    }`}
                    title="Move down"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    onClick={() => removeSection(index)}
                    disabled={data.length <= 1}
                    className={`p-1 rounded text-xs ${
                      data.length <= 1
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-red-600 hover:text-red-800 hover:bg-red-50'
                    }`}
                    title="Remove section"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {data.length > 0 && (
          <p className="text-xs text-gray-500">
            Click on a section tab to edit it. Use ↑↓ to reorder sections, × to remove.
          </p>
        )}
      </div>

      {/* Active Section Editor */}
      {data[activeSection] && (
        <div className="space-y-6">
          <div className="rounded-lg border border-gray-200 p-4">
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-md font-medium text-gray-700">Section Settings</h4>
              <span className="text-xs text-gray-500">Section {activeSection + 1} of {data.length}</span>
            </div>

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
                placeholder="e.g., Sertifikat ISO, Surat Keterangan Kelaikan Operasi"
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

      <div className="mt-4 space-y-2 text-xs text-gray-500">
        <p><strong>Section Management:</strong> Add new certificate types, reorder them, or remove unused ones.</p>
        <p><strong>Default Certificates:</strong> Check this to use built-in certificates (like TKDN) instead of custom uploads.</p>
        <p><strong>Display Options:</strong> Large size and landscape orientation affect how certificates are displayed.</p>
      </div>
    </div>
  );
};

export default CertificateSectionsEditor;
