import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const tag = searchParams.get('tag');
    const eventName = searchParams.get('eventName');

    const where: any = {};
    if (tag) where.tags = { has: tag };
    if (eventName) where.eventName = eventName;

    const sessions = await prisma.resourceSession.findMany({
      where,
      orderBy: { date: 'desc' },
    });

    return new Response(JSON.stringify(sessions || []), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error: any) {
    console.error('Error fetching sessions:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, description, videoUrl, thumbnail, eventName, tags } = await req.json();

    if (!title || !videoUrl) {
      return NextResponse.json(
        { error: 'Title and videoUrl are required' },
        { status: 400 }
      );
    }

    const newSession = await prisma.resourceSession.create({
      data: {
        title,
        description,
        videoUrl,
        thumbnail,
        eventName,
        tags: tags || [],
      },
    });

    return NextResponse.json(newSession, { status: 201 });
  } catch (error: any) {
    console.error('Error creating session:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
