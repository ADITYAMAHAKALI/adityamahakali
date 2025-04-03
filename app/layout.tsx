import './global.css';
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Navbar } from './components/nav';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { baseUrl } from './sitemap';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Aditya Mahakali - AI/ML Engineer',
    template: '%s | Aditya Mahakali',
  },
  description:
    'Portfolio of Aditya Mahakali, AI/ML Engineer at IBM. Showcasing expertise in Generative AI, Machine Learning, and Full-Stack Development.',
  openGraph: {
    title: 'Aditya Mahakali - AI/ML Engineer',
    description:
      'Portfolio of Aditya Mahakali, AI/ML Engineer at IBM. Showcasing expertise in Generative AI, Machine Learning, and Full-Stack Development.',
    url: baseUrl,
    siteName: 'Aditya Mahakali Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/pp.jpeg', // Replace with your actual profile image URL
        width: 800,
        height: 800,
        alt: 'Aditya Mahakali Profile',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  authors: [{ name: 'Aditya Mahakali', url: baseUrl }],
  creator: 'Aditya Mahakali',
  keywords: [
    'Aditya Mahakali',
    'AI Engineer',
    'Machine Learning',
    'Generative AI',
    'IBM',
    'Full-Stack Development',
    'Portfolio',
    'Next.js',
    'React',
  ],
};

const cx = (...classes) => classes.filter(Boolean).join(' ');

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cx(
        'text-black bg-white dark:text-white dark:bg-black',
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <body className="antialiased max-w-3xl mx-auto px-4 py-8"> {/* Increased max-width and added padding */}
        <div className="flex flex-col min-h-screen"> {/* Added min-height-screen for full height */}
          <header className="mb-8"> {/* Added margin to the header */}
            <Navbar />
          </header>
          <main className="flex-1"> {/* Flex-1 to push footer to the bottom */}
            {children}
          </main>
          <footer className="mt-8 text-center text-sm text-gray-500"> {/* Added margin and styling to the footer */}
            {/* Add footer content here if needed */}
          </footer>
          <Analytics />
          <SpeedInsights />
        </div>
      </body>
    </html>
  );
}