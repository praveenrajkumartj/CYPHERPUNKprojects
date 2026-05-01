'use client';

import { motion } from 'framer-motion';
import { Send, ExternalLink } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getTelegramStats } from '@/app/community/actions';

export default function TelegramCard() {
  const [stats, setStats] = useState<{ channelName: string, subscribers: string, inviteLink: string } | null>(null);

  useEffect(() => {
    getTelegramStats().then(res => {
      if (res.success) setStats(res as any);
    });
  }, []);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="relative group p-8 rounded-2xl border border-white/5 bg-[#0a0f1d] overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
        <Send size={80} className="text-[#229ED9]" />
      </div>

      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl bg-[#229ED9]/10 border border-[#229ED9]/20 flex items-center justify-center mb-6">
          <Send className="w-6 h-6 text-[#229ED9]" />
        </div>

        <h3 className="text-xl font-bold text-white mb-2">{stats?.channelName || 'Cyberphunk Broadcast'}</h3>
        <p className="text-sm text-slate-500 mb-8 leading-relaxed">
          The fastest way to get official announcements, security alerts, and event reminders.
        </p>

        <div className="flex items-center gap-6 mb-8">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              {stats?.subscribers || '---'} Subscribers
            </span>
          </div>
        </div>

        <a
          href={stats?.inviteLink || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-[#229ED9] hover:bg-[#1c80b0] text-white px-6 py-4 rounded-xl text-xs font-bold tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(34,158,217,0.2)]"
        >
          Join Telegram <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#229ED9]/10 rounded-full blur-3xl pointer-events-none" />
    </motion.div>
  );
}
