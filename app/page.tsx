import Navbar from '@/components/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Code2, Globe, Rocket, Zap, Users2, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-dark-300 overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 container mx-auto px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/30 rounded-full blur-[128px]" />
        </div>

        <div className="flex flex-col items-center text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-4">
            <Sparkles size={14} />
            The Future of Web3 Collaboration
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-tight">
            WHERE BUILDERS <br />
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              CREATE REALITY.
            </span>
          </h1>

          <p className="max-w-2xl text-lg md:text-xl text-slate-400 leading-relaxed">
            Connect with the world's most innovative Web3 builders, collaborate on bleeding-edge projects, 
            and create the decentralized future together.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <Link 
              href="/register" 
              className="group px-8 py-4 bg-primary text-white rounded-2xl text-lg font-bold flex items-center gap-3 hover:bg-opacity-90 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-primary/30"
            >
              Get Started Now
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/events" 
              className="px-8 py-4 glass text-white rounded-2xl text-lg font-bold hover:bg-white/10 transition-all"
            >
              Explore Events
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 w-full max-w-4xl">
            {[
              { label: 'Active Builders', value: '2.5k+' },
              { label: 'Total Projects', value: '450+' },
              { label: 'Events Hosted', value: '120+' },
              { label: 'Funds Raised', value: '$12M+' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <span className="text-3xl font-bold text-white mb-1">{stat.value}</span>
                <span className="text-sm text-slate-500 font-medium uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Features */}
      <section className="py-20 bg-dark-200/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Empowering the Ecosystem</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Everything you need to scale your Web3 presence and find your tribe.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: 'Instant Networking',
                desc: 'Connect with verified builders based on skills, reputation, and project history.',
                color: 'text-primary'
              },
              {
                icon: Globe,
                title: 'Global Hackathons',
                desc: 'Participate in world-class hackathons and workshops from anywhere in the world.',
                color: 'text-secondary'
              },
              {
                icon: Rocket,
                title: 'Project Marketplace',
                desc: 'Find your next big opportunity or recruit top talent for your decentralized vision.',
                color: 'text-accent'
              }
            ].map((feature, i) => (
              <div key={i} className="glass-card p-8 rounded-3xl group">
                <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${feature.color}`}>
                  <feature.icon size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners/Sponsors */}
      <section className="py-20 border-y border-white/5 bg-dark-300">
        <div className="container mx-auto px-6 text-center">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-[0.3em] mb-12 block">Trusted by Industry Leaders</span>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all">
            <div className="text-2xl font-bold tracking-tighter">ETH-GLOBAL</div>
            <div className="text-2xl font-bold tracking-tighter">POLYGON</div>
            <div className="text-2xl font-bold tracking-tighter">METAMASK</div>
            <div className="text-2xl font-bold tracking-tighter">AAVE</div>
            <div className="text-2xl font-bold tracking-tighter">SOLANA</div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="glass p-12 md:p-20 rounded-[3rem] border-white/10 flex flex-col items-center text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to build the future?</h2>
            <Link 
              href="https://discord.gg/cyberphunk" 
              className="px-10 py-5 bg-white text-dark-300 rounded-2xl text-xl font-bold hover:bg-slate-200 transition-all hover:scale-105"
            >
              Join Our Discord
            </Link>
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[160px] -z-10" />
      </section>

      <footer className="py-12 border-t border-white/5 text-slate-500 text-center text-sm">
        <p>© 2026 CYBERPHUNK. All rights reserved. Decentralized and Autonomous.</p>
      </footer>
    </main>
  );
}
