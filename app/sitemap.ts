import { getAllPosts } from '@/lib/posts'

export const baseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || 'https://www.adityamahakali.in';

export default async function sitemap() {
  const blogs = getAllPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: (post.updatedAt ?? post.publishedAt).split('T')[0],
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const routes = ['', '/blog'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: route === '' ? ('weekly' as const) : ('daily' as const),
    priority: route === '' ? 1.0 : 0.8,
  }))

  return [...routes, ...blogs]
}
