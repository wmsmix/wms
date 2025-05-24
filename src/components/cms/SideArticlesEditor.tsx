"use client";

import React from 'react';
import type { SideArticle } from '~/types/cms';

interface SideArticlesEditorProps {
  data: SideArticle[];
  onChange: (data: SideArticle[]) => void;
}

const SideArticlesEditor: React.FC<SideArticlesEditorProps> = ({ data, onChange }) => {
  const handleArticleChange = (index: number, field: keyof SideArticle, value: string) => {
    const updatedArticles = [...data];
    updatedArticles[index] = {
      ...updatedArticles[index],
      [field]: value,
    } as SideArticle;
    onChange(updatedArticles);
  };

  const addArticle = () => {
    const newArticle: SideArticle = {
      title: 'New Article',
      date: 'Date',
      url: '/insights/new-article'
    };
    onChange([...data, newArticle]);
  };

  const removeArticle = (index: number) => {
    const updatedArticles = data.filter((_, i) => i !== index);
    onChange(updatedArticles);
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-medium text-gray-900">Side Articles</h3>

      <div className="space-y-6">
        {data.map((article, index) => (
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
                htmlFor={`side-article-title-${index}`}
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                id={`side-article-title-${index}`}
                value={article.title}
                onChange={(e) => handleArticleChange(index, 'title', e.target.value)}
                className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor={`side-article-date-${index}`}
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Date
              </label>
              <input
                type="text"
                id={`side-article-date-${index}`}
                value={article.date}
                onChange={(e) => handleArticleChange(index, 'date', e.target.value)}
                className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor={`side-article-url-${index}`}
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                URL
              </label>
              <input
                type="text"
                id={`side-article-url-${index}`}
                value={article.url}
                onChange={(e) => handleArticleChange(index, 'url', e.target.value)}
                className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-right">
        <button
          type="button"
          onClick={addArticle}
          className="rounded-md bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100"
        >
          + Add Article
        </button>
      </div>
    </div>
  );
};

export default SideArticlesEditor;
