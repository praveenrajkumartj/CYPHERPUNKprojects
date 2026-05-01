'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Activity, Bitcoin, Lock, Shield, Layers, Box } from 'lucide-react';
import HeroSection from '@/components/HeroSection';
import { useRouter } from 'next/navigation';

const statsConfig = [
  { label: 'active nodes', value: 5200, suffix: '+' },
  { label: 'active protocols', value: 32, suffix: '' },
  { label: 'community daos', value: 12, suffix: '' },
  { label: 'global events', value: 240, suffix: '+' },
];

export default function HomePageClient({ initialEvents, user }: { initialEvents: any[], user: any }) {
  const router = useRouter();
  const [statsActive, setStatsActive] = useState(false);
  const [counts, setCounts] = useState<number[]>(statsConfig.map(() => 0));
  const statsRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!statsActive) return;
    const startTime = performance.now();
    const duration = 1600;

    const animate = (time: number) => {
      const elapsed = Math.min((time - startTime) / duration, 1);
      setCounts(statsConfig.map((stat) => Math.round(stat.value * elapsed)));

      if (elapsed < 1) {
        window.requestAnimationFrame(animate);
      }
    };

    window.requestAnimationFrame(animate);
  }, [statsActive]);

  useEffect(() => {
    const element = statsRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const getEventStyles = (type: string) => {
    switch (type.toLowerCase()) {
      case 'hackathon': return 'border-cyan-500/30 text-cyan-400 bg-cyan-500/20';
      case 'workshop': return 'border-[#ffd700]/30 text-[#ffd700] bg-[#ffd700]/20';
      case 'meetup': return 'border-pink-500/30 text-pink-400 bg-pink-500/20';
      default: return 'border-white/10 text-white bg-white/5';
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050510] text-[#f8fbff]">
      <header className="absolute top-0 left-0 right-0 z-50">
        <nav className="container mx-auto flex items-center justify-between px-6 py-6 text-sm text-slate-300">
          <Link href="/" className="font-mono font-medium uppercase tracking-[0.4em] text-slate-200">CYPHERPUNK</Link>
          <div className="hidden items-center gap-8 lg:flex">
            <Link href="/" className="transition hover:text-white uppercase text-xs tracking-widest text-[#00ffff]">Home</Link>
            <Link href="/about" className="transition hover:text-white uppercase text-xs tracking-widest">About</Link>
            <Link href="/programs" className="transition hover:text-white uppercase text-xs tracking-widest">Programs</Link>
            <Link href="/projects" className="transition hover:text-white uppercase text-xs tracking-widest">Projects</Link>
            <Link href="/blog" className="transition hover:text-white uppercase text-xs tracking-widest">Blog</Link>
            <Link href="/community" className="transition hover:text-white uppercase text-xs tracking-widest">Community</Link>
            {user && (
              <Link 
                href={user.role === 'ORGANIZER' || user.role === 'ADMIN' ? '/organizer' : '/dashboard'} 
                className="transition text-cyan-400 hover:text-cyan-300 uppercase text-xs tracking-widest font-bold"
              >
                Dashboard
              </Link>
            )}
          </div>
          {user ? (
            <button 
              onClick={handleLogout}
              className="rounded-full border border-pink-500 bg-transparent px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-pink-500 transition hover:bg-pink-500/10"
            >
              Logout
            </button>
          ) : (
            <Link href="/login" className="rounded-full border border-pink-500 bg-transparent px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-pink-500 transition hover:bg-pink-500/10">Sign In</Link>
          )}
        </nav>
      </header>

      <HeroSection user={user} />

      <section className="relative z-20 border-t border-b border-white/5 bg-[#080b19] px-6 py-12" ref={statsRef}>
        <div className="container mx-auto grid grid-cols-2 gap-8 md:grid-cols-4 text-center divide-x divide-white/5">
          {statsConfig.map((stat, i) => (
            <div key={stat.label} className="flex flex-col items-center justify-center space-y-2">
              <div className="text-4xl md:text-5xl font-black text-cyan-400 tracking-tight">
                {counts[i].toLocaleString()}{stat.suffix}
              </div>
              <div className="text-xs uppercase tracking-[0.2em] text-slate-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-20 px-6 py-24">
        <div className="container mx-auto space-y-16">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, ease: 'easeOut' }} className="grid gap-12 lg:grid-cols-[1fr_1fr] items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                 <p className="text-xs font-semibold flex items-center gap-2 uppercase tracking-[0.3em] text-cyan-400">
                   <span className="w-4 h-[1px] bg-cyan-400"></span> THE MANIFESTO
                 </p>
                 <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl leading-[1.1]">
                   Code is the <span className="text-transparent bg-gradient-to-r from-cyan-300 to-sky-500 bg-clip-text">Ultimate</span><br/>
                   <span className="text-transparent bg-gradient-to-r from-pink-500 to-purple-400 bg-clip-text">Weapon</span> of Freedom
                 </h2>
              </div>
              
              <div className="space-y-6 border-l-2 border-cyan-500/30 pl-6">
                <p className="text-slate-300 leading-relaxed text-lg">
                  <span className="text-cyan-400 font-bold">Privacy is not a crime. It is a fundamental right.</span> We advocate for privacy-first tech.
                </p>
                <p className="text-slate-300 leading-relaxed text-lg">
                  <span className="text-pink-400 font-bold">We are building anonymous systems.</span> The world is watching.
                </p>
                <p className="text-slate-300 leading-relaxed text-lg">
                  <span className="text-emerald-400 font-bold">Open source tools are the building blocks</span> of a better future. A decentralized system can't be shut down.
                </p>
              </div>
              
              <div className="pt-4">
                  <Link href="/about" className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-cyan-400 hover:text-cyan-300 transition-colors gap-2">
                    READ FULL MANIFESTO <ArrowRight className="w-4 h-4" />
                  </Link>
              </div>
            </div>

            <div className="glass-panel rounded-[1rem] border border-white/10 bg-[#0c1222] p-6 shadow-[0_0_50px_rgba(0,255,255,0.05)] relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 opacity-70"></div>
              <div className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-slate-400">
                <div className="flex gap-1.5">
                   <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                   <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                   <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <span className="ml-2">manifesto.js</span>
              </div>
              <div className="rounded-xl border border-white/5 bg-[#050510] p-6 text-sm leading-8 text-slate-300 font-mono overflow-x-auto">
                <p className="text-purple-400">const <span className="text-cyan-300">cypherpunk</span> = {'{'}</p>
                <p className="pl-6"><span className="text-slate-400">mission:</span> <span className="text-green-300">'privacy first'</span>,</p>
                <p className="pl-6"><span className="text-slate-400">ethos:</span> <span className="text-green-300">'anonymous collaboration'</span>,</p>
                <p className="pl-6"><span className="text-slate-400">velocity:</span> <span className="text-green-300">'unstoppable'</span>,</p>
                <p className="pl-6"><span className="text-slate-400">network:</span> <span className="text-green-300">'decentralized every layer'</span>,</p>
                <p>{'}'}</p>
                <p className="mt-4 text-slate-500 italic">// join the revolution</p>
              </div>
            </div>
          </motion.div>

          <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }} className="space-y-10 pt-16">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between border-b border-white/10 pb-6">
              <div>
                <p className="text-xs font-semibold flex items-center gap-2 uppercase tracking-[0.3em] text-cyan-400">
                  <span className="w-4 h-[1px] bg-cyan-400"></span> UPCOMING EVENTS
                </p>
                <h3 className="mt-4 text-4xl font-bold text-white">Join the <span className="text-transparent bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text">Next Wave</span></h3>
              </div>
              <Link href="/programs" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-transparent px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-white transition hover:border-cyan-300/50 hover:text-cyan-300">VIEW ALL PROGRAMS <ArrowRight className="w-3 h-3" /></Link>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
               {initialEvents.length > 0 ? (
                 initialEvents.map((event) => (
                   <div key={event.id} className="group glass-panel rounded-2xl border border-white/5 bg-[#0a0f1d] p-8 shadow-lg transition-all hover:border-cyan-500/30 hover:-translate-y-1">
                     <div className="mb-6 flex items-center justify-between">
                       <span className={`rounded px-3 py-1 text-[10px] font-bold tracking-widest uppercase ${getEventStyles(event.type)}`}>
                         {event.type}
                       </span>
                       <span className="text-[10px] font-medium text-slate-400 flex items-center gap-1 uppercase">
                         <Activity className="w-3 h-3" /> {new Date(event.date).toLocaleDateString()}
                       </span>
                     </div>
                     <h4 className="text-xl font-bold text-white mb-4 line-clamp-1">{event.title}</h4>
                     <p className="text-sm leading-relaxed text-slate-400 mb-6 min-h-[80px] line-clamp-3">{event.description}</p>
                     <div className="flex items-center justify-between border-t border-white/10 pt-6">
                        <span className="text-[10px] font-mono text-slate-300 uppercase">ACCESS <span className="text-cyan-400 font-bold">GRANTED</span></span>
                        <Link href={`/events/${event.id}`} className="rounded bg-cyan-500 px-5 py-2 text-[10px] font-bold tracking-widest text-[#050510] transition hover:bg-cyan-400">VIEW DETAILS</Link>
                     </div>
                   </div>
                 ))
               ) : (
                 <div className="lg:col-span-3 py-20 text-center border border-dashed border-white/10 rounded-3xl">
                    <p className="text-slate-500 uppercase tracking-widest text-xs">No active event sequences found in the grid.</p>
                 </div>
               )}
            </div>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }} className="space-y-10 pt-16 bg-[#070b1a] p-12 rounded-[2rem] border border-white/5">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold flex items-center gap-2 uppercase tracking-[0.3em] text-cyan-400">
                  <span className="w-4 h-[1px] bg-cyan-400"></span> LATEST FROM
                </p>
                <h3 className="mt-4 text-4xl font-bold text-white">From the <span className="text-transparent bg-gradient-to-r from-[#ffd700] to-pink-500 bg-clip-text">Cryptosphere</span></h3>
              </div>
              <Link href="/blog" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-transparent px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-white transition hover:border-cyan-300/50 hover:text-cyan-300">ALL ARTICLES <ArrowRight className="w-3 h-3" /></Link>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {[
                { title: 'The Evolution of Decentralized Finance', category: 'DEFI', description: 'Decentralized finance has moved past the speculative phase. It is now challenging TradFi...', img: '/images/defi_cube.png', readTime: '3 min read' },
                { title: 'Building the Future: Contracts on the Web3', category: 'WEB3', description: 'How smart contracts are changing the way we interact, transact, and build new economies on the blockchain.', img: '/images/bitcoin_chart.png', readTime: '5 min read' },
                { title: 'ZKP: A Guide to Zero Knowledge Proofs', category: 'TECH', description: 'A primer on zero-knowledge proofs and their revolutionary impact on privacy in decentralized applications.', img: '/images/zkp_phone.png', readTime: '4 min read' },
              ].map((article) => (
                <Link href="/blog" key={article.title}>
                  <motion.article whileHover={{ y: -8 }} className="group rounded-[1.5rem] border border-white/10 bg-[#050814] overflow-hidden shadow-lg transition-all hover:border-cyan-500/30 flex flex-col h-full">
                    <div className="relative h-48 w-full overflow-hidden border-b border-white/10">
                      <div className="absolute inset-0 bg-cyan-500/20 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity"></div>
                      <Image src={article.img} alt={article.title} fill className="object-cover transform group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="mb-4 flex items-center justify-between">
                        <span className="rounded-full bg-cyan-900/40 border border-cyan-500/30 px-3 py-1 text-[10px] font-bold tracking-widest text-cyan-400">{article.category}</span>
                      </div>
                      <h4 className="text-lg font-bold text-white leading-tight mb-3 group-hover:text-cyan-300 transition-colors">{article.title}</h4>
                      <p className="text-sm leading-relaxed text-slate-400 mb-6 flex-1">{article.description}</p>
                      <div className="text-xs text-slate-500 font-mono mt-auto pt-4 border-t border-white/5">{article.readTime}</div>
                    </div>
                  </motion.article>
                </Link>
              ))}
            </div>
          </motion.section>
        </div>
      </section>

      {/* Decorative Icons Row */}
      <div className="w-full flex justify-center items-center gap-12 py-12 border-t border-white/5 opacity-50">
         <Bitcoin className="w-6 h-6 text-slate-400" />
         <Activity className="w-6 h-6 text-slate-400" />
         <Lock className="w-6 h-6 text-slate-400" />
         <Shield className="w-6 h-6 text-slate-400" />
         <Layers className="w-6 h-6 text-slate-400" />
         <Box className="w-6 h-6 text-slate-400" />
      </div>

      <section className="relative z-20 border-t border-white/5 bg-[#0a0f1d] px-6 py-24">
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,255,255,0.05),transparent_50%)]"></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400 mb-4">READY TO LAUNCH?</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">The Revolution Starts <span className="text-transparent bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text">With You</span></h2>
            <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">Join thousands of builders, hackers, and privacy advocates who are shaping the decentralized future. No permission required.</p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
               <Link href="/community" className="w-full sm:w-auto rounded-full bg-cyan-400 px-8 py-4 text-sm font-bold tracking-widest text-[#050510] transition hover:bg-cyan-300 shadow-[0_0_20px_rgba(0,255,255,0.3)] flex items-center justify-center">JOIN THE DISCORD</Link>
               <Link href="/community" className="w-full sm:w-auto rounded-full border border-pink-500/50 bg-transparent px-8 py-4 text-sm font-bold tracking-widest text-pink-400 transition hover:bg-pink-500/10 hover:border-pink-500 flex items-center justify-center">FOLLOW ON TWITTER</Link>
            </div>
        </div>
      </section>

      <footer className="relative z-20 border-t border-white/10 bg-[#050510] px-6 py-16 text-sm">
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
             <h6 className="font-bold uppercase tracking-[0.2em] text-white text-xs mb-6">PLATFORM</h6>
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
             <form className="flex mt-4">
                <input type="email" placeholder="Email Address..." className="bg-[#0a0f1d] border border-white/10 rounded-l-md px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 w-full" />
                <button type="button" className="bg-cyan-500 text-[#050510] px-4 py-2 text-xs font-bold tracking-widest rounded-r-md hover:bg-cyan-400 transition">SUBSCRIBE</button>
             </form>
             <p className="text-[10px] text-slate-600 mt-2">By subscribing you agree to our terms and conditions.</p>
          </div>
        </div>
        
        <div className="container mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-slate-600 gap-4">
           <p>© 2026 Cypherpunk. Built by cypherpunks for the free world.</p>
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

