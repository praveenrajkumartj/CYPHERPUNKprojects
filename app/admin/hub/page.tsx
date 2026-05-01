"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Lightbulb, 
  Video, 
  Trophy, 
  ArrowLeft, 
  Shield, 
  Plus, 
  Settings, 
  ChevronRight,
  Database,
  Globe
} from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function AdminHubPage() {
  const [stats, setStats] = useState({
    articles: 0,
    tutorials: 0,
    sessions: 0,
    guides: 0
  });

  useEffect(() => {
    // Fetch stats
    const fetchStats = async () => {
      try {
        const [art, tut, sess, guid] = await Promise.all([
          fetch('/api/articles').then(res => res.json()),
          fetch('/api/tutorials').then(res => res.json()),
          fetch('/api/sessions').then(res => res.json()),
          fetch('/api/guides').then(res => res.json())
        ]);
        
        setStats({
          articles: art.total || 0,
          tutorials: tut.length || 0,
          sessions: sess.length || 0,
          guides: guid.length || 0
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  const managementCards = [
    {
      title: 'Blog & Articles',
      icon: BookOpen,
      count: stats.articles,
      href: '/admin/hub/articles',
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-400/10',
      description: 'Manage news, technical deep dives, and announcements.'
    },
    {
      title: 'Tutorials',
      icon: Lightbulb,
      count: stats.tutorials,
      href: '/admin/hub/tutorials',
      color: 'text-pink-500',
      bgColor: 'bg-pink-500/10',
      description: 'Structured step-by-step guides for Web3 development.'
    },
    {
      title: 'Recorded Sessions',
      icon: Video,
      count: stats.sessions,
      href: '/admin/hub/sessions',
      color: 'text-orange-400',
      bgColor: 'bg-orange-400/10',
      description: 'Community workshops and recorded live sessions.'
    },
    {
      title: 'Hackathon Guides',
      icon: Trophy,
      count: stats.guides,
      href: '/admin/hub/guides',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10',
      description: 'Resource guides to help builders win hackathons.'
    }
  ];

  return (
    <main className="min-h-screen bg-[#050510] text-[#f8fbff]">
      <Navbar />

      <div className="pt-32 pb-20 container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-cyan-400/20 flex items-center justify-center text-cyan-400 border border-cyan-400/30">
              <Shield size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight">Learning Hub CMS</h1>
              <p className="text-slate-400">Content Management System for CyberPhunk DAO resources.</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              href="/learn" 
              className="px-6 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-sm font-bold uppercase tracking-wider flex items-center gap-2 transition"
            >
              <Globe size={18} />
              View Live Hub
            </Link>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {managementCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl border border-white/5 bg-[#0a0f1d] hover:border-white/10 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${card.bgColor} ${card.color}`}>
                  <card.icon size={20} />
                </div>
                <span className="text-2xl font-bold">{card.count}</span>
              </div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{card.title}</p>
            </motion.div>
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
          <Database size={24} className="text-cyan-400" />
          Manage Content
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {managementCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
            >
              <Link href={card.href}>
                <div className="group p-8 rounded-2xl border border-white/10 bg-[#0a0f1d] hover:border-white/30 transition-all flex flex-col h-full relative overflow-hidden">
                  <div className={`absolute top-0 right-0 w-32 h-32 ${card.bgColor} blur-[80px] -mr-16 -mt-16 group-hover:opacity-100 transition-opacity opacity-50`} />
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-xl ${card.bgColor} ${card.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <card.icon size={28} />
                    </div>
                    <ChevronRight size={24} className="text-slate-600 group-hover:text-white transition-all group-hover:translate-x-2" />
                  </div>

                  <h3 className="text-2xl font-bold mb-3">{card.title}</h3>
                  <p className="text-slate-400 mb-8 flex-grow">{card.description}</p>

                  <div className="flex items-center gap-3">
                    <button className={`flex items-center gap-2 px-4 py-2 rounded-lg ${card.bgColor} ${card.color} font-bold text-xs uppercase tracking-widest`}>
                      <Plus size={14} /> New {card.title.slice(0, -1)}
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-white transition">
                      <Settings size={14} /> View All
                    </button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
