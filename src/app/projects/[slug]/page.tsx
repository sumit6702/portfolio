import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  User,
  Building,
} from 'lucide-react';
import { fetchProjects, fetchProjectBySlug } from '@/lib/data-service';
import ClayButton from '@/components/3d/ClayButton';
import VideoEmbed from '@/components/videos/VideoEmbed';
import ProjectCard from '@/components/projects/ProjectCard';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface ProjectDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const project = await fetchProjectBySlug(params.slug);
  if (!project) {
    return {
      title: 'Project Not Found — Sumit Kumar',
    };
  }

  return {
    title: `${project.title} — Sumit Kumar Portfolio`,
    description: project.description,
    openGraph: {
      title: `${project.title} — Case Study by Sumit Kumar`,
      description: project.description,
      images: [{ url: project.coverImage }],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const project = await fetchProjectBySlug(params.slug);
  if (!project) {
    notFound();
  }

  const allProjects = await fetchProjects();
  const currentIndex = allProjects.findIndex((p) => p.id === project.id);

  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  const relatedProjects = allProjects
    .filter((p) => p.id !== project.id)
    .slice(0, 3);

  return (
    <div className="py-10 md:py-16 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Back Link Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-deepInk dark:text-lavender-light hover:underline bg-white dark:bg-[#1E1B33] px-4 py-2 rounded-full border border-lavender/40 dark:border-white/10 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Projects
          </Link>
        </div>

        {/* Project Header Info Card */}
        <div className="bg-white dark:bg-[#1E1B33] rounded-[32px] md:rounded-[40px] border border-lavender/50 dark:border-white/10 p-8 sm:p-12 shadow-[0_12px_36px_rgba(46,42,79,0.06)] mb-12">
          
          {/* Category & Year Badge */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <span className="px-3.5 py-1.5 rounded-full bg-periwinkle-light dark:bg-periwinkle/20 text-deepInk dark:text-periwinkle-light font-bold text-xs uppercase tracking-wider border border-periwinkle-border/60">
              {project.category}
            </span>
            <span className="text-xs font-bold text-bodyText-muted dark:text-lavender-light/70 flex items-center gap-1.5 bg-bg dark:bg-[#161426] px-3 py-1 rounded-full border border-lavender/40">
              <Calendar className="w-3.5 h-3.5" />
              {project.year}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-serif font-black text-3xl sm:text-4xl md:text-5xl text-deepInk dark:text-white tracking-tight leading-tight mb-6">
            {project.title}
          </h1>

          {/* Meta Grid: Role, Client, Tools */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-6 border-y border-lavender/30 dark:border-white/10 mb-6">
            <div>
              <span className="text-xs font-bold text-bodyText-muted dark:text-lavender-light/60 uppercase block mb-1">
                Role
              </span>
              <p className="text-sm font-bold text-deepInk dark:text-white flex items-center gap-1.5">
                <User className="w-4 h-4 text-periwinkle" />
                {project.role}
              </p>
            </div>

            <div>
              <span className="text-xs font-bold text-bodyText-muted dark:text-lavender-light/60 uppercase block mb-1">
                Client / Context
              </span>
              <p className="text-sm font-bold text-deepInk dark:text-white flex items-center gap-1.5">
                <Building className="w-4 h-4 text-babyPink" />
                {project.client || 'Personal Initiative'}
              </p>
            </div>

            <div>
              <span className="text-xs font-bold text-bodyText-muted dark:text-lavender-light/60 uppercase block mb-1">
                Software & Tools
              </span>
              <div className="flex flex-wrap gap-1.5">
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-2.5 py-0.5 rounded-full bg-bg dark:bg-[#161426] border border-lavender/40 dark:border-white/10 text-[11px] font-bold text-deepInk dark:text-lavender-light"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="max-w-4xl">
            <h3 className="font-serif font-bold text-lg text-deepInk dark:text-white mb-2">
              Project Overview
            </h3>
            <p className="text-base sm:text-lg text-bodyText dark:text-lavender-light/90 leading-relaxed font-normal">
              {project.description}
            </p>
          </div>
        </div>

        {/* Big Hero Cover Image */}
        <div className="relative w-full aspect-[16/9] rounded-[32px] md:rounded-[40px] overflow-hidden border border-lavender/50 dark:border-white/10 shadow-[0_16px_40px_rgba(46,42,79,0.08)] mb-14 bg-bg dark:bg-[#161426]">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover"
          />
        </div>

        {/* Video Embed if project has main video */}
        {project.videoUrl && (
          <div className="mb-14">
            <div className="text-center max-w-xl mx-auto mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-deepInk dark:text-lavender-light">
                Motion Showcase
              </span>
              <h3 className="font-serif font-bold text-2xl text-deepInk dark:text-white">
                Project Video Reel
              </h3>
            </div>
            <VideoEmbed url={project.videoUrl} title={project.title} />
          </div>
        )}

        {/* Behance Case Study Vertical Stack */}
        <div className="space-y-12 mb-16">
          {project.contentBlocks && project.contentBlocks.length > 0 ? (
            project.contentBlocks.map((block, idx) => {
              if (block.type === 'text') {
                return (
                  <div
                    key={block.id || idx}
                    className="max-w-3xl mx-auto bg-white dark:bg-[#1E1B33] rounded-[32px] border border-lavender/50 dark:border-white/10 p-8 sm:p-10 shadow-soft-sm"
                  >
                    {block.title && (
                      <h3 className="font-serif font-black text-2xl sm:text-3xl text-deepInk dark:text-white mb-4">
                        {block.title}
                      </h3>
                    )}
                    <p className="text-base sm:text-lg text-bodyText dark:text-lavender-light/90 leading-relaxed font-normal">
                      {block.content}
                    </p>
                  </div>
                );
              }

              if (block.type === 'quote') {
                return (
                  <div
                    key={block.id || idx}
                    className="max-w-3xl mx-auto bg-lavender-light dark:bg-lavender/10 rounded-[32px] border border-lavender-border/50 p-8 sm:p-10 text-center shadow-soft-sm"
                  >
                    <p className="font-serif font-bold text-xl sm:text-2xl text-deepInk dark:text-white italic leading-relaxed">
                      &ldquo;{block.content}&rdquo;
                    </p>
                  </div>
                );
              }

              if (block.type === 'two-column') {
                return (
                  <div
                    key={block.id || idx}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white dark:bg-[#1E1B33] rounded-[32px] border border-lavender/50 dark:border-white/10 p-8 shadow-soft-sm"
                  >
                    <div>
                      {block.title && (
                        <h3 className="font-serif font-black text-2xl text-deepInk dark:text-white mb-3">
                          {block.title}
                        </h3>
                      )}
                      <p className="text-base text-bodyText dark:text-lavender-light/90 leading-relaxed">
                        {block.content}
                      </p>
                    </div>

                    {block.secondaryMediaUrl && (
                      <div className="relative aspect-square rounded-2xl overflow-hidden border border-lavender/40">
                        <Image
                          src={block.secondaryMediaUrl}
                          alt={block.title || 'Case study graphic'}
                          fill
                          sizes="(max-width: 768px) 100vw, 500px"
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>
                );
              }

              // Image Block
              if (block.type === 'image' && block.mediaUrl) {
                return (
                  <div key={block.id || idx} className="space-y-3">
                    <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-[32px] overflow-hidden border border-lavender/50 dark:border-white/10 shadow-[0_12px_32px_rgba(46,42,79,0.06)]">
                      <Image
                        src={block.mediaUrl}
                        alt={block.title || 'Case study image'}
                        fill
                        sizes="(max-width: 1200px) 100vw, 1200px"
                        className="object-cover"
                      />
                    </div>
                    {block.mediaCaption && (
                      <p className="text-center text-xs font-semibold text-bodyText-muted dark:text-lavender-light/60 italic">
                        {block.mediaCaption}
                      </p>
                    )}
                  </div>
                );
              }

              // Video Block
              if (block.type === 'video' && block.mediaUrl) {
                return (
                  <div key={block.id || idx} className="space-y-3">
                    <VideoEmbed url={block.mediaUrl} title={block.title || project.title} />
                    {block.mediaCaption && (
                      <p className="text-center text-xs font-semibold text-bodyText-muted dark:text-lavender-light/60 italic">
                        {block.mediaCaption}
                      </p>
                    )}
                  </div>
                );
              }

              return null;
            })
          ) : (
            // Default gallery stack if no custom blocks
            <div className="space-y-8">
              {project.galleryImages.map((imgUrl, imgIdx) => (
                <div
                  key={imgIdx}
                  className="relative w-full aspect-[16/9] rounded-[32px] overflow-hidden border border-lavender/50 dark:border-white/10 shadow-[0_12px_32px_rgba(46,42,79,0.06)]"
                >
                  <Image
                    src={imgUrl}
                    alt={`${project.title} - View ${imgIdx + 1}`}
                    fill
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Next / Previous Project Navigation */}
        <div className="pt-8 border-t border-lavender/40 dark:border-white/10 mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {prevProject ? (
              <Link
                href={`/projects/${prevProject.slug}`}
                className="group p-6 rounded-[28px] bg-white dark:bg-[#1E1B33] border border-lavender/50 dark:border-white/10 shadow-sm hover:-translate-y-1 transition-all flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-lavender-light dark:bg-white/10 text-deepInk dark:text-white flex items-center justify-center shrink-0 group-hover:bg-deepInk group-hover:text-white transition-colors">
                  <ArrowLeft className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <span className="text-xs font-bold uppercase text-bodyText-muted dark:text-lavender-light/60">
                    Previous Project
                  </span>
                  <h4 className="font-serif font-bold text-base text-deepInk dark:text-white truncate group-hover:text-deepInk transition-colors">
                    {prevProject.title}
                  </h4>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {nextProject ? (
              <Link
                href={`/projects/${nextProject.slug}`}
                className="group p-6 rounded-[28px] bg-white dark:bg-[#1E1B33] border border-lavender/50 dark:border-white/10 shadow-sm hover:-translate-y-1 transition-all flex items-center justify-end text-right gap-4"
              >
                <div className="overflow-hidden">
                  <span className="text-xs font-bold uppercase text-bodyText-muted dark:text-lavender-light/60">
                    Next Project
                  </span>
                  <h4 className="font-serif font-bold text-base text-deepInk dark:text-white truncate group-hover:text-deepInk transition-colors">
                    {nextProject.title}
                  </h4>
                </div>
                <div className="w-12 h-12 rounded-full bg-lavender-light dark:bg-white/10 text-deepInk dark:text-white flex items-center justify-center shrink-0 group-hover:bg-deepInk group-hover:text-white transition-colors">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>

        {/* Related Projects Row */}
        {relatedProjects.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-bodyText-muted dark:text-lavender-light/70">
                  More From Portfolio
                </span>
                <h3 className="font-serif font-bold text-2xl sm:text-3xl text-deepInk dark:text-white">
                  Related Projects
                </h3>
              </div>
              <ClayButton variant="cream" size="sm" href="/projects">
                View All
              </ClayButton>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
