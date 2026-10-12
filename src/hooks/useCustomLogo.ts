import { PORTFOLIO_DATA } from '../config/portfolioData';

export function useCustomLogo() {
  const logoUrl = PORTFOLIO_DATA.personal.profilePhotoUrl || null;

  return {
    logoUrl,
    hasCustomLogo: Boolean(logoUrl),
  };
}
