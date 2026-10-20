import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import StatsBar from '@/components/home/StatsBar';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import VideoTeaser from '@/components/home/VideoTeaser';
import AboutSection from '@/components/home/AboutSection';
import ContactSection from '@/components/home/ContactSection';
import { fetchProfileSettings, fetchProjects } from '@/lib/data-service';

// Ensure content edits in admin go live instantly without redeploying
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage() {
  const [profile, projects] = await Promise.all([
    fetchProfileSettings(),
    fetchProjects(),
  ]);

  return (
    <div className="relative">
      <HeroSection profile={profile} />
      <StatsBar />
      <FeaturedProjects projects={projects} />
      <VideoTeaser />
      <AboutSection profile={profile} />
      <ContactSection profile={profile} />
    </div>
  );
}
