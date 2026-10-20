import type { Metadata } from 'next';
import { Outfit, Fredoka } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ThemeProvider } from '@/components/theme/ThemeProvider';

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const fredoka = Fredoka({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fredoka',
  weight: ['400', '500', '600', '700'],
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${fredoka.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        {/* Anti-FOUC Theme Script: default is System */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var mode = localStorage.getItem('portfolio_theme_mode') || 'system';
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
      </head>
      <body className="min-h-screen flex flex-col bg-cream dark:bg-[#071918] text-deepTeal dark:text-[#E6FFFA] antialiased selection:bg-primary selection:text-white transition-colors duration-200">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
