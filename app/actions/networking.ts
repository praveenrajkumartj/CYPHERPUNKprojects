'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/auth';

async function getUserId() {
  const session = await getSession();
  return session ? (session.id as string) : null;
}

export async function updateProfile(data: {
  username: string;
  name: string;
  bio?: string;
  location?: string;
  walletAddress?: string;
  githubUrl?: string;
  twitterUrl?: string;
  linkedinUrl?: string;
  lookingForTeam: boolean;
  hiring: boolean;
  skills: string[];
}) {
  const userId = await getUserId();
  if (!userId) throw new Error('Unauthorized');

  const { username, name, bio, location, walletAddress, githubUrl, twitterUrl, linkedinUrl, lookingForTeam, hiring, skills } = data;

  try {
    // 1. Update User username
    await prisma.user.update({
      where: { id: userId },
      data: { username: username as any },
    });

    // 2. Upsert Profile
    await prisma.profile.upsert({
      where: { userId },
      create: {
        userId,
        name,
        bio,
        location,
        walletAddress,
        githubUrl,
        twitterUrl,
        linkedinUrl,
        lookingForTeam,
        hiring,
      },
      update: {
        name,
        bio,
        location,
        walletAddress,
        githubUrl,
        twitterUrl,
        linkedinUrl,
        lookingForTeam,
        hiring,
      },
    });

    // 3. Handle Skills
    // First, ensure all skills exist in the Skill table
    if (skills && skills.length > 0) {
      await Promise.all(
        skills.map((skillName) =>
          prisma.skill.upsert({
            where: { name: skillName.toLowerCase() },
            update: {},
            create: { name: skillName.toLowerCase() },
          })
        )
      );

      // Get skill IDs
      const skillObjects = await prisma.skill.findMany({
        where: { name: { in: skills.map((s) => s.toLowerCase()) } },
      });

      // Clear existing user skills and add new ones
      await prisma.userSkill.deleteMany({ where: { userId } });
      await prisma.userSkill.createMany({
        data: skillObjects.map((s) => ({
          userId,
          skillId: s.id,
        })),
      });
    }

    revalidatePath('/profile');
    revalidatePath(`/user/${username}`);
    return { success: true };
  } catch (error: any) {
    console.error('Profile update error:', error);
    if (error.code === 'P2002') {
      return { success: false, message: 'Username already taken' };
    }
    return { success: false, message: 'Failed to update profile' };
  }
}

export async function getPublicProfile(username: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { username },
      include: {
        profile: true,
        skills: {
          include: { skill: true },
        },
      },
    });

    if (!user) return null;

    const currentUserId = await getUserId();
    let connectionStatus = null;

    if (currentUserId && currentUserId !== user.id) {
      const connection = await prisma.connection.findFirst({
        where: {
          OR: [
            { senderId: currentUserId, receiverId: user.id },
            { senderId: user.id, receiverId: currentUserId },
          ],
        },
      });
      connectionStatus = connection ? connection.status : null;
    }

    return {
      ...user,
      connectionStatus,
    };
  } catch (error) {
    console.error('Error fetching public profile:', error);
    return null;
  }
}

export async function sendConnectionRequest(receiverId: string) {
  const senderId = await getUserId();
  if (!senderId) throw new Error('Unauthorized');
  if (senderId === receiverId) throw new Error('Cannot connect with yourself');

  try {
    await prisma.connection.create({
      data: {
        senderId,
        receiverId,
        status: 'PENDING',
      },
    });
    revalidatePath('/network');
    return { success: true };
  } catch (error) {
    console.error('Connection request error:', error);
    return { success: false, message: 'Failed to send request' };
  }
}

export async function handleConnectionRequest(connectionId: string, status: 'ACCEPTED' | 'REJECTED') {
  const userId = await getUserId();
  if (!userId) throw new Error('Unauthorized');

  try {
    const connection = await prisma.connection.findUnique({
      where: { id: connectionId },
    });

    if (!connection || connection.receiverId !== userId) {
      throw new Error('Unauthorized or connection not found');
    }

    await prisma.connection.update({
      where: { id: connectionId },
      data: { status },
    });

    revalidatePath('/dashboard');
    revalidatePath('/network');
    return { success: true };
  } catch (error) {
    console.error('Handle connection error:', error);
    return { success: false, message: 'Failed to process request' };
  }
}

export async function getNetworkUsers(filters: {
  query?: string;
  skills?: string[];
  lookingForTeam?: boolean;
  hiring?: boolean;
}) {
  const currentUserId = await getUserId();

  try {
    const users = await prisma.user.findMany({
      where: {
        id: { not: currentUserId || undefined },
        OR: filters.query ? [
          { username: { contains: filters.query, mode: 'insensitive' } },
          { profile: { name: { contains: filters.query, mode: 'insensitive' } } },
        ] : undefined,
        profile: {
          lookingForTeam: filters.lookingForTeam || undefined,
          hiring: filters.hiring || undefined,
        },
        skills: filters.skills && filters.skills.length > 0 ? {
          some: {
            skill: {
              name: { in: filters.skills.map(s => s.toLowerCase()) }
            }
          }
        } : undefined,
      },
      include: {
        profile: true,
        skills: {
          include: { skill: true },
        },
        receivedConnections: currentUserId ? {
          where: { senderId: currentUserId }
        } : false,
        sentConnections: currentUserId ? {
          where: { receiverId: currentUserId }
        } : false,
      },
      take: 20,
    });

    return users.map(user => ({
      ...user,
      connection: user.receivedConnections?.[0] || user.sentConnections?.[0] || null,
    }));
  } catch (error) {
    console.error('Error fetching network users:', error);
    return [];
  }
}
