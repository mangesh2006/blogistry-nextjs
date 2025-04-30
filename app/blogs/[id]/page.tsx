import connectDB from "@/lib/db";
import Blog from "@/Models/BlogSchema";
import { notFound } from "next/navigation";
import DOMPurify from "isomorphic-dompurify";
import { format } from "date-fns";
import BlogContent from "@/components/BlogContent";
import { Metadata } from "next";

interface Params {
  params: { id: string };
}

export default async function BlogPage({ params }: Params) {
  await connectDB();

  const blog = await Blog.findById(params.id);

  if (!blog) return notFound();

  const sanitizedContent = DOMPurify.sanitize(blog.content);

  const formattedDate = blog.createdAt
    ? format(new Date(blog.createdAt), "MMMM d, yyyy")
    : null;

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-12">
        <div className="px-4 sm:px-6 md:px-8 max-w-4xl mx-auto">
          {/* Header */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {blog.title}
          </h1>

          {/* Author and Date */}
          {(blog.author || formattedDate) && (
            <div className="flex items-center text-gray-300 mb-8">
              {blog.author && (
                <span className="inline-flex items-center mr-4">
                  <span className="text-sm md:text-base">{blog.author}</span>
                </span>
              )}
              {formattedDate && (
                <span className="text-sm md:text-base">{formattedDate}</span>
              )}
            </div>
          )}

          {/* Blog Content */}
          <div className="w-full max-w-4xl mx-auto">
            <BlogContent content={sanitizedContent} />
          </div>
        </div>
      </main>
    </>
  );
}

export const metadata: Metadata = {
  title: "Blog",
  description: "This is a blog page",
};
