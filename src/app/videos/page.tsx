import React from 'react';
import type { Metadata } from 'next';
import VideoGallery from '@/components/videos/VideoGallery';
import { fetchVideos } from '@/lib/data-service';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Motion & 3D Video Showcase — Sumit Kumar',
  description:
    'Watch 3D animation showreels, AI-assisted video productions, and commercial motion graphics crafted by Sumit Kumar.',
};

export default async function VideosPage() {
  const videos = await fetchVideos();

  return <VideoGallery initialVideos={videos} />;
}
