import { BlogPosts } from "app/components/posts";
import Link from "next/link";
import Image from "next/image";
import pp from "../images/dp.jpeg";
export const metadata = {
  title: "Blog",
  description: "Read my blog.",
};

export default function Page() {
  return (
    <section className="w-full h-full min-h-screen bg-gradient-to-r from-indigo-800 to-indigo-900 flex flex-col items-center justify-center px-4 py-8">
      <Link href="/">
        <Image
          src={pp}
          alt="Aditya Mahakali"
          width={220}
          height={220}
          className="rounded-full border-4 border-white shadow-lg mb-6"
        />
      </Link>
      

      <h1 className="text-3xl font-semibold text-center text-white tracking-tighter mb-8">
        Aditya Mahakali's Blog
      </h1>

      
      <BlogPosts />
    </section>
  );
}
