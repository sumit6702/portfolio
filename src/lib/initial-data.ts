import { ProfileSettings, Project, VideoItem, ExperienceItem, EducationItem, CertificationItem } from './types';
import { DEFAULT_THEME_CONFIG } from '@/config/theme-presets';

export const DEFAULT_CATEGORIES = [
  '3D Design',
  'Motion Graphics',
  'Packaging',
  'Branding',
  'AI Video',
];

export const INITIAL_PROFILE: ProfileSettings = {
  id: 'main',
  fullName: 'Sumit Kumar',
  roleTitle: 'Graphic Designer & Motion / 3D Specialist',
  intro:
    'Graphic designer specializing in branding, layout, and digital design, skilled in Adobe Creative Suite, Figma, Affinity, and Blender. Experienced in building AI-assisted creative production pipelines, including AI video generation, prompt engineering, and 3D visualization workflows.',
  aboutBio:
    'Focused on creating cohesive visual systems across print, digital, and video that bridge identity design with visual depth for consistent, engaging brand experiences. I merge traditional design craft with next-generation 3D and AI tools to produce playful, tactile, and commercially impactful creative work.',
  email: 'sumitkdesigns@gmail.com',
  phone: '+91 9891997885',
  location: 'Gurugram & Delhi, India',
  socialInstagram: 'https://instagram.com/sumitkdesigns',
  socialBehance: 'https://behance.net/sumitdesigns',
  socialLinkedin: 'https://linkedin.com/in/sumitk02',
  socialWhatsapp: 'https://wa.me/919891997885',
  socialWebsite: 'https://sumitk.in',
  resumeUrl: '/resume-sumit-kumar.pdf',
  themeMode: 'system',
  categories: DEFAULT_CATEGORIES,
  themeConfig: DEFAULT_THEME_CONFIG,
};

export const INITIAL_EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp-1',
    company: 'ABA Technologies',
    companySubtitle: 'Shop4Smile',
    role: 'Graphic Designer',
    location: 'Gurugram, India',
    period: 'Mar 2026 – Present',
    bullets: [
      'Designed fortnightly web banners for the e-commerce platform, maintaining visual consistency across campaigns.',
      'Created social media creatives for Facebook and LinkedIn on alternate days, ensuring brand alignment across dental brands including MDK Handpieces, LiteTouch, Medency, Salvo, and TurboRock.',
      'Produced print advertisements, posters, and marketing collaterals as per business requirements.',
      'Developed e-brochures and promotional materials to support sales and marketing initiatives.',
      'Built AI video production pipelines using Veo, Kling 2.0, and After Effects for product reels, alongside 3D visualization workflows in Blender and Tripo3D.',
    ],
    tags: ['Blender', 'Tripo3D', 'After Effects', 'Kling 2.0', 'Veo', 'E-commerce Banners', 'Dental Brands'],
  },
  {
    id: 'exp-2',
    company: 'Zabaan School for Languages',
    companySubtitle: 'Language & Cultural Academy',
    role: 'Graphic Design Intern',
    location: 'Delhi, India',
    period: 'Nov 2025 – Jan 2026',
    bullets: [
      'Created posters and social media creatives using provided content and brand guidelines.',
      'Made edits and revisions to existing design files as required across varied campaign formats.',
      'Prepared visuals for internal communication, social community engagement, and promotional use.',
    ],
    tags: ['Social Media', 'Poster Design', 'Typography', 'Visual Communication', 'Adobe Illustrator'],
  },
];

export const INITIAL_EDUCATION: EducationItem[] = [
  {
    id: 'edu-1',
    degree: 'Bachelor of Commerce (B.Com)',
    institution: 'SOL, Delhi University',
    period: '2020 – 2024',
    details: 'Completed commerce undergraduate degree with strong foundation in business and market communication.',
  },
];

export const INITIAL_CERTIFICATIONS: CertificationItem[] = [
  {
    id: 'cert-1',
    title: 'Graphic Design Masterclass',
    issuer: 'Udemy',
    year: '2024',
  },
  {
    id: 'cert-2',
    title: 'Adobe Photoshop Advanced Mastery',
    issuer: 'Udemy',
    year: '2024',
  },
  {
    id: 'cert-3',
    title: 'UI/UX Design Fundamentals & Prototyping',
    issuer: 'Udemy',
    year: '2024',
  },
];

export const TOOLS_LIST = [
  { name: 'Blender', category: '3D & Motion', level: 'Advanced', icon: 'Box' },
  { name: 'After Effects', category: 'Motion Graphics', level: 'Advanced', icon: 'Film' },
  { name: 'Premiere Pro', category: 'Video Editing', level: 'Proficient', icon: 'Video' },
  { name: 'Adobe Photoshop', category: 'Design & Imaging', level: 'Expert', icon: 'Image' },
  { name: 'Adobe Illustrator', category: 'Vector & Identity', level: 'Expert', icon: 'PenTool' },
  { name: 'InDesign', category: 'Editorial & Layout', level: 'Proficient', icon: 'BookOpen' },
  { name: 'Figma', category: 'UI & Layout', level: 'Proficient', icon: 'Layout' },
  { name: 'Canva', category: 'Quick Creatives', level: 'Expert', icon: 'Sparkles' },
  { name: 'Affinity Designer', category: 'Vector Design', level: 'Proficient', icon: 'Palette' },
  { name: 'Tripo3D', category: 'AI 3D Modeling', level: 'Skilled', icon: 'Boxes' },
  { name: 'Veo & Kling 2.0', category: 'AI Video Pipelines', level: 'Skilled', icon: 'Wand2' },
];

export const CORE_DESIGN_SKILLS = [
  'Branding & Identity',
  'Typography & Hierarchy',
  'Layout & Editorial Design',
  'Social Media Creatives',
  'E-Commerce Web Banners',
  'Print Advertisements',
  'Marketing Collaterals',
  'Motion Graphics & Kinetic Typography',
  'Video Editing & Reels',
  '3D Visualization & Mockups',
  'Packaging & Dieline Design',
  'AI-Assisted Video Pipelines',
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    slug: 'crunchy-piper-packaging-design',
    title: 'Crunchy Piper - Soft Drink Packaging & 3D Brand System',
    category: 'Packaging',
    role: 'Lead Packaging & 3D Designer',
    client: 'Personal Project',
    year: '2026',
    coverImage: 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&w=1200&q=80',
    description:
      'Designed custom product packaging and labels for Crunchy Piper, exploring dieline structures, playful colorways, and shelf-impact typography. Built a full 3D brand system and packaging mockups in Blender with clay-like tactile renders.',
    tools: ['Blender', 'Adobe Illustrator', 'Adobe Photoshop', 'Figma'],
    galleryImages: [
      'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556767576-5ec41e3239ea?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=1200&q=80',
    ],
    contentBlocks: [
      {
        id: 'block-1',
        type: 'text',
        title: 'Project Overview & Concept',
        content:
          'Crunchy Piper was conceived as a vibrant, youthful beverage brand targeting the Gen-Z and playful design audience. The brief required developing an energetic personality that felt crisp, refreshing, and distinctly modern on retail shelves.',
      },
      {
        id: 'block-2',
        type: 'image',
        title: 'Label Layout & Dieline Exploration',
        mediaUrl: 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&w=1200&q=80',
        mediaCaption: 'Full dieline structure and graphic application tested for curved aluminium surfaces.',
      },
      {
        id: 'block-3',
        type: 'quote',
        content: '“A package must not only sit on the shelf; it has to start a conversation before the customer even takes their first sip.”',
      },
      {
        id: 'block-4',
        type: 'two-column',
        title: 'Typography & Visual Identity System',
        content:
          'We selected bold, rounded display typography paired with high-contrast pastel and electric color accents. Every can variant features custom geometric badges and tactile texture overlays.',
        secondaryMediaUrl: 'https://images.unsplash.com/photo-1556767576-5ec41e3239ea?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'block-5',
        type: 'image',
        title: '3D Simulation & Light Renders in Blender',
        mediaUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=1200&q=80',
        mediaCaption: 'Physically based lighting and condensation droplets sculpted in Blender Cycles.',
      },
      {
        id: 'block-6',
        type: 'text',
        title: 'Outcome & Applications',
        content:
          'The finalized project features 4 SKU flavor mockups, dielines ready for manufacturing, and a collection of animated 3D social promos ready for digital campaigns.',
      },
    ],
    featured: true,
    orderIndex: 1,
  },
  {
    id: 'proj-2',
    slug: 'shop4smile-dental-3d-visuals',
    title: 'Shop4Smile - 3D Dental Equipment & E-Commerce Visual Systems',
    category: '3D Design',
    role: 'Graphic & 3D Designer',
    client: 'ABA Technologies',
    year: '2026',
    coverImage: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80',
    description:
      'Created consistent brand alignment and high-precision visual systems across premium dental brands (MDK Handpieces, LiteTouch, Medency, Salvo, TurboRock). Engineered 3D product visualizations in Blender and Tripo3D alongside fortnightly e-commerce web banners.',
    tools: ['Blender', 'Tripo3D', 'Adobe Photoshop', 'Illustrator', 'After Effects'],
    galleryImages: [
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
    ],
    contentBlocks: [
      {
        id: 'block-d1',
        type: 'text',
        title: 'E-Commerce Elevation for Dental Technologies',
        content:
          'As Graphic Designer at ABA Technologies for Shop4Smile, I was tasked with modernizing how high-tech dental instruments are presented to clinicians and clinic owners across India and international markets.',
      },
      {
        id: 'block-d2',
        type: 'image',
        title: '3D Visualization & Clean Precision Aesthetics',
        mediaUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80',
        mediaCaption: 'Custom 3D modeling and lighting of MDK Handpieces and laser equipment in Blender.',
      },
      {
        id: 'block-d3',
        type: 'text',
        title: 'Multi-Brand Consistency & Fortnightly Campaigns',
        content:
          'Produced promotional web banners and social creatives on alternate days across Facebook and LinkedIn, adhering to strict clinical clarity while injecting energetic brand personality.',
      },
      {
        id: 'block-d4',
        type: 'image',
        title: 'Marketing Collaterals & E-Brochures',
        mediaUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
        mediaCaption: 'Comprehensive sales brochures and print collaterals supporting B2B healthcare sales.',
      },
    ],
    featured: true,
    orderIndex: 2,
  },
  {
    id: 'proj-3',
    slug: 'ai-motion-reels-kling-veo',
    title: 'Kinetic AI Video Production & Product Motion Reels',
    category: 'Motion Graphics',
    role: 'Motion Designer & AI Workflow Engineer',
    client: 'ABA Technologies / Shop4Smile',
    year: '2026',
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    description:
      'Pioneered an AI-assisted creative production pipeline combining Veo, Kling 2.0, After Effects, and Premiere Pro. Produced dynamic product reels and micro-animations with snappy pacing and visual polish.',
    tools: ['After Effects', 'Premiere Pro', 'Veo', 'Kling 2.0', 'Tripo3D'],
    galleryImages: [
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1200&q=80',
    ],
    contentBlocks: [
      {
        id: 'block-m1',
        type: 'text',
        title: 'The AI + Motion Graphics Pipeline',
        content:
          'By bridging prompt engineering with professional After Effects compositing and 3D depth buffers, we reduced motion reel production time by 60% while elevating visual quality and fluid motion physics.',
      },
      {
        id: 'block-m2',
        type: 'image',
        title: 'Visual Flow & Storyboarding',
        mediaUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
        mediaCaption: 'Frame-by-frame pacing and kinetic transition mapping for high-converting social reels.',
      },
      {
        id: 'block-m3',
        type: 'text',
        title: 'Impact & Engagement',
        content:
          'These AI-driven product videos generated a notable boost in social click-through rates across LinkedIn and Instagram, proving the power of hybrid human-craft and AI pipelines.',
      },
    ],
    featured: true,
    orderIndex: 3,
  },
  {
    id: 'proj-4',
    slug: 'zabaan-language-typography-posters',
    title: 'Zabaan Cultural Academy - Multilingual Typography & Posters',
    category: 'Branding',
    role: 'Graphic Design Intern',
    client: 'Zabaan School for Languages',
    year: '2025',
    coverImage: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&q=80',
    description:
      'Created posters, social media creatives, and event visuals for Delhi-based cultural language academy. Balanced multilingual scripts, typographic hierarchy, and cheerful cultural color palettes.',
    tools: ['Adobe Illustrator', 'Adobe InDesign', 'Photoshop', 'Canva'],
    galleryImages: [
      'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80',
    ],
    contentBlocks: [
      {
        id: 'block-z1',
        type: 'text',
        title: 'Celebrating Language through Design',
        content:
          'During my internship at Zabaan School for Languages in Delhi, I crafted social media visuals, cultural festival banners, and classroom collaterals celebrating the art of linguistic discovery.',
      },
      {
        id: 'block-z2',
        type: 'image',
        title: 'Poster Series for Language Workshops',
        mediaUrl: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&q=80',
        mediaCaption: 'Playful color palettes designed to welcome learners of Hindi, Urdu, Sanskrit, and English.',
      },
    ],
    featured: false,
    orderIndex: 4,
  },
  {
    id: 'proj-5',
    slug: 'playful-3d-clay-brand-explorations',
    title: 'Clayverse - 3D Tactile Brand Characters & Floating Shapes',
    category: '3D Design',
    role: '3D Artist & Motion Designer',
    client: 'Self-Initiated Exploration',
    year: '2026',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    description:
      'A personal exploration into cute 3D claymorphic characters, pastel gradients, and tactile soft-body physics in Blender. Designed to bring human warmth and joy to digital interfaces.',
    tools: ['Blender', 'After Effects', 'Figma'],
    galleryImages: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80',
    ],
    contentBlocks: [
      {
        id: 'block-c1',
        type: 'text',
        title: 'Soft Shapes, Friendly Feelings',
        content:
          'This series explores tactile textures, rounded bevels, and warm illumination. The goal was to prove that 3D visuals do not need to feel sterile or metallic—they can be soft, inviting, and wonderfully playful.',
      },
      {
        id: 'block-c2',
        type: 'image',
        title: 'Tactile Materials & Subsurface Scattering',
        mediaUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
        mediaCaption: 'Clay material shaders crafted with custom roughness maps and warm rim lights.',
      },
    ],
    featured: true,
    orderIndex: 5,
  },
];

export const INITIAL_VIDEOS: VideoItem[] = [
  {
    id: 'vid-1',
    title: '3D Motion Showreel 2026 - Kinetic Rhythms & Playful Visuals',
    category: 'Motion Graphics',
    videoUrl: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80',
    description:
      'A dynamic compilation of 3D animations, logo reveals, kinetic typography, and claymorphic renders produced across Blender and After Effects.',
    duration: '01:15',
    orderIndex: 1,
  },
  {
    id: 'vid-2',
    title: 'Shop4Smile Dental Precision Product Reel',
    category: '3D Animation',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1000&q=80',
    description:
      'High-impact e-commerce product reel showcasing 3D dental handpieces with smooth rotations and exploded-view callouts.',
    duration: '00:45',
    orderIndex: 2,
  },
  {
    id: 'vid-3',
    title: 'AI-Generated Product Teaser with Kling 2.0 & Veo',
    category: 'AI Video',
    videoUrl: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
    description:
      'Cutting-edge generative video reel demonstrating AI video generation stitched together with After Effects sound design and motion tracking.',
    duration: '00:30',
    orderIndex: 3,
  },
  {
    id: 'vid-4',
    title: 'Crunchy Piper - 3D Can Rotation & Liquid Splashes',
    category: '3D Simulation',
    videoUrl: 'https://www.youtube.com/watch?v=L_LUpnjgPso',
    thumbnailUrl: 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&w=1000&q=80',
    description:
      'Simulated soft drink packaging reveal with dynamic condensation drops, dynamic studio lighting, and bouncy camera moves.',
    duration: '00:40',
    orderIndex: 4,
  },
];
