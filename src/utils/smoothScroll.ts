import Lenis from '@studio-freight/lenis';

interface LenisOptions {
  duration?: number;
  easing?: (t: number) => number;
  orientation?: 'vertical' | 'horizontal';
  gestureOrientation?: 'vertical' | 'horizontal';
  smoothWheel?: boolean;
  smoothTouch?: boolean;
  touchMultiplier?: number;
  infinite?: boolean;
  autoResize?: boolean;
}

interface ScrollToOptions {
  offset?: number;
  immediate?: boolean;
  duration?: number;
  easing?: (t: number) => number;
  lock?: boolean;
}

// Mendeklarasikan tipe untuk instance Lenis global
let lenisInstance: Lenis | null = null;

export const initSmoothScroll = (options?: LenisOptions): Lenis => {
  if (typeof window === 'undefined') return {} as Lenis; // Untuk SSR

  // Default options
  const defaultOptions: LenisOptions = {
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
    autoResize: true,
  };

  // Buat instance Lenis
  lenisInstance = new Lenis({
    ...defaultOptions,
    ...options,
  });

  // Fungsi raf untuk update Lenis
  function raf(time: number) {
    if (lenisInstance) {
      lenisInstance.raf(time);
    }
    requestAnimationFrame(raf);
  }

  // Mulai animation frame
  requestAnimationFrame(raf);

  return lenisInstance;
};

export const scrollTo = (
  target: HTMLElement | string | number, 
  options?: ScrollToOptions
) => {
  if (!lenisInstance) return;
  lenisInstance.scrollTo(target, options);
};

export const getLenis = (): Lenis | null => {
  return lenisInstance;
};

export const destroyLenis = (): void => {
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
};

const smoothScrollExports = {
  initSmoothScroll,
  scrollTo,
  getLenis,
  destroyLenis,
};

export default smoothScrollExports; 