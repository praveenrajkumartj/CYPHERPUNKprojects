'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { getSession } from '@/lib/auth';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function uploadImage(formData: FormData) {
  const file = formData.get('file') as File;
  if (!file) return { success: false, message: 'No file provided' };

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = join(process.cwd(), 'public', 'uploads');
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (e) {}

    const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    const path = join(uploadDir, filename);
    await writeFile(path, buffer);

    return { success: true, url: `/uploads/${filename}` };
  } catch (err) {
    console.error(err);
    return { success: false, message: 'Upload failed' };
  }
}

async function getUserId() {
  const session = await getSession();
  return session ? (session.id as string) : null;
}

export async function rsvpEvent(eventId: string) {
  const userId = await getUserId();
  if (!userId) throw new Error('Unauthorized');

  try {
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: { _count: { select: { registrations: true, tickets: true } } }
    });

    if (!event) throw new Error('Event not found');
    if (event._count.registrations + event._count.tickets >= event.capacity) {
      return { success: false, message: 'Sold Out' };
    }

    await prisma.registration.create({
      data: {
        userId,
        eventId,
      },
    });
    revalidatePath(`/events/${eventId}`);
    revalidatePath('/dashboard');
    return { success: true };
  } catch (err: any) {
    if (err.code === 'P2002') {
      return { success: false, message: 'Already RSVPed' };
    }
    throw err;
  }
}

export async function bookTicket(eventId: string, type: string) {
  const userId = await getUserId();
  if (!userId) throw new Error('Unauthorized');

  const prices = {
    'Basic': 0,
    'Premium': 49.99,
    'VIP': 149.99
  };

  try {
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: { _count: { select: { registrations: true, tickets: true } } }
    });

    if (!event) throw new Error('Event not found');
    if (event._count.registrations + event._count.tickets >= event.capacity) {
      return { success: false, message: 'Sold Out' };
    }

    await prisma.ticket.create({
      data: {
        userId,
        eventId,
        type,
        price: prices[type as keyof typeof prices] || 0,
      },
    });
    revalidatePath(`/events/${eventId}`);
    revalidatePath('/dashboard');
    return { success: true };
  } catch (err) {
    throw err;
  }
}
export async function createEvent(data: any) {
  const userId = await getUserId();
  if (!userId) throw new Error('Unauthorized');

  const { title, description, longDescription, bannerImage, type, locationType, location, date, status, speakers, schedules, capacity } = data;

  try {
    const event = await prisma.event.create({
      data: {
        title,
        description,
        longDescription,
        bannerImage,
        type,
        locationType,
        location,
        date: new Date(date),
        capacity: Number(capacity) || 100,
        organizerId: userId,
        status: status || 'published',
        speakers: {
          create: speakers.map((s: any) => ({
            name: s.name,
            designation: s.designation,
            image: s.image,
          }))
        },
        schedules: {
          create: schedules.map((s: any) => ({
            time: s.time,
            title: s.title,
            description: s.description,
          }))
        }
      },
    });

    revalidatePath('/organizer');
    revalidatePath('/events');
    return { success: true, eventId: event.id };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function updateEvent(eventId: string, data: any) {
  const userId = await getUserId();
  if (!userId) throw new Error('Unauthorized');

  const { title, description, longDescription, bannerImage, type, locationType, location, date, status, speakers, schedules, capacity } = data;

  try {
    // Check ownership
    const existing = await prisma.event.findUnique({ where: { id: eventId } });
    if (!existing || existing.organizerId !== userId) throw new Error('Unauthorized');

    await prisma.$transaction([
      // Delete existing related data
      prisma.speaker.deleteMany({ where: { eventId } }),
      prisma.schedule.deleteMany({ where: { eventId } }),
      // Update event and create new related data
      prisma.event.update({
        where: { id: eventId },
        data: {
          title,
          description,
          longDescription,
          bannerImage,
          type,
          locationType,
          location,
          date: new Date(date),
          capacity: Number(capacity) || 100,
          status,
          speakers: {
            create: speakers.map((s: any) => ({
              name: s.name,
              designation: s.designation,
              image: s.image,
            }))
          },
          schedules: {
            create: schedules.map((s: any) => ({
              time: s.time,
              title: s.title,
              description: s.description,
            }))
          }
        }
      })
    ]);

    revalidatePath('/organizer');
    revalidatePath(`/events/${eventId}`);
    revalidatePath('/events');
    return { success: true };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function deleteEvent(eventId: string) {
  const userId = await getUserId();
  if (!userId) throw new Error('Unauthorized');

  try {
    // Check ownership
    const existing = await prisma.event.findUnique({ where: { id: eventId } });
    if (!existing || existing.organizerId !== userId) throw new Error('Unauthorized');

    await prisma.event.delete({ where: { id: eventId } });

    revalidatePath('/organizer');
    revalidatePath('/events');
    return { success: true };
  } catch (err) {
    console.error(err);
    throw err;
  }
}
