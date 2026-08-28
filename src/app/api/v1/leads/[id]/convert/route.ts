import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json().catch(() => ({}));
    const dealValue = body.dealValue ? Number(body.dealValue) : 15000000.00;

    const lead = await prisma.lead.findUnique({ where: { id } });

    if (!lead) {
      return NextResponse.json({ success: false, message: 'Lead not found' }, { status: 404 });
    }

    const deal = await prisma.deal.create({
      data: {
        title: `Deal — ${lead.appTitle || lead.company || lead.name}`,
        value: dealValue,
        stage: 'NEW_LEAD',
        leadId: lead.id,
        description: `Konversi otomatis dari Lead ${lead.name} (${lead.email}). Notes: ${lead.notes || 'N/A'}`,
      },
    });

    await prisma.lead.update({
      where: { id: lead.id },
      data: { status: 'CONVERTED' },
    });

    return NextResponse.json({
      success: true,
      message: 'Lead converted to deal successfully!',
      deal,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
