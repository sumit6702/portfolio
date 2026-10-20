import React from 'react';
import type { Metadata } from 'next';
import ProjectsDirectory from '@/components/projects/ProjectsDirectory';
import { fetchProjects, fetchProfileSettings } from '@/lib/data-service';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Projects & Case Studies — Sumit Kumar | Motion & 3D Designer',
  description:
    'Explore motion graphics case studies, 3D packaging designs, branding systems, and visual identity projects created by Sumit Kumar.',
};

export default async function ProjectsPage() {
  const [projects, profile] = await Promise.all([
    fetchProjects(),
    fetchProfileSettings(),
  ]);

  return <ProjectsDirectory initialProjects={projects} categories={profile?.categories} />;
}
