'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Video, Lightbulb, Trophy, ArrowRight } from 'lucide-react';

export default function LearnPage() {
  const sections = [
    {
      icon: BookOpen,
      title: 'Blog & Articles',
      description: 'Deep dives into blockchain, privacy, and decentralized systems',
      href: '/blog',
      color: 'from-cyan-400 to-blue-500',
      badge: '15+ Articles'
    },
    {
      icon: Lightbulb,
      title: 'Tutorials & Guides',
      description: 'Step-by-step guides for Solana and Bitcoin development',
      href: '/tutorials',
      color: 'from-pink-500 to-purple-500',
      badge: '12 Tutorials'
    },
    {
      icon: Video,
      title: 'Recorded Sessions',
      description: 'Live recorded workshops and community talks',
      href: '/sessions',
      color: 'from-orange-400 to-red-500',
      badge: '28 Videos'
    },
    {
      icon: Trophy,
      title: 'Hackathon Guides',
      description: 'Everything you need to participate and win',
      href: '/guides',
      color: 'from-yellow-400 to-orange-500',
      badge: '5 Guides'
    }
  ];

  return (
    <main className="min-h-screen bg-[#050510] text-[#f8fbff] overflow-x-hidden">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,255,255,0.05),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(255,0,127,0.05),transparent_50%)]" />
      </div>

      {/* Header */}
      <header className="relative z-50 border-b border-white/10">
        <nav className="container mx-auto flex items-center justify-between px-6 py-6">
          <Link href="/" className="font-semibold uppercase tracking-[0.35em] text-cyan-400">
            CYBERPHUNK
          </Link>
          <div className="hidden lg:flex items-center gap-8">
            <Link href="/" className="text-xs font-bold uppercase tracking-widest text-slate-300 hover:text-white transition">
              Home
            </Link>
            <Link href="/community" className="text-xs font-bold uppercase tracking-widest text-slate-300 hover:text-white transition">
              Community
            </Link>
            <Link href="/learn" className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Learn
            </Link>
          </div>
          <Link href="/register" className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400 hover:text-cyan-300 transition">
            Sign In →
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative z-10 py-32 px-6 text-center">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.3em] bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 mb-6">
              Learning Hub
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-7xl font-bold text-white mb-8 leading-tight"
          >
            Master Web3 Development & <span className="text-transparent bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 bg-clip-text">Privacy Tech</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-400 mb-12 leading-relaxed max-w-2xl mx-auto"
          >
            From blockchain fundamentals to advanced cryptography, access comprehensive resources created by the CyberPhunk community to accelerate your Web3 journey.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/blog" className="px-8 py-4 rounded-xl bg-cyan-400 text-[#050510] font-bold uppercase tracking-[0.2em] hover:bg-cyan-300 transition inline-flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Start Learning
            </Link>
            <Link href="/community" className="px-8 py-4 rounded-xl border border-white/20 bg-white/5 text-white font-bold uppercase tracking-[0.2em] hover:bg-white/10 transition inline-flex items-center gap-2">
              Join Community
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="relative z-10 py-32 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Explore Our <span className="text-transparent bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text">Learning Paths</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Curated content across multiple formats to match your learning style
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {sections.map((section, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={section.href}>
                  <div className="group relative h-full p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-[#0a0f1d] to-[#050510] hover:border-white/30 transition-all overflow-hidden cursor-pointer hover:-translate-y-2">
                    {/* Background gradient */}
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition bg-gradient-to-br ${section.color}`} />

                    {/* Content */}
                    <div className="relative z-10">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center mb-6 group-hover:scale-110 transition`}>
                        <section.icon className="w-8 h-8 text-white" />
                      </div>

                      <div className="mb-2 flex items-center justify-between">
                        <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition">
                          {section.title}
                        </h3>
                        <ArrowRight className="w-5 h-5 text-slate-400 group-hover:translate-x-2 group-hover:text-cyan-400 transition" />
                      </div>

                      <p className="text-slate-400 mb-6">{section.description}</p>

                      <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-white/5 text-slate-300 border border-white/10">
                        {section.badge}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 py-32 px-6 bg-[#0a0f1d]/50 border-y border-white/5">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                num: '60+',
                title: 'Learning Resources',
                desc: 'Articles, guides, and tutorials'
              },
              {
                num: '28',
                title: 'Video Sessions',
                desc: 'Recorded workshops & talks'
              },
              {
                num: '5000+',
                title: 'Community Members',
                desc: 'Learning together'
              }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text mb-2">
                  {stat.num}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{stat.title}</h3>
                <p className="text-slate-400">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-32 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
              Ready to Start Learning?
            </h2>
            <p className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto">
              Join thousands of developers building the future of Web3 with CyberPhunk DAO
            </p>
            <Link href="/blog" className="inline-block px-10 py-5 rounded-xl bg-gradient-to-r from-cyan-400 to-pink-500 text-[#050510] font-bold uppercase tracking-[0.2em] hover:shadow-lg hover:shadow-cyan-400/50 transition">
              Explore All Resources
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
