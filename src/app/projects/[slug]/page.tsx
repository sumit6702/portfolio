import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchProjects, fetchProjectBySlug } from '@/lib/data-service';
import LiveProjectCaseStudy from '@/components/projects/LiveProjectCaseStudy';

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
    <LiveProjectCaseStudy
      initialProject={project}
      prevProject={prevProject}
      nextProject={nextProject}
      relatedProjects={relatedProjects}
    />
  );
}
