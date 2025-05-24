"use client";

import React, { useState, useEffect } from 'react';
import type { InsightsPageContent } from '~/types/cms';
import InsightsHeroSectionEditor from '~/components/cms/InsightsHeroSectionEditor';
import FeaturedArticleEditor from '~/components/cms/FeaturedArticleEditor';
import SideArticlesEditor from '~/components/cms/SideArticlesEditor';
import NewsGridEditor from '~/components/cms/NewsGridEditor';
import VideoSectionEditor from '~/components/cms/VideoSectionEditor';
import { getInsightsPageContent, saveInsightsPageContent } from '~/data/insights';
import { getInsightsPageContentFromSupabase, saveInsightsPageContentToSupabase } from '~/data/insights-supabase';

export default function InsightsPageEditor() {
  const [content, setContent] = useState<InsightsPageContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [useSupabase, setUseSupabase] = useState(true);

  // Load content on page load
  useEffect(() => {
    const loadContent = async () => {
      try {
        let insightsPageContent: InsightsPageContent;

        if (useSupabase) {
          insightsPageContent = await getInsightsPageContentFromSupabase();
        } else {
          insightsPageContent = getInsightsPageContent();
        }

        setContent(insightsPageContent);
        setIsLoading(false);
      } catch (e) {
        console.error('Error loading insights page content:', e);
        setIsLoading(false);
      }
    };

    // Use void operator to handle the promise
    void loadContent();
  }, [useSupabase]);

  const handleSave = async () => {
    if (!content) return;

    setSaveStatus('saving');
    try {
      let success = false;

      if (useSupabase) {
        success = await saveInsightsPageContentToSupabase(content);
      } else {
        success = saveInsightsPageContent(content);
      }

      if (success) {
        setSaveStatus('success');
        setTimeout(() => setSaveStatus('idle'), 3000);
      } else {
        setSaveStatus('error');
      }
    } catch (e) {
      console.error('Error saving insights page content:', e);
      setSaveStatus('error');
    }
  };

  const toggleStorageMode = () => {
    setIsLoading(true);
    setUseSupabase(!useSupabase);
  };

  if (isLoading || !content) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
        <span className="ml-2">Loading content...</span>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">Edit Insights Page</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <label htmlFor="storage-toggle" className="mr-2 text-sm text-gray-600">
              {useSupabase ? 'Using Supabase' : 'Using LocalStorage'}
            </label>
            <div className="relative inline-block w-10 select-none transition duration-200 ease-in">
              <input
                type="checkbox"
                name="storage-toggle"
                id="storage-toggle"
                checked={useSupabase}
                onChange={toggleStorageMode}
                className="toggle-checkbox absolute h-6 w-6 cursor-pointer appearance-none rounded-full bg-white shadow-md transition-transform duration-300 ease-in-out checked:translate-x-full checked:border-blue-500 checked:bg-blue-500"
              />
              <label
                htmlFor="storage-toggle"
                className="toggle-label block h-6 cursor-pointer overflow-hidden rounded-full bg-gray-300 checked:bg-blue-500"
              ></label>
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={saveStatus === 'saving'}
            className={`rounded-md px-4 py-2 text-white transition ${
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
              : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="space-y-8">
        <InsightsHeroSectionEditor
          data={content.hero}
          onChange={(newHero) => setContent({ ...content, hero: newHero })}
        />

        <FeaturedArticleEditor
          data={content.featuredArticle}
          onChange={(newFeaturedArticle) => setContent({ ...content, featuredArticle: newFeaturedArticle })}
        />

        <SideArticlesEditor
          data={content.sideArticles}
          onChange={(newSideArticles) => setContent({ ...content, sideArticles: newSideArticles })}
        />

        <NewsGridEditor
          data={content.newsGrid}
          onChange={(newNewsGrid) => setContent({ ...content, newsGrid: newNewsGrid })}
        />

        <VideoSectionEditor
          data={content.videoSection}
          onChange={(newVideoSection) => setContent({ ...content, videoSection: newVideoSection })}
        />

        <div className="flex justify-end py-6">
          <button
            onClick={handleSave}
            disabled={saveStatus === 'saving'}
            className={`rounded-md px-6 py-3 text-white transition ${
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
              : 'Save Changes'}
          </button>
        </div>
      </div>

      <style jsx>{`
        .toggle-checkbox:checked + .toggle-label {
          background-color: #3b82f6;
        }
        .toggle-checkbox:focus + .toggle-label {
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
        }
      `}</style>
    </div>
  );
}
