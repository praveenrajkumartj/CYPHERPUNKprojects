'use client';

import { motion } from 'framer-motion';

interface SkillBadgeProps {
  name: string;
  className?: string;
}

export default function SkillBadge({ name, className = "" }: SkillBadgeProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -2, scale: 1.05 }}
      className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border transition-all ${className}`}
    >
      {name}
    </motion.span>
  );
}
