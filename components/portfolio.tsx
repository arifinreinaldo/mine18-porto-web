"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Globe, Play, Apple } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { PortfolioProject } from "@/lib/data";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

interface PortfolioProps {
  projects: PortfolioProject[];
}

export function Portfolio({ projects }: PortfolioProps) {
  if (projects.length === 0) {
    return null;
  }

  return (
    <section className="py-20 px-4 bg-muted/30">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <p className="section-heading">Projects</p>
        <h2 className="section-title">Featured work</h2>
      </motion.div>

      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {projects.map((project) => {
          const hasLinks = project.webUrl || project.playStoreUrl || project.appStoreUrl;

          return (
            <motion.div key={project.title} variants={item}>
              <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 border-border/50 bg-card/80 backdrop-blur-sm">
                {project.image && (
                  <div className="relative h-48 overflow-hidden bg-muted">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                )}

                <CardHeader className="pb-3">
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0 flex-1 flex flex-col justify-between gap-4">
                  {/* Link Buttons */}
                  {hasLinks && (
                    <div className="flex flex-wrap gap-2">
                      {project.webUrl && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 min-w-[80px]"
                          asChild
                        >
                          <a
                            href={project.webUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Globe className="w-4 h-4 mr-1.5" />
                            Web
                          </a>
                        </Button>
                      )}

                      {project.playStoreUrl && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 min-w-[80px]"
                          asChild
                        >
                          <a
                            href={project.playStoreUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Play className="w-4 h-4 mr-1.5" />
                            Play Store
                          </a>
                        </Button>
                      )}

                      {project.appStoreUrl && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 min-w-[80px]"
                          asChild
                        >
                          <a
                            href={project.appStoreUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Apple className="w-4 h-4 mr-1.5" />
                            App Store
                          </a>
                        </Button>
                      )}
                    </div>
                  )}

                  {/* Tags */}
                  {project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs font-normal"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
