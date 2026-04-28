import Navbar from '@/components/Navbar';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { Users, Calendar, Briefcase, TrendingUp, Shield, Trash2, CheckCircle } from 'lucide-react';

export default async function AdminDashboard() {
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') return null;

  const userCount = await prisma.user.count();
  const eventCount = await prisma.event.count();
  const projectCount = await prisma.project.count();
  const recentUsers = await prisma.user.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' }
  });

  return (
    <main className="min-h-screen bg-dark-300">
      <Navbar />

      <div className="pt-32 pb-20 container mx-auto px-6">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center text-accent">
            <Shield size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight">System Administration</h1>
            <p className="text-slate-400">Oversee the Cyberphunk ecosystem and manage users.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Users', value: userCount, icon: Users, color: 'text-primary' },
            { label: 'Total Events', value: eventCount, icon: Calendar, color: 'text-secondary' },
            { label: 'Live Projects', value: projectCount, icon: Briefcase, color: 'text-accent' },
            { label: 'Engagement', value: '+24%', icon: TrendingUp, color: 'text-green-500' },
          ].map((stat, i) => (
            <div key={i} className="glass-card p-6 rounded-2xl flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Users size={24} className="text-primary" /> Recent Registrations
            </h2>
            <div className="glass-card rounded-[2rem] overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">User</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Role</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Joined</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {recentUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-bold">{user.name}</p>
                            <p className="text-xs text-slate-500">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">
                        {format(new Date(user.createdAt), 'MMM dd, yyyy')}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-slate-600 hover:text-accent transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Quick Actions</h2>
            <div className="glass-card p-8 rounded-[2rem] space-y-4">
              <button className="w-full py-4 px-6 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between group hover:border-primary transition-all">
                <span className="text-sm font-bold">Approve Pending Events</span>
                <CheckCircle size={18} className="text-slate-600 group-hover:text-primary" />
              </button>
              <button className="w-full py-4 px-6 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between group hover:border-secondary transition-all">
                <span className="text-sm font-bold">View Analytics Report</span>
                <TrendingUp size={18} className="text-slate-600 group-hover:text-secondary" />
              </button>
              <button className="w-full py-4 px-6 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between group hover:border-accent transition-all">
                <span className="text-sm font-bold">System Maintenance</span>
                <Shield size={18} className="text-slate-600 group-hover:text-accent" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
