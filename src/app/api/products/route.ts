import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const brand = searchParams.get('brand');
    const gender = searchParams.get('gender');
    const style = searchParams.get('style');
    const movement = searchParams.get('movement');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort'); // price_asc, price_desc, newest, bestseller
    const isBestseller = searchParams.get('bestseller');
    const isNewArrival = searchParams.get('new');
    const isFeatured = searchParams.get('featured');

    const where: any = {};

    if (category) {
      where.category = { slug: category };
    }
    if (brand) {
      where.brand = { slug: brand };
    }
    if (gender) {
      where.gender = gender.toUpperCase();
    }
    if (style) {
      where.style = style.toUpperCase();
    }
    if (movement) {
      where.movement = movement.toUpperCase();
    }
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }
    if (isBestseller === 'true') {
      where.isBestseller = true;
    }
    if (isNewArrival === 'true') {
      where.isNewArrival = true;
    }
    if (isFeatured === 'true') {
      where.isFeatured = true;
    }

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
        { sku: { contains: search } },
        { category: { name: { contains: search } } },
        { brand: { name: { contains: search } } },
      ];
    }

    let orderBy: any = { createdAt: 'desc' };
    if (sort === 'price_asc') {
      orderBy = { price: 'asc' };
    } else if (sort === 'price_desc') {
      orderBy = { price: 'desc' };
    } else if (sort === 'bestseller') {
      orderBy = { isBestseller: 'desc' };
    }

    const products = await prisma.product.findMany({
      where,
      orderBy,
      include: {
        category: true,
        brand: true,
        images: true,
        specifications: true,
      },
    });

    return NextResponse.json({ products });
  } catch (error) {
    console.error('Products API error:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
