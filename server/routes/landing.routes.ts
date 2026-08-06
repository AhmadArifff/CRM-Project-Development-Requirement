import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';

const router = Router();

// GET /api/v1/landing-content
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const contents = await prisma.landingContent.findMany();
    res.json({ success: true, contents });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PATCH /api/v1/landing-content/:sectionKey
router.patch('/:sectionKey', async (req: Request, res: Response): Promise<void> => {
  try {
    const sectionKey = String(req.params.sectionKey);
    const { contentJson } = req.body;

    const updatedContent = await prisma.landingContent.upsert({
      where: { sectionKey },
      update: { contentJson },
      create: { sectionKey, contentJson },
    });

    res.json({ success: true, content: updatedContent });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
