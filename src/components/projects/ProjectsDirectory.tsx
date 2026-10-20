'use client';

import React, { useState, useMemo } from 'react';
import { Project, ProjectCategory } from '@/lib/types';
import ProjectCard from '@/components/projects/ProjectCard';
import DecorSlot from '@/components/decor/DecorSlot';
import { Sparkles, Search } from 'lucide-react';

interface ProjectsDirectoryProps {
  initialProjects: Project[];
}

const CATEGORIES: { label: ProjectCategory; pastel: string }[] = [
  { label: 'All', pastel: 'hover:bg-lavender-light' },
  { label: '3D Design', pastel: 'hover:bg-periwinkle-light' },
  { label: 'Motion Graphics', pastel: 'hover:bg-babyPink-light' },
  { label: 'Packaging', pastel: 'hover:bg-peach-light' },
  { label: 'Branding', pastel: 'hover:bg-mint-light' },
  { label: 'AI Video', pastel: 'hover:bg-butterYellow-light' },
];

export default function ProjectsDirectory({ initialProjects }: ProjectsDirectoryProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = useMemo(() => {
    return initialProjects.filter((project) => {
      const matchesCategory =
        selectedCategory === 'All' || project.category.toLowerCase().includes(selectedCategory.toLowerCase());
      const matchesSearch =
        searchQuery === '' ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tools.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [initialProjects, selectedCategory, searchQuery]);

  return (
    <div className="py-12 md:py-20 relative overflow-hidden">
      {/* 3D Decor Slot: Cube in safe negative corner */}
      <div className="max-w-7xl mx-auto px-4 relative">
        <DecorSlot slot="cube" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-lavender-light dark:bg-lavender-dark/20 text-deepInk dark:text-lavender-light text-xs font-bold uppercase tracking-wider border border-lavender-border/50 dark:border-lavender/20 shadow-sm mb-3">
            <Sparkles className="w-3.5 h-3.5 text-deepInk dark:text-lavender-light" />
            <span>Creative Showcase</span>
          </div>
          <h1 className="font-serif font-black text-4xl sm:text-5xl lg:text-6xl text-deepInk dark:text-white tracking-tight">
            Projects & Case Studies
          </h1>
          <p className="mt-3 text-base sm:text-lg text-bodyText dark:text-lavender-light/80 font-medium">
            Explore 3D product renders, soft-drink packaging, kinetic motion reels, and brand systems created with Blender, After Effects, and AI pipelines.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="mb-12 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 bg-white/80 dark:bg-[#1E1B33]/80 backdrop-blur-md p-2 rounded-full border border-lavender/40 dark:border-white/10 shadow-[0_2px_8px_rgba(46,42,79,0.04)]">
              {CATEGORIES.map(({ label, pastel }) => {
                const active = selectedCategory === label;
                return (
                  <button
                    key={label}
                    onClick={() => setSelectedCategory(label)}
                    className={`btn-tactile px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-150 ${
                      active
                        ? 'btn-tactile-dark bg-deepInk text-white shadow-sm'
                        : `btn-tactile-white text-deepInk dark:text-lavender-light ${pastel} dark:hover:bg-white/10`
                    }`}
                  >
                    <span className="relative z-10">{label}</span>
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects or tools..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white dark:bg-[#1E1B33] border border-lavender/50 dark:border-white/10 text-deepInk dark:text-white text-xs sm:text-sm font-medium focus:outline-none focus:border-deepInk shadow-sm transition-all"
              />
              <Search className="w-4 h-4 text-bodyText-muted dark:text-lavender-light/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>

        {/* Project Card Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} priority={idx < 3} />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-[#1E1B33] rounded-[32px] border border-lavender/50 dark:border-white/10 p-12 text-center max-w-md mx-auto shadow-sm">
            <p className="font-serif font-bold text-xl text-deepInk dark:text-white mb-2">
              No projects found
            </p>
            <p className="text-sm text-bodyText-muted dark:text-lavender-light/70 font-medium mb-4">
              Try selecting another category or clearing your search keywords.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 rounded-full bg-deepInk text-white text-xs font-bold shadow-sm hover:bg-deepInk-hover"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
