'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Search, User, Share2, Bookmark, Lightbulb, Video, Trophy } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  coverImage?: string;
  tags: string[];
  readTime?: number;
  createdAt: string;
  author: { name: string; email: string };
}

export default function BlogPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch('/api/articles?published=true');
        const data = await res.json();
        setArticles(data.articles || []);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    let filtered = articles;

    if (selectedTag && selectedTag !== 'ALL') {
      filtered = filtered.filter(article => article.tags.includes(selectedTag));
    }

    if (searchQuery) {
      filtered = filtered.filter(
        article =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredArticles(filtered);
  }, [articles, selectedTag, searchQuery]);

  const categories = ['ALL', ...Array.from(new Set(articles.flatMap(article => article.tags)))];

  const getColorClasses = (tag: string) => {
    const tagUpper = tag.toUpperCase();
    if (tagUpper.includes('BITCOIN')) return { text: 'text-[#ffd700]', bg: 'bg-[#ffd700]/10', border: 'border-[#ffd700]/30' };
    if (tagUpper.includes('DEFI')) return { text: 'text-pink-500', bg: 'bg-pink-500/10', border: 'border-pink-500/30' };
    if (tagUpper.includes('PRIVACY')) return { text: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30' };
    if (tagUpper.includes('BLOCKCHAIN')) return { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' };
    if (tagUpper.includes('NFT')) return { text: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30' };
    return { text: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30' };
  };

  const featuredArticle = filteredArticles.length > 0 ? filteredArticles[0] : null;
  const gridArticles = filteredArticles.length > 1 ? filteredArticles.slice(1) : filteredArticles;

  return (
    <main className="relative min-h-screen bg-[#050510] text-[#f8fbff] overflow-x-hidden selection:bg-cyan-500/30">
      {/* Background Grid */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,255,255,0.08),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(255,0,127,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:linear-gradient(to_bottom,black_20%,transparent_80%)] opacity-20" />
      </div>

      <header className="relative z-50">
        <nav className="container mx-auto flex items-center justify-between px-6 py-6 text-sm text-slate-300">
          <Link href="/" className="font-semibold uppercase tracking-[0.35em] text-cyan-400">CYBERPHUNK</Link>
          <div className="hidden items-center gap-8 lg:flex">
            <Link href="/" className="transition hover:text-white uppercase text-xs tracking-widest">Home</Link>
            <Link href="/about" className="transition hover:text-white uppercase text-xs tracking-widest">About</Link>
            <Link href="/programs" className="transition hover:text-white uppercase text-xs tracking-widest">Programs</Link>
            <Link href="/projects" className="transition hover:text-white uppercase text-xs tracking-widest">Projects</Link>
            <Link href="/blog" className="transition text-cyan-400 uppercase text-xs tracking-widest relative">
              Blog
              <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-cyan-400 rounded-full" />
            </Link>
            <Link href="/learn" className="transition hover:text-white uppercase text-xs tracking-widest">Learn</Link>
            <Link href="/community" className="transition hover:text-white uppercase text-xs tracking-widest">Community</Link>
          </div>
          <Link href="/register" className="rounded-full border border-pink-500 bg-transparent px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-pink-500 transition hover:bg-pink-500/10">Sign In</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-[10px] font-bold flex items-center gap-2 uppercase tracking-[0.3em] text-cyan-400 mb-6"
          >
            <span className="w-4 h-[1px] bg-cyan-400"></span> BLOG & NEWS
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1] mb-8"
          >
            From the<br />
            <span className="text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text">Cryptosphere</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-slate-400 leading-relaxed max-w-2xl"
          >
            News, analysis, tutorials, and deep dives from the frontlines of the Web3 revolution.
          </motion.p>
        </div>
      </section>

      {/* Learning Hub Quick Links */}
      <section className="relative z-10 py-6 px-6 border-y border-white/5 bg-[#0a0f1d]/30">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
            <Link href="/tutorials" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Lightbulb size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Tutorials</p>
                <p className="text-sm font-bold text-white group-hover:text-pink-500 transition-colors">Start Learning</p>
              </div>
            </Link>

            <div className="hidden md:block w-[1px] h-8 bg-white/10"></div>

            <Link href="/sessions" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-orange-400/10 text-orange-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Video size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Sessions</p>
                <p className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors">Watch Workshops</p>
              </div>
            </Link>

            <div className="hidden md:block w-[1px] h-8 bg-white/10"></div>

            <Link href="/guides" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-yellow-400/10 text-yellow-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Trophy size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Guides</p>
                <p className="text-sm font-bold text-white group-hover:text-yellow-400 transition-colors">Hackathon Tips</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="relative z-10 py-8 px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Search Row */}
          <div className="mb-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#080b19]/80 backdrop-blur-xl border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
              />
            </div>
          </div>
          {/* Category Pills Row — scrollable, never clipped */}
          <div className="overflow-x-auto no-scrollbar">
            <div className="flex gap-2 py-1 px-1" style={{ width: 'max-content' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedTag(cat)}
                  className={`shrink-0 px-5 py-2 rounded-xl text-[10px] font-bold tracking-widest uppercase transition-all whitespace-nowrap ${selectedTag === cat ? 'bg-cyan-400 text-[#050510] shadow-[0_0_20px_rgba(0,255,255,0.3)]' : 'bg-[#080b19]/80 backdrop-blur-xl text-slate-400 border border-white/5 hover:border-white/20 hover:text-white'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredArticle && !searchQuery && selectedTag === 'ALL' && (
        <section className="relative z-10 py-12 px-6">
          <div className="container mx-auto max-w-6xl">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
              className="rounded-[2.5rem] border border-white/5 bg-[#080b19] overflow-hidden flex flex-col lg:flex-row group"
            >
              <div className="lg:w-1/2 relative h-80 lg:h-auto overflow-hidden">
                <img 
                  src={featuredArticle.coverImage || '/images/blog_featured.png'} 
                  alt={featuredArticle.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=2000';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#080b19]/20 to-[#080b19] hidden lg:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080b19] to-transparent lg:hidden" />
              </div>
              
              <div className="lg:w-1/2 p-10 md:p-16 flex flex-col justify-center">
                <div className="flex flex-wrap gap-3 mb-8">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-[#ffd700]/10 text-[#ffd700] border border-[#ffd700]/30 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> FEATURED
                    </span>
                    {featuredArticle.tags.map(tag => {
                      const styles = getColorClasses(tag);
                      return (
                        <span key={tag} className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase ${styles.bg} ${styles.text} border ${styles.border}`}>
                          {tag}
                        </span>
                      );
                    })}
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">{featuredArticle.title}</h3>
                <p className="text-slate-400 leading-relaxed mb-10 text-lg line-clamp-3">
                  {featuredArticle.excerpt}
                </p>
                
                <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 p-[1px]">
                          <div className="w-full h-full rounded-full bg-[#050510] flex items-center justify-center text-[10px] font-bold">
                            {featuredArticle.author.name.charAt(0)}
                          </div>
                      </div>
                      <div>
                          <p className="text-sm font-bold text-white">{featuredArticle.author.name}</p>
                          <p className="text-xs text-slate-500">{featuredArticle.readTime || 5} min read</p>
                      </div>
                    </div>
                    
                    <Link href={`/blog/${featuredArticle.id}`} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-cyan-400 hover:bg-cyan-400 hover:text-[#050510] transition-all">
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="relative z-10 py-16 px-6">
        <div className="container mx-auto max-w-6xl">
           {loading ? (
             <div className="text-center py-20 text-slate-400">Loading dynamic data from the matrix...</div>
           ) : filteredArticles.length === 0 ? (
             <div className="text-center py-20 text-slate-400">No articles found in this sector.</div>
           ) : (
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {gridArticles.map((post, i) => {
                   const styles = getColorClasses(post.tags[0] || '');
                   return (
                      <motion.div 
                         key={post.id}
                         initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                         className="group rounded-3xl border border-white/5 bg-[#0a0f1d] flex flex-col overflow-hidden hover:border-white/10 transition-all hover:-translate-y-2 shadow-2xl shadow-black/50"
                      >
                         <Link href={`/blog/${post.id}`}>
                           <div className="relative h-56 overflow-hidden">
                              <img 
                                src={post.coverImage || '/images/blog_bitcoin.png'} 
                                alt={post.title} 
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800';
                                }}
                              />
                              <div className="absolute top-6 left-6">
                                 <span className={`px-3 py-1 rounded-lg text-[10px] font-bold tracking-widest uppercase bg-[#050510]/80 backdrop-blur-md border ${styles.border} ${styles.text}`}>
                                    {post.tags[0] || 'GENERAL'}
                                 </span>
                              </div>
                           </div>
                           
                           <div className="p-8 flex flex-col flex-grow">
                              <h4 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors line-clamp-2 leading-tight">{post.title}</h4>
                              <p className="text-sm text-slate-400 leading-relaxed mb-8 flex-grow line-clamp-3">{post.excerpt}</p>
                              
                              <div className="flex items-center justify-between pt-6 border-t border-white/5 text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                                 <span className="flex items-center gap-2 tracking-[0.2em]"><User className="w-3 h-3 text-cyan-400" /> {post.author.name}</span>
                                 <span>{new Date(post.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                              </div>
                           </div>
                         </Link>
                      </motion.div>
                   );
                })}
             </div>
           )}
           
           {!loading && filteredArticles.length > 0 && (
             <div className="mt-20 text-center">
                <button className="px-10 py-4 rounded-full border border-white/10 text-xs font-bold tracking-[0.2em] uppercase hover:bg-white/5 transition-all">
                   Load More Articles
                </button>
             </div>
           )}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-20 bg-[#050510] px-6 py-20 text-sm border-t border-white/5">
        <div className="container mx-auto grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.5fr]">
          <div className="space-y-6">
            <h5 className="font-bold uppercase tracking-[0.3em] text-cyan-400 text-lg">CYBERPHUNK</h5>
            <p className="text-slate-500 leading-relaxed max-w-xs">The cyberphunk community platform for Web3 builders, privacy advocates, and digital sovereignty warriors.</p>
            <div className="flex gap-4 pt-4">
              {[Share2, Bookmark, User, Search].map((Icon, i) => (
                 <div key={i} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-cyan-500/20 hover:text-cyan-400 cursor-pointer transition-all">
                    <Icon size={18} />
                 </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-6">
             <h6 className="font-bold uppercase tracking-[0.2em] text-white text-xs mb-8">NAVIGATE</h6>
             <ul className="space-y-4 text-slate-400">
                <li><Link href="/" className="hover:text-cyan-400 transition">Home</Link></li>
                <li><Link href="/about" className="hover:text-cyan-400 transition">About</Link></li>
                <li><Link href="/programs" className="hover:text-cyan-400 transition">Programs</Link></li>
                <li><Link href="/projects" className="hover:text-cyan-400 transition">Projects</Link></li>
                <li><Link href="/blog" className="hover:text-cyan-400 transition">Blog</Link></li>
                <li><Link href="/community" className="hover:text-cyan-400 transition">Community</Link></li>
             </ul>
          </div>

          <div className="space-y-6">
             <h6 className="font-bold uppercase tracking-[0.2em] text-white text-xs mb-8">RESOURCES</h6>
             <ul className="space-y-4 text-slate-400">
                <li><Link href="#" className="hover:text-cyan-400 transition">Manifesto</Link></li>
                <li><Link href="#" className="hover:text-cyan-400 transition">Whitepaper</Link></li>
                <li><Link href="#" className="hover:text-cyan-400 transition">Documentation</Link></li>
                <li><Link href="#" className="hover:text-cyan-400 transition">GitHub</Link></li>
                <li><Link href="#" className="hover:text-cyan-400 transition">Discord</Link></li>
             </ul>
          </div>

          <div className="space-y-6">
             <h6 className="font-bold uppercase tracking-[0.2em] text-cyan-400 text-xs mb-8">STAY INFORMED</h6>
             <p className="text-slate-500 text-xs leading-relaxed mb-6">Get the latest news on crypto, privacy tools, and upcoming events.</p>
             <form className="flex" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="your@email.com" className="bg-[#0a0f1d] border border-white/10 rounded-l-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-cyan-500 w-full" />
                <button type="submit" className="bg-cyan-400 text-[#050510] px-8 py-4 text-xs font-bold tracking-[0.2em] rounded-r-2xl hover:bg-cyan-300 transition-all uppercase">SUBSCRIBE</button>
             </form>
             <p className="text-[10px] text-slate-600 mt-6 leading-relaxed italic">
                "We are writing the code that will enable individuals to trade and communicate without the oversight of government or corporate entities."
             </p>
          </div>
        </div>
        
        <div className="container mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-600 gap-6 uppercase tracking-widest">
           <p>© 2026 Cyberphunk. All rights reserved.</p>
           <div className="flex gap-8">
              <Link href="#" className="hover:text-cyan-400">Privacy</Link>
              <Link href="#" className="hover:text-cyan-400">Terms</Link>
              <Link href="#" className="hover:text-cyan-400">Cookies</Link>
           </div>
        </div>
      </footer>
    </main>
  );
}
