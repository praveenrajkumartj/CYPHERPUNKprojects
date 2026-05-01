'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Users, 
  MessageSquare, 
  Zap, 
  Shield, 
  Trophy, 
  Globe, 
  Rocket, 
  Cpu, 
  MessageCircle, 
  Code, 
  Video, 
  Send, 
  Mail, 
  MapPin, 
  Phone,
  ExternalLink,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

export default function CommunityPage() {
  const benefits = [
    { title: 'World-Class Mentorship', icon: Users, desc: 'Connect with industry pioneers and seasoned blockchain experts.', color: 'cyan' },
    { title: 'Exclusive Events', icon: Zap, desc: 'Early access to hackathons, meetups, and private workshops.', color: 'pink' },
    { title: 'Global Network', icon: Globe, desc: 'Collaborate with a diverse community from over 120 countries.', color: 'emerald' },
    { title: 'Privacy First Tools', icon: Shield, desc: 'Exclusive access to our proprietary suite of privacy-preserving tools.', color: 'yellow' },
    { title: 'Early Access Beta', icon: Cpu, desc: 'Be the first to test and shape the next generation of Web3 protocols.', color: 'purple' },
    { title: 'Grant Support', icon: Trophy, desc: 'Financial backing for innovative projects that align with our mission.', color: 'orange' }
  ];

  const topics = [
    { title: 'Future of Zero-Knowledge Rollups', category: 'TECH', date: '2h ago', replies: 24, color: 'cyan' },
    { title: 'Community Governance Proposal #42', category: 'GOV', date: '5h ago', replies: 89, color: 'pink' },
    { title: 'Upcoming Regional Meetups: Q4 2025', category: 'GENERAL', date: '1d ago', replies: 12, color: 'yellow' }
  ];

  const getColorStyles = (color: string) => {
    switch (color) {
      case 'cyan': return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20';
      case 'pink': return 'text-pink-500 bg-pink-500/10 border-pink-500/20';
      case 'emerald': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'yellow': return 'text-[#ffd700] bg-[#ffd700]/10 border-[#ffd700]/20';
      case 'purple': return 'text-purple-400 bg-purple-500/10 border-purple-500/20';
      case 'orange': return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
      default: return 'text-slate-400 bg-white/5 border-white/10';
    }
  };

  return (
    <main className="relative min-h-screen bg-[#050510] text-[#f8fbff] overflow-x-hidden selection:bg-cyan-500/30">
      {/* Background Grids */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,255,255,0.05),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(255,0,127,0.05),transparent_50%)]" />
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
            <Link href="/blog" className="transition hover:text-white uppercase text-xs tracking-widest">Blog</Link>
            <Link href="/community" className="transition text-cyan-400 uppercase text-xs tracking-widest relative">
              Community
              <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-cyan-400 rounded-full" />
            </Link>
          </div>
          <Link href="/register" className="rounded-full border border-pink-500 bg-transparent px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-pink-500 transition hover:bg-pink-500/10">Sign In</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-24 pb-20 px-6 text-center">
        <div className="container mx-auto max-w-4xl">
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-[10px] font-bold tracking-[0.4em] uppercase text-cyan-400 mb-6"
          >
            ESTABLISHED 2024
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-8"
          >
            Join the <span className="text-transparent bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 bg-clip-text">Revolution</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-slate-400 leading-relaxed mb-10 max-w-2xl mx-auto"
          >
            Become part of a global community of Web3 builders, researchers, and privacy advocates. Connect with like-minded individuals and shape the future of technology.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button className="bg-cyan-400 text-[#050510] px-8 py-4 rounded-xl text-xs font-bold tracking-[0.2em] uppercase hover:bg-cyan-300 transition shadow-[0_0_30px_rgba(0,255,255,0.2)] flex items-center gap-2">
               <Users className="w-4 h-4" /> BECOME A MEMBER
            </button>
            <button className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-xl text-xs font-bold tracking-[0.2em] uppercase hover:bg-white/10 transition flex items-center gap-2">
               <MessageSquare className="w-4 h-4" /> EXPLORE FORUMS
            </button>
          </motion.div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="relative z-10 py-24 px-6 bg-[#050814]/50 border-t border-white/5">
        <div className="container mx-auto max-w-6xl text-center">
           <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-pink-500 mb-4">MEMBERSHIP PERKS</p>
           <h2 className="text-4xl font-bold text-white mb-16">What You <span className="text-transparent bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text">Unlock</span></h2>
           
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((item, i) => (
                 <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="group p-8 rounded-2xl border border-white/5 bg-[#0a0f1d] text-left hover:border-white/20 transition-all hover:-translate-y-2"
                 >
                    <div className={`w-12 h-12 rounded-xl mb-6 flex items-center justify-center ${getColorStyles(item.color)}`}>
                       <item.icon className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">{item.title}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                 </motion.div>
              ))}
           </div>
           
           {/* Forum Snippet */}
           <div className="mt-20 max-w-2xl mx-auto rounded-3xl border border-white/5 bg-[#080b19] p-8 text-left">
              <div className="flex items-center justify-between mb-8">
                 <h5 className="text-sm font-bold tracking-widest uppercase flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-cyan-400" /> Recent Forum Topics
                 </h5>
                 <Link href="#" className="text-[10px] font-bold text-cyan-400 hover:underline uppercase tracking-widest">View All</Link>
              </div>
              
              <div className="space-y-4">
                 {topics.map((topic, i) => (
                    <div key={i} className="group p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer">
                       <div className="flex items-center gap-4">
                          <span className={`px-2 py-0.5 rounded text-[8px] font-black tracking-tighter border ${getColorStyles(topic.color)}`}>
                             {topic.category}
                          </span>
                          <p className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">{topic.title}</p>
                       </div>
                       <div className="flex items-center gap-4 text-[10px] text-slate-500 font-bold uppercase">
                          <span>{topic.replies} REPLIES</span>
                          <span className="w-1 h-1 rounded-full bg-slate-700" />
                          <span>{topic.date}</span>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* Identity Section */}
      <section className="relative z-10 py-32 px-6">
         <div className="container mx-auto max-w-6xl grid lg:grid-cols-2 gap-20 items-center">
            <div>
               <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-cyan-400 mb-6">ON-CHAIN VERIFICATION</p>
               <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">Connect Your <span className="text-transparent bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text">Web3 Identity</span></h2>
               <p className="text-lg text-slate-400 mb-10 leading-relaxed">
                  Authentication in the Cypherpunk community is handled via decentralized protocols. Link your wallet to verify your on-chain history and unlock tier-based rewards.
               </p>
               
               <ul className="space-y-6">
                  {[
                    'Unlock decentralized identity and avatars',
                    'Verify your on-chain history and credentials',
                    'Access exclusive token-gated channels',
                    'Receive governance voting rights'
                  ].map((item, i) => (
                     <li key={i} className="flex items-start gap-4">
                        <div className="w-6 h-6 rounded-full bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center shrink-0 mt-1">
                           <Shield className="w-3 h-3 text-cyan-400" />
                        </div>
                        <span className="text-slate-300 font-medium">{item}</span>
                     </li>
                  ))}
               </ul>
            </div>
            
            <div className="relative group">
               <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity" />
               <div className="relative rounded-3xl border border-white/10 bg-[#0a0f1d] p-10 text-center shadow-2xl overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                     <Users size={120} />
                  </div>
                  <div className="w-20 h-20 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mx-auto mb-8">
                     {/* Simplified MetaMask style fox / icon */}
                     <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white">🦊</div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Connect Wallet</h3>
                  <p className="text-slate-500 text-sm mb-10">Support for MetaMask, WalletConnect, and Coinbase Wallet.</p>
                  <button className="w-full bg-[#f6851b] hover:bg-[#e27611] text-white px-8 py-4 rounded-xl text-xs font-bold tracking-widest transition-all uppercase shadow-[0_0_20px_rgba(246,133,27,0.3)]">
                     Connect MetaMask
                  </button>
                  <p className="mt-6 text-[10px] text-slate-600 uppercase tracking-widest font-bold">Secure • Private • Decentralized</p>
               </div>
            </div>
         </div>
      </section>

      {/* Socials / Join Conversation */}
      <section className="relative z-10 py-24 px-6 bg-[#050814]/50 border-y border-white/5">
        <div className="container mx-auto max-w-6xl text-center">
           <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-cyan-400 mb-4">STAY CONNECTED</p>
           <h2 className="text-4xl font-bold text-white mb-16">Join the <span className="text-transparent bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text">Conversation</span></h2>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: 'X / Twitter', handle: '@cypherpunk', icon: MessageCircle, color: 'text-white' },
                { name: 'Discord', handle: 'Cypherpunk Server', icon: MessageSquare, color: 'text-[#5865F2]' },
                { name: 'Telegram', handle: 't.me/cypherpunk', icon: Send, color: 'text-[#229ED9]' },
                { name: 'GitHub', handle: 'cypherpunk-dev', icon: Code, color: 'text-white' },
                { name: 'YouTube', handle: 'Cypherpunk Labs', icon: Video, color: 'text-[#FF0000]' }
              ].map((social, i) => (
                 <div key={i} className="group p-6 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between hover:bg-white/10 transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                       <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${social.color}`}>
                          <social.icon className="w-5 h-5" />
                       </div>
                       <div className="text-left">
                          <p className="text-sm font-bold text-white">{social.name}</p>
                          <p className="text-[10px] text-slate-500 font-bold uppercase">{social.handle}</p>
                       </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                 </div>
              ))}
           </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative z-10 py-32 px-6">
         <div className="container mx-auto max-w-6xl grid lg:grid-cols-2 gap-20">
            <div>
               <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-pink-500 mb-6">CONTACT US</p>
               <h2 className="text-4xl font-bold text-white mb-8">Get in <span className="text-transparent bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text">Touch</span></h2>
               <p className="text-slate-400 mb-12 leading-relaxed">
                  Have a question or want to partner with us? Reach out and our team will get back to you within 24 hours.
               </p>
               
               <div className="space-y-8">
                  <div className="flex items-center gap-6 group cursor-pointer">
                     <div className="w-14 h-14 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center group-hover:bg-cyan-400 group-hover:text-[#050510] transition-all">
                        <Mail className="w-6 h-6" />
                     </div>
                     <div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Email Us</p>
                        <p className="text-lg font-bold text-white">hello@cypherpunk.io</p>
                     </div>
                  </div>
                  
                  <div className="flex items-center gap-6 group cursor-pointer">
                     <div className="w-14 h-14 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center group-hover:bg-pink-500 group-hover:text-[#050510] transition-all">
                        <MapPin className="w-6 h-6" />
                     </div>
                     <div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Our Base</p>
                        <p className="text-lg font-bold text-white">Cyber Heights, Digital District</p>
                     </div>
                  </div>
                  
                  <div className="flex items-center gap-6 group cursor-pointer">
                     <div className="w-14 h-14 rounded-2xl bg-[#ffd700]/10 border border-[#ffd700]/20 flex items-center justify-center group-hover:bg-[#ffd700] group-hover:text-[#050510] transition-all">
                        <Phone className="w-6 h-6" />
                     </div>
                     <div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Call Us</p>
                        <p className="text-lg font-bold text-white">+1 (888) CRYPTO-PHUNK</p>
                     </div>
                  </div>
               </div>
            </div>
            
            <div className="rounded-[2.5rem] bg-[#0a0f1d] border border-white/10 p-10 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-[80px]" />
               <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Your Name</label>
                        <input type="text" placeholder="John Doe" className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                        <input type="email" placeholder="john@example.com" className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors" />
                     </div>
                  </div>
                  
                  <div className="space-y-2">
                     <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Subject</label>
                     <input type="text" placeholder="How can we help?" className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors" />
                  </div>
                  
                  <div className="space-y-2">
                     <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Message</label>
                     <textarea placeholder="Write your message here..." rows={4} className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors resize-none" />
                  </div>
                  
                  <button className="w-full bg-cyan-400 text-[#050510] px-8 py-5 rounded-2xl text-xs font-bold tracking-[0.2em] uppercase hover:bg-cyan-300 transition-all shadow-[0_0_40px_rgba(0,255,255,0.2)] flex items-center justify-center gap-2">
                     <Send className="w-4 h-4" /> SEND MESSAGE
                  </button>
               </form>
            </div>
         </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 py-32 px-6 overflow-hidden">
         <div className="container mx-auto max-w-4xl text-center relative">
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
               className="relative z-10"
            >
               <Zap className="w-12 h-12 text-orange-400 mx-auto mb-8 animate-pulse" />
               <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">The Code Cannot <span className="text-transparent bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 bg-clip-text italic">Be Stopped</span></h2>
               <p className="text-slate-400 text-lg mb-12 max-w-xl mx-auto">
                  We are building the future of the internet. No gatekeepers, no censorship. Join the movement today.
               </p>
               <button className="bg-cyan-400 text-[#050510] px-12 py-5 rounded-full text-xs font-bold tracking-[0.3em] uppercase hover:bg-cyan-300 transition-all shadow-[0_0_50px_rgba(0,255,255,0.3)]">
                  START YOUR JOURNEY
               </button>
            </motion.div>
            
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
         </div>
      </section>

      {/* Footer */}
      <footer className="relative z-20 bg-[#050510] px-6 py-20 text-sm border-t border-white/5">
        <div className="container mx-auto grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.5fr]">
          <div className="space-y-6">
            <h5 className="font-mono font-medium uppercase tracking-[0.3em] text-slate-200 text-lg">CYPHERPUNK</h5>
            <p className="text-slate-500 leading-relaxed max-w-xs">The cypherpunk community platform for Web3 builders, privacy advocates, and digital sovereignty warriors.</p>
            <div className="flex gap-4 pt-4">
              {[MessageCircle, Code, Shield, Globe].map((Icon, i) => (
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
                "We don't share data. We don't track. Your privacy is absolute. Code is law."
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

