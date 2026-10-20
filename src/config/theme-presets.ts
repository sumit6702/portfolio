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
    },
    dark: {
      background: '#161426',
      text: '#E7E4F5',
      primary: '#FFFFFF',
      card: '#1E1B33',
      border: '#38345C',
      accent: '#D9CCF2',
    },
  },
};

export const PRESET_THEMES: ThemePreset[] = [
  {
    id: 'pastel-dream',
    name: 'Pastel Dream (Default)',
    description: 'Soft lavender, periwinkle, and baby pink with chunky editorial serif typography.',
    badge: 'Original',
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
        },
        dark: {
          background: '#161426',
          text: '#E7E4F5',
          primary: '#FFFFFF',
          card: '#1E1B33',
          border: '#38345C',
          accent: '#D9CCF2',
        },
      },
    },
  },
  {
    id: 'neo-mint',
    name: 'Neo Mint & Slate',
    description: 'Crisp botanical mint with deep charcoal ink and modern geometric sans typography.',
    badge: 'Clean & Modern',
    config: {
      name: 'Neo Mint & Slate',
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
          background: '#F6FBF8',
          text: '#1F2937',
          primary: '#0F172A',
          card: '#FFFFFF',
          border: '#CFF1E0',
          accent: '#10B981',
        },
        dark: {
          background: '#0B1311',
          text: '#E2E8F0',
          primary: '#34D399',
          card: '#132320',
          border: '#1F3F39',
          accent: '#10B981',
        },
      },
    },
  },
  {
    id: 'sunset-coral',
    name: 'Sunset Coral & Warm Peach',
    description: 'Inviting warm sunset palette with luxury high-contrast serif headlines.',
    badge: 'Warm & Vibrant',
    config: {
      name: 'Sunset Coral & Warm Peach',
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
          background: '#FFF9F5',
          text: '#44342F',
          primary: '#2E1E1A',
          card: '#FFFFFF',
          border: '#FFD3B8',
          accent: '#FF7E67',
        },
        dark: {
          background: '#1A120F',
          text: '#F5EBE6',
          primary: '#FFBE99',
          card: '#291C18',
          border: '#4A342D',
          accent: '#FF7E67',
        },
      },
    },
  },
  {
    id: 'cyber-electric',
    name: 'Cyber Electric Purple',
    description: 'High-energy futuristic violet with electric cyan and ultra-bold display type.',
    badge: 'Futuristic 3D',
    config: {
      name: 'Cyber Electric Purple',
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
          text: '#271F3B',
          primary: '#4F14EE',
          card: '#FFFFFF',
          border: '#DDD6FE',
          accent: '#7C3AED',
        },
        dark: {
          background: '#0F091E',
          text: '#EDE9FE',
          primary: '#A78BFA',
          card: '#191133',
          border: '#332060',
          accent: '#06B6D4',
        },
      },
    },
  },
  {
    id: 'monochrome',
    name: 'Minimalist Monochrome',
    description: 'Timeless Swiss-style editorial minimalism with pure black and titanium white.',
    badge: 'Timeless Editorial',
    config: {
      name: 'Minimalist Monochrome',
      themeMode: 'system',
      logo: {
        type: 'text',
        text: 'SK.',
        dotColor: '#111111',
        imageUrl: '',
      },
      typography: {
        headingFont: 'Instrument Serif',
        bodyFont: 'Inter',
        accentFont: 'Caveat',
      },
      colors: {
        light: {
          background: '#FAFAFA',
          text: '#171717',
          primary: '#000000',
          card: '#FFFFFF',
          border: '#E5E5E5',
          accent: '#525252',
        },
        dark: {
          background: '#0A0A0A',
          text: '#F5F5F5',
          primary: '#FFFFFF',
          card: '#171717',
          border: '#262626',
          accent: '#A3A3A3',
        },
      },
    },
  },
];

export const POPULAR_HEADING_FONTS = [
  { name: 'Fraunces', family: "'Fraunces', Georgia, serif" },
  { name: 'Playfair Display', family: "'Playfair Display', Georgia, serif" },
  { name: 'Space Grotesk', family: "'Space Grotesk', sans-serif" },
  { name: 'Syne', family: "'Syne', sans-serif" },
  { name: 'Instrument Serif', family: "'Instrument Serif', Georgia, serif" },
  { name: 'Outfit', family: "'Outfit', sans-serif" },
  { name: 'Plus Jakarta Sans', family: "'Plus Jakarta Sans', sans-serif" },
  { name: 'Inter', family: "'Inter', sans-serif" },
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
    return { valid: true, config: parsed as ThemeConfig };
  } catch (err: any) {
    return { valid: false, error: err.message || 'Malformed JSON syntax.' };
  }
}
