import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getOrderWhatsAppUrl } from '@/lib/whatsapp';

export async function POST(req: Request) {
  try {
    // Check if online orders are enabled
    const settings = await prisma.siteSettings.findFirst();
    if (settings && !settings.onlineOrdersEnabled) {
      return NextResponse.json(
        { error: 'Online ordering is temporarily paused. Please contact us via WhatsApp to place your order!' },
        { status: 400 }
      );
    }

    const {
      customerName,
      customerEmail,
      customerPhone,
      address,
      city,
      state,
      pincode,
      paymentMethod,
      items,
    } = await req.json();

    if (!customerName || !customerPhone || !address || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'Customer details and cart items are required' },
        { status: 400 }
      );
    }

    let totalAmount = 0;
    const orderItemsData = [];

    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      });
      if (product) {
        const itemTotal = product.price * item.quantity;
        totalAmount += itemTotal;
        orderItemsData.push({
          productId: product.id,
          quantity: item.quantity,
          price: product.price,
        });
      }
    }

    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const orderId = `GOV-2026-${randomDigits}`;

    const order = await prisma.order.create({
      data: {
        orderId,
        customerName,
        customerEmail,
        customerPhone,
        address,
        city,
        state,
        pincode,
        totalAmount,
        paymentMethod: paymentMethod || 'COD',
        paymentStatus: paymentMethod === 'RAZORPAY' ? 'PAID' : 'PENDING',
        orderStatus: 'PROCESSING',
        items: {
          create: orderItemsData,
        },
      },
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    const whatsappUrl = getOrderWhatsAppUrl(orderId, totalAmount);

    return NextResponse.json({
      success: true,
      order,
      whatsappUrl,
    });
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json({ error: 'Failed to place order' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get('orderId');

    if (orderId) {
      const order = await prisma.order.findUnique({
        where: { orderId },
        include: {
          items: {
            include: { product: { include: { images: true } } },
          },
        },
      });
      return NextResponse.json({ order });
    }

    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        items: {
          include: { product: true },
        },
      },
    });
    return NextResponse.json({ orders });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, orderStatus, paymentStatus } = await req.json();

    const order = await prisma.order.update({
      where: { id },
      data: {
        orderStatus,
        paymentStatus,
      },
    });

    return NextResponse.json({ success: true, order });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}
