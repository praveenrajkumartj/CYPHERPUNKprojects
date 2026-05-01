import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const guide = await prisma.hackathonGuide.findUnique({
      where: { id },
      include: { sections: { orderBy: { order: 'asc' } } },
    });

    if (!guide) {
      return NextResponse.json({ error: 'Guide not found' }, { status: 404 });
    }

    return NextResponse.json(guide, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching guide:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getSession();
    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, description } = await req.json();

    const guide = await prisma.hackathonGuide.update({
      where: { id },
      data: {
        title: title,
        description: description,
      },
      include: { sections: { orderBy: { order: 'asc' } } },
    });

    return NextResponse.json(guide, { status: 200 });
  } catch (error: any) {
    console.error('Error updating guide:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getSession();
    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await prisma.hackathonGuide.delete({ where: { id } });

    return NextResponse.json({ message: 'Guide deleted' }, { status: 200 });
  } catch (error: any) {
    console.error('Error deleting guide:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
