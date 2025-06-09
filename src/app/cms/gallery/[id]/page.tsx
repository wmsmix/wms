"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import type { GalleryProject } from '~/types/cms';
import {
  getGalleryProjectsFromSupabase,
  createGalleryProjectInSupabase,
  updateGalleryProjectInSupabase,
  uploadImageToSupabase as _uploadImageToSupabase,
  deleteImageFromSupabase as _deleteImageFromSupabase,
  getSupabaseStorageUrl as _getSupabaseStorageUrl,
  defaultCategories
} from '~/data/gallery-supabase';
import FileUploader from '~/components/cms/FileUploader';

interface ProjectFormData {
  title: string;
  category: string;
  description: string;
  client: string;
  value: string;
  start_date: string;
  end_date: string;
  location: string;
  length: string;
  is_featured: boolean;
  sort_order: number;
}

export default function GalleryProjectEditPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = (params.id as string) ?? '';
  const isNew = projectId === 'new';

  const [project, setProject] = useState<GalleryProject | null>(null);
  const [isLoading, setIsLoading] = useState(!isNew);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    category: 'jalan',
    description: '',
    client: '',
    value: '',
    start_date: '',
    end_date: '',
    location: '',
    length: '',
    is_featured: false,
    sort_order: 0
  });
  const [imageUrl, setImageUrl] = useState<string>('');

  // Load project data if editing
  useEffect(() => {
    if (!isNew) {
      const loadProject = async () => {
        try {
          const projects = await getGalleryProjectsFromSupabase();
          const foundProject = projects.find(p => p.id?.toString() === projectId);

          if (!foundProject) {
            router.push('/cms/gallery');
            return;
          }

          setProject(foundProject);
          setFormData({
            title: foundProject.title ?? '',
            category: foundProject.category ?? 'jalan',
            description: foundProject.description ?? '',
            client: foundProject.client ?? '',
            value: foundProject.value ?? '',
            start_date: foundProject.start_date ?? '',
            end_date: foundProject.end_date ?? '',
            location: foundProject.location ?? '',
            length: foundProject.length ?? '',
            is_featured: foundProject.is_featured ?? false,
            sort_order: foundProject.sort_order ?? 0
          });
          setImageUrl(foundProject.image_url ?? '');
        } catch (error) {
          console.error('Error loading project:', error);
          router.push('/cms/gallery');
        } finally {
          setIsLoading(false);
        }
      };

      void loadProject();
    }
  }, [isNew, projectId, router]);

  const handleImageUploaded = (url: string) => {
    setImageUrl(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus('saving');

    try {
      const projectData = {
        ...formData,
        image_url: imageUrl ?? ''
      };

      let success = false;

      if (isNew) {
        const created = await createGalleryProjectInSupabase(projectData);
        success = !!created;
      } else {
        const updated = await updateGalleryProjectInSupabase(project!.id!, projectData);
        success = !!updated;
      }

      if (success) {
        setSaveStatus('success');
        setTimeout(() => {
          router.push('/cms/gallery');
        }, 1000);
      } else {
        setSaveStatus('error');
      }
    } catch (error) {
      console.error('Error saving project:', error);
      setSaveStatus('error');
    }
  };

  const handleCancel = () => {
    router.push('/cms/gallery');
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
          <p className="mt-4 text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">
            {isNew ? 'Create New Gallery Project' : 'Edit Gallery Project'}
          </h1>
          <button
            onClick={handleCancel}
            className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
          >
            Back to List
          </button>
        </div>
      </div>

      <div className="px-6 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              >
                {defaultCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Client</label>
              <input
                type="text"
                value={formData.client}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Project Value</label>
              <input
                type="text"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="e.g., Rp 50 Miliar"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                value={formData.start_date}
                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="date"
                value={formData.end_date}
                onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Length</label>
              <input
                type="text"
                value={formData.length}
                onChange={(e) => setFormData({ ...formData, length: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="e.g., 15 KM"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Sort Order</label>
              <input
                type="number"
                value={formData.sort_order}
                onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              placeholder="Enter project description"
            />
          </div>

          {/* Image Upload Section */}
          <FileUploader
            currentImageUrl={imageUrl}
            onImageUploaded={handleImageUploaded}
            bucketName="cms-uploads"
            folderPath="gallery"
            label="Project Image"
          />

          <div className="flex items-center">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.is_featured}
                onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                className="mr-2"
              />
              Featured Project
            </label>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={handleCancel}
              className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saveStatus === 'saving'}
              className={`rounded-md px-4 py-2 text-white ${
                saveStatus === 'saving'
                  ? 'bg-gray-400 cursor-not-allowed'
                  : saveStatus === 'success'
                  ? 'bg-green-500 hover:bg-green-600'
                  : saveStatus === 'error'
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {saveStatus === 'saving'
                ? 'Saving...'
                : saveStatus === 'success'
                ? 'Saved!'
                : saveStatus === 'error'
                ? 'Error Saving'
                : isNew
                ? 'Create Project'
                : 'Update Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
