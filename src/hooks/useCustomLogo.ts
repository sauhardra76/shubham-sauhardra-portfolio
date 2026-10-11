import { useState, useEffect, useCallback } from 'react';
import { getCustomLogo, saveCustomLogo, removeCustomLogo, subscribeToLogoChanges } from '../utils/logoStorage';
import { PORTFOLIO_DATA } from '../config/portfolioData';

export function useCustomLogo() {
  const [logoUrl, setLogoUrl] = useState<string | null>(() => {
    const saved = getCustomLogo();
    if (saved) return saved;
    return PORTFOLIO_DATA.personal.profilePhotoUrl || null;
  });

  useEffect(() => {
    // Initial sync
    const initial = getCustomLogo() || PORTFOLIO_DATA.personal.profilePhotoUrl || null;
    setLogoUrl(initial);

    // Subscribe to changes from any component or tab
    const unsubscribe = subscribeToLogoChanges((newUrl) => {
      setLogoUrl(newUrl || PORTFOLIO_DATA.personal.profilePhotoUrl || null);
    });

    return unsubscribe;
  }, []);

  const updateLogo = useCallback((dataUrlOrPath: string) => {
    saveCustomLogo(dataUrlOrPath);
    setLogoUrl(dataUrlOrPath);
  }, []);

  const clearLogo = useCallback(() => {
    removeCustomLogo();
    setLogoUrl(PORTFOLIO_DATA.personal.profilePhotoUrl || null);
  }, []);

  return {
    logoUrl,
    hasCustomLogo: Boolean(logoUrl),
    updateLogo,
    clearLogo,
  };
}
