import { Metadata } from 'next';
import prisma from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import { Calendar, MapPin, Users, Clock, Share2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import RSVPButton from '@/components/RSVPButton';
import { getSession } from '@/lib/auth';

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = await prisma.event.findUnique({
    where: { id: params.id },
  });
  return {
    title: `${event?.title || 'Event'} | Cyberphunk`,
    description: event?.description,
  };
}

export default async function EventDetailPage({ params }: Props) {
  const event = await prisma.event.findUnique({
    where: { id: params.id },
    include: {
      organizer: {
        select: { name: true, bio: true }
      },
      _count: {
        select: { attendees: true }
      },
      attendees: {
        include: {
          user: {
            select: { name: true, image: true } // Assuming image field might be added later, using name for now
          }
        },
        take: 12
      }
    }
  });

  if (!event) {
    return (
      <main className="min-h-screen bg-dark-300 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Event not found</h1>
          <Link href="/events" className="text-primary font-bold">Back to events</Link>
        </div>
      </main>
    );
  }

  const session = await getSession();
  const isRSVPed = session ? await prisma.eventAttendee.findUnique({
    where: {
      userId_eventId: {
        userId: session.id as string,
        eventId: event.id
      }
    }
  }) : false;

  return (
    <main className="min-h-screen bg-dark-300">
      <Navbar />

      <div className="pt-32 pb-20 container mx-auto px-6">
        <Link href="/events" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-8 group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to all events
        </Link>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
                  {event.type}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs font-bold uppercase tracking-wider">
                  {event.locationType}
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-tight">
                {event.title}
              </h1>
              
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 py-8 border-y border-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Date</p>
                    <p className="font-semibold">{format(new Date(event.date), 'MMMM dd, yyyy')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Time</p>
                    <p className="font-semibold">{format(new Date(event.date), 'hh:mm a')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Location</p>
                    <p className="font-semibold capitalize">{event.locationType}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold">About the Event</h2>
              <div className="text-slate-400 leading-relaxed text-lg whitespace-pre-wrap">
                {event.description}
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Attendees ({event._count.attendees})</h2>
              <div className="flex flex-wrap gap-4">
                {event.attendees.map((attendee, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center border border-white/10 overflow-hidden">
                      <span className="font-bold text-slate-500">{attendee.user.name.charAt(0)}</span>
                    </div>
                    <span className="text-xs text-slate-500 truncate w-16 text-center">{attendee.user.name.split(' ')[0]}</span>
                  </div>
                ))}
                {event._count.attendees > 12 && (
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-slate-500">
                    +{event._count.attendees - 12}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="glass-card p-8 rounded-[2rem] sticky top-32">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Registration</p>
                  <p className="text-2xl font-bold">Free Entry</p>
                </div>
                <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                  <Share2 size={20} />
                </button>
              </div>

              <RSVPButton 
                eventId={event.id} 
                initialIsRSVPed={!!isRSVPed} 
                isAuthenticated={!!session} 
              />

              <p className="text-center text-xs text-slate-500 mt-6">
                Limited slots available. Secure your spot now!
              </p>
            </div>

            <div className="glass-card p-8 rounded-[2rem]">
              <h3 className="text-lg font-bold mb-6">Organizer</h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-xl font-bold">
                  {event.organizer.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold">{event.organizer.name}</p>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Host</p>
                </div>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                {event.organizer.bio || 'Professional Web3 community organizer focused on building the future of decentralized tech.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
