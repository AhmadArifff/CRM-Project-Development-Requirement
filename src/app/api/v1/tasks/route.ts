import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { order: 'asc' },
      include: { checklists: true, comments: true, assignee: true },
    });
    return NextResponse.json({ success: true, tasks });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { title, description, status, priority, dueDate, assigneeId, projectId } = await req.json();
    const task = await prisma.task.create({
      data: {
        title,
        description: description || '',
        status: status || 'BACKLOG',
        priority: priority || 'MEDIUM',
        dueDate: dueDate ? new Date(dueDate) : new Date(),
        assigneeId,
        projectId: projectId || 'proj_default_001',
      },
      include: { assignee: true },
    });
    return NextResponse.json({ success: true, task }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
