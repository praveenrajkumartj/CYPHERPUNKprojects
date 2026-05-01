'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, Plus, Loader2 } from 'lucide-react';
import ProjectCard from './ProjectCard';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface ProjectGridProps {
  initialProjects: any[];
}

export default function ProjectGrid({ initialProjects }: ProjectGridProps) {
  const [projects, setProjects] = useState(initialProjects);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(false);

  // Simple local filter for demo purposes, but in real app we'd use server action on debounced search
  useEffect(() => {
    let filtered = initialProjects;
    
    if (search) {
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(p => p.status === statusFilter);
    }
    
    setProjects(filtered);
  }, [search, statusFilter, initialProjects]);

  return (
    <div className="space-y-12">
      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between p-6 rounded-[2.5rem] bg-[#0c1222]/50 border border-white/5 backdrop-blur-xl sticky top-24 z-30 shadow-2xl">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
          <input 
            type="text"
            placeholder="Search projects, stacks, or builders..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-16 pr-6 text-white focus:outline-none focus:border-cyan-500/50 transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-48">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <select 
              className="w-full bg-[#0c1222] border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm text-white appearance-none focus:outline-none focus:border-cyan-500/50"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All States</option>
              <option value="idea">Idea Stage</option>
              <option value="building">Building</option>
              <option value="launched">Launched</option>
            </select>
          </div>
          
          <Link 
            href="/projects/create"
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-cyan-400 text-[#050510] font-black uppercase tracking-widest text-xs hover:bg-cyan-300 transition-all active:scale-95 shadow-[0_0_30px_rgba(34,211,238,0.2)]"
          >
            <Plus size={18} /> New Project
          </Link>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </AnimatePresence>
      </div>

      {projects.length === 0 && (
        <div className="py-32 text-center space-y-4">
          <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6">
            <Search size={32} className="text-slate-600" />
          </div>
          <h3 className="text-2xl font-bold text-white">No projects found</h3>
          <p className="text-slate-500">Try adjusting your filters or search query.</p>
        </div>
      )}
    </div>
  );
}
