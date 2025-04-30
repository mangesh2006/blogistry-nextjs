"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PenSquare } from "lucide-react";
import { motion } from "framer-motion";

interface Blog {
  _id: string;
  title: string;
  content: string;
}

const Welcome = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token not found");
          setLoading(false);
          return;
        }

        const response = await fetch("/api/blogs", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          console.error("Failed to fetch blogs");
          setLoading(false);
          return;
        }

        const data = await response.json();
        setBlogs(data.blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black px-6 py-12">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Welcome Section */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Welcome back to <span className="text-blue-500">Blogistry</span> 👋
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Share your thoughts, inspire others, and be part of a creative
            community.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Link href="/create-post">
              <Button className="flex items-center gap-2">
                <PenSquare size={18} />
                Write a Blog
              </Button>
            </Link>
          </div>
        </section>

        {/* Your Blogs Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Your Blogs ✍️</h2>
          {loading ? (
            <div className="text-gray-400 text-center">Loading blogs...</div>
          ) : blogs.length === 0 ? (
            <div className="text-gray-400 text-center">
              No blogs written yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog, index) => (
                <Link href={`blogs/${blog._id}`} key={blog._id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-white/5 backdrop-blur-md rounded-2xl p-6 shadow-md 
                 hover:scale-[1.02] transition-transform cursor-pointer 
                 h-72 flex flex-col justify-between overflow-hidden"
                  >
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">
                        {blog.title}
                      </h3>
                      <div
                        className="text-gray-400 text-sm mb-4 line-clamp-5 prose prose-invert max-w-3xl mx-auto break-words 
    [&_pre]:whitespace-pre-wrap 
    [&_pre]:break-words 
    [&_pre]:overflow-x-auto 
    [&_img]:mx-auto"
                        dangerouslySetInnerHTML={{
                          __html: blog.content,
                        }}
                      ></div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Welcome;
