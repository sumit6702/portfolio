import { ThemeConfig } from '@/lib/types';

export interface ThemePreset {
  id: string;
  name: string;
  description: string;
  badge: string;
  config: ThemeConfig;
}

export const DEFAULT_THEME_CONFIG: ThemeConfig = {
  name: 'Pastel Dream',
  themeMode: 'system',
  logo: {
    type: 'text',
    text: 's',
    dotColor: '#B8C9F5',
    imageUrl: '',
  },
  typography: {
    headingFont: 'Fraunces',
    bodyFont: 'Plus Jakarta Sans',
    accentFont: 'Caveat',
  },
  colors: {
    light: {
      background: '#FBFAFF',
      text: '#4A4668',
      primary: '#2E2A4F',
      card: '#FFFFFF',
      border: '#D9CCF2',
      accent: '#B8C9F5',
      heroGradient: ['#D9CCF2', '#B8C9F5', '#F9C9DC'],
    },
    dark: {
      background: '#161426',
      text: '#E7E4F5',
      primary: '#FFFFFF',
      card: '#1E1B33',
      border: '#38345C',
      accent: '#D9CCF2',
      heroGradient: ['#25203D', '#1E2545', '#382436'],
    },
  },
};

export const PRESET_THEMES: ThemePreset[] = [
  {
    id: 'pastel-dream',
    name: 'Pastel Dream',
    description: 'Dreamy lavender, periwinkle, and baby pink with playful editorial Fraunces serif typography.',
    badge: 'Signature Original',
    config: {
      name: 'Pastel Dream',
      themeMode: 'system',
      logo: {
        type: 'text',
        text: 's',
        dotColor: '#B8C9F5',
        imageUrl: '',
      },
      typography: {
        headingFont: 'Fraunces',
        bodyFont: 'Plus Jakarta Sans',
        accentFont: 'Caveat',
      },
      colors: {
        light: {
          background: '#FBFAFF',
          text: '#4A4668',
          primary: '#2E2A4F',
          card: '#FFFFFF',
          border: '#D9CCF2',
          accent: '#B8C9F5',
          heroGradient: ['#D9CCF2', '#B8C9F5', '#F9C9DC'],
        },
        dark: {
          background: '#161426',
          text: '#E7E4F5',
          primary: '#FFFFFF',
          card: '#1E1B33',
          border: '#38345C',
          accent: '#D9CCF2',
          heroGradient: ['#25203D', '#1E2545', '#382436'],
        },
      },
    },
  },
  {
    id: 'neo-mint',
    name: 'Neo Mint & Emerald',
    description: 'Lush botanical mint, fresh sage, and crisp emerald with modern geometric Space Grotesk type.',
    badge: 'Botanical & Modern',
    config: {
      name: 'Neo Mint & Emerald',
      themeMode: 'system',
      logo: {
        type: 'text',
        text: 'SK',
        dotColor: '#10B981',
        imageUrl: '',
      },
      typography: {
        headingFont: 'Space Grotesk',
        bodyFont: 'Inter',
        accentFont: 'Caveat',
      },
      colors: {
        light: {
          background: '#F3FAF6',
          text: '#1C3028',
          primary: '#0D261E',
          card: '#FFFFFF',
          border: '#BCE8D3',
          accent: '#10B981',
          heroGradient: ['#CFF1E0', '#A7F3D0', '#6EE7B7'],
        },
        dark: {
          background: '#0A1713',
          text: '#E0F2E9',
          primary: '#34D399',
          card: '#11241E',
          border: '#1F4035',
          accent: '#10B981',
          heroGradient: ['#0E3329', '#174739', '#10B98133'],
        },
      },
    },
  },
  {
    id: 'sunset-coral',
    name: 'Sunset Coral & Peach',
    description: 'Warm Mediterranean peach, Tuscan terracotta, and luxury Playfair Display serif headlines.',
    badge: 'Warm & Radiant',
    config: {
      name: 'Sunset Coral & Peach',
      themeMode: 'system',
      logo: {
        type: 'text',
        text: 's.',
        dotColor: '#FF6B6B',
        imageUrl: '',
      },
      typography: {
        headingFont: 'Playfair Display',
        bodyFont: 'Plus Jakarta Sans',
        accentFont: 'Caveat',
      },
      colors: {
        light: {
          background: '#FFF8F3',
          text: '#4A2E25',
          primary: '#2D1812',
          card: '#FFFFFF',
          border: '#FFD3B8',
          accent: '#FF7E67',
          heroGradient: ['#FFD3B8', '#FFBE99', '#FFAAA6'],
        },
        dark: {
          background: '#1A100C',
          text: '#FBEAE3',
          primary: '#FFBE99',
          card: '#281A14',
          border: '#4A2E25',
          accent: '#FF7E67',
          heroGradient: ['#361B12', '#4D2418', '#FF7E6733'],
        },
      },
    },
  },
  {
    id: 'cyber-electric',
    name: 'Cyber Electric Violet',
    description: 'Deep midnight space, electric neon cyan, and high-impact Syne display typography.',
    badge: 'Futuristic 3D',
    config: {
      name: 'Cyber Electric Violet',
      themeMode: 'dark',
      logo: {
        type: 'text',
        text: 'SUMIT',
        dotColor: '#06B6D4',
        imageUrl: '',
      },
      typography: {
        headingFont: 'Syne',
        bodyFont: 'Plus Jakarta Sans',
        accentFont: 'Caveat',
      },
      colors: {
        light: {
          background: '#F8F6FF',
          text: '#261C40',
          primary: '#3B14A6',
          card: '#FFFFFF',
          border: '#D4C7FE',
          accent: '#06B6D4',
          heroGradient: ['#DDD6FE', '#C4B5FD', '#A5F3FC'],
        },
        dark: {
          background: '#0C081A',
          text: '#EDE9FE',
          primary: '#A78BFA',
          card: '#181033',
          border: '#331D66',
          accent: '#06B6D4',
          heroGradient: ['#210F47', '#2F1566', '#06B6D433'],
        },
      },
    },
  },
  {
    id: 'monochrome',
    name: 'Minimalist Monochrome',
    description: 'Architectural Swiss-style monochrome with pure titanium white, obsidian, and Instrument Serif.',
    badge: 'Editorial Swiss',
    config: {
      name: 'Minimalist Monochrome',
      themeMode: 'system',
      logo: {
        type: 'text',
        text: 'SK.',
        dotColor: '#171717',
        imageUrl: '',
      },
      typography: {
        headingFont: 'Instrument Serif',
        bodyFont: 'Inter',
        accentFont: 'Caveat',
      },
      colors: {
        light: {
          background: '#F7F7F8',
          text: '#1F2328',
          primary: '#000000',
          card: '#FFFFFF',
          border: '#E1E4E8',
          accent: '#4B5563',
          heroGradient: ['#F3F4F6', '#E5E7EB', '#D1D5DB'],
        },
        dark: {
          background: '#090A0C',
          text: '#F0F3F6',
          primary: '#FFFFFF',
          card: '#15181E',
          border: '#272D36',
          accent: '#9CA3AF',
          heroGradient: ['#1F242C', '#2A313C', '#161920'],
        },
      },
    },
  },
  {
    id: 'golden-amber',
    name: 'Golden Amber & Espresso',
    description: 'Warm golden honey amber, roasted espresso, and sleek Outfit modern typography.',
    badge: 'Cozy & Rich',
    config: {
      name: 'Golden Amber & Espresso',
      themeMode: 'system',
      logo: {
        type: 'text',
        text: 's.',
        dotColor: '#F59E0B',
        imageUrl: '',
      },
      typography: {
        headingFont: 'Outfit',
        bodyFont: 'Plus Jakarta Sans',
        accentFont: 'Caveat',
      },
      colors: {
        light: {
          background: '#FFFAEE',
          text: '#3D2E14',
          primary: '#281B07',
          card: '#FFFFFF',
          border: '#FFE39A',
          accent: '#F59E0B',
          heroGradient: ['#FFE9A8', '#FCD34D', '#FDE68A'],
        },
        dark: {
          background: '#140F06',
          text: '#FEF3C7',
          primary: '#FCD34D',
          card: '#21190B',
          border: '#3D2D14',
          accent: '#F59E0B',
          heroGradient: ['#302209', '#422F0E', '#F59E0B33'],
        },
      },
    },
  },
];

export const POPULAR_HEADING_FONTS = [
  { name: 'Fraunces', family: "'Fraunces', Georgia, serif", category: 'Playful Editorial Serif' },
  { name: 'Playfair Display', family: "'Playfair Display', Georgia, serif", category: 'Luxury High-Contrast Serif' },
  { name: 'Space Grotesk', family: "'Space Grotesk', sans-serif", category: 'Geometric Modern Tech' },
  { name: 'Syne', family: "'Syne', sans-serif", category: 'Bold Avant-Garde Display' },
  { name: 'Instrument Serif', family: "'Instrument Serif', Georgia, serif", category: 'Refined Swiss Classical' },
  { name: 'Outfit', family: "'Outfit', sans-serif", category: 'Clean Contemporary Grotesk' },
  { name: 'Plus Jakarta Sans', family: "'Plus Jakarta Sans', sans-serif", category: 'Friendly Geometric Sans' },
  { name: 'Inter', family: "'Inter', sans-serif", category: 'Ultra-Neutral Clean Sans' },
];

export const POPULAR_BODY_FONTS = [
  { name: 'Plus Jakarta Sans', family: "'Plus Jakarta Sans', system-ui, sans-serif" },
  { name: 'Inter', family: "'Inter', system-ui, sans-serif" },
  { name: 'Outfit', family: "'Outfit', system-ui, sans-serif" },
  { name: 'Roboto', family: "'Roboto', system-ui, sans-serif" },
  { name: 'Nunito', family: "'Nunito', system-ui, sans-serif" },
];

export function validateThemeJson(jsonString: string): { valid: boolean; config?: ThemeConfig; error?: string } {
  try {
    const parsed = JSON.parse(jsonString);
    if (typeof parsed !== 'object' || parsed === null) {
      return { valid: false, error: 'Theme JSON must be a valid JSON object.' };
    }
    if (!parsed.logo || typeof parsed.logo !== 'object') {
      return { valid: false, error: 'Theme JSON requires a "logo" object with { type, text }.' };
    }
    if (!parsed.typography || typeof parsed.typography !== 'object') {
      return { valid: false, error: 'Theme JSON requires a "typography" object with { headingFont, bodyFont }.' };
    }
    if (!parsed.colors || !parsed.colors.light || !parsed.colors.dark) {
      return { valid: false, error: 'Theme JSON requires "colors" with "light" and "dark" palettes.' };
    }
    return { valid: true, config: parsed as ThemeConfig };
  } catch (err: any) {
    return { valid: false, error: err.message || 'Malformed JSON syntax.' };
  }
}
