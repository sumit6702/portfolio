import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Project } from '@/lib/types';
import ProjectCard from '@/components/projects/ProjectCard';
import ClayButton from '@/components/3d/ClayButton';

interface FeaturedProjectsProps {
  projects: Project[];
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const featured = projects.filter((p) => p.featured).slice(0, 3);
  const displayProjects = featured.length > 0 ? featured : projects.slice(0, 3);

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-periwinkle-light dark:bg-periwinkle/20 text-deepInk dark:text-periwinkle-light text-xs font-bold uppercase tracking-wider border border-periwinkle-border/50 dark:border-periwinkle/20 shadow-sm mb-3">
              <Sparkles className="w-3.5 h-3.5 text-deepInk dark:text-periwinkle-light" />
              <span>Selected Portfolio</span>
            </div>
            <h2 className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl text-deepInk dark:text-white tracking-tight">
              Featured Case Studies
            </h2>
            <p className="mt-2 text-base text-bodyText dark:text-lavender-light/80 max-w-xl font-normal">
              Dive into 3D brand systems, soft-drink packaging, and high-impact motion reels designed with precision and playfulness.
            </p>
          </div>

          <ClayButton
            variant="cream"
            size="md"
            href="/projects"
            className="self-start md:self-end"
          >
            All Projects
            <ArrowRight className="w-4 h-4 ml-1" />
          </ClayButton>
        </div>

        {/* Projects Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} priority={index === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
