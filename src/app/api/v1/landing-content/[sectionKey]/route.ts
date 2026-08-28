import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ sectionKey: string }> }) {
  try {
    const { sectionKey } = await params;
    const { contentJson } = await req.json();

    const updatedContent = await prisma.landingContent.upsert({
      where: { sectionKey },
      update: { contentJson },
      create: { sectionKey, contentJson },
    });

    return NextResponse.json({ success: true, content: updatedContent });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
