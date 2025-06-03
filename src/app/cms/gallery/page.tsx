"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import type { GalleryProject } from '~/types/cms';
import {
  getGalleryProjectsFromSupabase,
  createGalleryProjectInSupabase,
  updateGalleryProjectInSupabase,
  deleteGalleryProjectFromSupabase,
  uploadImageToSupabase,
  deleteImageFromSupabase,
  getSupabaseStorageUrl,
  defaultCategories
} from '~/data/gallery-supabase';
import BucketImageSelector from '~/components/cms/BucketImageSelector';

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

export default function GalleryManagement() {
  const [projects, setProjects] = useState<GalleryProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [editingProject, setEditingProject] = useState<GalleryProject | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showBucketSelector, setShowBucketSelector] = useState(false);
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
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedBucketImage, setSelectedBucketImage] = useState<string>('');
  const [previewUrl, setPreviewUrl] = useState<string>('');

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

  const loadProjects = async () => {
    setIsLoading(true);
    try {
      const data = await getGalleryProjectsFromSupabase();
      setProjects(data);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
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
    setSelectedImage(null);
    setSelectedBucketImage('');
    setPreviewUrl('');
    setEditingProject(null);
    setShowForm(false);
  };

  const handleEdit = (project: GalleryProject) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      category: project.category,
      description: project.description ?? '',
      client: project.client ?? '',
      value: project.value ?? '',
      start_date: project.start_date ?? '',
      end_date: project.end_date ?? '',
      location: project.location ?? '',
      length: project.length ?? '',
      is_featured: project.is_featured ?? false,
      sort_order: project.sort_order ?? 0
    });

    // Set the image state appropriately
    setSelectedImage(null); // Clear any file selection
    if (project.image_url) {
      setSelectedBucketImage(project.image_url); // Set as bucket image
      setPreviewUrl(getSupabaseStorageUrl(project.image_url));
    } else {
      setSelectedBucketImage('');
      setPreviewUrl('');
    }

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
        image_url: imageUrl
      };

      let success = false;

      if (editingProject) {
        // Update existing project
        const updated = await updateGalleryProjectInSupabase(editingProject.id!, projectData);
        success = !!updated;
      } else {
        // Create new project
        const created = await createGalleryProjectInSupabase(projectData);
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
      console.error('Error saving project:', error);
      setSaveStatus('error');
    }
  };

  const handleDelete = async (project: GalleryProject) => {
    if (!confirm(`Are you sure you want to delete "${project.title}"?`)) {
      return;
    }

    setSaveStatus('saving');
    try {
      // Delete image from storage if exists
      if (project.image_url) {
        await deleteImageFromSupabase(project.image_url);
      }

      // Delete project from database
      const success = await deleteGalleryProjectFromSupabase(project.id!);

      if (success) {
        setSaveStatus('success');
        await loadProjects();
        setTimeout(() => setSaveStatus('idle'), 3000);
      } else {
        setSaveStatus('error');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      setSaveStatus('error');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setSelectedBucketImage(''); // Clear bucket selection
      // Create preview URL for the selected file
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    }
  };

  const handleBucketImageSelected = (imagePath: string) => {
    // When an image is selected from the bucket, clear any file selection
    setSelectedImage(null);
    setSelectedBucketImage(imagePath);
    setPreviewUrl(getSupabaseStorageUrl(imagePath));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
        <span className="ml-2">Loading projects...</span>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">Project Gallery</h1>
        <button
          onClick={() => setShowForm(true)}
          className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Add New Project
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
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
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
                    Image
                  </label>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="flex-1 p-2 border border-gray-300 rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => setShowBucketSelector(true)}
                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 whitespace-nowrap"
                      >
                        Select from Bucket
                      </button>
                    </div>
                    {previewUrl && (
                      <div className="mt-2">
                        <Image
                          src={previewUrl}
                          alt="Preview"
                          width={128}
                          height={128}
                          className="h-32 w-32 object-cover rounded-md"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
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
                      placeholder="RP. 16.420.065.000"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={formData.start_date}
                      onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={formData.end_date}
                      onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
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
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saveStatus === 'saving'}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400"
                  >
                    {saveStatus === 'saving' ? 'Saving...' : editingProject ? 'Update' : 'Create'}
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
          folderPath="gallery-projects"
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
                    className="text-blue-600 hover:text-blue-900 mr-4"
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
            <p className="text-gray-500">No projects found. Add your first project above.</p>
          </div>
        )}
      </div>
    </div>
  );
}
