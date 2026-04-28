import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const eventId = params.id;
    const userId = session.id as string;

    const rsvp = await prisma.eventAttendee.create({
      data: {
        userId,
        eventId,
      }
    });

    return NextResponse.json(rsvp, { status: 201 });
  } catch (error) {
    console.error('RSVP POST error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const eventId = params.id;
    const userId = session.id as string;

    await prisma.eventAttendee.delete({
      where: {
        userId_eventId: {
          userId,
          eventId,
        }
      }
    });

    return NextResponse.json({ message: 'RSVP removed' });
  } catch (error) {
    console.error('RSVP DELETE error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
