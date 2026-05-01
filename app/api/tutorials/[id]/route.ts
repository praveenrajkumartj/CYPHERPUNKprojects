import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const tutorial = await prisma.tutorial.findUnique({
      where: { id },
      include: { lessons: { orderBy: { order: 'asc' } } },
    });

    if (!tutorial) {
      return NextResponse.json({ error: 'Tutorial not found' }, { status: 404 });
    }

    return NextResponse.json(tutorial, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching tutorial:', error);
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

    const { title, description, category, difficulty, thumbnail } = await req.json();

    const tutorial = await prisma.tutorial.update({
      where: { id },
      data: {
        title: title,
        description: description,
        category: category,
        difficulty: difficulty,
        thumbnail: thumbnail,
      },
      include: { lessons: { orderBy: { order: 'asc' } } },
    });

    return NextResponse.json(tutorial, { status: 200 });
  } catch (error: any) {
    console.error('Error updating tutorial:', error);
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

    await prisma.tutorial.delete({ where: { id } });

    return NextResponse.json({ message: 'Tutorial deleted' }, { status: 200 });
  } catch (error: any) {
    console.error('Error deleting tutorial:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
