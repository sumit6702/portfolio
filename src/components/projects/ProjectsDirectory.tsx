'use client';

import React, { useState, useMemo } from 'react';
import { Project, ProjectCategory } from '@/lib/types';
import ProjectCard from '@/components/projects/ProjectCard';
import ClayShape from '@/components/3d/ClayShape';
import { Sparkles, Search, SlidersHorizontal } from 'lucide-react';

interface ProjectsDirectoryProps {
  initialProjects: Project[];
}

const CATEGORIES: ProjectCategory[] = [
  'All',
  '3D Design',
  'Motion Graphics',
  'Packaging',
  'Branding',
  'AI Video',
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
      {/* Decorative 3D background shapes */}
      <div className="absolute top-10 right-10 opacity-20 pointer-events-none">
        <ClayShape type="torus" color="teal" size="xl" />
      </div>
      <div className="absolute top-1/2 left-4 opacity-20 pointer-events-none">
        <ClayShape type="sphere" color="coral" size="lg" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-mint text-deepTeal text-xs font-extrabold uppercase tracking-wider border border-mint-border shadow-sm mb-3">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>Creative Showcase</span>
          </div>
          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-deepTeal tracking-tight">
            Projects & Case Studies
          </h1>
          <p className="mt-3 text-base sm:text-lg text-deepTeal-muted font-medium">
            Explore 3D product renders, soft-drink packaging, kinetic motion reels, and brand systems created with Blender, After Effects, and AI pipelines.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="mb-12 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 bg-white/80 backdrop-blur-md p-2 rounded-3xl border-2 border-mint shadow-[0_4px_0_#99F6E4]">
              {CATEGORIES.map((cat) => {
                const active = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-extrabold transition-all duration-150 ${
                      active
                        ? 'bg-primary text-white shadow-[0_3px_0_#0D9488] -translate-y-0.5'
                        : 'text-deepTeal hover:bg-mint hover:text-deepTeal active:translate-y-0.5'
                    }`}
                  >
                    {cat}
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
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border-2 border-mint text-deepTeal text-xs sm:text-sm font-bold focus:outline-none focus:border-primary focus:ring-2 focus:ring-mint shadow-[0_3px_0_#99F6E4] transition-all"
              />
              <Search className="w-4 h-4 text-deepTeal-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
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
          <div className="bg-white rounded-3xl border-2 border-mint p-12 text-center max-w-md mx-auto shadow-[0_6px_0_#99F6E4]">
            <p className="font-display font-bold text-xl text-deepTeal mb-2">
              No projects found
            </p>
            <p className="text-sm text-deepTeal-muted font-medium mb-4">
              Try selecting another category or clearing your search keywords.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold shadow-[0_3px_0_#0D9488]"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
