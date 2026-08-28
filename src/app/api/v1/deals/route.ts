import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const deals = await prisma.deal.findMany({
      orderBy: { order: 'asc' },
      include: { lead: true, owner: true },
    });
    return NextResponse.json({ success: true, deals });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { title, value, stage, leadId, description } = await req.json();
    const deal = await prisma.deal.create({
      data: {
        title,
        value: Number(value),
        stage: stage || 'NEW_LEAD',
        leadId,
        description,
      },
    });
    return NextResponse.json({ success: true, deal }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
