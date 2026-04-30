'use client';

import { motion } from 'framer-motion';

export default function StatsChart() {
  const data = [40, 70, 45, 90, 65, 80, 100, 85, 95, 110, 105, 120];

  return (
    <div className="h-64 flex items-end gap-4 px-4">
      {data.map((h, i) => (
        <div key={i} className="flex-1 group relative">
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ delay: i * 0.05, duration: 1 }}
            className="w-full bg-gradient-to-t from-cyan-500/10 to-cyan-400 rounded-t-lg group-hover:to-pink-500 transition-all cursor-pointer"
          />
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-[#050510] text-[10px] font-bold px-2 py-1 rounded">
            {h}%
          </div>
        </div>
      ))}
    </div>
  );
}
