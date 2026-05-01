'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  MapPin, 
  Code, 
  Wallet, 
  Loader2, 
  Star, 
  Folder, 
  ArrowLeft,
  ChevronRight,
  Shield,
  Zap,
  ExternalLink
} from 'lucide-react';

export default function UserProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/profile/${id}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#050510] flex items-center justify-center">
        <Loader2 className="animate-spin text-cyan-400" size={48} />
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-[#050510] flex flex-col items-center justify-center text-white p-6">
        <h1 className="text-4xl font-bold mb-4">User Not Found</h1>
        <Link href="/community" className="text-cyan-400 hover:underline">Return to Community</Link>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-[#050510] text-[#f8fbff] overflow-x-hidden selection:bg-cyan-500/30 pb-20">
      {/* Background Decor */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,255,255,0.05),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(255,0,127,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:linear-gradient(to_bottom,black_20%,transparent_80%)] opacity-20" />
      </div>

      <div className="relative z-10 pt-10 px-6 container mx-auto max-w-5xl">
        {/* Back Button */}
        <Link href="/community" className="group flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-cyan-400 transition-colors uppercase tracking-[0.2em] mb-12">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Rankings
        </Link>

        <div className="grid lg:grid-cols-[350px_1fr] gap-12">
          {/* Sidebar */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-10 rounded-[2.5rem] bg-[#0a0f1d] border border-white/10 flex flex-col items-center text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-600" />
              
              <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-cyan-400 to-purple-600 p-[2px] mb-8 relative group">
                <div className="w-full h-full rounded-[2.4rem] bg-[#050510] flex items-center justify-center text-5xl font-black text-white">
                  {user.name.charAt(0)}
                </div>
                <div className="absolute -bottom-2 -right-2 bg-emerald-500 w-6 h-6 rounded-full border-4 border-[#0a0f1d]" title="Online" />
              </div>

              <h1 className="text-2xl font-bold text-white mb-2">{user.name}</h1>
              <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6">
                 {user.role}
              </div>

              <div className="w-full space-y-4 pt-8 border-t border-white/5 text-left">
                <div className="flex items-center gap-4 text-slate-400 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                    <Mail size={14} className="text-cyan-400" />
                  </div>
                  <span className="truncate">{user.email}</span>
                </div>
                <div className="flex items-center gap-4 text-slate-400 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                    <MapPin size={14} className="text-pink-500" />
                  </div>
                  <span>{user.location || 'Distributed'}</span>
                </div>
                <div className="flex items-center gap-4 text-slate-400 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                    <Wallet size={14} className="text-orange-400" />
                  </div>
                  <span className="truncate font-mono text-[10px]">{user.walletAddress || '0x...'}</span>
                </div>
              </div>
            </motion.div>

            {/* Stats Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-8 rounded-3xl bg-[#0a0f1d] border border-white/10"
            >
              <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6">Network Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                 <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Score</p>
                    <p className="text-xl font-black text-cyan-400">{user.contributionScore}</p>
                 </div>
                 <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Projects</p>
                    <p className="text-xl font-black text-white">{user._count.projects}</p>
                 </div>
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            {/* About */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-10 rounded-[2.5rem] bg-[#0a0f1d] border border-white/10"
            >
              <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-[0.3em] mb-6">OPERATIVE BIO</h2>
              <p className="text-lg text-slate-400 leading-relaxed italic">
                "{user.bio || 'This operative is working in the shadows. No bio provided.'}"
              </p>
            </motion.div>

            {/* Skills */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="p-10 rounded-[2.5rem] bg-[#0a0f1d] border border-white/10"
            >
              <h2 className="text-sm font-bold text-pink-500 uppercase tracking-[0.3em] mb-8">SKILL REPOSITORY</h2>
              <div className="flex flex-wrap gap-3">
                 {user.skills.map((s: any, i: number) => (
                    <div key={i} className="px-6 py-3 rounded-xl bg-white/5 border border-white/5 text-sm font-bold text-slate-300 flex items-center gap-3 group hover:border-cyan-500/50 transition-all cursor-default">
                       <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                       {s.skill.name}
                    </div>
                 ))}
                 {user.skills.length === 0 && <p className="text-slate-500 italic">No skills verified yet.</p>}
              </div>
            </motion.div>

            {/* Achievements/Security */}
            <div className="grid md:grid-cols-2 gap-8">
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.2 }}
                 className="p-8 rounded-[2rem] bg-gradient-to-br from-cyan-400/10 to-transparent border border-cyan-400/20"
               >
                  <Shield className="text-cyan-400 mb-6" size={32} />
                  <h4 className="text-lg font-bold text-white mb-2">Verified Builder</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    This user has successfully verified their identity through our decentralized protocols.
                  </p>
               </motion.div>
               
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.3 }}
                 className="p-8 rounded-[2rem] bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20"
               >
                  <Zap className="text-purple-400 mb-6" size={32} />
                  <h4 className="text-lg font-bold text-white mb-2">Active Pioneer</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Contributing consistently to the core Cyberphunk protocols and ecosystem projects.
                  </p>
               </motion.div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
