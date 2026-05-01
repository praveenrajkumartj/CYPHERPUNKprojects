'use client';

import { motion } from 'framer-motion';
import { Layers, Zap, ArrowRight, BookOpen, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface TutorialCardProps {
  tutorial: {
    id: string;
    title: string;
    description: string;
    category: string;
    difficulty: string;
    thumbnail: string | null;
    _count: { lessons: number };
  };
  index: number;
}

export default function TutorialCard({ tutorial, index }: TutorialCardProps) {
  const getCategoryStyles = (cat: string) => {
    if (cat.toLowerCase().includes('solana')) return 'from-purple-500/20 to-emerald-500/20 text-emerald-400';
    if (cat.toLowerCase().includes('bitcoin')) return 'from-orange-500/20 to-yellow-500/20 text-yellow-500';
    return 'from-cyan-500/20 to-blue-500/20 text-cyan-400';
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-[#0a0f1d] border border-white/5 rounded-3xl overflow-hidden hover:border-white/10 transition-all"
    >
      <div className="flex flex-col md:flex-row h-full">
        {/* Category Visual */}
        <div className={`md:w-48 bg-gradient-to-br ${getCategoryStyles(tutorial.category)} flex flex-col items-center justify-center p-8 gap-4`}>
          <div className="w-16 h-16 rounded-2xl bg-black/20 backdrop-blur-md flex items-center justify-center shadow-xl">
             {tutorial.category.toLowerCase().includes('solana') ? (
               <Zap className="w-8 h-8" />
             ) : (
               <Layers className="w-8 h-8" />
             )}
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap">
            {tutorial.category}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 p-8">
          <div className="flex items-center gap-3 mb-4">
             <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[8px] font-bold text-slate-500 uppercase tracking-widest">
               {tutorial.difficulty}
             </span>
             <span className="flex items-center gap-1 text-[8px] font-bold text-cyan-400 uppercase tracking-widest">
               <BookOpen className="w-3 h-3" />
               {tutorial._count.lessons} Modules
             </span>
          </div>

          <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
            {tutorial.title}
          </h3>
          
          <p className="text-sm text-slate-400 mb-8 leading-relaxed line-clamp-2">
            {tutorial.description}
          </p>

          <Link 
            href={`/hub/tutorials/${tutorial.id}`}
            className="inline-flex items-center gap-2 text-xs font-bold text-white uppercase tracking-widest group/btn"
          >
            Start Learning 
            <ChevronRight className="w-4 h-4 text-cyan-400 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Progress Decor */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: '30%' }}
          className="h-full bg-gradient-to-r from-cyan-400 to-purple-500"
        />
      </div>
    </motion.div>
  );
}
