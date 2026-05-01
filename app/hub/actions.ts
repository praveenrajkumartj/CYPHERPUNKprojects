'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// ARTICLE ACTIONS
export async function getArticles(limit?: number) {
  try {
    const articles = await prisma.article.findMany({
      where: { published: true },
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        author: {
          select: { name: true, role: true }
        }
      }
    });
    return { success: true, articles };
  } catch (err) {
    console.error('Failed to fetch articles:', err);
    return { success: false, error: 'Database error' };
  }
}

export async function getArticleById(id: string) {
  try {
    const article = await prisma.article.findUnique({
      where: { id },
      include: {
        author: {
          select: { name: true, role: true, bio: true }
        }
      }
    });
    return { success: true, article };
  } catch (err) {
    console.error('Failed to fetch article:', err);
    return { success: false, error: 'Database error' };
  }
}

// TUTORIAL ACTIONS
export async function getTutorials(category?: string) {
  try {
    const tutorials = await prisma.tutorial.findMany({
      where: category ? { category } : {},
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { lessons: true }
        }
      }
    });
    return { success: true, tutorials };
  } catch (err) {
    console.error('Failed to fetch tutorials:', err);
    return { success: false, error: 'Database error' };
  }
}

export async function getTutorialById(id: string) {
  try {
    const tutorial = await prisma.tutorial.findUnique({
      where: { id },
      include: {
        lessons: {
          orderBy: { order: 'asc' }
        }
      }
    });
    return { success: true, tutorial };
  } catch (err) {
    console.error('Failed to fetch tutorial:', err);
    return { success: false, error: 'Database error' };
  }
}

// SESSION ACTIONS
export async function getResourceSessions() {
  try {
    const sessions = await prisma.resourceSession.findMany({
      orderBy: { date: 'desc' }
    });
    return { success: true, sessions };
  } catch (err) {
    console.error('Failed to fetch sessions:', err);
    return { success: false, error: 'Database error' };
  }
}
// GUIDE ACTIONS
export async function getGuides() {
  try {
    const guides = await prisma.hackathonGuide.findMany({
      include: {
        sections: {
          orderBy: { order: 'asc' }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    return { success: true, guides };
  } catch (err) {
    console.error('Failed to fetch guides:', err);
    return { success: false, error: 'Database error' };
  }
}
