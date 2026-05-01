// Triggering recompile for new Prisma schema
import { getProjects } from '@/app/actions/projects';
import ProjectGrid from '@/components/ProjectGrid';
import { Target, Search, Sparkles } from 'lucide-react';
import MotionDiv from '@/components/MotionDiv';

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="min-h-screen bg-[#050510] text-white pt-32 pb-24 px-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-pink-500/10 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <header className="mb-20 space-y-6">
          <MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-widest mb-4">
                <Sparkles size={12} /> Marketplace Live
             </div>
             <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
               COLLAB <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">MARKET</span>
             </h1>
             <p className="text-slate-400 max-w-2xl text-xl leading-relaxed">
               Ship faster by finding the perfect team or contributing to high-impact Web3 protocols. 
               Browse active projects and bounties in the Cypherpunk ecosystem.
             </p>
          </MotionDiv>
        </header>

        <ProjectGrid initialProjects={projects} />
      </div>
    </main>
  );
}
