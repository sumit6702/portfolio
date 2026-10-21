'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Palette,
  Sun,
  Moon,
  Laptop,
  Sparkles,
  Type,
  Image as ImageIcon,
  Check,
  Copy,
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  Upload,
  Code2,
  Eye,
  ExternalLink,
  ChevronDown,
  Layers,
  Sliders,
  Paintbrush,
  Sparkle,
} from 'lucide-react';
import { ProfileSettings, ThemeConfig, ThemeMode } from '@/lib/types';
import {
  DEFAULT_THEME_CONFIG,
  PRESET_THEMES,
  POPULAR_HEADING_FONTS,
  POPULAR_BODY_FONTS,
  validateThemeJson,
  ThemePreset,
} from '@/config/theme-presets';
import { useTheme } from '@/components/theme/ThemeProvider';
import { uploadPortfolioImage } from '@/lib/storage';

interface AppearanceEditorProps {
  profile: ProfileSettings;
  onSaveProfile: (updatedProfile: ProfileSettings) => Promise<any>;
}

const QUICK_ACCENT_COLORS = [
  { name: 'Lavender', hex: '#B8C9F5' },
  { name: 'Neo Mint', hex: '#10B981' },
  { name: 'Sunset Coral', hex: '#FF7E67' },
  { name: 'Electric Cyan', hex: '#06B6D4' },
  { name: 'Honey Amber', hex: '#F59E0B' },
  { name: 'Baby Pink', hex: '#F9C9DC' },
  { name: 'Monochrome', hex: '#525252' },
];

export default function AppearanceEditor({ profile, onSaveProfile }: AppearanceEditorProps) {
  const { setTheme, setThemeConfig } = useTheme();

  // Active public site theme mode (system, light, dark)
  const [themeMode, setThemeMode] = useState<ThemeMode>(profile.themeMode || 'system');

  // Working theme configuration
  const initialConfig = useMemo(
    () => profile.themeConfig || DEFAULT_THEME_CONFIG,
    [profile.themeConfig]
  );
  const [currentConfig, setCurrentConfig] = useState<ThemeConfig>(initialConfig);

  // Preview Card toggle: preview in Light vs Dark mode without altering dashboard theme
  const [previewMode, setPreviewMode] = useState<'light' | 'dark'>(
    profile.themeMode === 'dark' ? 'dark' : 'light'
  );

  // Raw JSON editor text & validation
  const [jsonText, setJsonText] = useState<string>(() => JSON.stringify(initialConfig, null, 2));
  const [validation, setValidation] = useState<{ valid: boolean; error?: string }>({ valid: true });

  // UI state
  const [appliedToast, setAppliedToast] = useState<string>('');
  const [isCopied, setIsCopied] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [isJsonOpen, setIsJsonOpen] = useState(false);

  // Track if there are unsaved changes
  const isDirty = useMemo(() => {
    return (
      JSON.stringify(currentConfig) !== JSON.stringify(initialConfig) ||
      themeMode !== (profile.themeMode || 'system')
    );
  }, [currentConfig, initialConfig, themeMode, profile.themeMode]);

  // Sync when profile prop changes
  useEffect(() => {
    if (profile.themeMode) {
      setThemeMode(profile.themeMode);
    }
    if (profile.themeConfig) {
      setCurrentConfig(profile.themeConfig);
      setJsonText(JSON.stringify(profile.themeConfig, null, 2));
    }
  }, [profile]);

  // Toast feedback helper
  const showFeedback = (msg: string) => {
    setAppliedToast(msg);
    setTimeout(() => {
      setAppliedToast((prev) => (prev === msg ? '' : prev));
    }, 3500);
  };

  // 1-Click Apply Preset
  const handleApplyPreset = (preset: ThemePreset) => {
    const updated: ThemeConfig = {
      ...preset.config,
      themeMode: preset.config.themeMode || themeMode,
    };

    setCurrentConfig(updated);
    setJsonText(JSON.stringify(updated, null, 2));
    setValidation({ valid: true });

    // Instantly update live site & preview
    setThemeConfig(updated);
    if (updated.themeMode) {
      setThemeMode(updated.themeMode);
      setTheme(updated.themeMode);
      setPreviewMode(updated.themeMode === 'dark' ? 'dark' : 'light');
    }

    showFeedback(`Applied "${preset.name}" theme live!`);
  };

  // Font Selection with Live Application
  const handleFontChange = (type: 'headingFont' | 'bodyFont', fontName: string) => {
    const updated: ThemeConfig = {
      ...currentConfig,
      typography: {
        ...currentConfig.typography,
        [type]: fontName,
      },
    };

    setCurrentConfig(updated);
    setJsonText(JSON.stringify(updated, null, 2));
    setValidation({ valid: true });

    // Instantly apply to live site
    setThemeConfig(updated);
    showFeedback(`Loaded "${fontName}" font live!`);
  };

  // Quick Accent Color Click
  const handleQuickAccent = (hex: string, name: string) => {
    const updated: ThemeConfig = {
      ...currentConfig,
      colors: {
        ...currentConfig.colors,
        light: {
          ...currentConfig.colors.light,
          accent: hex,
        },
        dark: {
          ...currentConfig.colors.dark,
          accent: hex,
        },
      },
      logo: {
        ...currentConfig.logo,
        dotColor: hex,
      },
    };

    setCurrentConfig(updated);
    setJsonText(JSON.stringify(updated, null, 2));
    setValidation({ valid: true });

    setThemeConfig(updated);
    showFeedback(`Updated accent tone to ${name} (${hex})!`);
  };

  // Color Fine Tuning
  const handleColorUpdate = (
    mode: 'light' | 'dark',
    key: keyof ThemeConfig['colors']['light'],
    value: string
  ) => {
    const updated: ThemeConfig = {
      ...currentConfig,
      colors: {
        ...currentConfig.colors,
        [mode]: {
          ...currentConfig.colors[mode],
          [key]: value,
        },
      },
    };

    setCurrentConfig(updated);
    setJsonText(JSON.stringify(updated, null, 2));
    setValidation({ valid: true });

    setThemeConfig(updated);
  };

  // Logo Updates
  const handleLogoUpdate = (fields: Partial<ThemeConfig['logo']>) => {
    const updated: ThemeConfig = {
      ...currentConfig,
      logo: {
        ...currentConfig.logo,
        ...fields,
      },
    };

    setCurrentConfig(updated);
    setJsonText(JSON.stringify(updated, null, 2));
    setValidation({ valid: true });

    setThemeConfig(updated);
  };

  // Logo Image File Upload
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingLogo(true);
    try {
      const res = await uploadPortfolioImage(file);
      if (res.url) {
        handleLogoUpdate({ type: 'image', imageUrl: res.url });
        showFeedback('Logo image uploaded successfully!');
      } else {
        alert(`Logo upload failed: ${res.error}`);
      }
    } finally {
      setIsUploadingLogo(false);
    }
  };

  // Theme Mode Select
  const handleThemeModeSelect = (mode: ThemeMode) => {
    setThemeMode(mode);
    setTheme(mode);
    setPreviewMode(mode === 'dark' ? 'dark' : 'light');

    const updated: ThemeConfig = {
      ...currentConfig,
      themeMode: mode,
    };
    setCurrentConfig(updated);
    setJsonText(JSON.stringify(updated, null, 2));
    setThemeConfig(updated);
    showFeedback(`Public theme mode set to "${mode}".`);
  };

  // Save All Changes to Database
  const handleSaveAll = async () => {
    const valResult = validateThemeJson(jsonText);
    if (!valResult.valid || !valResult.config) {
      alert(`Cannot save: Invalid Theme JSON.\n\n${valResult.error}`);
      return;
    }

    setIsSaving(true);
    try {
      const finalConfig: ThemeConfig = {
        ...valResult.config,
        themeMode,
      };

      // 1. Live browser context
      setTheme(themeMode);
      setThemeConfig(finalConfig);

      // 2. Persist to database & storage
      const res: any = await onSaveProfile({
        ...profile,
        themeMode,
        themeConfig: finalConfig,
      });

      if (res?.error) {
        showFeedback(`⚠ Notice: ${res.error}`);
      } else {
        showFeedback('✓ Appearance & Theme saved successfully to database!');
      }
    } catch (err: any) {
      alert(`Save failed: ${err?.message || 'Unknown error'}`);
    } finally {
      setIsSaving(false);
    }
  };

  // Discard Unsaved Changes
  const handleDiscardChanges = () => {
    setCurrentConfig(initialConfig);
    setThemeMode(profile.themeMode || 'system');
    setJsonText(JSON.stringify(initialConfig, null, 2));
    setValidation({ valid: true });
    setTheme(profile.themeMode || 'system');
    setThemeConfig(initialConfig);
    showFeedback('Reverted changes back to saved profile.');
  };

  // JSON Textarea change
  const handleJsonChange = (newText: string) => {
    setJsonText(newText);
    const result = validateThemeJson(newText);
    if (result.valid && result.config) {
      setValidation({ valid: true });
      setCurrentConfig(result.config);
      setThemeConfig(result.config);
    } else {
      setValidation({ valid: false, error: result.error });
    }
  };

  // Format JSON
  const handleFormatJson = () => {
    try {
      const parsed = JSON.parse(jsonText);
      const formatted = JSON.stringify(parsed, null, 2);
      setJsonText(formatted);
      setValidation({ valid: true });
      showFeedback('JSON formatted cleanly');
    } catch (err: any) {
      setValidation({ valid: false, error: err.message });
    }
  };

  // Copy JSON
  const handleCopyJson = async () => {
    try {
      await navigator.clipboard.writeText(jsonText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
      showFeedback('Theme JSON copied to clipboard');
    } catch {
      // fallback
    }
  };

  // Extract preview tokens based on previewMode
  const activePalette =
    previewMode === 'dark' ? currentConfig.colors.dark : currentConfig.colors.light;
  const activeHeroGradient = activePalette.heroGradient || [
    activePalette.border || '#D9CCF2',
    activePalette.accent || '#B8C9F5',
    activePalette.card || '#F9C9DC',
  ];

  return (
    <div className="space-y-8">
      {/* ======================================================================= */}
      {/* 1. TOP HEADER & INSTANT STATUS BAR                                      */}
      {/* ======================================================================= */}
      <div className="bg-white dark:bg-[#1E1B33] rounded-[28px] sm:rounded-[36px] md:rounded-[40px] border border-lavender/50 dark:border-white/10 p-5 sm:p-8 shadow-soft-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-periwinkle-light dark:bg-periwinkle/20 text-deepInk dark:text-periwinkle-light text-xs font-bold uppercase tracking-wider border border-periwinkle-border/50 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-deepInk dark:text-periwinkle-light" />
              <span>Theme, Typography & Brand Studio</span>
            </div>
            <h2 className="font-serif font-black text-2xl sm:text-3xl text-deepInk dark:text-white">
              Website Appearance & Theme Engine
            </h2>
            <p className="text-xs sm:text-sm text-bodyText-muted dark:text-lavender-light/70 font-semibold mt-1">
              Select curated themes, test live Google fonts, fine-tune colors, and see instant feedback in the real-time preview below.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 shrink-0">
            {isDirty && (
              <button
                type="button"
                onClick={handleDiscardChanges}
                disabled={isSaving}
                className="btn-tactile inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-bg dark:bg-[#161426] border border-lavender/40 dark:border-white/10 text-deepInk dark:text-lavender-light text-xs font-bold hover:bg-lavender-light transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Discard Changes</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleSaveAll}
              disabled={isSaving || !validation.valid}
              className={`btn-tactile btn-tactile-dark inline-flex items-center gap-2 px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold shadow-md transition-all ${
                isDirty
                  ? 'bg-deepInk dark:bg-white text-white dark:text-deepInk animate-pulse-subtle'
                  : 'bg-deepInk/90 dark:bg-white/90 text-white dark:text-deepInk'
              }`}
            >
              {isSaving ? (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <Check className="w-4 h-4" />
              )}
              <span>{isDirty ? 'Save & Publish Live' : 'Save Appearance'}</span>
            </button>
          </div>
        </div>

        {/* Dynamic status pill */}
        <div className="mt-4 pt-4 border-t border-lavender/30 dark:border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isDirty ? 'bg-amber-500 animate-ping' : 'bg-emerald-500'
              }`}
            />
            <span className="font-bold text-deepInk dark:text-white">
              {isDirty ? (
                <span className="text-amber-600 dark:text-amber-400">
                  Unsaved changes in live preview — click &lsquo;Save &amp; Publish Live&rsquo; to persist
                </span>
              ) : (
                <span className="text-emerald-600 dark:text-emerald-400">
                  Current theme is saved and live on public portfolio
                </span>
              )}
            </span>
          </div>

          {appliedToast && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mint-light dark:bg-mint/20 border border-mint-border text-deepInk dark:text-mint-light text-[11px] font-bold animate-scale-up">
              <CheckCircle2 className="w-3.5 h-3.5 text-mint-dark shrink-0" />
              <span>{appliedToast}</span>
            </div>
          )}
        </div>
      </div>

      {/* ======================================================================= */}
      {/* 2. REAL-TIME INTERACTIVE WEBSITE MOCKUP PREVIEW                         */}
      {/* ======================================================================= */}
      <div className="bg-white dark:bg-[#1E1B33] rounded-[28px] sm:rounded-[36px] md:rounded-[40px] border border-lavender/50 dark:border-white/10 p-5 sm:p-8 shadow-soft-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-deepInk dark:text-lavender-light">
              <Eye className="w-4 h-4 text-periwinkle" />
              <span>Interactive Real-Time Preview</span>
            </div>
            <h3 className="font-serif font-bold text-lg sm:text-xl text-deepInk dark:text-white mt-0.5">
              Live Website Aesthetic Mockup
            </h3>
            <p className="text-xs text-bodyText-muted dark:text-lavender-light/70 font-medium">
              Every preset, font, and color change reflects instantly in this interactive card.
            </p>
          </div>

          {/* Light / Dark Preview Switch */}
          <div className="inline-flex items-center p-1 rounded-full bg-bg dark:bg-[#161426] border border-lavender/40 dark:border-white/10 shrink-0 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setPreviewMode('light')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                previewMode === 'light'
                  ? 'bg-deepInk text-white shadow-sm'
                  : 'text-deepInk dark:text-lavender-light hover:bg-lavender-light'
              }`}
            >
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>Light Mode</span>
            </button>
            <button
              type="button"
              onClick={() => setPreviewMode('dark')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                previewMode === 'dark'
                  ? 'bg-deepInk text-white shadow-sm'
                  : 'text-deepInk dark:text-lavender-light hover:bg-lavender-light'
              }`}
            >
              <Moon className="w-3.5 h-3.5 text-teal-400" />
              <span>Dark Mode</span>
            </button>
          </div>
        </div>

        {/* Browser Mockup Window */}
        <div
          className="rounded-[28px] border overflow-hidden shadow-lg transition-colors duration-300"
          style={{
            backgroundColor: activePalette.background,
            borderColor: activePalette.border,
            color: activePalette.text,
          }}
        >
          {/* Simulated Browser Bar */}
          <div
            className="px-4 py-2.5 border-b flex items-center justify-between gap-3 text-xs"
            style={{
              backgroundColor: previewMode === 'dark' ? '#110F20' : '#FFFFFF',
              borderColor: activePalette.border,
            }}
          >
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 inline-block" />
            </div>

            <div
              className="px-4 py-1 rounded-full text-[11px] font-mono font-bold flex items-center gap-1.5 max-w-xs truncate"
              style={{
                backgroundColor: activePalette.background,
                color: activePalette.text,
                border: `1px solid ${activePalette.border}`,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              <span>https://sumitk.in</span>
            </div>

            <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">
              {currentConfig.name || 'Custom Theme'} • {previewMode}
            </span>
          </div>

          {/* Simulated Content Canvas */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Simulated Mini Navbar */}
            <div className="flex items-center justify-between pb-4 border-b border-black/5 dark:border-white/10">
              {/* Brand Logo Monogram */}
              <div className="flex items-baseline gap-1 select-none">
                <span
                  className="font-serif font-black text-2xl tracking-tighter leading-none"
                  style={{
                    fontFamily: `'${currentConfig.typography.headingFont}', serif`,
                    color: activePalette.primary,
                  }}
                >
                  {currentConfig.logo.text || 's'}
                </span>
                <span
                  className="w-2 h-2 rounded-full inline-block"
                  style={{ backgroundColor: currentConfig.logo.dotColor || activePalette.accent }}
                />
              </div>

              {/* Navigation links pills */}
              <div className="flex items-center gap-2 text-xs font-bold">
                <span className="px-3 py-1 rounded-full bg-black/5 dark:bg-white/10">Projects</span>
                <span className="px-3 py-1 rounded-full opacity-60">Videos</span>
                <span className="px-3 py-1 rounded-full opacity-60">About</span>
                <span
                  className="px-3 py-1 rounded-full text-white text-[11px] font-bold"
                  style={{ backgroundColor: activePalette.primary }}
                >
                  Contact
                </span>
              </div>
            </div>

            {/* Simulated Hero Banner */}
            <div
              className="rounded-3xl p-6 sm:p-8 border shadow-sm relative overflow-hidden transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, ${activeHeroGradient[0]}, ${activeHeroGradient[1]}, ${activeHeroGradient[2]})`,
                borderColor: activePalette.border,
              }}
            >
              <div className="relative z-10 space-y-3 max-w-lg">
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-xs"
                  style={{
                    backgroundColor: activePalette.card,
                    color: activePalette.primary,
                    border: `1px solid ${activePalette.border}`,
                  }}
                >
                  <Sparkle className="w-3 h-3" />
                  <span>Interactive 3D Portfolio</span>
                </span>

                <h1
                  className="text-2xl sm:text-3xl font-black tracking-tight leading-tight"
                  style={{
                    fontFamily: `'${currentConfig.typography.headingFont}', Georgia, serif`,
                    color: activePalette.primary,
                  }}
                >
                  Crafting Motion — <span className="italic font-normal">Extraordinarily</span>
                </h1>

                <p
                  className="text-xs sm:text-sm font-medium leading-relaxed opacity-90"
                  style={{
                    fontFamily: `'${currentConfig.typography.bodyFont}', sans-serif`,
                    color: activePalette.text,
                  }}
                >
                  Graphic designer specializing in branding, layout, and 3D simulation with Blender and After Effects.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    className="px-4 py-2 rounded-full text-xs font-bold shadow-sm transition-transform active:scale-95"
                    style={{
                      backgroundColor: activePalette.primary,
                      color: previewMode === 'dark' ? '#161426' : '#FFFFFF',
                    }}
                  >
                    Explore Case Studies →
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 rounded-full text-xs font-bold transition-all border"
                    style={{
                      backgroundColor: activePalette.card,
                      borderColor: activePalette.border,
                      color: activePalette.primary,
                    }}
                  >
                    Download Resume
                  </button>
                </div>
              </div>
            </div>

            {/* Simulated Project Cards Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {[
                { tag: '3D Design', title: 'Cosmetics Bottle Mockup' },
                { tag: 'Motion', title: 'Soda Splash Commercial' },
                { tag: 'Packaging', title: 'Artisan Coffee Roasters' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl border shadow-xs flex flex-col justify-between"
                  style={{
                    backgroundColor: activePalette.card,
                    borderColor: activePalette.border,
                  }}
                >
                  <div className="h-16 rounded-xl mb-2.5 opacity-60 flex items-center justify-center text-[10px] font-bold"
                    style={{ backgroundColor: activePalette.background }}
                  >
                    <span>Cover Render #{idx + 1}</span>
                  </div>
                  <span
                    className="self-start px-2 py-0.5 rounded-full text-[9px] font-bold uppercase mb-1"
                    style={{
                      backgroundColor: `${activePalette.accent || activePalette.primary}22`,
                      color: activePalette.primary,
                    }}
                  >
                    {item.tag}
                  </span>
                  <h4
                    className="text-xs font-bold truncate"
                    style={{
                      fontFamily: `'${currentConfig.typography.headingFont}', serif`,
                      color: activePalette.primary,
                    }}
                  >
                    {item.title}
                  </h4>
                </div>
              ))}
            </div>

            {/* Live Palette Swatches Bar */}
            <div className="pt-3 border-t border-black/5 dark:border-white/10 flex flex-wrap items-center justify-between gap-3 text-[11px] font-bold">
              <span className="opacity-70 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>Active Color Tokens:</span>
              </span>

              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px]"
                  style={{ backgroundColor: activePalette.background, borderColor: activePalette.border }}
                >
                  <span className="w-2.5 h-2.5 rounded-full border border-black/20" style={{ backgroundColor: activePalette.background }} />
                  <span>Canvas: {activePalette.background}</span>
                </span>

                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px]"
                  style={{ backgroundColor: activePalette.card, borderColor: activePalette.border }}
                >
                  <span className="w-2.5 h-2.5 rounded-full border border-black/20" style={{ backgroundColor: activePalette.primary }} />
                  <span>Primary: {activePalette.primary}</span>
                </span>

                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px]"
                  style={{ backgroundColor: activePalette.card, borderColor: activePalette.border }}
                >
                  <span className="w-2.5 h-2.5 rounded-full border border-black/20" style={{ backgroundColor: activePalette.accent || activePalette.primary }} />
                  <span>Accent: {activePalette.accent || activePalette.primary}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================================= */}
      {/* 3. CURATED DESIGN THEMES (1-CLICK INSTANT APPLY)                        */}
      {/* ======================================================================= */}
      <div className="bg-white dark:bg-[#1E1B33] rounded-[28px] sm:rounded-[36px] md:rounded-[40px] border border-lavender/50 dark:border-white/10 p-5 sm:p-8 shadow-soft-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-deepInk dark:text-lavender-light">
              <Sparkles className="w-4 h-4 text-butterYellow-dark" />
              <span>Curated Theme Presets</span>
            </div>
            <h3 className="font-serif font-bold text-lg sm:text-xl text-deepInk dark:text-white mt-0.5">
              1-Click Transform Aesthetic
            </h3>
            <p className="text-xs text-bodyText-muted dark:text-lavender-light/70 font-medium">
              Click any theme to transform the entire website background, hero banner gradient, and typography live.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PRESET_THEMES.map((preset) => {
            const isActive = currentConfig.name === preset.config.name;

            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleApplyPreset(preset)}
                className={`btn-tactile p-5 rounded-3xl border text-left flex flex-col justify-between transition-all group ${
                  isActive
                    ? 'border-deepInk dark:border-white bg-lavender-light/60 dark:bg-white/15 shadow-md ring-2 ring-deepInk/20 dark:ring-white/20 scale-[1.01]'
                    : 'border-lavender/40 dark:border-white/10 bg-bg dark:bg-[#161426] hover:bg-lavender-soft/40 hover:border-lavender'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-deepInk/10 dark:bg-white/10 text-deepInk dark:text-lavender-light">
                      {preset.badge}
                    </span>

                    {isActive ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-mint text-deepInk text-[10px] font-bold shadow-xs">
                        <Check className="w-3 h-3" />
                        <span>Active Theme</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-bodyText-muted dark:text-lavender-light/50 group-hover:text-deepInk dark:group-hover:text-white transition-colors">
                        Click to apply →
                      </span>
                    )}
                  </div>

                  <h4 className="font-serif font-bold text-base text-deepInk dark:text-white">
                    {preset.name}
                  </h4>
                  <p className="text-xs text-bodyText-muted dark:text-lavender-light/70 line-clamp-2 mt-1">
                    {preset.description}
                  </p>

                  <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold text-deepInk dark:text-lavender-light/80">
                    <Type className="w-3.5 h-3.5 opacity-60" />
                    <span>
                      {preset.config.typography.headingFont} + {preset.config.typography.bodyFont}
                    </span>
                  </div>
                </div>

                {/* Color Swatches Bar */}
                <div className="mt-4 pt-3 border-t border-lavender/30 dark:border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-4 h-4 rounded-full border border-black/15 shadow-xs"
                      style={{ backgroundColor: preset.config.colors.light.background }}
                      title={`Canvas: ${preset.config.colors.light.background}`}
                    />
                    <span
                      className="w-4 h-4 rounded-full border border-black/15 shadow-xs"
                      style={{ backgroundColor: preset.config.colors.light.primary }}
                      title={`Primary: ${preset.config.colors.light.primary}`}
                    />
                    <span
                      className="w-4 h-4 rounded-full border border-black/15 shadow-xs"
                      style={{ backgroundColor: preset.config.colors.light.accent }}
                      title={`Accent: ${preset.config.colors.light.accent}`}
                    />
                    <span
                      className="w-4 h-4 rounded-full border border-black/15 shadow-xs"
                      style={{ backgroundColor: preset.config.colors.dark.background }}
                      title={`Dark Canvas: ${preset.config.colors.dark.background}`}
                    />
                  </div>

                  {preset.config.colors.light.heroGradient && (
                    <div
                      className="w-16 h-3.5 rounded-full border border-black/10 shadow-2xs"
                      style={{
                        background: `linear-gradient(to right, ${preset.config.colors.light.heroGradient[0]}, ${preset.config.colors.light.heroGradient[1]}, ${preset.config.colors.light.heroGradient[2]})`,
                      }}
                      title="Hero Banner Gradient"
                    />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ======================================================================= */}
      {/* 4. TYPOGRAPHY STUDIO (LIVE GOOGLE FONTS)                                */}
      {/* ======================================================================= */}
      <div className="bg-white dark:bg-[#1E1B33] rounded-[28px] sm:rounded-[36px] md:rounded-[40px] border border-lavender/50 dark:border-white/10 p-5 sm:p-8 shadow-soft-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-deepInk dark:text-lavender-light">
              <Type className="w-4 h-4 text-periwinkle-dark" />
              <span>Typography Studio</span>
            </div>
            <h3 className="font-serif font-bold text-lg sm:text-xl text-deepInk dark:text-white mt-0.5">
              Live Google Fonts &amp; Typography
            </h3>
            <p className="text-xs text-bodyText-muted dark:text-lavender-light/70 font-medium">
              Select headline and body fonts. Google Fonts load automatically in real time across the entire website.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Controls */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-bodyText-muted dark:text-lavender-light/70 mb-1.5">
                Headline Font (Serif / Display / Sans)
              </label>
              <select
                value={currentConfig.typography?.headingFont || 'Fraunces'}
                onChange={(e) => handleFontChange('headingFont', e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-bg dark:bg-[#161426] border border-lavender/50 dark:border-white/10 text-deepInk dark:text-white text-sm font-bold focus:outline-none focus:border-deepInk shadow-inner"
              >
                {POPULAR_HEADING_FONTS.map((f) => (
                  <option key={f.name} value={f.name}>
                    {f.name} — {f.category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-bodyText-muted dark:text-lavender-light/70 mb-1.5">
                Body &amp; Paragraph Font (Clean Sans)
              </label>
              <select
                value={currentConfig.typography?.bodyFont || 'Plus Jakarta Sans'}
                onChange={(e) => handleFontChange('bodyFont', e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-bg dark:bg-[#161426] border border-lavender/50 dark:border-white/10 text-deepInk dark:text-white text-sm font-bold focus:outline-none focus:border-deepInk shadow-inner"
              >
                {POPULAR_BODY_FONTS.map((f) => (
                  <option key={f.name} value={f.name}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>

            <p className="text-xs text-bodyText-muted dark:text-lavender-light/60 font-medium">
              ⚡ Changing font immediately refreshes the website and specimen box in real time.
            </p>
          </div>

          {/* Live Font Specimen Card */}
          <div className="p-6 rounded-3xl bg-bg dark:bg-[#161426] border border-lavender/40 dark:border-white/10 flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-bodyText-muted dark:text-lavender-light/60 mb-2 block">
              Live Typography Specimen:
            </span>

            <div className="space-y-3">
              <h4
                className="text-2xl sm:text-3xl font-black text-deepInk dark:text-white tracking-tight"
                style={{ fontFamily: `'${currentConfig.typography?.headingFont}', serif` }}
              >
                Sumit Kumar — 3D &amp; Motion Design
              </h4>

              <p
                className="text-sm text-bodyText dark:text-lavender-light/80 leading-relaxed font-normal"
                style={{ fontFamily: `'${currentConfig.typography?.bodyFont}', sans-serif` }}
              >
                The quick brown fox jumps over the lazy dog. 0123456789. Creating cohesive visual identities, 3D product animations, and digital design experiences.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-lavender/30 dark:border-white/10 flex items-center justify-between text-xs font-bold">
              <span className="text-deepInk dark:text-white">
                Heading: <span className="font-mono text-periwinkle-dark">{currentConfig.typography?.headingFont}</span>
              </span>
              <span className="text-bodyText-muted dark:text-lavender-light/70">
                Body: <span className="font-mono text-periwinkle-dark">{currentConfig.typography?.bodyFont}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================================= */}
      {/* 5. COLOR PALETTE & ACCENT STUDIO                                        */}
      {/* ======================================================================= */}
      <div className="bg-white dark:bg-[#1E1B33] rounded-[28px] sm:rounded-[36px] md:rounded-[40px] border border-lavender/50 dark:border-white/10 p-5 sm:p-8 shadow-soft-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-deepInk dark:text-lavender-light">
              <Paintbrush className="w-4 h-4 text-babyPink-dark" />
              <span>Palette &amp; Tone Customizer</span>
            </div>
            <h3 className="font-serif font-bold text-lg sm:text-xl text-deepInk dark:text-white mt-0.5">
              Color Accent &amp; Tonal Harmony
            </h3>
            <p className="text-xs text-bodyText-muted dark:text-lavender-light/70 font-medium">
              Click a quick accent preset or fine-tune exact hex colors for light and dark palettes.
            </p>
          </div>
        </div>

        {/* Quick Accent Chips */}
        <div className="mb-6 p-4 rounded-2xl bg-bg dark:bg-[#161426] border border-lavender/40 dark:border-white/10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-bodyText-muted dark:text-lavender-light/70 block">
            Quick Accent Highlight Chips:
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {QUICK_ACCENT_COLORS.map((col) => {
              const isSelected =
                currentConfig.colors.light.accent?.toLowerCase() === col.hex.toLowerCase();
              return (
                <button
                  key={col.hex}
                  type="button"
                  onClick={() => handleQuickAccent(col.hex, col.name)}
                  className={`btn-tactile inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all ${
                    isSelected
                      ? 'bg-deepInk dark:bg-white text-white dark:text-deepInk border-transparent shadow-sm'
                      : 'bg-white dark:bg-[#1E1B33] border-lavender/40 dark:border-white/10 text-deepInk dark:text-lavender-light hover:bg-lavender-light'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-black/20"
                    style={{ backgroundColor: col.hex }}
                  />
                  <span>{col.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Fine-Tuning Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Light Mode Palette */}
          <div className="p-5 rounded-3xl bg-bg dark:bg-[#161426] border border-lavender/40 dark:border-white/10 space-y-4">
            <h4 className="font-serif font-bold text-sm text-deepInk dark:text-white flex items-center gap-2">
              <Sun className="w-4 h-4 text-amber-500" />
              <span>Light Mode Colors</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase text-bodyText-muted dark:text-lavender-light/70 mb-1">
                  Canvas Background
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={currentConfig.colors.light.background}
                    onChange={(e) => handleColorUpdate('light', 'background', e.target.value)}
                    className="w-9 h-9 rounded-xl cursor-pointer border border-lavender/40 p-0.5 bg-white"
                  />
                  <input
                    type="text"
                    value={currentConfig.colors.light.background}
                    onChange={(e) => handleColorUpdate('light', 'background', e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-xl bg-white dark:bg-[#1E1B33] border border-lavender/50 text-xs font-mono font-bold text-deepInk dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-bodyText-muted dark:text-lavender-light/70 mb-1">
                  Primary Text / Headings
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={currentConfig.colors.light.primary}
                    onChange={(e) => handleColorUpdate('light', 'primary', e.target.value)}
                    className="w-9 h-9 rounded-xl cursor-pointer border border-lavender/40 p-0.5 bg-white"
                  />
                  <input
                    type="text"
                    value={currentConfig.colors.light.primary}
                    onChange={(e) => handleColorUpdate('light', 'primary', e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-xl bg-white dark:bg-[#1E1B33] border border-lavender/50 text-xs font-mono font-bold text-deepInk dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-bodyText-muted dark:text-lavender-light/70 mb-1">
                  Accent Highlight
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={currentConfig.colors.light.accent || '#B8C9F5'}
                    onChange={(e) => handleColorUpdate('light', 'accent', e.target.value)}
                    className="w-9 h-9 rounded-xl cursor-pointer border border-lavender/40 p-0.5 bg-white"
                  />
                  <input
                    type="text"
                    value={currentConfig.colors.light.accent || '#B8C9F5'}
                    onChange={(e) => handleColorUpdate('light', 'accent', e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-xl bg-white dark:bg-[#1E1B33] border border-lavender/50 text-xs font-mono font-bold text-deepInk dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-bodyText-muted dark:text-lavender-light/70 mb-1">
                  Card Border Tone
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={currentConfig.colors.light.border}
                    onChange={(e) => handleColorUpdate('light', 'border', e.target.value)}
                    className="w-9 h-9 rounded-xl cursor-pointer border border-lavender/40 p-0.5 bg-white"
                  />
                  <input
                    type="text"
                    value={currentConfig.colors.light.border}
                    onChange={(e) => handleColorUpdate('light', 'border', e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-xl bg-white dark:bg-[#1E1B33] border border-lavender/50 text-xs font-mono font-bold text-deepInk dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Dark Mode Palette */}
          <div className="p-5 rounded-3xl bg-bg dark:bg-[#161426] border border-lavender/40 dark:border-white/10 space-y-4">
            <h4 className="font-serif font-bold text-sm text-deepInk dark:text-white flex items-center gap-2">
              <Moon className="w-4 h-4 text-teal-400" />
              <span>Dark Mode Colors</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase text-bodyText-muted dark:text-lavender-light/70 mb-1">
                  Dark Canvas Background
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={currentConfig.colors.dark.background}
                    onChange={(e) => handleColorUpdate('dark', 'background', e.target.value)}
                    className="w-9 h-9 rounded-xl cursor-pointer border border-lavender/40 p-0.5 bg-white"
                  />
                  <input
                    type="text"
                    value={currentConfig.colors.dark.background}
                    onChange={(e) => handleColorUpdate('dark', 'background', e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-xl bg-white dark:bg-[#1E1B33] border border-lavender/50 text-xs font-mono font-bold text-deepInk dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-bodyText-muted dark:text-lavender-light/70 mb-1">
                  Dark Card Surface
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={currentConfig.colors.dark.card}
                    onChange={(e) => handleColorUpdate('dark', 'card', e.target.value)}
                    className="w-9 h-9 rounded-xl cursor-pointer border border-lavender/40 p-0.5 bg-white"
                  />
                  <input
                    type="text"
                    value={currentConfig.colors.dark.card}
                    onChange={(e) => handleColorUpdate('dark', 'card', e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-xl bg-white dark:bg-[#1E1B33] border border-lavender/50 text-xs font-mono font-bold text-deepInk dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-bodyText-muted dark:text-lavender-light/70 mb-1">
                  Dark Accent Highlight
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={currentConfig.colors.dark.accent || '#D9CCF2'}
                    onChange={(e) => handleColorUpdate('dark', 'accent', e.target.value)}
                    className="w-9 h-9 rounded-xl cursor-pointer border border-lavender/40 p-0.5 bg-white"
                  />
                  <input
                    type="text"
                    value={currentConfig.colors.dark.accent || '#D9CCF2'}
                    onChange={(e) => handleColorUpdate('dark', 'accent', e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-xl bg-white dark:bg-[#1E1B33] border border-lavender/50 text-xs font-mono font-bold text-deepInk dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-bodyText-muted dark:text-lavender-light/70 mb-1">
                  Dark Border Tone
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={currentConfig.colors.dark.border}
                    onChange={(e) => handleColorUpdate('dark', 'border', e.target.value)}
                    className="w-9 h-9 rounded-xl cursor-pointer border border-lavender/40 p-0.5 bg-white"
                  />
                  <input
                    type="text"
                    value={currentConfig.colors.dark.border}
                    onChange={(e) => handleColorUpdate('dark', 'border', e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-xl bg-white dark:bg-[#1E1B33] border border-lavender/50 text-xs font-mono font-bold text-deepInk dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================================= */}
      {/* 6. BRAND LOGO & MONOGRAM STUDIO                                         */}
      {/* ======================================================================= */}
      <div className="bg-white dark:bg-[#1E1B33] rounded-[28px] sm:rounded-[36px] md:rounded-[40px] border border-lavender/50 dark:border-white/10 p-5 sm:p-8 shadow-soft-sm">
        <h3 className="font-serif font-bold text-lg sm:text-xl text-deepInk dark:text-white mb-2 flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-babyPink-dark" />
          <span>Brand Logo &amp; Monogram Customizer</span>
        </h3>
        <p className="text-xs text-bodyText-muted dark:text-lavender-light/70 font-semibold mb-6">
          Customize the brand emblem displayed in the top navbar and footer across your public site.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-bg dark:bg-[#161426] border border-lavender/40 dark:border-white/10 space-y-4">
            {/* Logo Type Selector */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleLogoUpdate({ type: 'text' })}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                  currentConfig.logo?.type === 'text'
                    ? 'bg-deepInk dark:bg-white text-white dark:text-deepInk border-transparent'
                    : 'bg-white dark:bg-[#1E1B33] text-bodyText dark:text-lavender-light border-lavender/40'
                }`}
              >
                Monogram / Text Logo
              </button>
              <button
                type="button"
                onClick={() => handleLogoUpdate({ type: 'image' })}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                  currentConfig.logo?.type === 'image'
                    ? 'bg-deepInk dark:bg-white text-white dark:text-deepInk border-transparent'
                    : 'bg-white dark:bg-[#1E1B33] text-bodyText dark:text-lavender-light border-lavender/40'
                }`}
              >
                Graphic / Image Logo
              </button>
            </div>

            {currentConfig.logo?.type === 'text' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-bodyText-muted dark:text-lavender-light/70 mb-1">
                    Monogram Letter or Text
                  </label>
                  <input
                    type="text"
                    value={currentConfig.logo?.text || 's'}
                    onChange={(e) => handleLogoUpdate({ text: e.target.value })}
                    placeholder="e.g. s, SK, Sumit"
                    className="w-full px-4 py-2.5 rounded-2xl bg-white dark:bg-[#1E1B33] border border-lavender/50 text-deepInk dark:text-white text-sm font-bold focus:outline-none focus:border-deepInk shadow-inner"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-bodyText-muted dark:text-lavender-light/70 mb-1">
                    Accent Dot Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={currentConfig.logo?.dotColor || '#B8C9F5'}
                      onChange={(e) => handleLogoUpdate({ dotColor: e.target.value })}
                      className="w-10 h-10 rounded-xl cursor-pointer border border-lavender/40 p-1 bg-white"
                    />
                    <input
                      type="text"
                      value={currentConfig.logo?.dotColor || '#B8C9F5'}
                      onChange={(e) => handleLogoUpdate({ dotColor: e.target.value })}
                      className="flex-1 px-3 py-2 rounded-2xl bg-white dark:bg-[#1E1B33] border border-lavender/50 text-xs font-mono font-bold text-deepInk dark:text-white"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-bodyText-muted dark:text-lavender-light/70 mb-1">
                    Logo Image URL
                  </label>
                  <input
                    type="text"
                    value={currentConfig.logo?.imageUrl || ''}
                    onChange={(e) => handleLogoUpdate({ imageUrl: e.target.value })}
                    placeholder="https://... or upload below"
                    className="w-full px-4 py-2.5 rounded-2xl bg-white dark:bg-[#1E1B33] border border-lavender/50 text-deepInk dark:text-white text-sm font-semibold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="btn-tactile inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white dark:bg-[#1E1B33] border border-lavender/50 text-deepInk dark:text-lavender-light text-xs font-bold cursor-pointer hover:bg-lavender-light shadow-sm">
                    {isUploadingLogo ? (
                      <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Upload className="w-3.5 h-3.5" />
                    )}
                    <span>{isUploadingLogo ? 'Uploading Logo...' : 'Upload Image File (PNG/SVG/WebP)'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      disabled={isUploadingLogo}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Logo Live Preview Box */}
          <div className="p-6 rounded-3xl bg-bg dark:bg-[#161426] border border-lavender/40 dark:border-white/10 flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-bodyText-muted dark:text-lavender-light/60 mb-2 block">
              Navbar Logo Live Preview:
            </span>

            <div className="py-6 flex items-center justify-center">
              {currentConfig.logo?.type === 'image' && currentConfig.logo.imageUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={currentConfig.logo.imageUrl}
                  alt={currentConfig.logo.text || 'Logo'}
                  className="max-h-12 max-w-full object-contain"
                />
              ) : (
                <div className="flex items-baseline gap-1 select-none">
                  <span
                    className="font-serif font-black text-5xl sm:text-6xl text-deepInk dark:text-white tracking-tighter leading-none"
                    style={{ fontFamily: `'${currentConfig.typography?.headingFont}', serif` }}
                  >
                    {currentConfig.logo?.text || 's'}
                  </span>
                  <span
                    className="w-3 h-3 rounded-full inline-block animate-pulse-subtle"
                    style={{ backgroundColor: currentConfig.logo?.dotColor || '#B8C9F5' }}
                  />
                </div>
              )}
            </div>

            <p className="text-center text-xs text-bodyText-muted dark:text-lavender-light/60 font-semibold">
              Appears in top navigation bar and bottom footer on public portfolio.
            </p>
          </div>
        </div>
      </div>

      {/* ======================================================================= */}
      {/* 7. GLOBAL PUBLIC SITE THEME MODE                                        */}
      {/* ======================================================================= */}
      <div className="bg-white dark:bg-[#1E1B33] rounded-[28px] sm:rounded-[36px] md:rounded-[40px] border border-lavender/50 dark:border-white/10 p-5 sm:p-8 shadow-soft-sm">
        <h3 className="font-serif font-bold text-lg sm:text-xl text-deepInk dark:text-white mb-2 flex items-center gap-2">
          <span>Global Visitor Theme Mode</span>
        </h3>
        <p className="text-xs text-bodyText-muted dark:text-lavender-light/70 font-semibold mb-6">
          Set how the public website renders for all visitors. The public theme toggle is removed from the navbar and managed exclusively here.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              mode: 'system' as ThemeMode,
              label: 'System Theme',
              icon: <Laptop className="w-4 h-4 text-periwinkle-dark" />,
              desc: 'Automatic (Default): Matches visitor device preference',
            },
            {
              mode: 'light' as ThemeMode,
              label: 'Light Pastel',
              icon: <Sun className="w-4 h-4 text-amber-500" />,
              desc: 'Enforces clean, vibrant daytime light canvas',
            },
            {
              mode: 'dark' as ThemeMode,
              label: 'Dark Mode',
              icon: <Moon className="w-4 h-4 text-indigo-400" />,
              desc: 'Enforces immersive deep ink night palette',
            },
          ].map((opt) => {
            const isSelected = themeMode === opt.mode;
            return (
              <button
                key={opt.mode}
                type="button"
                onClick={() => handleThemeModeSelect(opt.mode)}
                className={`p-5 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'bg-lavender-light/60 dark:bg-white/10 border-deepInk dark:border-white shadow-sm scale-[1.02]'
                    : 'bg-bg dark:bg-[#161426] border-lavender/40 dark:border-white/10 hover:border-lavender hover:bg-lavender-soft/40'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-deepInk dark:text-white">
                    {opt.icon}
                    <span>{opt.label}</span>
                  </div>
                  {isSelected && (
                    <span className="w-5 h-5 rounded-full bg-deepInk dark:bg-white text-white dark:text-deepInk flex items-center justify-center text-[10px]">
                      ✓
                    </span>
                  )}
                </div>
                <p className="text-xs text-bodyText-muted dark:text-lavender-light/70 font-semibold">
                  {opt.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* ======================================================================= */}
      {/* 8. DEVELOPER JSON SCHEMA (COLLAPSIBLE ACCORDION)                        */}
      {/* ======================================================================= */}
      <div className="bg-white dark:bg-[#1E1B33] rounded-[28px] sm:rounded-[36px] md:rounded-[40px] border border-lavender/50 dark:border-white/10 overflow-hidden shadow-soft-sm">
        <button
          type="button"
          onClick={() => setIsJsonOpen((prev) => !prev)}
          className="w-full p-5 sm:p-8 flex items-center justify-between text-left hover:bg-lavender-light/30 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-lavender-light dark:bg-lavender/20 flex items-center justify-center text-deepInk dark:text-lavender-light">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-deepInk dark:text-white">
                Advanced Developer: Raw Theme JSON Schema
              </h3>
              <p className="text-xs text-bodyText-muted dark:text-lavender-light/70 font-medium">
                {isJsonOpen ? 'Click to collapse code editor' : 'Click to expand and edit raw theme JSON schema directly'}
              </p>
            </div>
          </div>

          <ChevronDown
            className={`w-5 h-5 text-deepInk dark:text-lavender-light transition-transform duration-200 ${
              isJsonOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {isJsonOpen && (
          <div className="px-5 sm:px-8 pb-8 pt-2 border-t border-lavender/30 dark:border-white/10 space-y-4 animate-scale-up">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {validation.valid ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mint-light dark:bg-mint/20 text-deepInk dark:text-mint-light text-[11px] font-bold border border-mint-border/50">
                    <CheckCircle2 className="w-3.5 h-3.5 text-mint-dark" />
                    <span>Valid Theme JSON</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-babyPink-light dark:bg-babyPink/20 text-deepInk dark:text-babyPink-light text-[11px] font-bold border border-babyPink-border">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                    <span>JSON Error: {validation.error}</span>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleFormatJson}
                  className="btn-tactile inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-bg dark:bg-[#161426] border border-lavender/40 text-xs font-bold text-deepInk dark:text-lavender-light hover:bg-lavender-light"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Format</span>
                </button>
                <button
                  type="button"
                  onClick={handleCopyJson}
                  className="btn-tactile inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-bg dark:bg-[#161426] border border-lavender/40 text-xs font-bold text-deepInk dark:text-lavender-light hover:bg-lavender-light"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-lavender/50 dark:border-white/10 shadow-inner bg-[#161426]">
              <textarea
                value={jsonText}
                onChange={(e) => handleJsonChange(e.target.value)}
                rows={16}
                spellCheck={false}
                className="w-full p-4 font-mono text-xs leading-relaxed bg-transparent text-[#E7E4F5] focus:outline-none resize-y selection:bg-lavender selection:text-deepInk"
              />
            </div>
          </div>
        )}
      </div>

      {/* ======================================================================= */}
      {/* 9. BOTTOM FIXED/ANCHORED PUBLISH BAR                                    */}
      {/* ======================================================================= */}
      <div className="sticky bottom-4 z-40 bg-white/95 dark:bg-[#1E1B33]/95 backdrop-blur-md rounded-3xl border border-lavender/60 dark:border-white/15 p-4 sm:p-5 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-2xl bg-deepInk text-white flex items-center justify-center font-bold text-sm shrink-0">
            🎨
          </div>
          <div className="min-w-0">
            <h4 className="font-serif font-bold text-sm text-deepInk dark:text-white truncate">
              {currentConfig.name || 'Custom Theme'}
            </h4>
            <p className="text-xs text-bodyText-muted dark:text-lavender-light/70 truncate">
              Heading: <span className="font-bold">{currentConfig.typography?.headingFont}</span> • Body:{' '}
              <span className="font-bold">{currentConfig.typography?.bodyFont}</span> • Mode:{' '}
              <span className="font-bold uppercase">{themeMode}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto justify-end">
          {isDirty && (
            <button
              type="button"
              onClick={handleDiscardChanges}
              disabled={isSaving}
              className="px-4 py-2 rounded-full bg-bg dark:bg-[#161426] border border-lavender/40 text-xs font-bold text-deepInk dark:text-lavender-light hover:bg-lavender-light transition-colors"
            >
              Discard
            </button>
          )}

          <button
            type="button"
            onClick={handleSaveAll}
            disabled={isSaving || !validation.valid}
            className="btn-tactile btn-tactile-dark inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-deepInk dark:bg-white text-white dark:text-deepInk text-xs sm:text-sm font-bold shadow-md hover:scale-105 active:scale-95 disabled:opacity-50 transition-all w-full sm:w-auto"
          >
            {isSaving ? (
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <Check className="w-4 h-4" />
            )}
            <span>{isDirty ? 'Save & Publish Live' : 'Appearance Saved ✓'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
