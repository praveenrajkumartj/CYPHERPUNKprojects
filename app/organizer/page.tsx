import Navbar from '@/components/Navbar';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { Calendar, Users, Edit3, Trash2, Plus, Eye, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

export default async function OrganizerDashboard() {
  const session = await getSession();
  if (!session) return null;

  const events = await prisma.event.findMany({
    where: { organizerId: session.id as string },
    include: {
      _count: {
        select: { attendees: true }
      }
    },
    orderBy: { date: 'desc' }
  });

  return (
    <main className="min-h-screen bg-dark-300">
      <Navbar />

      <div className="pt-32 pb-20 container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">Organizer Hub</h1>
            <p className="text-slate-400">Manage your events and track engagement.</p>
          </div>
          
          <Link 
            href="/organizer/events/new"
            className="px-6 py-3 bg-primary text-white rounded-xl font-bold flex items-center gap-2 hover:bg-opacity-90 transition-all shadow-lg shadow-primary/20"
          >
            <Plus size={20} />
            Create New Event
          </Link>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold">My Events ({events.length})</h2>
          
          {events.length > 0 ? (
            <div className="grid gap-6">
              {events.map((event) => (
                <div key={event.id} className="glass-card p-8 rounded-[2rem] flex flex-col lg:flex-row lg:items-center justify-between gap-8 group">
                  <div className="flex flex-col md:flex-row md:items-center gap-8">
                    <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-slate-400 group-hover:border-primary/50 transition-colors">
                      <span className="text-xs font-bold uppercase">{format(new Date(event.date), 'MMM')}</span>
                      <span className="text-2xl font-black text-white">{format(new Date(event.date), 'dd')}</span>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
                          {event.type}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">{event.locationType}</span>
                      </div>
                      <h3 className="text-2xl font-bold mb-1">{event.title}</h3>
                      <p className="text-slate-400 text-sm max-w-md line-clamp-1">{event.description}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-12">
                    <div className="text-center">
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">Attendees</p>
                      <div className="flex items-center gap-2 justify-center">
                        <Users size={16} className="text-secondary" />
                        <span className="text-xl font-bold">{event._count.attendees}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Link 
                        href={`/events/${event.id}`}
                        className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white transition-all"
                      >
                        <Eye size={20} />
                      </Link>
                      <Link 
                        href={`/organizer/events/${event.id}/edit`}
                        className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all"
                      >
                        <Edit3 size={20} />
                      </Link>
                      <button className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-accent hover:border-accent transition-all">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass p-20 rounded-[3rem] text-center">
              <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-600">
                <Calendar size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-2">No events created yet</h3>
              <p className="text-slate-500 mb-8 max-w-md mx-auto">
                Start building the community by hosting your first hackathon or workshop.
              </p>
              <Link 
                href="/organizer/events/new"
                className="inline-flex px-8 py-4 bg-primary text-white rounded-2xl font-bold hover:scale-105 transition-all"
              >
                Launch Your First Event
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
