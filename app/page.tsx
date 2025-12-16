import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { SocialLinks } from "@/components/social-links";
import { Portfolio } from "@/components/portfolio";
import {
  getProfile,
  getSocialLinks,
  getPortfolioProjects,
  type Profile,
  type SocialLink,
  type PortfolioProject,
} from "@/lib/data";

const defaultProfile: Profile = {
  name: "Your Name",
  title: "Developer & Designer",
  bio: "Building beautiful digital experiences",
};

export async function generateMetadata(): Promise<Metadata> {
  let profile = defaultProfile;

  try {
    profile = await getProfile();
  } catch {
    // Use default profile
  }

  return {
    title: `${profile.name} | Portfolio`,
    description: profile.bio,
  };
}

export default async function Home() {
  // Fetch data from Google Sheets (with caching)
  let profile: Profile = defaultProfile;
  let socialLinks: SocialLink[] = [];
  let portfolioProjects: PortfolioProject[] = [];

  try {
    [profile, socialLinks, portfolioProjects] = await Promise.all([
      getProfile(),
      getSocialLinks(),
      getPortfolioProjects(),
    ]);
  } catch (error) {
    console.error("Failed to fetch data:", error);
    // Continue with defaults - components will handle gracefully
  }

  return (
    <main className="min-h-screen">
      <Hero
        name={profile.name}
        title={profile.title}
        bio={profile.bio}
      />

      <SocialLinks links={socialLinks} />

      <Portfolio projects={portfolioProjects} />

      <footer className="py-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
      </footer>
    </main>
  );
}
