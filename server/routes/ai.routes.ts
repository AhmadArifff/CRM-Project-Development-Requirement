import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';

const router = Router();

// GET /api/v1/ai/providers
router.get('/providers', async (req: Request, res: Response): Promise<void> => {
  try {
    const providers = await prisma.aiProvider.findMany({
      orderBy: { name: 'asc' },
    });
    
    // Mask API Keys for security before returning
    const maskedProviders = providers.map(p => ({
      ...p,
      apiKey: p.apiKey ? `${p.apiKey.slice(0, 7)}...${p.apiKey.slice(-4)}` : '',
    }));

    res.json({ success: true, providers: maskedProviders });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/v1/ai/providers
router.post('/providers', async (req: Request, res: Response): Promise<void> => {
  try {
    const { providerKey, name, apiKey, isActive, selectedModel } = req.body;

    const provider = await prisma.aiProvider.upsert({
      where: { providerKey },
      update: { apiKey, isActive, selectedModel },
      create: { providerKey, name, apiKey, isActive, selectedModel },
    });

    res.json({ success: true, provider });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
