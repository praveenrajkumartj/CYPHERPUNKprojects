import prisma from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import EventFilters from '@/components/EventFilters';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { Calendar, MapPin, Users, ArrowRight, Video, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

// Since this is a server component, we need to handle Framer Motion with a client wrapper or use it in client components
import MotionDiv from '@/components/MotionDiv'; 

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const q = typeof params.q === 'string' ? params.q : '';
  const type = typeof params.type === 'string' ? params.type : '';
  const location = typeof params.location === 'string' ? params.location : '';
  const dateFilter = typeof params.date === 'string' ? params.date : 'upcoming';

  const now = new Date();

  const events = await prisma.event.findMany({
    where: {
      AND: [
        { status: 'published' },
        q ? { title: { contains: q, mode: 'insensitive' } } : {},
        type ? { type } : {},
        location ? { locationType: location } : {},
        dateFilter === 'upcoming' 
          ? { date: { gte: now } } 
          : { date: { lt: now } }
      ]
    },
    include: {
      organizer: true,
      _count: {
        select: { registrations: true }
      }
    },
    orderBy: {
      date: dateFilter === 'upcoming' ? 'asc' : 'desc'
    }
  });

  return (
    <main className="min-h-screen bg-[#050510] text-[#f8fbff]">
      <Navbar />

      <div className="pt-32 pb-20 container mx-auto px-6">
        <header className="mb-16">
          <MotionDiv 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400 mb-4">Discovery Protocol</p>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              Community <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">Events</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
              Join the next wave of decentralization. Hackathons, workshops, and meetups for the digital sovereignty warriors.
            </p>
          </MotionDiv>
        </header>

        <EventFilters />

        {events.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <MotionDiv
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link 
                  href={`/events/${event.id}`}
                  className="group relative block h-full rounded-[2.5rem] bg-[#0c1222]/50 border border-white/5 overflow-hidden transition-all duration-500 hover:border-cyan-500/30 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
                >
                  {/* Banner Image */}
                  <div className="relative h-56 w-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c1222] to-transparent z-10" />
                    {event.bannerImage ? (
                      <Image 
                        src={event.bannerImage} 
                        alt={event.title} 
                        fill 
                        className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-cyan-900/40 to-pink-900/40" />
                    )}
                    
                    {/* Badge */}
                    <div className="absolute top-6 left-6 z-20">
                      <span className="px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-widest text-cyan-400">
                        {event.type}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">
                        {event.title}
                      </h3>
                      <p className="text-slate-400 text-sm line-clamp-3 leading-relaxed">
                        {event.description}
                      </p>
                    </div>

                    <div className="space-y-4 pt-6 border-t border-white/5">
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3 text-sm text-slate-300">
                          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                            <Calendar size={14} className="text-cyan-400" />
                          </div>
                          {format(new Date(event.date), 'MMMM dd, yyyy @ HH:mm')}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-300">
                          <div className="w-8 h-8 rounded-lg bg-pink-500/10 flex items-center justify-center border border-pink-500/20">
                            {event.locationType === 'online' ? <Video size={14} className="text-pink-400" /> : <Globe size={14} className="text-pink-400" />}
                          </div>
                          {event.locationType === 'online' ? 'Digital Stream' : event.location || 'Offline Venue'}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-2">
                             {[...Array(3)].map((_, i) => (
                               <div key={i} className="w-6 h-6 rounded-full bg-slate-800 border-2 border-[#0c1222] flex items-center justify-center text-[8px] font-bold text-slate-500 overflow-hidden">
                                  <Image src={`/images/avatar_${i+1}.png`} alt="User" width={24} height={24} className="opacity-50" />
                               </div>
                             ))}
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                            {event._count.registrations} RSVPed
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                          Details <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </MotionDiv>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 rounded-[3rem] border border-dashed border-white/10 bg-white/5 backdrop-blur-sm">
            <p className="text-slate-400 text-lg mb-4">Zero event sequences detected in this spectrum.</p>
            <Link href="/events" className="text-cyan-400 font-bold hover:text-cyan-300 transition-colors uppercase tracking-widest text-xs">Reset Search Parameters</Link>
          </div>
        )}
      </div>
    </main>
  );
}
