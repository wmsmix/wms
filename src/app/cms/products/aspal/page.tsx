"use client";

import React, { useState, useEffect } from 'react';
import type { AspalPageContent } from '~/types/cms';
import AspalHeroSectionEditor from '~/components/cms/AspalHeroSectionEditor';
import AspalProductSectionEditor from '~/components/cms/AspalProductSectionEditor';
import AspalFeatureSectionEditor from '~/components/cms/AspalFeatureSectionEditor';
import AspalClippedSectionEditor from '~/components/cms/AspalClippedSectionEditor';
import {
  getAspalContentFromSupabase,
  saveAspalContentToSupabase
} from '~/data/aspal-supabase';
import { refreshNavigationDelayed } from '~/utils/navigation';

export default function AspalEditor() {
  const [content, setContent] = useState<AspalPageContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [insightsSectionTitle, setInsightsSectionTitle] = useState('');
  // Load content on page load
  useEffect(() => {
    const loadContent = async () => {
      try {
        const aspalContent = await getAspalContentFromSupabase();
        setContent(aspalContent);
        setInsightsSectionTitle(aspalContent.insightsSectionTitle);
        setIsLoading(false);
      } catch (e) {
        console.error('Error loading aspal content:', e);
        setIsLoading(false);
      }
    };

    void loadContent();
  }, []);

  const handleSave = async () => {
    if (!content) return;

    setSaveStatus('saving');
    try {
      const updatedContent = { ...content, insightsSectionTitle };
      const success = await saveAspalContentToSupabase(updatedContent);

      if (success) {
        setSaveStatus('success');
        setTimeout(() => setSaveStatus('idle'), 3000);

        // Refresh navigation to reflect product name changes
        refreshNavigationDelayed();
      } else {
        setSaveStatus('error');
      }
    } catch (e) {
      console.error('Error saving aspal content:', e);
      setSaveStatus('error');
    }
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
        <h1 className="text-2xl font-semibold text-gray-800">Edit Aspal Page</h1>
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

      <div className="space-y-8">
        <AspalHeroSectionEditor
          data={content.hero}
          onChange={(newHero) => setContent({ ...content, hero: newHero })}
        />

        <AspalProductSectionEditor
          data={content.lapisPermukaan}
          onChange={(newSection) => setContent({ ...content, lapisPermukaan: newSection })}
          title="Laston Lapis Permukaan"
          folderPath="aspal/lapis-permukaan"
        />

        <AspalFeatureSectionEditor
          data={content.lapisAntara}
          onChange={(newSection) => setContent({ ...content, lapisAntara: newSection })}
          title="Laston Lapis Antara"
          folderPath="aspal/lapis-antara"
        />

        <AspalProductSectionEditor
          data={content.lapisPondasi}
          onChange={(newSection) => setContent({ ...content, lapisPondasi: newSection })}
          title="Laston Lapis Pondasi"
          folderPath="aspal/lapis-pondasi"
        />

        <AspalClippedSectionEditor
          data={content.clippedSection}
          onChange={(newSection) => setContent({ ...content, clippedSection: newSection })}
        />

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-medium text-gray-900">Insights Section</h3>
          <div className="mb-4">
            <label htmlFor="insightsSectionTitle" className="mb-2 block text-sm font-medium text-gray-700">
              Insights Section Title
            </label>
            <input
              type="text"
              id="insightsSectionTitle"
              value={insightsSectionTitle}
              onChange={(e) => setInsightsSectionTitle(e.target.value)}
              className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="flex justify-end py-4">
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
    </div>
  );
}
