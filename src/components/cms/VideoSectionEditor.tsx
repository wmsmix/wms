"use client";

import React from 'react';
import type { VideoSection } from '~/types/cms';

interface VideoSectionEditorProps {
  data: VideoSection;
  onChange: (data: VideoSection) => void;
}

const VideoSectionEditor: React.FC<VideoSectionEditorProps> = ({ data, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({
      ...data,
      [name]: value,
    });
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-medium text-gray-900">Video Section</h3>

      <div className="mb-4">
        <label htmlFor="videoUrl" className="mb-2 block text-sm font-medium text-gray-700">
          YouTube Embed URL
        </label>
        <input
          type="text"
          id="videoUrl"
          name="videoUrl"
          value={data.videoUrl}
          onChange={handleChange}
          placeholder="https://www.youtube.com/embed/..."
          className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
        <p className="mt-1 text-xs text-gray-500">
          Use the full YouTube embed URL with parameters (autoplay, mute, etc.)
        </p>
      </div>

      <div className="mb-4">
        <label htmlFor="title" className="mb-2 block text-sm font-medium text-gray-700">
          Video Title
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
        <label htmlFor="subtitle" className="mb-2 block text-sm font-medium text-gray-700">
          Subtitle/Hashtag
        </label>
        <input
          type="text"
          id="subtitle"
          name="subtitle"
          value={data.subtitle}
          onChange={handleChange}
          className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>

      <div className="mt-4 rounded-md bg-blue-50 p-4">
        <h4 className="text-sm font-medium text-blue-800 mb-2">Preview</h4>
        <div className="text-xs text-blue-600">
          <p><strong>Title:</strong> {data.title}</p>
          <p><strong>Subtitle:</strong> {data.subtitle}</p>
          <p><strong>Video URL:</strong> {data.videoUrl}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoSectionEditor;
