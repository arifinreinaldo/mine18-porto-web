"use client";

import { motion } from "framer-motion";
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
import { Card, CardContent } from "@/components/ui/card";
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

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

interface SocialLinksProps {
  links: SocialLink[];
}

export function SocialLinks({ links }: SocialLinksProps) {
  if (links.length === 0) {
    return null;
  }

  return (
    <section className="py-16 px-4">
      <motion.h2
        className="text-3xl font-bold text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Connect With Me
      </motion.h2>

      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {links.map((link) => {
          const Icon = iconMap[link.icon.toLowerCase()] || Globe;

          return (
            <motion.div key={link.platform} variants={item}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <Card className="transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardContent className="flex flex-col items-center justify-center p-6 gap-3">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Icon className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                    </motion.div>
                    <span className="font-medium text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      {link.platform}
                    </span>
                  </CardContent>
                </Card>
              </a>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
