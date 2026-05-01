"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Save, 
  Image as ImageIcon, 
  Tag as TagIcon,
  Send,
  Eye
} from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function NewArticlePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    coverImage: '',
    tags: '',
    published: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(',').map(t => t.trim()).filter(t => t !== '')
        })
      });

      if (res.ok) {
        router.push('/admin/hub/articles');
        router.refresh();
      } else {
        const error = await res.json();
        alert(error.error || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error creating article:', error);
      alert('Failed to create article');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050510] text-[#f8fbff]">
      <Navbar />

      <div className="pt-32 pb-20 container mx-auto px-6 max-w-5xl">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <Link href="/admin/hub/articles" className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white transition">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-3xl font-bold">New Article</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="px-6 py-2 rounded-lg bg-white/5 text-slate-400 hover:text-white transition text-sm font-bold uppercase tracking-widest flex items-center gap-2">
              <Eye size={18} /> Preview
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Main Content */}
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Article Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="Enter a compelling title..." 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-xl font-bold text-white focus:outline-none focus:border-cyan-400/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Content (Markdown Support)</label>
                <textarea 
                  required
                  rows={15}
                  placeholder="Write your article content here..." 
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-slate-300 leading-relaxed focus:outline-none focus:border-cyan-400/50 transition-colors font-mono text-sm"
                />
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* Sidebar Settings */}
            <div className="p-8 rounded-3xl border border-white/10 bg-[#0a0f1d] space-y-8">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
                  <ImageIcon size={14} /> Cover Image URL
                </label>
                <input 
                  type="text" 
                  placeholder="https://..." 
                  value={formData.coverImage}
                  onChange={(e) => setFormData({...formData, coverImage: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-slate-300 focus:outline-none focus:border-cyan-400/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
                  <TagIcon size={14} /> Tags (comma separated)
                </label>
                <input 
                  type="text" 
                  placeholder="Web3, Solana, Privacy" 
                  value={formData.tags}
                  onChange={(e) => setFormData({...formData, tags: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-slate-300 focus:outline-none focus:border-cyan-400/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Excerpt (Brief Summary)</label>
                <textarea 
                  rows={4}
                  placeholder="A short summary for listings..." 
                  value={formData.excerpt}
                  onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-slate-300 focus:outline-none focus:border-cyan-400/50 transition-colors"
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="text-sm font-bold">Published</span>
                <button 
                  type="button"
                  onClick={() => setFormData({...formData, published: !formData.published})}
                  className={`w-12 h-6 rounded-full transition-colors relative ${formData.published ? 'bg-cyan-400' : 'bg-slate-700'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${formData.published ? 'left-7' : 'left-1'}`} />
                </button>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-pink-500 text-[#050510] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-cyan-400/20 transition disabled:opacity-50"
              >
                {loading ? 'Creating...' : <><Send size={18} /> Create Article</>}
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
