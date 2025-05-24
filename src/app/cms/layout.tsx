"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Sidebar component
const Sidebar = ({ isOpen, toggleSidebar }: { isOpen: boolean; toggleSidebar: () => void }) => {
  return (
    <div
      className={`fixed top-0 left-0 z-40 h-screen transition-transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}
    >
      <div className="h-full w-64 bg-white px-3 py-4 text-gray-800 shadow-md">
        <div className="mb-6 flex items-center justify-between px-2">
          <div className="text-xl font-semibold">WMS CMS</div>
          <button
            onClick={toggleSidebar}
            className="rounded-lg p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 md:hidden"
          >
            <svg
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <nav className="space-y-2">
          <Link href="/cms" className="flex items-center rounded-lg p-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600">
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
            </svg>
            <span className="ml-3">Dashboard</span>
          </Link>
          <Link
            href="/cms/homepage"
            className="flex items-center rounded-lg p-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600"
          >
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <span className="ml-3">Homepage</span>
          </Link>
          <Link
            href="/cms/about"
            className="flex items-center rounded-lg p-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600"
          >
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1v-3a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="ml-3">About Page</span>
          </Link>
          <Link
            href="/cms/insights"
            className="flex items-center rounded-lg p-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600"
          >
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="ml-3">Insights Page</span>
          </Link>
          <Link
            href="/cms/projects"
            className="flex items-center rounded-lg p-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600"
          >
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H3.862a2 2 0 01-1.995-1.858L1 7m18 0l-2-4H5L3 7m16 0H3m9 4v6m-4-6v6m8-6v6" />
            </svg>
            <span className="ml-3">Projects Page</span>
          </Link>
          <Link
            href="/cms/products-page"
            className="flex items-center rounded-lg p-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600"
          >
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fillRule="evenodd" d="M10 2L3 7v11a2 2 0 002 2h10a2 2 0 002-2V7l-7-5zM8 16H6v-2h2v2zm0-4H6v-2h2v2zm4 4h-2v-2h2v2zm0-4h-2v-2h2v2z" clipRule="evenodd" />
            </svg>
            <span className="ml-3">Products Page</span>
          </Link>
          <div className="h-px bg-gray-200 my-5"></div>
          <Link
            href="/"
            className="flex items-center rounded-lg p-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600"
          >
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <span className="ml-3">Back to Website</span>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default function CMSLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 md:ml-64">
        <header className="bg-white shadow-sm">
          <div className="h-16 flex items-center justify-between px-4 md:px-6">
            <button
              onClick={toggleSidebar}
              className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 md:hidden"
            >
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div className="text-xl font-medium text-gray-800 md:hidden">WMS CMS</div>
            <div className="ml-auto">
              <span className="text-gray-600">Content Management System</span>
            </div>
          </div>
        </header>

        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
