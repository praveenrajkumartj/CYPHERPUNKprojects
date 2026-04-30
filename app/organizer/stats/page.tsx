import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { BarChart3, TrendingUp, Users, Zap, Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import MotionDiv from '@/components/MotionDiv';
import StatsChart from '@/components/StatsChart';
import StatsDistribution from '@/components/StatsDistribution';

export default async function GlobalStatsPage() {
  const session = await getSession();
  if (!session) return null;

  const events = await prisma.event.findMany({
    where: { organizerId: session.id as string },
    include: {
      _count: {
        select: { registrations: true, tickets: true }
      }
    }
  });

  const totalRegistrations = events.reduce((acc, curr) => acc + curr._count.registrations, 0);
  const totalTickets = events.reduce((acc, curr) => acc + curr._count.tickets, 0);
  const totalRevenue = events.reduce((acc, curr) => acc + (curr._count.tickets * 49.99), 0);

  const mainStats = [
    { label: 'Network Reach', value: (totalRegistrations * 12).toLocaleString(), sub: '+12% from last node', trend: 'up', icon: Users, color: 'text-cyan-400' },
    { label: 'Protocol Revenue', value: `$${totalRevenue.toLocaleString()}`, sub: '+$1,240 this cycle', trend: 'up', icon: Zap, color: 'text-[#ffd700]' },
    { label: 'Active Sequences', value: events.length, sub: '2 pending deployment', trend: 'down', icon: Calendar, color: 'text-pink-400' },
  ];

  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-4xl font-bold tracking-tight mb-2">Global <span className="text-[#ffd700]">Analytics</span></h1>
        <p className="text-slate-500 font-mono text-sm uppercase tracking-widest">Real-time data stream // Protocol performance</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mainStats.map((stat, i) => (
          <MotionDiv
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-10 rounded-[3rem] bg-[#0c1222]/80 border border-white/5 backdrop-blur-xl space-y-6"
          >
            <div className="flex items-center justify-between">
               <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center ${stat.color} border border-white/10`}>
                  <stat.icon size={24} />
               </div>
               <div className={`flex items-center gap-1 text-xs font-bold ${stat.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                  {stat.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {stat.sub.split(' ')[0]}
               </div>
            </div>
            <div>
               <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
               <p className="text-4xl font-black text-white">{stat.value}</p>
               <p className="text-xs text-slate-500 mt-2">{stat.sub}</p>
            </div>
          </MotionDiv>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
         <section className="p-10 rounded-[3rem] bg-[#0c1222]/50 border border-white/5 space-y-8">
            <h3 className="text-xl font-bold flex items-center gap-3"><TrendingUp size={20} className="text-cyan-400" /> Growth Trajectory</h3>
            <StatsChart />
            <div className="flex justify-between px-2 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
               <span>Jan</span>
               <span>Jun</span>
               <span>Dec</span>
            </div>
         </section>

         <section className="p-10 rounded-[3rem] bg-[#0c1222]/50 border border-white/5 space-y-8">
            <h3 className="text-xl font-bold flex items-center gap-3"><BarChart3 size={20} className="text-pink-500" /> Event Distribution</h3>
            <StatsDistribution />
         </section>
      </div>
    </div>
  );
}
