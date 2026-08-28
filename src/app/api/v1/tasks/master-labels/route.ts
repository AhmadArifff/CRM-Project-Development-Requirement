import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const labels = await prisma.masterLabel.findMany({
      orderBy: { name: 'asc' },
    });
    return NextResponse.json({ success: true, labels });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, color, bgClass, textClass, borderClass } = await req.json();
    const label = await prisma.masterLabel.create({
      data: { name, color, bgClass, textClass, borderClass },
    });
    return NextResponse.json({ success: true, label }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
