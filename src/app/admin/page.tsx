'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  LayoutDashboard,
  FolderKanban,
  Film,
  UserCheck,
  Mail,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  LogOut,
  Sparkles,
  Database,
  Star,
  CheckCircle2,
  Search,
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
import ProjectModal from '@/components/admin/ProjectModal';
import VideoModal from '@/components/admin/VideoModal';
import ProfileEditor from '@/components/admin/ProfileEditor';
import SupabaseSetupHelper from '@/components/admin/SupabaseSetupHelper';
import ClayButton from '@/components/3d/ClayButton';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [activeTab, setActiveTab] = useState<'projects' | 'videos' | 'profile' | 'inquiries' | 'setup'>('projects');

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
      showNotification('Project saved successfully!');
      const updated = await fetchProjects();
      setProjects(updated);
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

  // Profile Save
  const handleSaveProfile = async (newProf: ProfileSettings) => {
    const res = await saveProfileSettings(newProf);
    if (!res.error && res.data) {
      setProfile(res.data);
      showNotification('Profile updated successfully!');
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Header Bar */}
      <div className="bg-white rounded-3xl md:rounded-4xl border-2 border-mint p-6 shadow-[0_8px_0_#99F6E4] mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center font-display font-black text-2xl shadow-[0_4px_0_#0D9488]">
            S
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display font-black text-2xl text-deepTeal">
                Portfolio Studio Admin
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-mint text-deepTeal text-[11px] font-extrabold uppercase">
                {currentUser.isSupabaseAuth ? 'Supabase Live' : 'Local Sandbox'}
              </span>
            </div>
            <p className="text-xs font-semibold text-deepTeal-muted">
              Logged in as <span className="font-bold text-deepTeal">{currentUser.email}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-cream border border-mint text-deepTeal text-xs font-bold hover:bg-mint transition-colors shadow-sm"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            View Live Site
          </Link>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold hover:bg-rose-100 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Instant Success Notification Toast */}
      {actionSuccess && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-deepTeal text-white text-xs font-bold shadow-xl border-2 border-primary flex items-center gap-2 animate-bounce-subtle">
          <CheckCircle2 className="w-4 h-4 text-primary" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-8 bg-white/80 backdrop-blur-md p-2 rounded-3xl border-2 border-mint shadow-[0_4px_0_#99F6E4]">
        <button
          onClick={() => setActiveTab('projects')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all ${
            activeTab === 'projects'
              ? 'bg-primary text-white shadow-[0_3px_0_#0D9488]'
              : 'text-deepTeal hover:bg-mint'
          }`}
        >
          <FolderKanban className="w-4 h-4" />
          Projects ({projects.length})
        </button>

        <button
          onClick={() => setActiveTab('videos')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all ${
            activeTab === 'videos'
              ? 'bg-primary text-white shadow-[0_3px_0_#0D9488]'
              : 'text-deepTeal hover:bg-mint'
          }`}
        >
          <Film className="w-4 h-4" />
          Videos ({videos.length})
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all ${
            activeTab === 'profile'
              ? 'bg-primary text-white shadow-[0_3px_0_#0D9488]'
              : 'text-deepTeal hover:bg-mint'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          Profile, Contact & Resume
        </button>

        <button
          onClick={() => setActiveTab('inquiries')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all ${
            activeTab === 'inquiries'
              ? 'bg-primary text-white shadow-[0_3px_0_#0D9488]'
              : 'text-deepTeal hover:bg-mint'
          }`}
        >
          <Mail className="w-4 h-4" />
          Messages ({inquiries.length})
        </button>

        <button
          onClick={() => setActiveTab('setup')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all ${
            activeTab === 'setup'
              ? 'bg-primary text-white shadow-[0_3px_0_#0D9488]'
              : 'text-deepTeal hover:bg-mint'
          }`}
        >
          <Database className="w-4 h-4" />
          Supabase SQL & Setup
        </button>
      </div>

      {/* TAB 1: PROJECTS */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-display font-extrabold text-2xl text-deepTeal">
                Manage Portfolio Projects
              </h2>
              <p className="text-xs text-deepTeal-muted font-semibold">
                Add, edit, or delete case studies shown across the website.
              </p>
            </div>

            <ClayButton
              variant="teal"
              size="sm"
              onClick={() => {
                setEditingProject(null);
                setIsProjectModalOpen(true);
              }}
            >
              <Plus className="w-4 h-4 mr-1" />
              Add New Project
            </ClayButton>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="bg-white rounded-3xl border-2 border-mint p-4 shadow-[0_6px_0_#99F6E4] flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-cream mb-3">
                    <Image
                      src={proj.coverImage}
                      alt={proj.title}
                      fill
                      sizes="400px"
                      className="object-cover"
                    />
                    {proj.featured && (
                      <span className="absolute top-2 right-2 px-2.5 py-1 rounded-full bg-butterYellow text-deepTeal text-[10px] font-black uppercase flex items-center gap-1 shadow-sm">
                        <Star className="w-3 h-3 fill-deepTeal" />
                        Featured
                      </span>
                    )}
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-deepTeal/85 text-white text-[10px] font-bold">
                      {proj.category}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-base text-deepTeal line-clamp-1">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-deepTeal-muted line-clamp-2 mt-1">
                    {proj.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-mint flex items-center justify-between">
                  <span className="text-[11px] font-bold text-deepTeal-muted">
                    {proj.year} • {proj.tools.length} Tools
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditingProject(proj);
                        setIsProjectModalOpen(true);
                      }}
                      className="p-2 rounded-xl bg-mint text-deepTeal hover:bg-primary hover:text-white transition-colors"
                      title="Edit Project"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteProject(proj.id, proj.title)}
                      className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
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
              <h2 className="font-display font-extrabold text-2xl text-deepTeal">
                Manage Motion & 3D Video Showcase
              </h2>
              <p className="text-xs text-deepTeal-muted font-semibold">
                Add YouTube or Vimeo links with titles and descriptions.
              </p>
            </div>

            <ClayButton
              variant="teal"
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
                className="bg-white rounded-3xl border-2 border-mint p-4 shadow-[0_6px_0_#99F6E4] flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-video rounded-2xl overflow-hidden bg-cream mb-3">
                    {vid.thumbnailUrl ? (
                      <Image
                        src={vid.thumbnailUrl}
                        alt={vid.title}
                        fill
                        sizes="400px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-deepTeal text-white">
                        <Film className="w-8 h-8" />
                      </div>
                    )}
                    <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/80 text-white text-[10px] font-mono font-bold">
                      {vid.duration || 'Video'}
                    </span>
                  </div>

                  <span className="text-[10px] font-bold uppercase text-primary block mb-1">
                    {vid.category}
                  </span>
                  <h3 className="font-display font-bold text-base text-deepTeal line-clamp-1">
                    {vid.title}
                  </h3>
                  {vid.description && (
                    <p className="text-xs text-deepTeal-muted line-clamp-2 mt-1">
                      {vid.description}
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-mint flex items-center justify-between">
                  <a
                    href={vid.videoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
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
                      className="p-2 rounded-xl bg-mint text-deepTeal hover:bg-primary hover:text-white transition-colors"
                      title="Edit Video"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteVideo(vid.id, vid.title)}
                      className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
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

      {/* TAB 3: PROFILE, CONTACT & RESUME */}
      {activeTab === 'profile' && profile && (
        <ProfileEditor
          initialProfile={profile}
          onSave={handleSaveProfile}
        />
      )}

      {/* TAB 4: CONTACT INQUIRIES */}
      {activeTab === 'inquiries' && (
        <div className="bg-white rounded-3xl md:rounded-4xl border-2 border-mint p-6 sm:p-10 shadow-[0_8px_0_#99F6E4]">
          <h2 className="font-display font-black text-2xl text-deepTeal mb-2">
            Inquiries & Contact Submissions
          </h2>
          <p className="text-xs text-deepTeal-muted font-medium mb-6">
            Messages submitted by visitors through the contact section on your portfolio.
          </p>

          {inquiries.length > 0 ? (
            <div className="space-y-4">
              {inquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="p-5 rounded-2xl bg-cream border border-mint space-y-2"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <span className="font-display font-bold text-base text-deepTeal">
                        {inq.name}
                      </span>
                      <a
                        href={`mailto:${inq.email}`}
                        className="text-xs font-semibold text-primary hover:underline"
                      >
                        ({inq.email})
                      </a>
                    </div>
                    <span className="text-[11px] font-bold text-deepTeal-muted">
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {inq.subject && (
                    <p className="text-xs font-bold text-deepTeal">
                      Subject: {inq.subject}
                    </p>
                  )}

                  <p className="text-sm text-deepTeal/85 leading-relaxed bg-white p-3 rounded-xl border border-mint/60">
                    {inq.message}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-sm text-deepTeal-muted font-medium bg-cream rounded-2xl border border-mint">
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
