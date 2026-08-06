import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';

const router = Router();

// GET /api/v1/deals
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const deals = await prisma.deal.findMany({
      orderBy: { order: 'asc' },
      include: { lead: true, owner: true },
    });
    res.json({ success: true, deals });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PATCH /api/v1/deals/:id
router.patch('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const { stage, value, title, description, order } = req.body;

    const updatedDeal = await prisma.deal.update({
      where: { id },
      data: {
        ...(stage && { stage }),
        ...(value !== undefined && { value }),
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(order !== undefined && { order }),
      },
    });

    res.json({ success: true, deal: updatedDeal });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
