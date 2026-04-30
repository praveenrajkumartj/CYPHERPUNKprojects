'use client';

import { motion } from 'framer-motion';

export default function StatsDistribution() {
  const items = [
    { label: 'Hackathons', value: 45, color: 'bg-cyan-400' },
    { label: 'Workshops', value: 30, color: 'bg-pink-500' },
    { label: 'Meetups', value: 25, color: 'bg-[#ffd700]' },
  ];

  return (
    <div className="space-y-6">
      {items.map((item, i) => (
        <div key={i} className="space-y-2">
          <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-400">
            <span>{item.label}</span>
            <span>{item.value}%</span>
          </div>
          <div className="h-3 bg-white/5 rounded-full overflow-hidden border border-white/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${item.value}%` }}
              transition={{ delay: 0.5 + (i * 0.1), duration: 1 }}
              className={`h-full ${item.color} shadow-[0_0_15px_rgba(0,0,0,0.5)]`}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
