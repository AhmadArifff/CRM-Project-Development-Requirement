import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { status, description, priority, title } = await req.json();

    const task = await prisma.task.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(description !== undefined && { description }),
        ...(priority && { priority }),
        ...(title && { title }),
      },
    });

    return NextResponse.json({ success: true, task });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
