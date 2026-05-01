import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const projects = await prisma.project.findMany({
      include: {
        creator: {
          select: { name: true }
        },
        _count: {
          select: { applications: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { title, description } = await req.json();

    const project = await prisma.project.create({
      data: {
        title,
        description,
        createdBy: session.id as string,
      }
    });

    // Log community activity
    await prisma.activityLog.create({
      data: {
        type: 'PROJECT_CREATED',
        message: `created a new project: ${title}`,
        userId: session.id as string,
      }
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
