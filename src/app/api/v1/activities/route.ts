import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const activities = await prisma.activity.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        lead: { select: { name: true, company: true } },
        user: { select: { name: true, avatar: true } },
      },
    });

    const mapped = activities.map((a) => ({
      id: a.id,
      type: a.type,
      title: a.title,
      description: a.description,
      date: a.date.toISOString(),
      leadName: a.lead?.name || undefined,
      userName: a.user?.name || undefined,
    }));

    return NextResponse.json({ success: true, data: mapped });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { type, title, description, userId, leadId } = await req.json();

    if (!type || !title || !userId) {
      return NextResponse.json({ success: false, message: 'type, title, and userId are required.' }, { status: 400 });
    }

    const activity = await prisma.activity.create({
      data: {
        type,
        title,
        description: description || '',
        userId: String(userId),
        leadId: leadId ? String(leadId) : undefined,
      },
    });

    return NextResponse.json({ success: true, data: activity }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
