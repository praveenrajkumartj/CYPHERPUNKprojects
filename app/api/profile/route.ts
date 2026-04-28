import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const user = await prisma.user.findUnique({
      where: { id: session.id as string },
      include: {
        skills: {
          include: { skill: true }
        }
      }
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { name, bio, location, walletAddress, skills } = await req.json();

    const user = await prisma.user.update({
      where: { id: session.id as string },
      data: {
        name,
        bio,
        location,
        walletAddress,
      }
    });

    // Handle skills (simplified: clear and re-add)
    if (skills) {
      await prisma.userSkill.deleteMany({
        where: { userId: user.id }
      });

      for (const skillName of skills) {
        const skill = await prisma.skill.upsert({
          where: { name: skillName },
          update: {},
          create: { name: skillName }
        });

        await prisma.userSkill.create({
          data: {
            userId: user.id,
            skillId: skill.id
          }
        });
      }
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Profile PUT error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
