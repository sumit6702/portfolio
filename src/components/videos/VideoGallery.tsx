'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Play, X, Film, ExternalLink } from 'lucide-react';
import { VideoItem } from '@/lib/types';
import VideoEmbed from './VideoEmbed';
import DecorSlot from '@/components/decor/DecorSlot';

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
      {/* 3D Decor Slot: Clapperboard in safe negative space */}
      <div className="max-w-7xl mx-auto px-4 relative">
        <DecorSlot slot="clapperboard" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-babyPink-light dark:bg-babyPink/20 text-deepInk dark:text-babyPink-light text-xs font-bold uppercase tracking-wider border border-babyPink-border/50 dark:border-babyPink/20 shadow-sm mb-3">
            <Film className="w-3.5 h-3.5 text-deepInk dark:text-babyPink-light" />
            <span>Motion & 3D Lab</span>
          </div>
          <h1 className="font-serif font-black text-4xl sm:text-5xl lg:text-6xl text-deepInk dark:text-white tracking-tight">
            Motion Graphics & Video Showcase
          </h1>
          <p className="mt-3 text-base sm:text-lg text-bodyText dark:text-lavender-light/80 font-medium">
            A curated theater of dynamic 3D animation reels, AI-assisted video productions, and commercial motion work.
          </p>

          {/* Filter Pills with tactile spring effect */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`btn-tactile px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-150 ${
                  selectedFilter === cat
                    ? 'btn-tactile-dark bg-deepInk text-white shadow-sm'
                    : 'btn-tactile-white bg-white dark:bg-[#1E1B33] text-deepInk dark:text-lavender-light border border-lavender/40 dark:border-white/10 hover:shadow-sm'
                }`}
              >
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className="group bg-white dark:bg-[#1E1B33] rounded-[28px] border border-lavender/50 dark:border-white/10 p-5 shadow-[0_10px_28px_rgba(46,42,79,0.05)] hover:shadow-[0_24px_48px_rgba(46,42,79,0.12)] card-float card-shimmer flex flex-col justify-between"
            >
              {/* Thumbnail / Trigger */}
              <div
                onClick={() => setActiveVideo(video)}
                className="relative aspect-video rounded-2xl overflow-hidden bg-bg dark:bg-[#161426] cursor-pointer mb-5 shadow-inner"
              >
                {video.thumbnailUrl ? (
                  <Image
                    src={video.thumbnailUrl}
                    alt={video.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-108 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-lavender-light dark:bg-[#161426]">
                    <Film className="w-16 h-16 text-deepInk/40" />
                  </div>
                )}

                {/* Overlay with Water Ripple Play button */}
                <div className="absolute inset-0 bg-deepInk/20 group-hover:bg-deepInk/10 transition-colors flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white text-deepInk flex items-center justify-center shadow-[0_8px_25px_rgba(0,0,0,0.25)] animate-water-ripple group-hover:scale-115 transition-transform duration-300">
                    <Play className="w-7 h-7 fill-deepInk ml-0.5" />
                  </div>
                </div>

                {/* Category & Duration Pill */}
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-deepInk/85 backdrop-blur-md text-white text-xs font-bold shadow-sm group-hover:scale-105 transition-transform">
                    {video.category}
                  </span>
                </div>

                {video.duration && (
                  <div className="absolute bottom-3 right-3">
                    <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-white text-xs font-mono font-bold">
                      {video.duration}
                    </span>
                  </div>
                )}
              </div>

              {/* Video Info */}
              <div className="space-y-2">
                <h3
                  onClick={() => setActiveVideo(video)}
                  className="font-serif font-bold text-xl text-deepInk dark:text-white group-hover:text-deepInk/80 transition-colors cursor-pointer leading-snug"
                >
                  {video.title}
                </h3>
                {video.description && (
                  <p className="text-sm text-bodyText dark:text-lavender-light/80 font-medium line-clamp-3 leading-relaxed">
                    {video.description}
                  </p>
                )}
              </div>

              {/* Bottom Quick Play Link with water fill */}
              <div className="mt-5 pt-3 border-t border-lavender/30 dark:border-white/10 flex items-center justify-between">
                <button
                  onClick={() => setActiveVideo(video)}
                  className="btn-water btn-water-periwinkle px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 text-xs font-bold text-deepInk dark:text-lavender-light hover:underline transition-colors"
                >
                  <span className="relative z-10 flex items-center gap-1.5">
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Watch Video Reel</span>
                  </span>
                </button>

                <a
                  href={video.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-water btn-water-white text-bodyText-muted dark:text-lavender-light/60 hover:text-deepInk p-2 rounded-full hover:bg-bg dark:hover:bg-white/10 transition-colors"
                  title="Open on YouTube / Vimeo"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    <ExternalLink className="w-4 h-4" />
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-deepInk/60 dark:bg-black/85 backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-white dark:bg-[#1E1B33] rounded-[32px] md:rounded-[40px] p-6 sm:p-8 border border-lavender/60 dark:border-white/20 shadow-[0_24px_60px_rgba(0,0,0,0.3)] animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button with water animation */}
            <button
              onClick={() => setActiveVideo(null)}
              className="btn-water btn-water-white absolute -top-3 -right-3 w-11 h-11 rounded-full bg-white dark:bg-[#161426] text-deepInk dark:text-white border border-lavender/60 dark:border-white/20 shadow-md flex items-center justify-center transition-transform active:translate-y-0.5"
              aria-label="Close video player"
            >
              <span className="relative z-10 flex items-center justify-center">
                <X className="w-5 h-5" />
              </span>
            </button>

            {/* Video Player */}
            <div className="mb-4">
              <VideoEmbed url={activeVideo.videoUrl} title={activeVideo.title} />
            </div>

            {/* Modal Title and Details */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-lavender-light dark:bg-lavender/20 text-deepInk dark:text-lavender-light text-xs font-bold">
                  {activeVideo.category}
                </span>
                {activeVideo.duration && (
                  <span className="text-xs font-mono font-bold text-bodyText-muted dark:text-lavender-light/60">
                    Duration: {activeVideo.duration}
                  </span>
                )}
              </div>
              <h2 className="font-serif font-black text-2xl text-deepInk dark:text-white">
                {activeVideo.title}
              </h2>
              {activeVideo.description && (
                <p className="text-sm text-bodyText dark:text-lavender-light/90 leading-relaxed font-medium">
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
