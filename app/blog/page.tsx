import Link from 'next/link';
import type { Metadata } from 'next';

import { getAllPosts } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Long-form notes and project write-ups, published straight from my Obsidian vault.',
};

const dateFormatter = new Intl.DateTimeFormat('en', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});

export default async function BlogPage() {
  const posts = await getAllPosts();

  if (posts.length === 0) {
    return (
      <section className="mx-auto max-w-3xl space-y-4 py-12">
        <header className="space-y-2">
          <h1 className="text-4xl font-semibold tracking-tight">Notes &amp; Essays</h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-300">
            Drop Markdown files into <code>content/blog</code> to publish them here.
          </p>
        </header>
        <p className="rounded-lg border border-dashed border-neutral-300 bg-neutral-100 p-6 text-neutral-700 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200">
          No posts yet. Add a Markdown file with front matter to get started.
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-4xl space-y-10 py-12">
      <header className="space-y-2">
        <h1 className="text-4xl font-semibold tracking-tight">Notes &amp; Essays</h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-300">
          Every article is rendered directly from an Obsidian/Markdown file committed to this repo.
        </p>
      </header>

      <div className="space-y-6">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="group rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:text-indigo-600 focus-visible:text-indigo-600 focus-visible:outline-none"
                  >
                    {post.title}
                  </Link>
                </h2>
                {post.description && (
                  <p className="text-neutral-600 dark:text-neutral-300">{post.description}</p>
                )}
              </div>
              <div className="flex flex-col items-start text-sm text-neutral-500 dark:text-neutral-400 sm:items-end">
                <time dateTime={post.publishedAt}>
                  {dateFormatter.format(new Date(post.publishedAt))}
                </time>
                <span>{post.readingTime}</span>
              </div>
            </div>
            {post.tags.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-2">
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
          </article>
        ))}
      </div>
    </section>
  );
}
