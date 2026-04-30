'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Search, Filter, Calendar, MapPin, X } from 'lucide-react';
import { useTransition } from 'react';

export default function EventFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    
    startTransition(() => {
      router.push(`/events?${params.toString()}`);
    });
  };

  const clearFilters = () => {
    startTransition(() => {
      router.push('/events');
    });
  };

  return (
    <div className="space-y-6 mb-12">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input 
            type="text" 
            placeholder="Search event title..."
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all backdrop-blur-sm"
            defaultValue={searchParams.get('q') || ''}
            onChange={(e) => handleFilter('q', e.target.value)}
          />
        </div>

        {/* Type Filter */}
        <div className="flex-1 max-w-[200px]">
          <select 
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-4 text-white focus:outline-none focus:border-cyan-500/50 backdrop-blur-sm appearance-none cursor-pointer"
            defaultValue={searchParams.get('type') || ''}
            onChange={(e) => handleFilter('type', e.target.value)}
          >
            <option value="" className="bg-[#0c1222]">All Types</option>
            <option value="hackathon" className="bg-[#0c1222]">Hackathons</option>
            <option value="workshop" className="bg-[#0c1222]">Workshops</option>
            <option value="meetup" className="bg-[#0c1222]">Meetups</option>
          </select>
        </div>

        {/* Location Filter */}
        <div className="flex-1 max-w-[200px]">
          <select 
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-4 text-white focus:outline-none focus:border-cyan-500/50 backdrop-blur-sm appearance-none cursor-pointer"
            defaultValue={searchParams.get('location') || ''}
            onChange={(e) => handleFilter('location', e.target.value)}
          >
            <option value="" className="bg-[#0c1222]">All Locations</option>
            <option value="online" className="bg-[#0c1222]">Online</option>
            <option value="offline" className="bg-[#0c1222]">Offline</option>
          </select>
        </div>

        {/* Date Filter */}
        <div className="flex-1 max-w-[200px]">
          <select 
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-4 text-white focus:outline-none focus:border-cyan-500/50 backdrop-blur-sm appearance-none cursor-pointer"
            defaultValue={searchParams.get('date') || 'upcoming'}
            onChange={(e) => handleFilter('date', e.target.value)}
          >
            <option value="upcoming" className="bg-[#0c1222]">Upcoming</option>
            <option value="past" className="bg-[#0c1222]">Past Events</option>
          </select>
        </div>
      </div>

      {(searchParams.toString() && searchParams.toString() !== 'date=upcoming') && (
        <button 
          onClick={clearFilters}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-cyan-400 transition-colors"
        >
          <X size={14} /> Clear all filters
        </button>
      )}

      {isPending && (
        <div className="text-xs text-cyan-400 animate-pulse font-mono">Syncing with network...</div>
      )}
    </div>
  );
}
