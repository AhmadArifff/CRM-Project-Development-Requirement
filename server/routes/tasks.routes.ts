import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';

const router = Router();

// GET /api/v1/tasks
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { order: 'asc' },
      include: { checklists: true, comments: true, assignee: true },
    });
    res.json({ success: true, tasks });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/v1/tasks/master-labels
router.get('/master-labels', async (req: Request, res: Response): Promise<void> => {
  try {
    const labels = await prisma.masterLabel.findMany({
      orderBy: { name: 'asc' },
    });
    res.json({ success: true, labels });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/v1/tasks/master-labels
router.post('/master-labels', async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, color, bgClass, textClass, borderClass } = req.body;
    const label = await prisma.masterLabel.create({
      data: { name, color, bgClass, textClass, borderClass },
    });
    res.status(201).json({ success: true, label });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
