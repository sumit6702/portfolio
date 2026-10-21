import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import StatsBar from '@/components/home/StatsBar';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import VideoTeaser from '@/components/home/VideoTeaser';
import AboutSection from '@/components/home/AboutSection';
import ContactSection from '@/components/home/ContactSection';
import { fetchProfileSettings, fetchProjects } from '@/lib/data-service';
import { readServerProfileFile } from '@/lib/server-profile';
import { DEFAULT_THEME_CONFIG } from '@/config/theme-presets';

// Ensure content edits in admin go live instantly without redeploying
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage() {
  const [fetchedProfile, projects] = await Promise.all([
    fetchProfileSettings(),
    fetchProjects(),
  ]);

  let profile = { ...fetchedProfile };
  const serverFile = readServerProfileFile();
  if (serverFile) {
    if (serverFile.themeConfig && (!profile.themeConfig || profile.themeConfig === DEFAULT_THEME_CONFIG)) {
      profile.themeConfig = serverFile.themeConfig;
    }
    if (serverFile.themeMode && (!profile.themeMode || profile.themeMode === 'system')) {
      profile.themeMode = serverFile.themeMode;
    }
    if (serverFile.resumeUrl && (!profile.resumeUrl || profile.resumeUrl === '/resume-sumit-kumar.pdf')) {
      profile.resumeUrl = serverFile.resumeUrl;
    }
  }

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
