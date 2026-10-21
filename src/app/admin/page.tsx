'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  FolderKanban,
  Film,
  UserCheck,
  Mail,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  LogOut,
  Database,
  Star,
  CheckCircle2,
  Tag,
  Palette,
  Sparkles,
} from 'lucide-react';
import { checkAdminSession, logoutAdmin, AdminUser } from '@/lib/auth';
import {
  fetchProjects,
  saveProject,
  deleteProject,
  fetchVideos,
  saveVideo,
  deleteVideo,
  fetchProfileSettings,
  saveProfileSettings,
  fetchContactInquiries,
} from '@/lib/data-service';
import { Project, VideoItem, ProfileSettings, ContactInquiry } from '@/lib/types';
import { DEFAULT_CATEGORIES } from '@/lib/initial-data';
import ProjectModal from '@/components/admin/ProjectModal';
import VideoModal from '@/components/admin/VideoModal';
import ProfileEditor from '@/components/admin/ProfileEditor';
import CategoryManager from '@/components/admin/CategoryManager';
import AppearanceEditor from '@/components/admin/AppearanceEditor';
import SupabaseSetupHelper from '@/components/admin/SupabaseSetupHelper';
import ClayButton from '@/components/3d/ClayButton';
import ThemeToggle from '@/components/theme/ThemeToggle';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [activeTab, setActiveTab] = useState<
    'projects' | 'videos' | 'categories' | 'appearance' | 'profile' | 'inquiries' | 'setup'
  >('projects');

  // Data states
  const [projects, setProjects] = useState<Project[]>([]);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [profile, setProfile] = useState<ProfileSettings | null>(null);
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);

  // Modals state
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<VideoItem | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  useEffect(() => {
    // Session Guard
    checkAdminSession().then((user) => {
      if (!user) {
        router.push('/admin/login');
      } else {
        setCurrentUser(user);
        loadAllData();
      }
    });
  }, [router]);

  const loadAllData = async () => {
    setIsLoading(true);
    try {
      const [pData, vData, profData, inqData] = await Promise.all([
        fetchProjects(),
        fetchVideos(),
        fetchProfileSettings(),
        fetchContactInquiries(),
      ]);

      setProjects(pData);
      setVideos(vData);
      setProfile(profData);
      setInquiries(inqData);
    } catch (err) {
      console.error('Error loading dashboard data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const showNotification = (msg: string) => {
    setActionSuccess(msg);
    setTimeout(() => setActionSuccess(null), 3000);
  };

  const handleLogout = async () => {
    await logoutAdmin();
    router.push('/admin/login');
  };

  // Project Actions
  const handleSaveProject = async (proj: Project) => {
    const res = await saveProject(proj);
    if (!res.error) {
      showNotification('Project created successfully!');
      const updated = await fetchProjects();
      setProjects(updated);
      setIsProjectModalOpen(false);
      // Seamlessly navigate to the live Behance editor on the project page
      router.push(`/projects/${proj.slug}`);
    } else {
      alert(`Error saving project: ${res.error}`);
    }
  };

  const handleDeleteProject = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      const res = await deleteProject(id);
      if (res.success) {
        showNotification('Project deleted.');
        setProjects(projects.filter((p) => p.id !== id));
      } else {
        alert(`Error deleting project: ${res.error}`);
      }
    }
  };

  // Toggle Featured Project status (Add/Remove from Featured Section)
  const handleToggleFeatured = async (proj: Project) => {
    const updatedStatus = !proj.featured;
    const updatedProj: Project = { ...proj, featured: updatedStatus };
    const res = await saveProject(updatedProj);
    if (!res.error) {
      setProjects((prev) =>
        prev.map((p) => (p.id === proj.id ? { ...p, featured: updatedStatus } : p))
      );
      showNotification(
        updatedStatus
          ? `Added "${proj.title}" to Featured section!`
          : `Removed "${proj.title}" from Featured section.`
      );
    } else {
      alert(`Error updating featured status: ${res.error}`);
    }
  };

  // Categories Save & Optional Rename Sync across projects/videos
  const handleSaveCategories = async (
    updatedCategories: string[],
    renamedMap?: { from: string; to: string }
  ) => {
    try {
      const baseProfile = profile || (await fetchProfileSettings());
      const newProfile: ProfileSettings = {
        ...baseProfile,
        categories: updatedCategories,
      };
      const res = await saveProfileSettings(newProfile);
      if (res.data) {
        setProfile(res.data);
        showNotification('Categories updated successfully!');

        // If a category was renamed, also update projects and videos that used the old name
        if (renamedMap && renamedMap.from && renamedMap.to) {
          const { from, to } = renamedMap;
          for (const p of projects) {
            if (p.category && p.category.toLowerCase().trim() === from.toLowerCase().trim()) {
              await saveProject({ ...p, category: to });
            }
          }
          for (const v of videos) {
            if (v.category && v.category.toLowerCase().trim() === from.toLowerCase().trim()) {
              await saveVideo({ ...v, category: to });
            }
          }
          const freshProjects = await fetchProjects();
          setProjects(freshProjects);
          const freshVideos = await fetchVideos();
          setVideos(freshVideos);
        }
      } else if (res.error) {
        alert(`Error saving categories: ${res.error}`);
      }
    } catch (err: any) {
      console.error('Error in handleSaveCategories:', err);
      alert('Error saving categories: ' + (err?.message || 'Unknown error'));
    }
  };

  // Video Actions
  const handleSaveVideo = async (vid: VideoItem) => {
    const res = await saveVideo(vid);
    if (!res.error) {
      showNotification('Video saved successfully!');
      const updated = await fetchVideos();
      setVideos(updated);
    } else {
      alert(`Error saving video: ${res.error}`);
    }
  };

  const handleDeleteVideo = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      const res = await deleteVideo(id);
      if (res.success) {
        showNotification('Video deleted.');
        setVideos(videos.filter((v) => v.id !== id));
      } else {
        alert(`Error deleting video: ${res.error}`);
      }
    }
  };

  // Profile & Appearance Save
  const handleSaveProfile = async (newProf: ProfileSettings) => {
    const res = await saveProfileSettings(newProf);
    if (res.data) {
      setProfile(res.data);
      if (res.error) {
        showNotification(`Saved locally. Supabase notice: ${res.error}`);
      } else {
        showNotification('Settings saved to Supabase successfully!');
      }
    } else if (res.error) {
      alert(`Error saving to database: ${res.error}`);
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-deepInk border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6 sm:py-8 px-3.5 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-colors duration-200">
      
      {/* Top Header Bar */}
      <div className="bg-white dark:bg-[#1E1B33] rounded-[28px] sm:rounded-[36px] md:rounded-[40px] border border-lavender/50 dark:border-white/10 p-4 sm:p-6 shadow-soft-sm mb-6 sm:mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-deepInk text-white flex items-center justify-center font-serif font-black text-xl sm:text-2xl shadow-sm shrink-0">
            S
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-serif font-black text-xl sm:text-2xl text-deepInk dark:text-white truncate">
                Portfolio Studio Admin
              </h1>
              <span className="px-2.5 sm:px-3 py-0.5 rounded-full bg-mint-light dark:bg-mint/20 text-deepInk dark:text-mint-light text-[10px] sm:text-[11px] font-bold uppercase border border-mint-border/50 shrink-0">
                {currentUser.isSupabaseAuth ? 'Supabase Live' : 'Local Sandbox'}
              </span>
            </div>
            <p className="text-xs font-semibold text-bodyText-muted dark:text-lavender-light/70 mt-0.5 truncate">
              Logged in as <span className="font-bold text-deepInk dark:text-white">{currentUser.email}</span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 shrink-0">
          <ThemeToggle />

          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-bg dark:bg-[#161426] border border-lavender/40 dark:border-white/10 text-deepInk dark:text-lavender-light text-xs font-bold hover:bg-lavender-light transition-colors shadow-sm shrink-0"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Live Site</span>
          </Link>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-babyPink-light dark:bg-babyPink/20 border border-babyPink-border text-deepInk dark:text-babyPink-light text-xs font-bold hover:bg-babyPink transition-colors shrink-0"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Instant Success Notification Toast */}
      {actionSuccess && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-deepInk text-white text-xs font-bold shadow-xl border border-lavender/40 flex items-center gap-2 animate-bounce-subtle">
          <CheckCircle2 className="w-4 h-4 text-mint" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="mb-6 sm:mb-8 overflow-x-auto no-scrollbar pb-1 -mx-3.5 px-3.5 sm:mx-0 sm:px-0">
        <div className="flex items-center gap-1.5 sm:gap-2 bg-white/90 dark:bg-[#1E1B33]/90 backdrop-blur-md p-1.5 sm:p-2 rounded-2xl sm:rounded-3xl lg:rounded-full border border-lavender/40 dark:border-white/10 shadow-sm min-w-max sm:min-w-0 sm:flex-wrap">
          <button
            onClick={() => setActiveTab('projects')}
            className={`btn-tactile shrink-0 whitespace-nowrap flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'projects'
                ? 'btn-tactile-dark bg-deepInk text-white shadow-sm'
                : 'text-deepInk dark:text-lavender-light hover:bg-lavender-light'
            }`}
          >
            <span className="relative z-10 flex items-center gap-2">
              <FolderKanban className="w-4 h-4 shrink-0" />
              <span>Projects ({projects.length})</span>
            </span>
          </button>

          <button
            onClick={() => setActiveTab('videos')}
            className={`btn-tactile shrink-0 whitespace-nowrap flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'videos'
                ? 'btn-tactile-dark bg-deepInk text-white shadow-sm'
                : 'text-deepInk dark:text-lavender-light hover:bg-lavender-light'
            }`}
          >
            <span className="relative z-10 flex items-center gap-2">
              <Film className="w-4 h-4 shrink-0" />
              <span>Videos ({videos.length})</span>
            </span>
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`btn-tactile shrink-0 whitespace-nowrap flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'categories'
                ? 'btn-tactile-dark bg-deepInk text-white shadow-sm'
                : 'text-deepInk dark:text-lavender-light hover:bg-lavender-light'
            }`}
          >
            <span className="relative z-10 flex items-center gap-2">
              <Tag className="w-4 h-4 shrink-0" />
              <span>Categories ({profile?.categories?.length || DEFAULT_CATEGORIES.length})</span>
            </span>
          </button>

          <button
            onClick={() => setActiveTab('appearance')}
            className={`btn-tactile shrink-0 whitespace-nowrap flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'appearance'
                ? 'btn-tactile-dark bg-deepInk text-white shadow-sm'
                : 'text-deepInk dark:text-lavender-light hover:bg-lavender-light'
            }`}
          >
            <span className="relative z-10 flex items-center gap-2">
              <Palette className="w-4 h-4 shrink-0" />
              <span>Appearance & Themes</span>
            </span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`btn-tactile shrink-0 whitespace-nowrap flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'profile'
                ? 'btn-tactile-dark bg-deepInk text-white shadow-sm'
                : 'text-deepInk dark:text-lavender-light hover:bg-lavender-light'
            }`}
          >
            <span className="relative z-10 flex items-center gap-2">
              <UserCheck className="w-4 h-4 shrink-0" />
              <span>Profile & Bio</span>
            </span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`btn-tactile shrink-0 whitespace-nowrap flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'inquiries'
                ? 'btn-tactile-dark bg-deepInk text-white shadow-sm'
                : 'text-deepInk dark:text-lavender-light hover:bg-lavender-light'
            }`}
          >
            <span className="relative z-10 flex items-center gap-2">
              <Mail className="w-4 h-4 shrink-0" />
              <span>Messages ({inquiries.length})</span>
            </span>
          </button>

          <button
            onClick={() => setActiveTab('setup')}
            className={`btn-tactile shrink-0 whitespace-nowrap flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'setup'
                ? 'btn-tactile-dark bg-deepInk text-white shadow-sm'
                : 'text-deepInk dark:text-lavender-light hover:bg-lavender-light'
            }`}
          >
            <span className="relative z-10 flex items-center gap-2">
              <Database className="w-4 h-4 shrink-0" />
              <span>Supabase SQL & Setup</span>
            </span>
          </button>
        </div>
      </div>

      {/* TAB 1: PROJECTS */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="font-serif font-black text-2xl text-deepInk dark:text-white">
                  Manage Portfolio Projects
                </h2>
                <span className="px-3 py-1 rounded-full bg-butterYellow/50 dark:bg-butterYellow/20 text-deepInk dark:text-butterYellow-light text-xs font-bold border border-butterYellow-border/70 flex items-center gap-1.5 shadow-xs">
                  <Star className="w-3.5 h-3.5 fill-deepInk dark:fill-butterYellow-light" />
                  <span>{projects.filter((p) => p.featured).length} of {projects.length} in Featured Section</span>
                </span>
              </div>
              <p className="text-xs text-bodyText-muted dark:text-lavender-light/70 font-semibold mt-1">
                Add, live edit, or toggle projects in and out of the Featured Section displayed on the Home page.
              </p>
            </div>

            <ClayButton
              variant="dark"
              size="sm"
              href="/projects/new"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add New Project
            </ClayButton>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="bg-white dark:bg-[#1E1B33] rounded-[28px] border border-lavender/50 dark:border-white/10 p-4 shadow-soft-sm flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-bg dark:bg-[#161426] mb-3">
                    <Image
                      src={proj.coverImage}
                      alt={proj.title}
                      fill
                      sizes="400px"
                      className="object-cover"
                    />
                    {proj.featured && (
                      <span className="absolute top-2 right-2 px-2.5 py-1 rounded-full bg-butterYellow text-deepInk text-[10px] font-bold uppercase flex items-center gap-1 shadow-sm">
                        <Star className="w-3 h-3 fill-deepInk" />
                        Featured
                      </span>
                    )}
                    <span className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-full bg-deepInk/85 text-white text-[10px] font-bold">
                      {proj.category}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-base text-deepInk dark:text-white line-clamp-1">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-bodyText-muted dark:text-lavender-light/70 line-clamp-2 mt-1">
                    {proj.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-lavender/30 dark:border-white/10 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-bodyText-muted dark:text-lavender-light/60">
                      {proj.year} • {proj.tools.length} Tools
                    </span>

                    {/* Feature Section Add/Remove Button */}
                    <button
                      onClick={() => handleToggleFeatured(proj)}
                      className={`btn-tactile inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-xs ${
                        proj.featured
                          ? 'bg-butterYellow text-deepInk border border-butterYellow-border hover:bg-babyPink-light hover:text-red-600'
                          : 'bg-bg dark:bg-[#161426] border border-lavender/50 dark:border-white/10 text-bodyText-muted dark:text-lavender-light hover:bg-butterYellow hover:text-deepInk hover:border-butterYellow'
                      }`}
                      title={proj.featured ? 'Click to remove from Featured section' : 'Click to add to Featured section on Home'}
                    >
                      <Star className={`w-3.5 h-3.5 ${proj.featured ? 'fill-deepInk' : ''}`} />
                      <span>{proj.featured ? 'Remove from Featured' : 'Add to Featured'}</span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <Link
                      href={`/projects/${proj.slug}`}
                      className="btn-tactile inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-deepInk dark:bg-white text-white dark:text-deepInk text-xs font-bold shadow-sm hover:scale-105 active:scale-95 transition-all"
                      title="Edit in live Behance preview mode"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Live Edit</span>
                    </Link>
                    <button
                      onClick={() => handleDeleteProject(proj.id, proj.title)}
                      className="p-2 rounded-full bg-babyPink-light dark:bg-babyPink/20 text-deepInk dark:text-babyPink-light hover:bg-babyPink transition-colors"
                      title="Delete Project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: VIDEOS */}
      {activeTab === 'videos' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif font-black text-2xl text-deepInk dark:text-white">
                Manage Motion & 3D Video Showcase
              </h2>
              <p className="text-xs text-bodyText-muted dark:text-lavender-light/70 font-semibold">
                Add YouTube or Vimeo links with titles and descriptions.
              </p>
            </div>

            <ClayButton
              variant="dark"
              size="sm"
              onClick={() => {
                setEditingVideo(null);
                setIsVideoModalOpen(true);
              }}
            >
              <Plus className="w-4 h-4 mr-1" />
              Add New Video
            </ClayButton>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((vid) => (
              <div
                key={vid.id}
                className="bg-white dark:bg-[#1E1B33] rounded-[28px] border border-lavender/50 dark:border-white/10 p-4 shadow-soft-sm flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-video rounded-2xl overflow-hidden bg-bg dark:bg-[#161426] mb-3">
                    {vid.thumbnailUrl ? (
                      <Image
                        src={vid.thumbnailUrl}
                        alt={vid.title}
                        fill
                        sizes="400px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-lavender-light text-deepInk">
                        <Film className="w-8 h-8" />
                      </div>
                    )}
                    <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-black/80 text-white text-[10px] font-mono font-bold">
                      {vid.duration || 'Video'}
                    </span>
                  </div>

                  <span className="text-[10px] font-bold uppercase text-deepInk dark:text-lavender-light block mb-1">
                    {vid.category}
                  </span>
                  <h3 className="font-serif font-bold text-base text-deepInk dark:text-white line-clamp-1">
                    {vid.title}
                  </h3>
                  {vid.description && (
                    <p className="text-xs text-bodyText-muted dark:text-lavender-light/70 line-clamp-2 mt-1">
                      {vid.description}
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-lavender/30 dark:border-white/10 flex items-center justify-between">
                  <a
                    href={vid.videoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold text-deepInk dark:text-lavender-light hover:underline flex items-center gap-1"
                  >
                    Open Link
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditingVideo(vid);
                        setIsVideoModalOpen(true);
                      }}
                      className="p-2 rounded-full bg-lavender-light dark:bg-white/10 text-deepInk dark:text-white hover:bg-deepInk hover:text-white transition-colors"
                      title="Edit Video"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteVideo(vid.id, vid.title)}
                      className="p-2 rounded-full bg-babyPink-light dark:bg-babyPink/20 text-deepInk dark:text-babyPink-light hover:bg-babyPink transition-colors"
                      title="Delete Video"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: CATEGORIES */}
      {activeTab === 'categories' && (
        <CategoryManager
          categories={profile?.categories || DEFAULT_CATEGORIES}
          projects={projects}
          videos={videos}
          onSaveCategories={handleSaveCategories}
        />
      )}

      {/* TAB 4: APPEARANCE */}
      {activeTab === 'appearance' && profile && (
        <AppearanceEditor
          profile={profile}
          onSaveProfile={handleSaveProfile}
        />
      )}

      {/* TAB 5: PROFILE, CONTACT & RESUME */}
      {activeTab === 'profile' && profile && (
        <ProfileEditor
          initialProfile={profile}
          onSave={handleSaveProfile}
        />
      )}

      {/* TAB 4: CONTACT INQUIRIES */}
      {activeTab === 'inquiries' && (
        <div className="bg-white dark:bg-[#1E1B33] rounded-[32px] md:rounded-[40px] border border-lavender/50 dark:border-white/10 p-6 sm:p-10 shadow-soft-sm">
          <h2 className="font-serif font-black text-2xl text-deepInk dark:text-white mb-2">
            Inquiries & Contact Submissions
          </h2>
          <p className="text-xs text-bodyText-muted dark:text-lavender-light/70 font-medium mb-6">
            Messages submitted by visitors through the contact section on your portfolio.
          </p>

          {inquiries.length > 0 ? (
            <div className="space-y-4">
              {inquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="p-5 rounded-2xl bg-bg dark:bg-[#161426] border border-lavender/40 dark:border-white/10 space-y-2"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-base text-deepInk dark:text-white">
                        {inq.name}
                      </span>
                      <a
                        href={`mailto:${inq.email}`}
                        className="text-xs font-semibold text-deepInk dark:text-lavender-light hover:underline"
                      >
                        ({inq.email})
                      </a>
                    </div>
                    <span className="text-[11px] font-bold text-bodyText-muted dark:text-lavender-light/60">
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {inq.subject && (
                    <p className="text-xs font-bold text-deepInk dark:text-white">
                      Subject: {inq.subject}
                    </p>
                  )}

                  <p className="text-sm text-bodyText dark:text-lavender-light/90 leading-relaxed bg-white dark:bg-[#1E1B33] p-3 rounded-xl border border-lavender/30">
                    {inq.message}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-sm text-bodyText-muted dark:text-lavender-light/70 font-medium bg-bg dark:bg-[#161426] rounded-2xl border border-lavender/40">
              No inquiries received yet. Visitors can send inquiries through the Home page contact form!
            </div>
          )}
        </div>
      )}

      {/* TAB 5: SUPABASE SETUP & SQL */}
      {activeTab === 'setup' && <SupabaseSetupHelper />}

      {/* Modals */}
      <ProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        onSave={handleSaveProject}
        initialProject={editingProject}
      />

      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        onSave={handleSaveVideo}
        initialVideo={editingVideo}
      />
    </div>
  );
}
