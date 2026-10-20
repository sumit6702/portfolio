import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Play } from 'lucide-react';
import { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

export default function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
    '3D Design': {
      bg: 'bg-periwinkle-light dark:bg-periwinkle-dark/20',
      text: 'text-deepInk dark:text-periwinkle-light',
      border: 'border-periwinkle-border dark:border-periwinkle/30',
    },
    'Motion Graphics': {
      bg: 'bg-babyPink-light dark:bg-babyPink-dark/20',
      text: 'text-deepInk dark:text-babyPink-light',
      border: 'border-babyPink-border dark:border-babyPink/30',
    },
    'Packaging': {
      bg: 'bg-peach-light dark:bg-peach-dark/20',
      text: 'text-deepInk dark:text-peach-light',
      border: 'border-peach-border dark:border-peach/30',
    },
    'Branding': {
      bg: 'bg-mint-light dark:bg-mint-dark/20',
      text: 'text-deepInk dark:text-mint-light',
      border: 'border-mint-border dark:border-mint/30',
    },
    'AI Video': {
      bg: 'bg-butterYellow-light dark:bg-butterYellow-dark/20',
      text: 'text-deepInk dark:text-butterYellow-light',
      border: 'border-butterYellow-border dark:border-butterYellow/30',
    },
  };

  const badge = categoryColors[project.category] || {
    bg: 'bg-lavender-light dark:bg-lavender-dark/20',
    text: 'text-deepInk dark:text-lavender-light',
    border: 'border-lavender-border dark:border-lavender/30',
  };

  return (
    <div className="group relative bg-white dark:bg-[#1E1B33] rounded-[28px] border border-lavender/50 dark:border-white/10 p-4 transition-all duration-300 card-float card-shimmer flex flex-col h-full">
      {/* Cover Image Container */}
      <Link
        href={`/projects/${project.slug}`}
        className="relative block w-full aspect-[16/10] rounded-2xl overflow-hidden bg-bg dark:bg-[#161426] mb-4"
      >
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
        />

        {/* Video indicator badge if applicable */}
        {project.videoUrl && (
          <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-deepInk/85 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1.5 shadow-md group-hover:scale-105 transition-transform">
            <Play className="w-3 h-3 fill-white" />
            <span>Video Reel</span>
          </div>
        )}

        {/* Category sticker pill */}
        <div className="absolute top-3 left-3">
          <span
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${badge.bg} ${badge.text} ${badge.border} shadow-sm backdrop-blur-sm group-hover:scale-105 transition-transform`}
          >
            {project.category}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs font-semibold text-bodyText-muted dark:text-lavender-light/60 mb-1.5">
            <span>{project.client || 'Featured Case Study'}</span>
            <span>{project.year}</span>
          </div>

          <Link href={`/projects/${project.slug}`} className="block group-hover:text-deepInk transition-colors">
            <h3 className="font-serif font-bold text-xl text-deepInk dark:text-white line-clamp-2 leading-snug">
              {project.title}
            </h3>
          </Link>

          <p className="mt-2 text-sm text-bodyText dark:text-lavender-light/80 line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Tools and Action footer */}
        <div className="mt-5 pt-4 border-t border-lavender/30 dark:border-white/10 flex items-center justify-between gap-2">
          {/* Tool tags */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-hidden">
            {project.tools.slice(0, 3).map((tool) => (
              <span
                key={tool}
                className="px-2.5 py-1 rounded-full bg-bg dark:bg-[#161426] border border-lavender/40 dark:border-white/10 text-[11px] font-bold text-deepInk dark:text-lavender-light transition-transform hover:scale-105"
              >
                {tool}
              </span>
            ))}
            {project.tools.length > 3 && (
              <span className="text-[11px] font-bold text-bodyText-muted dark:text-lavender-light/60">
                +{project.tools.length - 3}
              </span>
            )}
          </div>

          {/* View case study arrow button with tactile spring animation */}
          <Link
            href={`/projects/${project.slug}`}
            className="btn-tactile btn-tactile-periwinkle w-10 h-10 rounded-full bg-lavender-light dark:bg-white/10 text-deepInk dark:text-white group-hover:text-deepInk flex items-center justify-center shrink-0 shadow-sm"
            aria-label={`View ${project.title}`}
          >
            <span className="relative z-10 flex items-center justify-center">
              <ArrowUpRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
