import Navbar from '@/components/Navbar';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { Calendar, Users, Briefcase, Plus, ArrowRight, Ticket, CheckCircle2, Zap } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import MotionDiv from '@/components/MotionDiv';

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.id as string },
    include: {
      registrations: {
        include: {
          event: {
            include: { organizer: { include: { profile: true } } }
          }
        }
      },
      tickets: {
        include: {
          event: {
            include: { organizer: { include: { profile: true } } }
          }
        }
      },
      events: true,
      projects: true,
      applications: {
        include: { project: true }
      }
    }
  });

  // Combine and deduplicate events from registrations and tickets
  const joinedEventsMap = new Map();
  
  user?.registrations.forEach(reg => {
    joinedEventsMap.set(reg.event.id, { ...reg.event, status: 'RSVP Confirmed', icon: Zap, color: 'text-cyan-400' });
  });
  
  user?.tickets.forEach(tkt => {
    joinedEventsMap.set(tkt.event.id, { ...tkt.event, status: `Booked (${tkt.type})`, icon: Ticket, color: 'text-pink-400' });
  });

  const joinedEvents = Array.from(joinedEventsMap.values());

  return (
    <main className="min-h-screen bg-[#050510] text-[#f8fbff]">
      <Navbar />

      <div className="pt-32 pb-20 container mx-auto px-6">
        <header className="mb-12">
          <MotionDiv 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Terminal <span className="text-cyan-400">Dashboard</span>
            </h1>
            <p className="text-slate-500 font-mono text-sm tracking-widest uppercase">
              Authenticated as: {session.name as string} // Role: {session.role as string}
            </p>
          </MotionDiv>
        </header>

        <div className="grid lg:grid-cols-[1fr_350px] gap-12">
          <div className="space-y-12">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Network Entry', value: joinedEvents.length, icon: Calendar, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
                { label: 'Protocols Managed', value: user?.events.length || 0, icon: Users, color: 'text-pink-400', bg: 'bg-pink-500/10' },
                { label: 'Open Channels', value: user?.applications.length || 0, icon: Briefcase, color: 'text-[#ffd700]', bg: 'bg-[#ffd700]/10' },
              ].map((stat, i) => (
                <MotionDiv 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-3xl bg-[#0c1222] border border-white/5 flex items-center gap-6"
                >
                  <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color} border border-white/5`}>
                    <stat.icon size={28} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
                    <p className="text-3xl font-black text-white">{stat.value}</p>
                  </div>
                </MotionDiv>
              ))}
            </div>

            {/* My Events */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Active Transmissions</h2>
                <Link href="/events" className="text-xs font-bold uppercase tracking-widest text-cyan-400 hover:text-cyan-300">Browse New Events</Link>
              </div>

              {joinedEvents.length > 0 ? (
                <div className="grid gap-4">
                  {joinedEvents.map((event, i) => (
                    <MotionDiv 
                      key={event.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link 
                        href={`/events/${event.id}`}
                        className="group flex flex-col md:flex-row md:items-center justify-between p-6 rounded-[2rem] bg-[#0c1222]/50 border border-white/5 hover:border-cyan-500/30 hover:bg-[#0c1222] transition-all gap-6"
                      >
                        <div className="flex items-center gap-6">
                          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-slate-400 group-hover:text-cyan-400 transition-colors">
                            <span className="text-[10px] font-bold uppercase tracking-widest">{format(new Date(event.date), 'MMM')}</span>
                            <span className="text-2xl font-black">{format(new Date(event.date), 'dd')}</span>
                          </div>
                          <div>
                            <h3 className="font-bold text-xl text-white mb-2 group-hover:text-cyan-400 transition-colors">{event.title}</h3>
                            <div className="flex flex-wrap gap-4 items-center">
                               <div className="flex items-center gap-2 text-xs text-slate-500">
                                  <Users size={14} /> by {event.organizer?.profile?.name || event.organizer?.username || 'Unknown'}
                               </div>
                               <div className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest ${event.color}`}>
                                  <event.icon size={14} /> {event.status}
                               </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                           <div className="hidden md:block w-32 h-1 bg-white/5 rounded-full overflow-hidden">
                              <div className={`h-full w-full ${event.color === 'text-cyan-400' ? 'bg-cyan-400' : 'bg-pink-400'} opacity-30`} />
                           </div>
                           <ArrowRight className="text-slate-700 group-hover:text-cyan-400 transition-colors group-hover:translate-x-1" />
                        </div>
                      </Link>
                    </MotionDiv>
                  ))}
                </div>
              ) : (
                <div className="p-16 rounded-[3rem] border border-dashed border-white/10 text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto text-slate-600">
                     <Calendar size={32} />
                  </div>
                  <div className="space-y-2">
                    <p className="text-slate-400 font-medium">No active event sequences detected.</p>
                    <p className="text-sm text-slate-600">Explore the spectrum to find your next objective.</p>
                  </div>
                  <Link href="/events" className="inline-block px-8 py-3 rounded-full bg-white text-[#050510] font-bold text-xs tracking-widest hover:scale-105 transition-transform">EXPLORE EVENTS</Link>
                </div>
              )}
            </section>

            {/* My Projects */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Project Sector</h2>
                <Link href="/projects" className="text-xs font-bold uppercase tracking-widest text-pink-400 hover:text-pink-300">View Marketplace</Link>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                 {/* Applications */}
                 <div className="p-8 rounded-[2.5rem] bg-[#0c1222]/50 border border-white/5 space-y-6">
                    <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest">Sent Requests</h3>
                    {user?.applications.length ? (
                      <div className="space-y-4">
                        {user.applications.map((app: any) => (
                          <Link key={app.id} href={`/projects/${app.project.id}`} className="block p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-pink-500/30 transition-all">
                             <p className="font-bold text-white text-sm truncate">{app.project.title}</p>
                             <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Status: {app.status}</p>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-600 italic">No outgoing requests.</p>
                    )}
                 </div>

                 {/* My Own Projects */}
                 <div className="p-8 rounded-[2.5rem] bg-[#0c1222]/50 border border-white/5 space-y-6">
                    <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest">My Deployments</h3>
                    {user?.projects.length ? (
                      <div className="space-y-4">
                        <Link href="/projects/create" className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-[10px] font-black uppercase tracking-widest hover:bg-cyan-400/20 transition-all">
                           <Plus size={14} /> New Deployment
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <p className="text-xs text-slate-600 italic">No projects deployed yet.</p>
                        <Link href="/projects/create" className="block text-center py-3 rounded-xl bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-[10px] font-black uppercase tracking-widest">Start Building</Link>
                      </div>
                    )}
                 </div>
              </div>
            </section>
          </div>

          {/* Activity Sidebar */}
          <aside className="space-y-8">
            <h2 className="text-2xl font-bold">System Log</h2>
            <div className="p-8 rounded-[2.5rem] bg-[#0c1222] border border-white/5 space-y-8">
               <div className="space-y-6">
                  {[
                    { label: 'RSVP Synced', desc: 'Hackathon access confirmed', time: '2m ago', color: 'bg-cyan-400' },
                    { label: 'Profile Update', desc: 'Bio information modified', time: '1h ago', color: 'bg-pink-400' },
                    { label: 'Security Handshake', desc: 'Wallet connection verified', time: 'Yesterday', color: 'bg-[#ffd700]' },
                  ].map((log, i) => (
                    <div key={i} className="flex gap-4 group">
                      <div className={`w-1.5 h-1.5 rounded-full ${log.color} mt-2 shrink-0 group-hover:scale-150 transition-transform shadow-[0_0_10px_currentColor]`} />
                      <div>
                        <p className="text-xs font-bold text-white uppercase tracking-widest">{log.label}</p>
                        <p className="text-xs text-slate-500 mt-1">{log.desc}</p>
                        <p className="text-[10px] text-slate-600 mt-2 font-mono">{log.time}</p>
                      </div>
                    </div>
                  ))}
               </div>
               
               <div className="pt-8 border-t border-white/5">
                  <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-white hover:bg-white/10 transition-all">
                    View Full Security Log
                  </button>
               </div>
            </div>

            {/* Quick Actions */}
            <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/20">
               <h4 className="text-sm font-bold text-cyan-400 uppercase tracking-widest mb-4">Quick Operations</h4>
               <div className="space-y-3">
                  <Link href="/organizer/events/new" className="flex items-center justify-between p-4 rounded-xl bg-black/20 hover:bg-black/40 transition-colors border border-white/5 group">
                     <span className="text-xs font-bold text-white uppercase tracking-widest">Create Event</span>
                     <Plus size={16} className="text-cyan-400 group-hover:rotate-90 transition-transform" />
                  </Link>
                  <Link href="/profile" className="flex items-center justify-between p-4 rounded-xl bg-black/20 hover:bg-black/40 transition-colors border border-white/5 group">
                     <span className="text-xs font-bold text-white uppercase tracking-widest">Update Profile</span>
                     <ArrowRight size={16} className="text-slate-500 group-hover:translate-x-1 transition-transform" />
                  </Link>
               </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
