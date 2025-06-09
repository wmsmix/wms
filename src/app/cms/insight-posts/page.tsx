"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import type { InsightPost } from '~/types/cms';
import {
  deleteInsightPostFromSupabase,
  getInsightPostsFromSupabase
} from '~/data/insight-posts-supabase';
import { getImageUrl } from '~/utils/supabase';


export default function InsightPostManagement() {
  const router = useRouter();
  const [posts, setPosts] = useState<InsightPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load posts on component mount
  useEffect(() => {
    void loadPosts();
  }, []);

  const loadPosts = async () => {
    setIsLoading(true);
    try {
      const data = await getInsightPostsFromSupabase();
      setPosts(data);
    } catch (error) {
      console.error('Error loading insight posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (post: InsightPost) => {
    router.push(`/cms/insight-posts/${post.id}`);
  };

  const handleCreate = () => {
    router.push('/cms/insight-posts/new');
  };

  const handleDelete = async (post: InsightPost) => {
    if (!confirm(`Are you sure you want to delete "${post.title}"?`)) {
      return;
    }

    try {
      const success = await deleteInsightPostFromSupabase(post.id!);

      if (success) {
        await loadPosts();
      } else {
        alert('Failed to delete insight post');
      }
    } catch (error) {
      console.error('Error deleting insight post:', error);
      alert('Error deleting insight post');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
        <span className="ml-2">Loading insight posts...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">Manage Insight Posts</h1>
        <button
          onClick={handleCreate}
          className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Add New Post
        </button>
      </div>

      {/* Posts List */}
      <div className="grid gap-4">
        {posts.map((post) => (
          <div key={post.id} className="rounded-lg border bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-medium text-gray-900">{post.title}</h3>
                  {post.is_featured && (
                    <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                      Featured
                    </span>
                  )}
                  {!post.is_published && (
                    <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800">
                      Draft
                    </span>
                  )}
                </div>

                <div className="flex items-start gap-4">
                  {post.image_url && (
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded">
                      <Image
                        src={getImageUrl(post.image_url, 'cms-uploads')}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-2">
                      {(post.description ?? '').length > 120
                        ? (post.description ?? '').substring(0, 120) + '...'
                        : (post.description ?? '')
                      }
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>By: {post.author ?? 'Tim WMS'}</span>
                      <span>Category: {post.category ?? 'Teknologi'}</span>
                      <span>Published: {post.published_date ? new Date(post.published_date).toLocaleDateString() : 'Not set'}</span>
                    </div>

                    {post.tags && post.tags.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {post.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => handleEdit(post)}
                  className="rounded-md bg-gray-500 px-3 py-1 text-sm text-white hover:bg-gray-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post)}
                  className="rounded-md bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No insight posts found.</p>
          <button
            onClick={handleCreate}
            className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Create your first post
          </button>
        </div>
      )}
    </div>
  );
}
