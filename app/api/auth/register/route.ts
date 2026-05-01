import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { setSession } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, role } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const validRoles = ['MEMBER', 'ORGANIZER'];
    const userRole = validRoles.includes(role) ? role : 'MEMBER';

    const existingUser = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true }
    });

    if (existingUser) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a unique default username from email
    const baseUsername = email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '');
    let username = baseUsername;
    let count = 1;
    while (await prisma.user.findFirst({ where: { username }, select: { id: true } })) {
      username = `${baseUsername}${count}`;
      count++;
    }

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role: userRole,
        profile: {
          create: {
            name: name,
            bio: "New builder on the protocol.",
          }
        }
      },
    });

    const sessionData = {
      id: user.id,
      name: name,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    await setSession(sessionData);

    return NextResponse.json({ user: sessionData }, { status: 201 });
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
