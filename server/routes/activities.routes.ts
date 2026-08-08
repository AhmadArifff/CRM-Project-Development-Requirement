import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';

const router = Router();

// GET /api/v1/activities — Fetch all activities from database
router.get('/', async (req: Request, res: Response): Promise<void> => {
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

    res.json({ success: true, data: mapped });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/v1/activities — Create a new activity
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { type, title, description, userId, leadId } = req.body;

    if (!type || !title || !userId) {
      res.status(400).json({ success: false, message: 'type, title, and userId are required.' });
      return;
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

    res.status(201).json({ success: true, data: activity });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
