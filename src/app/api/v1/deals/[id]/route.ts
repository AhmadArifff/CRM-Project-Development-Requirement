import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { stage, value, title, description, order } = await req.json();

    const updatedDeal = await prisma.deal.update({
      where: { id },
      data: {
        ...(stage && { stage }),
        ...(value !== undefined && { value }),
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(order !== undefined && { order }),
      },
    });

    return NextResponse.json({ success: true, deal: updatedDeal });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
