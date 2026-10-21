'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeConfig } from '@/lib/types';
import { DEFAULT_THEME_CONFIG } from '@/config/theme-presets';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: ThemeMode;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: ThemeMode) => void;
  themeConfig: ThemeConfig;
  setThemeConfig: (config: ThemeConfig) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'system',
  resolvedTheme: 'light',
  setTheme: () => {},
  themeConfig: DEFAULT_THEME_CONFIG,
  setThemeConfig: () => {},
});

const STORAGE_KEY = 'portfolio_theme_mode';
const CONFIG_STORAGE_KEY = 'portfolio_theme_config';

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  initialThemeConfig = DEFAULT_THEME_CONFIG,
}: {
  children: React.ReactNode;
  defaultTheme?: ThemeMode;
  initialThemeConfig?: ThemeConfig;
}) {
  const [theme, setThemeState] = useState<ThemeMode>(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');
  const [themeConfig, setThemeConfigState] = useState<ThemeConfig>(initialThemeConfig);
  const [mounted, setMounted] = useState(false);

  // Initialize theme mode and theme config: Supabase initial values take priority
  useEffect(() => {
    try {
      // 1. Theme Configuration
      if (initialThemeConfig && initialThemeConfig.colors && initialThemeConfig.typography) {
        setThemeConfigState(initialThemeConfig);
        try {
          localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(initialThemeConfig));
        } catch {}
      } else {
        const storedConfig = localStorage.getItem(CONFIG_STORAGE_KEY);
        if (storedConfig) {
          try {
            const parsed = JSON.parse(storedConfig);
            if (parsed && typeof parsed === 'object' && parsed.colors) {
              setThemeConfigState(parsed);
            }
          } catch {}
        }
      }

      // 2. Theme Mode
      if (defaultTheme) {
        setThemeState(defaultTheme);
        try {
          localStorage.setItem(STORAGE_KEY, defaultTheme);
        } catch {}
      } else {
        const stored = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
        if (stored === 'light' || stored === 'dark' || stored === 'system') {
          setThemeState(stored);
        }
      }
    } catch {
      setThemeState(defaultTheme);
    }
    setMounted(true);
  }, [defaultTheme, initialThemeConfig]);

  // Apply dark class to documentElement
  useEffect(() => {
    const root = document.documentElement;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = () => {
      let active: 'light' | 'dark' = 'light';
      if (theme === 'system') {
        active = mediaQuery.matches ? 'dark' : 'light';
      } else {
        active = theme;
      }

      setResolvedTheme(active);

      if (active === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };

    applyTheme();

    const handler = () => {
      if (theme === 'system') {
        applyTheme();
      }
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [theme]);

  // Apply dynamic font and style overrides when themeConfig changes
  useEffect(() => {
    if (!themeConfig) return;

    // 1. Dynamically load Google Font if custom font is specified
    const headingFont = themeConfig.typography?.headingFont;
    const bodyFont = themeConfig.typography?.bodyFont;

    const fontsToLoad = [headingFont, bodyFont].filter(
      (f): f is string => Boolean(f) && f !== 'Fraunces' && f !== 'Plus Jakarta Sans' && f !== 'Caveat'
    );

    fontsToLoad.forEach((fontName) => {
      const linkId = `google-font-${fontName.toLowerCase().replace(/\s+/g, '-')}`;
      if (!document.getElementById(linkId)) {
        const link = document.createElement('link');
        link.id = linkId;
        link.rel = 'stylesheet';
        link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
          fontName
        )}:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,700&display=swap`;
        document.head.appendChild(link);
      }
    });

    // 2. Inject or update dynamic typography & color theme stylesheet
    let styleEl = document.getElementById('theme-dynamic-styles') as HTMLStyleElement | null;
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'theme-dynamic-styles';
      document.head.appendChild(styleEl);
    }

    const headingFontFamily = headingFont
      ? `'${headingFont}', var(--font-fraunces), serif`
      : 'var(--font-fraunces), serif';
    const bodyFontFamily = bodyFont
      ? `'${bodyFont}', var(--font-sans), sans-serif`
      : 'var(--font-sans), sans-serif';

    const light = themeConfig.colors?.light;
    const dark = themeConfig.colors?.dark;

    const lightHero = light?.heroGradient || [
      light?.border || '#D9CCF2',
      light?.accent || '#B8C9F5',
      light?.border || '#F9C9DC',
    ];
    const darkHero = dark?.heroGradient || [
      dark?.card || '#25203D',
      dark?.border || '#1E2545',
      dark?.accent ? `${dark.accent}33` : '#382436',
    ];

    styleEl.innerHTML = `
      :root {
        --font-custom-heading: ${headingFontFamily};
        --font-custom-body: ${bodyFontFamily};
        --theme-bg: ${light?.background || '#FBFAFF'};
        --theme-text: ${light?.text || '#4A4668'};
        --theme-primary: ${light?.primary || '#2E2A4F'};
        --theme-primary-text: #FFFFFF;
        --theme-card: ${light?.card || '#FFFFFF'};
        --theme-border: ${light?.border || '#D9CCF2'};
        --theme-accent: ${light?.accent || '#B8C9F5'};
        --theme-border-subtle: ${light?.border ? `${light.border}55` : 'rgba(217, 204, 242, 0.4)'};
        --theme-hero-from: ${lightHero[0]};
        --theme-hero-via: ${lightHero[1]};
        --theme-hero-to: ${lightHero[2]};
      }
      .dark {
        --theme-bg: ${dark?.background || '#161426'};
        --theme-bg-dark: ${dark?.background || '#161426'};
        --theme-text: ${dark?.text || '#E7E4F5'};
        --theme-text-dark: ${dark?.text || '#E7E4F5'};
        --theme-primary: ${dark?.primary || '#FFFFFF'};
        --theme-primary-dark: ${dark?.primary || '#FFFFFF'};
        --theme-primary-text-dark: #1F1C36;
        --theme-card: ${dark?.card || '#1E1B33'};
        --theme-border: ${dark?.border || '#38345C'};
        --theme-accent: ${dark?.accent || '#D9CCF2'};
        --theme-border-subtle: ${dark?.border ? `${dark.border}22` : 'rgba(217, 204, 242, 0.08)'};
        --theme-border-subtle-dark: ${dark?.border ? `${dark.border}22` : 'rgba(217, 204, 242, 0.08)'};
        --theme-hero-dark-from: ${darkHero[0]};
        --theme-hero-dark-via: ${darkHero[1]};
        --theme-hero-dark-to: ${darkHero[2]};
      }
      .font-serif, [class*="font-serif"], h1, h2, h3, .font-display {
        font-family: var(--font-custom-heading) !important;
      }
      body {
        font-family: var(--font-custom-body) !important;
      }
      body:not(.dark body) {
        background-color: var(--theme-bg) !important;
        color: var(--theme-text) !important;
      }
      .dark body {
        background-color: var(--theme-bg-dark) !important;
        color: var(--theme-text-dark) !important;
      }
      ::selection {
        background-color: var(--theme-accent) !important;
        color: var(--theme-primary) !important;
      }
    `;
  }, [themeConfig]);

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(STORAGE_KEY, newTheme);
    } catch (e) {
      console.warn('Failed to persist theme:', e);
    }
  };

  const setThemeConfig = (newConfig: ThemeConfig) => {
    setThemeConfigState(newConfig);
    try {
      localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(newConfig));
    } catch (e) {
      console.warn('Failed to persist theme config:', e);
    }
    // Also update themeMode if specified in config
    if (newConfig.themeMode) {
      setTheme(newConfig.themeMode);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, themeConfig, setThemeConfig }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
