'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { checkAdminSession } from '@/lib/auth';
import { Project } from '@/lib/types';
import LiveProjectCaseStudy from '@/components/projects/LiveProjectCaseStudy';

const INITIAL_NEW_PROJECT: Project = {
  id: '',
  slug: '',
  title: 'Untitled Case Study',
  category: '3D Design',
  role: 'Lead Designer',
  client: 'Personal Project',
  year: '2026',
  coverImage: 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&w=1200&q=80',
  description: 'Add a project overview, client brief, and the creative solutions developed for this project.',
  tools: ['Blender', 'After Effects'],
  galleryImages: [],
  contentBlocks: [],
  featured: false,
  orderIndex: 0,
};

export default function NewProjectPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    checkAdminSession().then((user) => {
      if (!user) {
        router.push('/admin/login');
      } else {
        setIsAuthorized(true);
      }
    });
  }, [router]);

  if (isAuthorized === null) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-deepInk border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <LiveProjectCaseStudy
      initialProject={INITIAL_NEW_PROJECT}
      isNew={true}
      prevProject={null}
      nextProject={null}
      relatedProjects={[]}
    />
  );
}
