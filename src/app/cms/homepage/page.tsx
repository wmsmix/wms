"use client";

import React, { useState, useEffect } from 'react';
import HeroSectionEditor from '~/components/cms/HeroSectionEditor';
import CertificationsEditor from '~/components/cms/CertificationsEditor';
import ProductsEditor from '~/components/cms/ProductsEditor';
import FeaturesEditor from '~/components/cms/FeaturesEditor';
import ShowcaseEditor from '~/components/cms/ShowcaseEditor';
import { HomepageContent } from '~/types/cms';
import { getHomepageContent, saveHomepageContent } from '~/data/homepage';

export default function HomepageEditor() {
  const [content, setContent] = useState<HomepageContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [tagline, setTagline] = useState('');

  // Load content on page load
  useEffect(() => {
    try {
      const homepageContent = getHomepageContent();
      setContent(homepageContent);
      setTagline(homepageContent.tagline);
      setIsLoading(false);
    } catch (e) {
      console.error('Error loading homepage content:', e);
      setIsLoading(false);
    }
  }, []);

  const handleSave = () => {
    if (!content) return;

    setSaveStatus('saving');
    try {
      const success = saveHomepageContent({ ...content, tagline });
      if (success) {
        setSaveStatus('success');
        setTimeout(() => setSaveStatus('idle'), 3000);
      } else {
        setSaveStatus('error');
      }
    } catch (e) {
      console.error('Error saving homepage content:', e);
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
        <h1 className="text-2xl font-semibold text-gray-800">Edit Homepage</h1>
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
        <HeroSectionEditor
          data={content.hero}
          onChange={(newHero) => setContent({ ...content, hero: newHero })}
        />

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-medium text-gray-900">Main Tagline</h3>
          <div className="mb-4">
            <label htmlFor="tagline" className="mb-2 block text-sm font-medium text-gray-700">
              Tagline
            </label>
            <input
              type="text"
              id="tagline"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <CertificationsEditor
          data={content.certifications}
          onChange={(newCertifications) =>
            setContent({ ...content, certifications: newCertifications })
          }
        />

        <ProductsEditor
          data={content.products}
          onChange={(newProducts) => setContent({ ...content, products: newProducts })}
        />

        <FeaturesEditor
          data={content.features}
          onChange={(newFeatures) => setContent({ ...content, features: newFeatures })}
        />

        <ShowcaseEditor
          data={content.showcase}
          onChange={(newShowcase) => setContent({ ...content, showcase: newShowcase })}
        />

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
