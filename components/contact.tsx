"use client";

import { motion } from "framer-motion";
import { Mail, Twitter, Linkedin, Github, Instagram, Youtube, Globe, type LucideIcon } from "lucide-react";
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

interface ContactProps {
  email: string;
  socials: SocialLink[];
}

export function Contact({ email, socials }: ContactProps) {
  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-heading">Contact</p>
          <h2 className="section-title">Get in touch</h2>
          <p className="text-muted-foreground mb-8">
            Interested in working together? Feel free to reach out!
          </p>
        </motion.div>

        {email && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <Button
              size="lg"
              className="rounded-full px-8"
              asChild
            >
              <a href={`mailto:${email}`}>
                <Mail className="mr-2 h-5 w-5" />
                {email}
              </a>
            </Button>
          </motion.div>
        )}

        {socials.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
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
