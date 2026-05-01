import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { Calendar, Users, Zap, TrendingUp, ArrowRight, Plus, Target } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import MotionDiv from '@/components/MotionDiv';

export default async function OrganizerOverview() {
  const session = await getSession();
  if (!session) return null;

  const events = await prisma.event.findMany({
    where: { organizerId: session.id as string },
    include: {
      _count: {
        select: { registrations: true, tickets: true }
      }
    },
    orderBy: { date: 'desc' },
    take: 5
  });

  const totalEvents = await prisma.event.count({ where: { organizerId: session.id as string } });
  
  // Get all sign-ups for all events owned by this organizer
  const eventsWithCounts = await prisma.event.findMany({
    where: { organizerId: session.id as string },
    select: {
      _count: {
        select: { registrations: true, tickets: true }
      }
    }
  });

  const totalAttendees = eventsWithCounts.reduce((acc, curr) => acc + curr._count.registrations + curr._count.tickets, 0);

  const totalRsvpCount = await prisma.registration.count({
    where: { event: { organizerId: session.id as string } }
  });

  const totalRsvpTickets = await prisma.ticket.count({
    where: { 
      event: { organizerId: session.id as string },
      type: 'Basic'
    }
  });

  const totalPaidTickets = await prisma.ticket.count({
    where: { 
      event: { organizerId: session.id as string },
      type: { not: 'Basic' }
    }
  });

  const totalBounties = await prisma.bounty.count({
    where: { project: { createdBy: session.id as string } }
  });

  const stats = [
    { label: 'Total Events', value: totalEvents, icon: Calendar, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
    { label: 'Registrations', value: totalAttendees, icon: Users, color: 'text-pink-400', bg: 'bg-pink-500/10' },
    { label: 'RSVP Tickets', value: totalRsvpTickets + totalRsvpCount, icon: Zap, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'Bounties', value: totalBounties, icon: Target, color: 'text-[#ffd700]', bg: 'bg-[#ffd700]/10' },
  ];

  return (
    <div className="space-y-12">
      <header>
        <MotionDiv
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold tracking-tight mb-2">Organizer <span className="text-cyan-400">Hub</span></h1>
          <p className="text-slate-500 font-mono text-sm uppercase tracking-widest">Protocol control center // v1.0.4</p>
        </MotionDiv>
      </header>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <MotionDiv
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-8 rounded-[2rem] bg-[#0c1222] border border-white/5 flex items-center justify-between group hover:border-cyan-500/30 transition-all"
          >
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-2">{stat.label}</p>
              <p className="text-4xl font-black">{stat.value}</p>
            </div>
            <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color} border border-white/5 group-hover:scale-110 transition-transform`}>
              <stat.icon size={28} />
            </div>
          </MotionDiv>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Recent Events List */}
        <section className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              Recent Deployments <TrendingUp size={20} className="text-cyan-400" />
            </h2>
            <Link href="/organizer/events" className="text-xs font-bold uppercase tracking-widest text-cyan-400 hover:text-cyan-300">View All</Link>
          </div>

          <div className="space-y-4">
            {events.length > 0 ? (
              events.map((event, i) => (
                <MotionDiv
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={`/organizer/events/${event.id}/attendees`}
                    className="flex items-center justify-between p-6 rounded-3xl bg-[#0c1222]/50 border border-white/5 hover:border-cyan-500/30 hover:bg-[#0c1222] transition-all group"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-slate-400 group-hover:text-cyan-400 transition-colors">
                        <span className="text-[10px] font-bold uppercase tracking-widest">{format(new Date(event.date), 'MMM')}</span>
                        <span className="text-2xl font-black">{format(new Date(event.date), 'dd')}</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-white mb-1 group-hover:text-cyan-400 transition-colors">{event.title}</h3>
                        <div className="flex items-center gap-4">
                           <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-white/5 ${event.status === 'published' ? 'text-green-400' : 'text-yellow-400'}`}>
                             {event.status}
                           </span>
                           <span className="text-xs text-slate-500">{event._count.registrations + event._count.tickets} Attendees</span>
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="text-slate-700 group-hover:text-cyan-400 transition-colors group-hover:translate-x-1" />
                  </Link>
                </MotionDiv>
              ))
            ) : (
              <div className="p-16 rounded-[3rem] border border-dashed border-white/10 text-center space-y-4">
                <p className="text-slate-500">No events deployed in your sector.</p>
                <Link href="/organizer/events/new" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-400 text-[#050510] font-bold text-xs uppercase tracking-widest hover:scale-105 transition-transform">
                  <Plus size={16} /> Create Event
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Quick Actions */}
        <aside className="space-y-8">
           <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-pink-500/10 to-transparent border border-pink-500/20 space-y-6">
              <h3 className="text-xl font-bold">Quick Operations</h3>
              <div className="grid gap-3">
                 <Link href="/organizer/events/new" className="flex items-center justify-between p-4 rounded-2xl bg-black/20 hover:bg-black/40 border border-white/5 transition-all group">
                    <span className="text-sm font-bold uppercase tracking-widest text-slate-300 group-hover:text-white">Deploy Event</span>
                    <Plus size={18} className="text-pink-400 group-hover:rotate-90 transition-transform" />
                 </Link>
                 <Link href="/organizer/stats" className="flex items-center justify-between p-4 rounded-2xl bg-black/20 hover:bg-black/40 border border-white/5 transition-all group">
                    <span className="text-sm font-bold uppercase tracking-widest text-slate-300 group-hover:text-white">Global Analytics</span>
                    <TrendingUp size={18} className="text-cyan-400 group-hover:scale-110 transition-transform" />
                 </Link>
              </div>
           </div>

           <div className="p-8 rounded-[2.5rem] bg-[#0c1222] border border-white/5 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500">Organizer Tier</h4>
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
                    <Zap size={24} className="text-cyan-400" />
                 </div>
                 <div>
                    <p className="font-bold text-white">Elite Node</p>
                    <p className="text-xs text-slate-500">Verified Builder</p>
                 </div>
              </div>
           </div>
        </aside>
      </div>
    </div>
  );
}
