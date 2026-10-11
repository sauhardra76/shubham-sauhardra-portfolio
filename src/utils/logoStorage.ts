/**
 * Logo storage utility for managing user-uploaded logo and avatar images.
 * Persists images to localStorage and synchronizes across all components in real-time.
 */

const STORAGE_KEY = 'portfolio_custom_logo_v1';
const EVENT_NAME = 'portfolio_logo_updated';

export function getCustomLogo(): string | null {
  try {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to read custom logo from storage:', err);
    return null;
  }
}

export function saveCustomLogo(dataUrl: string): void {
  try {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, dataUrl);
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: dataUrl }));
  } catch (err) {
    console.error('Failed to save custom logo to storage:', err);
  }
}

export function removeCustomLogo(): void {
  try {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: null }));
  } catch (err) {
    console.error('Failed to remove custom logo from storage:', err);
  }
}

export function subscribeToLogoChanges(callback: (logoUrl: string | null) => void): () => void {
  if (typeof window === 'undefined') return () => {};

  const handleCustomEvent = (e: Event) => {
    const customEvent = e as CustomEvent<string | null>;
    callback(customEvent.detail ?? getCustomLogo());
  };

  const handleStorageEvent = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      callback(e.newValue);
    }
  };

  window.addEventListener(EVENT_NAME, handleCustomEvent);
  window.addEventListener('storage', handleStorageEvent);

  return () => {
    window.removeEventListener(EVENT_NAME, handleCustomEvent);
    window.removeEventListener('storage', handleStorageEvent);
  };
}
