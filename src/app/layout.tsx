import type { Metadata } from 'next';
import { Fraunces, Plus_Jakarta_Sans, Caveat } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ThemeProvider } from '@/components/theme/ThemeProvider';

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${plusJakartaSans.variable} ${caveat.variable} scroll-smooth`}
      suppressHydrationWarning
    >
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
      <body className="min-h-screen flex flex-col bg-bg text-bodyText dark:bg-[#161426] dark:text-[#E7E4F5] antialiased selection:bg-lavender selection:text-deepInk transition-colors duration-200">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
