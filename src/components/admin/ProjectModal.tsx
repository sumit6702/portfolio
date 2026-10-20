'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Upload,
  Trash2,
  Image as ImageIcon,
  Type,
  Quote,
} from 'lucide-react';
import { Project, CaseStudyBlock } from '@/lib/types';
import { uploadPortfolioImage } from '@/lib/storage';
import ClayButton from '@/components/3d/ClayButton';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: Project) => Promise<void>;
  initialProject?: Project | null;
}

export default function ProjectModal({
  isOpen,
  onClose,
  onSave,
  initialProject,
}: ProjectModalProps) {
  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    slug: '',
    category: '3D Design',
    role: 'Lead Designer',
    client: '',
    year: '2026',
    coverImage: 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&w=1200&q=80',
    description: '',
    tools: ['Blender', 'After Effects'],
    galleryImages: [],
    videoUrl: '',
    contentBlocks: [],
    featured: true,
  });

  const [toolsInput, setToolsInput] = useState('');
  const [galleryInput, setGalleryInput] = useState('');
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [isUploadingGallery, setIsUploadingGallery] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (initialProject) {
      setFormData(initialProject);
      setToolsInput(initialProject.tools.join(', '));
      setGalleryInput(initialProject.galleryImages.join('\n'));
    } else {
      setFormData({
        id: `proj-${Date.now()}`,
        title: '',
        slug: '',
        category: '3D Design',
        role: 'Lead Designer',
        client: '',
        year: '2026',
        coverImage: 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&w=1200&q=80',
        description: '',
        tools: ['Blender', 'After Effects'],
        galleryImages: [],
        videoUrl: '',
        contentBlocks: [],
        featured: false,
        orderIndex: 0,
      });
      setToolsInput('Blender, After Effects');
      setGalleryInput('');
    }
  }, [initialProject, isOpen]);

  if (!isOpen) return null;

  // Auto generate slug from title if empty
  const handleTitleChange = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: prev.slug || val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
    }));
  };

  // Upload Cover Image to Supabase Storage
  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingCover(true);
    setErrorMsg('');

    const res = await uploadPortfolioImage(file);
    setIsUploadingCover(false);

    if (res.url) {
      setFormData((prev) => ({ ...prev, coverImage: res.url! }));
    } else {
      setErrorMsg(res.error || 'Failed to upload cover image to Supabase Storage.');
    }
  };

  // Upload Gallery Image to Supabase Storage
  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploadingGallery(true);
    setErrorMsg('');

    for (let i = 0; i < files.length; i++) {
      const res = await uploadPortfolioImage(files[i]);
      if (res.url) {
        setFormData((prev) => ({
          ...prev,
          galleryImages: [...(prev.galleryImages || []), res.url!],
        }));
        setGalleryInput((prev) => (prev ? `${prev}\n${res.url}` : res.url!));
      } else {
        setErrorMsg(res.error || 'Failed to upload one or more gallery images.');
      }
    }
    setIsUploadingGallery(false);
  };

  // Add rich content block
  const handleAddBlock = (type: 'text' | 'image' | 'quote' | 'video') => {
    const newBlock: CaseStudyBlock = {
      id: `block-${Date.now()}`,
      type,
      title: type === 'text' ? 'Section Heading' : '',
      content: type === 'text' ? 'Detailed case study explanation...' : (type === 'quote' ? '“Key project insight or client quote”' : ''),
      mediaUrl: type === 'image' ? 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80' : '',
      mediaCaption: type === 'image' ? 'Process breakdown render in Blender' : '',
    };

    setFormData((prev) => ({
      ...prev,
      contentBlocks: [...(prev.contentBlocks || []), newBlock],
    }));
  };

  const handleRemoveBlock = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      contentBlocks: (prev.contentBlocks || []).filter((_, i) => i !== idx),
    }));
  };

  const handleBlockChange = (idx: number, field: keyof CaseStudyBlock, value: string) => {
    setFormData((prev) => {
      const blocks = [...(prev.contentBlocks || [])];
      blocks[idx] = { ...blocks[idx], [field]: value };
      return { ...prev, contentBlocks: blocks };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.slug || !formData.coverImage) {
      setErrorMsg('Title, Slug, and Cover Image are required.');
      return;
    }

    setIsSaving(true);
    setErrorMsg('');

    try {
      const parsedTools = toolsInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const parsedGallery = galleryInput
        .split('\n')
        .map((g) => g.trim())
        .filter(Boolean);

      const finalProject: Project = {
        id: formData.id || `proj-${Date.now()}`,
        slug: formData.slug!,
        title: formData.title!,
        category: formData.category || '3D Design',
        role: formData.role || 'Designer',
        client: formData.client || '',
        year: formData.year || '2026',
        coverImage: formData.coverImage!,
        description: formData.description || '',
        tools: parsedTools,
        galleryImages: parsedGallery,
        videoUrl: formData.videoUrl || undefined,
        contentBlocks: formData.contentBlocks || [],
        featured: Boolean(formData.featured),
        orderIndex: formData.orderIndex ?? 0,
      };

      await onSave(finalProject);
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to save project.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-deepInk/60 dark:bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white dark:bg-[#1E1B33] rounded-[32px] md:rounded-[40px] p-6 sm:p-10 border border-lavender/50 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.25)] my-8 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-bg dark:bg-[#161426] border border-lavender/40 dark:border-white/10 text-deepInk dark:text-lavender-light hover:bg-lavender-light transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="font-serif font-black text-2xl sm:text-3xl text-deepInk dark:text-white mb-6">
          {initialProject ? 'Edit Project' : 'Add New Case Study'}
        </h2>

        {errorMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-babyPink-light dark:bg-babyPink/20 border border-babyPink-border text-deepInk dark:text-babyPink-light text-xs font-bold">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Row 1: Title & Slug */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-bodyText-muted dark:text-lavender-light/70 mb-1.5">
                Project Title *
              </label>
              <input
                type="text"
                required
                value={formData.title || ''}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Crunchy Piper Packaging Design"
                className="w-full px-4 py-2.5 rounded-2xl bg-bg dark:bg-[#161426] border border-lavender/50 dark:border-white/10 text-deepInk dark:text-white text-sm font-semibold focus:outline-none focus:border-deepInk"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-bodyText-muted dark:text-lavender-light/70 mb-1.5">
                URL Slug *
              </label>
              <input
                type="text"
                required
                value={formData.slug || ''}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="e.g. crunchy-piper-packaging-design"
                className="w-full px-4 py-2.5 rounded-2xl bg-bg dark:bg-[#161426] border border-lavender/50 dark:border-white/10 text-deepInk dark:text-white text-sm font-semibold focus:outline-none focus:border-deepInk"
              />
            </div>
          </div>

          {/* Row 2: Category, Role, Client, Year */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-bodyText-muted dark:text-lavender-light/70 mb-1.5">
                Category
              </label>
              <select
                value={formData.category || '3D Design'}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2.5 rounded-2xl bg-bg dark:bg-[#161426] border border-lavender/50 dark:border-white/10 text-deepInk dark:text-white text-sm font-semibold focus:outline-none focus:border-deepInk"
              >
                <option value="3D Design">3D Design</option>
                <option value="Motion Graphics">Motion Graphics</option>
                <option value="Packaging">Packaging</option>
                <option value="Branding">Branding</option>
                <option value="AI Video">AI Video</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-bodyText-muted dark:text-lavender-light/70 mb-1.5">
                Role
              </label>
              <input
                type="text"
                value={formData.role || ''}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                placeholder="Lead 3D Designer"
                className="w-full px-4 py-2.5 rounded-2xl bg-bg dark:bg-[#161426] border border-lavender/50 dark:border-white/10 text-deepInk dark:text-white text-sm font-semibold focus:outline-none focus:border-deepInk"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-bodyText-muted dark:text-lavender-light/70 mb-1.5">
                Client / Context
              </label>
              <input
                type="text"
                value={formData.client || ''}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                placeholder="ABA Technologies / Personal"
                className="w-full px-4 py-2.5 rounded-2xl bg-bg dark:bg-[#161426] border border-lavender/50 dark:border-white/10 text-deepInk dark:text-white text-sm font-semibold focus:outline-none focus:border-deepInk"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-bodyText-muted dark:text-lavender-light/70 mb-1.5">
                Year
              </label>
              <input
                type="text"
                value={formData.year || ''}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                placeholder="2026"
                className="w-full px-4 py-2.5 rounded-2xl bg-bg dark:bg-[#161426] border border-lavender/50 dark:border-white/10 text-deepInk dark:text-white text-sm font-semibold focus:outline-none focus:border-deepInk"
              />
            </div>
          </div>

          {/* Cover Image */}
          <div className="p-4 rounded-3xl bg-bg dark:bg-[#161426] border border-lavender/50 dark:border-white/10 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-bodyText-muted dark:text-lavender-light/70">
                Cover Image (Supabase Storage / URL) *
              </label>
              <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-deepInk text-white text-xs font-bold cursor-pointer hover:bg-deepInk-hover shadow-sm">
                <Upload className="w-3.5 h-3.5" />
                {isUploadingCover ? 'Uploading...' : 'Upload Image to Storage'}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCoverUpload}
                  disabled={isUploadingCover}
                  className="hidden"
                />
              </label>
            </div>

            <input
              type="text"
              required
              value={formData.coverImage || ''}
              onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
              placeholder="https://... or uploaded Supabase storage URL"
              className="w-full px-4 py-2.5 rounded-2xl bg-white dark:bg-[#1E1B33] border border-lavender/50 dark:border-white/10 text-deepInk dark:text-white text-xs font-semibold focus:outline-none focus:border-deepInk"
            />
          </div>

          {/* Tools & Video URL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-bodyText-muted dark:text-lavender-light/70 mb-1.5">
                Tools Used (comma separated)
              </label>
              <input
                type="text"
                value={toolsInput}
                onChange={(e) => setToolsInput(e.target.value)}
                placeholder="Blender, After Effects, Photoshop, Figma"
                className="w-full px-4 py-2.5 rounded-2xl bg-bg dark:bg-[#161426] border border-lavender/50 dark:border-white/10 text-deepInk dark:text-white text-sm font-semibold focus:outline-none focus:border-deepInk"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-bodyText-muted dark:text-lavender-light/70 mb-1.5">
                Video URL (YouTube / Vimeo embed)
              </label>
              <input
                type="text"
                value={formData.videoUrl || ''}
                onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full px-4 py-2.5 rounded-2xl bg-bg dark:bg-[#161426] border border-lavender/50 dark:border-white/10 text-deepInk dark:text-white text-sm font-semibold focus:outline-none focus:border-deepInk"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-bodyText-muted dark:text-lavender-light/70 mb-1.5">
              Project Description
            </label>
            <textarea
              rows={3}
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Overview of the project goals, challenges, and creative solutions..."
              className="w-full px-4 py-2.5 rounded-2xl bg-bg dark:bg-[#161426] border border-lavender/50 dark:border-white/10 text-deepInk dark:text-white text-sm font-semibold focus:outline-none focus:border-deepInk"
            />
          </div>

          {/* Gallery Images */}
          <div className="p-4 rounded-3xl bg-bg dark:bg-[#161426] border border-lavender/50 dark:border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-bodyText-muted dark:text-lavender-light/70">
                Gallery Images (One URL per line or batch upload)
              </label>
              <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-lavender-light text-deepInk text-xs font-bold cursor-pointer hover:bg-deepInk hover:text-white transition-colors border border-lavender-border/50">
                <Upload className="w-3.5 h-3.5" />
                {isUploadingGallery ? 'Uploading...' : 'Batch Upload Images'}
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleGalleryUpload}
                  disabled={isUploadingGallery}
                  className="hidden"
                />
              </label>
            </div>
            <textarea
              rows={3}
              value={galleryInput}
              onChange={(e) => setGalleryInput(e.target.value)}
              placeholder="https://.../img1.jpg&#10;https://.../img2.jpg"
              className="w-full px-4 py-2 rounded-2xl bg-white dark:bg-[#1E1B33] border border-lavender/50 dark:border-white/10 text-deepInk dark:text-white text-xs font-mono focus:outline-none focus:border-deepInk"
            />
          </div>

          {/* Behance-Style Case Study Blocks Builder */}
          <div className="p-5 rounded-3xl bg-lavender-soft dark:bg-[#161426] border border-lavender/60 dark:border-white/10 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="font-serif font-bold text-base text-deepInk dark:text-white">
                  Behance-Style Story Blocks
                </h4>
                <p className="text-xs text-bodyText-muted dark:text-lavender-light/70 font-medium">
                  Build vertical case studies with custom text, renders, and quotes
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleAddBlock('text')}
                  className="px-3 py-1.5 rounded-full bg-white dark:bg-[#1E1B33] border border-lavender/40 dark:border-white/10 text-xs font-bold text-deepInk dark:text-lavender-light hover:bg-lavender-light flex items-center gap-1 shadow-sm"
                >
                  <Type className="w-3.5 h-3.5" />
                  + Text
                </button>
                <button
                  type="button"
                  onClick={() => handleAddBlock('image')}
                  className="px-3 py-1.5 rounded-full bg-white dark:bg-[#1E1B33] border border-lavender/40 dark:border-white/10 text-xs font-bold text-deepInk dark:text-lavender-light hover:bg-lavender-light flex items-center gap-1 shadow-sm"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  + Image
                </button>
                <button
                  type="button"
                  onClick={() => handleAddBlock('quote')}
                  className="px-3 py-1.5 rounded-full bg-white dark:bg-[#1E1B33] border border-lavender/40 dark:border-white/10 text-xs font-bold text-deepInk dark:text-lavender-light hover:bg-lavender-light flex items-center gap-1 shadow-sm"
                >
                  <Quote className="w-3.5 h-3.5" />
                  + Quote
                </button>
              </div>
            </div>

            {/* List of Blocks */}
            <div className="space-y-3">
              {(formData.contentBlocks || []).map((block, idx) => (
                <div
                  key={block.id || idx}
                  className="p-4 rounded-2xl bg-white dark:bg-[#1E1B33] border border-lavender/40 dark:border-white/10 shadow-sm space-y-2 relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-bg dark:bg-[#161426] border border-lavender/40 text-deepInk dark:text-lavender-light">
                      Block {idx + 1}: {block.type}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveBlock(idx)}
                      className="p-1 rounded-full text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {block.type === 'text' && (
                    <>
                      <input
                        type="text"
                        value={block.title || ''}
                        onChange={(e) => handleBlockChange(idx, 'title', e.target.value)}
                        placeholder="Block Heading"
                        className="w-full px-3 py-1.5 rounded-xl bg-bg dark:bg-[#161426] border border-lavender/40 text-xs font-bold text-deepInk dark:text-white"
                      />
                      <textarea
                        rows={2}
                        value={block.content || ''}
                        onChange={(e) => handleBlockChange(idx, 'content', e.target.value)}
                        placeholder="Detailed narrative content..."
                        className="w-full px-3 py-1.5 rounded-xl bg-bg dark:bg-[#161426] border border-lavender/40 text-xs text-deepInk dark:text-white"
                      />
                    </>
                  )}

                  {block.type === 'image' && (
                    <>
                      <input
                        type="text"
                        value={block.mediaUrl || ''}
                        onChange={(e) => handleBlockChange(idx, 'mediaUrl', e.target.value)}
                        placeholder="Image URL"
                        className="w-full px-3 py-1.5 rounded-xl bg-bg dark:bg-[#161426] border border-lavender/40 text-xs font-semibold text-deepInk dark:text-white"
                      />
                      <input
                        type="text"
                        value={block.mediaCaption || ''}
                        onChange={(e) => handleBlockChange(idx, 'mediaCaption', e.target.value)}
                        placeholder="Caption (e.g. 3D packaging dieline in Blender)"
                        className="w-full px-3 py-1.5 rounded-xl bg-bg dark:bg-[#161426] border border-lavender/40 text-xs text-deepInk dark:text-white"
                      />
                    </>
                  )}

                  {block.type === 'quote' && (
                    <input
                      type="text"
                      value={block.content || ''}
                      onChange={(e) => handleBlockChange(idx, 'content', e.target.value)}
                      placeholder="“Highlight quote or creative statement”"
                      className="w-full px-3 py-1.5 rounded-xl bg-bg dark:bg-[#161426] border border-lavender/40 text-xs italic font-semibold text-deepInk dark:text-white"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Featured Toggle */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="featured-check"
              checked={Boolean(formData.featured)}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-5 h-5 rounded-lg text-deepInk focus:ring-lavender border-lavender/60"
            />
            <label htmlFor="featured-check" className="text-sm font-bold text-deepInk dark:text-white cursor-pointer">
              Show in Featured Case Studies on Home page
            </label>
          </div>

          {/* Action Buttons */}
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
              {isSaving ? 'Saving Project...' : 'Save & Publish'}
            </ClayButton>
          </div>
        </form>
      </div>
    </div>
  );
}
