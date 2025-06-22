"use client";

import React, { useEffect, useState } from 'react';

import type { PrecastPageContent } from '~/types/cms';
import {
  getPrecastContentFromSupabase,
  savePrecastContentToSupabase,
} from '~/data/precast-supabase';
import { refreshNavigationDelayed } from '~/utils/navigation';
import PrecastClippedSectionEditor from '~/components/cms/PrecastClippedSectionEditor';
import PrecastFeaturesSectionEditor from '~/components/cms/PrecastFeaturesSectionEditor';
import PrecastHeroSectionEditor from '~/components/cms/PrecastHeroSectionEditor';
import PrecastProductsSectionEditor from '~/components/cms/PrecastProductsSectionEditor';

export default function PrecastConcreteCMSPage() {
  const [content, setContent] = useState<PrecastPageContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  // Load content on page load
  useEffect(() => {
    const loadData = async () => {
      try {
        const precastContent = await getPrecastContentFromSupabase();
        setContent(precastContent);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading precast data:', error);
        setIsLoading(false);
      }
    };

    void loadData();
  }, []);

  const handleSavePageContent = async () => {
    if (!content) {
      return;
    }

    setSaveStatus('saving');
    try {
      const success = await savePrecastContentToSupabase(content);

      if (success) {
        setSaveStatus('success');
        setTimeout(() => setSaveStatus('idle'), 3000);

        // Refresh navigation to reflect product name changes
        refreshNavigationDelayed();
      } else {
        setSaveStatus('error');
      }
    } catch (error) {
      console.error('Error saving precast content:', error);
      setSaveStatus('error');
    }
  };

  if (isLoading || !content) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
          <span className="text-lg text-gray-600">Loading precast content...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-800">Edit Precast Concrete Page</h1>
          <button
            onClick={handleSavePageContent}
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
          <PrecastHeroSectionEditor
            data={content.hero}
            onChange={(newHero) => setContent({ ...content, hero: newHero })}
          />

          <PrecastFeaturesSectionEditor
            data={content.features}
            onChange={(newFeatures) => setContent({ ...content, features: newFeatures })}
          />

          <PrecastProductsSectionEditor
            data={content.productsSection}
            onChange={(newProductsSection) => setContent({ ...content, productsSection: newProductsSection })}
          />

          <PrecastClippedSectionEditor
            data={content.clippedSection}
            onChange={(newClippedSection) => setContent({ ...content, clippedSection: newClippedSection })}
          />

          <div className="flex justify-end py-4">
            <button
              onClick={handleSavePageContent}
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
    </div>
  );
}
