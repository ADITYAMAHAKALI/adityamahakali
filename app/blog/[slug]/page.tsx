import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { CustomMDX } from '@/app/components/mdx';
import { getPostBySlug, getPostSlugs, getPostSummary } from '@/lib/posts';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getPostSlugs();

  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const summary = getPostSummary(slug);

  if (!summary) {
    return {};
  }

  const publishedAt = new Date(summary.publishedAt).toISOString();

  return {
    title: summary.title,
    description: summary.description,
    openGraph: {
      type: 'article',
      publishedTime: publishedAt,
      tags: summary.tags,
      title: summary.title,
      description: summary.description,
    },
    twitter: {
      card: 'summary_large_image',
      title: summary.title,
      description: summary.description,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const publishedDate = new Date(post.publishedAt);
  const formattedPublishedDate = publishedDate.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="mx-auto max-w-3xl space-y-8 py-12">
      <Link
        href="/blog"
        className="inline-flex items-center text-sm font-medium text-indigo-600 transition hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
      >
        ← Back to all posts
      </Link>
      <header className="space-y-4">
        <h1 className="text-4xl font-semibold leading-tight text-neutral-900 dark:text-neutral-50">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-600 dark:text-neutral-300">
          <time dateTime={post.publishedAt}>{formattedPublishedDate}</time>
          <span aria-hidden="true">•</span>
          <span>{post.readingTime}</span>
          {post.tags.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-300"
                >
                  #{tag}
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>

      <div className="prose prose-neutral max-w-none dark:prose-invert">
        <CustomMDX source={post.content} />
      </div>
    </article>
  );
}
