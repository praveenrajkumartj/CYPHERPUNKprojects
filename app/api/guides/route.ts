import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const guides = await prisma.hackathonGuide.findMany({
      include: { sections: { orderBy: { order: 'asc' } } },
      orderBy: { createdAt: 'desc' },
    });

    return new Response(JSON.stringify(guides || []), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error: any) {
    console.error('Error fetching guides:', error);
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

    const { title, description, sections } = await req.json();

    if (!title || !description) {
      return NextResponse.json(
        { error: 'Title and description are required' },
        { status: 400 }
      );
    }

    const guide = await prisma.hackathonGuide.create({
      data: {
        title,
        description,
        sections: sections
          ? {
              create: sections.map((section: any, index: number) => ({
                title: section.title,
                content: section.content,
                order: index,
              })),
            }
          : undefined,
      },
      include: { sections: { orderBy: { order: 'asc' } } },
    });

    return NextResponse.json(guide, { status: 201 });
  } catch (error: any) {
    console.error('Error creating guide:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
