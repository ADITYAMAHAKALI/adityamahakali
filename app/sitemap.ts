// import { getBlogPosts } from 'app/blog/utils'

export const baseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || 'https://adityamahakali.vercel.app';
// console.log('baseUrl', baseUrl)

export default async function sitemap() {
  // let blogs = getBlogPosts().map((post) => ({
  //   url: `${baseUrl}/blog/${post.slug}`,
  //   lastModified: post.metadata.publishedAt,
  // }))

  // let routes = ['', '/blog'].map((route) => ({
  //   url: `${baseUrl}${route}`,
  //   lastModified: new Date().toISOString().split('T')[0],
  // }))
  let routes = [''].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))
  return routes;
  // return [...routes, ...blogs]
}
