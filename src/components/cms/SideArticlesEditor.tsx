"use client";

import React, { useState, useEffect } from 'react';
import type { SideArticle, InsightPost } from '~/types/cms';
import { getInsightPostsFromSupabase } from '~/data/insight-posts-supabase';

interface SideArticlesEditorProps {
  data: SideArticle[];
  onChange: (data: SideArticle[]) => void;
}

const SideArticlesEditor: React.FC<SideArticlesEditorProps> = ({ data, onChange }) => {
  const [availablePosts, setAvailablePosts] = useState<InsightPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Ensure data doesn't exceed 3 articles
  const limitedData = data.slice(0, 3);

  // Load insight posts on component mount
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const posts = await getInsightPostsFromSupabase();
        // Only show published posts
        setAvailablePosts(posts.filter(post => post.is_published));
      } catch (error) {
        console.error('Error loading insight posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    void loadPosts();
  }, []);

    const handlePostSelection = (index: number, postId: string) => {
    const selectedPost = availablePosts.find(post => post.id?.toString() === postId);

    if (selectedPost) {
      const updatedArticles = [...limitedData];
      updatedArticles[index] = {
        title: selectedPost.title,
        date: selectedPost.published_date
          ? new Date(selectedPost.published_date).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })
          : 'No date',
        url: `/insights/${selectedPost.slug}`,
        postId: selectedPost.id
      };
      onChange(updatedArticles);
    }
  };

  const addArticle = () => {
    if (limitedData.length >= 3) {
      alert('Maximum 3 side articles allowed');
      return;
    }

    const newArticle: SideArticle = {
      title: 'Select a post...',
      date: '',
      url: '',
      postId: undefined
    };
    onChange([...limitedData, newArticle]);
  };

  const removeArticle = (index: number) => {
    const updatedArticles = limitedData.filter((_, i) => i !== index);
    onChange(updatedArticles);
  };

    // Get posts that are not already selected
  const getAvailablePostsForIndex = (currentIndex: number) => {
    const selectedPostIds = limitedData
      .map((article, index) => index !== currentIndex ? article.postId : null)
      .filter(id => id !== null && id !== undefined);

    return availablePosts.filter(post => post.id && !selectedPostIds.includes(post.id));
  };

  if (isLoading) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-medium text-gray-900">Side Articles</h3>
        <div className="flex justify-center py-8">
          <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
          <span className="ml-2">Loading posts...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Side Articles</h3>
        <span className="text-sm text-gray-500">
          {limitedData.length}/3 articles
        </span>
      </div>

            <div className="space-y-6">
        {limitedData.map((article, index) => {
          const availablePostsForThisIndex = getAvailablePostsForIndex(index);

          return (
            <div
              key={index}
              className="rounded-lg border border-gray-200 p-4 transition-all hover:border-gray-300 hover:shadow-sm"
            >
              <div className="mb-4 flex items-center justify-between">
                <h4 className="text-md font-medium text-gray-700">Article {index + 1}</h4>
                <button
                  type="button"
                  onClick={() => removeArticle(index)}
                  className="rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 hover:bg-red-100"
                >
                  Remove
                </button>
              </div>

              <div className="mb-4">
                <label
                  htmlFor={`side-article-post-${index}`}
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Select Post
                </label>
                <select
                  id={`side-article-post-${index}`}
                  value={article.postId?.toString() ?? ''}
                  onChange={(e) => handlePostSelection(index, e.target.value)}
                  className="block w-full rounded-md border border-gray-300 p-2 bg-white text-gray-900 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                  style={{ appearance: 'auto' }}
                >
                  <option value="">Choose a post...</option>
                  {availablePostsForThisIndex.map((post) => (
                    <option key={post.id} value={post.id?.toString()}>
                      {post.title}
                    </option>
                  ))}
                </select>
              </div>

              {article.postId && (
                <div className="space-y-3 rounded-md bg-gray-50 p-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Title (Auto-filled)
                    </label>
                    <div className="text-sm text-gray-800">{article.title}</div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Date (Auto-filled)
                    </label>
                    <div className="text-sm text-gray-800">{article.date}</div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      URL (Auto-filled)
                    </label>
                    <div className="text-sm text-gray-800">{article.url}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {limitedData.length < 3 && (
        <div className="mt-4 text-right">
          <button
            type="button"
            onClick={addArticle}
            className="rounded-md bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100"
          >
            + Add Article ({limitedData.length}/3)
          </button>
        </div>
      )}

      {availablePosts.length === 0 && (
        <div className="mt-4 rounded-md bg-yellow-50 border border-yellow-200 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                No published insight posts available
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  Please create and publish some insight posts first before adding side articles.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideArticlesEditor;
