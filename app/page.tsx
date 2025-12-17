import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Skills } from "@/components/skills";
import { Portfolio } from "@/components/portfolio";
import { Contact } from "@/components/contact";
import {
  getProfile,
  getSocialLinks,
  getPortfolioProjects,
  getSkills,
  type Profile,
  type SocialLink,
  type PortfolioProject,
  type Skill,
} from "@/lib/data";

const defaultProfile: Profile = {
  name: "Your Name",
  title: "Developer & Designer",
  bio: "Building beautiful digital experiences",
  about: "",
  avatar: "",
  email: "",
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
  let profile: Profile = defaultProfile;
  let socialLinks: SocialLink[] = [];
  let portfolioProjects: PortfolioProject[] = [];
  let skills: Skill[] = [];

  try {
    [profile, socialLinks, portfolioProjects, skills] = await Promise.all([
      getProfile(),
      getSocialLinks(),
      getPortfolioProjects(),
      getSkills(),
    ]);
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }

  return (
    <>
      <Navbar name={profile.name} />

      <main>
        <Hero
          name={profile.name}
          title={profile.title}
          bio={profile.bio}
          avatar={profile.avatar}
          socials={socialLinks}
        />

        <About about={profile.about} />

        <Skills skills={skills} />

        <section id="projects">
          <Portfolio projects={portfolioProjects} />
        </section>

        <Contact email={profile.email} socials={socialLinks} />
      </main>

      <footer className="py-8 border-t border-border/50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
