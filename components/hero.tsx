"use client";

import { motion } from "framer-motion";

interface HeroProps {
  name?: string;
  title?: string;
  bio?: string;
}

export function Hero({
  name = "Your Name",
  title = "Developer & Designer",
  bio = "Building beautiful digital experiences",
}: HeroProps) {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 gradient-bg opacity-10" />

      {/* Floating shapes for visual interest */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        animate={{
          x: [0, -20, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {name}
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-muted-foreground mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          {title}
        </motion.p>

        <motion.p
          className="text-lg text-muted-foreground/80 max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
          {bio}
        </motion.p>
      </div>
    </section>
  );
}
