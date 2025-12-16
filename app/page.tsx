import { Hero } from "@/components/hero";
import { SocialLinks } from "@/components/social-links";
import { Portfolio } from "@/components/portfolio";
import {
  getSocialLinks,
  getPortfolioProjects,
  type SocialLink,
  type PortfolioProject,
} from "@/lib/data";

export default async function Home() {
  // Fetch data from Google Sheets (with caching)
  let socialLinks: SocialLink[] = [];
  let portfolioProjects: PortfolioProject[] = [];

  try {
    [socialLinks, portfolioProjects] = await Promise.all([
      getSocialLinks(),
      getPortfolioProjects(),
    ]);
  } catch (error) {
    console.error("Failed to fetch data:", error);
    // Continue with empty arrays - components will handle gracefully
  }

  return (
    <main className="min-h-screen">
      <Hero
        name="Your Name"
        title="Developer & Designer"
        bio="Building beautiful digital experiences with modern technologies"
      />

      <SocialLinks links={socialLinks} />

      <Portfolio projects={portfolioProjects} />

      <footer className="py-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Your Name. All rights reserved.</p>
      </footer>
    </main>
  );
}
