'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Target, Zap, X, TrendingUp, Award } from 'lucide-react';

type RankingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  userRank: number | null;
  contributionScore: number;
  projectsCount: number;
  userName: string;
};

export default function RankingModal({ isOpen, onClose, userRank, contributionScore, projectsCount, userName }: RankingModalProps) {
  if (!isOpen) return null;

  const nextRankScore = userRank ? Math.ceil(contributionScore / 500) * 500 : 500;
  const progress = (contributionScore % 500) / 500 * 100;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#050510]/80 backdrop-blur-xl"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg bg-[#0a0f1d] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="p-8 pb-0 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-cyan-400" />
              </div>
              <h2 className="text-xl font-bold text-white uppercase tracking-widest">Operative Rank</h2>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-500 hover:text-white">
              <X size={20} />
            </button>
          </div>

          <div className="p-8 space-y-8">
            {/* Rank Display */}
            <div className="text-center p-10 rounded-3xl bg-gradient-to-b from-cyan-400/5 to-transparent border border-white/5 relative overflow-hidden">
               <div className="relative z-10">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mb-4">Current Standing</p>
                  <h3 className="text-6xl font-black text-white mb-2 tracking-tighter">
                    #{userRank || '---'}
                  </h3>
                  <p className="text-sm font-bold text-cyan-400 uppercase tracking-widest">Verified Operative</p>
               </div>
               {/* Background Decor */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
               <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total Score</span>
                  </div>
                  <p className="text-2xl font-bold text-white">{contributionScore.toLocaleString()}</p>
               </div>
               <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-pink-500" />
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Projects</span>
                  </div>
                  <p className="text-2xl font-bold text-white">{projectsCount}</p>
               </div>
            </div>

            {/* Progress to Next Level */}
            <div className="space-y-4">
               <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Next Milestone</p>
                    <p className="text-sm font-bold text-white">{nextRankScore} Points</p>
                  </div>
                  <p className="text-xs font-bold text-cyan-400">{Math.round(progress)}%</p>
               </div>
               <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-cyan-400 to-purple-500"
                  />
               </div>
            </div>

            {/* CTA */}
            <button 
              onClick={onClose}
              className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white py-4 rounded-2xl text-xs font-bold tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-2"
            >
              <Target className="w-4 h-4" /> BOOST YOUR RANKING
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
