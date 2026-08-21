import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (slug) {
      const blog = await prisma.blog.findUnique({
        where: { slug },
      });
      return NextResponse.json({ blog });
    }

    const blogs = await prisma.blog.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ blogs });
  } catch (error) {
    console.error("GET /api/blogs error:", error);
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newBlog = await prisma.blog.create({
      data: {
        title: body.title,
        slug: body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        excerpt: body.excerpt,
        content: body.content,
        coverImage: body.coverImage || "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800",
        author: body.author || "Govindraj Watch Experts",
        category: body.category || "Watch Care",
        readTime: body.readTime || "4 min read",
      },
    });

    return NextResponse.json({ blog: newBlog });
  } catch (error) {
    console.error("POST /api/blogs error:", error);
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
  }
}
