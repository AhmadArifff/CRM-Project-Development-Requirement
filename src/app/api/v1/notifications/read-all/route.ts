import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH() {
  try {
    await prisma.notification.updateMany({
      data: { isRead: true },
    });

    return NextResponse.json({ success: true, message: 'All notifications marked as read.' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
