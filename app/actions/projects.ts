'use server';
// Triggering recompile for new Prisma schema


import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/auth';

async function getUserId() {
  const session = await getSession();
  return session ? (session.id as string) : null;
}

// -----------------------------------
// PROJECT ACTIONS
// -----------------------------------

export async function createProject(data: {
  title: string;
  description: string;
  teamSize: number;
  status: string;
  skills: string[];
}) {
  const userId = await getUserId();
  if (!userId) throw new Error('Unauthorized');

  const { title, description, teamSize, status, skills } = data;

  try {
    const project = await prisma.project.create({
      data: {
        title,
        description,
        teamSize: Number(teamSize),
        status,
        createdBy: userId,
        skills: {
          create: await Promise.all(
            skills.map(async (skillName) => {
              const skill = await prisma.skill.upsert({
                where: { name: skillName.toLowerCase() },
                update: {},
                create: { name: skillName.toLowerCase() },
              });
              return { skillId: skill.id };
            })
          ),
        },
      },
    });

    revalidatePath('/projects');
    return { success: true, projectId: project.id };
  } catch (error) {
    console.error('Create project error:', error);
    return { success: false, message: 'Failed to create project' };
  }
}

export async function getProjects(filters?: {
  query?: string;
  skills?: string[];
  status?: string;
}) {
  try {
    const projects = await prisma.project.findMany({
      where: {
        OR: filters?.query ? [
          { title: { contains: filters.query, mode: 'insensitive' } },
          { description: { contains: filters.query, mode: 'insensitive' } },
        ] : undefined,
        status: filters?.status || undefined,
        skills: filters?.skills && filters.skills.length > 0 ? {
          some: {
            skill: {
              name: { in: filters.skills.map(s => s.toLowerCase()) }
            }
          }
        } : undefined,
      },
      include: {
        creator: { include: { profile: true } },
        skills: { include: { skill: true } },
        _count: { select: { bounties: true, applications: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return projects;
  } catch (error) {
    console.error('Get projects error:', error);
    return [];
  }
}

export async function getProjectById(id: string) {
  try {
    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        creator: { include: { profile: true } },
        skills: { include: { skill: true } },
        bounties: {
          include: { 
            assignee: { include: { profile: true } },
            applications: { include: { user: { include: { profile: true } } } }
          },
          orderBy: { createdAt: 'desc' },
        },
        applications: {
          include: { user: { include: { profile: true } } },
        },
      },
    });
    return project;
  } catch (error) {
    console.error('Get project by id error:', error);
    return null;
  }
}

export async function applyToProject(projectId: string) {
  const userId = await getUserId();
  if (!userId) throw new Error('Unauthorized');

  try {
    await prisma.projectApplication.create({
      data: {
        projectId,
        userId,
        status: 'PENDING',
      },
    });
    revalidatePath(`/projects/${projectId}`);
    return { success: true };
  } catch (error: any) {
    if (error.code === 'P2002') {
      return { success: false, message: 'Already applied to this project' };
    }
    return { success: false, message: 'Failed to apply' };
  }
}

export async function updateProjectApplicationStatus(applicationId: string, status: 'ACCEPTED' | 'REJECTED') {
  const userId = await getUserId();
  if (!userId) throw new Error('Unauthorized');

  try {
    const application = await prisma.projectApplication.findUnique({
      where: { id: applicationId },
      include: { project: true },
    });

    if (!application || application.project.createdBy !== userId) {
      throw new Error('Unauthorized');
    }

    await prisma.projectApplication.update({
      where: { id: applicationId },
      data: { status },
    });

    revalidatePath(`/projects/${application.projectId}`);
    return { success: true };
  } catch (error) {
    console.error('Update application error:', error);
    return { success: false, message: 'Failed to update application' };
  }
}

// -----------------------------------
// BOUNTY ACTIONS
// -----------------------------------

export async function createBounty(data: {
  projectId: string;
  title: string;
  description: string;
  rewardAmount: number;
  rewardType: string;
  deadline: string;
}) {
  const userId = await getUserId();
  if (!userId) throw new Error('Unauthorized');

  try {
    const project = await prisma.project.findUnique({ where: { id: data.projectId } });
    if (!project || project.createdBy !== userId) throw new Error('Unauthorized');

    const bounty = await prisma.bounty.create({
      data: {
        ...data,
        rewardAmount: Number(data.rewardAmount),
        deadline: new Date(data.deadline),
      },
    });

    revalidatePath(`/projects/${data.projectId}`);
    return { success: true, bountyId: bounty.id };
  } catch (error) {
    console.error('Create bounty error:', error);
    return { success: false, message: 'Failed to create bounty' };
  }
}

export async function applyToBounty(bountyId: string) {
  const userId = await getUserId();
  if (!userId) throw new Error('Unauthorized');

  try {
    await prisma.bountyApplication.create({
      data: {
        bountyId,
        userId,
        status: 'PENDING',
      },
    });
    return { success: true };
  } catch (error: any) {
    if (error.code === 'P2002') {
      return { success: false, message: 'Already applied for this bounty' };
    }
    return { success: false, message: 'Failed to apply' };
  }
}

export async function assignBounty(bountyId: string, userId: string) {
  const currentUserId = await getUserId();
  if (!currentUserId) throw new Error('Unauthorized');

  try {
    const bounty = await prisma.bounty.findUnique({
      where: { id: bountyId },
      include: { project: true },
    });

    if (!bounty || bounty.project.createdBy !== currentUserId) {
      throw new Error('Unauthorized');
    }

    await prisma.bounty.update({
      where: { id: bountyId },
      data: {
        assignedTo: userId,
        status: 'in_progress',
      },
    });

    revalidatePath(`/projects/${bounty.projectId}`);
    return { success: true };
  } catch (error) {
    console.error('Assign bounty error:', error);
    return { success: false, message: 'Failed to assign bounty' };
  }
}

export async function markBountyComplete(bountyId: string) {
  const currentUserId = await getUserId();
  if (!currentUserId) throw new Error('Unauthorized');

  try {
    const bounty = await prisma.bounty.findUnique({
      where: { id: bountyId },
      include: { project: true },
    });

    if (!bounty || bounty.project.createdBy !== currentUserId) {
      throw new Error('Unauthorized');
    }

    await prisma.bounty.update({
      where: { id: bountyId },
      data: { status: 'completed' },
    });

    revalidatePath(`/projects/${bounty.projectId}`);
    return { success: true };
  } catch (error) {
    console.error('Complete bounty error:', error);
    return { success: false, message: 'Failed to complete bounty' };
  }
}

export async function getMyProjects() {
  const userId = await getUserId();
  if (!userId) return [];

  try {
    const projects = await prisma.project.findMany({
      where: { createdBy: userId },
      include: {
        skills: { include: { skill: true } },
        _count: { select: { bounties: true, applications: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
    return projects;
  } catch (error) {
    console.error('Get my projects error:', error);
    return [];
  }
}

export async function getAllBounties() {
  try {
    const bounties = await prisma.bounty.findMany({
      include: {
        project: true,
        assignee: { include: { profile: true } },
        applications: { include: { user: { include: { profile: true } } } }
      },
      orderBy: { createdAt: 'desc' },
    });
    return bounties;
  } catch (error) {
    console.error('Get all bounties error:', error);
    return [];
  }
}