"use client";

import Link from 'next/link';
import React from 'react';

export default function CMSDashboard() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold text-gray-800">Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Dashboard Cards */}
        <Link
          href="/cms/homepage"
          className="block rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
        >
          <div className="mb-2 flex items-center justify-between">
            <h5 className="text-xl font-medium text-gray-900">Homepage</h5>
            <svg
              className="h-6 w-6 text-gray-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </div>
          <p className="text-gray-600">
            Manage homepage content including hero section, products, and featured sections.
          </p>
          <div className="mt-4">
            <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
              Edit Page
            </span>
          </div>
        </Link>

        {/* Coming Soon Cards */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm opacity-70">
          <div className="mb-2 flex items-center justify-between">
            <h5 className="text-xl font-medium text-gray-900">About Page</h5>
            <svg
              className="h-6 w-6 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1v-3a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <p className="text-gray-600">
            Manage about page content including company profile, vision, and certificates.
          </p>
          <div className="mt-4">
            <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
              Coming Soon
            </span>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm opacity-70">
          <div className="mb-2 flex items-center justify-between">
            <h5 className="text-xl font-medium text-gray-900">Products</h5>
            <svg
              className="h-6 w-6 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1v-3a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <p className="text-gray-600">
            Manage product listings, descriptions, and specifications.
          </p>
          <div className="mt-4">
            <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
              Coming Soon
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-lg bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">Quick Statistics</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-sm font-medium text-gray-500">Pages</p>
            <p className="text-2xl font-semibold text-gray-900">1 / 5</p>
          </div>
          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-sm font-medium text-gray-500">Products</p>
            <p className="text-2xl font-semibold text-gray-900">3</p>
          </div>
          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-sm font-medium text-gray-500">Projects</p>
            <p className="text-2xl font-semibold text-gray-900">1</p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Recent Updates</h2>
        </div>
        <div className="mt-4 rounded-lg bg-white p-6 shadow-sm">
          <div className="text-center text-gray-500 py-6">
            No recent updates to display.
          </div>
        </div>
      </div>
    </div>
  );
}
