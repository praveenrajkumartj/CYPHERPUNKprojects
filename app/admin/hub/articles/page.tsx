"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar,
  User as UserIcon,
  Clock,
  ArrowLeft,
  CheckCircle,
  XCircle
} from 'lucide-react';
import Navbar from '@/components/Navbar';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  published: boolean;
  createdAt: string;
  author: { name: string };
  tags: string[];
}

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/articles');
      const data = await res.json();
      setArticles(data.articles || []);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    
    try {
      const res = await fetch(`/api/articles/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setArticles(articles.filter(a => a.id !== id));
      }
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  const filteredArticles = articles.filter(a => 
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.author.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#050510] text-[#f8fbff]">
      <Navbar />

      <div className="pt-32 pb-20 container mx-auto px-6">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin/hub" className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white transition">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-3xl font-bold">Manage Articles</h1>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search articles by title or author..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-cyan-400/50 transition-colors"
            />
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-bold uppercase tracking-widest hover:border-white/30 transition">
              <Filter size={18} /> Filter
            </button>
            <Link 
              href="/admin/hub/articles/new"
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-cyan-400 text-[#050510] text-sm font-bold uppercase tracking-widest hover:bg-cyan-300 transition"
            >
              <Plus size={18} /> New Article
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-slate-400">Loading articles...</div>
        ) : filteredArticles.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl bg-white/5">
            <p className="text-slate-400 mb-6">No articles found</p>
            <Link 
              href="/admin/hub/articles/new"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-400 text-[#050510] text-sm font-bold uppercase tracking-widest hover:bg-cyan-300 transition"
            >
              <Plus size={18} /> Create Your First Article
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredArticles.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group p-4 md:p-6 rounded-2xl border border-white/5 bg-[#0a0f1d] hover:border-white/20 transition-all flex flex-col md:flex-row items-center justify-between gap-6"
              >
                <div className="flex-1 flex items-start gap-4">
                   <div className={`p-3 rounded-xl ${article.published ? 'bg-emerald-500/10 text-emerald-400' : 'bg-yellow-500/10 text-yellow-400'} border border-current opacity-20`}>
                      <BookOpen size={24} />
                   </div>
                   <div>
                      <div className="flex items-center gap-3 mb-2">
                         <h3 className="text-lg font-bold group-hover:text-cyan-400 transition-colors">{article.title}</h3>
                         {article.published ? (
                           <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
                             <CheckCircle size={12} /> Published
                           </span>
                         ) : (
                           <span className="flex items-center gap-1 text-[10px] font-bold text-yellow-500 uppercase tracking-widest">
                             <XCircle size={12} /> Draft
                           </span>
                         )}
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                         <span className="flex items-center gap-1"><UserIcon size={14} /> {article.author.name}</span>
                         <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(article.createdAt).toLocaleDateString()}</span>
                         <div className="flex gap-2">
                           {article.tags.map(tag => (
                             <span key={tag} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10">#{tag}</span>
                           ))}
                         </div>
                      </div>
                   </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link 
                    href={`/blog/${article.id}`} 
                    target="_blank"
                    className="p-3 rounded-xl bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition"
                  >
                    <Eye size={18} />
                  </Link>
                  <Link 
                    href={`/admin/hub/articles/${article.id}`}
                    className="p-3 rounded-xl bg-white/5 text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/10 transition"
                  >
                    <Edit size={18} />
                  </Link>
                  <button 
                    onClick={() => handleDelete(article.id)}
                    className="p-3 rounded-xl bg-white/5 text-slate-400 hover:text-pink-500 hover:bg-pink-500/10 transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
