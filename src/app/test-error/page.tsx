"use client";

import { useState, useEffect } from "react";

export default function TestError() {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Trigger error hanya di client-side setelah component mount
    setHasError(true);
  }, []);

  if (hasError) {
    // Error hanya terjadi di client-side
    throw new Error("Ini adalah error test");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="p-8 text-center">
        <h1 className="text-xl font-bold">Test Error Page</h1>
        <p>Loading...</p>
      </div>
    </div>
  );
}
