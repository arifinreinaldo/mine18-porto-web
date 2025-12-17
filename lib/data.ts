import { unstable_cache } from "next/cache";
import {
  fetchSocialLinks,
  fetchPortfolioProjects,
  fetchProfile,
  fetchSkills,
  type SocialLink,
  type PortfolioProject,
  type Profile,
  type Skill,
} from "./google-sheets";

// Cache for 30 days (in seconds)
const CACHE_DURATION = 30 * 24 * 60 * 60;

export const getProfile = unstable_cache(
  async (): Promise<Profile> => {
    return fetchProfile();
  },
  ["profile"],
  {
    revalidate: CACHE_DURATION,
    tags: ["profile", "all-data"],
  }
);

export const getSocialLinks = unstable_cache(
  async (): Promise<SocialLink[]> => {
    return fetchSocialLinks();
  },
  ["socials"],
  {
    revalidate: CACHE_DURATION,
    tags: ["socials", "all-data"],
  }
);

export const getPortfolioProjects = unstable_cache(
  async (): Promise<PortfolioProject[]> => {
    return fetchPortfolioProjects();
  },
  ["portfolio"],
  {
    revalidate: CACHE_DURATION,
    tags: ["portfolio", "all-data"],
  }
);

export const getSkills = unstable_cache(
  async (): Promise<Skill[]> => {
    return fetchSkills();
  },
  ["skills"],
  {
    revalidate: CACHE_DURATION,
    tags: ["skills", "all-data"],
  }
);

export type { SocialLink, PortfolioProject, Profile, Skill };
