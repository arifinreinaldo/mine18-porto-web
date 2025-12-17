"use client";

import { motion } from "framer-motion";

interface AboutProps {
  about: string;
}

export function About({ about }: AboutProps) {
  if (!about) return null;

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="section-heading">About Me</p>
          <h2 className="section-title">Get to know me</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-card rounded-2xl p-8 md:p-12 border border-border/50 shadow-sm"
        >
          <p className="text-muted-foreground leading-relaxed text-lg whitespace-pre-line">
            {about}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
