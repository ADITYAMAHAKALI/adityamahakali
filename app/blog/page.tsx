import Link from 'next/link';
import type { Metadata } from 'next';

import { getAllPosts, type PostSummary } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Notes and write-ups from my Obsidian vault.',
};

const dateFormatter = new Intl.DateTimeFormat('en', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});

const monthFormatter = new Intl.DateTimeFormat('en', {
  year: 'numeric',
  month: 'long',
});

export default async function BlogPage() {
  const posts = await getAllPosts();

  if (posts.length === 0) {
    return (
      <section className="blog-page">
        <header className="blog-header">
          <h1 className="blog-title">Notes &amp; Essays</h1>
          <p className="blog-subtitle">
            Drop Markdown files into <code>content/blog</code> to publish them
            here.
          </p>
        </header>
        <p className="blog-empty">
          No posts yet. Add a Markdown file with front matter to get started.
        </p>
      </section>
    );
  }

  const groups: { month: string; posts: PostSummary[] }[] = [];
  for (const post of posts) {
    const month = monthFormatter.format(new Date(post.publishedAt));
    const lastGroup = groups[groups.length - 1];
    if (lastGroup && lastGroup.month === month) {
      lastGroup.posts.push(post);
    } else {
      groups.push({ month, posts: [post] });
    }
  }

  return (
    <section className="blog-page">
      <header className="blog-header">
        <h1 className="blog-title">Notes &amp; Essays</h1>
        <p className="blog-subtitle">
          Notes and write-ups from my Obsidian vault.
        </p>
      </header>

      <div className="blog-archive">
        {groups.map((group) => (
          <div key={group.month} className="blog-month-group">
            <h2 className="blog-month-heading">{group.month}</h2>
            <div className="blog-list">
              {group.posts.map((post) => (
                <article key={post.slug} className="blog-row">
                  <time className="blog-row-date" dateTime={post.publishedAt}>
                    {dateFormatter.format(new Date(post.publishedAt))}
                  </time>
                  <div className="blog-row-body">
                    <h3 className="blog-row-title">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    {post.description && (
                      <p className="blog-row-description">
                        {post.description}
                      </p>
                    )}
                    {post.tags.length > 0 && (
                      <p className="blog-row-tags">{post.tags.join(' / ')}</p>
                    )}
                  </div>
                  <span className="blog-row-meta">{post.readingTime}</span>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
