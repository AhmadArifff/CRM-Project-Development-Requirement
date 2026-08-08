import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';

const router = Router();

// GET /api/v1/leads
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
      include: { deals: true },
    });
    res.json({ success: true, leads });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/v1/leads
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, company, email, phone, notes, appTitle, prdFileUrl } = req.body;
    const lead = await prisma.lead.create({
      data: {
        name,
        company,
        email,
        phone,
        notes,
        appTitle,
        prdFileUrl,
        status: 'NEW',
      },
    });
    res.status(201).json({ success: true, lead });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/v1/leads/:id/convert (1-Click Lead-to-Deal Conversion)
router.post('/:id/convert', async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const lead = await prisma.lead.findUnique({ where: { id } });

    if (!lead) {
      res.status(404).json({ success: false, message: 'Lead not found' });
      return;
    }

    // Create deal from lead data
    const deal = await prisma.deal.create({
      data: {
        title: `Deal — ${lead.appTitle || lead.company || lead.name}`,
        value: 15000000.00,
        stage: 'NEW_LEAD',
        leadId: lead.id,
        description: `Konversi otomatis dari Lead ${lead.name} (${lead.email}). Notes: ${lead.notes || 'N/A'}`,
      },
    });

    // Update lead status to CONVERTED
    await prisma.lead.update({
      where: { id: lead.id },
      data: { status: 'CONVERTED' },
    });

    res.json({
      success: true,
      message: 'Lead converted to deal successfully!',
      deal,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PATCH /api/v1/leads/:id
router.patch('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, notes } = req.body;
    const lead = await prisma.lead.update({
      where: { id: String(req.params.id) },
      data: {
        ...(status && { status }),
        ...(notes !== undefined && { notes }),
      },
    });
    res.json({ success: true, lead });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
