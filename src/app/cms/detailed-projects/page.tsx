"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import type { DetailedProject } from '~/types/cms';
import {
  createDetailedProjectInSupabase,
  deleteDetailedProjectFromSupabase,
  deleteImageFromSupabase,
  generateUniqueSlug,
  getDetailedProjectsFromSupabase,
  getSupabaseStorageUrl,
  updateDetailedProjectInSupabase,
  uploadImageToSupabase,
  defaultCategories
} from '~/data/detailed-projects-supabase';
import BucketImageSelector from '~/components/cms/BucketImageSelector';
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
  period: string;
  location: string;
  client: string;
  value: string;
  length: string;
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
  image_source: string;
  road_width: string;
  funding_source: string;
  execution_time: string;
  maintenance_period: string;
  contractor: string;
  description_title: string;
}

export default function DetailedProjectManagement() {
  const [projects, setProjects] = useState<DetailedProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [editingProject, setEditingProject] = useState<DetailedProject | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showBucketSelector, setShowBucketSelector] = useState(false);
  const [formData, setFormData] = useState<DetailedProjectFormData>({
    title: '',
    slug: '',
    category: 'jalan',
    period: '',
    location: '',
    client: '',
    value: '',
    length: '',
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
    image_source: 'Ahmad Adirin/Liputan6.com',
    road_width: '',
    funding_source: '',
    execution_time: '',
    maintenance_period: '',
    contractor: '',
    description_title: 'Menghubungkan Infrastruktur dengan Pertumbuhan Ekonomi'
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedBucketImage, setSelectedBucketImage] = useState<string>('');
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [additionalImages, setAdditionalImages] = useState<string[]>([]);

  // Load projects on component mount
  useEffect(() => {
    void loadProjects();
  }, []);

  // Handle image preview
  useEffect(() => {
    if (selectedImage) {
      const url = URL.createObjectURL(selectedImage);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl('');
    }
  }, [selectedImage]);

  // Auto-generate slug when title changes
  useEffect(() => {
    if (formData.title && !editingProject) {
      const generateSlug = async () => {
        const slug = await generateUniqueSlug(formData.title);
        setFormData(prev => ({ ...prev, slug }));
      };
      void generateSlug();
    }
  }, [formData.title, editingProject]);

  const loadProjects = async () => {
    setIsLoading(true);
    try {
      const data = await getDetailedProjectsFromSupabase();
      setProjects(data);
    } catch (error) {
      console.error('Error loading detailed projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      category: 'jalan',
      period: '',
      location: '',
      client: '',
      value: '',
      length: '',
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
      image_source: 'Ahmad Adirin/Liputan6.com',
      road_width: '',
      funding_source: '',
      execution_time: '',
      maintenance_period: '',
      contractor: '',
      description_title: 'Menghubungkan Infrastruktur dengan Pertumbuhan Ekonomi'
    });
    setSelectedImage(null);
    setSelectedBucketImage('');
    setPreviewUrl('');
    setAdditionalImages([]);
    setEditingProject(null);
    setShowForm(false);
  };

  const handleEdit = (project: DetailedProject) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      slug: project.slug,
      category: project.category,
      period: project.period ?? '',
      location: project.location ?? '',
      client: project.client ?? '',
      value: project.value ?? '',
      length: project.length ?? '',
      description: project.description ?? '',
      detailed_description: project.detailed_description ?? [],
      specifications: (project.specifications as SpecificationPair[]) ?? [],
      challenges: project.challenges ?? [],
      project_info: (project.project_info as ProjectInfoPair[]) ?? [],
      is_featured: project.is_featured ?? false,
      sort_order: project.sort_order ?? 0,
      content_title: project.content_title ?? 'Menghubungkan Infrastruktur dengan Pertumbuhan Ekonomi',
      specifications_title: project.specifications_title ?? 'Rincian Pemakaian Produk',
      challenges_title: project.challenges_title ?? 'Tantangan Proyek',
      insights_title: project.insights_title ?? 'Lihat Insight Proyek',
      image_source: project.image_source ?? 'Ahmad Adirin/Liputan6.com',
      road_width: project.road_width ?? '',
      funding_source: project.funding_source ?? '',
      execution_time: project.execution_time ?? '',
      maintenance_period: project.maintenance_period ?? '',
      contractor: project.contractor ?? '',
      description_title: project.description_title ?? 'Menghubungkan Infrastruktur dengan Pertumbuhan Ekonomi'
    });

    // Set the image state appropriately
    setSelectedImage(null);
    if (project.image_url) {
      setSelectedBucketImage(project.image_url);
      setPreviewUrl(getSupabaseStorageUrl(project.image_url));
    } else {
      setSelectedBucketImage('');
      setPreviewUrl('');
    }

    // Set additional images
    setAdditionalImages(project.images ?? []);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus('saving');

    try {
      let imageUrl = editingProject?.image_url ?? '';

      // Upload new image if selected
      if (selectedImage) {
        const uploadedPath = await uploadImageToSupabase(selectedImage);
        if (uploadedPath) {
          // Delete old image if updating
          if (editingProject?.image_url) {
            await deleteImageFromSupabase(editingProject.image_url);
          }
          imageUrl = uploadedPath;
        } else {
          setSaveStatus('error');
          return;
        }
      } else if (selectedBucketImage) {
        // Use bucket-selected image
        // Delete old image if updating and it's different
        if (editingProject?.image_url && editingProject.image_url !== selectedBucketImage) {
          await deleteImageFromSupabase(editingProject.image_url);
        }
        imageUrl = selectedBucketImage;
      }

      const projectData = {
        ...formData,
        image_url: imageUrl,
        images: additionalImages
      };

      let success = false;

      if (editingProject) {
        // Update existing project
        const updated = await updateDetailedProjectInSupabase(editingProject.id!, projectData);
        success = !!updated;
      } else {
        // Create new project
        const created = await createDetailedProjectInSupabase(projectData);
        success = !!created;
      }

      if (success) {
        setSaveStatus('success');
        await loadProjects();
        resetForm();
        setTimeout(() => setSaveStatus('idle'), 3000);
      } else {
        setSaveStatus('error');
      }
    } catch (error) {
      console.error('Error saving detailed project:', error);
      setSaveStatus('error');
    }
  };

  const handleDelete = async (project: DetailedProject) => {
    if (!confirm(`Are you sure you want to delete "${project.title}"?`)) {
      return;
    }

    setSaveStatus('saving');
    try {
      // Delete main image from storage if exists
      if (project.image_url) {
        await deleteImageFromSupabase(project.image_url);
      }

      // Delete additional images from storage if exist
      if (project.images?.length) {
        for (const imagePath of project.images) {
          await deleteImageFromSupabase(imagePath);
        }
      }

      // Delete project from database
      const success = await deleteDetailedProjectFromSupabase(project.id!);

      if (success) {
        setSaveStatus('success');
        await loadProjects();
        setTimeout(() => setSaveStatus('idle'), 3000);
      } else {
        setSaveStatus('error');
      }
    } catch (error) {
      console.error('Error deleting detailed project:', error);
      setSaveStatus('error');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setSelectedBucketImage('');
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    }
  };

  const handleBucketImageSelected = (imagePath: string) => {
    setSelectedImage(null);
    setSelectedBucketImage(imagePath);
    setPreviewUrl(getSupabaseStorageUrl(imagePath));
  };

  // Helper functions for array fields
  const _handleDetailedDescriptionChange = (descriptions: string[]) => {
    setFormData(prev => ({ ...prev, detailed_description: descriptions }));
  };

  const _handleChallengesChange = (challenges: string[]) => {
    setFormData(prev => ({ ...prev, challenges }));
  };

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
      detailed_description: prev.detailed_description.map((desc, i) => i === index ? value : desc)
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
      challenges: prev.challenges.map((challenge, i) => i === index ? value : challenge)
    }));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
        <span className="ml-2">Loading detailed projects...</span>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">Detailed Project Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Add New Detailed Project
        </button>
      </div>

      {/* Status Message */}
      {saveStatus !== 'idle' && (
        <div className={`mb-4 p-4 rounded-md ${
          saveStatus === 'saving' ? 'bg-blue-100 text-blue-800' :
          saveStatus === 'success' ? 'bg-green-100 text-green-800' :
          'bg-red-100 text-red-800'
        }`}>
          {saveStatus === 'saving' ? 'Processing...' :
           saveStatus === 'success' ? 'Operation completed successfully!' :
           'An error occurred. Please try again.'}
        </div>
      )}

      {/* Project Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                {editingProject ? 'Edit Detailed Project' : 'Add New Detailed Project'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Slug *
                    </label>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    >
                      {defaultCategories.slice(1).map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Period
                    </label>
                    <input
                      type="text"
                      value={formData.period}
                      onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="e.g., 2022-2024"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Client
                    </label>
                    <input
                      type="text"
                      value={formData.client}
                      onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Project Value
                    </label>
                    <input
                      type="text"
                      value={formData.value}
                      onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Length
                    </label>
                    <input
                      type="text"
                      value={formData.length}
                      onChange={(e) => setFormData({ ...formData, length: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                {/* Main Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Main Project Image
                  </label>
                  <div className="mt-2 space-y-2">
                    <input
                      type="file"
                      onChange={handleImageChange}
                      accept="image/*"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => setShowBucketSelector(true)}
                      className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                    >
                      Select from Storage
                    </button>
                    {previewUrl && (
                      <div className="mt-2">
                        <Image
                          src={previewUrl}
                          alt="Preview"
                          width={200}
                          height={150}
                          className="rounded-md object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                {/* Key-Value Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <KeyValueInput<SpecificationPair>
                    label="Specifications"
                    items={formData.specifications}
                    onChange={(specifications) => setFormData({ ...formData, specifications })}
                    keyFieldName="title"
                    valueFieldName="value"
                    keyPlaceholder="e.g., Material Utama"
                    valuePlaceholder="e.g., Aspal Hot-mix, Beton Ready-mix"
                  />

                  <KeyValueInput<ProjectInfoPair>
                    label="Project Information"
                    items={formData.project_info}
                    onChange={(project_info) => setFormData({ ...formData, project_info })}
                    keyFieldName="key"
                    valueFieldName="value"
                    keyPlaceholder="e.g., PANJANG JALAN"
                    valuePlaceholder="e.g., 7.98 KM"
                  />
                </div>

                {/* Detailed Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Detailed Description
                  </label>
                  <div className="space-y-2">
                    {formData.detailed_description.map((desc, index) => (
                      <div key={index} className="flex gap-2">
                        <textarea
                          value={desc}
                          onChange={(e) => updateDetailedDescription(index, e.target.value)}
                          className="flex-1 p-2 border border-gray-300 rounded-md"
                          rows={2}
                          placeholder="Enter description paragraph"
                        />
                        <button
                          type="button"
                          onClick={() => removeDetailedDescription(index)}
                          className="px-3 py-2 text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addDetailedDescription}
                      className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm font-medium"
                    >
                      Add Description Paragraph
                    </button>
                  </div>
                </div>

                {/* Challenges */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Challenges
                  </label>
                  <div className="space-y-2">
                    {formData.challenges.map((challenge, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={challenge}
                          onChange={(e) => updateChallenge(index, e.target.value)}
                          className="flex-1 p-2 border border-gray-300 rounded-md"
                          placeholder="Enter challenge"
                        />
                        <button
                          type="button"
                          onClick={() => removeChallenge(index)}
                          className="px-3 py-2 text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addChallenge}
                      className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm font-medium"
                    >
                      Add Challenge
                    </button>
                  </div>
                </div>

                {/* Additional Settings */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contractor
                    </label>
                    <input
                      type="text"
                      value={formData.contractor}
                      onChange={(e) => setFormData({ ...formData, contractor: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Execution Time
                    </label>
                    <input
                      type="text"
                      value={formData.execution_time}
                      onChange={(e) => setFormData({ ...formData, execution_time: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="e.g., 480 hari kalender"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Funding Source
                    </label>
                    <input
                      type="text"
                      value={formData.funding_source}
                      onChange={(e) => setFormData({ ...formData, funding_source: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image Source
                    </label>
                    <input
                      type="text"
                      value={formData.image_source}
                      onChange={(e) => setFormData({ ...formData, image_source: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="is_featured"
                      checked={formData.is_featured}
                      onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                      className="mr-2"
                    />
                    <label htmlFor="is_featured" className="text-sm font-medium text-gray-700">
                      Featured Project
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sort Order
                    </label>
                    <input
                      type="number"
                      value={formData.sort_order}
                      onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end space-x-4 pt-4 border-t">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saveStatus === 'saving'}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                  >
                    {saveStatus === 'saving' ? 'Saving...' : editingProject ? 'Update Project' : 'Create Project'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Bucket Image Selector Modal */}
      {showBucketSelector && (
        <BucketImageSelector
          bucketName="cms-uploads"
          folderPath="detailed-projects"
          onImageSelected={handleBucketImageSelected}
          onClose={() => setShowBucketSelector(false)}
        />
      )}

      {/* Projects List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Client
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Featured
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {projects.map((project) => (
              <tr key={project.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {project.image_url && (
                    <Image
                      src={getSupabaseStorageUrl(project.image_url)}
                      alt={project.title}
                      width={48}
                      height={48}
                      className="h-12 w-12 object-cover rounded-md"
                    />
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {project.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {project.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {project.client}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {project.is_featured ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Featured
                    </span>
                  ) : (
                    <span className="text-gray-400">No</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(project)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {projects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No detailed projects found. Create your first one!</p>
          </div>
        )}
      </div>
    </div>
  );
}
