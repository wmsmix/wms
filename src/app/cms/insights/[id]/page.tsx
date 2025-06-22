"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function InsightsRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to insight-posts management page
    router.replace('/cms/insight-posts');
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="text-center">
        <div className="mx-auto h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
        <p className="mt-4 text-gray-700">Redirecting to Insight Posts management...</p>
      </div>
    </div>
  );
}
