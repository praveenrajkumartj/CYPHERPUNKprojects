'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown, Sparkles, Shield, Cpu, Zap, Activity } from 'lucide-react';

const ParticleBackground = ({ mouseX, mouseY }: { mouseX: any, mouseY: any }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: any[] = [];
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      x: number; y: number; size: number; speedX: number; speedY: number; opacity: number;
      baseX: number; baseY: number;
      color: string;
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = Math.random() * 3 + 1.5; // Increased size for "thicker" dots
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.6 + 0.4;
        this.color = Math.random() > 0.5 ? '0, 255, 255' : '236, 72, 153';
      }
      update(mX: number, mY: number) {
        // Basic movement
        this.x += this.speedX;
        this.y += this.speedY;

        // Mouse interaction (repulsion)
        const dx = mX - this.x;
        const dy = mY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 150) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (150 - distance) / 150;
          this.x -= forceDirectionX * force * 5;
          this.y -= forceDirectionY * force * 5;
        }

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }
      draw() {
        if (!ctx) return;
        ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${this.color}, 0.8)`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // Reset for performance
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < 120; i++) particles.push(new Particle());
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const mX = mousePos.current.x;
      const mY = mousePos.current.y;

      // Draw constellation lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.1 * (1 - distance/120)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      particles.forEach(p => {
        p.update(mX, mY);
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMoveGlobal = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMoveGlobal);
    resize();
    init();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMoveGlobal);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none mix-blend-screen opacity-70" />;
};

const PrismShape = ({ mouseX, mouseY, index }: { mouseX: any, mouseY: any, index: number }) => {
  const x = useTransform(mouseX, [-0.5, 0.5], [index * -20, index * 20]);
  const y = useTransform(mouseY, [-0.5, 0.5], [index * -20, index * 20]);

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${15 + index * 20}%`,
        top: `${20 + (index % 3) * 20}%`,
        x,
        y,
      }}
    >
      <motion.div
        animate={{
          y: [0, 40, 0],
          rotateX: [0, 360],
          rotateY: [0, 360],
        }}
        transition={{
          duration: 15 + index * 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="w-24 h-24 border border-white/10 bg-white/5 backdrop-blur-md rounded-2xl relative"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-pink-500/20 rounded-2xl border border-white/5 shadow-[inset_0_0_15px_rgba(255,255,255,0.1)]" />
        <div className="absolute inset-2 border border-white/10 rounded-xl" />
      </motion.div>
    </motion.div>
  );
};

const FloatingShapes = ({ mouseX, mouseY }: { mouseX: any, mouseY: any }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Moving Nebula Gradients */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-cyan-500/20 rounded-full blur-[120px] mix-blend-screen"
      />
      <motion.div 
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.15, 0.1],
          rotate: [90, 0, 90]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen"
      />

      {/* Floating 3D Prisms */}
      {[...Array(5)].map((_, i) => (
        <PrismShape key={i} mouseX={mouseX} mouseY={mouseY} index={i} />
      ))}
      
      {/* Volumetric Light Rays */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.2)_0%,transparent_60%)] rotate-[-15deg] blur-3xl" />
        <div className="absolute top-[-10%] right-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,0.2)_0%,transparent_60%)] rotate-[15deg] blur-3xl" />
      </div>

      {/* Animated Scanline/Digital Grid */}
      <motion.div 
        animate={{ y: ['-100%', '100%'] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent h-[50%] w-full pointer-events-none opacity-20"
      />
    </div>
  );
};

export default function HeroSection({ user }: { user: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 100, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const glowX = useSpring(mouseX, { damping: 40, stiffness: 40 });
  const glowY = useSpring(mouseY, { damping: 40, stiffness: 40 });
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    
    mouseX.set(x);
    mouseY.set(y);
    
    glowX.set(e.clientX - left);
    glowY.set(e.clientY - top);
  };

  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-10, 10]);
  
  const card1Y = useTransform(smoothMouseY, [-0.5, 0.5], [-20, 20]);
  const card1X = useTransform(smoothMouseX, [-0.5, 0.5], [-20, 20]);
  
  const card2Y = useTransform(smoothMouseY, [-0.5, 0.5], [-40, 40]);
  const card2X = useTransform(smoothMouseX, [-0.5, 0.5], [-40, 40]);

  const { scrollY } = useScroll();
  const scrollOpacity = useTransform(scrollY, [0, 200], [1, 0]);

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#050510] via-[#080b19] to-[#03030a] text-white flex items-center"
    >
      <ParticleBackground />
      <FloatingShapes mouseX={smoothMouseX} mouseY={smoothMouseY} />

      {/* Dynamic Background Glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-500 mix-blend-screen"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              800px circle at ${glowX}px ${glowY}px,
              rgba(139, 92, 246, 0.15),
              rgba(56, 189, 248, 0.05),
              transparent 80%
            )
          `,
        }}
      />

      {/* Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_30%,transparent_100%)]" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16 pt-20">
        
        {/* Left Content */}
        <div className="flex-1 w-full max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium mb-8 backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4" />
            <span>The Next Generation Web3 Protocol</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]"
          >
            Decentralize <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
              The Future.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 mb-10 leading-relaxed max-w-xl"
          >
            Build scalable, secure, and truly decentralized applications with our enterprise-grade infrastructure. No permission required.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Link 
              href={user ? (user.role === 'ORGANIZER' || user.role === 'ADMIN' ? '/organizer' : '/dashboard') : '/register'} 
              className="group relative w-full sm:w-auto px-8 py-4 bg-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] overflow-hidden flex items-center justify-center"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 text-[#03030a]">
                {user ? 'Go to Dashboard' : 'Start Building'} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
            <Link href="/about" className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold border border-white/10 bg-white/5 backdrop-blur-md text-white transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] flex items-center justify-center">
              Explore Documentation
            </Link>
          </motion.div>
        </div>

        {/* Right Content - GenZ Project Cards */}
        <div className="flex-1 w-full relative h-[600px] hidden lg:block" style={{ perspective: '1200px' }}>
          <motion.div
            style={{ 
              rotateX, 
              rotateY,
              transformStyle: "preserve-3d" 
            }}
            className="w-full h-full relative flex items-center justify-center"
          >
            {/* Background Glow behind cards */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.1),transparent_70%)] blur-3xl rounded-full transform -translate-z-12" />

            {/* Event Pulse Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
              className="absolute z-20 w-[360px] rounded-[2.5rem] border border-white/20 bg-black/40 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,255,255,0.1)] p-8 overflow-hidden group"
              style={{
                x: card1X,
                y: card1Y,
                translateZ: 60,
              }}
            >
              <div className="absolute top-0 right-0 p-4">
                 <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30 group-hover:rotate-12 transition-transform">
                    <Sparkles className="w-6 h-6 text-cyan-400" />
                 </div>
              </div>
              
              <div className="space-y-6">
                <div>
                   <p className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.3em] mb-2">Next Hackathon</p>
                   <h3 className="text-2xl font-medium text-white leading-none font-mono tracking-[0.2em]">CYPHERPUNK<br/>2026_</h3>
                </div>

                <div className="flex items-center gap-2">
                   <div className="flex -space-x-3">
                      {[1,2,3,4].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-[#050510] bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-[10px] font-bold">
                           {String.fromCharCode(64 + i)}
                        </div>
                      ))}
                   </div>
                   <p className="text-xs font-bold text-slate-400">+1.2k joined</p>
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                   <div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Prize Pool</p>
                      <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-400">$50,000</p>
                   </div>
                   <div className="px-4 py-2 rounded-full bg-cyan-400 text-[#050510] text-[10px] font-black uppercase tracking-widest group-hover:scale-110 transition-transform cursor-pointer">
                      ENTER_
                   </div>
                </div>
              </div>
            </motion.div>

            {/* Community Hub Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
              className="absolute z-10 -right-12 -bottom-4 w-[260px] rounded-[2rem] border border-white/10 bg-[#0a0a16]/80 backdrop-blur-xl shadow-2xl p-6"
              style={{
                x: card2X,
                y: card2Y,
                translateZ: -20,
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-pink-500/20 flex items-center justify-center border border-pink-500/30">
                    <Activity className="w-4 h-4 text-pink-400" />
                  </div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-widest">Live Pulse</h4>
                </div>
                <div className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
              </div>
              
              <div className="space-y-4">
                 <div className="flex justify-between items-center">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active Bounties</p>
                    <p className="text-sm font-black text-pink-400">12</p>
                 </div>
                 <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "65%" }}
                      transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-pink-500 to-rose-400 rounded-full"
                    />
                 </div>
                 <div className="flex justify-between items-center">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Nodes Online</p>
                    <p className="text-sm font-black text-cyan-400">5.2k</p>
                 </div>
              </div>
            </motion.div>

             {/* Protocol Feed Card */}
             <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.7 }}
              className="absolute z-30 -left-16 top-0 w-[220px] rounded-3xl border border-white/10 bg-indigo-900/30 backdrop-blur-lg shadow-2xl p-5 overflow-hidden"
              style={{
                x: card2X,
                y: card2Y,
                translateZ: 100,
              }}
            >
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-indigo-500" />
               <div className="space-y-3">
                  <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-cyan-400" />
                     <p className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">New Proposal</p>
                  </div>
                  <p className="text-xs font-medium text-white leading-relaxed">Implement cross-chain RSVP logic for Q3 events...</p>
                  <div className="flex justify-between items-center pt-2">
                     <span className="text-[10px] font-mono text-slate-400">#DAO-491</span>
                     <span className="text-[10px] font-bold text-indigo-300 px-2 py-0.5 rounded bg-indigo-500/20">VOTE_</span>
                  </div>
               </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Hint */}
      <motion.div 
        style={{ opacity: scrollOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
      >
        <span className="text-xs font-medium uppercase tracking-[0.2em]">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
