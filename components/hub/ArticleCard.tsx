'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, User as UserIcon, ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';

interface ArticleCardProps {
  article: {
    id: string;
    title: string;
    excerpt: string | null;
    coverImage: string | null;
    tags: string[];
    readTime: number | null;
    createdAt: Date;
    author: {
      name: string;
      role: string;
    };
  };
  index: number;
}

export default function ArticleCard({ article, index }: ArticleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group relative bg-[#0a0f1d] border border-white/5 rounded-3xl overflow-hidden hover:border-cyan-500/30 transition-all shadow-2xl"
    >
      {/* Cover Image Placeholder */}
      <div className="aspect-video bg-gradient-to-br from-cyan-900/20 to-purple-900/20 relative flex items-center justify-center overflow-hidden">
        {article.coverImage ? (
          <img 
            src={article.coverImage} 
            alt={article.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <BookOpen className="w-12 h-12 text-cyan-500/20 group-hover:scale-110 transition-transform" />
        )}
        <div className="absolute top-4 left-4 flex gap-2">
          {article.tags.slice(0, 2).map(tag => (
            <span key={tag} className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[8px] font-bold text-cyan-400 uppercase tracking-widest">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="p-8">
        <div className="flex items-center gap-4 text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-4">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3 h-3 text-pink-500" />
            {new Date(article.createdAt).toLocaleDateString()}
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-cyan-500" />
            {article.readTime || 5} Min Read
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors line-clamp-2">
          {article.title}
        </h3>
        
        <p className="text-sm text-slate-400 mb-8 line-clamp-3 leading-relaxed">
          {article.excerpt || "Dive into the depths of the decentralized web with this exclusive CyberPhunk intelligence report..."}
        </p>

        <div className="flex items-center justify-between pt-6 border-t border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center">
              <UserIcon className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-white uppercase">{article.author.name}</p>
              <p className="text-[8px] text-slate-500 uppercase tracking-tighter">{article.author.role}</p>
            </div>
          </div>
          
          <Link 
            href={`/hub/blog/${article.id}`}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:bg-cyan-400 group-hover:text-[#050510] transition-all"
          >
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
