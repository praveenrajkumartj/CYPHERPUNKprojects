'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getActivities(page: number = 1, limit: number = 10) {
  try {
    const activities = await prisma.activityLog.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            name: true,
            id: true,
          }
        }
      }
    });
    return { success: true, activities };
  } catch (err) {
    console.error('Failed to fetch activities:', err);
    return { success: false, message: 'Failed to fetch activities' };
  }
}

export async function getTopMembers(limit: number = 6) {
  try {
    const members = await prisma.user.findMany({
      take: limit,
      orderBy: { contributionScore: 'desc' },
      include: {
        skills: {
          include: {
            skill: true
          }
        },
        _count: {
          select: {
            projects: true
          }
        }
      }
    });
    return { success: true, members };
  } catch (err) {
    console.error('Failed to fetch top members:', err);
    return { success: false, message: 'Failed to fetch top members' };
  }
}

export async function logActivity(type: string, message: string, userId?: string) {
  try {
    await prisma.activityLog.create({
      data: {
        type,
        message,
        userId,
      }
    });
    revalidatePath('/community');
    return { success: true };
  } catch (err) {
    console.error('Failed to log activity:', err);
    return { success: false };
  }
}

export async function getDiscordStats() {
  // Mocking Discord API response for now
  // In a real app, you'd fetch this from Discord API using a bot token or widget JSON
  return {
    success: true,
    serverName: 'CYBERPHUNK DAO',
    onlineCount: 1242,
    inviteLink: 'https://discord.gg/cyberphunk'
  };
}

export async function getTelegramStats() {
  return {
    success: true,
    channelName: 'CYBERPHUNK BROADCAST',
    subscribers: '15.4K',
    inviteLink: 'https://t.me/cyberphunk'
  };
}

export async function getMemberRank(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { contributionScore: true }
    });

    if (!user) return { success: false };

    const rank = await prisma.user.count({
      where: {
        contributionScore: {
          gt: user.contributionScore
        }
      }
    });

    return { success: true, rank: rank + 1 };
  } catch (err) {
    console.error('Failed to fetch rank:', err);
    return { success: false };
  }
}

export async function submitContactForm(data: { name: string, email: string, subject: string, message: string }) {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Contact form submission:', data);
    
    // In a real app, you'd send an email or save to DB here
    // e.g. await prisma.contactMessage.create({ data });
    
    return { success: true };
  } catch (err) {
    console.error('Contact submission error:', err);
    return { success: false };
  }
}
