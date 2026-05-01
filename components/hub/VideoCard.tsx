'use client';

import { motion } from 'framer-motion';
import { Play, Calendar, Video, ExternalLink, Info } from 'lucide-react';
import { getYouTubeThumbnail } from '@/lib/youtube';

interface VideoCardProps {
  session: {
    id: string;
    title: string;
    description: string;
    videoUrl: string;
    thumbnail: string | null;
    eventName: string | null;
    date: Date;
    tags: string[];
  };
  index: number;
}

export default function VideoCard({ session, index }: VideoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-[#0a0f1d] border border-white/5 rounded-3xl overflow-hidden hover:border-pink-500/30 transition-all"
    >
      {/* Video Preview */}
      <div className="aspect-video relative overflow-hidden bg-slate-900 flex items-center justify-center">
        <img 
          src={session.thumbnail || getYouTubeThumbnail(session.videoUrl)} 
          alt={session.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (!target.src.includes('mqdefault')) {
              const match = session.videoUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
              if (match) {
                 target.src = `https://img.youtube.com/vi/${match[1]}/mqdefault.jpg`;
              }
            }
          }}
        />
        
        {/* Play Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-pink-500 text-white flex items-center justify-center shadow-[0_0_30px_rgba(236,72,153,0.5)] scale-90 group-hover:scale-100 transition-transform">
            <Play className="w-6 h-6 fill-white ml-1" />
          </div>
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center z-10">
           <span className="px-2 py-1 rounded bg-black/60 backdrop-blur-md text-[8px] font-bold text-white uppercase tracking-widest border border-white/10">
             HD REPLAY
           </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-4 text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-4">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3 h-3 text-pink-500" />
            {new Date(session.date).toLocaleDateString()}
          </div>
          {session.eventName && (
            <div className="flex items-center gap-1.5">
              <Info className="w-3 h-3 text-cyan-500" />
              {session.eventName}
            </div>
          )}
        </div>

        <h4 className="text-lg font-bold text-white mb-2 group-hover:text-pink-400 transition-colors line-clamp-1">
          {session.title}
        </h4>
        <p className="text-xs text-slate-400 mb-6 line-clamp-2 leading-relaxed">
          {session.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {session.tags.map(tag => (
            <span key={tag} className="text-[8px] font-bold text-slate-600 uppercase tracking-widest px-2 py-1 bg-white/5 rounded border border-white/5">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <a 
        href={session.videoUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="absolute inset-0 z-20"
      />
    </motion.div>
  );
}
