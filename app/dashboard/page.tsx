import Navbar from '@/components/Navbar';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { Calendar, Users, Briefcase, Plus, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) return null; // Middleware handles redirect

  const user = await prisma.user.findUnique({
    where: { id: session.id as string },
    include: {
      attendances: {
        include: {
          event: {
            include: { organizer: true }
          }
        }
      },
      events: true, // Events created by this user
      applications: {
        include: { project: true }
      }
    }
  });

  return (
    <main className="min-h-screen bg-dark-300">
      <Navbar />

      <div className="pt-32 pb-20 container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2 text-white">Dashboard</h1>
            <p className="text-slate-400">Welcome back, {session.name}. Here's what's happening.</p>
          </div>
          
          {['ORGANIZER', 'ADMIN'].includes(session.role as string) && (
            <Link 
              href="/organizer/events/new"
              className="px-6 py-3 bg-secondary text-white rounded-xl font-bold flex items-center gap-2 hover:bg-opacity-90 transition-all shadow-lg shadow-secondary/20"
            >
              <Plus size={20} />
              Create Event
            </Link>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Stats Grid */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Events Joined', value: user?.attendances.length || 0, icon: Calendar, color: 'text-primary' },
              { label: 'Events Created', value: user?.events.length || 0, icon: Users, color: 'text-secondary' },
              { label: 'Project Applications', value: user?.applications.length || 0, icon: Briefcase, color: 'text-accent' },
            ].map((stat, i) => (
              <div key={i} className="glass-card p-6 rounded-2xl flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Joined Events */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold">Upcoming Events</h2>
            {user?.attendances.length ? (
              <div className="grid gap-4">
                {user.attendances.map((att) => (
                  <Link 
                    key={att.event.id}
                    href={`/events/${att.event.id}`}
                    className="glass-card p-6 rounded-2xl hover:border-primary/50 transition-all flex items-center justify-between"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-xl bg-primary/10 flex flex-col items-center justify-center text-primary">
                        <span className="text-xs font-bold uppercase">{format(new Date(att.event.date), 'MMM')}</span>
                        <span className="text-xl font-black">{format(new Date(att.event.date), 'dd')}</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-1">{att.event.title}</h3>
                        <p className="text-sm text-slate-500 flex items-center gap-2">
                          <Users size={14} /> by {att.event.organizer.name}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="text-slate-600" />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="glass p-12 rounded-[2rem] text-center">
                <p className="text-slate-500 mb-6">You haven't joined any events yet.</p>
                <Link href="/events" className="text-primary font-bold hover:underline">Explore Events</Link>
              </div>
            )}
          </div>

          {/* Activity/Sidebar */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Recent Activity</h2>
            <div className="glass-card p-6 rounded-[2rem] space-y-6">
              {/* Mock activity for now */}
              <div className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                <div>
                  <p className="text-sm text-slate-300">You RSVP'd to <span className="font-bold text-white">EthGlobal London</span></p>
                  <p className="text-xs text-slate-500 mt-1">2 hours ago</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-secondary mt-2 shrink-0" />
                <div>
                  <p className="text-sm text-slate-300">Profile updated successfully</p>
                  <p className="text-xs text-slate-500 mt-1">Yesterday</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
