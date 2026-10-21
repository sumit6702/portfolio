import type { Metadata } from 'next';
import { Fraunces, Plus_Jakarta_Sans, Caveat } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { fetchProfileSettings } from '@/lib/data-service';
import { DEFAULT_THEME_CONFIG } from '@/config/theme-presets';

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fraunces',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800'],
});

const caveat = Caveat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-caveat',
  weight: ['400', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Sumit Kumar — Graphic Designer | Motion Graphics & 3D Specialist',
  description:
    'Portfolio of Sumit Kumar, graphic designer specializing in branding, layout, motion graphics, and 3D design with Blender, After Effects, and AI video pipelines.',
  keywords: [
    'Sumit Kumar',
    'Graphic Designer',
    'Motion Graphics',
    '3D Design',
    'Blender',
    'After Effects',
    'Branding',
    'Packaging Design',
    'Delhi',
    'Gurugram',
    'India',
  ],
  authors: [{ name: 'Sumit Kumar', url: 'https://sumitk.in' }],
  openGraph: {
    title: 'Sumit Kumar — Graphic Designer | Motion Graphics & 3D Specialist',
    description:
      'Cohesive visual systems across print, digital, and video that bridge identity design with visual depth.',
    url: 'https://sumitk.in',
    siteName: 'Sumit Kumar Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await fetchProfileSettings();
  const siteTheme = profile.themeMode || 'system';
  const config = profile.themeConfig || DEFAULT_THEME_CONFIG;

  const headingFont = config.typography?.headingFont;
  const bodyFont = config.typography?.bodyFont;
  const headingFontFamily = headingFont ? `'${headingFont}', var(--font-fraunces), serif` : 'var(--font-fraunces), serif';
  const bodyFontFamily = bodyFont ? `'${bodyFont}', var(--font-sans), sans-serif` : 'var(--font-sans), sans-serif';
  const light = config.colors?.light;
  const dark = config.colors?.dark;
  const lightHero = light?.heroGradient || ['#D9CCF2', '#B8C9F5', '#F9C9DC'];
  const darkHero = dark?.heroGradient || ['#25203D', '#1E2545', '#382436'];

  const initialThemeStyles = `
    :root {
      --font-custom-heading: ${headingFontFamily};
      --font-custom-body: ${bodyFontFamily};
      --theme-bg: ${light?.background || '#FBFAFF'};
      --theme-text: ${light?.text || '#4A4668'};
      --theme-primary: ${light?.primary || '#2E2A4F'};
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

  const fontsToLoad = [headingFont, bodyFont].filter(
    (f): f is string => Boolean(f) && f !== 'Fraunces' && f !== 'Plus Jakarta Sans' && f !== 'Caveat'
  );

  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${plusJakartaSans.variable} ${caveat.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        {/* Anti-FOUC Theme Script: initialized from Admin's chosen site theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var adminDefault = '${siteTheme}';
                  var mode = localStorage.getItem('portfolio_theme_mode') || adminDefault;
                  var isDark = mode === 'dark' || (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />

        {/* Load dynamic custom Google fonts if selected */}
        {fontsToLoad.map((fontName) => (
          <link
            key={fontName}
            id={`google-font-${fontName.toLowerCase().replace(/\s+/g, '-')}`}
            rel="stylesheet"
            href={`https://fonts.googleapis.com/css2?family=${encodeURIComponent(
              fontName
            )}:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,700&display=swap`}
          />
        ))}

        {/* Initial SSR theme styles */}
        <style id="theme-dynamic-styles" dangerouslySetInnerHTML={{ __html: initialThemeStyles }} />
      </head>
      <body className="min-h-screen flex flex-col bg-bg text-bodyText dark:bg-[#161426] dark:text-[#E7E4F5] antialiased selection:bg-lavender selection:text-deepInk transition-colors duration-200">
        <ThemeProvider defaultTheme={siteTheme} initialThemeConfig={config}>
          <Navbar resumeUrl={profile.resumeUrl} />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
