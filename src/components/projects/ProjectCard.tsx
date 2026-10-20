import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Play, Sparkles } from 'lucide-react';
import { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

export default function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
    '3D Design': { bg: 'bg-mint', text: 'text-deepTeal', border: 'border-mint-border' },
    'Motion Graphics': { bg: 'bg-coralPeach-soft', text: 'text-coralPeach-dark', border: 'border-coralPeach-light' },
    'Packaging': { bg: 'bg-butterYellow-soft', text: 'text-deepTeal', border: 'border-butterYellow' },
    'Branding': { bg: 'bg-mint-light', text: 'text-deepTeal', border: 'border-mint' },
    'AI Video': { bg: 'bg-primary-soft', text: 'text-deepTeal-dark', border: 'border-primary' },
  };

  const badge = categoryColors[project.category] || {
    bg: 'bg-mint',
    text: 'text-deepTeal',
    border: 'border-mint-border',
  };

  return (
    <div className="group relative bg-white rounded-3xl border-2 border-mint p-4 transition-all duration-300 hover:-translate-y-2 hover:border-primary shadow-[0_8px_0_#99F6E4,0_16px_28px_rgba(15,76,74,0.08)] hover:shadow-[0_12px_0_#14B8A6,0_24px_36px_rgba(20,184,166,0.18)] flex flex-col h-full">
      {/* Cover Image Container */}
      <Link
        href={`/projects/${project.slug}`}
        className="relative block w-full aspect-[16/10] rounded-2xl overflow-hidden bg-cream-dark mb-4"
      >
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Video indicator badge if applicable */}
        {project.videoUrl && (
          <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-deepTeal/85 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1.5 shadow-md">
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Video Reel</span>
          </div>
        )}

        {/* Category sticker pill */}
        <div className="absolute top-3 left-3">
          <span
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider border ${badge.bg} ${badge.text} ${badge.border} shadow-sm backdrop-blur-sm`}
          >
            {project.category}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs font-semibold text-deepTeal-muted mb-1.5">
            <span>{project.client || 'Featured Case Study'}</span>
            <span>{project.year}</span>
          </div>

          <Link href={`/projects/${project.slug}`} className="block group-hover:text-primary transition-colors">
            <h3 className="font-display font-bold text-xl text-deepTeal line-clamp-2 leading-snug">
              {project.title}
            </h3>
          </Link>

          <p className="mt-2 text-sm text-deepTeal/75 line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Tools and Action footer */}
        <div className="mt-5 pt-4 border-t border-mint/60 flex items-center justify-between gap-2">
          {/* Tool tags */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-hidden">
            {project.tools.slice(0, 3).map((tool) => (
              <span
                key={tool}
                className="px-2.5 py-1 rounded-lg bg-cream border border-mint text-[11px] font-bold text-deepTeal"
              >
                {tool}
              </span>
            ))}
            {project.tools.length > 3 && (
              <span className="text-[11px] font-bold text-deepTeal-muted">
                +{project.tools.length - 3}
              </span>
            )}
          </div>

          {/* View case study arrow button */}
          <Link
            href={`/projects/${project.slug}`}
            className="w-10 h-10 rounded-2xl bg-mint text-deepTeal group-hover:bg-primary group-hover:text-white flex items-center justify-center shrink-0 shadow-[0_3px_0_#99F6E4] group-hover:shadow-[0_3px_0_#0D9488] transition-all duration-200 active:translate-y-0.5"
            aria-label={`View ${project.title}`}
          >
            <ArrowUpRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
