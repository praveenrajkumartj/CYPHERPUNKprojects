'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, Code, ExternalLink, Activity, ArrowRight, ArrowUpRight, FolderHeart, Share2 } from 'lucide-react';

export default function ProjectsPage() {
  const categories = ['All Categories', 'Privacy', 'DeFi', 'NFT/Gaming', 'Infrastructure'];

  const projects = [
    {
      title: 'GhostPay - Anonymous Payment Protocol',
      badge: 'PRIVACY',
      color: 'cyan',
      image: '/images/project_ghostpay.png',
      description: 'A zero-knowledge based payment protocol built on Ethereum. Send assets to any address with complete privacy using zk-SNARKs.',
      tags: ['Privacy', 'Solidity', 'zk-SNARKs'],
      author: '@0xDeveloper'
    },
    {
      title: 'Nexus DEX - Cross-chain Liquidity Hub',
      badge: 'DEFI',
      color: 'pink',
      image: '/images/project_nexusdex.png',
      description: 'An AMM DEX with cross-chain atomic swaps. Built on Cosmos SDK and IBC for true seamless asset transfers.',
      tags: ['DeFi', 'Rust', 'Cosmos'],
      author: '@Lana_ngn'
    },
    {
      title: 'NodeGuard - Validator Analytics',
      badge: 'INFRA',
      color: 'emerald',
      image: '/images/project_nodeguard.png',
      description: 'Real-time monitoring and slashing protection for PoS validators. Supports Ethereum, Solana, and Polkadot.',
      tags: ['Infra', 'TypeScript', 'React'],
      author: '@Node_runner'
    },
    {
      title: 'CyberSync - Decentralized Messaging',
      badge: 'INFRA',
      color: 'emerald',
      image: '/images/project_cybersync.png',
      description: 'A secure, peer-to-peer messaging protocol built on Libp2p. End-to-end encryption with ephemeral identities.',
      tags: ['Infra', 'Rust', 'Libp2p'],
      author: '@0x_Alice'
    },
    {
      title: 'YieldFarm - Automated Yield Strategy',
      badge: 'DEFI',
      color: 'pink',
      image: '/images/project_yieldfarm.png',
      description: 'Smart contracts that automatically shift stablecoin deposits to the highest yield-generating DeFi protocols.',
      tags: ['DeFi', 'Solidity', 'EVM'],
      author: '@Satoshi_ghost'
    },
    {
      title: 'CyberKnights - On-chain Game',
      badge: 'GAMING',
      color: 'yellow',
      image: '/images/project_cyberknights.png',
      description: 'Fully on-chain RPG built on StarkNet. All game logic, items, and player states are stored in L2 rollups.',
      tags: ['Gaming', 'Cairo', 'StarkNet'],
      author: '@dr_zkp'
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'cyan': return { text: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30' };
      case 'pink': return { text: 'text-pink-500', bg: 'bg-pink-500/10', border: 'border-pink-500/30' };
      case 'yellow': return { text: 'text-[#ffd700]', bg: 'bg-[#ffd700]/10', border: 'border-[#ffd700]/30' };
      case 'emerald': return { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' };
      default: return { text: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30' };
    }
  };

  return (
    <main className="relative min-h-screen bg-[#050510] text-[#f8fbff] overflow-x-hidden selection:bg-cyan-500/30">
      {/* Background FX */}
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
            <Link href="/projects" className="transition text-cyan-400 uppercase text-xs tracking-widest relative">
              Projects
              <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-cyan-400 rounded-full" />
            </Link>
            <Link href="/blog" className="transition hover:text-white uppercase text-xs tracking-widest">Blog</Link>
            <Link href="/community" className="transition hover:text-white uppercase text-xs tracking-widest">Community</Link>
          </div>
          <Link href="/register" className="rounded-full border border-pink-500 bg-transparent px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-pink-500 transition hover:bg-pink-500/10">Sign In</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-xs font-semibold flex items-center gap-2 uppercase tracking-[0.3em] text-cyan-400 mb-6"
          >
            <span className="w-4 h-[1px] bg-cyan-400"></span> SHOWCASE
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6"
          >
            Community<br />
            <span className="text-transparent bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text">Projects</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-slate-400 leading-relaxed max-w-2xl"
          >
            Explore cutting-edge Web3 protocols built by the Cypherpunk community—from zero-knowledge rollups to decentralized identity and DAOs.
          </motion.p>
        </div>
      </section>

      {/* Featured Project */}
      <section className="relative z-10 py-10 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[10px] font-bold flex items-center gap-2 uppercase tracking-[0.3em] text-[#ffd700] mb-4"
          >
            <Star className="w-3 h-3" /> FEATURED PROJECT
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
            className="rounded-2xl border border-white/5 bg-[#080b19] overflow-hidden flex flex-col lg:flex-row group"
          >
            <div className="lg:w-1/2 relative h-64 lg:h-auto overflow-hidden">
               <Image src="/images/project_ghostpay.png" alt="GhostPay" fill className="object-cover transform group-hover:scale-105 transition-transform duration-700" />
               <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#080b19]/80 lg:to-[#080b19] hidden lg:block" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#080b19] to-transparent lg:hidden" />
            </div>
            
            <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center relative z-10">
               <div className="flex flex-wrap gap-3 mb-6">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-[#ffd700]/10 text-[#ffd700] border border-[#ffd700]/30 flex items-center gap-1">
                     <Star className="w-3 h-3 fill-current" /> FEATURED
                  </span>
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                     PRIVACY
                  </span>
               </div>
               
               <h3 className="text-3xl font-bold text-white mb-4">GhostPay - Anonymous Payment Protocol</h3>
               <p className="text-slate-400 leading-relaxed mb-8">
                  A zero-knowledge based payment protocol built on Ethereum. Send assets to any address with complete privacy using zk-SNARKs.
               </p>
               
               <div className="flex flex-wrap gap-2 mb-10">
                  {['Privacy', 'Solidity', 'zk-SNARKs'].map((tag, i) => {
                     const colorMap: Record<string, string> = { 'Privacy': 'cyan', 'Solidity': 'pink', 'zk-SNARKs': 'yellow' };
                     const color = colorMap[tag];
                     const styles = getColorClasses(color);
                     return (
                        <span key={i} className={`px-2.5 py-1 rounded text-[10px] font-bold tracking-wider uppercase ${styles.text} ${styles.bg}`}>
                           {tag}
                        </span>
                     );
                  })}
               </div>
               
               <div className="flex flex-wrap items-center gap-4 mt-auto">
                  <button className="bg-cyan-400 text-[#050510] px-6 py-3 rounded-lg text-xs font-bold tracking-widest uppercase flex items-center gap-2 hover:bg-cyan-300 transition">
                     <Code className="w-4 h-4" /> VIEW GITHUB
                  </button>
                  <button className="border border-white/10 bg-white/5 text-white px-6 py-3 rounded-lg text-xs font-bold tracking-widest uppercase flex items-center gap-2 hover:bg-white/10 hover:border-white/20 transition">
                     <ExternalLink className="w-4 h-4 text-cyan-400" /> LIVE APP
                  </button>
               </div>
               
               <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-2">Built by <span className="text-white font-medium">@0xDeveloper</span></span>
                  <span>• 2 days ago</span>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* All Projects Grid */}
      <section className="relative z-10 py-20 px-6 border-t border-white/5 bg-[#050814]">
        <div className="container mx-auto max-w-6xl">
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                 All Projects <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-slate-300 font-medium tracking-wider">12</span>
              </h2>
              
              <div className="flex flex-wrap gap-2">
                 {categories.map((cat, i) => (
                    <button 
                       key={i} 
                       className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-colors ${i === 0 ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'bg-[#0a0f1d] text-slate-400 border border-white/10 hover:border-white/20 hover:text-white'}`}
                    >
                       {cat}
                    </button>
                 ))}
              </div>
           </div>

           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, i) => {
                 const styles = getColorClasses(project.color);
                 return (
                    <motion.div 
                       key={i}
                       initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                       className="group rounded-xl border border-white/5 bg-[#0a0f1d] flex flex-col overflow-hidden hover:border-white/10 transition-colors"
                    >
                       <div className="relative h-48 overflow-hidden">
                          <Image src={project.image} alt={project.title} fill className="object-cover transform group-hover:scale-110 transition-transform duration-700" />
                          <div className="absolute top-4 right-4">
                             <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-[#050510]/80 backdrop-blur-md border ${styles.border} ${styles.text}`}>
                                {project.badge}
                             </span>
                          </div>
                       </div>
                       
                       <div className="p-6 flex flex-col flex-grow">
                          <h4 className="text-lg font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">{project.title}</h4>
                          <p className="text-sm text-slate-400 leading-relaxed mb-6 flex-grow">{project.description}</p>
                          
                          <div className="flex flex-wrap gap-2 mb-6">
                             {project.tags.map((tag, j) => {
                                const tagColors = ['cyan', 'pink', 'yellow', 'emerald'];
                                const tagStyle = getColorClasses(tagColors[j % tagColors.length]);
                                return (
                                   <span key={j} className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase ${tagStyle.bg} ${tagStyle.text}`}>
                                      {tag}
                                   </span>
                                )
                             })}
                          </div>
                          
                          <div className="flex items-center justify-between pt-5 border-t border-white/5 text-xs text-slate-500">
                             <span className="flex items-center gap-1.5">Built by <span className="text-white font-medium">{project.author}</span></span>
                             <div className="flex items-center gap-3">
                                <Share2 className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
                                <FolderHeart className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
                             </div>
                          </div>
                       </div>
                    </motion.div>
                 );
              })}
           </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="relative z-10 py-24 px-6 border-t border-white/5 bg-[#070b1a]/50">
        <div className="container mx-auto max-w-3xl">
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
             className="relative rounded-[2rem] border border-cyan-500/20 bg-gradient-to-b from-[#0a0f1d] to-[#050510] p-12 text-center shadow-[0_0_50px_rgba(0,255,255,0.05)] overflow-hidden"
           >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
              
              <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto mb-6">
                 <ArrowUpRight className="w-6 h-6 text-cyan-400" />
              </div>
              
              <h2 className="text-3xl font-bold mb-4">Built Something <span className="text-transparent bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text">Awesome?</span></h2>
              <p className="text-slate-400 mb-8 max-w-lg mx-auto leading-relaxed">
                 Submit your Web3 project to be featured. We review new submissions weekly. Open to all community members.
              </p>
              
              <button className="bg-cyan-400 text-[#050510] px-8 py-4 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-cyan-300 transition shadow-[0_0_20px_rgba(0,255,255,0.3)]">
                 SUBMIT YOUR PROJECT
              </button>
           </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-20 bg-[#050510] px-6 py-16 text-sm">
        <div className="container mx-auto grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.5fr]">
          <div className="space-y-4">
            <h5 className="font-mono font-medium uppercase tracking-[0.3em] text-slate-200">CYPHERPUNK</h5>
            <p className="text-slate-500 leading-relaxed max-w-xs">The cypherpunk community platform for Web3 builders, privacy advocates, and digital sovereignty warriors.</p>
            <div className="flex gap-4 pt-4">
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-cyan-500/20 hover:text-cyan-400 cursor-pointer transition">X</div>
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-pink-500/20 hover:text-pink-400 cursor-pointer transition">D</div>
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-[#ffd700]/20 hover:text-[#ffd700] cursor-pointer transition">G</div>
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-emerald-500/20 hover:text-emerald-400 cursor-pointer transition">T</div>
            </div>
          </div>
          
          <div className="space-y-4">
             <h6 className="font-bold uppercase tracking-[0.2em] text-white text-xs mb-6">NAVIGATE</h6>
             <ul className="space-y-3 text-slate-400">
                <li><Link href="/" className="hover:text-cyan-400 transition">Home</Link></li>
                <li><Link href="/about" className="hover:text-cyan-400 transition">About</Link></li>
                <li><Link href="/programs" className="hover:text-cyan-400 transition">Programs</Link></li>
                <li><Link href="/projects" className="hover:text-cyan-400 transition">Projects</Link></li>
                <li><Link href="/blog" className="hover:text-cyan-400 transition">Blog</Link></li>
                <li><Link href="/community" className="hover:text-cyan-400 transition">Community</Link></li>
             </ul>
          </div>

          <div className="space-y-4">
             <h6 className="font-bold uppercase tracking-[0.2em] text-white text-xs mb-6">RESOURCES</h6>
             <ul className="space-y-3 text-slate-400">
                <li><Link href="#" className="hover:text-cyan-400 transition">Manifesto</Link></li>
                <li><Link href="#" className="hover:text-cyan-400 transition">Whitepaper</Link></li>
                <li><Link href="#" className="hover:text-cyan-400 transition">Documentation</Link></li>
                <li><Link href="#" className="hover:text-cyan-400 transition">GitHub</Link></li>
                <li><Link href="#" className="hover:text-cyan-400 transition">Discord</Link></li>
                <li><Link href="#" className="hover:text-cyan-400 transition">Newsletter</Link></li>
             </ul>
          </div>

          <div className="space-y-4">
             <h6 className="font-bold uppercase tracking-[0.2em] text-cyan-400 text-xs mb-6">STAY INFORMED</h6>
             <p className="text-slate-500 text-xs leading-relaxed">Get the latest news on crypto, privacy tools, and upcoming events.</p>
             <form className="flex mt-4" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="your@email.com" className="bg-[#0a0f1d] border border-white/10 rounded-l-md px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 w-full" />
                <button type="submit" className="bg-cyan-400 text-[#050510] px-4 py-2 text-xs font-bold tracking-widest rounded-r-md hover:bg-cyan-300 transition">SUBSCRIBE</button>
             </form>
             <p className="text-[10px] text-slate-600 mt-2 p-3 bg-white/5 border border-white/5 rounded-md">We don't share data. We don't track. Your privacy is absolute. <span className="text-cyan-400">Code is law.</span></p>
          </div>
        </div>
        
        <div className="container mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-600 gap-4">
           <p>© 2026 Cypherpunk. By the community, for the free world.</p>
           <div className="flex gap-6">
              <Link href="#" className="hover:text-cyan-400">Privacy Policy</Link>
              <Link href="#" className="hover:text-cyan-400">Terms</Link>
              <Link href="#" className="hover:text-cyan-400">Cookie Policy</Link>
           </div>
        </div>
      </footer>
    </main>
  );
}

