import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const projectId = params.id;
    const userId = session.id as string;

    const application = await prisma.projectApplication.create({
      data: {
        projectId,
        userId,
      }
    });

    return NextResponse.json(application, { status: 201 });
  } catch (error) {
    console.error('Project apply error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
