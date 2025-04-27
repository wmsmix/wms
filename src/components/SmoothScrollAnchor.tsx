"use client";

import { useEffect } from "react";
import { useSmoothScroll } from "~/contexts/SmoothScrollContext";

export default function SmoothScrollAnchor() {
  const { lenis, isReady } = useSmoothScroll();

  useEffect(() => {
    if (!isReady || !lenis) return;

    // Gunakan delegasi event untuk menangkap semua link anchor, termasuk yang dibuat dinamis
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      
      if (!anchor) return;
      
      const href = anchor.getAttribute("href");
      if (!href?.startsWith("#")) return;
      
      e.preventDefault();
      
      // Handle kasus untuk scroll ke top page (href="#")
      if (href === "#") {
        lenis.scrollTo(0, {
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
        window.history.pushState({}, "", href);
        return;
      }
      
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        // Log untuk debugging
        console.log(`Scrolling to element with id: ${targetId}`);
        
        try {
          lenis.scrollTo(targetElement, {
            duration: 1.2,
            offset: -80, // Sesuaikan offset jika Anda memiliki header fixed
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
          
          // Update URL tanpa reload
          window.history.pushState({}, "", href);
        } catch (err) {
          console.error("Error scrolling with Lenis:", err);
        }
      } else {
        console.warn(`Target element with id '${targetId}' not found`);
      }
    };
    
    // Tambahkan event listener pada document untuk event delegation
    document.addEventListener("click", handleClick);
    
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [lenis, isReady]);

  return null;
}
