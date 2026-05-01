'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Search, Clock, User, ArrowRight, Share2, Bookmark } from 'lucide-react';

export default function BlogPage() {
  const categories = ['ALL', 'Privacy', 'Bitcoin', 'DeFi', 'NFTs', 'Blockchain'];

  const posts = [
    {
      title: 'Bitcoin at 1k: From Cypherpunk Dream to Global Reserve',
      badge: 'BITCOIN',
      color: 'yellow',
      image: '/images/blog_bitcoin.png',
      description: 'How Satoshi Nakamoto\'s white paper transformed from a mailing list post to the foundation of a $3 trillion asset class.',
      author: 'Satoshi_Successor',
      date: 'Oct 14, 2025'
    },
    {
      title: 'DeFi Summer 2.0: The Protocols Rewriting Finance',
      badge: 'DEFI',
      color: 'pink',
      image: '/images/project_nexusdex.png',
      description: 'A deep dive into the latest wave of decentralized finance protocols that are challenging traditional banking institutions.',
      author: 'Yield_Hunter',
      date: 'Oct 12, 2025'
    },
    {
      title: 'Zero-Knowledge Proofs: The Math Behind Private Transactions',
      badge: 'PRIVACY',
      color: 'cyan',
      image: '/images/project_nodeguard.png',
      description: 'Understanding ZK-SNARKs and ZK-STARKs — the cryptographic magic that enables Zcash, StarkNet, and Aleo.',
      author: 'Zero_Alice',
      date: 'Oct 10, 2025'
    },
    {
      title: 'NFTs Beyond Art: The Next Chapter for Digital Ownership',
      badge: 'NFTS',
      color: 'purple',
      image: '/images/project_cyberknights.png',
      description: 'How non-fungible tokens are evolving from profile pictures to real-world asset tokenization and digital identity.',
      author: 'NFT_Star',
      date: 'Oct 08, 2025'
    },
    {
      title: 'Solana vs Ethereum: The Layer-1 Wars of 2025',
      badge: 'BLOCKCHAIN',
      color: 'emerald',
      image: '/images/project_cybersync.png',
      description: 'Analyzing technical and ecosystem differences between the two dominant smart contract platforms.',
      author: 'Matrix_Master',
      date: 'Oct 05, 2025'
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'cyan': return { text: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30' };
      case 'pink': return { text: 'text-pink-500', bg: 'bg-pink-500/10', border: 'border-pink-500/30' };
      case 'yellow': return { text: 'text-[#ffd700]', bg: 'bg-[#ffd700]/10', border: 'border-[#ffd700]/30' };
      case 'emerald': return { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' };
      case 'purple': return { text: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30' };
      default: return { text: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30' };
    }
  };

  return (
    <main className="relative min-h-screen bg-[#050510] text-[#f8fbff] overflow-x-hidden selection:bg-cyan-500/30">
      {/* Background Grid */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,255,255,0.08),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(255,0,127,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:linear-gradient(to_bottom,black_20%,transparent_80%)] opacity-20" />
      </div>

      <header className="relative z-50">
        <nav className="container mx-auto flex items-center justify-between px-6 py-6 text-sm text-slate-300">
          <Link href="/" className="font-mono font-medium uppercase tracking-[0.4em] text-slate-200">CYPHERPUNK</Link>
          <div className="hidden items-center gap-8 lg:flex">
            <Link href="/" className="transition hover:text-white uppercase text-xs tracking-widest">Home</Link>
            <Link href="/about" className="transition hover:text-white uppercase text-xs tracking-widest">About</Link>
            <Link href="/programs" className="transition hover:text-white uppercase text-xs tracking-widest">Programs</Link>
            <Link href="/projects" className="transition hover:text-white uppercase text-xs tracking-widest">Projects</Link>
            <Link href="/blog" className="transition text-cyan-400 uppercase text-xs tracking-widest relative">
              Blog
              <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-cyan-400 rounded-full" />
            </Link>
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

      {/* Filter Bar */}
      <section className="relative z-10 py-8 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="p-2 rounded-2xl bg-[#080b19]/80 backdrop-blur-xl border border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
             <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="Search articles..." 
                  className="w-full bg-white/5 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
                />
             </div>
             
             <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((cat, i) => (
                   <button 
                      key={i} 
                      className={`px-5 py-2 rounded-xl text-[10px] font-bold tracking-widest uppercase transition-all ${i === 0 ? 'bg-cyan-400 text-[#050510] shadow-[0_0_20px_rgba(0,255,255,0.3)]' : 'bg-white/5 text-slate-400 border border-white/5 hover:border-white/20 hover:text-white'}`}
                   >
                      {cat}
                   </button>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="relative z-10 py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="rounded-[2.5rem] border border-white/5 bg-[#080b19] overflow-hidden flex flex-col lg:flex-row group"
          >
            <div className="lg:w-1/2 relative h-80 lg:h-auto overflow-hidden">
               <Image src="/images/blog_featured.png" alt="Cypherpunk Manifesto" fill className="object-cover transform group-hover:scale-105 transition-transform duration-700" />
               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#080b19]/20 to-[#080b19] hidden lg:block" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#080b19] to-transparent lg:hidden" />
            </div>
            
            <div className="lg:w-1/2 p-10 md:p-16 flex flex-col justify-center">
               <div className="flex flex-wrap gap-3 mb-8">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-[#ffd700]/10 text-[#ffd700] border border-[#ffd700]/30 flex items-center gap-1">
                     <Clock className="w-3 h-3" /> FEATURED
                  </span>
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                     PRIVACY
                  </span>
               </div>
               
               <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">The Cypherpunk Manifesto: Why Privacy Is Not Optional</h3>
               <p className="text-slate-400 leading-relaxed mb-10 text-lg">
                  Revisiting the seminal 1993 document that predicted the privacy battles of the digital age — and why its lessons matter more than ever.
               </p>
               
               <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 p-[1px]">
                        <div className="w-full h-full rounded-full bg-[#050510] flex items-center justify-center text-[10px] font-bold">EH</div>
                     </div>
                     <div>
                        <p className="text-sm font-bold text-white">Eric Hughes</p>
                        <p className="text-xs text-slate-500">12 min read</p>
                     </div>
                  </div>
                  
                  <Link href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-cyan-400 hover:bg-cyan-400 hover:text-[#050510] transition-all">
                     <ArrowRight className="w-5 h-5" />
                  </Link>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="relative z-10 py-16 px-6">
        <div className="container mx-auto max-w-6xl">
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, i) => {
                 const styles = getColorClasses(post.color);
                 return (
                    <motion.div 
                       key={i}
                       initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                       className="group rounded-3xl border border-white/5 bg-[#0a0f1d] flex flex-col overflow-hidden hover:border-white/10 transition-all hover:-translate-y-2 shadow-2xl shadow-black/50"
                    >
                       <div className="relative h-56 overflow-hidden">
                          <Image src={post.image} alt={post.title} fill className="object-cover transform group-hover:scale-110 transition-transform duration-700" />
                          <div className="absolute top-6 left-6">
                             <span className={`px-3 py-1 rounded-lg text-[10px] font-bold tracking-widest uppercase bg-[#050510]/80 backdrop-blur-md border ${styles.border} ${styles.text}`}>
                                {post.badge}
                             </span>
                          </div>
                       </div>
                       
                       <div className="p-8 flex flex-col flex-grow">
                          <h4 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors line-clamp-2 leading-tight">{post.title}</h4>
                          <p className="text-sm text-slate-400 leading-relaxed mb-8 flex-grow line-clamp-3">{post.description}</p>
                          
                          <div className="flex items-center justify-between pt-6 border-t border-white/5 text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                             <span className="flex items-center gap-2 tracking-[0.2em]"><User className="w-3 h-3 text-cyan-400" /> {post.author}</span>
                             <span>{post.date}</span>
                          </div>
                       </div>
                    </motion.div>
                 );
              })}
           </div>
           
           {/* Pagination / Load More */}
           <div className="mt-20 text-center">
              <button className="px-10 py-4 rounded-full border border-white/10 text-xs font-bold tracking-[0.2em] uppercase hover:bg-white/5 transition-all">
                 Load More Articles
              </button>
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-20 bg-[#050510] px-6 py-20 text-sm border-t border-white/5">
        <div className="container mx-auto grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.5fr]">
          <div className="space-y-6">
            <h5 className="font-mono font-medium uppercase tracking-[0.3em] text-slate-200 text-lg">CYPHERPUNK</h5>
            <p className="text-slate-500 leading-relaxed max-w-xs">The cypherpunk community platform for Web3 builders, privacy advocates, and digital sovereignty warriors.</p>
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
           <p>© 2026 Cypherpunk. All rights reserved.</p>
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

