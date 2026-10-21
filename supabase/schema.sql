-- ==============================================================================
-- SUMIT KUMAR PORTFOLIO - SUPABASE DATABASE & STORAGE SCHEMA
-- ==============================================================================
-- Run this script in the Supabase SQL Editor (Dashboard -> SQL Editor -> New Query)

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  role TEXT,
  client TEXT,
  year TEXT,
  cover_image TEXT NOT NULL,
  description TEXT,
  tools JSONB DEFAULT '[]'::jsonb,
  gallery_images JSONB DEFAULT '[]'::jsonb,
  video_url TEXT,
  content_blocks JSONB DEFAULT '[]'::jsonb,
  featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. VIDEOS TABLE
CREATE TABLE IF NOT EXISTS public.videos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  description TEXT,
  duration TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. PROFILE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.profile_settings (
  id TEXT PRIMARY KEY DEFAULT 'main',
  full_name TEXT NOT NULL,
  role_title TEXT NOT NULL,
  intro TEXT NOT NULL,
  about_bio TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  location TEXT,
  social_instagram TEXT,
  social_behance TEXT,
  social_linkedin TEXT,
  social_whatsapp TEXT,
  social_website TEXT,
  resume_url TEXT,
  theme_mode TEXT DEFAULT 'system',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ensure theme_mode, categories, and theme_config columns exist on existing installations
ALTER TABLE public.profile_settings ADD COLUMN IF NOT EXISTS theme_mode TEXT DEFAULT 'system';
ALTER TABLE public.profile_settings ADD COLUMN IF NOT EXISTS categories JSONB DEFAULT '["3D Design", "Motion Graphics", "Packaging", "Branding", "AI Video"]'::jsonb;
ALTER TABLE public.profile_settings ADD COLUMN IF NOT EXISTS theme_config JSONB DEFAULT '{}'::jsonb;

-- 5. CONTACT INQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.contact_inquiries (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any to avoid duplicates
DROP POLICY IF EXISTS "Public can view projects" ON public.projects;
DROP POLICY IF EXISTS "Authenticated admin can manage projects" ON public.projects;

DROP POLICY IF EXISTS "Public can view videos" ON public.videos;
DROP POLICY IF EXISTS "Authenticated admin can manage videos" ON public.videos;

DROP POLICY IF EXISTS "Public can view profile settings" ON public.profile_settings;
DROP POLICY IF EXISTS "Authenticated admin can manage profile settings" ON public.profile_settings;

DROP POLICY IF EXISTS "Public can submit contact inquiries" ON public.contact_inquiries;
DROP POLICY IF EXISTS "Authenticated admin can view inquiries" ON public.contact_inquiries;
DROP POLICY IF EXISTS "Authenticated admin can manage inquiries" ON public.contact_inquiries;

-- PROJECTS POLICIES
-- Anyone can view projects on the public portfolio
CREATE POLICY "Public can view projects"
  ON public.projects FOR SELECT
  USING (true);

-- Only logged-in Admin can insert, update, or delete projects
CREATE POLICY "Authenticated admin can manage projects"
  ON public.projects FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- VIDEOS POLICIES
-- Anyone can view videos on the public portfolio
CREATE POLICY "Public can view videos"
  ON public.videos FOR SELECT
  USING (true);

-- Only logged-in Admin can insert, update, or delete videos
CREATE POLICY "Authenticated admin can manage videos"
  ON public.videos FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- PROFILE SETTINGS POLICIES
-- Anyone can view profile settings
CREATE POLICY "Public can view profile settings"
  ON public.profile_settings FOR SELECT
  USING (true);

-- Only logged-in Admin can edit profile settings
CREATE POLICY "Authenticated admin can manage profile settings"
  ON public.profile_settings FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- CONTACT INQUIRIES POLICIES
-- Visitors can submit inquiry forms
CREATE POLICY "Public can submit contact inquiries"
  ON public.contact_inquiries FOR INSERT
  WITH CHECK (true);

-- Only logged-in Admin can read or manage contact inquiries
CREATE POLICY "Authenticated admin can manage inquiries"
  ON public.contact_inquiries FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ==============================================================================
-- STORAGE BUCKETS SETUP
-- ==============================================================================

-- Create 'portfolio-assets' bucket for project images & uploads
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-assets', 'portfolio-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Create 'resumes' bucket for uploaded resume PDFs
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies for portfolio-assets
DROP POLICY IF EXISTS "Public Access to portfolio-assets" ON storage.objects;
CREATE POLICY "Public Access to portfolio-assets"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'portfolio-assets');

DROP POLICY IF EXISTS "Authenticated Admin upload to portfolio-assets" ON storage.objects;
CREATE POLICY "Authenticated Admin upload to portfolio-assets"
  ON storage.objects FOR ALL
  TO authenticated
  USING (bucket_id = 'portfolio-assets')
  WITH CHECK (bucket_id = 'portfolio-assets');

-- Storage Policies for resumes
DROP POLICY IF EXISTS "Public Access to resumes" ON storage.objects;
CREATE POLICY "Public Access to resumes"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'resumes');

DROP POLICY IF EXISTS "Authenticated Admin upload to resumes" ON storage.objects;
CREATE POLICY "Authenticated Admin upload to resumes"
  ON storage.objects FOR ALL
  TO authenticated
  USING (bucket_id = 'resumes')
  WITH CHECK (bucket_id = 'resumes');

-- ==============================================================================
-- INITIAL SEED DATA FOR SUMIT KUMAR
-- ==============================================================================

INSERT INTO public.profile_settings (
  id,
  full_name,
  role_title,
  intro,
  about_bio,
  email,
  phone,
  location,
  social_instagram,
  social_behance,
  social_linkedin,
  social_whatsapp,
  social_website,
  resume_url
) VALUES (
  'main',
  'Sumit Kumar',
  'Graphic Designer & Motion / 3D Specialist',
  'Graphic designer specializing in branding, layout, and digital design, skilled in Adobe Creative Suite, Figma, Affinity, and Blender. Experienced in building AI-assisted creative production pipelines, including AI video generation, prompt engineering, and 3D visualization workflows.',
  'Focused on creating cohesive visual systems across print, digital, and video that bridge identity design with visual depth for consistent, engaging brand experiences. I merge traditional design craft with next-generation 3D and AI tools to produce playful, tactile, and commercially impactful creative work.',
  'sumitkdesigns@gmail.com',
  '+91 9891997885',
  'Gurugram & Delhi, India',
  'https://instagram.com/sumitkdesigns',
  'https://behance.net/sumitdesigns',
  'https://linkedin.com/in/sumitk02',
  'https://wa.me/919891997885',
  'https://sumitk.in',
  '/resume-sumit-kumar.pdf'
) ON CONFLICT (id) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  role_title = EXCLUDED.role_title,
  intro = EXCLUDED.intro,
  about_bio = EXCLUDED.about_bio,
  email = EXCLUDED.email,
  phone = EXCLUDED.phone,
  location = EXCLUDED.location;

-- Seed Projects
INSERT INTO public.projects (
  slug, title, category, role, client, year, cover_image, description, tools, gallery_images, video_url, featured, order_index
) VALUES
(
  'crunchy-piper-packaging-design',
  'Crunchy Piper - Soft Drink Packaging & 3D Brand System',
  'Packaging',
  'Lead Packaging & 3D Designer',
  'Personal Project',
  '2026',
  'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&w=1200&q=80',
  'Designed custom product packaging and labels for Crunchy Piper, exploring dieline structures, playful colorways, and shelf-impact typography. Built a full 3D brand system and packaging mockups in Blender.',
  '["Blender", "Adobe Illustrator", "Adobe Photoshop", "Figma"]'::jsonb,
  '["https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1556767576-5ec41e3239ea?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=1200&q=80"]'::jsonb,
  NULL,
  true,
  1
),
(
  'shop4smile-dental-3d-visuals',
  'Shop4Smile - 3D Dental Equipment & E-Commerce Visual Systems',
  '3D Design',
  'Graphic & 3D Designer',
  'ABA Technologies',
  '2026',
  'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80',
  'Created consistent brand alignment and high-precision visual systems across premium dental brands (MDK Handpieces, LiteTouch, Medency, Salvo, TurboRock). Engineered 3D product visualizations in Blender and Tripo3D alongside fortnightly e-commerce web banners.',
  '["Blender", "Tripo3D", "Adobe Photoshop", "Illustrator", "After Effects"]'::jsonb,
  '["https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80"]'::jsonb,
  NULL,
  true,
  2
),
(
  'ai-motion-reels-kling-veo',
  'Kinetic AI Video Production & Product Motion Reels',
  'Motion Graphics',
  'Motion Designer & AI Workflow Engineer',
  'ABA Technologies / Shop4Smile',
  '2026',
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
  'Pioneered an AI-assisted creative production pipeline combining Veo, Kling 2.0, After Effects, and Premiere Pro. Produced dynamic product reels and micro-animations with snappy pacing and visual polish.',
  '["After Effects", "Premiere Pro", "Veo", "Kling 2.0", "Tripo3D"]'::jsonb,
  '["https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1200&q=80"]'::jsonb,
  NULL,
  true,
  3
)
ON CONFLICT (slug) DO NOTHING;

-- Seed Videos
INSERT INTO public.videos (
  title, category, video_url, thumbnail_url, description, duration, order_index
) VALUES
(
  '3D Motion Showreel 2026 - Kinetic Rhythms & Playful Visuals',
  'Motion Graphics',
  'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80',
  'A dynamic compilation of 3D animations, logo reveals, kinetic typography, and claymorphic renders produced across Blender and After Effects.',
  '01:15',
  1
),
(
  'Shop4Smile Dental Precision Product Reel',
  '3D Animation',
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1000&q=80',
  'High-impact e-commerce product reel showcasing 3D dental handpieces with smooth rotations and exploded-view callouts.',
  '00:45',
  2
),
(
  'AI-Generated Product Teaser with Kling 2.0 & Veo',
  'AI Video',
  'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
  'Cutting-edge generative video reel demonstrating AI video generation stitched together with After Effects sound design and motion tracking.',
  '00:30',
  3
)
ON CONFLICT DO NOTHING;
