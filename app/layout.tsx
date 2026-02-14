import "./global.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { baseUrl } from "./sitemap";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Aditya Mahakali - AI Engineer | ML & GenAI Specialist",
    template: "%s | Aditya Mahakali",
  },
  description:
    "AI Engineer specializing in Generative AI, RAG systems, NL2SQL, and enterprise ML solutions. Expert in building production AI systems with LLMs, embeddings, and retrieval engineering. Portfolio showcasing real-world AI/ML projects.",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Aditya Mahakali - AI Engineer | ML & GenAI Specialist",
    description:
      "AI Engineer specializing in Generative AI, RAG systems, NL2SQL, and enterprise ML solutions. Expert in building production AI systems with LLMs, embeddings, and retrieval engineering.",
    url: baseUrl,
    siteName: "Aditya Mahakali - AI Engineer Portfolio",
    locale: "en_US",
    type: "profile",
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Aditya Mahakali - AI Engineer specializing in GenAI, RAG, and ML",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Mahakali - AI Engineer | ML & GenAI Specialist",
    description:
      "AI Engineer at IBM specializing in Generative AI, RAG systems, NL2SQL, and enterprise ML solutions. Building production AI systems with LLMs and retrieval engineering.",
    images: [`${baseUrl}/og-image.png`],
    creator: "@adityamahakali",
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
  publisher: "Aditya Mahakali",
  category: "Technology",
  keywords: [
    // Primary AI Engineer keywords
    "AI Engineer",
    "Artificial Intelligence Engineer",
    "ML Engineer",
    "Machine Learning Engineer",
    "GenAI Engineer",
    "Generative AI Engineer",
    
    // Specialized AI roles
    "RAG Engineer",
    "LLM Engineer",
    "NLP Engineer",
    "Retrieval Engineer",
    "AI/ML Engineer",
    
    // Technical skills
    "Generative AI",
    "Large Language Models",
    "LLM",
    "RAG",
    "Retrieval Augmented Generation",
    "NL2SQL",
    "Natural Language Processing",
    "NLP",
    "Machine Learning",
    "Deep Learning",
    "Computer Vision",
    "Embeddings",
    "Vector Search",
    "Knowledge Graphs",
    
    // Frameworks & Tools
    "watsonx.ai",
    "LangChain",
    "OpenAI",
    "Transformers",
    "PyTorch",
    "TensorFlow",
    
    // Backend & Infrastructure
    "FastAPI",
    "Python",
    "Docker",
    "Elasticsearch",
    "Vector Databases",
    "Neo4j",
    
    // Company & Personal
    "IBM",
    "Aditya Mahakali",
    "AI Portfolio",
    "ML Portfolio",
    
    // Full-stack
    "Full-Stack Development",
    "Next.js",
    "React",
    "TypeScript",
  ],
  alternates: {
    canonical: baseUrl,
  },
  verification: {
    // Add your verification codes when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
};

const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Aditya Mahakali",
    jobTitle: "AI Engineer",
    description:
      "AI Engineer specializing in Generative AI, RAG systems, NL2SQL, and enterprise ML solutions",
    url: baseUrl,
    image: `${baseUrl}/dp.jpeg`,
    email: "adityamahakali@gmail.com",
    worksFor: {
      "@type": "Organization",
      name: "IBM",
      url: "https://www.ibm.com",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Your University", // Update with your actual university
    },
    sameAs: [
      "https://github.com/ADITYAMAHAKALI",
      "https://www.linkedin.com/in/aditya-mahakali-b81758168/",
      "https://leetcode.com/adityamahakali/",
    ],
    knowsAbout: [
      "Artificial Intelligence",
      "Machine Learning",
      "Generative AI",
      "Large Language Models",
      "RAG",
      "NL2SQL",
      "Natural Language Processing",
      "Deep Learning",
      "Python",
      "FastAPI",
      "watsonx.ai",
    ],
  };

  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "AI/ML Engineering Services",
    description:
      "Expert AI Engineering services specializing in Generative AI, RAG systems, NL2SQL, embeddings, and enterprise ML solutions",
    provider: {
      "@type": "Person",
      name: "Aditya Mahakali",
      jobTitle: "AI Engineer",
    },
    areaServed: "Worldwide",
    serviceType: [
      "AI Engineering",
      "Machine Learning Engineering",
      "Generative AI Development",
      "RAG System Development",
      "NL2SQL Implementation",
      "LLM Integration",
      "Enterprise AI Solutions",
    ],
  };

  return (
    <html lang="en" className={cx("theme-dark")}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(professionalServiceSchema),
          }}
        />
      </head>
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
