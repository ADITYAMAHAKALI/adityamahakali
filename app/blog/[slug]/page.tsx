import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
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

  const coverImage =
    typeof post.frontmatter.coverImage === 'string'
      ? post.frontmatter.coverImage
      : undefined;

  return (
    <article className="blog-post">
      <Link href="/blog" className="blog-post-back">
        ← Back to all posts
      </Link>
      <header className="blog-post-header">
        <h1 className="blog-post-title">{post.title}</h1>
        <div className="blog-post-meta">
          <time dateTime={post.publishedAt}>{formattedPublishedDate}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime}</span>
          {post.tags.length > 0 && (
            <>
              <span aria-hidden="true">·</span>
              <span>{post.tags.join(' / ')}</span>
            </>
          )}
        </div>
      </header>

      {coverImage && (
        <div className="blog-post-cover">
          <Image
            src={coverImage}
            alt={post.title}
            fill
            sizes="(min-width: 768px) 68ch, 100vw"
            priority
          />
        </div>
      )}

      <div className="prose blog-post-body">
        <CustomMDX source={post.content} />
      </div>

      <section id="comments" className="blog-comments" aria-label="Comments">
        {/* Giscus (GitHub Discussions) mounts here once enabled. */}
      </section>
    </article>
  );
}
