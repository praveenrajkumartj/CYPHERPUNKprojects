import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');
    const locationType = searchParams.get('locationType');
    const query = searchParams.get('query');

    const events = await prisma.event.findMany({
      where: {
        AND: [
          type ? { type } : {},
          locationType ? { locationType } : {},
          query ? {
            OR: [
              { title: { contains: query, mode: 'insensitive' } },
              { description: { contains: query, mode: 'insensitive' } },
            ]
          } : {},
        ]
      },
      include: {
        organizer: {
          select: { name: true }
        },
        _count: {
          select: { attendees: true }
        }
      },
      orderBy: { date: 'asc' }
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error('Events GET error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || !['ORGANIZER', 'ADMIN'].includes(session.role as string)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, description, type, locationType, date } = await req.json();

    const event = await prisma.event.create({
      data: {
        title,
        description,
        type,
        locationType,
        date: new Date(date),
        organizerId: session.id as string,
      }
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error('Events POST error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
