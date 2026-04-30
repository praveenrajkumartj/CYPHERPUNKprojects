import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { Users, Mail, Ticket, Zap, ArrowLeft, Download, Search, Filter } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import MotionDiv from '@/components/MotionDiv';

export default async function AttendeesPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await params;
  const sParams = await searchParams;
  const filter = typeof sParams.filter === 'string' ? sParams.filter : 'all';

  const session = await getSession();
  if (!session) return null;

  const event = await prisma.event.findUnique({
    where: { id },
    include: {
      registrations: {
        include: { user: true },
        orderBy: { createdAt: 'desc' }
      },
      tickets: {
        include: { user: true },
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  if (!event) notFound();
  if (event.organizerId !== session.id) return notFound();

  // Process data for the view
  const rsvps = event.registrations.map(r => ({ ...r, type: 'RSVP' }));
  const tickets = event.tickets.map(t => ({ 
    ...t, 
    type: t.type === 'Basic' ? 'RSVP (BASIC)' : `PAID (${t.type})` 
  }));
  
  const allAttendees = [...rsvps, ...tickets];
  
  const rsvpList = allAttendees.filter(a => a.type.startsWith('RSVP'));
  const paidList = allAttendees.filter(a => a.type.startsWith('PAID'));

  let filteredAttendees = allAttendees;
  if (filter === 'rsvp') filteredAttendees = rsvpList;
  if (filter === 'paid') filteredAttendees = paidList;

  const stats = [
    { label: 'Total Enrolled', value: allAttendees.length, icon: Users, color: 'text-white' },
    { label: 'Free RSVP', value: rsvpList.length, icon: Zap, color: 'text-cyan-400' },
    { label: 'Paid Bookings', value: paidList.length, icon: Ticket, color: 'text-pink-400' },
  ];

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
           <Link href="/organizer/events" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors">
              <ArrowLeft size={14} /> Back to Events
           </Link>
           <h1 className="text-4xl font-bold tracking-tight">Attendee <span className="text-cyan-400">Tracking</span></h1>
           <p className="text-slate-500 font-mono text-sm uppercase tracking-widest">Event: {event.title}</p>
        </div>
        <button className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-white/10 transition-all">
           <Download size={18} /> Export Data
        </button>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="p-8 rounded-[2rem] bg-[#0c1222] border border-white/5 space-y-4">
             <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
                <stat.icon size={18} className={stat.color} />
             </div>
             <p className="text-3xl font-black">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col md:flex-row gap-4 p-4 rounded-3xl bg-[#0c1222]/50 border border-white/5 backdrop-blur-md">
         <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
            <input 
              type="text" 
              placeholder="Search by name or email..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-cyan-500/50 transition-all"
            />
         </div>
         <div className="flex gap-2">
            {[
              { label: 'All', value: 'all' },
              { label: 'RSVP', value: 'rsvp' },
              { label: 'Paid', value: 'paid' },
            ].map((btn) => (
              <Link
                key={btn.value}
                href={`?filter=${btn.value}`}
                className={`px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all ${filter === btn.value ? 'bg-cyan-400 border-cyan-400 text-[#050510]' : 'bg-white/5 border-white/10 text-slate-500 hover:text-white'}`}
              >
                {btn.label}
              </Link>
            ))}
         </div>
      </div>

      {/* Attendees Table */}
      <div className="rounded-[2.5rem] bg-[#0c1222]/50 border border-white/5 overflow-hidden backdrop-blur-sm">
         <table className="w-full text-left">
            <thead>
               <tr className="border-b border-white/5">
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-slate-500">Attendee</th>
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-slate-500">Email Address</th>
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-slate-500">Registration Type</th>
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-slate-500">Enrolled At</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
               {filteredAttendees.map((attendee, i) => (
                 <tr key={i} className="group hover:bg-white/5 transition-colors">
                    <td className="px-8 py-6">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-pink-500/20 border border-white/10 flex items-center justify-center font-bold text-slate-300">
                             {attendee.user.name.charAt(0)}
                          </div>
                          <span className="font-bold text-white">{attendee.user.name}</span>
                       </div>
                    </td>
                    <td className="px-8 py-6">
                       <div className="flex items-center gap-2 text-slate-400 text-sm">
                          <Mail size={14} className="text-slate-600" />
                          {attendee.user.email}
                       </div>
                    </td>
                    <td className="px-8 py-6">
                       <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${attendee.type === 'RSVP' ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' : 'bg-pink-500/10 border-pink-500/30 text-pink-400'}`}>
                          {attendee.type}
                       </span>
                    </td>
                    <td className="px-8 py-6 text-slate-500 text-xs font-mono">
                       {format(new Date(attendee.createdAt), 'MMM dd, yyyy @ HH:mm')}
                    </td>
                 </tr>
               ))}
               {filteredAttendees.length === 0 && (
                 <tr>
                    <td colSpan={4} className="px-8 py-20 text-center">
                       <div className="space-y-2">
                          <Users className="mx-auto text-slate-700 mb-4" size={48} />
                          <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">No attendees found</p>
                          <p className="text-xs text-slate-600">The grid is currently silent. No signals detected.</p>
                       </div>
                    </td>
                 </tr>
               )}
            </tbody>
         </table>
      </div>
    </div>
  );
}
