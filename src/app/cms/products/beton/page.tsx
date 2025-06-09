"use client";

import React, { useState, useEffect } from 'react';
import type { BetonPageContent } from '~/types/cms';
import {
  getBetonContentFromSupabase,
  saveBetonContentToSupabase
} from '~/data/beton-supabase';
import { refreshNavigationDelayed } from '~/utils/navigation';
import BetonHeroSectionEditor from '~/components/cms/BetonHeroSectionEditor';
import BetonProductSectionEditor from '~/components/cms/BetonProductSectionEditor';
import BetonClippedSectionEditor from '~/components/cms/BetonClippedSectionEditor';

export default function BetonCMSPage() {
  const [content, setContent] = useState<BetonPageContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [insightsSectionTitle, setInsightsSectionTitle] = useState('');

  // Load content on page load
  useEffect(() => {
    const loadContent = async () => {
      try {
        const betonContent = await getBetonContentFromSupabase();
        setContent(betonContent);
        setInsightsSectionTitle(betonContent.insightsSectionTitle);
        setIsLoading(false);
      } catch (e) {
        console.error('Error loading beton content:', e);
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
      const success = await saveBetonContentToSupabase(updatedContent);

      if (success) {
        setSaveStatus('success');
        setTimeout(() => setSaveStatus('idle'), 3000);

        // Refresh navigation to reflect product name changes
        refreshNavigationDelayed();
      } else {
        setSaveStatus('error');
      }
    } catch (e) {
      console.error('Error saving beton content:', e);
      setSaveStatus('error');
    }
  };

  if (isLoading || !content) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg text-gray-600">Loading beton content...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-800">Edit Beton Page</h1>
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
          <BetonHeroSectionEditor
            hero={content.hero}
            onChange={(hero) => setContent({ ...content, hero })}
          />

          <BetonProductSectionEditor
            section={content.nonStruktural}
            sectionTitle="Beton Non-Struktural Section"
            onChange={(nonStruktural) => setContent({ ...content, nonStruktural })}
          />

          <BetonProductSectionEditor
            section={content.struktural}
            sectionTitle="Beton Struktural & Infrastruktur Section"
            onChange={(struktural) => setContent({ ...content, struktural })}
          />

          <BetonClippedSectionEditor
            clippedSection={content.clippedSection}
            onChange={(clippedSection) => setContent({ ...content, clippedSection })}
          />

          <div className="rounded-lg border bg-white p-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">Insights Section</h3>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Section Title
              </label>
              <input
                type="text"
                value={insightsSectionTitle}
                onChange={(e) => setInsightsSectionTitle(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Lihat Insight Proyek"
              />
            </div>
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
