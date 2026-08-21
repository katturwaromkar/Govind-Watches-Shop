import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getRepairWhatsAppUrl } from '@/lib/whatsapp';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      customerName,
      phone,
      whatsapp,
      email,
      serviceType,
      brand,
      model,
      problemDescription,
      preferredDate,
      preferredTime,
    } = body;

    if (!customerName || !phone || !serviceType || !problemDescription) {
      return NextResponse.json(
        { error: 'Name, phone, service type and problem description are required' },
        { status: 400 }
      );
    }

    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const repairId = `REP-2026-${randomDigits}`;

    const repair = await prisma.repairRequest.create({
      data: {
        repairId,
        customerName,
        phone,
        whatsapp: whatsapp || phone,
        email,
        serviceType,
        brand,
        model,
        problemDescription,
        preferredDate,
        preferredTime,
        status: 'PENDING',
      },
    });

    const whatsappUrl = getRepairWhatsAppUrl(repairId, serviceType, customerName);

    return NextResponse.json({
      success: true,
      repair,
      whatsappUrl,
    });
  } catch (error) {
    console.error('Repair booking error:', error);
    return NextResponse.json({ error: 'Failed to create repair booking' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const repairs = await prisma.repairRequest.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ repairs });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch repairs' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, status, estimatedCost, technicianNotes } = await req.json();

    const repair = await prisma.repairRequest.update({
      where: { id },
      data: {
        status,
        estimatedCost: estimatedCost ? parseFloat(estimatedCost) : undefined,
        technicianNotes,
      },
    });

    return NextResponse.json({ success: true, repair });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update repair' }, { status: 500 });
  }
}
