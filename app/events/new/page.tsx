import { redirect } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import Navbar from '@/components/Navbar';
import { ArrowLeft, Sparkles, Calendar, MapPin } from 'lucide-react';

async function createEvent(formData: FormData) {
  const session = await getSession();
  if (!session || !['ORGANIZER', 'ADMIN'].includes(session.role as string)) {
    redirect('/events');
  }

  const title = formData.get('title')?.toString();
  const description = formData.get('description')?.toString();
  const type = formData.get('type')?.toString();
  const locationType = formData.get('locationType')?.toString();
  const date = formData.get('date')?.toString();

  if (!title || !description || !type || !locationType || !date) {
    throw new Error('Missing required event fields.');
  }

  const event = await prisma.event.create({
    data: {
      title,
      description,
      type,
      locationType,
      date: new Date(date),
      organizerId: session.id as string,
    },
  });

  redirect(`/events/${event.id}`);
}

export default async function NewEventPage() {
  const session = await getSession();
  if (!session || !['ORGANIZER', 'ADMIN'].includes(session.role as string)) {
    redirect('/events');
  }

  return (
    <main className="min-h-screen bg-[#050510] text-white">
      <Navbar />

      <div className="container mx-auto px-6 py-24">
        <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.45em] text-cyan-300/80">Organizer studio</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">Create a new event</h1>
            <p className="mt-3 max-w-2xl text-slate-400">Publish your next hackathon, workshop, or meetup to the CyberPhunk community.</p>
          </div>
          <Link
            href="/events"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-cyan-100 transition hover:border-cyan-300/40 hover:bg-cyan-400/5"
          >
            <ArrowLeft size={16} /> Back to events
          </Link>
        </div>

        <div className="glass-panel rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-[0_0_80px_rgba(0,255,255,0.08)]">
          <form action={createEvent} className="grid gap-8">
            <div className="grid gap-6 lg:grid-cols-2">
              <label className="space-y-2 text-sm text-slate-300">
                <span className="font-semibold text-white">Event title</span>
                <input
                  name="title"
                  type="text"
                  placeholder="Neon Hackathon 2026"
                  className="w-full rounded-3xl border border-white/10 bg-[#050510]/80 px-5 py-4 text-white outline-none transition focus:border-cyan-300/40"
                />
              </label>

              <label className="space-y-2 text-sm text-slate-300">
                <span className="font-semibold text-white">Event type</span>
                <select
                  name="type"
                  className="w-full rounded-3xl border border-white/10 bg-[#050510]/80 px-5 py-4 text-white outline-none transition focus:border-cyan-300/40"
                >
                  <option value="hackathon">Hackathon</option>
                  <option value="workshop">Workshop</option>
                  <option value="meetup">Meetup</option>
                </select>
              </label>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <label className="space-y-2 text-sm text-slate-300">
                <span className="font-semibold text-white">Location type</span>
                <select
                  name="locationType"
                  className="w-full rounded-3xl border border-white/10 bg-[#050510]/80 px-5 py-4 text-white outline-none transition focus:border-cyan-300/40"
                >
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                </select>
              </label>

              <label className="space-y-2 text-sm text-slate-300">
                <span className="font-semibold text-white">Date & time</span>
                <input
                  name="date"
                  type="datetime-local"
                  className="w-full rounded-3xl border border-white/10 bg-[#050510]/80 px-5 py-4 text-white outline-none transition focus:border-cyan-300/40"
                />
              </label>
            </div>

            <label className="space-y-2 text-sm text-slate-300">
              <span className="font-semibold text-white">Description</span>
              <textarea
                name="description"
                rows={8}
                placeholder="Share the vision, format, and why builders should join..."
                className="w-full rounded-3xl border border-white/10 bg-[#050510]/80 px-5 py-4 text-white outline-none transition focus:border-cyan-300/40"
              />
            </label>

            <div className="grid gap-6 lg:grid-cols-[1fr_0.5fr] items-end">
              <div className="rounded-[1.8rem] border border-white/10 bg-[#07101f]/80 p-6">
                <div className="flex items-center gap-3 text-slate-300">
                  <Sparkles size={18} className="text-cyan-300" />
                  <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Organizer note</p>
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-300">Only organizers and admins can publish events. Every event is added directly to the CyberPhunk experience.</p>
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-3 rounded-3xl bg-cyan-400 px-6 py-4 text-sm font-semibold text-[#050510] shadow-[0_0_40px_rgba(0,255,255,0.22)] transition hover:scale-[1.02] hover:bg-cyan-300/95"
              >
                <Calendar size={18} /> Publish Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
