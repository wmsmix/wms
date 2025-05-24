"use client";

import React from 'react';
import { ProfileCard } from '~/types/cms';
import FileUploader from './FileUploader';

interface ProfileCardsEditorProps {
  visi: ProfileCard;
  misi: ProfileCard;
  onChange: (visi: ProfileCard, misi: ProfileCard) => void;
}

const ProfileCardsEditor: React.FC<ProfileCardsEditorProps> = ({ visi, misi, onChange }) => {
  const handleVisiChange = (field: keyof ProfileCard, value: string) => {
    const updatedVisi = {
      ...visi,
      [field]: value,
    } as ProfileCard;
    onChange(updatedVisi, misi);
  };

  const handleMisiChange = (field: keyof ProfileCard, value: string) => {
    const updatedMisi = {
      ...misi,
      [field]: value,
    } as ProfileCard;
    onChange(visi, updatedMisi);
  };

  const handleVisiImageChange = (url: string) => {
    handleVisiChange('imageSrc', url);
  };

  const handleMisiImageChange = (url: string) => {
    handleMisiChange('imageSrc', url);
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-medium text-gray-900">Visi & Misi</h3>

      <div className="space-y-8">
        {/* Visi Card */}
        <div className="rounded-lg border border-gray-200 p-4 transition-all hover:border-gray-300 hover:shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h4 className="text-md font-medium text-gray-700">Visi</h4>
          </div>

          <div className="mb-4">
            <label
              htmlFor="visi-title"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="visi-title"
              value={visi.title}
              onChange={(e) => handleVisiChange('title', e.target.value)}
              className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="visi-description"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="visi-description"
              value={visi.description as string}
              onChange={(e) => handleVisiChange('description', e.target.value)}
              rows={3}
              className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="visi-alt"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Image Alt Text
            </label>
            <input
              type="text"
              id="visi-alt"
              value={visi.imageAlt}
              onChange={(e) => handleVisiChange('imageAlt', e.target.value)}
              className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <FileUploader
            currentImageUrl={visi.imageSrc}
            onImageUploaded={handleVisiImageChange}
            label="Visi Image"
            folderPath="about/profiles"
          />
        </div>

        {/* Misi Card */}
        <div className="rounded-lg border border-gray-200 p-4 transition-all hover:border-gray-300 hover:shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h4 className="text-md font-medium text-gray-700">Misi</h4>
          </div>

          <div className="mb-4">
            <label
              htmlFor="misi-title"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="misi-title"
              value={misi.title}
              onChange={(e) => handleMisiChange('title', e.target.value)}
              className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="misi-description"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Description (HTML)
            </label>
            <textarea
              id="misi-description"
              value={misi.description as string}
              onChange={(e) => handleMisiChange('description', e.target.value)}
              rows={6}
              className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm font-mono"
            />
            <p className="mt-1 text-xs text-gray-500">
              Format: Use HTML for ordered list. Example: &lt;ol class=&ldquo;text-white/60 list-decimal space-y-3 pl-5&rdquo;&gt;&lt;li&gt;Item 1&lt;/li&gt;&lt;/ol&gt;
            </p>
          </div>

          <div className="mb-4">
            <label
              htmlFor="misi-alt"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Image Alt Text
            </label>
            <input
              type="text"
              id="misi-alt"
              value={misi.imageAlt}
              onChange={(e) => handleMisiChange('imageAlt', e.target.value)}
              className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <FileUploader
            currentImageUrl={misi.imageSrc}
            onImageUploaded={handleMisiImageChange}
            label="Misi Image"
            folderPath="about/profiles"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileCardsEditor;
