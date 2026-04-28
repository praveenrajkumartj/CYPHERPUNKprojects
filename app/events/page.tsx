"use client";

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Search, Filter, Calendar, MapPin, Users, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    query: '',
    type: '',
    locationType: '',
  });

  useEffect(() => {
    fetchEvents();
  }, [filters]);

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams(filters);
      const res = await fetch(`/api/events?${params.toString()}`);
      const data = await res.json();
      setEvents(Array.isArray(data) ? data : []);
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Community Events</h1>
            <p className="text-slate-400">Discover hackathons, workshops, and meetups happening in the ecosystem.</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="text" 
                placeholder="Search events..."
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-primary/50 transition-all"
                value={filters.query}
                onChange={(e) => setFilters({ ...filters, query: e.target.value })}
              />
            </div>
            
            <select 
              className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50"
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            >
              <option value="" className="bg-dark-200">All Types</option>
              <option value="hackathon" className="bg-dark-200">Hackathons</option>
              <option value="workshop" className="bg-dark-200">Workshops</option>
              <option value="meetup" className="bg-dark-200">Meetups</option>
            </select>

            <select 
              className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50"
              value={filters.locationType}
              onChange={(e) => setFilters({ ...filters, locationType: e.target.value })}
            >
              <option value="" className="bg-dark-200">All Locations</option>
              <option value="online" className="bg-dark-200">Online</option>
              <option value="offline" className="bg-dark-200">Offline</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="animate-spin text-primary mb-4" size={48} />
            <p className="text-slate-500 font-medium">Loading events...</p>
          </div>
        ) : events.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <Link 
                key={event.id} 
                href={`/events/${event.id}`}
                className="glass-card rounded-[2rem] overflow-hidden group flex flex-col h-full"
              >
                <div className="p-8 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-6">
                    <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider">
                      {event.type}
                    </span>
                    <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                      <MapPin size={14} />
                      {event.locationType}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {event.title}
                  </h3>
                  <p className="text-slate-400 text-sm line-clamp-3 mb-6 flex-grow">
                    {event.description}
                  </p>

                  <div className="space-y-4 pt-6 border-t border-white/5">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-slate-300">
                        <Calendar size={16} className="text-primary" />
                        {format(new Date(event.date), 'MMM dd, yyyy')}
                      </div>
                      <div className="flex items-center gap-2 text-slate-300">
                        <Users size={16} className="text-secondary" />
                        {event._count.attendees} Attending
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold text-slate-400">
                          {event.organizer.name.charAt(0)}
                        </div>
                        <span className="text-xs text-slate-500">by {event.organizer.name}</span>
                      </div>
                      <div className="text-primary font-bold text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Details <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 glass rounded-[3rem]">
            <p className="text-slate-400 text-lg">No events found matching your criteria.</p>
            <button 
              onClick={() => setFilters({ query: '', type: '', locationType: '' })}
              className="mt-4 text-primary font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
