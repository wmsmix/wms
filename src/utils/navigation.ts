/**
 * Triggers a navigation refresh event
 * Useful for refreshing the navbar after CMS changes
 */
export function refreshNavigation(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('refreshNavigation'));
  }
}

/**
 * Triggers a navigation refresh with a delay
 * Useful for ensuring database changes are processed before refresh
 */
export function refreshNavigationDelayed(delayMs = 1000): void {
  setTimeout(() => {
    refreshNavigation();
  }, delayMs);
}
