'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronDown, ChevronUp, BookOpen, Trophy, Sparkles, CheckCircle, AlertCircle } from 'lucide-react';
import { getGuides } from '@/app/hub/actions';

interface Section {
  id: string;
  title: string;
  content: string;
  order: number;
}

interface Guide {
  id: string;
  title: string;
  description: string;
  sections: Section[];
}

export default function GuidesPage() {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const res = await getGuides();
        if (res.success && res.guides) {
          setGuides(res.guides as any);
          if (res.guides.length > 0) {
            setSelectedGuide(res.guides[0] as any);
          }
        } else {
          console.error('Failed to load guides:', res.error);
          setGuides([]);
        }
      } catch (error) {
        console.error('Error in fetchGuides:', error);
        setGuides([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGuides();
  }, []);

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
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

      <div className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-yellow-400/10 text-yellow-400 flex items-center justify-center">
                <Trophy size={24} />
              </div>
              <h1 className="text-2xl font-bold">Builder Guides</h1>
            </div>

            <div className="space-y-2">
              {loading ? (
                <div className="text-slate-500 text-sm">Loading guides...</div>
              ) : guides.length === 0 ? (
                <div className="text-slate-500 text-sm">No guides available</div>
              ) : (
                guides.map(guide => (
                  <button
                    key={guide.id}
                    onClick={() => setSelectedGuide(guide)}
                    className={`w-full text-left p-4 rounded-xl text-sm font-bold transition-all ${
                      selectedGuide?.id === guide.id ? 'bg-yellow-400 text-[#050510]' : 'bg-white/5 text-slate-400 hover:bg-white/10'
                    }`}
                  >
                    {guide.title}
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {selectedGuide ? (
              <motion.div
                key={selectedGuide.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-12"
              >
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6">{selectedGuide.title}</h2>
                  <p className="text-lg text-slate-400 leading-relaxed max-w-3xl">
                    {selectedGuide.description}
                  </p>
                </div>

                <div className="space-y-4">
                  {selectedGuide.sections.map((section, i) => (
                    <div 
                      key={section.id}
                      className="border border-white/5 rounded-2xl bg-[#0a0f1d] overflow-hidden"
                    >
                      <button
                        onClick={() => toggleSection(section.id)}
                        className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition"
                      >
                        <div className="flex items-center gap-4">
                          <span className="w-8 h-8 rounded-lg bg-yellow-400/10 text-yellow-400 flex items-center justify-center text-xs font-bold">
                            0{i + 1}
                          </span>
                          <h3 className="font-bold text-lg">{section.title}</h3>
                        </div>
                        {expandedSections.has(section.id) ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>

                      <AnimatePresence>
                        {expandedSections.has(section.id) && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="border-t border-white/5"
                          >
                            <div className="p-8 text-slate-400 leading-relaxed whitespace-pre-wrap">
                              {section.content}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : !loading && (
              <div className="h-96 flex flex-col items-center justify-center text-center">
                <AlertCircle className="w-16 h-16 text-slate-700 mb-6" />
                <h3 className="text-xl font-bold text-slate-500">Select a guide to begin</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
