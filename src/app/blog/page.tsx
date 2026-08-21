"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen, Calendar, Clock, ChevronRight, User, ArrowRight } from "lucide-react";

export default function BlogListingPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => setBlogs(data.blogs || []))
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="space-y-3 border-b border-[#E5E2DC] pb-6">
        <nav className="flex items-center space-x-2 text-xs text-gray-500">
          <Link href="/" className="hover:text-[#C5A880]">Home</Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-[#121212] font-medium">Watch Care & Buying Guides</span>
        </nav>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#121212]">
          Horology Journal & Watch Guides
        </h1>
        <p className="text-xs text-gray-600 max-w-2xl">
          Expert watch care advice, battery maintenance guides, gift selection articles, and retail news from Govindraj Watch & Accessories, Naigaon Bazaar.
        </p>
      </div>

      {/* Blog Cards */}
      {loading ? (
        <div className="text-center py-16 text-xs text-gray-500">Loading articles...</div>
      ) : blogs.length === 0 ? (
        <div className="bg-white border border-[#E5E2DC] rounded-3xl p-12 text-center text-xs text-gray-500">
          No blog posts published yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white border border-[#E5E2DC] rounded-3xl overflow-hidden shadow-sm hover:shadow-md hover:border-[#C5A880]/50 transition duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="h-56 bg-[#FAF9F6] overflow-hidden">
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center space-x-4 text-[11px] text-gray-400">
                    <span className="bg-[#FAF9F6] border border-[#E5E2DC] px-2.5 py-0.5 rounded-full text-[#B89768] font-semibold uppercase">
                      {blog.category}
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      <span>{blog.readTime}</span>
                    </span>
                  </div>

                  <Link href={`/blog/${blog.slug}`}>
                    <h2 className="font-serif text-xl font-bold text-[#121212] hover:text-[#C5A880] transition leading-snug">
                      {blog.title}
                    </h2>
                  </Link>

                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                    {blog.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-[#E5E2DC]/80 flex items-center justify-between">
                <span className="text-xs text-gray-500 font-medium">By {blog.author}</span>
                <Link
                  href={`/blog/${blog.slug}`}
                  className="text-xs font-semibold text-[#121212] hover:text-[#C5A880] flex items-center space-x-1 transition"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
