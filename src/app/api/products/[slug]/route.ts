import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { slug: params.slug },
      include: {
        category: true,
        brand: true,
        images: true,
        specifications: true,
      },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Fetch related products from same category or brand
    const relatedProducts = await prisma.product.findMany({
      where: {
        OR: [{ categoryId: product.categoryId }, { brandId: product.brandId }],
        NOT: { id: product.id },
      },
      take: 4,
      include: {
        category: true,
        brand: true,
        images: true,
      },
    });

    return NextResponse.json({ product, relatedProducts });
  } catch (error) {
    console.error('Product details error:', error);
    return NextResponse.json({ error: 'Failed to fetch product details' }, { status: 500 });
  }
}
