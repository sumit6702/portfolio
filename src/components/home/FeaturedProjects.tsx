import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Project } from '@/lib/types';
import ProjectCard from '@/components/projects/ProjectCard';
import ClayButton from '@/components/3d/ClayButton';
import ClayShape from '@/components/3d/ClayShape';

interface FeaturedProjectsProps {
  projects: Project[];
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const featured = projects.filter((p) => p.featured).slice(0, 3);
  const displayProjects = featured.length > 0 ? featured : projects.slice(0, 3);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Decorative background shape */}
      <div className="absolute top-12 right-[5%] opacity-30 dark:opacity-15 pointer-events-none">
        <ClayShape type="sphere" color="teal" size="lg" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-mint dark:bg-[#113B39] text-deepTeal dark:text-mint text-xs font-extrabold uppercase tracking-wider border border-mint-border dark:border-[#1E615D] shadow-sm mb-3">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>Selected Portfolio</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-deepTeal dark:text-white tracking-tight">
              Featured Case Studies
            </h2>
            <p className="mt-2 text-base text-deepTeal-muted dark:text-mint/70 max-w-xl font-medium">
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
