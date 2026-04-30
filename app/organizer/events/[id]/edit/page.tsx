import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import EventForm from '@/components/EventForm';
import { notFound, redirect } from 'next/navigation';
import { Edit3 } from 'lucide-react';

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getSession();
  if (!session) return null;

  const event = await prisma.event.findUnique({
    where: { id },
    include: {
      speakers: true,
      schedules: true,
    }
  });

  if (!event) notFound();
  if (event.organizerId !== session.id) redirect('/organizer');

  return (
    <div className="space-y-12">
      <header className="flex items-center gap-6">
        <div className="w-16 h-16 rounded-[1.5rem] bg-pink-500/10 flex items-center justify-center border border-pink-500/20 text-pink-500">
           <Edit3 size={32} />
        </div>
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white">Modify <span className="text-pink-500">Sequence</span></h1>
          <p className="text-slate-500 font-mono text-sm uppercase tracking-widest">Editing: {event.title}</p>
        </div>
      </header>

      <EventForm initialData={event} eventId={event.id} />
    </div>
  );
}
