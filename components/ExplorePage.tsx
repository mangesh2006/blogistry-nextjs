"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

function stripHtml(html: string): string {
  if (typeof window === "undefined") return html;
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}

const ExplorePage = () => {
  const [blogs, setBlogs] = useState<[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/explore");
        const data = await res.json();
        setBlogs(data.message);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-800 text-white py-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <h2 className="text-3xl font-semibold text-center tracking-tight text-gray-200">
          Explore Blogs 🧭
        </h2>
        {loading ? (
          <div className="text-center text-lg text-gray-400">
            Loading blogs...
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center text-lg text-gray-500">
            No blogs found
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <Link href={`blogs/${blog._id}`} key={blog._id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-gray-900/60 backdrop-blur-md rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer h-72 flex flex-col justify-between overflow-hidden"
                >
                  <div>
                    <h3 className="text-xl font-semibold mb-2 line-clamp-2 text-gray-100">
                      {blog.title}
                    </h3>
                    <div
                      className="text-gray-300 text-sm line-clamp-4"
                      dangerouslySetInnerHTML={{
                        __html: stripHtml(blog.content),
                      }}
                    ></div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ExplorePage;
