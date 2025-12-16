import { getCache, setCache } from "./cache";
import {
  fetchSocialLinks,
  fetchPortfolioProjects,
  type SocialLink,
  type PortfolioProject,
} from "./google-sheets";

const SOCIALS_CACHE_KEY = "socials";
const PORTFOLIO_CACHE_KEY = "portfolio";

export async function getSocialLinks(): Promise<SocialLink[]> {
  // Try to get from cache first
  const cached = getCache<SocialLink[]>(SOCIALS_CACHE_KEY);
  if (cached) {
    return cached;
  }

  // Fetch from Google Sheets
  const data = await fetchSocialLinks();

  // Cache the result
  setCache(SOCIALS_CACHE_KEY, data);

  return data;
}

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  // Try to get from cache first
  const cached = getCache<PortfolioProject[]>(PORTFOLIO_CACHE_KEY);
  if (cached) {
    return cached;
  }

  // Fetch from Google Sheets
  const data = await fetchPortfolioProjects();

  // Cache the result
  setCache(PORTFOLIO_CACHE_KEY, data);

  return data;
}

export type { SocialLink, PortfolioProject };
