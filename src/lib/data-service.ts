import { getSupabaseClient, isSupabaseConfigured } from './supabase/client';
import { Project, VideoItem, ProfileSettings, ContactInquiry } from './types';
import { INITIAL_PROJECTS, INITIAL_VIDEOS, INITIAL_PROFILE } from './initial-data';

// Helper storage keys for browser fallback mode
const LOCAL_PROJECTS_KEY = 'sumit_portfolio_projects';
const LOCAL_VIDEOS_KEY = 'sumit_portfolio_videos';
const LOCAL_PROFILE_KEY = 'sumit_portfolio_profile';
const LOCAL_INQUIRIES_KEY = 'sumit_portfolio_inquiries';

export function isValidUuid(id?: string | null): boolean {
  if (!id || typeof id !== 'string') return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);
}

export function generateUuid(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function getLocalData<T>(key: string, defaultVal: T): T {
  if (typeof window === 'undefined') return defaultVal;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultVal;
  } catch {
    return defaultVal;
  }
}

function setLocalData<T>(key: string, data: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error('Failed to save to localStorage:', err);
  }
}

// Convert Supabase row to Project type
function mapDbProject(row: any): Project {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    category: row.category,
    role: row.role || 'Designer',
    client: row.client || '',
    year: row.year || '2026',
    coverImage: row.cover_image,
    description: row.description || '',
    tools: Array.isArray(row.tools) ? row.tools : (row.tools ? JSON.parse(row.tools) : []),
    galleryImages: Array.isArray(row.gallery_images) ? row.gallery_images : (row.gallery_images ? JSON.parse(row.gallery_images) : []),
    videoUrl: row.video_url || undefined,
    contentBlocks: Array.isArray(row.content_blocks) ? row.content_blocks : (row.content_blocks ? JSON.parse(row.content_blocks) : []),
    featured: Boolean(row.featured),
    orderIndex: row.order_index ?? 0,
    createdAt: row.created_at,
  };
}

// Convert Project type to Supabase row
function mapProjectToDb(proj: Partial<Project>) {
  const mapped: any = {};
  if (proj.id && isValidUuid(proj.id)) mapped.id = proj.id;
  if (proj.slug) mapped.slug = proj.slug;
  if (proj.title !== undefined) mapped.title = proj.title;
  if (proj.category !== undefined) mapped.category = proj.category;
  if (proj.role !== undefined) mapped.role = proj.role;
  if (proj.client !== undefined) mapped.client = proj.client;
  if (proj.year !== undefined) mapped.year = proj.year;
  if (proj.coverImage !== undefined) mapped.cover_image = proj.coverImage;
  if (proj.description !== undefined) mapped.description = proj.description;
  if (proj.tools !== undefined) mapped.tools = proj.tools;
  if (proj.galleryImages !== undefined) mapped.gallery_images = proj.galleryImages;
  if (proj.videoUrl !== undefined) {
    mapped.video_url = proj.videoUrl && proj.videoUrl.trim() ? proj.videoUrl.trim() : null;
  }
  if (proj.contentBlocks !== undefined) mapped.content_blocks = proj.contentBlocks;
  if (proj.featured !== undefined) mapped.featured = proj.featured;
  if (proj.orderIndex !== undefined) mapped.order_index = proj.orderIndex;
  return mapped;
}

// Convert Supabase row to VideoItem
function mapDbVideo(row: any): VideoItem {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    videoUrl: row.video_url,
    thumbnailUrl: row.thumbnail_url || undefined,
    description: row.description || undefined,
    duration: row.duration || undefined,
    orderIndex: row.order_index ?? 0,
    createdAt: row.created_at,
  };
}

function mapVideoToDb(vid: Partial<VideoItem>) {
  const mapped: any = {};
  if (vid.id && isValidUuid(vid.id)) mapped.id = vid.id;
  if (vid.title !== undefined) mapped.title = vid.title;
  if (vid.category !== undefined) mapped.category = vid.category;
  if (vid.videoUrl !== undefined) mapped.video_url = vid.videoUrl;
  if (vid.thumbnailUrl !== undefined) mapped.thumbnail_url = vid.thumbnailUrl;
  if (vid.description !== undefined) mapped.description = vid.description;
  if (vid.duration !== undefined) mapped.duration = vid.duration;
  if (vid.orderIndex !== undefined) mapped.order_index = vid.orderIndex;
  return mapped;
}

// Convert Supabase row to ProfileSettings
function mapDbProfile(row: any): ProfileSettings {
  return {
    id: row.id || 'main',
    fullName: row.full_name || INITIAL_PROFILE.fullName,
    roleTitle: row.role_title || INITIAL_PROFILE.roleTitle,
    intro: row.intro || INITIAL_PROFILE.intro,
    aboutBio: row.about_bio || INITIAL_PROFILE.aboutBio,
    email: row.email || INITIAL_PROFILE.email,
    phone: row.phone || INITIAL_PROFILE.phone,
    location: row.location || INITIAL_PROFILE.location,
    socialInstagram: row.social_instagram || INITIAL_PROFILE.socialInstagram,
    socialBehance: row.social_behance || INITIAL_PROFILE.socialBehance,
    socialLinkedin: row.social_linkedin || INITIAL_PROFILE.socialLinkedin,
    socialWhatsapp: row.social_whatsapp || INITIAL_PROFILE.socialWhatsapp,
    socialWebsite: row.social_website || INITIAL_PROFILE.socialWebsite,
    resumeUrl: row.resume_url || INITIAL_PROFILE.resumeUrl,
    themeMode: row.theme_mode || INITIAL_PROFILE.themeMode || 'system',
    updatedAt: row.updated_at,
  };
}

function mapProfileToDb(prof: Partial<ProfileSettings>): Record<string, any> {
  const mapped: Record<string, any> = {
    id: prof.id || 'main',
    full_name: prof.fullName,
    role_title: prof.roleTitle,
    intro: prof.intro,
    about_bio: prof.aboutBio,
    email: prof.email,
    phone: prof.phone,
    location: prof.location,
    social_instagram: prof.socialInstagram,
    social_behance: prof.socialBehance,
    social_linkedin: prof.socialLinkedin,
    social_whatsapp: prof.socialWhatsapp,
    social_website: prof.socialWebsite,
    resume_url: prof.resumeUrl,
    theme_mode: prof.themeMode || 'system',
    updated_at: new Date().toISOString(),
  };
  return mapped;
}

/* ---------------- PROJECTS API ---------------- */

export async function fetchProjects(): Promise<Project[]> {
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('order_index', { ascending: true });

      if (!error && data && data.length > 0) {
        return data.map(mapDbProject);
      }
    } catch (err) {
      console.warn('Supabase fetch projects error, using fallback:', err);
    }
  }

  return getLocalData<Project[]>(LOCAL_PROJECTS_KEY, INITIAL_PROJECTS);
}

export async function fetchProjectBySlug(slug: string): Promise<Project | null> {
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .single();

      if (!error && data) {
        return mapDbProject(data);
      }
    } catch (err) {
      console.warn('Supabase fetch project by slug error:', err);
    }
  }

  const list = getLocalData<Project[]>(LOCAL_PROJECTS_KEY, INITIAL_PROJECTS);
  return list.find((p) => p.slug === slug) || null;
}

export async function saveProject(project: Project): Promise<{ data: Project | null; error: string | null }> {
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const dbPayload = mapProjectToDb(project);
      let data: any = null;
      let error: any = null;

      if (dbPayload.id) {
        // Valid UUID provided -> upsert on primary key id
        const res = await supabase
          .from('projects')
          .upsert(dbPayload)
          .select()
          .single();
        data = res.data;
        error = res.error;
      } else {
        // No valid UUID -> check if slug already exists to update
        const { data: existing } = await supabase
          .from('projects')
          .select('id')
          .eq('slug', project.slug)
          .maybeSingle();

        if (existing?.id) {
          const res = await supabase
            .from('projects')
            .update(dbPayload)
            .eq('id', existing.id)
            .select()
            .single();
          data = res.data;
          error = res.error;
        } else {
          // Brand new project -> Supabase generates UUID via uuid_generate_v4()
          const res = await supabase
            .from('projects')
            .insert(dbPayload)
            .select()
            .single();
          data = res.data;
          error = res.error;
        }
      }

      if (error) {
        return { data: null, error: error.message };
      }
      return { data: mapDbProject(data), error: null };
    } catch (err: any) {
      return { data: null, error: err.message };
    }
  }

  // Fallback mode
  const currentList = getLocalData<Project[]>(LOCAL_PROJECTS_KEY, INITIAL_PROJECTS);
  const safeId = project.id || generateUuid();
  const normalizedProject: Project = { ...project, id: safeId };
  const existingIdx = currentList.findIndex(
    (p) => p.id === normalizedProject.id || p.slug === normalizedProject.slug
  );
  let updatedList: Project[];
  if (existingIdx >= 0) {
    updatedList = [...currentList];
    updatedList[existingIdx] = normalizedProject;
  } else {
    updatedList = [normalizedProject, ...currentList];
  }
  setLocalData(LOCAL_PROJECTS_KEY, updatedList);
  return { data: normalizedProject, error: null };
}

export async function deleteProject(id: string): Promise<{ success: boolean; error: string | null }> {
  const supabase = getSupabaseClient();
  if (supabase) {
    if (!isValidUuid(id)) {
      const currentList = getLocalData<Project[]>(LOCAL_PROJECTS_KEY, INITIAL_PROJECTS);
      setLocalData(LOCAL_PROJECTS_KEY, currentList.filter((p) => p.id !== id));
      return { success: true, error: null };
    }
    try {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) return { success: false, error: error.message };
      return { success: true, error: null };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  }

  const currentList = getLocalData<Project[]>(LOCAL_PROJECTS_KEY, INITIAL_PROJECTS);
  const updatedList = currentList.filter((p) => p.id !== id);
  setLocalData(LOCAL_PROJECTS_KEY, updatedList);
  return { success: true, error: null };
}

/* ---------------- VIDEOS API ---------------- */

export async function fetchVideos(): Promise<VideoItem[]> {
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .order('order_index', { ascending: true });

      if (!error && data && data.length > 0) {
        return data.map(mapDbVideo);
      }
    } catch (err) {
      console.warn('Supabase fetch videos error, using fallback:', err);
    }
  }

  return getLocalData<VideoItem[]>(LOCAL_VIDEOS_KEY, INITIAL_VIDEOS);
}

export async function saveVideo(video: VideoItem): Promise<{ data: VideoItem | null; error: string | null }> {
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const dbPayload = mapVideoToDb(video);
      let data: any = null;
      let error: any = null;

      if (dbPayload.id) {
        const res = await supabase
          .from('videos')
          .upsert(dbPayload)
          .select()
          .single();
        data = res.data;
        error = res.error;
      } else {
        const res = await supabase
          .from('videos')
          .insert(dbPayload)
          .select()
          .single();
        data = res.data;
        error = res.error;
      }

      if (error) {
        return { data: null, error: error.message };
      }
      return { data: mapDbVideo(data), error: null };
    } catch (err: any) {
      return { data: null, error: err.message };
    }
  }

  const currentList = getLocalData<VideoItem[]>(LOCAL_VIDEOS_KEY, INITIAL_VIDEOS);
  const safeId = video.id || generateUuid();
  const normalizedVideo: VideoItem = { ...video, id: safeId };
  const existingIdx = currentList.findIndex((v) => v.id === normalizedVideo.id);
  let updatedList: VideoItem[];
  if (existingIdx >= 0) {
    updatedList = [...currentList];
    updatedList[existingIdx] = normalizedVideo;
  } else {
    updatedList = [normalizedVideo, ...currentList];
  }
  setLocalData(LOCAL_VIDEOS_KEY, updatedList);
  return { data: normalizedVideo, error: null };
}

export async function deleteVideo(id: string): Promise<{ success: boolean; error: string | null }> {
  const supabase = getSupabaseClient();
  if (supabase) {
    if (!isValidUuid(id)) {
      const currentList = getLocalData<VideoItem[]>(LOCAL_VIDEOS_KEY, INITIAL_VIDEOS);
      setLocalData(LOCAL_VIDEOS_KEY, currentList.filter((v) => v.id !== id));
      return { success: true, error: null };
    }
    try {
      const { error } = await supabase.from('videos').delete().eq('id', id);
      if (error) return { success: false, error: error.message };
      return { success: true, error: null };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  }

  const currentList = getLocalData<VideoItem[]>(LOCAL_VIDEOS_KEY, INITIAL_VIDEOS);
  const updatedList = currentList.filter((v) => v.id !== id);
  setLocalData(LOCAL_VIDEOS_KEY, updatedList);
  return { success: true, error: null };
}

/* ---------------- PROFILE & CONTACT API ---------------- */

export async function fetchProfileSettings(): Promise<ProfileSettings> {
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('profile_settings')
        .select('*')
        .eq('id', 'main')
        .single();

      if (!error && data) {
        return mapDbProfile(data);
      }
    } catch (err) {
      console.warn('Supabase fetch profile error, using fallback:', err);
    }
  }

  return getLocalData<ProfileSettings>(LOCAL_PROFILE_KEY, INITIAL_PROFILE);
}

export async function saveProfileSettings(
  profile: ProfileSettings
): Promise<{ data: ProfileSettings | null; error: string | null }> {
  // Always update local cache and storage
  setLocalData(LOCAL_PROFILE_KEY, profile);

  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const dbPayload = mapProfileToDb(profile);
      let { data, error } = await supabase
        .from('profile_settings')
        .upsert(dbPayload)
        .select()
        .single();

      // Graceful fallback if theme_mode column is not yet in Supabase SQL schema
      if (error && error.message?.includes('theme_mode')) {
        delete dbPayload.theme_mode;
        const retry = await supabase
          .from('profile_settings')
          .upsert(dbPayload)
          .select()
          .single();
        data = retry.data;
        error = retry.error;
      }

      if (error) {
        return { data: null, error: error.message };
      }
      return { data: mapDbProfile(data), error: null };
    } catch (err: any) {
      return { data: null, error: err.message };
    }
  }

  return { data: profile, error: null };
}

/* ---------------- CONTACT INQUIRIES API ---------------- */

export async function submitContactInquiry(inquiry: Omit<ContactInquiry, 'id' | 'createdAt'>): Promise<{ success: boolean; error: string | null }> {
  const newInquiry: ContactInquiry = {
    ...inquiry,
    id: `inq-${Date.now()}`,
    createdAt: new Date().toISOString(),
    read: false,
  };

  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const { error } = await supabase.from('contact_inquiries').insert([
        {
          id: newInquiry.id,
          name: newInquiry.name,
          email: newInquiry.email,
          subject: newInquiry.subject || 'Portfolio Inquiry',
          message: newInquiry.message,
          status: 'new',
        },
      ]);
      if (error) {
        console.warn('Supabase inquiry insert error:', error);
      } else {
        return { success: true, error: null };
      }
    } catch (err: any) {
      console.warn('Supabase inquiry exception:', err);
    }
  }

  // Local storage backup
  const list = getLocalData<ContactInquiry[]>(LOCAL_INQUIRIES_KEY, []);
  setLocalData(LOCAL_INQUIRIES_KEY, [newInquiry, ...list]);
  return { success: true, error: null };
}

export async function fetchContactInquiries(): Promise<ContactInquiry[]> {
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('contact_inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        return data.map((d: any) => ({
          id: d.id,
          name: d.name,
          email: d.email,
          subject: d.subject,
          message: d.message,
          createdAt: d.created_at,
          read: d.status === 'read',
        }));
      }
    } catch (err) {
      console.warn('Supabase fetch inquiries error:', err);
    }
  }

  return getLocalData<ContactInquiry[]>(LOCAL_INQUIRIES_KEY, []);
}
