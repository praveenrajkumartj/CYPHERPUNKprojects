import prisma from '@/lib/prisma';
import ProgramsPageClient from '@/components/ProgramsPageClient';

export default async function ProgramsPage() {
  const events = await prisma.event.findMany({
    where: { status: 'published' },
    orderBy: { date: 'asc' }
  });

  return <ProgramsPageClient initialEvents={events} />;
}
