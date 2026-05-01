'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Trophy, Star, ExternalLink, Code } from 'lucide-react';
import { getTopMembers } from '@/app/community/actions';

type Member = {
  id: string;
  name: string;
  bio: string | null;
  contributionScore: number;
  skills: { skill: { name: string } }[];
  _count: { projects: true };
};

export default function MemberHighlights({ currentUserId }: { currentUserId?: string | null }) {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTopMembers(12).then(res => {
      if (res.success) setMembers(res.members as any);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-64 rounded-2xl bg-white/5 border border-white/5 animate-pulse" />
        ))}
      </div>
    );
  }

  if (members.length === 0) {
    return (
       <div className="py-20 text-center rounded-3xl border border-dashed border-white/10">
          <p className="text-slate-500 italic">No featured members yet. Start contributing to appear here!</p>
       </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {members.map((member, i) => (
        <Link key={member.id} href={`/profile/${member.id}`} className="block group">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -5 }}
            className={`relative h-full p-8 rounded-2xl border bg-[#0a0f1d] transition-all overflow-hidden ${
              member.id === currentUserId 
                ? 'border-cyan-400/50 shadow-[0_0_20px_rgba(34,211,238,0.1)]' 
                : 'border-white/5 group-hover:border-cyan-500/30'
            }`}
          >
            {/* Badge */}
            {i === 0 && (
              <div className="absolute -top-3 -right-3 px-3 py-1 rounded-full bg-yellow-500 text-[#050510] text-[8px] font-black tracking-widest uppercase flex items-center gap-1 shadow-[0_0_15px_rgba(234,179,8,0.4)] z-20">
                <Trophy className="w-3 h-3" /> Top Contributor
              </div>
            )}
            {member.id === currentUserId && i !== 0 && (
              <div className="absolute -top-3 -right-3 px-3 py-1 rounded-full bg-cyan-400 text-[#050510] text-[8px] font-black tracking-widest uppercase z-20">
                YOU
              </div>
            )}

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 p-[1px]">
                  <div className="w-full h-full rounded-2xl bg-[#0a0f1d] flex items-center justify-center overflow-hidden">
                     {/* Placeholder for user image */}
                     <span className="text-xl font-bold text-white">{member.name[0]}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-cyan-400 font-bold mb-1">
                    <Star className="w-3 h-3 fill-cyan-400" />
                    <span className="text-sm">{member.contributionScore}</span>
                  </div>
                  <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Score</span>
                </div>
              </div>

              <h4 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{member.name}</h4>
              <p className="text-xs text-slate-500 mb-6 line-clamp-2 leading-relaxed">
                {member.bio || 'A mysterious builder shaping the decentralized future.'}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {member.skills.slice(0, 3).map((s, idx) => (
                  <span key={idx} className="px-2 py-1 rounded-md bg-white/5 border border-white/5 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                    {s.skill.name}
                  </span>
                ))}
                {member.skills.length > 3 && (
                  <span className="px-2 py-1 rounded-md bg-white/5 text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                    +{member.skills.length - 3}
                  </span>
                )}
              </div>

              <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                  <Code className="w-3 h-3" />
                  {member._count.projects} Projects
                </div>
                <div className="text-cyan-400 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </motion.div>
        </Link>
      ))}
    </div>
  );
}
