declare module '@studio-freight/lenis' {
  export interface LenisOptions {
    wrapper?: HTMLElement | Window;
    content?: HTMLElement;
    lerp?: number;
    duration?: number;
    easing?: (t: number) => number;
    orientation?: 'vertical' | 'horizontal';
    gestureOrientation?: 'vertical' | 'horizontal';
    smoothWheel?: boolean;
    smoothTouch?: boolean;
    touchMultiplier?: number;
    wheelMultiplier?: number;
    infinite?: boolean;
    autoResize?: boolean;
  }

  export interface ScrollToOptions {
    offset?: number;
    immediate?: boolean;
    duration?: number;
    easing?: (t: number) => number;
    lock?: boolean;
  }

  export default class Lenis {
    constructor(options?: LenisOptions);
    destroy(): void;
    on(event: string, callback: (event: Event) => void): void;
    off(event: string, callback: (event: Event) => void): void;
    raf(time: number): void;
    start(): void;
    stop(): void;
    
    scrollTo(
      target: HTMLElement | string | number,
      options?: ScrollToOptions
    ): void;
    
    options: LenisOptions;
  }
} 