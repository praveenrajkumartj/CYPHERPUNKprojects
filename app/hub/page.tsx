import { getArticles, getTutorials, getResourceSessions } from './actions';
import ArticleCard from '@/components/hub/ArticleCard';
import TutorialCard from '@/components/hub/TutorialCard';
import VideoCard from '@/components/hub/VideoCard';
import { BookOpen, GraduationCap, PlayCircle, Trophy, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default async function LearningHubPage() {
  const [articlesRes, tutorialsRes, sessionsRes] = await Promise.all([
    getArticles(3),
    getTutorials(),
    getResourceSessions()
  ]);

  const articles = articlesRes.success ? articlesRes.articles : [];
  const tutorials = tutorialsRes.success ? tutorialsRes.tutorials : [];
  const sessions = sessionsRes.success ? sessionsRes.sessions : [];

  return (
    <main className="min-h-screen bg-[#050510] pt-32 pb-20 px-6 overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-cyan-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Hero Section */}
        <div className="mb-24">
           <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-cyan-400 mb-6">INTELLIGENCE REPOSITORY</p>
           <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[1.1]">
              From the <br />
              <span className="text-transparent bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 bg-clip-text italic">Cryptosphere</span>
           </h1>
           <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
              Master the decentralized protocols of tomorrow. Access exclusive research, step-by-step guides, and recorded sessions from the forefront of Web3.
           </p>
        </div>

        {/* Featured Content Tabs / Navigation */}
        <div className="flex flex-wrap gap-4 mb-20 border-b border-white/5 pb-8">
           {[
             { name: 'All Resources', icon: Sparkles, active: true },
             { name: 'Blog & Articles', icon: BookOpen },
             { name: 'Dev Tutorials', icon: GraduationCap },
             { name: 'Recorded Events', icon: PlayCircle },
             { name: 'Hackathon Guides', icon: Trophy }
           ].map((tab, i) => (
             <button key={i} className={`flex items-center gap-3 px-6 py-3 rounded-2xl border transition-all text-[10px] font-bold uppercase tracking-widest ${tab.active ? 'bg-cyan-400 border-cyan-400 text-[#050510]' : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/10 hover:bg-white/10'}`}>
                <tab.icon size={14} />
                {tab.name}
             </button>
           ))}
        </div>

        {/* Blog Section */}
        <section className="mb-32">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Intel & Intelligence</h2>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">The latest research from CyberPhunk labs</p>
            </div>
            <Link href="/hub/blog" className="text-cyan-400 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 hover:underline">
              View All Reports <ArrowRight size={14} />
            </Link>
          </div>
          
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article, i) => (
                <ArticleCard key={article.id} article={article as any} index={i} />
              ))}
            </div>
          ) : (
            <div className="p-20 rounded-[3rem] border border-white/5 bg-white/5 text-center">
               <p className="text-slate-500 italic">No intelligence reports found in the database. Operatives are currently gathering data...</p>
            </div>
          )}
        </section>

        {/* Tutorials Section */}
        <section className="mb-32">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Guided Learning</h2>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Step-by-step tracks to master protocols</p>
            </div>
            <Link href="/hub/tutorials" className="text-cyan-400 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 hover:underline">
              Explore Tracks <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid gap-6">
            {tutorials.length > 0 ? (
              tutorials.map((tutorial, i) => (
                <TutorialCard key={tutorial.id} tutorial={tutorial as any} index={i} />
              ))
            ) : (
              <div className="p-12 rounded-[2rem] border border-white/5 bg-white/5 text-center">
                 <p className="text-slate-500 italic">Curriculum is being drafted by our core developers...</p>
              </div>
            )}
          </div>
        </section>

        {/* Recorded Sessions */}
        <section className="mb-32">
           <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Visual Transmission</h2>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Replay workshops, meetups, and keynotes</p>
            </div>
            <Link href="/hub/sessions" className="text-cyan-400 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 hover:underline">
              Browse Archive <ArrowRight size={14} />
            </Link>
          </div>

          {sessions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {sessions.map((session, i) => (
                 <VideoCard key={session.id} session={session as any} index={i} />
               ))}
            </div>
          ) : (
            <div className="p-20 rounded-[3rem] border border-white/5 bg-white/5 text-center">
               <p className="text-slate-500 italic">Archival recordings are being uploaded to the node...</p>
            </div>
          )}
        </section>

        {/* Hackathon Guide Banner */}
        <section className="relative group">
           <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition-opacity" />
           <div className="relative p-12 md:p-20 rounded-[3rem] bg-[#0a0f1d] border border-white/10 overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                 <Trophy size={300} />
              </div>
              
              <div className="max-w-2xl relative z-10">
                 <p className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-6">OPPORTUNITY</p>
                 <h2 className="text-4xl md:text-5xl font-black text-white mb-8">Build for the <br />CyberPhunk Hackathon</h2>
                 <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                    Ready to turn your idea into a decentralized reality? Access our definitive guide on participation, MVP development, and winning pitch strategies.
                 </p>
                 
                 <div className="flex flex-wrap gap-6">
                    <Link href="/hub/guides" className="bg-white text-[#050510] px-10 py-5 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-cyan-400 transition-all shadow-xl">
                       Access Guides
                    </Link>
                    <button className="flex items-center gap-3 px-10 py-5 rounded-2xl border border-white/10 text-[10px] font-bold uppercase tracking-[0.2em] text-white hover:bg-white/5 transition-all">
                       Download Toolkit
                    </button>
                 </div>
              </div>
           </div>
        </section>
      </div>
    </main>
  );
}
