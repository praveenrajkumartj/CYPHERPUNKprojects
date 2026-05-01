'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play, X, Calendar, Tag, Video as VideoIcon, AlertCircle } from 'lucide-react';
import { getResourceSessions } from '@/app/hub/actions';
import { getYouTubeThumbnail, getYouTubeEmbedUrl } from '@/lib/youtube';

interface ResourceSession {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnail: string | null;
  eventName: string | null;
  tags: string[];
  date: string;
}

export default function SessionsPage() {
  const [sessions, setSessions] = useState<ResourceSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedSession, setSelectedSession] = useState<ResourceSession | null>(null);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await getResourceSessions();
        if (res.success && res.sessions) {
          // Convert date string to Date if needed, though here we use it as string
          setSessions(res.sessions as any);
        } else {
          console.error('Failed to load sessions:', res.error);
          setSessions([]);
        }
      } catch (error) {
        console.error('Error in fetchSessions:', error);
        setSessions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  const sessionsArray = Array.isArray(sessions) ? sessions : [];
  const allTags = Array.from(new Set(sessionsArray.flatMap(s => s.tags)));
  const filteredSessions = selectedTag
    ? sessionsArray.filter(s => s.tags.includes(selectedTag))
    : sessionsArray;

  return (
    <main className="min-h-screen bg-[#050510] text-[#f8fbff]">
      {/* Header */}
      <header className="relative z-50 border-b border-white/10 sticky top-0 bg-[#050510]/80 backdrop-blur-md">
        <nav className="container mx-auto flex items-center justify-between px-6 py-6">
          <Link href="/" className="font-semibold uppercase tracking-[0.35em] text-cyan-400">
            CYBERPHUNK
          </Link>
          <Link href="/learn" className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-widest hover:text-cyan-300">
            <ArrowLeft className="w-4 h-4" />
            Back to Learn
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative z-10 py-20 px-6 text-center border-b border-white/5">
        <div className="container mx-auto max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6"
          >
            Recorded <span className="text-transparent bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text">Sessions</span>
          </motion.h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Catch up on workshops, community talks, and deep dives you might have missed.
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="relative z-10 py-8 px-6 border-b border-white/5">
        <div className="container mx-auto max-w-6xl overflow-x-auto pb-2 flex gap-3 no-scrollbar">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all shrink-0 ${
              !selectedTag ? 'bg-orange-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.3)]' : 'bg-white/5 text-slate-400 border border-white/5 hover:border-white/20'
            }`}
          >
            All Sessions
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all shrink-0 ${
                selectedTag === tag ? 'bg-orange-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.3)]' : 'bg-white/5 text-slate-400 border border-white/5 hover:border-white/20'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      {/* Sessions Grid */}
      <section className="relative z-10 py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          {loading ? (
            <div className="text-center py-20 text-slate-400">Loading sessions...</div>
          ) : filteredSessions.length === 0 ? (
            <div className="text-center py-20">
              <AlertCircle className="w-12 h-12 text-slate-500 mx-auto mb-4" />
              <p className="text-slate-400">No sessions found</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredSessions.map((session, i) => (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative"
                >
                    <div className="aspect-video rounded-2xl overflow-hidden bg-white/5 border border-white/10 relative group-hover:border-orange-500/50 transition-all">
                      <img 
                        src={session.thumbnail || getYouTubeThumbnail(session.videoUrl)} 
                        alt={session.title} 
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
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
                    
                    <button 
                      onClick={() => setSelectedSession(session)}
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <div className="w-16 h-16 rounded-full bg-orange-500 text-white flex items-center justify-center scale-75 group-hover:scale-100 transition-transform">
                        <Play size={32} fill="currentColor" className="ml-1" />
                      </div>
                    </button>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center gap-3 text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-2">
                      <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(session.date).toLocaleDateString()}</span>
                      {session.eventName && <span className="text-slate-500 border-l border-white/10 pl-3">{session.eventName}</span>}
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-orange-500 transition line-clamp-1">{session.title}</h3>
                    <p className="text-sm text-slate-400 line-clamp-2">{session.description}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {session.tags.map(tag => (
                        <span key={tag} className="text-[10px] px-2 py-1 rounded bg-white/5 text-slate-500">#{tag}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedSession && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-2xl bg-[#050510]/90"
          >
            <div className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <button 
                onClick={() => setSelectedSession(null)}
                className="absolute top-6 right-6 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition"
              >
                <X size={24} />
              </button>
              
              <iframe 
                src={getYouTubeEmbedUrl(selectedSession.videoUrl, true)} 
                className="w-full h-full"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
