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

// DELETE /api/v1/tasks/master-labels/:id
router.delete('/master-labels/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    await prisma.masterLabel.delete({ where: { id: String(req.params.id) } });
    res.json({ success: true, message: 'Label deleted' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/v1/tasks
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, status, priority, dueDate, assigneeId, projectId } = req.body;
    const task = await prisma.task.create({
      data: {
        title,
        description: description || '',
        status: status || 'BACKLOG',
        priority: priority || 'MEDIUM',
        dueDate: dueDate || new Date(),
        assigneeId,
        projectId: projectId || 'proj_default_001',
      },
      include: { assignee: true }
    });
    res.status(201).json({ success: true, task });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PATCH /api/v1/tasks/:id
router.patch('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, description, priority, title } = req.body;
    const task = await prisma.task.update({
      where: { id: String(req.params.id) },
      data: {
        ...(status && { status }),
        ...(description !== undefined && { description }),
        ...(priority && { priority }),
        ...(title && { title }),
      },
    });
    res.json({ success: true, task });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/v1/tasks/:id/checklists
router.post('/:id/checklists', async (req: Request, res: Response): Promise<void> => {
  try {
    const checklist = await prisma.taskChecklist.create({
      data: { text: req.body.text, taskId: String(req.params.id) },
    });
    res.status(201).json({ success: true, checklist });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PATCH /api/v1/tasks/checklists/:id
router.patch('/checklists/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const checklist = await prisma.taskChecklist.update({
      where: { id: String(req.params.id) },
      data: { completed: req.body.completed },
    });
    res.json({ success: true, checklist });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/v1/tasks/:id/comments
router.post('/:id/comments', async (req: Request, res: Response): Promise<void> => {
  try {
    const comment = await prisma.taskComment.create({
      data: {
        text: req.body.text,
        taskId: String(req.params.id),
        authorName: req.body.authorName || 'Guest',
        authorAvatar: req.body.authorAvatar,
      },
    });
    res.status(201).json({ success: true, comment });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
