import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const providers = await prisma.aiProvider.findMany({
      orderBy: { name: 'asc' },
    });

    const maskedProviders = providers.map((p) => ({
      ...p,
      apiKey: p.apiKey ? `${p.apiKey.slice(0, 7)}...${p.apiKey.slice(-4)}` : '',
    }));

    return NextResponse.json({ success: true, providers: maskedProviders });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { providerKey, name, apiKey, isActive, selectedModel } = await req.json();

    const provider = await prisma.aiProvider.upsert({
      where: { providerKey },
      update: { apiKey, isActive, selectedModel },
      create: { providerKey, name, apiKey, isActive, selectedModel },
    });

    return NextResponse.json({ success: true, provider });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
