import Link from "next/link";
import { formatDate, getBlogPosts } from "app/blog/utils";

export function BlogPosts() {
  let allBlogs = getBlogPosts();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1;
          }
          return 1;
        })
        .map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col bg-white dark:bg-neutral-800 rounded-lg shadow-md overflow-hidden"
            href={`/blog/${post.slug}`}
          >
            <div className="relative w-full h-48">
              <img
                src={post.metadata.image || "/path/to/placeholder-image.jpg"} // Replace with a real image or a placeholder
                alt={post.metadata.title}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-4">
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                {formatDate(post.metadata.publishedAt, false)}
              </p>
              <h3 className="text-neutral-900 dark:text-neutral-100 text-lg font-semibold tracking-tight mt-2">
                {post.metadata.title}
              </h3>
            </div>
          </Link>
        ))}
    </div>
  );
}
