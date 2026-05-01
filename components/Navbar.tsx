"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { LayoutGrid, Calendar, Users, Briefcase, User, LogOut, Shield, Rocket, BookOpen } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    // Check if user is logged in
    fetch('/api/profile')
      .then(res => res.ok ? res.json() : null)
      .then(data => setUser(data))
      .catch(() => setUser(null));

    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    router.push('/login');
    router.refresh();
  };

  const navLinks = [
    { name: 'Events', href: '/events', icon: Calendar },
    { name: 'Projects', href: '/marketplace', icon: Briefcase },
    { name: 'Learn', href: '/learn', icon: BookOpen },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4 glass border-b' : 'py-6 bg-transparent'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
            <LayoutGrid className="text-white" size={24} />
          </div>
          <span className="text-2xl font-bold tracking-tighter bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">
            CYBERPHUNK
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${pathname === link.href ? 'text-primary' : 'text-slate-400'}`}
            >
              <link.icon size={16} />
              {link.name}
            </Link>
          ))}
          {user && (
            <Link
              href="/dashboard"
              className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${pathname === '/dashboard' ? 'text-primary' : 'text-slate-400'}`}
            >
              <LayoutGrid size={16} />
              Dashboard
            </Link>
          )}
          {user?.role === 'ORGANIZER' || user?.role === 'ADMIN' ? (
            <Link
              href="/organizer"
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-lg ${pathname === '/organizer' ? 'bg-secondary text-white shadow-secondary/20' : 'bg-white/5 text-secondary border border-secondary/30 hover:bg-secondary/10 hover:border-secondary'}`}
            >
              <Rocket size={16} className={pathname === '/organizer' ? 'animate-pulse' : ''} />
              Organizer Hub
            </Link>
          ) : null}
          {user?.role === 'ADMIN' && (
            <Link
              href="/admin"
              className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-accent ${pathname === '/admin' ? 'text-accent' : 'text-slate-400'}`}
            >
              <Shield size={16} />
              Admin
            </Link>
          )}
        </div>

        <div className="flex items-center gap-4">
          {!user ? (
            <>
              <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors">
                Login
              </Link>
              <Link 
                href="/register" 
                className="px-5 py-2.5 bg-primary text-white rounded-full text-sm font-semibold hover:bg-opacity-90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
              >
                Join
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link 
                href="/profile" 
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                title="Profile"
              >
                <User size={20} />
              </Link>
              <button 
                onClick={handleLogout}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-accent transition-colors"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
