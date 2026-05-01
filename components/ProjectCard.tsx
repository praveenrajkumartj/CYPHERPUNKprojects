'use client';

import { motion } from 'framer-motion';
import { Users, Tag, ArrowUpRight, Zap, Target } from 'lucide-react';
import Link from 'next/link';
import SkillBadge from './SkillBadge';

interface ProjectCardProps {
  project: any;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const statusColors: Record<string, string> = {
    idea: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    building: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    launched: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="group relative rounded-[2rem] border border-white/10 bg-[#0c1222]/50 backdrop-blur-xl p-8 shadow-2xl transition-all hover:border-cyan-500/30 flex flex-col h-full overflow-hidden"
    >
      {/* Decorative Glow */}
      <div className="absolute -right-20 -top-20 w-40 h-40 bg-cyan-500/10 blur-3xl group-hover:bg-cyan-500/20 transition-all rounded-full" />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-6">
          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${statusColors[project.status] || statusColors.idea}`}>
            {project.status}
          </span>
          <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-widest">
            <Users size={14} className="text-cyan-400" />
            Team: {project.teamSize}
          </div>
        </div>

        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors leading-tight">
          {project.title}
        </h3>
        
        <p className="text-slate-400 text-sm mb-8 line-clamp-3 leading-relaxed flex-grow">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {project.skills?.slice(0, 3).map((ps: any) => (
            <SkillBadge 
              key={ps.skill.id} 
              name={ps.skill.name} 
              className="bg-white/5 border-white/10 text-slate-300 group-hover:border-cyan-500/20 group-hover:text-cyan-400" 
            />
          ))}
          {project.skills?.length > 3 && (
            <span className="text-[10px] text-slate-600 font-bold self-center">+{project.skills.length - 3} more</span>
          )}
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-2">
                <Target size={14} className="text-pink-400" />
                <span className="text-xs font-bold text-slate-300">{project._count?.bounties || 0} Bounties</span>
             </div>
             <div className="flex items-center gap-2">
                <Users size={14} className="text-indigo-400" />
                <span className="text-xs font-bold text-slate-300">{project._count?.applications || 0} Apps</span>
             </div>
          </div>
          
          <Link 
            href={`/projects/${project.id}`}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:bg-cyan-500 group-hover:text-[#050510] group-hover:border-cyan-500 transition-all"
          >
            <ArrowUpRight size={20} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
