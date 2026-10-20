import React from 'react';

interface VideoEmbedProps {
  url: string;
  title?: string;
  className?: string;
}

export function extractEmbedUrl(rawUrl: string): string | null {
  if (!rawUrl) return null;

  try {
    // YouTube formats:
    // https://www.youtube.com/watch?v=VIDEO_ID
    // https://youtu.be/VIDEO_ID
    // https://www.youtube.com/embed/VIDEO_ID
    if (rawUrl.includes('youtube.com') || rawUrl.includes('youtu.be')) {
      let videoId = '';
      if (rawUrl.includes('youtu.be/')) {
        videoId = rawUrl.split('youtu.be/')[1]?.split('?')[0] || '';
      } else if (rawUrl.includes('watch?v=')) {
        videoId = rawUrl.split('watch?v=')[1]?.split('&')[0] || '';
      } else if (rawUrl.includes('embed/')) {
        videoId = rawUrl.split('embed/')[1]?.split('?')[0] || '';
      }
      if (videoId) {
        return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`;
      }
    }

    // Vimeo formats:
    // https://vimeo.com/VIDEO_ID
    if (rawUrl.includes('vimeo.com')) {
      const match = rawUrl.match(/vimeo\.com\/(\d+)/);
      if (match && match[1]) {
        return `https://player.vimeo.com/video/${match[1]}?title=0&byline=0&portrait=0`;
      }
    }

    // Direct mp4 video or custom embed URL
    return rawUrl;
  } catch {
    return rawUrl;
  }
}

export default function VideoEmbed({ url, title = 'Video player', className = '' }: VideoEmbedProps) {
  const embedUrl = extractEmbedUrl(url);

  if (!embedUrl) {
    return null;
  }

  // If it's a direct mp4/webm video file
  if (embedUrl.endsWith('.mp4') || embedUrl.endsWith('.webm')) {
    return (
      <div className={`relative aspect-video rounded-3xl overflow-hidden bg-black border-2 border-mint shadow-lg ${className}`}>
        <video
          src={embedUrl}
          controls
          className="w-full h-full object-cover"
          playsInline
        >
          Your browser does not support HTML video.
        </video>
      </div>
    );
  }

  return (
    <div className={`relative aspect-video rounded-3xl overflow-hidden bg-deepTeal border-2 border-mint shadow-[0_8px_0_#99F6E4,0_20px_35px_rgba(15,76,74,0.12)] ${className}`}>
      <iframe
        src={embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="w-full h-full border-0"
      />
    </div>
  );
}
