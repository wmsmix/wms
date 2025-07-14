"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import type { DetailedProject } from '~/types/cms';
import {
  createDetailedProjectInSupabase,
  deleteDetailedProjectFromSupabase as _deleteDetailedProjectFromSupabase,
  deleteImageFromSupabase as _deleteImageFromSupabase,
  generateUniqueSlug,
  getDetailedProjectsFromSupabase,
  getSupabaseStorageUrl as _getSupabaseStorageUrl,
  updateDetailedProjectInSupabase,
  uploadImageToSupabase as _uploadImageToSupabase,
  defaultCategories
} from '~/data/detailed-projects-supabase';
import FileUploader from '~/components/cms/FileUploader';
import KeyValueInput from '~/components/cms/KeyValueInput';

interface SpecificationPair {
  title: string;
  value: string;
}

interface ProjectInfoPair {
  key: string;
  value: string;
}

interface DetailedProjectFormData {
  title: string;
  slug: string;
  category: string;
  location: string;
  period: string;
  client: string;
  description: string;
  detailed_description: string[];
  specifications: SpecificationPair[];
  challenges: string[];
  project_info: ProjectInfoPair[];
  is_featured: boolean;
  sort_order: number;
  content_title: string;
  specifications_title: string;
  challenges_title: string;
  insights_title: string;
  description_title: string;
}

export default function DetailedProjectEditPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = (params.id as string) ?? '';
  const isNew = projectId === 'new';

  const [project, setProject] = useState<DetailedProject | null>(null);
  const [isLoading, setIsLoading] = useState(!isNew);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState<DetailedProjectFormData>({
    title: '',
    slug: '',
    category: 'jalan',
    location: '',
    period: '',
    client: '',
    description: '',
    detailed_description: [],
    specifications: [],
    challenges: [],
    project_info: [],
    is_featured: false,
    sort_order: 0,
    content_title: 'Menghubungkan Infrastruktur dengan Pertumbuhan Ekonomi',
    specifications_title: 'Rincian Pemakaian Produk',
    challenges_title: 'Tantangan Proyek',
    insights_title: 'Lihat Insight Proyek',
    description_title: 'Menghubungkan Infrastruktur dengan Pertumbuhan Ekonomi'
  });
  const [imageUrl, setImageUrl] = useState<string>('');
  const [additionalImages, setAdditionalImages] = useState<string[]>([]);

  // Load project data if editing
  useEffect(() => {
    if (!isNew) {
      const loadProject = async () => {
        try {
          const projects = await getDetailedProjectsFromSupabase();
          const foundProject = projects.find(p => p.id?.toString() === projectId);

          if (!foundProject) {
            router.push('/cms/detailed-projects');
            return;
          }

          setProject(foundProject);
          setFormData({
            title: foundProject.title ?? '',
            slug: foundProject.slug ?? '',
            category: foundProject.category ?? 'jalan',
            location: foundProject.location ?? '',
            period: foundProject.period ?? '',
            client: foundProject.client ?? '',
            description: foundProject.description ?? '',
            detailed_description: foundProject.detailed_description ?? [],
            specifications: (foundProject.specifications as SpecificationPair[]) ?? [],
            challenges: foundProject.challenges ?? [],
            project_info: (foundProject.project_info as ProjectInfoPair[]) ?? [],
            is_featured: foundProject.is_featured ?? false,
            sort_order: foundProject.sort_order ?? 0,
            content_title: foundProject.content_title ?? 'Menghubungkan Infrastruktur dengan Pertumbuhan Ekonomi',
            specifications_title: foundProject.specifications_title ?? 'Rincian Pemakaian Produk',
            challenges_title: foundProject.challenges_title ?? 'Tantangan Proyek',
            insights_title: foundProject.insights_title ?? 'Lihat Insight Proyek',
            description_title: foundProject.description_title ?? 'Menghubungkan Infrastruktur dengan Pertumbuhan Ekonomi'
          });
          setImageUrl(foundProject.image_url ?? '');
          setAdditionalImages(foundProject.images! ?? []);
        } catch (error) {
          console.error('Error loading project:', error);
          router.push('/cms/detailed-projects');
        } finally {
          setIsLoading(false);
        }
      };

      void loadProject();
    }
  }, [isNew, projectId, router]);

  // Auto-generate slug when title changes
  useEffect(() => {
    if (formData.title && !project) {
      const generateSlug = async () => {
        const slug = await generateUniqueSlug(formData.title);
        setFormData(prev => ({ ...prev, slug }));
      };
      void generateSlug();
    }
  }, [formData.title, project]);

  const handleImageUploaded = (url: string) => {
    setImageUrl(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus('saving');

    try {
      // Extract "NILAI PROYEK" from project_info array
      const nilaiProyekItem = formData.project_info.find(
        item => item.key.toUpperCase() === 'NILAI PROYEK' || item.key.toUpperCase() === 'NILAI PROJEK'
      );

      const projectData = {
        ...formData,
        value: nilaiProyekItem?.value ?? undefined,
        image_url: imageUrl ?? undefined,
        images: additionalImages
      };

      let success = false;

      if (isNew) {
        const created = await createDetailedProjectInSupabase(projectData);
        success = !!created;
      } else {
        const updated = await updateDetailedProjectInSupabase(project!.id!, projectData);
        success = !!updated;
      }

      if (success) {
        setSaveStatus('success');
        setTimeout(() => {
          router.push('/cms/detailed-projects');
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
    router.push('/cms/detailed-projects');
  };

  // Helper functions for dynamic arrays
  const addDetailedDescription = () => {
    setFormData(prev => ({
      ...prev,
      detailed_description: [...prev.detailed_description, '']
    }));
  };

  const removeDetailedDescription = (index: number) => {
    setFormData(prev => ({
      ...prev,
      detailed_description: prev.detailed_description.filter((_, i) => i !== index)
    }));
  };

  const updateDetailedDescription = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      detailed_description: prev.detailed_description.map((item, i) => i === index ? value : item)
    }));
  };

  const addChallenge = () => {
    setFormData(prev => ({
      ...prev,
      challenges: [...prev.challenges, '']
    }));
  };

  const removeChallenge = (index: number) => {
    setFormData(prev => ({
      ...prev,
      challenges: prev.challenges.filter((_, i) => i !== index)
    }));
  };

  const updateChallenge = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      challenges: prev.challenges.map((item, i) => i === index ? value : item)
    }));
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
            {isNew ? 'Create New Detailed Project' : 'Edit Detailed Project'}
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
          {/* Basic Information - Only Fixed Fields */}
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
              <label className="block text-sm font-medium text-gray-700">Slug</label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
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
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Period</label>
              <input
                type="text"
                value={formData.period}
                onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="e.g., 2022-2024"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Client</label>
              <input
                type="text"
                value={formData.client}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="e.g., Pemerintah Kabupaten Tuban"
              />
            </div>
          </div>

          {/* Description */}
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

          {/* Section Titles */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Section Titles</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Content Title</label>
                <input
                  type="text"
                  value={formData.content_title}
                  onChange={(e) => setFormData({ ...formData, content_title: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  placeholder="Enter content title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description Title</label>
                <input
                  type="text"
                  value={formData.description_title}
                  onChange={(e) => setFormData({ ...formData, description_title: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  placeholder="Enter description title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Specifications Title</label>
                <input
                  type="text"
                  value={formData.specifications_title}
                  onChange={(e) => setFormData({ ...formData, specifications_title: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  placeholder="Enter specifications title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Challenges Title</label>
                <input
                  type="text"
                  value={formData.challenges_title}
                  onChange={(e) => setFormData({ ...formData, challenges_title: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  placeholder="Enter challenges title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Insights Title</label>
                <input
                  type="text"
                  value={formData.insights_title}
                  onChange={(e) => setFormData({ ...formData, insights_title: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  placeholder="Enter insights title"
                />
              </div>
            </div>
          </div>

          {/* Image Upload Section */}
          <FileUploader
            currentImageUrl={imageUrl}
            onImageUploaded={handleImageUploaded}
            bucketName="cms-uploads"
            folderPath="detailed-projects"
            label="Main Project Image"
          />

          {/* Detailed Descriptions */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">Detailed Descriptions</label>
              <button
                type="button"
                onClick={addDetailedDescription}
                className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Add Description
              </button>
            </div>
            {formData.detailed_description.map((desc, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <textarea
                  value={desc}
                  onChange={(e) => updateDetailedDescription(index, e.target.value)}
                  className="flex-1 rounded-md border border-gray-300 px-3 py-2"
                  rows={3}
                  placeholder="Enter detailed description"
                />
                <button
                  type="button"
                  onClick={() => removeDetailedDescription(index)}
                  className="text-red-600 hover:text-red-800 px-2"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Specifications */}
          <div>
            <KeyValueInput
              label="Specifications"
              items={formData.specifications}
              onChange={(specs) => setFormData({ ...formData, specifications: specs })}
              keyFieldName="title"
              valueFieldName="value"
              keyPlaceholder="e.g., Material Utama"
              valuePlaceholder="e.g., Aspal Hot-mix, Beton Ready-mix"
            />
          </div>

          {/* Challenges */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">Challenges</label>
              <button
                type="button"
                onClick={addChallenge}
                className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Add Challenge
              </button>
            </div>
            {formData.challenges.map((challenge, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <textarea
                  value={challenge}
                  onChange={(e) => updateChallenge(index, e.target.value)}
                  className="flex-1 rounded-md border border-gray-300 px-3 py-2"
                  rows={2}
                  placeholder="Enter challenge description"
                />
                <button
                  type="button"
                  onClick={() => removeChallenge(index)}
                  className="text-red-600 hover:text-red-800 px-2"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Project Info */}
          <div>
            <KeyValueInput
              label="Project Information"
              items={formData.project_info}
              onChange={(info) => setFormData({ ...formData, project_info: info })}
              keyFieldName="key"
              valueFieldName="value"
              keyPlaceholder="e.g., PANJANG JALAN"
              valuePlaceholder="e.g., 7.98 KM"
            />
          </div>

          {/* Additional Settings */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
