'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Users, Globe2, Trophy, Briefcase, ChevronRight, Terminal, Zap, Rocket, Building2, ArrowRight } from 'lucide-react';

export default function ProgramsPageClient({ initialEvents }: { initialEvents: any[] }) {
  const paths = [
    {
      title: 'Web3 Bootcamp',
      tag: 'BOOTCAMP',
      color: 'cyan',
      icon: Terminal,
      description: 'A comprehensive introduction to blockchain development. Learn Solidity, smart contract security, wallet integrations, and DeFi protocols from expert mentors.',
      duration: '12-WK TRACK'
    },
    {
      title: 'Global Hackathon',
      tag: 'HACKATHON',
      color: 'pink',
      icon: Zap,
      description: '72-hour global hackathon focused on privacy-preserving technologies. Compete for $50,000 in prizes across Privacy, DeFi, and DAO categories.',
      duration: '72-HR TRACK'
    },
    {
      title: 'Web3 Accelerator',
      tag: 'ACCELERATOR',
      color: 'yellow',
      icon: Rocket,
      description: '12-week intensive accelerator for early-stage Web3 startups. Receive $25K seed investment, expert mentorship, and VC introductions.',
      duration: '12-WK TRACK'
    },
    {
      title: 'Popup Village',
      tag: 'VILLAGE',
      color: 'emerald',
      icon: Building2,
      description: 'A month-long co-living and co-working experience for Web3 builders in a carefully chosen global city. Build, connect, and ship together.',
      duration: '1-MO TRACK'
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color.toLowerCase()) {
      case 'cyan': 
      case 'hackathon': return { text: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', hover: 'group-hover:border-cyan-400', shadow: 'shadow-[0_0_15px_rgba(0,255,255,0.15)]' };
      case 'pink': 
      case 'meetup': return { text: 'text-pink-500', bg: 'bg-pink-500/10', border: 'border-pink-500/30', hover: 'group-hover:border-pink-500', shadow: 'shadow-[0_0_15px_rgba(255,0,127,0.15)]' };
      case 'yellow': 
      case 'workshop': return { text: 'text-[#ffd700]', bg: 'bg-[#ffd700]/10', border: 'border-[#ffd700]/30', hover: 'group-hover:border-[#ffd700]', shadow: 'shadow-[0_0_15px_rgba(255,215,0,0.15)]' };
      case 'emerald': return { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', hover: 'group-hover:border-emerald-400', shadow: 'shadow-[0_0_15px_rgba(16,185,129,0.15)]' };
      default: return { text: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', hover: 'group-hover:border-cyan-400', shadow: 'shadow-[0_0_15px_rgba(0,255,255,0.15)]' };
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
          <Link href="/" className="font-semibold uppercase tracking-[0.35em] text-cyan-400">CYBERPHUNK</Link>
          <div className="hidden items-center gap-8 lg:flex">
            <Link href="/" className="transition hover:text-white uppercase text-xs tracking-widest">Home</Link>
            <Link href="/about" className="transition hover:text-white uppercase text-xs tracking-widest">About</Link>
            <Link href="/programs" className="transition text-cyan-400 uppercase text-xs tracking-widest relative">
              Programs
              <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-pink-500 rounded-full" />
            </Link>
            <Link href="/projects" className="transition hover:text-white uppercase text-xs tracking-widest">Projects</Link>
            <Link href="/blog" className="transition hover:text-white uppercase text-xs tracking-widest">Blog</Link>
            <Link href="/community" className="transition hover:text-white uppercase text-xs tracking-widest">Community</Link>
          </div>
          <Link href="/register" className="rounded-full border border-pink-500 bg-transparent px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-pink-500 transition hover:bg-pink-500/10">Sign In</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-xs font-semibold flex items-center justify-center gap-2 uppercase tracking-[0.3em] text-cyan-400 mb-6"
          >
            <Terminal className="w-4 h-4" /> PROGRAMS & EVENTS
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1] mb-8"
          >
            Your Journey<br />
            <span className="text-cyan-400">Starts</span> <span className="text-pink-500">Here</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto"
          >
            From beginner bootcamps to elite accelerators — our programs are designed to transform curious minds into world-class Web3 builders.
          </motion.p>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="relative z-20 border-t border-b border-white/5 bg-[#080b19] px-6 py-10">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/5">
          <div className="flex flex-col items-center justify-center space-y-3">
             <Users className="w-6 h-6 text-cyan-400 mb-2" />
             <div className="text-3xl md:text-4xl font-black text-cyan-400 tracking-tight">5,200+</div>
             <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-medium">ALUMNI</div>
          </div>
          <div className="flex flex-col items-center justify-center space-y-3">
             <Globe2 className="w-6 h-6 text-pink-500 mb-2" />
             <div className="text-3xl md:text-4xl font-black text-pink-500 tracking-tight">32</div>
             <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-medium">COUNTRIES</div>
          </div>
          <div className="flex flex-col items-center justify-center space-y-3">
             <Trophy className="w-6 h-6 text-[#ffd700] mb-2" />
             <div className="text-3xl md:text-4xl font-black text-[#ffd700] tracking-tight">$500K+</div>
             <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-medium">PRIZE POOLS</div>
          </div>
          <div className="flex flex-col items-center justify-center space-y-3">
             <Briefcase className="w-6 h-6 text-emerald-400 mb-2" />
             <div className="text-3xl md:text-4xl font-black text-emerald-400 tracking-tight">70%</div>
             <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-medium">JOB PLACEMENT</div>
          </div>
        </div>
      </section>

      {/* Choose Your Path */}
      <section className="relative z-10 py-24 px-6 border-b border-white/5 bg-[#050814]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
             <p className="text-xs font-semibold flex items-center justify-center gap-2 uppercase tracking-[0.3em] text-cyan-400 mb-4">
                <span className="w-4 h-[1px] bg-cyan-400"></span> PROGRAM TRACKS <span className="w-4 h-[1px] bg-cyan-400"></span>
             </p>
             <h2 className="text-4xl md:text-5xl font-bold mb-4">Choose Your <span className="text-transparent bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text">Path</span></h2>
             <p className="text-slate-400">Four distinct tracks designed for different stages of your Web3 journey.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
             {paths.map((path, i) => {
                const styles = getColorClasses(path.color);
                const Icon = path.icon;
                return (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                    className={`group relative rounded-2xl border bg-[#0a0f1d] p-8 flex flex-col transition-all cursor-pointer ${styles.border} ${styles.hover}`}
                  >
                     <div className={`absolute inset-0 bg-gradient-to-br from-${path.color}-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity`} />
                     <div className="relative z-10">
                        <div className="flex items-start justify-between mb-6">
                           <div className="flex items-center gap-4">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${styles.bg} ${styles.border}`}>
                                 <Icon className={`w-5 h-5 ${styles.text}`} />
                              </div>
                              <h3 className="text-xl font-bold text-white">{path.title}</h3>
                           </div>
                           <span className={`text-[10px] font-bold tracking-widest px-3 py-1 rounded-full uppercase border ${styles.bg} ${styles.text} ${styles.border}`}>
                              {path.tag}
                           </span>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed mb-8 flex-grow">{path.description}</p>
                        <div className="flex items-center justify-between pt-6 border-t border-white/5">
                           <span className="text-[10px] text-slate-500 tracking-[0.2em] font-semibold">{path.duration}</span>
                           <span className={`text-xs font-bold flex items-center gap-1 ${styles.text}`}>
                              View Program <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                           </span>
                        </div>
                     </div>
                  </motion.div>
                );
             })}
          </div>
        </div>
      </section>

      {/* Upcoming Events List */}
      <section className="relative z-10 py-24 px-6 border-b border-white/5 bg-[#070b1a]/50">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
             <p className="text-xs font-semibold flex items-center justify-center gap-2 uppercase tracking-[0.3em] text-cyan-400 mb-4">
                <span className="w-4 h-[1px] bg-cyan-400"></span> SCHEDULE <span className="w-4 h-[1px] bg-cyan-400"></span>
             </p>
             <h2 className="text-4xl md:text-5xl font-bold mb-4">Upcoming <span className="text-transparent bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text">Events</span></h2>
          </div>

          <div className="space-y-4">
             {initialEvents.length > 0 ? (
               initialEvents.map((event, i) => {
                 const styles = getColorClasses(event.type);
                 const eventDate = new Date(event.date);
                 return (
                   <motion.div 
                     key={event.id}
                     initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                     className={`group rounded-xl border border-white/5 bg-[#0a0f1d] p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors hover:border-white/10`}
                   >
                      <div className="flex items-center gap-6">
                         <div className="flex flex-col items-center justify-center w-16 h-16 rounded-lg bg-white/5 border border-white/10 shrink-0">
                            <span className="text-2xl font-black text-cyan-400 leading-none">{eventDate.getDate()}</span>
                            <span className="text-[10px] text-slate-500 tracking-wider font-semibold mt-1 uppercase">{eventDate.toLocaleString('default', { month: 'short' })}</span>
                         </div>
                         <div>
                            <h4 className="text-lg font-bold text-white mb-2">{event.title}</h4>
                            <div className="flex flex-wrap items-center gap-3 text-xs">
                               <span className={`px-2 py-0.5 rounded uppercase font-bold tracking-wider ${styles.bg} ${styles.text}`}>{event.type}</span>
                               <span className="text-slate-400 flex items-center gap-1"><Globe2 className="w-3 h-3" /> {event.location || 'Global'}</span>
                               <span className="text-emerald-400 font-medium">• {event.status}</span>
                            </div>
                         </div>
                      </div>
                      <Link href={`/events/${event.id}`} className="w-full md:w-auto px-6 py-3 rounded-lg border border-cyan-500/30 bg-transparent text-xs font-bold tracking-widest text-cyan-400 transition hover:bg-cyan-500/10 flex items-center justify-center gap-2 shrink-0">
                         VIEW DETAILS <ArrowRight className="w-4 h-4" />
                      </Link>
                   </motion.div>
                 );
               })
             ) : (
               <div className="py-20 text-center border border-dashed border-white/10 rounded-2xl">
                  <p className="text-slate-500 uppercase tracking-widest text-xs">No active event sequences detected.</p>
               </div>
             )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-20 bg-[#050510] px-6 py-16 text-sm">
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
           <p>© 2026 Cyberphunk. By the community, for the free world.</p>
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
