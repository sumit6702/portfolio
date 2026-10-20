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
  Layers,
  Wrench,
  ExternalLink,
  Sparkles,
  Share2,
} from 'lucide-react';
import { fetchProjects, fetchProjectBySlug } from '@/lib/data-service';
import ClayButton from '@/components/3d/ClayButton';
import ClayShape from '@/components/3d/ClayShape';
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
      {/* Decorative background shape */}
      <div className="absolute top-12 left-6 opacity-20 dark:opacity-10 pointer-events-none">
        <ClayShape type="torus" color="teal" size="lg" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Back Link Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-deepTeal-muted dark:text-mint/80 hover:text-primary dark:hover:text-primary transition-colors bg-white dark:bg-[#0D2625] px-4 py-2 rounded-full border border-mint dark:border-[#1E524F] shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Projects
          </Link>
        </div>

        {/* Project Header Info Card */}
        <div className="bg-white dark:bg-[#0D2625] rounded-3xl md:rounded-4xl border-2 border-mint dark:border-[#1A4543] p-8 sm:p-12 shadow-[0_12px_0_#99F6E4,0_24px_40px_rgba(15,76,74,0.08)] dark:shadow-[0_12px_0_#071918,0_24px_40px_rgba(0,0,0,0.5)] mb-12">
          {/* Category & Year Badge */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <span className="px-3.5 py-1.5 rounded-full bg-mint dark:bg-[#113B39] text-deepTeal dark:text-mint font-extrabold text-xs uppercase tracking-wider border border-mint-border dark:border-[#1E615D]">
              {project.category}
            </span>
            <span className="text-xs font-bold text-deepTeal-muted dark:text-mint/70 flex items-center gap-1.5 bg-cream dark:bg-[#071918] px-3 py-1 rounded-full border border-mint dark:border-[#1E524F]">
              <Calendar className="w-3.5 h-3.5" />
              {project.year}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-deepTeal dark:text-white tracking-tight leading-tight mb-6">
            {project.title}
          </h1>

          {/* Meta Grid: Role, Client, Tools */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-6 border-y border-mint/60 dark:border-[#1A4543]/60 mb-6">
            <div>
              <span className="text-xs font-bold text-deepTeal-muted dark:text-mint/60 uppercase block mb-1">
                Role
              </span>
              <p className="text-sm font-extrabold text-deepTeal dark:text-white flex items-center gap-1.5">
                <User className="w-4 h-4 text-primary" />
                {project.role}
              </p>
            </div>

            <div>
              <span className="text-xs font-bold text-deepTeal-muted dark:text-mint/60 uppercase block mb-1">
                Client / Context
              </span>
              <p className="text-sm font-extrabold text-deepTeal dark:text-white flex items-center gap-1.5">
                <Building className="w-4 h-4 text-primary" />
                {project.client || 'Personal Initiative'}
              </p>
            </div>

            <div>
              <span className="text-xs font-bold text-deepTeal-muted dark:text-mint/60 uppercase block mb-1">
                Software & Tools
              </span>
              <div className="flex flex-wrap gap-1.5">
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-2 py-0.5 rounded-md bg-cream dark:bg-[#071918] border border-mint dark:border-[#1E524F] text-[11px] font-bold text-deepTeal dark:text-mint"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="max-w-4xl">
            <h3 className="font-display font-bold text-lg text-deepTeal dark:text-white mb-2">
              Project Overview
            </h3>
            <p className="text-base sm:text-lg text-deepTeal/85 dark:text-[#E6FFFA]/85 leading-relaxed font-normal">
              {project.description}
            </p>
          </div>
        </div>

        {/* Big Hero Cover Image */}
        <div className="relative w-full aspect-[16/9] rounded-3xl md:rounded-4xl overflow-hidden border-2 border-mint dark:border-[#1A4543] shadow-[0_12px_0_#99F6E4,0_20px_35px_rgba(15,76,74,0.1)] dark:shadow-[0_12px_0_#071918,0_20px_35px_rgba(0,0,0,0.5)] mb-14 bg-cream-dark dark:bg-[#071918]">
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
              <span className="text-xs font-extrabold uppercase tracking-wider text-primary">
                Motion Showcase
              </span>
              <h3 className="font-display font-bold text-2xl text-deepTeal dark:text-white">
                Project Video Reel
              </h3>
            </div>
            <VideoEmbed url={project.videoUrl} title={project.title} />
          </div>
        )}

        {/* Behance Case Study Vertical Stack */}
        <div className="space-y-14 mb-16">
          {project.contentBlocks && project.contentBlocks.length > 0 ? (
            project.contentBlocks.map((block, idx) => {
              if (block.type === 'text') {
                return (
                  <div
                    key={block.id || idx}
                    className="max-w-3xl mx-auto bg-white dark:bg-[#0D2625] rounded-3xl border-2 border-mint dark:border-[#1A4543] p-8 sm:p-10 shadow-[0_6px_0_#99F6E4] dark:shadow-[0_6px_0_#071918]"
                  >
                    {block.title && (
                      <h3 className="font-display font-black text-2xl sm:text-3xl text-deepTeal dark:text-white mb-4">
                        {block.title}
                      </h3>
                    )}
                    <p className="text-base sm:text-lg text-deepTeal/85 dark:text-[#E6FFFA]/85 leading-relaxed font-normal">
                      {block.content}
                    </p>
                  </div>
                );
              }

              if (block.type === 'quote') {
                return (
                  <div
                    key={block.id || idx}
                    className="max-w-3xl mx-auto bg-mint dark:bg-[#113B39] rounded-3xl border-2 border-primary/40 p-8 sm:p-10 text-center shadow-[0_8px_0_#5EEAD4] dark:shadow-[0_8px_0_#092827]"
                  >
                    <p className="font-display font-bold text-xl sm:text-2xl text-deepTeal dark:text-white italic leading-relaxed">
                      {block.content}
                    </p>
                  </div>
                );
              }

              if (block.type === 'two-column') {
                return (
                  <div
                    key={block.id || idx}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white dark:bg-[#0D2625] rounded-3xl border-2 border-mint dark:border-[#1A4543] p-8 shadow-[0_8px_0_#99F6E4] dark:shadow-[0_8px_0_#071918]"
                  >
                    <div>
                      {block.title && (
                        <h3 className="font-display font-black text-2xl text-deepTeal dark:text-white mb-3">
                          {block.title}
                        </h3>
                      )}
                      <p className="text-base text-deepTeal/85 dark:text-[#E6FFFA]/85 leading-relaxed">
                        {block.content}
                      </p>
                    </div>

                    {block.secondaryMediaUrl && (
                      <div className="relative aspect-square rounded-2xl overflow-hidden border border-mint dark:border-[#1E524F]">
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
                    <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden border-2 border-mint dark:border-[#1A4543] shadow-[0_8px_0_#99F6E4] dark:shadow-[0_8px_0_#071918]">
                      <Image
                        src={block.mediaUrl}
                        alt={block.title || 'Case study image'}
                        fill
                        sizes="(max-width: 1200px) 100vw, 1200px"
                        className="object-cover"
                      />
                    </div>
                    {block.mediaCaption && (
                      <p className="text-center text-xs font-semibold text-deepTeal-muted dark:text-mint/60 italic">
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
                      <p className="text-center text-xs font-semibold text-deepTeal-muted dark:text-mint/60 italic">
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
                  className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden border-2 border-mint dark:border-[#1A4543] shadow-[0_8px_0_#99F6E4] dark:shadow-[0_8px_0_#071918]"
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
        <div className="pt-8 border-t-2 border-mint/60 dark:border-[#1A4543]/60 mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {prevProject ? (
              <Link
                href={`/projects/${prevProject.slug}`}
                className="group p-6 rounded-3xl bg-white dark:bg-[#0D2625] border-2 border-mint dark:border-[#1A4543] shadow-[0_6px_0_#99F6E4] dark:shadow-[0_6px_0_#071918] hover:-translate-y-1 transition-all flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-mint dark:bg-[#113B39] text-deepTeal dark:text-mint flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                  <ArrowLeft className="w-6 h-6" />
                </div>
                <div className="overflow-hidden">
                  <span className="text-xs font-extrabold uppercase text-deepTeal-muted dark:text-mint/60">
                    Previous Project
                  </span>
                  <h4 className="font-display font-bold text-base text-deepTeal dark:text-white truncate group-hover:text-primary transition-colors">
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
                className="group p-6 rounded-3xl bg-white dark:bg-[#0D2625] border-2 border-mint dark:border-[#1A4543] shadow-[0_6px_0_#99F6E4] dark:shadow-[0_6px_0_#071918] hover:-translate-y-1 transition-all flex items-center justify-end text-right gap-4"
              >
                <div className="overflow-hidden">
                  <span className="text-xs font-extrabold uppercase text-deepTeal-muted dark:text-mint/60">
                    Next Project
                  </span>
                  <h4 className="font-display font-bold text-base text-deepTeal dark:text-white truncate group-hover:text-primary transition-colors">
                    {nextProject.title}
                  </h4>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-mint dark:bg-[#113B39] text-deepTeal dark:text-mint flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                  <ArrowRight className="w-6 h-6" />
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
                <span className="text-xs font-extrabold uppercase tracking-wider text-primary">
                  More From Portfolio
                </span>
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-deepTeal dark:text-white">
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
