'use client';

import { motion } from 'framer-motion';
import { MessageSquare, ExternalLink, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getDiscordStats } from '@/app/community/actions';

export default function DiscordCard() {
  const [stats, setStats] = useState<{ serverName: string, onlineCount: number, inviteLink: string } | null>(null);

  useEffect(() => {
    getDiscordStats().then(res => {
      if (res.success) setStats(res as any);
    });
  }, []);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="relative group p-8 rounded-2xl border border-white/5 bg-[#0a0f1d] overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
        <MessageSquare size={80} className="text-[#5865F2]" />
      </div>

      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl bg-[#5865F2]/10 border border-[#5865F2]/20 flex items-center justify-center mb-6">
          <MessageSquare className="w-6 h-6 text-[#5865F2]" />
        </div>

        <h3 className="text-xl font-bold text-white mb-2">{stats?.serverName || 'Cyberphunk Discord'}</h3>
        <p className="text-sm text-slate-500 mb-8 leading-relaxed">
          Join our primary communication hub to chat with other builders, get support, and participate in governance.
        </p>

        <div className="flex items-center gap-6 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              {stats?.onlineCount.toLocaleString() || '---'} Online
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-slate-600" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Verified Community
            </span>
          </div>
        </div>

        <a
          href={stats?.inviteLink || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-[#5865F2] hover:bg-[#4752c4] text-white px-6 py-4 rounded-xl text-xs font-bold tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(88,101,242,0.2)]"
        >
          Join Discord <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Decorative gradient */}
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#5865F2]/10 rounded-full blur-3xl pointer-events-none" />
    </motion.div>
  );
}
