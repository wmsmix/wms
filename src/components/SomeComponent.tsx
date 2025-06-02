"use client";

import { useRef } from 'react';
import { useSmoothScroll } from '~/contexts/SmoothScrollContext';

const SomeComponent = () => {
  const { lenis, isReady } = useSmoothScroll();
  const sectionRef = useRef<HTMLDivElement>(null);

  // Contoh penggunaan untuk scroll ke elemen
  const scrollToSection = () => {
    if (isReady && lenis && sectionRef.current) {
      lenis.scrollTo(sectionRef.current, {
        offset: -100, // Offset dari top
        duration: 1.5, // Durasi animasi dalam detik
      });
    }
  };

  return (
    <div>
      <button onClick={scrollToSection}>Scroll to Section</button>
      <div ref={sectionRef}>Target Section</div>
    </div>
  );
};

export default SomeComponent;
