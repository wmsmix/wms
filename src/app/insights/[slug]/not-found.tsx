"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NotFound() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to the root 404 page
    router.push("/404");
  }, [router]);
  
  return null; // This component won't render anything as it immediately redirects
} 