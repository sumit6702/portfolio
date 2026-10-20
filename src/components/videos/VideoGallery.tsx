'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Play, X, Film, Sparkles, ExternalLink } from 'lucide-react';
import { VideoItem } from '@/lib/types';
import VideoEmbed from './VideoEmbed';
import ClayShape from '@/components/3d/ClayShape';

interface VideoGalleryProps {
  initialVideos: VideoItem[];
}

export default function VideoGallery({ initialVideos }: VideoGalleryProps) {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(initialVideos.map((v) => v.category)))];

  const filteredVideos =
    selectedFilter === 'All'
      ? initialVideos
      : initialVideos.filter((v) => v.category === selectedFilter);

  return (
    <div className="py-12 md:py-20 relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute top-10 right-10 opacity-20 dark:opacity-10 pointer-events-none">
        <ClayShape type="torus" color="coral" size="xl" />
      </div>
      <div className="absolute bottom-20 left-10 opacity-20 dark:opacity-10 pointer-events-none">
        <ClayShape type="sphere" color="teal" size="lg" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-mint dark:bg-[#113B39] text-deepTeal dark:text-mint text-xs font-extrabold uppercase tracking-wider border border-mint-border dark:border-[#1E615D] shadow-sm mb-3">
            <Film className="w-3.5 h-3.5 text-primary" />
            <span>Motion & 3D Lab</span>
          </div>
          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-deepTeal dark:text-white tracking-tight">
            Motion Graphics & Video Showcase
          </h1>
          <p className="mt-3 text-base sm:text-lg text-deepTeal-muted dark:text-mint/70 font-medium">
            A curated theater of dynamic 3D animation reels, AI-assisted video productions, and commercial motion work.
          </p>

          {/* Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-extrabold transition-all duration-150 ${
                  selectedFilter === cat
                    ? 'bg-primary text-white shadow-[0_3px_0_#0D9488] -translate-y-0.5'
                    : 'bg-white dark:bg-[#0D2625] text-deepTeal dark:text-mint border-2 border-mint dark:border-[#1E524F] hover:bg-mint dark:hover:bg-[#113B39] active:translate-y-0.5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className="group bg-white dark:bg-[#0D2625] rounded-3xl border-2 border-mint dark:border-[#1A4543] p-5 shadow-[0_8px_0_#99F6E4,0_16px_28px_rgba(15,76,74,0.08)] dark:shadow-[0_8px_0_#071918,0_16px_28px_rgba(0,0,0,0.4)] hover:-translate-y-2 hover:border-primary dark:hover:border-primary transition-all duration-300 flex flex-col justify-between"
            >
              {/* Thumbnail / Trigger */}
              <div
                onClick={() => setActiveVideo(video)}
                className="relative aspect-video rounded-2xl overflow-hidden bg-deepTeal cursor-pointer mb-5 shadow-inner"
              >
                {video.thumbnailUrl ? (
                  <Image
                    src={video.thumbnailUrl}
                    alt={video.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-deepTeal to-[#0A3836]">
                    <Film className="w-16 h-16 text-mint/40" />
                  </div>
                )}

                {/* Dark overlay with Play button */}
                <div className="absolute inset-0 bg-deepTeal/30 group-hover:bg-deepTeal/10 transition-colors flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center shadow-[0_4px_0_#0D9488,0_10px_20px_rgba(0,0,0,0.3)] group-hover:scale-115 transition-transform duration-200">
                    <Play className="w-8 h-8 fill-white ml-1" />
                  </div>
                </div>

                {/* Category & Duration Pill */}
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-deepTeal/85 backdrop-blur-md text-white text-xs font-bold shadow-sm">
                    {video.category}
                  </span>
                </div>

                {video.duration && (
                  <div className="absolute bottom-3 right-3">
                    <span className="px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md text-white text-xs font-mono font-bold">
                      {video.duration}
                    </span>
                  </div>
                )}
              </div>

              {/* Video Info */}
              <div className="space-y-2">
                <h3
                  onClick={() => setActiveVideo(video)}
                  className="font-display font-extrabold text-xl text-deepTeal dark:text-white group-hover:text-primary transition-colors cursor-pointer leading-snug"
                >
                  {video.title}
                </h3>
                {video.description && (
                  <p className="text-sm text-deepTeal-muted dark:text-mint/70 font-medium line-clamp-3 leading-relaxed">
                    {video.description}
                  </p>
                )}
              </div>

              {/* Bottom Quick Play Link */}
              <div className="mt-4 pt-3 border-t border-mint dark:border-[#1A4543]/60 flex items-center justify-between">
                <button
                  onClick={() => setActiveVideo(video)}
                  className="inline-flex items-center gap-1.5 text-xs font-extrabold text-primary hover:text-deepTeal dark:hover:text-mint transition-colors"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Watch Video Reel
                </button>

                <a
                  href={video.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-deepTeal-muted dark:text-mint/60 hover:text-primary p-1.5 rounded-lg hover:bg-mint dark:hover:bg-[#113B39] transition-colors"
                  title="Open on YouTube / Vimeo"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-deepTeal/80 dark:bg-black/85 backdrop-blur-md animate-fade-in"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-white dark:bg-[#0D2625] rounded-3xl md:rounded-4xl p-6 sm:p-8 border-4 border-mint dark:border-[#1E524F] shadow-[0_20px_0_#0D9488,0_35px_60px_rgba(0,0,0,0.5)] animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-coralPeach text-white border-2 border-white dark:border-[#0D2625] shadow-[0_4px_0_#E55C4A] hover:bg-coralPeach-hover flex items-center justify-center transition-transform active:translate-y-0.5"
              aria-label="Close video player"
            >
              <X className="w-6 h-6 stroke-[3]" />
            </button>

            {/* Video Player */}
            <div className="mb-4">
              <VideoEmbed url={activeVideo.videoUrl} title={activeVideo.title} />
            </div>

            {/* Modal Title and Details */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-mint dark:bg-[#113B39] text-deepTeal dark:text-mint text-xs font-bold">
                  {activeVideo.category}
                </span>
                {activeVideo.duration && (
                  <span className="text-xs font-mono font-bold text-deepTeal-muted dark:text-mint/60">
                    Duration: {activeVideo.duration}
                  </span>
                )}
              </div>
              <h2 className="font-display font-black text-2xl text-deepTeal dark:text-white">
                {activeVideo.title}
              </h2>
              {activeVideo.description && (
                <p className="text-sm text-deepTeal/80 dark:text-[#E6FFFA]/85 leading-relaxed font-medium">
                  {activeVideo.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
