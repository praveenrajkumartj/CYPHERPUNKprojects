'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Zap, BookOpen, AlertCircle } from 'lucide-react';
import { getTutorials } from '@/app/hub/actions';

interface Lesson {
  id: string;
  title: string;
  order: number;
}

interface Tutorial {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  lessons: Lesson[];
  _count?: {
    lessons: number;
  };
  thumbnail?: string;
}

export default function TutorialsPage() {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);

  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        const res = await getTutorials();
        if (res.success && res.tutorials) {
          setTutorials(res.tutorials);
        } else {
          console.error('Failed to load tutorials:', res.error);
          setTutorials([]);
        }
      } catch (error) {
        console.error('Error in fetchTutorials:', error);
        setTutorials([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTutorials();
  }, []);

  const tutorialsArray = Array.isArray(tutorials) ? tutorials : [];
  const categories = Array.from(new Set(tutorialsArray.map(t => t.category)));
  const difficulties = ['Beginner', 'Intermediate', 'Advanced'];

  const filteredTutorials = tutorialsArray.filter(t => {
    if (selectedCategory && t.category !== selectedCategory) return false;
    if (selectedDifficulty && t.difficulty !== selectedDifficulty) return false;
    return true;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Intermediate': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'Advanced': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

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
            Learn Web3 Development <span className="text-transparent bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text">Step-by-Step</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-400 mb-10"
          >
            Master Solana and Bitcoin development with structured tutorials
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section className="relative z-10 py-8 px-6 border-b border-white/5">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Category</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase transition ${
                  !selectedCategory
                    ? 'bg-cyan-400 text-[#050510]'
                    : 'bg-white/5 text-white hover:bg-white/10'
                }`}
              >
                All Categories
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold uppercase transition ${
                    selectedCategory === cat
                      ? 'bg-pink-500 text-white'
                      : 'bg-white/5 text-white hover:bg-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Difficulty</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedDifficulty(null)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase transition ${
                  !selectedDifficulty
                    ? 'bg-cyan-400 text-[#050510]'
                    : 'bg-white/5 text-white hover:bg-white/10'
                }`}
              >
                All Levels
              </button>
              {difficulties.map(diff => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold uppercase transition ${
                    selectedDifficulty === diff
                      ? 'bg-pink-500 text-white'
                      : 'bg-white/5 text-white hover:bg-white/10'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="relative z-10 py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          {loading ? (
            <div className="text-center py-20 text-slate-400">Loading tutorials...</div>
          ) : filteredTutorials.length === 0 ? (
            <div className="text-center py-20">
              <AlertCircle className="w-12 h-12 text-slate-500 mx-auto mb-4" />
              <p className="text-slate-400">No tutorials found with your filters</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredTutorials.map((tutorial, i) => (
                <motion.div
                  key={tutorial.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group"
                >
                  <Link href={`/tutorials/${tutorial.id}`}>
                    <div className="h-full flex flex-col rounded-2xl border border-white/10 bg-[#0a0f1d] overflow-hidden hover:border-cyan-400/50 transition-all hover:-translate-y-2">
                      <div className="h-40 bg-gradient-to-br from-cyan-400/20 to-pink-500/20 relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <BookOpen className="w-12 h-12 text-cyan-400/50" />
                        </div>
                      </div>

                      <div className="flex-1 flex flex-col p-6">
                        <div className="flex items-start justify-between mb-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getDifficultyColor(tutorial.difficulty)}`}>
                            {tutorial.difficulty}
                          </span>
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/5 text-slate-300 border border-white/10">
                            {tutorial.category}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition line-clamp-2">
                          {tutorial.title}
                        </h3>

                        <p className="text-sm text-slate-400 mb-6 flex-1 line-clamp-2">
                          {tutorial.description}
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                          <span className="text-xs text-slate-500 flex items-center gap-2">
                            <Zap className="w-4 h-4" />
                            {tutorial._count?.lessons || 0} lessons
                          </span>
                          <span className="text-cyan-400 group-hover:translate-x-1 transition">→</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
