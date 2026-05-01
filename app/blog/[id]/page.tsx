'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';

import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowLeft, Share2 } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  tags: string[];
  readTime?: number;
  createdAt: string;
  author: { name: string; email: string; bio?: string };
}

export default function ArticleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(`/api/articles/${id}`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setArticle(data);
      } catch (error) {
        console.error('Error fetching article:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#050510] flex items-center justify-center">
        <div className="text-slate-400">Loading...</div>
      </main>
    );
  }

  if (!article) {
    return (
      <main className="min-h-screen bg-[#050510] flex items-center justify-center">
        <div className="text-center">
          <div className="text-slate-400 mb-6">Article not found</div>
          <Link href="/blog" className="text-cyan-400 hover:underline">← Back to Blog</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050510] text-[#f8fbff]">
      {/* Hero / Cover — always visible */}
      <div className="relative w-full h-[70vh] min-h-[500px] overflow-hidden">
        <img
          src={
            article.coverImage ||
            (article.tags.some(t => t.toLowerCase().includes('bitcoin'))
              ? 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&q=80&w=2000'
              : article.tags.some(t => t.toLowerCase().includes('solana') || t.toLowerCase().includes('defi'))
              ? 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=2000'
              : article.tags.some(t => t.toLowerCase().includes('privacy') || t.toLowerCase().includes('cryptography'))
              ? 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=2000'
              : 'https://images.unsplash.com/photo-1569025591289-7bea3a482587?auto=format&fit=crop&q=80&w=2000')
          }
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=2000';
          }}
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050510] via-[#050510]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050510]/40 to-transparent" />

        {/* Sticky Nav overlaid on hero */}
        <header className="absolute top-0 left-0 right-0 z-50">
          <nav className="container mx-auto flex items-center justify-between px-6 py-6">
            <Link href="/" className="font-semibold uppercase tracking-[0.35em] text-cyan-400">
              CYBERPHUNK
            </Link>
            <Link href="/blog" className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-widest hover:text-cyan-300 bg-[#050510]/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </nav>
        </header>

        {/* Tags + Title anchored to bottom of hero */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-6 pb-12">
          <div className="container mx-auto max-w-4xl">
            <div className="flex flex-wrap gap-2 mb-4">
              {article.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-bold bg-black/50 backdrop-blur-md text-cyan-400 border border-cyan-400/30"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight drop-shadow-2xl">
              {article.title}
            </h1>
          </div>
        </div>
      </div>


      {/* Content */}
      <article className="relative z-10 py-20 px-6">
        <div className="container mx-auto max-w-3xl">
          {/* Meta bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400 border-b border-white/10 pb-6">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{article.author.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(article.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              {article.readTime && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{article.readTime} min read</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Body */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="prose prose-invert max-w-none mb-12"
          >
            <div
              className="text-lg text-slate-300 leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{
                __html: article.content
                  .split('\n\n')
                  .map(para => `<p>${para}</p>`)
                  .join('')
              }}
            />
          </motion.div>

          {/* Author */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-16 pt-8 border-t border-white/10"
          >
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-pink-500 flex items-center justify-center">
                <span className="text-xl font-bold text-white">{article.author.name.charAt(0)}</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{article.author.name}</h3>
                <p className="text-slate-400">{article.author.bio || 'Contributor at CyberPhunk DAO'}</p>
              </div>
            </div>
          </motion.div>

          {/* Share */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 flex items-center gap-4"
          >
            <span className="text-slate-500">Share:</span>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition text-sm text-slate-300">
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </motion.div>
        </div>
      </article>

      {/* Related Articles */}
      <section className="relative z-10 py-20 px-6 border-t border-white/10 bg-[#0a0f1d]/50">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold text-white mb-12">Explore More Content</h2>
          <Link href="/blog" className="inline-block px-8 py-4 rounded-xl bg-cyan-400 text-[#050510] font-bold uppercase tracking-wider hover:bg-cyan-300 transition">
            View All Articles
          </Link>
        </div>
      </section>
    </main>
  );
}
