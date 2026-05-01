'use client';

import { motion } from 'framer-motion';
import { MessageCircle, MessageSquare, Send, Code, Video, ExternalLink, Users, TrendingUp } from 'lucide-react';

const socials = [
  { 
    name: 'X / Twitter', 
    handle: '@CYBERPHUNK', 
    icon: MessageCircle, 
    color: 'text-white',
    stats: '24.5K Followers',
    link: 'https://x.com/cyberphunk',
    accent: 'bg-white'
  },
  { 
    name: 'Discord', 
    handle: 'CYBERPHUNK SERVER', 
    icon: MessageSquare, 
    color: 'text-[#5865F2]',
    stats: '12.2K Members',
    link: 'https://discord.gg/cyberphunk',
    accent: 'bg-[#5865F2]'
  },
  { 
    name: 'Telegram', 
    handle: 'T.ME/CYBERPHUNK', 
    icon: Send, 
    color: 'text-[#229ED9]',
    stats: '15.4K Subscribed',
    link: 'https://t.me/cyberphunk',
    accent: 'bg-[#229ED9]'
  },
  { 
    name: 'GitHub', 
    handle: 'CYBERPHUNK-DEV', 
    icon: Code, 
    color: 'text-white',
    stats: '842 Stars',
    link: 'https://github.com/cyberphunk',
    accent: 'bg-white'
  },
  { 
    name: 'YouTube', 
    handle: 'CYBERPHUNK LABS', 
    icon: Video, 
    color: 'text-[#FF0000]',
    stats: '5.2K Subscribers',
    link: 'https://youtube.com/cyberphunk',
    accent: 'bg-[#FF0000]'
  }
];

export default function SocialConversationGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {socials.map((social, i) => (
        <motion.a
          key={i}
          href={social.link}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          whileHover={{ scale: 1.02, y: -5 }}
          className="group relative p-6 rounded-2xl bg-[#0a0f1d] border border-white/5 flex items-center justify-between hover:bg-white/10 hover:border-white/10 transition-all cursor-pointer overflow-hidden"
        >
          {/* Accent Glow */}
          <div className={`absolute -right-4 -bottom-4 w-20 h-20 ${social.accent}/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity`} />

          <div className="flex items-center gap-4 relative z-10">
            <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${social.color} group-hover:scale-110 transition-transform`}>
              <social.icon className="w-6 h-6" />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-white mb-0.5">{social.name}</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest group-hover:text-cyan-400 transition-colors">{social.handle}</p>
              
              {/* Dynamic Stats Reveal */}
              <div className="h-0 group-hover:h-4 overflow-hidden transition-all duration-300 opacity-0 group-hover:opacity-100 flex items-center gap-2 mt-1">
                 <Users className="w-3 h-3 text-slate-600" />
                 <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{social.stats}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2 relative z-10">
             <ExternalLink className="w-4 h-4 text-slate-700 group-hover:text-cyan-400 transition-colors" />
             <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse opacity-0 group-hover:opacity-100" />
          </div>
        </motion.a>
      ))}
      
      {/* Featured Newsletter Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="group p-6 rounded-2xl bg-gradient-to-br from-cyan-400/10 to-purple-500/10 border border-cyan-400/20 flex items-center justify-between hover:from-cyan-400/20 hover:to-purple-500/20 transition-all cursor-pointer"
      >
        <div className="flex items-center gap-4">
           <div className="w-12 h-12 rounded-xl bg-cyan-400/10 flex items-center justify-center text-cyan-400">
              <TrendingUp className="w-6 h-6" />
           </div>
           <div className="text-left">
              <p className="text-sm font-bold text-white">Join Newsletter</p>
              <p className="text-[10px] text-cyan-400/70 font-bold uppercase tracking-widest">WEEKLY INTEL</p>
           </div>
        </div>
        <div className="px-3 py-1 rounded-full bg-cyan-400 text-[#050510] text-[8px] font-black uppercase tracking-widest">
           SOON
        </div>
      </motion.div>
    </div>
  );
}
