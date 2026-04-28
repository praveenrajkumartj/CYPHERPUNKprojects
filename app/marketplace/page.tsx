"use client";

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Search, Briefcase, Plus, ArrowRight, Loader2, Users } from 'lucide-react';
import Link from 'next/link';

export default function MarketplacePage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-dark-300">
      <Navbar />

      <div className="pt-32 pb-20 container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Project Marketplace</h1>
            <p className="text-slate-400">Find projects looking for builders or post your own decentralized vision.</p>
          </div>
          
          <Link 
            href="/marketplace/new"
            className="px-6 py-3 bg-primary text-white rounded-xl font-bold flex items-center gap-2 hover:bg-opacity-90 transition-all shadow-lg shadow-primary/20"
          >
            <Plus size={20} />
            Post Project
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-32">
            <Loader2 className="animate-spin text-primary" size={48} />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Link 
                key={project.id} 
                href={`/marketplace/${project.id}`}
                className="glass-card p-8 rounded-[2rem] group flex flex-col h-full"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                    <Briefcase size={24} />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    project.status === 'OPEN' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500'
                  }`}>
                    {project.status}
                  </span>
                </div>

                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-slate-400 text-sm line-clamp-3 mb-6 flex-grow">{project.description}</p>

                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold text-slate-500">
                      {project.creator.name.charAt(0)}
                    </div>
                    <span className="text-xs text-slate-500">by {project.creator.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 text-xs">
                    <Users size={14} />
                    {project._count.applications} Applicants
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
