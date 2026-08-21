import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const totalProducts = await prisma.product.count();
    const totalOrders = await prisma.order.count();
    const totalRepairs = await prisma.repairRequest.count();
    const pendingRepairs = await prisma.repairRequest.count({
      where: { status: 'PENDING' },
    });

    const orders = await prisma.order.findMany({
      select: { totalAmount: true, orderStatus: true },
    });

    const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

    const lowStockProducts = await prisma.product.findMany({
      where: { stock: { lte: 3 } },
      select: { id: true, name: true, sku: true, stock: true },
    });

    const recentOrders = await prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        orderId: true,
        customerName: true,
        totalAmount: true,
        orderStatus: true,
        createdAt: true,
      },
    });

    const recentRepairs = await prisma.repairRequest.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        repairId: true,
        customerName: true,
        serviceType: true,
        status: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      analytics: {
        totalProducts,
        totalOrders,
        totalRepairs,
        pendingRepairs,
        totalRevenue,
        lowStockCount: lowStockProducts.length,
        lowStockProducts,
        recentOrders,
        recentRepairs,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}
