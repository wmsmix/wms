"use client";

import React, { useState } from 'react';
import type { Article } from '~/types/cms';
import FileUploader from './FileUploader';

interface NewsGridEditorProps {
  data: Article[];
  onChange: (data: Article[]) => void;
}

const NewsGridEditor: React.FC<NewsGridEditorProps> = ({ data, onChange }) => {
  const [activeArticle, setActiveArticle] = useState<number>(0);

  const handleArticleChange = (index: number, field: keyof Article, value: string) => {
    const updatedArticles = [...data];
    updatedArticles[index] = {
      ...updatedArticles[index],
      [field]: value,
    } as Article;
    onChange(updatedArticles);
  };

  const handleImageChange = (index: number, url: string) => {
    handleArticleChange(index, 'imageSrc', url);
  };

  const addArticle = () => {
    const newArticle: Article = {
      title: 'New News Article',
      date: '01',
      month: 'JAN',
      description: 'Article description...',
      imageSrc: '',
      url: '/insights/new-news-article'
    };
    onChange([...data, newArticle]);
  };

  const removeArticle = (index: number) => {
    const updatedArticles = data.filter((_, i) => i !== index);
    onChange(updatedArticles);

    // Adjust active article if necessary
    if (activeArticle >= updatedArticles.length && updatedArticles.length > 0) {
      setActiveArticle(updatedArticles.length - 1);
    } else if (updatedArticles.length === 0) {
      setActiveArticle(0);
    }
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-medium text-gray-900">News Grid</h3>

      {/* Article Tabs */}
      <div className="mb-6 flex flex-wrap gap-2 max-h-32 overflow-y-auto">
        {data.map((article, index) => (
          <button
            key={index}
            className={`rounded-md px-3 py-1.5 text-sm font-medium ${
              activeArticle === index
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setActiveArticle(index)}
          >
            {article.title.length > 20
              ? `${article.title.substring(0, 20)}...`
              : article.title || `Article ${index + 1}`
            }
          </button>
        ))}
        <button
          onClick={addArticle}
          className="rounded-md bg-green-50 px-3 py-1.5 text-sm font-medium text-green-700 hover:bg-green-100"
        >
          + Add Article
        </button>
      </div>

      {/* Active Article Editor */}
      {data[activeArticle] && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-md font-medium text-gray-700">
              Article {activeArticle + 1}
            </h4>
            <button
              type="button"
              onClick={() => removeArticle(activeArticle)}
              className="rounded-md bg-red-50 px-3 py-1 text-sm font-medium text-red-700 hover:bg-red-100"
            >
              Remove Article
            </button>
          </div>

          <div className="mb-4">
            <label
              htmlFor="news-title"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="news-title"
              value={data[activeArticle].title}
              onChange={(e) => handleArticleChange(activeArticle, 'title', e.target.value)}
              className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="mb-4">
              <label
                htmlFor="news-date"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Date (Number)
              </label>
              <input
                type="text"
                id="news-date"
                value={data[activeArticle].date}
                onChange={(e) => handleArticleChange(activeArticle, 'date', e.target.value)}
                className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="news-month"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Month (Text)
              </label>
              <input
                type="text"
                id="news-month"
                value={data[activeArticle].month}
                onChange={(e) => handleArticleChange(activeArticle, 'month', e.target.value)}
                className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="news-description"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="news-description"
              value={data[activeArticle].description}
              onChange={(e) => handleArticleChange(activeArticle, 'description', e.target.value)}
              rows={3}
              className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="news-url"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Article URL
            </label>
            <input
              type="text"
              id="news-url"
              value={data[activeArticle].url}
              onChange={(e) => handleArticleChange(activeArticle, 'url', e.target.value)}
              className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <FileUploader
            currentImageUrl={data[activeArticle].imageSrc}
            onImageUploaded={(url) => handleImageChange(activeArticle, url)}
            label={`Article Image ${activeArticle + 1}`}
            folderPath="news"
          />
        </div>
      )}

      {data.length === 0 && (
        <div className="rounded-md bg-gray-50 p-4 text-center text-sm text-gray-500">
          No articles added yet. Click &quot;Add Article&quot; to add one.
        </div>
      )}
    </div>
  );
};

export default NewsGridEditor;
