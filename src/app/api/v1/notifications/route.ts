import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const notifications = await prisma.notification.findMany({
      orderBy: { createdAt: 'desc' },
    });

    const mapped = notifications.map((n) => ({
      id: n.id,
      type: n.type === 'NEW_LEAD' ? 'lead' : n.type === 'DEAL_UPDATE' ? 'deal' : n.type === 'TASK_ASSIGNED' ? 'task' : 'system',
      title: n.title,
      message: n.message,
      time: n.createdAt.toISOString(),
      read: n.isRead,
      isRead: n.isRead,
    }));

    return NextResponse.json({ success: true, data: mapped });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
