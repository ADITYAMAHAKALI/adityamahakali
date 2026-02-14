import "./global.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { baseUrl } from "./sitemap";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Aditya Mahakali - AI/ML Engineer",
    template: "%s | Aditya Mahakali",
  },
  description:
    "Portfolio of Aditya Mahakali, AI/ML Engineer at IBM. Showcasing expertise in Generative AI, Machine Learning, and Full-Stack Development.",
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Aditya Mahakali - AI/ML Engineer",
    description:
      "Portfolio of Aditya Mahakali, AI/ML Engineer at IBM. Showcasing expertise in Generative AI, Machine Learning, and Full-Stack Development.",
    url: baseUrl,
    siteName: "Aditya Mahakali Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/dp.jpeg", // Replace with your actual profile image URL
        width: 800,
        height: 800,
        alt: "Aditya Mahakali Profile",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  authors: [{ name: "Aditya Mahakali", url: baseUrl }],
  creator: "Aditya Mahakali",
  keywords: [
    "Aditya Mahakali",
    "AI Engineer",
    "Machine Learning",
    "Generative AI",
    "IBM",
    "Full-Stack Development",
    "Portfolio",
    "Next.js",
    "React",
  ],
};

const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cx("theme-dark")}>
      <body className="antialiased w-full">
        <div className="flex flex-col min-h-screen">
          {/* <header className="w-full px-6 py-4 border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto">
              <Navbar />
            </div>
          </header> */}
          <main className="flex-1 w-full">{children}</main>
          <Analytics />
          <SpeedInsights />
        </div>
      </body>
    </html>
  );
}
