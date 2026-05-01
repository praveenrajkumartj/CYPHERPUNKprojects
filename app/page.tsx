import prisma from '@/lib/prisma';
import HomePageClient from '@/components/HomePageClient';
import { getSession } from '@/lib/auth';

export default async function Home() {
  const session = await getSession();
  
  const latestEvents = await prisma.event.findMany({
    where: { status: 'published' },
    orderBy: { createdAt: 'desc' },
    take: 3
  });

  return <HomePageClient initialEvents={latestEvents} user={session} />;
}
