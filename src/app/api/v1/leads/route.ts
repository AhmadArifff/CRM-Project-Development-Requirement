import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
      include: { deals: true },
    });
    return NextResponse.json({ success: true, leads });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, company, email, phone, notes, appTitle, prdFileUrl } = await req.json();
    const lead = await prisma.lead.create({
      data: {
        name,
        company,
        email,
        phone,
        notes,
        appTitle,
        prdFileUrl,
        status: 'NEW',
      },
    });
    return NextResponse.json({ success: true, lead }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
