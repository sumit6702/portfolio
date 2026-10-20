'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Building,
  User,
  X,
  Plus,
  Trash2,
  Upload,
  Save,
  Eye,
  Edit3,
  Video,
  Type,
  Quote,
  Sparkles,
  MoveUp,
  MoveDown,
  Check,
  ExternalLink,
  ChevronRight,
  ImageIcon,
  AlertTriangle,
} from 'lucide-react';
import { Project, CaseStudyBlock } from '@/lib/types';
import { checkAdminSession } from '@/lib/auth';
import { saveProject, fetchProfileSettings } from '@/lib/data-service';
import { DEFAULT_CATEGORIES } from '@/lib/initial-data';
import { uploadPortfolioImage } from '@/lib/storage';
import VideoEmbed from '@/components/videos/VideoEmbed';
import ProjectCard from '@/components/projects/ProjectCard';
import ClayButton from '@/components/3d/ClayButton';

interface LiveProjectCaseStudyProps {
  initialProject: Project;
  prevProject: Project | null;
  nextProject: Project | null;
  relatedProjects: Project[];
  isNew?: boolean;
}

export default function LiveProjectCaseStudy({
  initialProject,
  prevProject,
  nextProject,
  relatedProjects,
  isNew = false,
}: LiveProjectCaseStudyProps) {
  const router = useRouter();
  const [project, setProject] = useState<Project>(initialProject);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditMode, setIsEditMode] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Unsaved changes & discard confirmation state
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(isNew);
  const [showDiscardModal, setShowDiscardModal] = useState<boolean>(false);
  const [pendingRedirect, setPendingRedirect] = useState<string | null>(null);
  const [availableCategories, setAvailableCategories] = useState<string[]>(DEFAULT_CATEGORIES);

  useEffect(() => {
    fetchProfileSettings().then((prof) => {
      if (prof?.categories && prof.categories.length > 0) {
        setAvailableCategories(prof.categories);
      }
    });
  }, []);

  // Info modal state
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [infoForm, setInfoForm] = useState({
    title: initialProject.title,
    category: initialProject.category,
    role: initialProject.role,
    client: initialProject.client,
    year: initialProject.year,
    description: initialProject.description,
    tools: initialProject.tools.join(', '),
  });

  // Insert modal state
  const [insertModalIndex, setInsertModalIndex] = useState<number | null>(null);
  const [insertType, setInsertType] = useState<'image' | 'video' | 'text' | 'quote'>('image');
  const [insertInputUrl, setInsertInputUrl] = useState('');
  const [insertInputText, setInsertInputText] = useState('');
  const [insertInputTitle, setInsertInputTitle] = useState('');
  const [isUploadingMedia, setIsUploadingMedia] = useState(false);

  // Video URL edit prompt state
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [videoInputUrl, setVideoInputUrl] = useState(initialProject.videoUrl || '');

  // Cover image upload
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const coverInputRef = useRef<HTMLInputElement>(null);

  // Check admin session on mount
  useEffect(() => {
    checkAdminSession().then((user) => {
      if (user) {
        setIsAdmin(true);
      }
    });
  }, []);

  // Warn user on browser tab close or refresh if there are unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  // Update info form when project updates
  useEffect(() => {
    setInfoForm({
      title: project.title,
      category: project.category,
      role: project.role,
      client: project.client,
      year: project.year,
      description: project.description,
      tools: project.tools.join(', '),
    });
    setVideoInputUrl(project.videoUrl || '');
  }, [project]);

  // Normalize project content blocks from either contentBlocks or galleryImages
  const hasCustomBlocks = project.contentBlocks && project.contentBlocks.length > 0;
  
  // Normalized list of items for the Behance vertical stack
  const stackItems: CaseStudyBlock[] = hasCustomBlocks
    ? project.contentBlocks
    : project.galleryImages.map((url, i) => ({
        id: `img-${i}`,
        type: 'image',
        mediaUrl: url,
      }));

  /* ---------------- NAVIGATION INTERCEPTOR WITH DISCARD WARNING ---------------- */
  const handleAttemptNavigate = (targetUrl: string) => {
    if (hasUnsavedChanges) {
      setPendingRedirect(targetUrl);
      setShowDiscardModal(true);
    } else {
      router.push(targetUrl);
    }
  };

  const handleConfirmDiscard = () => {
    setShowDiscardModal(false);
    setHasUnsavedChanges(false);
    const destination = pendingRedirect || '/admin';
    router.push(destination);
  };

  /* ---------------- SAVE ACTION ---------------- */
  const handleSave = async (updatedProject?: Project) => {
    const target = updatedProject || project;

    if (!target.title || !target.title.trim()) {
      setErrorMessage('Please provide a project title before saving.');
      setIsInfoModalOpen(true);
      return;
    }

    const cleanSlug =
      (target.slug && target.slug.trim()) ||
      target.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '') ||
      `project-${Date.now()}`;

    const toSave: Project = {
      ...target,
      slug: cleanSlug,
      videoUrl: target.videoUrl && target.videoUrl.trim() ? target.videoUrl.trim() : undefined,
    };

    setIsSaving(true);
    setErrorMessage('');

    try {
      const res = await saveProject(toSave);
      if (res.error) {
        setErrorMessage(res.error);
      } else if (res.data) {
        setProject(res.data);
        setHasUnsavedChanges(false);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);

        // If new project or slug changed, transition to the permanent slug
        if (isNew || res.data.slug !== initialProject.slug) {
          router.replace(`/projects/${res.data.slug}`);
        }
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to save project.');
    } finally {
      setIsSaving(false);
    }
  };

  /* ---------------- COVER IMAGE UPLOAD ---------------- */
  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingCover(true);
    setErrorMessage('');

    const res = await uploadPortfolioImage(file);
    setIsUploadingCover(false);

    const newUrl = res.url || URL.createObjectURL(file);
    setProject((prev) => ({ ...prev, coverImage: newUrl }));
    setHasUnsavedChanges(true);
  };

  /* ---------------- MAIN VIDEO REEL ACTIONS ---------------- */
  // Remove video section completely (Requirement 2)
  const handleRemoveVideo = () => {
    setProject((prev) => ({ ...prev, videoUrl: '' }));
    setHasUnsavedChanges(true);
  };

  const handleSaveVideoUrl = () => {
    const cleanUrl = videoInputUrl.trim();
    setProject((prev) => ({ ...prev, videoUrl: cleanUrl || undefined }));
    setIsVideoModalOpen(false);
    setHasUnsavedChanges(true);
  };

  /* ---------------- STACK ITEM ACTIONS (BEHANCE STYLE) ---------------- */
  // Delete item from stack
  const handleDeleteStackItem = (index: number) => {
    const newItems = stackItems.filter((_, i) => i !== index);
    setProject((prev) => ({
      ...prev,
      contentBlocks: newItems,
      galleryImages: newItems.filter((item) => item.type === 'image' && item.mediaUrl).map((item) => item.mediaUrl!),
    }));
    setHasUnsavedChanges(true);
  };

  // Move item up
  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newItems = [...stackItems];
    const temp = newItems[index - 1];
    newItems[index - 1] = newItems[index];
    newItems[index] = temp;

    setProject((prev) => ({
      ...prev,
      contentBlocks: newItems,
      galleryImages: newItems.filter((item) => item.type === 'image' && item.mediaUrl).map((item) => item.mediaUrl!),
    }));
    setHasUnsavedChanges(true);
  };

  // Move item down
  const handleMoveDown = (index: number) => {
    if (index === stackItems.length - 1) return;
    const newItems = [...stackItems];
    const temp = newItems[index + 1];
    newItems[index + 1] = newItems[index];
    newItems[index] = temp;

    setProject((prev) => ({
      ...prev,
      contentBlocks: newItems,
      galleryImages: newItems.filter((item) => item.type === 'image' && item.mediaUrl).map((item) => item.mediaUrl!),
    }));
    setHasUnsavedChanges(true);
  };

  // Replace image at index
  const handleReplaceImage = async (index: number, file: File) => {
    setIsUploadingMedia(true);
    const res = await uploadPortfolioImage(file);
    setIsUploadingMedia(false);

    const newUrl = res.url || URL.createObjectURL(file);
    const newItems = [...stackItems];
    newItems[index] = {
      ...newItems[index],
      mediaUrl: newUrl,
    };

    setProject((prev) => ({
      ...prev,
      contentBlocks: newItems,
      galleryImages: newItems.filter((item) => item.type === 'image' && item.mediaUrl).map((item) => item.mediaUrl!),
    }));
    setHasUnsavedChanges(true);
  };

  /* ---------------- INSERT NEW ITEM (AT GAP OR END) ---------------- */
  const handleInsertSubmit = async () => {
    if (insertModalIndex === null) return;

    let newBlock: CaseStudyBlock;
    if (insertType === 'image') {
      if (!insertInputUrl) return;
      newBlock = {
        id: `blk-${Date.now()}`,
        type: 'image',
        mediaUrl: insertInputUrl,
        mediaCaption: insertInputTitle || undefined,
      };
    } else if (insertType === 'video') {
      if (!insertInputUrl) return;
      newBlock = {
        id: `blk-${Date.now()}`,
        type: 'video',
        mediaUrl: insertInputUrl,
        title: insertInputTitle || undefined,
      };
    } else if (insertType === 'quote') {
      if (!insertInputText) return;
      newBlock = {
        id: `blk-${Date.now()}`,
        type: 'quote',
        content: insertInputText,
      };
    } else {
      // Text
      if (!insertInputText && !insertInputTitle) return;
      newBlock = {
        id: `blk-${Date.now()}`,
        type: 'text',
        title: insertInputTitle || undefined,
        content: insertInputText,
      };
    }

    const newItems = [...stackItems];
    newItems.splice(insertModalIndex, 0, newBlock);

    setProject((prev) => ({
      ...prev,
      contentBlocks: newItems,
      galleryImages: newItems.filter((item) => item.type === 'image' && item.mediaUrl).map((item) => item.mediaUrl!),
    }));
    setHasUnsavedChanges(true);

    setInsertModalIndex(null);
    setInsertInputUrl('');
    setInsertInputText('');
    setInsertInputTitle('');
  };

  // Direct file upload for insertion
  const handleDirectInsertUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingMedia(true);
    const res = await uploadPortfolioImage(file);
    setIsUploadingMedia(false);

    const newUrl = res.url || URL.createObjectURL(file);
    const newBlock: CaseStudyBlock = {
      id: `blk-${Date.now()}`,
      type: 'image',
      mediaUrl: newUrl,
    };

    const newItems = [...stackItems];
    newItems.splice(index, 0, newBlock);

    setProject((prev) => ({
      ...prev,
      contentBlocks: newItems,
      galleryImages: newItems.filter((item) => item.type === 'image' && item.mediaUrl).map((item) => item.mediaUrl!),
    }));
    setHasUnsavedChanges(true);
  };

  /* ---------------- PROJECT INFO UPDATE ---------------- */
  const handleSaveInfo = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedTools = infoForm.tools
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    setProject((prev) => ({
      ...prev,
      title: infoForm.title,
      category: infoForm.category,
      role: infoForm.role,
      client: infoForm.client,
      year: infoForm.year,
      description: infoForm.description,
      tools: parsedTools,
    }));
    setHasUnsavedChanges(true);
    setIsInfoModalOpen(false);
  };

  // Video Reel condition: only render if videoUrl has real non-empty content
  const hasMainVideo = Boolean(project.videoUrl && project.videoUrl.trim());

  return (
    <div className="py-6 md:py-12 relative">
      
      {/* ======================================================================== */}
      {/* ADMIN BEHANCE-STYLE LIVE EDITOR TOP BAR (Admin Logged In Only)          */}
      {/* ======================================================================== */}
      {isAdmin && (
        <div className="sticky top-2 z-50 max-w-6xl mx-auto px-4 mb-6">
          <div className="p-3 sm:p-4 rounded-3xl bg-deepInk text-white shadow-2xl border-2 border-white/20 flex flex-wrap items-center justify-between gap-3 animate-fade-in backdrop-blur-md">
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-periwinkle text-deepInk flex items-center justify-center font-bold text-xs shadow-sm">
                <Edit3 className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-periwinkle">
                    {isNew ? 'New Project Live Creator' : 'Behance Live Editor'}
                  </span>
                  
                  {/* Status Indicator */}
                  {hasUnsavedChanges ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-bold border border-amber-400/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                      Unsaved Draft Edits
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 text-[10px] font-bold border border-emerald-400/30">
                      <Check className="w-3 h-3 text-emerald-400" />
                      Saved & Published
                    </span>
                  )}
                </div>
                <h4 className="text-sm font-bold text-white truncate max-w-[200px] sm:max-w-xs">
                  {project.title || 'Untitled Case Study'}
                </h4>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Preview vs Edit Mode toggle */}
              <button
                onClick={() => setIsEditMode(!isEditMode)}
                className={`btn-tactile px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
                  isEditMode
                    ? 'bg-white/10 text-white hover:bg-white/20'
                    : 'bg-emerald-500 text-white shadow-sm'
                }`}
                title={isEditMode ? 'Switch to Visitor Preview' : 'Switch to Live Edit Mode'}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{isEditMode ? 'Visitor Preview' : 'Editing Live'}</span>
              </button>

              {/* Edit Info Button */}
              {isEditMode && (
                <button
                  onClick={() => setIsInfoModalOpen(true)}
                  className="btn-tactile px-3.5 py-1.5 rounded-full bg-white/10 text-white text-xs font-bold hover:bg-white/20 flex items-center gap-1.5"
                >
                  <Edit3 className="w-3.5 h-3.5 text-periwinkle" />
                  <span>Edit Info</span>
                </button>
              )}

              {/* Add Section at Bottom Button */}
              {isEditMode && (
                <button
                  onClick={() => setInsertModalIndex(stackItems.length)}
                  className="btn-tactile px-3.5 py-1.5 rounded-full bg-periwinkle-light text-deepInk text-xs font-bold hover:bg-white flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Block</span>
                </button>
              )}

              {/* Discard Warning / Exit Button */}
              <button
                onClick={() => handleAttemptNavigate('/admin')}
                className={`btn-tactile px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 transition-all ${
                  hasUnsavedChanges
                    ? 'bg-rose-500/20 hover:bg-rose-500 text-rose-200 hover:text-white border border-rose-400/30'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
                title="Discard edits or return to Admin"
              >
                <X className="w-3.5 h-3.5" />
                <span>{hasUnsavedChanges ? (isNew ? 'Discard Project' : 'Discard Edits') : 'Exit'}</span>
              </button>

              {/* Save Changes Button */}
              <button
                onClick={() => handleSave()}
                disabled={isSaving}
                className="btn-tactile btn-tactile-dark px-4 py-1.5 rounded-full bg-primary hover:bg-primary-hover text-white text-xs font-bold flex items-center gap-1.5 shadow-md active:scale-95"
              >
                {isSaving ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : saveSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-mint" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>{isNew ? 'Publish Project' : 'Save Project'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Save Notification Toast */}
      {saveSuccess && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-deepInk text-white text-xs font-bold shadow-2xl border border-mint/40 flex items-center gap-2 animate-bounce-subtle">
          <Check className="w-4 h-4 text-mint" />
          <span>Project saved and published successfully!</span>
        </div>
      )}

      {errorMessage && (
        <div className="max-w-6xl mx-auto px-4 mb-4">
          <div className="p-3.5 rounded-2xl bg-babyPink-light dark:bg-babyPink/20 border border-babyPink-border text-deepInk dark:text-babyPink-light text-xs font-bold">
            {errorMessage}
          </div>
        </div>
      )}

      {/* ======================================================================== */}
      {/* MAIN PROJECT CASE STUDY CONTAINER                                       */}
      {/* ======================================================================== */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Breadcrumb Navigation */}
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={() => handleAttemptNavigate('/projects')}
            className="group btn-tactile inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-deepInk dark:text-lavender-light bg-white dark:bg-[#1E1B33] px-4 py-2 rounded-full border border-lavender/40 dark:border-white/10 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to All Projects</span>
          </button>

          {isAdmin && (
            <span className="text-xs font-bold text-bodyText-muted dark:text-lavender-light/70 bg-white/70 dark:bg-[#1E1B33] px-3 py-1 rounded-full border border-lavender/40">
              {isEditMode ? 'Editing Mode Active' : 'Public Visitor View'}
            </span>
          )}
        </div>

        {/* Project Header Info Card */}
        <div className="relative group bg-white dark:bg-[#1E1B33] rounded-[32px] md:rounded-[40px] border border-lavender/50 dark:border-white/10 p-8 sm:p-12 shadow-[0_12px_36px_rgba(46,42,79,0.06)] mb-12">
          
          {/* Admin Mini Edit Icon for Header Details */}
          {isAdmin && isEditMode && (
            <button
              onClick={() => setIsInfoModalOpen(true)}
              className="absolute top-6 right-6 p-2 rounded-full bg-deepInk text-white text-xs font-bold shadow-md hover:scale-110 active:scale-95 transition-all flex items-center gap-1 z-20"
              title="Edit Title, Category, Role, Client, Year, Tools & Description"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Edit Details</span>
            </button>
          )}

          {/* Category & Year Badge */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <span className="px-3.5 py-1.5 rounded-full bg-periwinkle-light dark:bg-periwinkle/20 text-deepInk dark:text-periwinkle-light font-bold text-xs uppercase tracking-wider border border-periwinkle-border/60">
              {project.category}
            </span>
            <span className="text-xs font-bold text-bodyText-muted dark:text-lavender-light/70 flex items-center gap-1.5 bg-bg dark:bg-[#161426] px-3 py-1 rounded-full border border-lavender/40">
              <Calendar className="w-3.5 h-3.5" />
              {project.year}
            </span>
          </div>

          {/* Project Title */}
          <h1 className="font-serif font-black text-3xl sm:text-4xl md:text-5xl text-deepInk dark:text-white tracking-tight leading-tight mb-6">
            {project.title}
          </h1>

          {/* Meta Grid: Role, Client, Tools */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-6 border-y border-lavender/30 dark:border-white/10 mb-6">
            <div>
              <span className="text-xs font-bold text-bodyText-muted dark:text-lavender-light/60 uppercase block mb-1">
                Role
              </span>
              <p className="text-sm sm:text-base font-bold text-deepInk dark:text-white flex items-center gap-1.5">
                <User className="w-4 h-4 text-periwinkle" />
                {project.role}
              </p>
            </div>

            <div>
              <span className="text-xs font-bold text-bodyText-muted dark:text-lavender-light/60 uppercase block mb-1">
                Client / Brand
              </span>
              <p className="text-sm sm:text-base font-bold text-deepInk dark:text-white flex items-center gap-1.5">
                <Building className="w-4 h-4 text-babyPink" />
                {project.client || 'Personal Project'}
              </p>
            </div>

            <div>
              <span className="text-xs font-bold text-bodyText-muted dark:text-lavender-light/60 uppercase block mb-1">
                Tools & Technologies
              </span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {project.tools.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-0.5 rounded-full bg-bg dark:bg-[#161426] border border-lavender/40 text-xs font-bold text-deepInk dark:text-lavender-light"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="max-w-4xl">
            <h3 className="font-serif font-bold text-lg text-deepInk dark:text-white mb-2">
              Project Overview
            </h3>
            <p className="text-base sm:text-lg text-bodyText dark:text-lavender-light/90 leading-relaxed font-normal">
              {project.description}
            </p>
          </div>
        </div>

        {/* ======================================================================== */}
        {/* BIG HERO COVER IMAGE (With Mini Change Cover Icon for Admin)             */}
        {/* ======================================================================== */}
        <div className="relative group w-full aspect-[16/9] rounded-[32px] md:rounded-[40px] overflow-hidden border border-lavender/50 dark:border-white/10 shadow-[0_16px_40px_rgba(46,42,79,0.08)] mb-14 bg-bg dark:bg-[#161426]">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover"
          />

          {/* Admin Live Cover Change Button */}
          {isAdmin && isEditMode && (
            <div className="absolute inset-0 bg-deepInk/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
              <label className="btn-tactile cursor-pointer px-5 py-3 rounded-full bg-white text-deepInk font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xl hover:scale-105 active:scale-95 transition-all">
                <Upload className="w-4 h-4 text-periwinkle" />
                <span>{isUploadingCover ? 'Uploading Cover...' : 'Change Cover Image'}</span>
                <input
                  ref={coverInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleCoverUpload}
                  disabled={isUploadingCover}
                  className="hidden"
                />
              </label>
            </div>
          )}
        </div>

        {/* ======================================================================== */}
        {/* VIDEO REEL SECTION                                                       */}
        {/* REQUIREMENT: When Video URL is empty -> completely remove this section! */}
        {/* ======================================================================== */}
        {hasMainVideo ? (
          <div className="relative group mb-14">
            {/* Admin Mini Actions on Video Section */}
            {isAdmin && isEditMode && (
              <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20 flex items-center gap-2">
                <button
                  onClick={() => setIsVideoModalOpen(true)}
                  className="p-2 rounded-full bg-deepInk text-white text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
                  title="Edit Video URL"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Change Video</span>
                </button>

                <button
                  onClick={handleRemoveVideo}
                  className="p-2 rounded-full bg-rose-500 text-white text-xs font-bold shadow-md hover:bg-rose-600 hover:scale-105 active:scale-95 transition-all"
                  title="Remove Video from Project (Deletes Video Section)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            <div className="text-center max-w-xl mx-auto mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-deepInk dark:text-lavender-light">
                Motion Showcase
              </span>
              <h3 className="font-serif font-bold text-2xl text-deepInk dark:text-white">
                Project Video Reel
              </h3>
            </div>
            <VideoEmbed url={project.videoUrl!} title={project.title} />
          </div>
        ) : (
          /* When in Edit Mode and video is empty, show a discrete button to add video */
          isAdmin && isEditMode && (
            <div className="mb-14 p-6 rounded-3xl border-2 border-dashed border-lavender/60 dark:border-white/10 text-center bg-white/40 dark:bg-white/5">
              <p className="text-xs font-semibold text-bodyText-muted dark:text-lavender-light/60 mb-3">
                No Video Reel attached to this project (video section is hidden from visitors).
              </p>
              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="btn-tactile px-4 py-2 rounded-full bg-white dark:bg-[#1E1B33] border border-lavender/60 text-deepInk dark:text-white text-xs font-bold shadow-sm inline-flex items-center gap-2"
              >
                <Video className="w-4 h-4 text-periwinkle" />
                <span>+ Add Video Reel to Project</span>
              </button>
            </div>
          )
        )}

        {/* ======================================================================== */}
        {/* BEHANCE CASE STUDY VERTICAL STACK WITH IN-LINE EDITING                  */}
        {/* ======================================================================== */}
        <div className="space-y-12 mb-16">
          
          {stackItems.map((item, index) => {
            return (
              <React.Fragment key={item.id || index}>
                {/* ---------------- Gap [+] Insert Box Between Items ---------------- */}
                {isAdmin && isEditMode && (
                  <div className="relative group py-2 flex items-center justify-center">
                    <div className="w-full border-t border-dashed border-lavender/50 dark:border-white/10" />
                    
                    <div className="absolute flex items-center gap-2">
                      <button
                        onClick={() => setInsertModalIndex(index)}
                        className="btn-tactile px-3.5 py-1.5 rounded-full bg-white dark:bg-[#1E1B33] border-2 border-dashed border-lavender dark:border-white/20 text-deepInk dark:text-lavender-light hover:border-deepInk text-xs font-bold flex items-center gap-1.5 shadow-sm hover:scale-105 active:scale-95"
                        title="Insert block here"
                      >
                        <Plus className="w-3.5 h-3.5 text-primary" />
                        <span>Insert Media Here</span>
                      </button>

                      <label className="btn-tactile cursor-pointer p-1.5 rounded-full bg-white dark:bg-[#1E1B33] border border-lavender/60 text-deepInk dark:text-white hover:bg-lavender-light shadow-sm" title="Direct Upload Image Here">
                        <Upload className="w-3.5 h-3.5 text-periwinkle" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleDirectInsertUpload(index, e)}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                )}

                {/* ---------------- Actual Stack Item ---------------- */}
                <div className="relative group/block">
                  
                  {/* Admin Mini Action Bar for each Block (Top Right) */}
                  {isAdmin && isEditMode && (
                    <div className="absolute top-3 right-3 z-30 flex items-center gap-1.5 bg-deepInk/85 backdrop-blur-md p-1.5 rounded-full text-white shadow-lg transition-opacity duration-200">
                      
                      {/* Move Up */}
                      {index > 0 && (
                        <button
                          onClick={() => handleMoveUp(index)}
                          className="p-1 rounded-full hover:bg-white/20"
                          title="Move Up"
                        >
                          <MoveUp className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {/* Move Down */}
                      {index < stackItems.length - 1 && (
                        <button
                          onClick={() => handleMoveDown(index)}
                          className="p-1 rounded-full hover:bg-white/20"
                          title="Move Down"
                        >
                          <MoveDown className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {/* Replace Image Button (if image) */}
                      {item.type === 'image' && (
                        <label className="p-1 rounded-full hover:bg-white/20 cursor-pointer" title="Replace Image">
                          <Upload className="w-3.5 h-3.5" />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const f = e.target.files?.[0];
                              if (f) handleReplaceImage(index, f);
                            }}
                            className="hidden"
                          />
                        </label>
                      )}

                      {/* Delete Block (Mini X) */}
                      <button
                        onClick={() => handleDeleteStackItem(index)}
                        className="p-1 rounded-full bg-rose-500/80 hover:bg-rose-500 text-white"
                        title="Delete this block"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {/* Render based on item type */}
                  {item.type === 'text' && (
                    <div className="bg-white dark:bg-[#1E1B33] rounded-[32px] md:rounded-[40px] border border-lavender/50 dark:border-white/10 p-8 sm:p-12 shadow-soft-sm max-w-4xl mx-auto">
                      {item.title && (
                        <h3 className="font-serif font-black text-2xl sm:text-3xl text-deepInk dark:text-white mb-4">
                          {item.title}
                        </h3>
                      )}
                      <p className="text-base sm:text-lg text-bodyText dark:text-lavender-light/90 leading-relaxed font-normal whitespace-pre-line">
                        {item.content}
                      </p>
                    </div>
                  )}

                  {item.type === 'quote' && (
                    <div className="bg-lavender-soft dark:bg-[#161426] rounded-[32px] border-2 border-lavender/60 dark:border-white/10 p-8 sm:p-12 text-center max-w-3xl mx-auto shadow-sm">
                      <p className="font-serif font-bold text-xl sm:text-2xl text-deepInk dark:text-white italic leading-relaxed">
                        &ldquo;{item.content}&rdquo;
                      </p>
                    </div>
                  )}

                  {item.type === 'video' && item.mediaUrl && (
                    <div className="space-y-3">
                      <VideoEmbed url={item.mediaUrl} title={item.title || project.title} />
                      {item.mediaCaption && (
                        <p className="text-center text-xs font-semibold text-bodyText-muted dark:text-lavender-light/60 italic">
                          {item.mediaCaption}
                        </p>
                      )}
                    </div>
                  )}

                  {(item.type === 'image' || !item.type) && item.mediaUrl && (
                    <div className="space-y-3">
                      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-[32px] overflow-hidden border border-lavender/50 dark:border-white/10 shadow-[0_12px_32px_rgba(46,42,79,0.06)] bg-bg dark:bg-[#161426]">
                        <Image
                          src={item.mediaUrl}
                          alt={item.title || `${project.title} - View ${index + 1}`}
                          fill
                          sizes="(max-width: 1200px) 100vw, 1200px"
                          className="object-cover"
                        />
                      </div>
                      {item.mediaCaption && (
                        <p className="text-center text-xs font-semibold text-bodyText-muted dark:text-lavender-light/60 italic">
                          {item.mediaCaption}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </React.Fragment>
            );
          })}

          {/* ---------------- Final [+] Insert Box at the End of Stack ---------------- */}
          {isAdmin && isEditMode && (
            <div className="p-8 rounded-[32px] border-2 border-dashed border-lavender dark:border-white/20 bg-white/50 dark:bg-white/5 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-periwinkle-light dark:bg-white/10 text-deepInk dark:text-white flex items-center justify-center mx-auto shadow-sm">
                <Plus className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-lg text-deepInk dark:text-white">
                  Add Next Section to Case Study
                </h4>
                <p className="text-xs text-bodyText-muted dark:text-lavender-light/60 mt-1 max-w-sm mx-auto">
                  Append high-resolution renders, mockups, text breakdowns, or video embeds to the bottom of the stack.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <label className="btn-tactile cursor-pointer px-4 py-2 rounded-full bg-deepInk text-white text-xs font-bold flex items-center gap-1.5 shadow-sm hover:scale-105 active:scale-95">
                  <Upload className="w-4 h-4" />
                  <span>Upload Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleDirectInsertUpload(stackItems.length, e)}
                    className="hidden"
                  />
                </label>

                <button
                  onClick={() => setInsertModalIndex(stackItems.length)}
                  className="btn-tactile px-4 py-2 rounded-full bg-white dark:bg-[#1E1B33] border border-lavender/60 text-deepInk dark:text-white text-xs font-bold flex items-center gap-1.5 shadow-sm hover:scale-105 active:scale-95"
                >
                  <Plus className="w-4 h-4 text-periwinkle" />
                  <span>Insert Block (Video, Text, URL)</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ======================================================================== */}
        {/* NEXT / PREVIOUS NAVIGATION (Only shown on published projects)            */}
        {/* ======================================================================== */}
        {!isNew && (
          <div className="pt-8 border-t border-lavender/40 dark:border-white/10 mb-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {prevProject ? (
                <Link
                  href={`/projects/${prevProject.slug}`}
                  className="group p-6 rounded-[28px] bg-white dark:bg-[#1E1B33] border border-lavender/50 dark:border-white/10 shadow-sm card-float flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-lavender-light dark:bg-white/10 text-deepInk dark:text-white flex items-center justify-center shrink-0 group-hover:bg-deepInk group-hover:text-white transition-colors">
                    <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-xs font-bold uppercase text-bodyText-muted dark:text-lavender-light/60">
                      Previous Project
                    </span>
                    <h4 className="font-serif font-bold text-base text-deepInk dark:text-white truncate group-hover:text-deepInk transition-colors">
                      {prevProject.title}
                    </h4>
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {nextProject ? (
                <Link
                  href={`/projects/${nextProject.slug}`}
                  className="group p-6 rounded-[28px] bg-white dark:bg-[#1E1B33] border border-lavender/50 dark:border-white/10 shadow-sm card-float flex items-center justify-end text-right gap-4"
                >
                  <div className="overflow-hidden">
                    <span className="text-xs font-bold uppercase text-bodyText-muted dark:text-lavender-light/60">
                      Next Project
                    </span>
                    <h4 className="font-serif font-bold text-base text-deepInk dark:text-white truncate group-hover:text-deepInk transition-colors">
                      {nextProject.title}
                    </h4>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-lavender-light dark:bg-white/10 text-deepInk dark:text-white flex items-center justify-center shrink-0 group-hover:bg-deepInk group-hover:text-white transition-colors">
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        )}

        {/* Related Projects Row */}
        {!isNew && relatedProjects.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-bodyText-muted dark:text-lavender-light/70">
                  More From Portfolio
                </span>
                <h3 className="font-serif font-bold text-2xl sm:text-3xl text-deepInk dark:text-white">
                  Related Projects
                </h3>
              </div>
              <ClayButton variant="cream" size="sm" href="/projects">
                View All
              </ClayButton>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ======================================================================== */}
      {/* DISCARD CONFIRMATION WARNING MODAL                                       */}
      {/* ======================================================================== */}
      {showDiscardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-[#1E1B33] rounded-[32px] border-2 border-rose-300/60 dark:border-rose-500/30 p-6 sm:p-8 max-w-md w-full shadow-2xl text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-rose-100 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto shadow-inner">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <div>
              <h3 className="font-serif font-black text-2xl text-deepInk dark:text-white">
                {isNew ? 'Discard New Project?' : 'Discard Unsaved Changes?'}
              </h3>
              <p className="text-xs sm:text-sm text-bodyText-muted dark:text-lavender-light/70 font-medium mt-2 leading-relaxed">
                {isNew
                  ? 'You are currently in live creation mode. If you discard now, this project draft will not be saved or published to your portfolio.'
                  : 'You have unsaved changes in this case study. If you leave without saving, all new modifications will be discarded.'}
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setShowDiscardModal(false)}
                className="btn-tactile w-full sm:w-auto px-5 py-2.5 rounded-full bg-lavender-light dark:bg-white/10 text-deepInk dark:text-white text-xs font-bold"
              >
                Continue Editing
              </button>

              <button
                type="button"
                onClick={handleConfirmDiscard}
                className="btn-tactile w-full sm:w-auto px-5 py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md active:scale-95 transition-all"
              >
                Discard & Leave
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================================== */}
      {/* MODAL: EDIT PROJECT INFO (Title, Category, Role, Client, Tools, etc.)     */}
      {/* ======================================================================== */}
      {isInfoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-[#1E1B33] rounded-[32px] md:rounded-[40px] border border-lavender/50 dark:border-white/10 p-6 sm:p-8 max-w-xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-lavender/30 dark:border-white/10 mb-6">
              <h3 className="font-serif font-bold text-xl text-deepInk dark:text-white">
                {isNew ? 'Set Project Details' : 'Edit Project Information'}
              </h3>
              <button
                onClick={() => setIsInfoModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-lavender-light dark:hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveInfo} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-bodyText-muted dark:text-lavender-light/70 mb-1">
                  Project Title
                </label>
                <input
                  type="text"
                  required
                  value={infoForm.title}
                  onChange={(e) => setInfoForm({ ...infoForm, title: e.target.value })}
                  placeholder="e.g. Crunchy Piper - 3D Brand System"
                  className="w-full px-4 py-2.5 rounded-xl bg-bg dark:bg-[#161426] border border-lavender/50 text-deepInk dark:text-white text-sm font-semibold focus:outline-none focus:border-deepInk"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-bodyText-muted dark:text-lavender-light/70 mb-1">
                    Category
                  </label>
                  <select
                    value={infoForm.category}
                    onChange={(e) => setInfoForm({ ...infoForm, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-bg dark:bg-[#161426] border border-lavender/50 text-deepInk dark:text-white text-sm font-semibold focus:outline-none"
                  >
                    {infoForm.category && !availableCategories.includes(infoForm.category) && (
                      <option value={infoForm.category}>{infoForm.category}</option>
                    )}
                    {availableCategories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-bodyText-muted dark:text-lavender-light/70 mb-1">
                    Year
                  </label>
                  <input
                    type="text"
                    value={infoForm.year}
                    onChange={(e) => setInfoForm({ ...infoForm, year: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-bg dark:bg-[#161426] border border-lavender/50 text-deepInk dark:text-white text-sm font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-bodyText-muted dark:text-lavender-light/70 mb-1">
                    Role
                  </label>
                  <input
                    type="text"
                    value={infoForm.role}
                    onChange={(e) => setInfoForm({ ...infoForm, role: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-bg dark:bg-[#161426] border border-lavender/50 text-deepInk dark:text-white text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-bodyText-muted dark:text-lavender-light/70 mb-1">
                    Client / Brand
                  </label>
                  <input
                    type="text"
                    value={infoForm.client}
                    onChange={(e) => setInfoForm({ ...infoForm, client: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-bg dark:bg-[#161426] border border-lavender/50 text-deepInk dark:text-white text-sm font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-bodyText-muted dark:text-lavender-light/70 mb-1">
                  Tools (comma separated)
                </label>
                <input
                  type="text"
                  value={infoForm.tools}
                  onChange={(e) => setInfoForm({ ...infoForm, tools: e.target.value })}
                  placeholder="Blender, After Effects, Illustrator"
                  className="w-full px-4 py-2.5 rounded-xl bg-bg dark:bg-[#161426] border border-lavender/50 text-deepInk dark:text-white text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-bodyText-muted dark:text-lavender-light/70 mb-1">
                  Overview Description
                </label>
                <textarea
                  rows={4}
                  value={infoForm.description}
                  onChange={(e) => setInfoForm({ ...infoForm, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-bg dark:bg-[#161426] border border-lavender/50 text-deepInk dark:text-white text-sm font-medium resize-none"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsInfoModalOpen(false)}
                  className="btn-tactile px-5 py-2.5 rounded-full bg-lavender-light dark:bg-white/10 text-deepInk dark:text-white text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-tactile btn-tactile-dark px-6 py-2.5 rounded-full bg-deepInk text-white text-xs font-bold"
                >
                  Apply Details
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================================== */}
      {/* MODAL: EDIT / ADD VIDEO REEL URL                                         */}
      {/* ======================================================================== */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-[#1E1B33] rounded-[32px] border border-lavender/50 dark:border-white/10 p-6 sm:p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-lavender/30 dark:border-white/10 mb-4">
              <h3 className="font-serif font-bold text-lg text-deepInk dark:text-white flex items-center gap-2">
                <Video className="w-5 h-5 text-periwinkle" />
                <span>Project Video Reel Link</span>
              </h3>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="p-1 rounded-full hover:bg-lavender-light"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-bodyText-muted dark:text-lavender-light/70 mb-4">
              Paste a YouTube or Vimeo URL. Leave empty to remove the video section from the project.
            </p>

            <input
              type="url"
              value={videoInputUrl}
              onChange={(e) => setVideoInputUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full px-4 py-2.5 rounded-xl bg-bg dark:bg-[#161426] border border-lavender/50 text-deepInk dark:text-white text-xs sm:text-sm font-semibold mb-6 focus:outline-none focus:border-deepInk"
            />

            <div className="flex items-center justify-between gap-3">
              {project.videoUrl && (
                <button
                  type="button"
                  onClick={() => {
                    handleRemoveVideo();
                    setIsVideoModalOpen(false);
                  }}
                  className="btn-tactile text-xs font-bold text-rose-500 hover:underline"
                >
                  Remove Video
                </button>
              )}
              <div className="flex items-center gap-2 ml-auto">
                <button
                  type="button"
                  onClick={() => setIsVideoModalOpen(false)}
                  className="btn-tactile px-4 py-2 rounded-full bg-lavender-light dark:bg-white/10 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveVideoUrl}
                  className="btn-tactile btn-tactile-dark px-5 py-2 rounded-full bg-deepInk text-white text-xs font-bold"
                >
                  Apply Video
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================================== */}
      {/* MODAL: INSERT MEDIA OR BLOCK AT INDEX                                    */}
      {/* ======================================================================== */}
      {insertModalIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-[#1E1B33] rounded-[32px] md:rounded-[40px] border border-lavender/50 dark:border-white/10 p-6 sm:p-8 max-w-lg w-full shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-lavender/30 dark:border-white/10 mb-5">
              <h3 className="font-serif font-bold text-lg text-deepInk dark:text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-primary" />
                <span>Insert Block (Position {insertModalIndex + 1})</span>
              </h3>
              <button
                onClick={() => setInsertModalIndex(null)}
                className="p-1 rounded-full hover:bg-lavender-light"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Block Type Picker */}
            <div className="grid grid-cols-4 gap-2 mb-6">
              {[
                { type: 'image', label: 'Image', icon: <ImageIcon className="w-4 h-4" /> },
                { type: 'video', label: 'Video', icon: <Video className="w-4 h-4" /> },
                { type: 'text', label: 'Text', icon: <Type className="w-4 h-4" /> },
                { type: 'quote', label: 'Quote', icon: <Quote className="w-4 h-4" /> },
              ].map((tab) => (
                <button
                  key={tab.type}
                  type="button"
                  onClick={() => setInsertType(tab.type as any)}
                  className={`btn-tactile p-3 rounded-2xl flex flex-col items-center gap-1 text-xs font-bold transition-all ${
                    insertType === tab.type
                      ? 'btn-tactile-dark bg-deepInk text-white shadow-sm'
                      : 'bg-bg dark:bg-[#161426] text-deepInk dark:text-lavender-light hover:bg-lavender-light'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Content inputs based on selected type */}
            <div className="space-y-4">
              {insertType === 'image' && (
                <>
                  <div>
                    <label className="block text-xs font-bold uppercase text-bodyText-muted dark:text-lavender-light/70 mb-1">
                      Image URL or Upload
                    </label>
                    <input
                      type="url"
                      value={insertInputUrl}
                      onChange={(e) => setInsertInputUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/... or paste image URL"
                      className="w-full px-4 py-2.5 rounded-xl bg-bg dark:bg-[#161426] border border-lavender/50 text-deepInk dark:text-white text-xs sm:text-sm font-semibold mb-2"
                    />

                    <label className="btn-tactile cursor-pointer w-full py-2.5 rounded-xl bg-lavender-light dark:bg-white/10 text-deepInk dark:text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-lavender">
                      <Upload className="w-4 h-4 text-periwinkle" />
                      <span>{isUploadingMedia ? 'Uploading image...' : 'Or choose file from computer'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const f = e.target.files?.[0];
                          if (!f) return;
                          setIsUploadingMedia(true);
                          const res = await uploadPortfolioImage(f);
                          setIsUploadingMedia(false);
                          setInsertInputUrl(res.url || URL.createObjectURL(f));
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-bodyText-muted dark:text-lavender-light/70 mb-1">
                      Caption (optional)
                    </label>
                    <input
                      type="text"
                      value={insertInputTitle}
                      onChange={(e) => setInsertInputTitle(e.target.value)}
                      placeholder="e.g. 3D packaging render in Blender Cycles"
                      className="w-full px-4 py-2 rounded-xl bg-bg dark:bg-[#161426] border border-lavender/50 text-deepInk dark:text-white text-xs font-medium"
                    />
                  </div>
                </>
              )}

              {insertType === 'video' && (
                <>
                  <div>
                    <label className="block text-xs font-bold uppercase text-bodyText-muted dark:text-lavender-light/70 mb-1">
                      YouTube / Vimeo URL
                    </label>
                    <input
                      type="url"
                      required
                      value={insertInputUrl}
                      onChange={(e) => setInsertInputUrl(e.target.value)}
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="w-full px-4 py-2.5 rounded-xl bg-bg dark:bg-[#161426] border border-lavender/50 text-deepInk dark:text-white text-xs sm:text-sm font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-bodyText-muted dark:text-lavender-light/70 mb-1">
                      Video Title / Label
                    </label>
                    <input
                      type="text"
                      value={insertInputTitle}
                      onChange={(e) => setInsertInputTitle(e.target.value)}
                      placeholder="e.g. 3D Animation Breakdown"
                      className="w-full px-4 py-2 rounded-xl bg-bg dark:bg-[#161426] border border-lavender/50 text-deepInk dark:text-white text-xs font-medium"
                    />
                  </div>
                </>
              )}

              {insertType === 'text' && (
                <>
                  <div>
                    <label className="block text-xs font-bold uppercase text-bodyText-muted dark:text-lavender-light/70 mb-1">
                      Section Headline (optional)
                    </label>
                    <input
                      type="text"
                      value={insertInputTitle}
                      onChange={(e) => setInsertInputTitle(e.target.value)}
                      placeholder="e.g. Creative Process & Challenges"
                      className="w-full px-4 py-2 rounded-xl bg-bg dark:bg-[#161426] border border-lavender/50 text-deepInk dark:text-white text-xs font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-bodyText-muted dark:text-lavender-light/70 mb-1">
                      Paragraph Content
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={insertInputText}
                      onChange={(e) => setInsertInputText(e.target.value)}
                      placeholder="Write your case study details..."
                      className="w-full px-4 py-2.5 rounded-xl bg-bg dark:bg-[#161426] border border-lavender/50 text-deepInk dark:text-white text-xs sm:text-sm font-medium resize-none"
                    />
                  </div>
                </>
              )}

              {insertType === 'quote' && (
                <div>
                  <label className="block text-xs font-bold uppercase text-bodyText-muted dark:text-lavender-light/70 mb-1">
                    Quote Statement
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={insertInputText}
                    onChange={(e) => setInsertInputText(e.target.value)}
                    placeholder="Enter inspiring project quote or highlight..."
                    className="w-full px-4 py-2.5 rounded-xl bg-bg dark:bg-[#161426] border border-lavender/50 text-deepInk dark:text-white text-sm font-medium resize-none italic"
                  />
                </div>
              )}

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setInsertModalIndex(null)}
                  className="btn-tactile px-4 py-2 rounded-full bg-lavender-light dark:bg-white/10 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleInsertSubmit}
                  className="btn-tactile btn-tactile-dark px-6 py-2 rounded-full bg-deepInk text-white text-xs font-bold"
                >
                  Insert Block
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
