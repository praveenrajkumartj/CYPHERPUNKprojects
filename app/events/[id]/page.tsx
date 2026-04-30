import prisma from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import { format } from 'date-fns';
import { Calendar, MapPin, Clock, Video, Globe, Users, ChevronRight, LayoutGrid } from 'lucide-react';
import MotionDiv from '@/components/MotionDiv';
import EventDetailCTA from '@/components/EventDetailCTA';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import { getSession } from '@/lib/auth';

async function getUserId() {
  const session = await getSession();
  return session ? (session.id as string) : null;
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const userId = await getUserId();

  const event = await prisma.event.findUnique({
    where: { id },
    include: {
      organizer: true,
      speakers: true,
      schedules: true,
      registrations: userId ? { where: { userId } } : false,
      tickets: userId ? { where: { userId } } : false,
      _count: {
        select: { registrations: true, tickets: true }
      }
    },
  });

  if (!event) notFound();

  const isRsvped = (event.registrations?.length ?? 0) > 0;
  const isBooked = (event.tickets?.length ?? 0) > 0;
  const isPaid = event.type !== 'hackathon'; // Simple logic for demo

  return (
    <main className="min-h-screen bg-[#050510] text-[#f8fbff]">
      <Navbar />

      {/* Hero Banner */}
      <div className="relative h-[60vh] w-full pt-20 bg-[#0c1222]">
        {event.bannerImage && (event.bannerImage.startsWith('http') || event.bannerImage.startsWith('/')) && (
          <Image 
            src={event.bannerImage} 
            alt={event.title} 
            fill 
            className="object-cover opacity-50"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050510] via-transparent to-transparent" />
        
        <div className="container mx-auto px-6 h-full flex flex-col justify-end pb-12 relative z-10">
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 max-w-4xl"
          >
            <div className="flex flex-wrap gap-4 items-center">
              <span className="px-4 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-xs font-bold uppercase tracking-widest text-cyan-400">
                {event.type}
              </span>
              <span className="flex items-center gap-2 text-slate-300 text-sm font-medium">
                <Calendar size={16} className="text-cyan-400" />
                {format(new Date(event.date), 'MMMM dd, yyyy')}
              </span>
              <span className="flex items-center gap-2 text-slate-300 text-sm font-medium">
                <Clock size={16} className="text-pink-400" />
                {format(new Date(event.date), 'HH:mm')} UTC
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
              {event.title}
            </h1>
          </MotionDiv>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-[1fr_400px] gap-16">
          {/* Main Info */}
          <div className="space-y-16">
            <section className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-1 h-1 bg-cyan-400 rounded-full" />
                <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-slate-500">System Overview</h2>
              </div>
              <div className="prose prose-invert max-w-none">
                <p className="text-xl text-slate-300 leading-relaxed font-light">
                  {event.description}
                </p>
                {event.longDescription && (
                  <p className="text-slate-400 leading-relaxed mt-6">
                    {event.longDescription}
                  </p>
                )}
              </div>
            </section>

            {/* Speakers */}
            {event.speakers.length > 0 && (
              <section className="space-y-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-1 bg-pink-500 rounded-full" />
                  <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-slate-500">Transmission Nodes (Speakers)</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {event.speakers.map((speaker) => (
                    <div key={speaker.id} className="flex items-center gap-6 p-6 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-sm">
                      <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-white/10">
                        <Image src={speaker.image || '/images/avatar_1_1777452297481.png'} alt={speaker.name} fill className="object-cover" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white">{speaker.name}</h4>
                        <p className="text-sm text-cyan-400 font-medium">{speaker.designation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Schedule */}
            {event.schedules.length > 0 && (
              <section className="space-y-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-1 bg-[#ffd700] rounded-full" />
                  <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-slate-500">Execution Plan (Schedule)</h2>
                </div>
                <div className="space-y-4">
                  {event.schedules.map((item, idx) => (
                    <div key={item.id} className="group flex items-start gap-8 p-6 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                      <div className="text-cyan-400 font-mono font-bold text-sm pt-1 min-w-[80px]">
                        {item.time}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                        {item.description && <p className="text-slate-400 text-sm">{item.description}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar CTA */}
          <aside className="space-y-8">
            <div className="sticky top-32">
              <MotionDiv
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-8 rounded-[2.5rem] bg-[#0c1222]/80 border border-white/10 backdrop-blur-xl space-y-8 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-4 text-slate-300">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                      <MapPin size={20} className="text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Location</p>
                      <p className="font-bold text-white">{event.locationType === 'online' ? 'Online stream' : event.location}</p>
                    </div>
                  </div>

                  {event.locationType === 'online' && (
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between group cursor-pointer hover:bg-white/10 transition-colors">
                      <div className="flex items-center gap-3">
                        <Video size={18} className="text-pink-400" />
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-300">Join Stream Link</span>
                      </div>
                      <ChevronRight size={16} className="text-slate-500 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                     <div className="flex items-center gap-3 mb-3">
                        <Users size={18} className="text-[#ffd700]" />
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-300">Organizer</span>
                     </div>
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-500">
                           {event.organizer.name.charAt(0)}
                        </div>
                        <span className="font-bold text-sm text-white">{event.organizer.name}</span>
                     </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/10">
                  <EventDetailCTA 
                    eventId={event.id} 
                    isRsvped={isRsvped} 
                    isBooked={isBooked}
                    isPaid={isPaid}
                    isLoggedIn={!!userId}
                    capacity={event.capacity || 100}
                    currentCount={(event._count?.registrations || 0) + (event._count?.tickets || 0)}
                  />
                </div>
              </MotionDiv>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
