'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronDown, Zap } from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  content: string;
  order: number;
}

interface Tutorial {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  lessons: Lesson[];
}

export default function TutorialDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [tutorial, setTutorial] = useState<Tutorial | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [expandedLessons, setExpandedLessons] = useState<Set<number>>(new Set([0]));

  useEffect(() => {
    const fetchTutorial = async () => {
      try {
        const res = await fetch(`/api/tutorials/${id}`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setTutorial(data);
      } catch (error) {
        console.error('Error fetching tutorial:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTutorial();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#050510] flex items-center justify-center">
        <div className="text-slate-400">Loading...</div>
      </main>
    );
  }

  if (!tutorial) {
    return (
      <main className="min-h-screen bg-[#050510] flex items-center justify-center">
        <div className="text-center">
          <div className="text-slate-400 mb-6">Tutorial not found</div>
          <Link href="/tutorials" className="text-cyan-400 hover:underline">← Back to Tutorials</Link>
        </div>
      </main>
    );
  }

  const currentLesson = tutorial.lessons[currentLessonIndex];

  const toggleLessonExpand = (index: number) => {
    const newExpanded = new Set(expandedLessons);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedLessons(newExpanded);
  };

  return (
    <main className="min-h-screen bg-[#050510] text-[#f8fbff]">
      {/* Header */}
      <header className="relative z-50 border-b border-white/10 sticky top-0 bg-[#050510]/80 backdrop-blur-md">
        <nav className="container mx-auto flex items-center justify-between px-6 py-6">
          <Link href="/" className="font-semibold uppercase tracking-[0.35em] text-cyan-400">
            CYBERPHUNK
          </Link>
          <Link href="/tutorials" className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-widest hover:text-cyan-300">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </nav>
      </header>

      <div className="container mx-auto max-w-7xl grid lg:grid-cols-4 gap-8 px-6 py-12">
        {/* Lessons Sidebar */}
        <aside className="lg:col-span-1 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="sticky top-32 space-y-2"
          >
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
              <Zap className="w-4 h-4 inline mr-2" />
              {tutorial.lessons.length} Lessons
            </h3>
            {tutorial.lessons.map((lesson, i) => (
              <div key={lesson.id}>
                <button
                  onClick={() => {
                    setCurrentLessonIndex(i);
                    toggleLessonExpand(i);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg font-bold uppercase tracking-wider text-xs transition flex items-center justify-between ${
                    currentLessonIndex === i
                      ? 'bg-cyan-400/20 text-cyan-400 border border-cyan-400/50'
                      : 'bg-white/5 text-white hover:bg-white/10'
                  }`}
                >
                  <span className="line-clamp-1">{lesson.title}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition ${expandedLessons.has(i) ? 'rotate-180' : ''}`}
                  />
                </button>
              </div>
            ))}
          </motion.div>
        </aside>

        {/* Main Content */}
        <div className="lg:col-span-3 order-1 lg:order-2">
          {currentLesson && (
            <motion.article
              key={currentLesson.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Lesson Header */}
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-400/10 text-cyan-400 border border-cyan-400/20">
                    {tutorial.category}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/5 text-slate-300 border border-white/10">
                    Lesson {currentLessonIndex + 1} of {tutorial.lessons.length}
                  </span>
                </div>

                <h1 className="text-5xl font-bold text-white mb-4">{currentLesson.title}</h1>

                <div className="h-1 w-16 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-full" />
              </div>

              {/* Content */}
              <div className="prose prose-invert max-w-none">
                <div
                  className="text-lg text-slate-300 leading-relaxed space-y-6"
                  dangerouslySetInnerHTML={{
                    __html: currentLesson.content
                      .split('\n\n')
                      .map(para => `<p>${para}</p>`)
                      .join('')
                  }}
                />
              </div>

              {/* Navigation */}
              <div className="flex gap-4 pt-8 border-t border-white/10">
                <button
                  onClick={() => setCurrentLessonIndex(Math.max(0, currentLessonIndex - 1))}
                  disabled={currentLessonIndex === 0}
                  className="flex-1 px-6 py-3 rounded-lg bg-white/5 text-white font-bold uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition"
                >
                  ← Previous
                </button>
                <button
                  onClick={() => setCurrentLessonIndex(Math.min(tutorial.lessons.length - 1, currentLessonIndex + 1))}
                  disabled={currentLessonIndex === tutorial.lessons.length - 1}
                  className="flex-1 px-6 py-3 rounded-lg bg-cyan-400 text-[#050510] font-bold uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed hover:bg-cyan-300 transition"
                >
                  Next →
                </button>
              </div>

              {/* Progress */}
              <div className="pt-4">
                <div className="text-xs text-slate-400 mb-2">Progress</div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-pink-500 transition-all"
                    style={{
                      width: `${((currentLessonIndex + 1) / tutorial.lessons.length) * 100}%`
                    }}
                  />
                </div>
              </div>
            </motion.article>
          )}
        </div>
      </div>
    </main>
  );
}
