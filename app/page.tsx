import prisma from '@/lib/prisma';
import HomePageClient from '@/components/HomePageClient';

export default async function Home() {
  const latestEvents = await prisma.event.findMany({
    where: { status: 'published' },
    orderBy: { createdAt: 'desc' },
    take: 3
  });

  return <HomePageClient initialEvents={latestEvents} />;
}
