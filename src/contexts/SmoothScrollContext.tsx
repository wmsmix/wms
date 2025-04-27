"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type Lenis from "@studio-freight/lenis";
import { initSmoothScroll, destroyLenis, getLenis } from "~/utils/smoothScroll";

interface SmoothScrollContextType {
  lenis: Lenis | null;
  isReady: boolean;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  lenis: null,
  isReady: false,
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

interface SmoothScrollProviderProps {
  children: React.ReactNode;
  options?: Parameters<typeof initSmoothScroll>[0];
}

export const SmoothScrollProvider: React.FC<SmoothScrollProviderProps> = ({
  children,
  options,
}) => {
  const [isReady, setIsReady] = useState(false);
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const lenisInstance = initSmoothScroll(options);
      setLenis(lenisInstance);
      setIsReady(true);

      return () => {
        destroyLenis();
        setLenis(null);
        setIsReady(false);
      };
    }
  }, [options]);

  return (
    <SmoothScrollContext.Provider value={{ lenis, isReady }}>
      {children}
    </SmoothScrollContext.Provider>
  );
};
