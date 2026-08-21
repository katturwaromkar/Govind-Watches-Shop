"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Clock, User, Calendar, ArrowLeft } from "lucide-react";

export default function SingleBlogArticlePage() {
  const params = useParams();
  const slug = params.slug as string;

  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/blogs?slug=${slug}`)
      .then((res) => res.json())
      .then((data) => setBlog(data.blog || null))
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <div className="max-w-4xl mx-auto px-4 py-20 text-center text-xs text-gray-500">Loading article...</div>;
  }

  if (!blog) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-serif font-bold text-[#121212]">Article Not Found</h2>
        <Link href="/blog" className="inline-block bg-[#121212] text-white text-xs px-5 py-2 rounded-full">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-xs text-gray-500">
        <Link href="/" className="hover:text-[#C5A880]">Home</Link>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <Link href="/blog" className="hover:text-[#C5A880]">Blog</Link>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <span className="text-[#121212] font-medium truncate max-w-xs">{blog.title}</span>
      </nav>

      {/* Header */}
      <div className="space-y-4">
        <span className="bg-white border border-[#E5E2DC] px-3 py-1 rounded-full text-[#B89768] text-xs font-semibold uppercase">
          {blog.category}
        </span>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#121212] leading-tight">
          {blog.title}
        </h1>

        <div className="flex items-center space-x-6 text-xs text-gray-500 border-b border-[#E5E2DC] pb-4">
          <span className="flex items-center space-x-1.5 font-medium text-[#121212]">
            <User className="w-4 h-4 text-[#C5A880]" />
            <span>{blog.author}</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <Clock className="w-4 h-4 text-gray-400" />
            <span>{blog.readTime}</span>
          </span>
        </div>
      </div>

      {/* Cover Image */}
      <div className="rounded-3xl overflow-hidden bg-[#FAF9F6] border border-[#E5E2DC] aspect-[16/9] shadow-sm">
        <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />
      </div>

      {/* Article Content */}
      <div className="bg-white border border-[#E5E2DC] rounded-3xl p-6 sm:p-10 space-y-6 text-sm text-gray-700 leading-relaxed shadow-sm">
        {blog.content.split("\n\n").map((para: string, idx: number) => (
          <p key={idx}>{para}</p>
        ))}
      </div>

      <div className="pt-4">
        <Link
          href="/blog"
          className="inline-flex items-center space-x-2 text-xs font-semibold text-[#121212] hover:text-[#C5A880] transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Articles</span>
        </Link>
      </div>
    </article>
  );
}
