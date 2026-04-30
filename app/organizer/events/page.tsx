import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { Calendar, Users, Eye, Edit3, Trash2, Search, Filter, Plus, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import MotionDiv from '@/components/MotionDiv';
import DeleteEventButton from '@/components/DeleteEventButton';

export default async function MyEventsPage() {
  const session = await getSession();
  if (!session) return null;

  const events = await prisma.event.findMany({
    where: { organizerId: session.id as string },
    include: {
      _count: {
        select: { registrations: true, tickets: true }
      }
    },
    orderBy: { date: 'desc' }
  });

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">My <span className="text-pink-500">Deployments</span></h1>
          <p className="text-slate-500 font-mono text-sm uppercase tracking-widest">Active and archived event sequences</p>
        </div>
        <Link 
          href="/organizer/events/new"
          className="px-8 py-4 bg-cyan-400 text-[#050510] rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-cyan-300 transition-all active:scale-95 flex items-center gap-2 shadow-[0_0_30px_rgba(34,211,238,0.2)]"
        >
          <Plus size={18} /> Initialize New
        </Link>
      </header>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 p-4 rounded-3xl bg-[#0c1222]/50 border border-white/5 backdrop-blur-md">
         <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
            <input 
              type="text" 
              placeholder="Filter by title..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-cyan-500/50 transition-all"
            />
         </div>
         <select className="bg-white/5 border border-white/10 rounded-xl py-3 px-6 text-sm text-slate-400 focus:outline-none focus:border-cyan-500/50 appearance-none cursor-pointer">
            <option>All Status</option>
            <option>Published</option>
            <option>Draft</option>
         </select>
      </div>

      <div className="grid gap-6">
        {events.length > 0 ? (
          events.map((event, i) => (
            <MotionDiv
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group p-8 rounded-[2.5rem] bg-[#0c1222]/50 border border-white/5 hover:border-cyan-500/30 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-8"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-8">
                <div className="w-20 h-20 rounded-[1.5rem] bg-white/5 border border-white/10 flex flex-col items-center justify-center text-slate-400 group-hover:border-cyan-500/30 transition-all group-hover:bg-cyan-500/5">
                   <span className="text-[10px] font-bold uppercase tracking-widest">{format(new Date(event.date), 'MMM')}</span>
                   <span className="text-3xl font-black text-white">{format(new Date(event.date), 'dd')}</span>
                </div>
                
                <div>
                   <div className="flex items-center gap-3 mb-3">
                      <span className={`px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-widest ${event.status === 'published' ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'}`}>
                        {event.status}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{event.type}</span>
                   </div>
                   <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">{event.title}</h3>
                   <p className="text-sm text-slate-500 max-w-md line-clamp-1">{event.description}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-12 lg:border-l lg:border-white/5 lg:pl-12">
                 <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Registrations</p>
                    <div className="flex items-center justify-center gap-2">
                       <Users size={16} className="text-pink-400" />
                       <span className="text-xl font-black text-white">{(event._count?.registrations || 0) + (event._count?.tickets || 0)}</span>
                       <span className="text-xs text-slate-600 font-bold">/ {event.capacity || 100}</span>
                    </div>
                 </div>

                 <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Remaining</p>
                    <div className="flex items-center justify-center gap-2">
                       <span className={`text-xl font-black ${((event.capacity || 100) - ((event._count?.registrations || 0) + (event._count?.tickets || 0))) <= 0 ? 'text-red-500' : 'text-cyan-400'}`}>
                         {Math.max(0, (event.capacity || 100) - ((event._count?.registrations || 0) + (event._count?.tickets || 0)))}
                       </span>
                       <span className="text-[10px] text-slate-600 font-bold uppercase">Slots</span>
                    </div>
                 </div>

                 <div className="flex items-center gap-3">
                    <Link 
                      href={`/organizer/events/${event.id}/attendees`}
                      className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400 transition-all"
                      title="View Attendees"
                    >
                       <Users size={20} />
                    </Link>
                    <Link 
                      href={`/organizer/events/${event.id}/edit`}
                      className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white transition-all"
                      title="Edit Event"
                    >
                       <Edit3 size={20} />
                    </Link>
                    <DeleteEventButton eventId={event.id} />
                 </div>
              </div>
            </MotionDiv>
          ))
        ) : (
          <div className="p-32 rounded-[4rem] border border-dashed border-white/10 bg-white/5 backdrop-blur-sm text-center">
             <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6 text-slate-600">
                <Calendar size={40} />
             </div>
             <h3 className="text-2xl font-bold text-white mb-2">Sector Empty</h3>
             <p className="text-slate-500 mb-8 max-w-md mx-auto">You haven't initialized any event sequences. Start by deploying your first protocol.</p>
             <Link href="/organizer/events/new" className="inline-block px-10 py-4 bg-cyan-400 text-[#050510] rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform">Initialize First Event</Link>
          </div>
        )}
      </div>
    </div>
  );
}
