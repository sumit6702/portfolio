# Sumit Kumar — Motion Graphics & 3D Designer Portfolio

> Cute & playful 3D-styled personal portfolio website for **Sumit Kumar**, Graphic Designer specializing in **Motion Graphics**, **3D Design**, and **AI-Assisted Video Production**.

Built with **Next.js (App Router)**, **Tailwind CSS**, and **Supabase (PostgreSQL, Auth, and Storage)** for zero-cost deployment on **Vercel** and **Supabase Free Tiers**.

---

## 🎨 Design Theme & Aesthetic

- **Theme**: Cute, playful claymorphism with soft rounded shapes, tactile 3D buttons, glossy bevels, floating geometry, and gentle drop shadows.
- **Teal Color Palette**:
  - **Primary Teal**: `#14B8A6` (buttons, interactive highlights, brand badge)
  - **Deep Teal**: `#0F4C4A` (headings, body typography, contrast elements)
  - **Mint**: `#CCFBF1` (cards, badges, soft background panels)
  - **Cream**: `#FFF8F0` (main canvas background)
  - **Coral Peach**: `#FF8A7A` (accent pops, notifications, hover states)
  - **Butter Yellow**: `#FFE69A` (stickers, decorative pills, highlights)
- **Typography**: Modern rounded sans-serif font system (`Outfit` & `Fredoka`).
- **Responsive**: 100% mobile, tablet, and widescreen optimized.

---

## 🚀 Key Features & Pages

### 1. Home Page (`/`)
- **Hero Section**:
  - Real name: **Sumit Kumar**
  - Role: **Graphic Designer • Motion Graphics & 3D Specialist**
  - Profile intro: Real overview of Adobe Creative Suite, Figma, Blender, and AI video pipelines (Veo, Kling 2.0).
  - Prominent 3D **"Download Resume"** button.
  - Tactile 3D social buttons for **Instagram**, **Behance**, **LinkedIn**, **WhatsApp**, and **Email**.
  - Interactive 3D preview card leading to video showreels.
- **Stats Highlights**: Quick breakdown of tools mastered, e-commerce brand campaigns, and 3D pipelines.
- **Featured Projects**: Curated card grid with playful hover lift, tags, and links to in-depth case studies.
- **Motion & 3D Teaser**: Direct gateway into the video showcase theater.
- **About Section**:
  - Detailed narrative philosophy.
  - Professional experience timeline: **ABA Technologies (Shop4Smile)** and **Zabaan School for Languages**.
  - Interactive tools & software grid (Blender, After Effects, Premiere Pro, Photoshop, Illustrator, InDesign, Figma, Canva, Affinity, Tripo3D, Veo, Kling 2.0).
  - Academic background (**B.Com, SOL Delhi University**) and professional certifications (**Udemy**).
- **Contact Section**:
  - Direct email with 1-click clipboard copy (`sumitkdesigns@gmail.com`).
  - Instant WhatsApp chat button (`+91 9891997885`).
  - Interactive inquiry message form saving directly to Supabase with instant confirmation.

### 2. Projects Listing & Case Study Pages (`/projects` & `/projects/[slug]`)
- **Filterable Grid**: Filter projects by *All*, *3D Design*, *Motion Graphics*, *Packaging*, *Branding*, and *AI Video*, with real-time keyword search.
- **Behance-Style Case Study Detail Page**:
  - Full-width hero cover.
  - Project meta header (Role, Client, Year, Software badges).
  - Vertical stack of visual blocks: high-res renders, packaging dielines, process commentary, pull quotes, two-column layouts, and responsive video embeds.
  - Previous / Next project navigation cards.
  - Related projects row.

### 3. Motion Graphics & Video Showcase (`/videos`)
- Single dedicated theater page displaying all commercial reels and 3D animations.
- Filterable by video category (*Motion Graphics*, *3D Animation*, *AI Video*, *3D Simulation*).
- Click-to-play responsive **Lightbox Modal Player** supporting YouTube and Vimeo embeds.

### 4. Admin Portal (`/admin`)
- **Password-Protected Authentication** (`/admin/login`): Integrated with Supabase Auth with Row Level Security (and fallback demo sandbox).
- **Projects Management**: Add, edit, delete, and reorder projects. Supports uploading high-res covers and galleries directly to Supabase Storage, embedding YouTube/Vimeo links, and editing custom Behance-style story blocks.
- **Videos Management**: Add, edit, delete video showreel links with custom titles, categories, durations, and auto-generated YouTube thumbnails.
- **Profile & Resume Management**: Edit contact info, phone, email, location, social links, and upload/replace the resume PDF directly in Supabase Storage (`resumes` bucket).
- **Inquiries Manager**: View all messages submitted by portfolio visitors.
- **Supabase Setup Hub**: Interactive checklist and 1-click SQL copy for easy database initialization.
- **Live Updates**: Data changes reflect immediately without redeploying Vercel!

---

## 🛠️ Technical Stack

- **Next.js 14** (App Router, Server & Client Components)
- **TypeScript** for strict type safety
- **Tailwind CSS** with custom 3D shadows and claymorphism utilities
- **Supabase**:
  - PostgreSQL database with Row Level Security (RLS)
  - Supabase Auth for admin protection
  - Supabase Storage buckets: `portfolio-assets` and `resumes`
- **Lucide React** for clean, responsive iconography
- **Vercel** deployment with continuous integration from GitHub

---

## ⚙️ Quick Start (Local Development)

1. Clone or download the repository:
   ```bash
   cd portfolio
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy environment variables:
   ```bash
   cp .env.example .env.local
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📖 Supabase & Vercel Setup Guide

Refer to [**`SETUP-GUIDE.md`**](file:///c:/Users/owlis/.gemini/antigravity/scratch/portfolio/SETUP-GUIDE.md) for full step-by-step instructions on:
1. Executing `supabase/schema.sql` in the Supabase SQL Editor.
2. Creating the admin user in Supabase Auth.
3. Setting up storage buckets and RLS policies.
4. Adding environment variables on Vercel.
5. Deploying through GitHub.
