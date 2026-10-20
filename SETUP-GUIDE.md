# Step-by-Step Setup & Deployment Guide
## Sumit Kumar — Motion Graphics & 3D Designer Portfolio

This guide explains how to configure **Supabase**, set up **Row Level Security (RLS)**, configure **Storage Buckets**, deploy the site to **Vercel** via **GitHub**, and manage the portfolio through the **Admin Portal**.

---

## Architecture Overview

- **Framework**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Design Aesthetic**: Cute & playful teal palette (`#14B8A6`, `#0F4C4A`, `#CCFBF1`, `#FFF8F0`, `#FF8A7A`, `#FFE69A`) with 3D claymorphic UI elements and micro-animations
- **Database & Auth**: Supabase PostgreSQL + Supabase Auth
- **File Storage**: Supabase Storage (`portfolio-assets` for project visuals, `resumes` for PDF CV files)
- **Deployment**: Vercel Free Plan with automated CI/CD from GitHub

---

## Step 1: Create Your Supabase Project

1. Visit [supabase.com](https://supabase.com) and sign in (or create a free account).
2. Click **New project**.
3. Fill in:
   - **Name**: `sumit-portfolio`
   - **Database Password**: Choose a strong password and save it securely.
   - **Region**: Choose a region closest to your audience (e.g., *South Asia (Mumbai)* or *Southeast Asia (Singapore)*).
   - **Pricing Plan**: Free Plan.
4. Click **Create new project** and wait 1-2 minutes for the database to provision.

---

## Step 2: Run Database Schema & Setup Row Level Security (RLS)

1. In your Supabase Dashboard, click on **SQL Editor** from the left navigation.
2. Click **New query**.
3. Copy the entire contents of [`supabase/schema.sql`](file:///c:/Users/owlis/.gemini/antigravity/scratch/portfolio/supabase/schema.sql) from this project and paste it into the SQL Editor.
4. Click the green **Run** button.

### What this script sets up:
- **`projects` table**: Stores case studies, tools, Behance-style content blocks, video URLs, and order.
- **`videos` table**: Stores motion graphics showreels and YouTube/Vimeo embeds.
- **`profile_settings` table**: Stores name, role, intro, about narrative, contact details, social links, and active resume URL.
- **`contact_inquiries` table**: Receives visitor inquiries submitted from the website.
- **Row Level Security (RLS)**:
  - Public can `SELECT` projects, videos, and profile settings.
  - Public can `INSERT` contact inquiries.
  - Only authenticated admin accounts (`auth.role() = 'authenticated'`) can `INSERT`, `UPDATE`, or `DELETE` records.
- **Storage Buckets**:
  - `portfolio-assets`: Public read access; authenticated upload/management for project images.
  - `resumes`: Public read access; authenticated upload/management for PDF resume files.
- **Pre-seeded data**: Sumit Kumar's real details from the resume!

---

## Step 3: Create the Admin User in Supabase Auth

1. In your Supabase Dashboard, click on **Authentication** > **Users**.
2. Click **Add user** > **Create user**.
3. Enter:
   - **User Email**: `sumitkdesigns@gmail.com`
   - **Password**: Choose a secure admin password (e.g., `SumitDesign2026!`).
   - Check **Auto Confirm User?** so no email confirmation is required.
4. Click **Create user**.
5. You can now use this email and password to log in at `/admin/login`.

---

## Step 4: Verify Supabase Storage Buckets

The SQL script creates the buckets automatically. To double check:
1. Go to **Storage** in the Supabase Dashboard.
2. Confirm two buckets exist:
   - `portfolio-assets` (Public)
   - `resumes` (Public)
3. If they are not visible:
   - Click **New bucket**.
   - Create `portfolio-assets` and toggle **Public bucket** ON.
   - Create `resumes` and toggle **Public bucket** ON.

---

## Step 5: Get Supabase API Keys

1. In your Supabase Dashboard, go to **Project Settings** (gear icon) > **API**.
2. Copy the following two values:
   - **Project URL** (e.g. `https://xyzcompany.supabase.co`)
   - **anon public key** (`eyJhbGci...`)

---

## Step 6: Push Project to GitHub

1. Initialize git and commit:
   ```bash
   git add .
   git commit -m "Initial commit - Sumit Kumar 3D Motion Portfolio"
   ```
2. Create a new repository on [github.com](https://github.com) (e.g. `sumit-kumar-portfolio`).
3. Link and push:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/sumit-kumar-portfolio.git
   git branch -M main
   git push -u origin main
   ```

---

## Step 7: Deploy on Vercel

1. Log in to [vercel.com](https://vercel.com).
2. Click **Add New...** > **Project**.
3. Select your `sumit-kumar-portfolio` repository from GitHub and click **Import**.
4. In the **Environment Variables** section, add the following:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon public key
   - `ADMIN_EMAIL`: `sumitkdesigns@gmail.com`
5. Click **Deploy**.
6. Vercel will build and launch your site in ~45 seconds on a free `.vercel.app` domain (or custom domain).

---

## Step 8: Using the Admin Panel

1. Go to `https://your-domain.vercel.app/admin/login` (or click the lock icon in the top navigation).
2. Log in with `sumitkdesigns@gmail.com` and your admin password.
3. Features:
   - **Projects**: Add new projects, upload high-res cover and gallery images directly to Supabase Storage, embed YouTube/Vimeo case studies, and reorder.
   - **Videos**: Add unlimited motion graphics reels with YouTube/Vimeo URLs and custom thumbnails.
   - **Profile & Resume**: Edit your bio, contact info, and upload a new resume PDF to replace the live CV.
   - **Instant Updates**: Because data is fetched dynamically, changes go live immediately without redeploying Vercel!

---

## Information Missing from the Resume & Easy-to-Edit Placeholders

The following details were not present in the original resume PDF and have been populated with clean, easy-to-edit placeholders in the admin panel:

1. **Instagram Handle**: Resume listed Behance, LinkedIn, and email, but not Instagram. Defaulted to `https://instagram.com/sumitkdesigns`. Can be edited anytime under *Admin > Profile*.
2. **Project Video Links**: Resume referenced AI video production with Veo & Kling 2.0 and Blender mockups, but had no live video URLs. Included sample motion reel embeds that can be replaced in *Admin > Projects* and *Admin > Videos*.
3. **High-Res Client Images**: Portfolio case studies have been pre-seeded with beautiful royalty-free Unsplash 3D visuals; replace them with your actual render exports in *Admin > Projects*.
