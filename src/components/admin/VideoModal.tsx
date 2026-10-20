'use client';

import React, { useState, useEffect } from 'react';
import { X, Upload } from 'lucide-react';
import { VideoItem } from '@/lib/types';
import { uploadPortfolioImage } from '@/lib/storage';
import ClayButton from '@/components/3d/ClayButton';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (video: VideoItem) => Promise<void>;
  initialVideo?: VideoItem | null;
}

export default function VideoModal({
  isOpen,
  onClose,
  onSave,
  initialVideo,
}: VideoModalProps) {
  const [formData, setFormData] = useState<Partial<VideoItem>>({
    title: '',
    category: 'Motion Graphics',
    videoUrl: '',
    thumbnailUrl: '',
    description: '',
    duration: '01:00',
  });

  const [isUploadingThumb, setIsUploadingThumb] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (initialVideo) {
      setFormData(initialVideo);
    } else {
      setFormData({
        id: `vid-${Date.now()}`,
        title: '',
        category: 'Motion Graphics',
        videoUrl: '',
        thumbnailUrl: '',
        description: '',
        duration: '01:00',
        orderIndex: 0,
      });
    }
  }, [initialVideo, isOpen]);

  if (!isOpen) return null;

  // Auto-fill thumbnail from YouTube URL if not provided
  const handleVideoUrlChange = (url: string) => {
    setFormData((prev) => {
      let thumb = prev.thumbnailUrl;
      if (!thumb && (url.includes('youtube.com') || url.includes('youtu.be'))) {
        let videoId = '';
        if (url.includes('youtu.be/')) {
          videoId = url.split('youtu.be/')[1]?.split('?')[0] || '';
        } else if (url.includes('watch?v=')) {
          videoId = url.split('watch?v=')[1]?.split('&')[0] || '';
        }
        if (videoId) {
          thumb = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        }
      }
      return { ...prev, videoUrl: url, thumbnailUrl: thumb };
    });
  };

  const handleThumbUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingThumb(true);
    setErrorMsg('');

    const res = await uploadPortfolioImage(file);
    setIsUploadingThumb(false);

    if (res.url) {
      setFormData((prev) => ({ ...prev, thumbnailUrl: res.url! }));
    } else {
      setErrorMsg(res.error || 'Failed to upload thumbnail image.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.videoUrl) {
      setErrorMsg('Video title and YouTube / Vimeo URL are required.');
      return;
    }

    setIsSaving(true);
    setErrorMsg('');

    try {
      const finalVideo: VideoItem = {
        id: formData.id || `vid-${Date.now()}`,
        title: formData.title!,
        category: formData.category || 'Motion Graphics',
        videoUrl: formData.videoUrl!,
        thumbnailUrl: formData.thumbnailUrl || undefined,
        description: formData.description || undefined,
        duration: formData.duration || undefined,
        orderIndex: formData.orderIndex ?? 0,
      };

      await onSave(finalVideo);
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to save video.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-deepInk/60 dark:bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#1E1B33] rounded-[32px] md:rounded-[40px] p-6 sm:p-10 border border-lavender/50 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.25)] my-8">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-bg dark:bg-[#161426] border border-lavender/40 dark:border-white/10 text-deepInk dark:text-lavender-light hover:bg-lavender-light transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="font-serif font-black text-2xl sm:text-3xl text-deepInk dark:text-white mb-6">
          {initialVideo ? 'Edit Video Showcase' : 'Add New Video to Showcase'}
        </h2>

        {errorMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-babyPink-light dark:bg-babyPink/20 border border-babyPink-border text-deepInk dark:text-babyPink-light text-xs font-bold">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-bodyText-muted dark:text-lavender-light/70 mb-1.5">
              Video Title *
            </label>
            <input
              type="text"
              required
              value={formData.title || ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. 3D Dental Equipment Product Reel"
              className="w-full px-4 py-2.5 rounded-2xl bg-bg dark:bg-[#161426] border border-lavender/50 dark:border-white/10 text-deepInk dark:text-white text-sm font-semibold focus:outline-none focus:border-deepInk"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-bodyText-muted dark:text-lavender-light/70 mb-1.5">
                Category
              </label>
              <select
                value={formData.category || 'Motion Graphics'}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2.5 rounded-2xl bg-bg dark:bg-[#161426] border border-lavender/50 dark:border-white/10 text-deepInk dark:text-white text-sm font-semibold focus:outline-none focus:border-deepInk"
              >
                <option value="Motion Graphics">Motion Graphics</option>
                <option value="3D Animation">3D Animation</option>
                <option value="3D Simulation">3D Simulation</option>
                <option value="AI Video">AI Video</option>
                <option value="Commercial Reel">Commercial Reel</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-bodyText-muted dark:text-lavender-light/70 mb-1.5">
                Duration (e.g. 01:15)
              </label>
              <input
                type="text"
                value={formData.duration || ''}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="00:45"
                className="w-full px-4 py-2.5 rounded-2xl bg-bg dark:bg-[#161426] border border-lavender/50 dark:border-white/10 text-deepInk dark:text-white text-sm font-semibold focus:outline-none focus:border-deepInk"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-bodyText-muted dark:text-lavender-light/70 mb-1.5">
              YouTube or Vimeo Link *
            </label>
            <input
              type="text"
              required
              value={formData.videoUrl || ''}
              onChange={(e) => handleVideoUrlChange(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=... or https://vimeo.com/..."
              className="w-full px-4 py-2.5 rounded-2xl bg-bg dark:bg-[#161426] border border-lavender/50 dark:border-white/10 text-deepInk dark:text-white text-sm font-semibold focus:outline-none focus:border-deepInk"
            />
          </div>

          {/* Thumbnail Image URL or Upload */}
          <div className="p-4 rounded-3xl bg-bg dark:bg-[#161426] border border-lavender/50 dark:border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-bodyText-muted dark:text-lavender-light/70">
                Thumbnail Image (Auto-generated or custom upload)
              </label>
              <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-lavender-light text-deepInk text-xs font-bold cursor-pointer hover:bg-deepInk hover:text-white transition-colors border border-lavender-border/50">
                <Upload className="w-3.5 h-3.5" />
                {isUploadingThumb ? 'Uploading...' : 'Upload Thumbnail'}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbUpload}
                  disabled={isUploadingThumb}
                  className="hidden"
                />
              </label>
            </div>
            <input
              type="text"
              value={formData.thumbnailUrl || ''}
              onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
              placeholder="https://..."
              className="w-full px-4 py-2 rounded-2xl bg-white dark:bg-[#1E1B33] border border-lavender/50 dark:border-white/10 text-deepInk dark:text-white text-xs font-semibold focus:outline-none focus:border-deepInk"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-bodyText-muted dark:text-lavender-light/70 mb-1.5">
              Description (optional)
            </label>
            <textarea
              rows={3}
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Key motion techniques, tools used, client objectives..."
              className="w-full px-4 py-2.5 rounded-2xl bg-bg dark:bg-[#161426] border border-lavender/50 dark:border-white/10 text-deepInk dark:text-white text-sm font-semibold focus:outline-none focus:border-deepInk"
            />
          </div>

          <div className="pt-4 border-t border-lavender/30 dark:border-white/10 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-bg dark:bg-[#161426] border border-lavender/40 dark:border-white/10 text-deepInk dark:text-lavender-light font-bold text-sm hover:bg-lavender-light transition-colors"
            >
              Cancel
            </button>
            <ClayButton
              type="submit"
              variant="dark"
              size="md"
              disabled={isSaving}
            >
              {isSaving ? 'Saving Video...' : 'Save Video'}
            </ClayButton>
          </div>
        </form>
      </div>
    </div>
  );
}
