'use client';

import { useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, Filter, X, Briefcase, Users as UsersIcon, LayoutGrid } from 'lucide-react';
import UserCard from './UserCard';
import { motion, AnimatePresence } from 'framer-motion';

interface NetworkingClientProps {
  initialUsers: any[];
  currentUserId: string;
}

export default function NetworkingClient({ initialUsers, currentUserId }: NetworkingClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [showFilters, setShowFilters] = useState(false);

  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [hiring, setHiring] = useState(searchParams.get('hiring') === 'true');
  const [looking, setLooking] = useState(searchParams.get('looking') === 'true');

  const updateFilters = (newParams: any) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.keys(newParams).forEach(key => {
      if (newParams[key] === null || newParams[key] === false || newParams[key] === '') {
        params.delete(key);
      } else {
        params.set(key, newParams[key]);
      }
    });
    
    startTransition(() => {
      router.push(`/network?${params.toString()}`);
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({ q: query });
  };

  return (
    <div className="space-y-8">
      {/* Search and Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <form onSubmit={handleSearch} className="flex-1 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={20} />
          <input
            type="text"
            placeholder="Search builders, usernames, or roles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-[#0c1222]/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder:text-slate-600"
          />
        </form>
        
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-6 py-4 rounded-2xl border transition-all ${
            showFilters ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400' : 'bg-[#0c1222]/50 border-white/10 text-slate-400 hover:border-white/20'
          }`}
        >
          <Filter size={20} />
          <span className="font-bold text-sm uppercase tracking-widest">Filters</span>
        </button>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6 rounded-3xl bg-[#0c1222]/30 border border-white/5 border-dashed">
              <button
                onClick={() => {
                  setHiring(!hiring);
                  updateFilters({ hiring: !hiring });
                }}
                className={`flex items-center justify-center gap-3 p-4 rounded-2xl border transition-all ${
                  hiring ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.1)]' : 'bg-white/5 border-white/10 text-slate-400'
                }`}
              >
                <Briefcase size={18} />
                <span className="text-sm font-bold uppercase tracking-wider">Hiring</span>
              </button>

              <button
                onClick={() => {
                  setLooking(!looking);
                  updateFilters({ looking: !looking });
                }}
                className={`flex items-center justify-center gap-3 p-4 rounded-2xl border transition-all ${
                  looking ? 'bg-pink-500/10 border-pink-500/30 text-pink-400 shadow-[0_0_20px_rgba(236,72,153,0.1)]' : 'bg-white/5 border-white/10 text-slate-400'
                }`}
              >
                <UsersIcon size={18} />
                <span className="text-sm font-bold uppercase tracking-wider">Looking for Team</span>
              </button>

              <button
                onClick={() => {
                  setQuery('');
                  setHiring(false);
                  setLooking(false);
                  router.push('/network');
                }}
                className="flex items-center justify-center gap-3 p-4 rounded-2xl border border-white/5 bg-white/5 text-slate-500 hover:text-white transition-all"
              >
                <X size={18} />
                <span className="text-sm font-bold uppercase tracking-wider">Clear All</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${isPending ? 'opacity-50' : 'opacity-100'} transition-opacity`}>
        {initialUsers.length > 0 ? (
          initialUsers.map((user) => (
            <UserCard key={user.id} user={user} currentUserId={currentUserId} />
          ))
        ) : (
          <div className="col-span-full py-20 text-center border border-white/5 border-dashed rounded-3xl">
            <LayoutGrid className="mx-auto text-slate-700 mb-4" size={48} />
            <p className="text-slate-500 uppercase tracking-widest text-sm">No builders found in this sector of the grid.</p>
          </div>
        )}
      </div>
    </div>
  );
}
