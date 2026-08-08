import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';

const router = Router();

// GET /api/v1/notifications — Fetch all notifications from database
router.get('/', async (req: Request, res: Response): Promise<void> => {
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

    res.json({ success: true, data: mapped });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PATCH /api/v1/notifications/:id/read — Mark single notification as read
router.patch('/:id/read', async (req: Request, res: Response): Promise<void> => {
  try {
    const notification = await prisma.notification.update({
      where: { id: String(req.params.id) },
      data: { isRead: true },
    });

    res.json({ success: true, data: notification });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PATCH /api/v1/notifications/read-all — Mark all notifications as read
router.patch('/read-all', async (req: Request, res: Response): Promise<void> => {
  try {
    await prisma.notification.updateMany({
      data: { isRead: true },
    });

    res.json({ success: true, message: 'All notifications marked as read.' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
