'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CheckCircle2, Globe, Lock, Shield, ArrowRight, ArrowUpRight, Quote, Bitcoin, Activity, Layers, Box } from 'lucide-react';

export default function AboutPage() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const timeline = [
    { year: '1992', title: 'The Cypherpunk mailing list is founded by Eric Hughes, Timothy C. May, and John Gilmore.', color: 'cyan' },
    { year: '1993', title: 'Eric Hughes publishes "A Cypherpunk\'s Manifesto," declaring privacy is necessary for an open society.', color: 'pink' },
    { year: '2008', title: 'Satoshi Nakamoto publishes the Bitcoin whitepaper, proving decentralized digital currency is possible.', color: 'cyan' },
    { year: '2014', title: 'Ethereum is proposed by Vitalik Buterin, bringing smart contracts and decentralized apps to life.', color: 'pink' },
    { year: '2026', title: 'Cyberphunk is established, uniting a new generation of builders to defend digital sovereignty.', color: 'cyan' },
  ];

  const builders = [
    { name: '0xDeveloper', role: 'Core Contributor', img: '/images/avatar_1.png', glow: 'cyan' },
    { name: 'Lana_ngn', role: 'Protocol Engineer', img: '/images/avatar_2.png', glow: 'pink' },
    { name: 'dr_zkp', role: 'Cryptography Lead', img: '/images/avatar_3.png', glow: 'cyan' },
    { name: 'Satoshi_ghost', role: 'Smart Contracts', img: '/images/avatar_4.png', glow: 'pink' },
    { name: '0x_Alice', role: 'DevOps & Security', img: '/images/avatar_5.png', glow: 'cyan' },
    { name: 'Node_runner', role: 'Infrastructure', img: '/images/avatar_6.png', glow: 'pink' },
  ];

  return (
    <main className="relative min-h-screen bg-[#050510] text-[#f8fbff] overflow-x-hidden selection:bg-cyan-500/30">
      {/* Background FX */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,255,255,0.08),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(255,0,127,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:linear-gradient(to_bottom,black_20%,transparent_80%)] opacity-20" />
      </div>

      <header className="relative z-50">
        <nav className="container mx-auto flex items-center justify-between px-6 py-6 text-sm text-slate-300">
          <Link href="/" className="font-semibold uppercase tracking-[0.35em] text-cyan-400">CYBERPHUNK</Link>
          <div className="hidden items-center gap-8 lg:flex">
            <Link href="/" className="transition hover:text-white uppercase text-xs tracking-widest">Home</Link>
            <Link href="/about" className="transition text-cyan-400 uppercase text-xs tracking-widest relative">
              About
              <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-pink-500 rounded-full" />
            </Link>
            <Link href="/programs" className="transition hover:text-white uppercase text-xs tracking-widest">Programs</Link>
            <Link href="/projects" className="transition hover:text-white uppercase text-xs tracking-widest">Projects</Link>
            <Link href="/blog" className="transition hover:text-white uppercase text-xs tracking-widest">Blog</Link>
            <Link href="/community" className="transition hover:text-white uppercase text-xs tracking-widest">Community</Link>
          </div>
          <Link href="/register" className="rounded-full border border-pink-500 bg-transparent px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-pink-500 transition hover:bg-pink-500/10">Sign In</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-24 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-xs font-semibold flex items-center justify-center gap-2 uppercase tracking-[0.3em] text-cyan-400 mb-6"
          >
            <span className="w-4 h-[1px] bg-cyan-400"></span> OUR STORY <span className="w-4 h-[1px] bg-cyan-400"></span>
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1] mb-8"
          >
            Who We Are &<br />
            <span className="text-transparent bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text">Why We Exist</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-3xl mx-auto"
          >
            Cyberphunk is a community of makers who envision a future that prioritizes digital sovereignty, privacy, and true decentralization. We believe that code is free speech, and we write the software to prove it.
          </motion.p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative z-10 py-24 px-6 border-t border-white/5 bg-[#070b1a]/50 backdrop-blur-sm">
        <div className="container mx-auto grid lg:grid-cols-[1fr_0.8fr] gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <p className="text-xs font-semibold flex items-center gap-2 uppercase tracking-[0.3em] text-cyan-400 mb-4">
                <span className="w-4 h-[1px] bg-cyan-400"></span> OUR MISSION
              </p>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Building the<br />
                <span className="text-cyan-400">Decentralized</span> <span className="text-pink-500">Future</span>
              </h2>
            </div>
            
            <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
              <p>We are a global network of cypherpunks, hackers, and builders who share a common goal: to build the tools and infrastructure that will safeguard human freedom.</p>
              <p>Privacy is a right, not a privilege. We write code. We build protocols. We don't ask for permission.</p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 px-4 py-3 shadow-lg">
                <CheckCircle2 className="text-cyan-400 w-5 h-5" /> <span className="text-sm font-semibold text-white tracking-wide">Privacy First</span>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 px-4 py-3 shadow-lg">
                <Globe className="text-pink-400 w-5 h-5" /> <span className="text-sm font-semibold text-white tracking-wide">Open Source</span>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 px-4 py-3 shadow-lg">
                <Lock className="text-[#ffd700] w-5 h-5" /> <span className="text-sm font-semibold text-white tracking-wide">Decentralized</span>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 px-4 py-3 shadow-lg">
                <Shield className="text-emerald-400 w-5 h-5" /> <span className="text-sm font-semibold text-white tracking-wide">Permissionless</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-pink-500/20 blur-3xl rounded-[2rem]" />
            <div className="relative rounded-[2rem] border border-white/10 bg-[#0a0f1d]/80 backdrop-blur-xl p-10 shadow-2xl">
              <Quote className="w-12 h-12 text-cyan-400/20 mb-6" />
              <p className="text-xl md:text-2xl text-white font-medium leading-snug mb-8">
                "As we move further into a digital age, privacy is the fundamental right we must defend with code."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                  <span className="text-cyan-400 font-bold">TM</span>
                </div>
                <div>
                  <p className="font-bold text-white">Timothy C. May</p>
                  <p className="text-xs text-slate-400 uppercase tracking-widest mt-1">Cypherpunk Manifesto</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="relative z-10 py-24 px-6 border-t border-white/5 bg-[#050814]">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-20">
             <p className="text-xs font-semibold flex items-center justify-center gap-2 uppercase tracking-[0.3em] text-cyan-400 mb-4">
                <span className="w-4 h-[1px] bg-cyan-400"></span> HISTORY <span className="w-4 h-[1px] bg-cyan-400"></span>
             </p>
             <h2 className="text-4xl md:text-5xl font-bold">The Cypherpunk <span className="text-transparent bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text">Timeline</span></h2>
          </div>

          <div className="relative border-l border-white/10 ml-4 md:ml-8 space-y-16">
            {timeline.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative pl-10 md:pl-16"
              >
                <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-4 border-[#050814] ${item.color === 'cyan' ? 'bg-cyan-400 shadow-[0_0_15px_rgba(0,255,255,0.8)]' : 'bg-pink-500 shadow-[0_0_15px_rgba(255,0,127,0.8)]'}`} />
                <h3 className={`text-xl font-bold tracking-widest mb-3 ${item.color === 'cyan' ? 'text-cyan-400' : 'text-pink-400'}`}>{item.year}</h3>
                <p className="text-slate-400 leading-relaxed text-lg">{item.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ethos / Code Section */}
      <section className="relative z-10 py-24 px-6 border-t border-white/5 bg-[#070b1a]/50">
        <div className="container mx-auto grid lg:grid-cols-[0.8fr_1fr] gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <p className="text-xs font-semibold flex items-center gap-2 uppercase tracking-[0.3em] text-cyan-400 mb-4">
                <span className="w-4 h-[1px] bg-cyan-400"></span> THE ETHOS
              </p>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Cypherpunks<br />
                <span className="text-transparent bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text">Write Code</span>
              </h2>
            </div>
            <p className="text-slate-400 text-lg leading-relaxed">
              Talk is cheap. Code is speech. We believe in creating open-source tools that empower individuals and dismantle centralized control mechanisms. The world is watching.
            </p>
            <Link href="https://github.com" target="_blank" className="inline-flex items-center gap-3 rounded-full border border-cyan-400/50 bg-cyan-500/10 px-8 py-4 text-sm font-bold tracking-widest text-cyan-300 transition hover:bg-cyan-500/20 hover:border-cyan-400">
              VIEW OUR GITHUB <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="relative rounded-2xl border border-cyan-500/30 bg-[#050510] shadow-[0_0_60px_rgba(0,255,255,0.1)] overflow-hidden"
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-[#0a0f1d]">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              <span className="ml-4 text-xs text-slate-500 font-mono">cypherpunk.rs</span>
            </div>
            <div className="p-6 text-sm font-mono text-slate-300 overflow-x-auto">
              <div className="flex">
                <span className="w-8 text-slate-600 select-none">1</span>
                <span className="text-pink-400">pub fn</span> <span className="text-cyan-300">init_decentralized_node</span>() -{'>'} <span className="text-[#ffd700]">Result</span>&lt;(), <span className="text-[#ffd700]">Error</span>&gt; {'{'}
              </div>
              <div className="flex">
                <span className="w-8 text-slate-600 select-none">2</span>
                <span className="pl-4 text-slate-500">// establish secure p2p connections</span>
              </div>
              <div className="flex">
                <span className="w-8 text-slate-600 select-none">3</span>
                <span className="pl-4 text-white">let network</span> = <span className="text-cyan-300">Network::new</span>();
              </div>
              <div className="flex">
                <span className="w-8 text-slate-600 select-none">4</span>
                <span className="pl-4 text-white">network.</span><span className="text-cyan-300">enforce_privacy</span>(<span className="text-pink-400">true</span>);
              </div>
              <div className="flex">
                <span className="w-8 text-slate-600 select-none">5</span>
                <span className="pl-4 text-slate-500">// launch</span>
              </div>
              <div className="flex">
                <span className="w-8 text-slate-600 select-none">6</span>
                <span className="pl-4 text-white">network.</span><span className="text-cyan-300">start</span>().<span className="text-cyan-300">await</span>?;
              </div>
              <div className="flex">
                <span className="w-8 text-slate-600 select-none">7</span>
                <span className="pl-4 text-pink-400">Ok</span>(())
              </div>
              <div className="flex">
                <span className="w-8 text-slate-600 select-none">8</span>
                {'}'}
              </div>
              <div className="flex mt-4">
                <span className="text-emerald-400 animate-pulse">_</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative z-10 py-24 px-6 border-t border-white/5 bg-[#050814]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
             <p className="text-xs font-semibold flex items-center justify-center gap-2 uppercase tracking-[0.3em] text-cyan-400 mb-4">
                <span className="w-4 h-[1px] bg-cyan-400"></span> OUR CORE <span className="w-4 h-[1px] bg-cyan-400"></span>
             </p>
             <h2 className="text-4xl md:text-5xl font-bold mb-6">Meet the <span className="text-transparent bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text">Builders</span></h2>
             <p className="text-slate-400 max-w-2xl mx-auto text-lg">The original contributors to the Cyberphunk community.<br/>Anonymous by choice.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {builders.map((builder, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative rounded-[2rem] border border-white/5 bg-[#0a0f1d] p-8 flex flex-col items-center text-center shadow-lg hover:border-white/10 transition-colors"
              >
                <div className={`absolute inset-0 bg-gradient-to-b from-${builder.glow}-500/5 to-transparent rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className={`relative w-24 h-24 rounded-full border-2 ${builder.glow === 'cyan' ? 'border-cyan-400/50 shadow-[0_0_20px_rgba(0,255,255,0.3)]' : 'border-pink-500/50 shadow-[0_0_20px_rgba(255,0,127,0.3)]'} mb-6 overflow-hidden flex items-center justify-center`}>
                  <Image src={builder.img} alt={builder.name} fill className="object-cover transform group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">{builder.name}</h4>
                <p className="text-sm text-cyan-400 tracking-wider uppercase mb-6">{builder.role}</p>
                <div className="flex gap-4 text-slate-500 mt-auto">
                   <a href="#" className="hover:text-white transition-colors"><ArrowUpRight className="w-5 h-5" /></a>
                   <a href="#" className="hover:text-white transition-colors"><ArrowUpRight className="w-5 h-5" /></a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Decorative Icons Row */}
      <div className="w-full flex justify-center items-center gap-12 py-12 border-t border-white/5 bg-[#050510] opacity-50">
         <Bitcoin className="w-6 h-6 text-slate-400" />
         <Activity className="w-6 h-6 text-slate-400" />
         <Lock className="w-6 h-6 text-slate-400" />
         <Shield className="w-6 h-6 text-slate-400" />
         <Layers className="w-6 h-6 text-slate-400" />
         <Box className="w-6 h-6 text-slate-400" />
      </div>

      <section className="relative z-20 border-t border-white/5 bg-[#0a0f1d] px-6 py-24">
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,0,127,0.05),transparent_50%)]"></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to <span className="text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text">Join Us?</span></h2>
            <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">Join thousands of builders, hackers, and privacy advocates who are shaping the decentralized future. No permission required.</p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
               <button className="w-full sm:w-auto rounded-full bg-cyan-400 px-8 py-4 text-sm font-bold tracking-widest text-[#050510] transition hover:bg-cyan-300 shadow-[0_0_20px_rgba(0,255,255,0.3)]">JOIN THE DISCORD</button>
               <button className="w-full sm:w-auto rounded-full border border-pink-500/50 bg-transparent px-8 py-4 text-sm font-bold tracking-widest text-pink-400 transition hover:bg-pink-500/10 hover:border-pink-500">FOLLOW ON TWITTER</button>
            </div>
        </div>
      </section>

      <footer className="relative z-20 border-t border-white/10 bg-[#050510] px-6 py-16 text-sm">
        <div className="container mx-auto grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.5fr]">
          <div className="space-y-4">
            <h5 className="font-bold uppercase tracking-[0.2em] text-cyan-400">CYBERPHUNK</h5>
            <p className="text-slate-500 leading-relaxed max-w-xs">The cyberphunk community platform for Web3 builders, privacy advocates, and digital sovereignty warriors.</p>
            <div className="flex gap-4 pt-4">
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-cyan-500/20 hover:text-cyan-400 cursor-pointer transition">X</div>
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-pink-500/20 hover:text-pink-400 cursor-pointer transition">D</div>
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-[#ffd700]/20 hover:text-[#ffd700] cursor-pointer transition">G</div>
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-emerald-500/20 hover:text-emerald-400 cursor-pointer transition">T</div>
            </div>
          </div>
          
          <div className="space-y-4">
             <h6 className="font-bold uppercase tracking-[0.2em] text-white text-xs mb-6">PLATFORM</h6>
             <ul className="space-y-3 text-slate-400">
                <li><Link href="/" className="hover:text-cyan-400 transition">Home</Link></li>
                <li><Link href="/about" className="hover:text-cyan-400 transition text-cyan-400">About</Link></li>
                <li><Link href="/programs" className="hover:text-cyan-400 transition">Programs</Link></li>
                <li><Link href="/projects" className="hover:text-cyan-400 transition">Projects</Link></li>
                <li><Link href="/blog" className="hover:text-cyan-400 transition">Blog</Link></li>
                <li><Link href="/community" className="hover:text-cyan-400 transition">Community</Link></li>
             </ul>
          </div>

          <div className="space-y-4">
             <h6 className="font-bold uppercase tracking-[0.2em] text-white text-xs mb-6">RESOURCES</h6>
             <ul className="space-y-3 text-slate-400">
                <li><Link href="#" className="hover:text-cyan-400 transition">Documentation</Link></li>
                <li><Link href="#" className="hover:text-cyan-400 transition">API Reference</Link></li>
                <li><Link href="#" className="hover:text-cyan-400 transition">Open Source</Link></li>
                <li><Link href="#" className="hover:text-cyan-400 transition">Status</Link></li>
                <li><Link href="#" className="hover:text-cyan-400 transition">Brand Kit</Link></li>
             </ul>
          </div>

          <div className="space-y-4">
             <h6 className="font-bold uppercase tracking-[0.2em] text-white text-xs mb-6">STAY UPDATED</h6>
             <p className="text-slate-500 text-xs leading-relaxed">Get the latest alpha, tech deep dives, and community updates.</p>
             <form className="flex mt-4" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Email Address..." className="bg-[#0a0f1d] border border-white/10 rounded-l-md px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 w-full" />
                <button type="submit" className="bg-cyan-500 text-[#050510] px-4 py-2 text-xs font-bold tracking-widest rounded-r-md hover:bg-cyan-400 transition">SUBSCRIBE</button>
             </form>
             <p className="text-[10px] text-slate-600 mt-2">By subscribing you agree to our terms and conditions.</p>
          </div>
        </div>
        
        <div className="container mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-slate-600 gap-4">
           <p>© 2026 Cyberphunk. Built by cyberphunks for the free world.</p>
           <div className="flex gap-6">
              <Link href="#" className="hover:text-slate-400">Privacy Policy</Link>
              <Link href="#" className="hover:text-slate-400">Terms</Link>
              <Link href="#" className="hover:text-slate-400">Guidelines</Link>
           </div>
        </div>
      </footer>
    </main>
  );
}
