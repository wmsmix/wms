"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import type { InsightPost } from '~/types/cms';
import {
  createInsightPostInSupabase,
  generateUniqueSlugForInsight,
  getInsightPostsFromSupabase,
  updateInsightPostInSupabase,
  defaultCategories
} from '~/data/insight-posts-supabase';
import FileUploader from '~/components/cms/FileUploader';
import MarkdownEditor from '~/components/cms/MarkdownEditor';

interface InsightPostFormData {
  title: string;
  slug: string;
  description: string;
  content: string;
  author: string;
  published_date: string;
  category: string;
  tags: string[];
  is_featured: boolean;
  is_published: boolean;
  sort_order: number;
  meta_title: string;
  meta_description: string;
}

export default function InsightPostEditPage() {
  const params = useParams();
  const router = useRouter();
  const postId = (params.id as string) ?? '';
  const isNew = postId === 'new';

  const [post, setPost] = useState<InsightPost | null>(null);
  const [isLoading, setIsLoading] = useState(!isNew);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState<InsightPostFormData>({
    title: '',
    slug: '',
    description: '',
    content: '',
    author: 'Tim WMS',
    published_date: new Date().toISOString().split('T')[0] ?? '',
    category: 'Teknologi',
    tags: [],
    is_featured: false,
    is_published: true,
    sort_order: 0,
    meta_title: '',
    meta_description: ''
  });
  const [imageUrl, setImageUrl] = useState<string>('');
  const [tagInput, setTagInput] = useState<string>('');

  // Load post data if editing
  useEffect(() => {
    if (!isNew) {
      const loadPost = async () => {
        try {
          const posts = await getInsightPostsFromSupabase();
          const foundPost = posts.find(p => p.id?.toString() === postId);

          if (!foundPost) {
            router.push('/cms/insight-posts');
            return;
          }

          setPost(foundPost);
          setFormData({
            title: foundPost.title ?? '',
            slug: foundPost.slug ?? '',
            description: foundPost.description ?? '',
            content: foundPost.content ?? '',
            author: foundPost.author ?? 'Tim WMS',
            published_date: foundPost.published_date ?? new Date().toISOString().split('T')[0]!,
            category: foundPost.category ?? 'Teknologi',
            tags: foundPost.tags ?? [],
            is_featured: foundPost.is_featured ?? false,
            is_published: foundPost.is_published ?? true,
            sort_order: foundPost.sort_order ?? 0,
            meta_title: foundPost.meta_title ?? '',
            meta_description: foundPost.meta_description ?? ''
          });
          setTagInput((foundPost.tags ?? []).join(', '));
          setImageUrl(foundPost.image_url ?? '');
        } catch (error) {
          console.error('Error loading post:', error);
          router.push('/cms/insight-posts');
        } finally {
          setIsLoading(false);
        }
      };

      void loadPost();
    }
  }, [isNew, postId, router]);

  // Auto-generate slug when title changes (only for new posts)
  useEffect(() => {
    if (formData.title && isNew) {
      const generateSlug = async () => {
        const slug = await generateUniqueSlugForInsight(formData.title);
        setFormData(prev => ({ ...prev, slug }));
      };
      void generateSlug();
    }
  }, [formData.title, isNew]);

  // Auto-generate meta_title when title changes
  useEffect(() => {
    if (formData.title && !formData.meta_title) {
      setFormData(prev => ({ ...prev, meta_title: formData.title }));
    }
  }, [formData.title, formData.meta_title]);

  const handleImageUploaded = (url: string) => {
    setImageUrl(url);
  };

  const addTag = () => {
    if (tagInput.trim()) {
      const newTags = tagInput
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0 && !formData.tags.includes(tag));

      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, ...newTags]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus('saving');

    try {
      // Parse tags from input
      const tags = tagInput
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      const allTags = [...new Set([...formData.tags, ...tags])];

      const postData = {
        ...formData,
        tags: allTags,
        image_url: imageUrl || undefined
      };

      let success = false;

      if (isNew) {
        success = await createInsightPostInSupabase(postData);
      } else {
        success = await updateInsightPostInSupabase(post!.id!, postData);
      }

      if (success) {
        setSaveStatus('success');
        setTimeout(() => {
          router.push('/cms/insight-posts');
        }, 1000);
      } else {
        setSaveStatus('error');
      }
    } catch (error) {
      console.error('Error saving post:', error);
      setSaveStatus('error');
    }
  };

  const handleCancel = () => {
    router.push('/cms/insight-posts');
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
            {isNew ? 'Create New Insight Post' : 'Edit Insight Post'}
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
                <label className="block text-sm font-medium text-gray-700">Author</label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Published Date</label>
                <input
                  type="date"
                  value={formData.published_date}
                  onChange={(e) => setFormData({ ...formData, published_date: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
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
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
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
                rows={3}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="Enter plain text description"
              />
            </div>

            <MarkdownEditor
              label="Content (Markdown)"
              value={formData.content}
              onChange={(value) => setFormData({ ...formData, content: value })}
              placeholder="Enter your article content here..."
              rows={25}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700">Tags</label>
              <div className="mt-1 flex gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  placeholder="Enter tag and press Enter"
                  className="flex-1 rounded-md border border-gray-300 px-3 py-2"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                  Add
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-1 rounded bg-blue-100 px-2 py-1 text-sm text-blue-800"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Meta Title</label>
              <input
                type="text"
                value={formData.meta_title}
                onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Meta Description</label>
              <textarea
                value={formData.meta_description}
                onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                rows={2}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>

            {/* Image Upload Section */}
            <FileUploader
              currentImageUrl={imageUrl}
              onImageUploaded={handleImageUploaded}
              bucketName="cms-uploads"
              folderPath="insights"
              label="Featured Image"
            />

            <div className="flex items-center gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.is_featured}
                  onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                  className="mr-2"
                />
                Featured Post
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.is_published}
                  onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                  className="mr-2"
                />
                Published
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
                  ? 'Create Post'
                  : 'Update Post'}
              </button>
            </div>
          </form>
        </div>
    </div>
  );
}
