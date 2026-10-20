'use client';

import React, { useState, useEffect } from 'react';
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
} from 'lucide-react';
import { ProfileSettings, ThemeConfig, ThemeMode } from '@/lib/types';
import {
  DEFAULT_THEME_CONFIG,
  PRESET_THEMES,
  POPULAR_HEADING_FONTS,
  POPULAR_BODY_FONTS,
  validateThemeJson,
} from '@/config/theme-presets';
import { useTheme } from '@/components/theme/ThemeProvider';
import { uploadPortfolioImage } from '@/lib/storage';

interface AppearanceEditorProps {
  profile: ProfileSettings;
  onSaveProfile: (updatedProfile: ProfileSettings) => Promise<void>;
}

export default function AppearanceEditor({ profile, onSaveProfile }: AppearanceEditorProps) {
  const { setTheme, setThemeConfig } = useTheme();

  // Active theme mode setting (system, light, dark)
  const [themeMode, setThemeMode] = useState<ThemeMode>(profile.themeMode || 'system');

  // JSON string in the code editor
  const initialConfig = profile.themeConfig || DEFAULT_THEME_CONFIG;
  const [jsonText, setJsonText] = useState<string>(() => JSON.stringify(initialConfig, null, 2));

  // Parsed config
  const [currentConfig, setCurrentConfig] = useState<ThemeConfig>(initialConfig);

  // Validation state
  const [validation, setValidation] = useState<{ valid: boolean; error?: string }>({ valid: true });

  // UI feedback states
  const [isCopied, setIsCopied] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>('');

  // Sync state if profile changes
  useEffect(() => {
    if (profile.themeMode) {
      setThemeMode(profile.themeMode);
    }
    if (profile.themeConfig) {
      setCurrentConfig(profile.themeConfig);
      setJsonText(JSON.stringify(profile.themeConfig, null, 2));
    }
  }, [profile]);

  // Handle JSON Textarea edits
  const handleJsonChange = (newText: string) => {
    setJsonText(newText);
    const result = validateThemeJson(newText);
    if (result.valid && result.config) {
      setValidation({ valid: true });
      setCurrentConfig(result.config);
    } else {
      setValidation({ valid: false, error: result.error });
    }
  };

  // Prettify JSON
  const handleFormatJson = () => {
    try {
      const parsed = JSON.parse(jsonText);
      const formatted = JSON.stringify(parsed, null, 2);
      setJsonText(formatted);
      setValidation({ valid: true });
      setStatusMessage('JSON formatted cleanly');
      setTimeout(() => setStatusMessage(''), 2500);
    } catch (err: any) {
      setValidation({ valid: false, error: err.message });
    }
  };

  // Copy JSON to clipboard
  const handleCopyJson = async () => {
    try {
      await navigator.clipboard.writeText(jsonText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  // Load a Prebuilt Preset
  const handleLoadPreset = (presetConfig: ThemeConfig, presetName: string) => {
    const updated = { ...presetConfig, themeMode: presetConfig.themeMode || themeMode };
    setCurrentConfig(updated);
    setJsonText(JSON.stringify(updated, null, 2));
    setValidation({ valid: true });
    if (updated.themeMode) {
      setThemeMode(updated.themeMode);
    }
    setStatusMessage(`Loaded preset "${presetName}" into editor!`);
    setTimeout(() => setStatusMessage(''), 3000);
  };

  // Update Font from Visual Dropdown
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
  };

  // Update Logo fields
  const handleLogoChange = (fields: Partial<ThemeConfig['logo']>) => {
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
  };

  // Handle Logo Image Upload
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingLogo(true);
    try {
      const res = await uploadPortfolioImage(file);
      if (res.url) {
        handleLogoChange({ type: 'image', imageUrl: res.url });
        setStatusMessage('Logo image uploaded successfully!');
        setTimeout(() => setStatusMessage(''), 3000);
      } else {
        alert(`Logo upload failed: ${res.error}`);
      }
    } finally {
      setIsUploadingLogo(false);
    }
  };

  // Save all Appearance settings
  const handleSaveAppearance = async () => {
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

      // 1. Update live browser context immediately
      setTheme(themeMode);
      setThemeConfig(finalConfig);

      // 2. Persist to server / profile settings
      await onSaveProfile({
        ...profile,
        themeMode,
        themeConfig: finalConfig,
      });

      setStatusMessage('Appearance & Theme saved successfully!');
      setTimeout(() => setStatusMessage(''), 3500);
    } finally {
      setIsSaving(false);
    }
  };

  const themeModeOptions: { mode: ThemeMode; label: string; icon: React.ReactNode; desc: string }[] = [
    {
      mode: 'system',
      label: 'System Theme',
      icon: <Laptop className="w-4 h-4 text-periwinkle-dark" />,
      desc: 'Automatic (Default): Matches visitor system mode',
    },
    {
      mode: 'light',
      label: 'Light Pastel',
      icon: <Sun className="w-4 h-4 text-amber-500" />,
      desc: 'Enforces clean pastel lavender aesthetic',
    },
    {
      mode: 'dark',
      label: 'Dark Mode',
      icon: <Moon className="w-4 h-4 text-indigo-400" />,
      desc: 'Enforces immersive deep ink night palette',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner Card */}
      <div className="bg-white dark:bg-[#1E1B33] rounded-[32px] md:rounded-[40px] border border-lavender/50 dark:border-white/10 p-6 sm:p-8 shadow-soft-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-lavender-light dark:bg-lavender/20 text-deepInk dark:text-lavender-light text-xs font-bold uppercase tracking-wider border border-lavender-border/50 mb-2">
              <Palette className="w-3.5 h-3.5" />
              <span>Theme, Typography & Brand Customization</span>
            </div>
            <h2 className="font-serif font-black text-2xl sm:text-3xl text-deepInk dark:text-white">
              Website Appearance & Theme Engine
            </h2>
            <p className="text-xs sm:text-sm text-bodyText-muted dark:text-lavender-light/70 font-semibold mt-1">
              Configure public site theme mode, live typography fonts, custom logo, and JSON palette schemas.
            </p>
          </div>

          <button
            onClick={handleSaveAppearance}
            disabled={isSaving || !validation.valid}
            className="btn-tactile btn-tactile-dark inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-deepInk dark:bg-white text-white dark:text-deepInk text-sm font-bold shadow-md hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition-all self-start md:self-center"
          >
            {isSaving ? (
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <Check className="w-4 h-4" />
            )}
            <span>Save Appearance</span>
          </button>
        </div>

        {statusMessage && (
          <div className="mt-4 p-3.5 rounded-2xl bg-mint-light dark:bg-mint/20 border border-mint-border text-deepInk dark:text-mint-light text-xs font-bold flex items-center gap-2 animate-scale-up">
            <CheckCircle2 className="w-4 h-4 text-mint-dark shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}
      </div>

      {/* SECTION 1: PUBLIC WEBSITE THEME MODE */}
      <div className="bg-white dark:bg-[#1E1B33] rounded-[32px] md:rounded-[40px] border border-lavender/50 dark:border-white/10 p-6 sm:p-8 shadow-soft-sm">
        <h3 className="font-serif font-bold text-lg sm:text-xl text-deepInk dark:text-white mb-2 flex items-center gap-2">
          <span>1. Website Theme Mode (Light / Dark / System)</span>
        </h3>
        <p className="text-xs text-bodyText-muted dark:text-lavender-light/70 font-semibold mb-6">
          Set how the public website renders for all visitors. The default is System (automatically matches the visitor's device).
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {themeModeOptions.map((opt) => {
            const isSelected = themeMode === opt.mode;
            return (
              <button
                key={opt.mode}
                onClick={() => {
                  setThemeMode(opt.mode);
                  setTheme(opt.mode);
                }}
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

      {/* SECTION 2: PREBUILT EXAMPLE JSON THEMES */}
      <div className="bg-white dark:bg-[#1E1B33] rounded-[32px] md:rounded-[40px] border border-lavender/50 dark:border-white/10 p-6 sm:p-8 shadow-soft-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="font-serif font-bold text-lg sm:text-xl text-deepInk dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-butterYellow-dark" />
              <span>2. Prebuilt Example Themes (1-Click Load into JSON)</span>
            </h3>
            <p className="text-xs text-bodyText-muted dark:text-lavender-light/70 font-semibold">
              Click any prebuilt theme to automatically load its complete JSON schema into the editor below.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {PRESET_THEMES.map((preset) => {
            const isActive = currentConfig.name === preset.config.name;
            return (
              <button
                key={preset.id}
                onClick={() => handleLoadPreset(preset.config, preset.name)}
                className={`btn-tactile p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                  isActive
                    ? 'border-deepInk dark:border-white bg-lavender-light/60 dark:bg-white/15 shadow-sm'
                    : 'border-lavender/40 dark:border-white/10 bg-bg dark:bg-[#161426] hover:bg-lavender-soft/50'
                }`}
              >
                <div>
                  <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-deepInk/10 dark:bg-white/10 text-deepInk dark:text-lavender-light mb-2">
                    {preset.badge}
                  </span>
                  <h4 className="font-serif font-bold text-sm text-deepInk dark:text-white line-clamp-1">
                    {preset.name}
                  </h4>
                  <p className="text-[11px] text-bodyText-muted dark:text-lavender-light/60 line-clamp-2 mt-1">
                    {preset.description}
                  </p>
                </div>

                {/* Mini Color Swatch Bar */}
                <div className="mt-3 pt-2.5 border-t border-lavender/20 dark:border-white/10 flex items-center gap-1.5">
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-xs"
                    style={{ backgroundColor: preset.config.colors.light.background }}
                    title="Light Bg"
                  />
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-xs"
                    style={{ backgroundColor: preset.config.colors.light.primary }}
                    title="Primary"
                  />
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-xs"
                    style={{ backgroundColor: preset.config.colors.light.accent || preset.config.colors.light.border }}
                    title="Accent"
                  />
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-xs ml-auto"
                    style={{ backgroundColor: preset.config.colors.dark.background }}
                    title="Dark Bg"
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION 3: VISUAL FONT & LOGO CUSTOMIZER */}
      <div className="bg-white dark:bg-[#1E1B33] rounded-[32px] md:rounded-[40px] border border-lavender/50 dark:border-white/10 p-6 sm:p-8 shadow-soft-sm">
        <h3 className="font-serif font-bold text-lg sm:text-xl text-deepInk dark:text-white mb-2 flex items-center gap-2">
          <Type className="w-5 h-5" />
          <span>3. Quick Font & Brand Logo Settings</span>
        </h3>
        <p className="text-xs text-bodyText-muted dark:text-lavender-light/70 font-semibold mb-6">
          Adjust fonts and navbar branding here, or customize them directly in the Theme JSON below. Both stay synchronized.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Typography Settings */}
          <div className="p-5 rounded-2xl bg-bg dark:bg-[#161426] border border-lavender/40 dark:border-white/10 space-y-4">
            <h4 className="font-serif font-bold text-sm text-deepInk dark:text-white flex items-center gap-1.5">
              <Type className="w-4 h-4 text-periwinkle-dark" />
              <span>Typography Fonts</span>
            </h4>

            <div>
              <label className="block text-xs font-bold uppercase text-bodyText-muted dark:text-lavender-light/70 mb-1">
                Heading Font (Serif / Display)
              </label>
              <select
                value={currentConfig.typography?.headingFont || 'Fraunces'}
                onChange={(e) => handleFontChange('headingFont', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1E1B33] border border-lavender/50 dark:border-white/10 text-deepInk dark:text-white text-sm font-semibold focus:outline-none"
              >
                {POPULAR_HEADING_FONTS.map((f) => (
                  <option key={f.name} value={f.name}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-bodyText-muted dark:text-lavender-light/70 mb-1">
                Body & UI Font (Sans)
              </label>
              <select
                value={currentConfig.typography?.bodyFont || 'Plus Jakarta Sans'}
                onChange={(e) => handleFontChange('bodyFont', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1E1B33] border border-lavender/50 dark:border-white/10 text-deepInk dark:text-white text-sm font-semibold focus:outline-none"
              >
                {POPULAR_BODY_FONTS.map((f) => (
                  <option key={f.name} value={f.name}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-2 text-[11px] text-bodyText-muted dark:text-lavender-light/60 font-medium">
              * Custom fonts are automatically loaded live from Google Fonts.
            </div>
          </div>

          {/* Logo Settings */}
          <div className="p-5 rounded-2xl bg-bg dark:bg-[#161426] border border-lavender/40 dark:border-white/10 space-y-4">
            <h4 className="font-serif font-bold text-sm text-deepInk dark:text-white flex items-center gap-1.5">
              <ImageIcon className="w-4 h-4 text-babyPink-dark" />
              <span>Navbar Brand Logo</span>
            </h4>

            {/* Logo Type Selector */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleLogoChange({ type: 'text' })}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                  currentConfig.logo?.type === 'text'
                    ? 'bg-deepInk dark:bg-white text-white dark:text-deepInk border-transparent'
                    : 'bg-white dark:bg-[#1E1B33] text-bodyText dark:text-lavender-light border-lavender/40'
                }`}
              >
                Monogram / Text
              </button>
              <button
                type="button"
                onClick={() => handleLogoChange({ type: 'image' })}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                  currentConfig.logo?.type === 'image'
                    ? 'bg-deepInk dark:bg-white text-white dark:text-deepInk border-transparent'
                    : 'bg-white dark:bg-[#1E1B33] text-bodyText dark:text-lavender-light border-lavender/40'
                }`}
              >
                Image / Graphic Logo
              </button>
            </div>

            {currentConfig.logo?.type === 'text' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-bodyText-muted dark:text-lavender-light/70 mb-1">
                    Brand Monogram Text
                  </label>
                  <input
                    type="text"
                    value={currentConfig.logo?.text || 's'}
                    onChange={(e) => handleLogoChange({ text: e.target.value })}
                    placeholder="e.g. s, SK, Sumit"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1E1B33] border border-lavender/50 dark:border-white/10 text-deepInk dark:text-white text-sm font-semibold focus:outline-none"
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
                      onChange={(e) => handleLogoChange({ dotColor: e.target.value })}
                      className="w-10 h-10 rounded-xl cursor-pointer border border-lavender/40 p-1 bg-white"
                    />
                    <input
                      type="text"
                      value={currentConfig.logo?.dotColor || '#B8C9F5'}
                      onChange={(e) => handleLogoChange({ dotColor: e.target.value })}
                      className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-[#1E1B33] border border-lavender/50 dark:border-white/10 text-deepInk dark:text-white text-xs font-mono font-bold focus:outline-none"
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
                    onChange={(e) => handleLogoChange({ imageUrl: e.target.value })}
                    placeholder="https://... or upload below"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1E1B33] border border-lavender/50 dark:border-white/10 text-deepInk dark:text-white text-sm font-semibold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="btn-tactile inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-[#1E1B33] border border-lavender/50 dark:border-white/10 text-deepInk dark:text-lavender-light text-xs font-bold cursor-pointer hover:bg-lavender-light shadow-sm">
                    {isUploadingLogo ? (
                      <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Upload className="w-3.5 h-3.5" />
                    )}
                    <span>{isUploadingLogo ? 'Uploading Logo...' : 'Upload Logo File (PNG/SVG/WebP)'}</span>
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
        </div>
      </div>

      {/* SECTION 4: THEME JSON CONFIGURATION CODE EDITOR */}
      <div className="bg-white dark:bg-[#1E1B33] rounded-[32px] md:rounded-[40px] border border-lavender/50 dark:border-white/10 p-6 sm:p-8 shadow-soft-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="font-serif font-bold text-lg sm:text-xl text-deepInk dark:text-white flex items-center gap-2">
              <Code2 className="w-5 h-5" />
              <span>4. Theme JSON Schema Editor</span>
            </h3>
            <p className="text-xs text-bodyText-muted dark:text-lavender-light/70 font-semibold">
              Edit colors, typography, and logos directly in clean standard JSON format.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleFormatJson}
              className="btn-tactile inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-bg dark:bg-[#161426] border border-lavender/40 dark:border-white/10 text-deepInk dark:text-lavender-light text-xs font-bold hover:bg-lavender-light transition-all"
              title="Format JSON"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Format</span>
            </button>

            <button
              onClick={handleCopyJson}
              className="btn-tactile inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-bg dark:bg-[#161426] border border-lavender/40 dark:border-white/10 text-deepInk dark:text-lavender-light text-xs font-bold hover:bg-lavender-light transition-all"
              title="Copy JSON"
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-mint-dark" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{isCopied ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              onClick={() => handleLoadPreset(DEFAULT_THEME_CONFIG, 'Pastel Dream (Default)')}
              className="btn-tactile inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-bg dark:bg-[#161426] border border-lavender/40 dark:border-white/10 text-deepInk dark:text-lavender-light text-xs font-bold hover:bg-lavender-light transition-all"
              title="Reset to default JSON"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Validation Status Pill */}
        <div className="mb-3">
          {validation.valid ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mint-light dark:bg-mint/20 text-deepInk dark:text-mint-light text-[11px] font-bold border border-mint-border/50">
              <CheckCircle2 className="w-3.5 h-3.5 text-mint-dark" />
              <span>Valid Theme JSON</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-babyPink-light dark:bg-babyPink/20 text-deepInk dark:text-babyPink-light text-[11px] font-bold border border-babyPink-border">
              <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
              <span>JSON Syntax Error: {validation.error}</span>
            </div>
          )}
        </div>

        {/* JSON Textarea with Code Styling */}
        <div className="relative rounded-2xl overflow-hidden border border-lavender/50 dark:border-white/10 shadow-inner bg-[#161426] text-lavender-light">
          <textarea
            value={jsonText}
            onChange={(e) => handleJsonChange(e.target.value)}
            rows={18}
            spellCheck={false}
            className="w-full p-4 font-mono text-xs leading-relaxed bg-transparent text-[#E7E4F5] focus:outline-none resize-y selection:bg-lavender selection:text-deepInk"
          />
        </div>

        {/* Save button footer */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-lavender/20 dark:border-white/5">
          <p className="text-xs text-bodyText-muted dark:text-lavender-light/60 font-semibold">
            Clicking Save Appearance persists your changes to database and updates all public pages in real time.
          </p>

          <button
            onClick={handleSaveAppearance}
            disabled={isSaving || !validation.valid}
            className="btn-tactile btn-tactile-dark inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-deepInk dark:bg-white text-white dark:text-deepInk text-xs sm:text-sm font-bold shadow-md hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition-all w-full sm:w-auto justify-center"
          >
            {isSaving ? (
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <Check className="w-4 h-4" />
            )}
            <span>Save Appearance Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
}
