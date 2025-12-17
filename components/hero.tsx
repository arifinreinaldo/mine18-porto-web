"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Twitter,
  Linkedin,
  Github,
  Instagram,
  Youtube,
  Mail,
  Globe,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SocialLink } from "@/lib/data";

const iconMap: Record<string, LucideIcon> = {
  twitter: Twitter,
  linkedin: Linkedin,
  github: Github,
  instagram: Instagram,
  youtube: Youtube,
  email: Mail,
  mail: Mail,
  website: Globe,
  globe: Globe,
};

interface HeroProps {
  name: string;
  title: string;
  bio: string;
  avatar?: string;
  socials: SocialLink[];
}

export function Hero({ name, title, bio, avatar, socials }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 gradient-bg">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 text-center px-4 py-20">
        {/* Avatar */}
        {avatar && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden ring-4 ring-primary/20 ring-offset-4 ring-offset-background">
              <Image
                src={avatar}
                alt={name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        )}

        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-muted-foreground text-lg mb-2"
        >
          Hello, I&apos;m
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 gradient-text"
        >
          {name}
        </motion.h1>

        {/* Title */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-xl md:text-2xl text-muted-foreground mb-6"
        >
          {title}
        </motion.p>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-muted-foreground max-w-lg mx-auto mb-10"
        >
          {bio}
        </motion.p>

        {/* Social Links */}
        {socials.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center justify-center gap-2 flex-wrap"
          >
            {socials.map((social) => {
              const Icon = iconMap[social.icon.toLowerCase()] || Globe;
              return (
                <Button
                  key={social.platform}
                  variant="outline"
                  size="icon"
                  className="h-11 w-11 rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
                  asChild
                >
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.platform}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                </Button>
              );
            })}
          </motion.div>
        )}

      </div>
    </section>
  );
}
