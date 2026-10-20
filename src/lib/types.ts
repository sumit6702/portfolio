export type ThemeMode = 'light' | 'dark' | 'system';

export type ProjectCategory =
  | 'All'
  | '3D Design'
  | 'Motion Graphics'
  | 'Branding'
  | 'Packaging'
  | 'AI Video';

export interface CaseStudyBlock {
  id: string;
  type: 'image' | 'video' | 'text' | 'quote' | 'two-column';
  title?: string;
  subtitle?: string;
  content?: string;
  mediaUrl?: string;
  mediaCaption?: string;
  secondaryMediaUrl?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  role: string;
  client: string;
  year: string;
  coverImage: string;
  description: string;
  tools: string[];
  galleryImages: string[];
  videoUrl?: string;
  contentBlocks: CaseStudyBlock[];
  featured: boolean;
  orderIndex: number;
  createdAt?: string;
}

export interface VideoItem {
  id: string;
  title: string;
  category: string;
  videoUrl: string;
  thumbnailUrl?: string;
  description?: string;
  duration?: string;
  orderIndex: number;
  createdAt?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  companySubtitle?: string;
  role: string;
  location: string;
  period: string;
  bullets: string[];
  tags: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  details?: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  year?: string;
}

export interface ThemeLogoConfig {
  type: 'text' | 'image';
  text: string;
  dotColor?: string;
  imageUrl?: string;
}

export interface ThemeTypographyConfig {
  headingFont: string;
  bodyFont: string;
  accentFont?: string;
}

export interface ThemePaletteConfig {
  background: string;
  text: string;
  primary: string;
  card: string;
  border: string;
  accent?: string;
}

export interface ThemeConfig {
  name?: string;
  themeMode?: 'light' | 'dark' | 'system';
  logo: ThemeLogoConfig;
  typography: ThemeTypographyConfig;
  colors: {
    light: ThemePaletteConfig;
    dark: ThemePaletteConfig;
  };
}

export interface ProfileSettings {
  id: string;
  fullName: string;
  roleTitle: string;
  intro: string;
  aboutBio: string;
  email: string;
  phone: string;
  location: string;
  socialInstagram: string;
  socialBehance: string;
  socialLinkedin: string;
  socialWhatsapp: string;
  socialWebsite: string;
  resumeUrl: string;
  themeMode?: 'light' | 'dark' | 'system';
  categories?: string[];
  themeConfig?: ThemeConfig;
  updatedAt?: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt: string;
  read?: boolean;
}
