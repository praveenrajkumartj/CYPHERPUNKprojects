'use client';

import { motion } from 'framer-motion';
import { MapPin, Code, MessageCircle, Link2, Briefcase, Users, Plus, Check, Clock, Shield, Wallet, Calendar } from 'lucide-react';
import SkillBadge from './SkillBadge';
import { sendConnectionRequest } from '@/app/actions/networking';
import { useState } from 'react';

interface PublicProfileClientProps {
  user: any;
  currentUserId?: string;
}

export default function PublicProfileClient({ user, currentUserId }: PublicProfileClientProps) {
  const [status, setStatus] = useState(user.connectionStatus);
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    if (loading || status) return;
    setLoading(true);
    const res = await sendConnectionRequest(user.id);
    if (res.success) setStatus('PENDING');
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="relative rounded-[3rem] border border-white/10 bg-[#0c1222]/50 backdrop-blur-3xl p-8 md:p-12 overflow-hidden shadow-2xl">
        {/* Background Glows */}
        <div className="absolute -left-20 -top-20 w-64 h-64 bg-cyan-500/20 blur-[100px] rounded-full" />
        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-indigo-500/20 blur-[100px] rounded-full" />
        
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
          <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-cyan-500 via-indigo-500 to-purple-600 flex items-center justify-center text-white font-black text-5xl shadow-2xl rotate-3">
            {user.profile?.name?.[0] || user.username[0].toUpperCase()}
          </div>
          
          <div className="flex-1 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-4xl font-black tracking-tight text-white mb-1">
                  {user.profile?.name || user.username}
                </h1>
                <p className="text-cyan-400 font-mono tracking-widest uppercase text-xs">@{user.username}</p>
              </div>
              
              {currentUserId && currentUserId !== user.id && (
                <button
                  onClick={handleConnect}
                  disabled={loading || !!status}
                  className={`flex items-center gap-2 px-8 py-3 rounded-2xl text-sm font-black transition-all shadow-xl tracking-widest uppercase ${
                    status === 'ACCEPTED' 
                      ? 'bg-emerald-500 text-white shadow-emerald-500/20' 
                      : status === 'PENDING'
                      ? 'bg-slate-700 text-slate-300'
                      : 'bg-white text-[#050510] hover:bg-cyan-400 hover:scale-105 active:scale-95 shadow-white/10'
                  }`}
                >
                  {status === 'ACCEPTED' ? (
                    <><Check size={18} /> Protocol Linked</>
                  ) : status === 'PENDING' ? (
                    <><Clock size={18} /> Request Sent</>
                  ) : (
                    <><Plus size={18} /> Request Access</>
                  )}
                </button>
              )}
            </div>

            <p className="text-lg text-slate-300 leading-relaxed max-w-2xl">
              {user.profile?.bio || "This builder hasn't set an encryption key for their bio yet."}
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm text-slate-400 pt-4">
              {user.profile?.location && (
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-cyan-400" />
                  {user.profile.location}
                </div>
              )}
              {user.profile?.walletAddress && (
                <div className="flex items-center gap-2 font-mono">
                  <Wallet size={16} className="text-indigo-400" />
                  {user.profile.walletAddress.slice(0, 6)}...{user.profile.walletAddress.slice(-4)}
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-slate-500" />
                Joined {new Date(user.createdAt).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
        <div className="space-y-8">
          {/* Skills Section */}
          <div className="rounded-[2.5rem] border border-white/10 bg-[#0c1222]/30 p-8">
            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
              <Shield className="text-cyan-400" size={24} /> Technical Arsenal
            </h3>
            <div className="flex flex-wrap gap-3">
              {user.skills?.map((s: any) => (
                <SkillBadge 
                  key={s.skill.id} 
                  name={s.skill.name} 
                  className="px-5 py-2.5 bg-cyan-500/5 border-cyan-500/20 text-cyan-400 text-xs shadow-lg" 
                />
              ))}
              {(!user.skills || user.skills.length === 0) && (
                <p className="text-slate-500 italic">No skills documented in the ledger.</p>
              )}
            </div>
          </div>

          {/* Activity/History Placeholder */}
          <div className="rounded-[2.5rem] border border-white/10 bg-[#0c1222]/30 p-8">
            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
              <Calendar className="text-indigo-400" size={24} /> Protocol History
            </h3>
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex justify-between items-center opacity-50">
                <span className="text-slate-400 text-sm">Deployment History coming soon...</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Status Badges */}
          <div className="rounded-[2rem] border border-white/10 bg-[#0c1222]/30 p-8 space-y-4">
            <h4 className="text-xs font-black tracking-widest text-slate-500 uppercase">Current Status</h4>
            
            {user.profile?.lookingForTeam && (
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-pink-500/10 border border-pink-500/20 text-pink-400">
                <Users size={20} />
                <span className="text-xs font-bold uppercase tracking-wider">Looking for Team</span>
              </div>
            )}
            
            {user.profile?.hiring && (
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <Briefcase size={20} />
                <span className="text-xs font-bold uppercase tracking-wider">Hiring Engineers</span>
              </div>
            )}

            {!user.profile?.lookingForTeam && !user.profile?.hiring && (
              <p className="text-slate-500 text-xs italic">No active networking signals.</p>
            )}
          </div>

          {/* Social Links */}
          <div className="rounded-[2rem] border border-white/10 bg-[#0c1222]/30 p-8 space-y-6">
            <h4 className="text-xs font-black tracking-widest text-slate-500 uppercase">External Links</h4>
            <div className="space-y-3">
              {user.profile?.githubUrl && (
                <a href={user.profile.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all border border-white/5 group">
                  <div className="flex items-center gap-3">
                    <Code size={20} className="text-slate-400 group-hover:text-white" />
                    <span className="text-sm font-medium text-slate-300">GitHub</span>
                  </div>
                  <Check size={16} className="text-emerald-500" />
                </a>
              )}
              {user.profile?.twitterUrl && (
                <a href={user.profile.twitterUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all border border-white/5 group">
                  <div className="flex items-center gap-3">
                    <MessageCircle size={20} className="text-slate-400 group-hover:text-white" />
                    <span className="text-sm font-medium text-slate-300">Twitter</span>
                  </div>
                  <Check size={16} className="text-emerald-500" />
                </a>
              )}
              {user.profile?.linkedinUrl && (
                <a href={user.profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all border border-white/5 group">
                  <div className="flex items-center gap-3">
                    <Link2 size={20} className="text-slate-400 group-hover:text-white" />
                    <span className="text-sm font-medium text-slate-300">LinkedIn</span>
                  </div>
                  <Check size={16} className="text-emerald-500" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
