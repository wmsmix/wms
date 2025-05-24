"use client";

import React, { useState, useEffect } from 'react';
import type { AboutPageContent, ProfileCard } from '~/types/cms';
import AboutHeroSectionEditor from '~/components/cms/AboutHeroSectionEditor';
import AboutFeaturesEditor from '~/components/cms/AboutFeaturesEditor';
import ProcessStepsEditor from '~/components/cms/ProcessStepsEditor';
import ProfileCardsEditor from '~/components/cms/ProfileCardsEditor';
import CertificateSectionsEditor from '~/components/cms/CertificateSectionsEditor';
import { getAboutPageContent, saveAboutPageContent } from '~/data/about';
import { getAboutPageContentFromSupabase, saveAboutPageContentToSupabase } from '~/data/about-supabase';

export default function AboutPageEditor() {
  const [content, setContent] = useState<AboutPageContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [mainTitle, setMainTitle] = useState('');
  const [useSupabase, setUseSupabase] = useState(true);

  // Load content on page load
  useEffect(() => {
    const loadContent = async () => {
      try {
        let aboutPageContent: AboutPageContent;

        if (useSupabase) {
          aboutPageContent = await getAboutPageContentFromSupabase();
        } else {
          aboutPageContent = getAboutPageContent();
        }

        setContent(aboutPageContent);
        setMainTitle(aboutPageContent.mainTitle);
        setIsLoading(false);
      } catch (e) {
        console.error('Error loading about page content:', e);
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
      const updatedContent = { ...content, mainTitle };
      let success = false;

      if (useSupabase) {
        success = await saveAboutPageContentToSupabase(updatedContent);
      } else {
        success = saveAboutPageContent(updatedContent);
      }

      if (success) {
        setSaveStatus('success');
        setTimeout(() => setSaveStatus('idle'), 3000);
      } else {
        setSaveStatus('error');
      }
    } catch (e) {
      console.error('Error saving about page content:', e);
      setSaveStatus('error');
    }
  };

  const toggleStorageMode = () => {
    setIsLoading(true);
    setUseSupabase(!useSupabase);
  };

  const handleProfilesChange = (visi: ProfileCard, misi: ProfileCard) => {
    if (!content) return;
    setContent({
      ...content,
      profiles: { visi, misi }
    });
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
        <h1 className="text-2xl font-semibold text-gray-800">Edit About Page</h1>
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
        <AboutHeroSectionEditor
          data={content.hero}
          onChange={(newHero) => setContent({ ...content, hero: newHero })}
        />

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-medium text-gray-900">Main Title</h3>
          <div className="mb-4">
            <label htmlFor="mainTitle" className="mb-2 block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="mainTitle"
              value={mainTitle}
              onChange={(e) => setMainTitle(e.target.value)}
              className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <AboutFeaturesEditor
          data={content.features}
          onChange={(newFeatures) => setContent({ ...content, features: newFeatures })}
        />

        <ProcessStepsEditor
          data={content.processSteps}
          onChange={(newSteps) => setContent({ ...content, processSteps: newSteps })}
        />

        <ProfileCardsEditor
          visi={content.profiles.visi}
          misi={content.profiles.misi}
          onChange={handleProfilesChange}
        />

        <CertificateSectionsEditor
          data={content.certificateSections}
          onChange={(newSections) => setContent({ ...content, certificateSections: newSections })}
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
