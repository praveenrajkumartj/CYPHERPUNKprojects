'use client';

import { motion } from 'framer-motion';
import { User, MapPin, Code, MessageCircle, Briefcase, Users, Plus, Check, Clock } from 'lucide-react';
import Link from 'next/link';
import SkillBadge from './SkillBadge';
import { sendConnectionRequest } from '@/app/actions/networking';
import { useState } from 'react';

interface UserCardProps {
  user: any;
  currentUserId?: string;
}

export default function UserCard({ user, currentUserId }: UserCardProps) {
  const [status, setStatus] = useState(user.connection?.status || null);
  const [loading, setLoading] = useState(false);

  const handleConnect = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (loading || status) return;
    
    setLoading(true);
    const res = await sendConnectionRequest(user.id);
    if (res.success) {
      setStatus('PENDING');
    }
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="group relative rounded-3xl border border-white/10 bg-[#0c1222]/50 backdrop-blur-xl p-6 shadow-2xl transition-all hover:border-cyan-500/30 overflow-hidden"
    >
      {/* Decorative Glow */}
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-cyan-500/10 blur-3xl group-hover:bg-cyan-500/20 transition-all rounded-full" />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
              {user.profile?.name?.[0] || user.username[0].toUpperCase()}
            </div>
            <div>
              <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                {user.profile?.name || user.username}
              </h3>
              <p className="text-xs text-slate-400 font-mono">@{user.username}</p>
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            {user.profile?.lookingForTeam && (
              <span className="px-2 py-1 rounded-md bg-pink-500/10 border border-pink-500/20 text-[10px] font-bold text-pink-400 uppercase tracking-wider">
                Looking for Team
              </span>
            )}
            {user.profile?.hiring && (
              <span className="px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                Hiring
              </span>
            )}
          </div>
        </div>

        <p className="text-sm text-slate-300 line-clamp-2 mb-6 flex-grow">
          {user.profile?.bio || "No bio yet."}
        </p>

        {user.profile?.location && (
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
            <MapPin size={14} className="text-cyan-400" />
            {user.profile.location}
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-8">
          {user.skills?.slice(0, 3).map((s: any) => (
            <SkillBadge 
              key={s.skill.id} 
              name={s.skill.name} 
              className="bg-cyan-500/5 border-cyan-500/20 text-cyan-400" 
            />
          ))}
          {user.skills?.length > 3 && (
            <span className="text-[10px] text-slate-500 font-bold self-center">+{user.skills.length - 3} more</span>
          )}
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-white/5">
          <div className="flex gap-3">
            {user.profile?.githubUrl && (
              <a href={user.profile.githubUrl} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors">
                <Code size={18} />
              </a>
            )}
            {user.profile?.twitterUrl && (
              <a href={user.profile.twitterUrl} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors">
                <MessageCircle size={18} />
              </a>
            )}
          </div>

          <div className="flex gap-2">
            <Link 
              href={`/user/${user.username}`}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
            >
              View Profile
            </Link>
            
            {currentUserId !== user.id && (
              <button
                onClick={handleConnect}
                disabled={loading || !!status}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-lg ${
                  status === 'ACCEPTED' 
                    ? 'bg-emerald-500 text-white shadow-emerald-500/20' 
                    : status === 'PENDING'
                    ? 'bg-slate-700 text-slate-300'
                    : 'bg-cyan-500 text-[#050510] hover:bg-cyan-400 shadow-cyan-500/20 active:scale-95'
                }`}
              >
                {status === 'ACCEPTED' ? (
                  <><Check size={14} /> Connected</>
                ) : status === 'PENDING' ? (
                  <><Clock size={14} /> Pending</>
                ) : (
                  <><Plus size={14} /> Connect</>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
