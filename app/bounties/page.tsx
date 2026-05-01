import { getAllBounties } from '@/app/actions/projects';
import { getSession } from '@/lib/auth';
import { Target, Search, Filter, Briefcase, Rocket } from 'lucide-react';
import Link from 'next/link';
import MotionDiv from '@/components/MotionDiv';
import BountyCard from '@/components/BountyCard';

export default async function BountyBoardPage() {
  const bounties = await getAllBounties();
  const session = await getSession();

  return (
    <main className="min-h-screen bg-[#050510] text-white pt-32 pb-24 px-6 relative">
       {/* Background Elements */}
       <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-pink-500/5 rounded-full blur-[120px]" />
       </div>

       <div className="container mx-auto max-w-7xl relative z-10">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
             <div className="space-y-4">
                <MotionDiv initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                   <p className="text-xs font-black text-cyan-400 uppercase tracking-[0.4em] mb-2">Network Liquidity</p>
                   <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.9]">
                      BOUNTY <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">BOARD</span>
                   </h1>
                </MotionDiv>
             </div>

             <div className="flex items-center gap-4">
                <Link 
                  href="/projects/create"
                  className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-widest flex items-center gap-2"
                >
                  <Rocket size={16} /> Post Bounty
                </Link>
             </div>
          </header>

          {/* Grid */}
          <div className="grid lg:grid-cols-1 gap-6">
             {bounties.length > 0 ? (
               bounties.map((bounty) => (
                 <div key={bounty.id} className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-pink-500/20 rounded-[2rem] blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                    <div className="relative">
                       <BountyCard bounty={bounty} />
                       {/* Project context tag */}
                       <div className="absolute top-4 right-4">
                          <Link 
                            href={`/projects/${bounty.projectId}`}
                            className="text-[8px] font-black uppercase tracking-widest text-slate-500 hover:text-cyan-400 transition-colors"
                          >
                             Project: {bounty.project.title}
                          </Link>
                       </div>
                    </div>
                 </div>
               ))
             ) : (
               <div className="py-32 text-center space-y-6 bg-[#0c1222]/30 rounded-[3rem] border border-dashed border-white/5">
                  <Briefcase size={48} className="text-slate-800 mx-auto" />
                  <div className="space-y-2">
                     <h2 className="text-xl font-bold text-slate-400 uppercase tracking-widest">No Active Missions</h2>
                     <p className="text-slate-600 text-sm">All protocols are currently stable. Check back later.</p>
                  </div>
               </div>
             )}
          </div>
       </div>
    </main>
  );
}
