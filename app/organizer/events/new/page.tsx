"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { Calendar, Type, MapPin, AlignLeft, Loader2, ArrowLeft, Rocket } from 'lucide-react';
import Link from 'next/link';

export default function NewEventPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'hackathon',
    locationType: 'online',
    date: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/organizer');
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-dark-300">
      <Navbar />

      <div className="pt-32 pb-20 container mx-auto px-6 max-w-3xl">
        <Link href="/organizer" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-8 group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Hub
        </Link>

        <div className="flex items-center gap-4 mb-12">
          <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
            <Rocket size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Launch New Event</h1>
            <p className="text-slate-400">Fill in the details to start your community event.</p>
          </div>
        </div>

        <div className="glass-card p-10 rounded-[2.5rem] border-white/10">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <label className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <Type size={16} /> Event Title
              </label>
              <input 
                type="text" 
                required
                placeholder="e.g. Cyberphunk Hackathon 2026"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white text-lg focus:outline-none focus:border-primary/50 transition-all"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <Calendar size={16} /> Event Type
                </label>
                <select 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-primary/50 appearance-none"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                >
                  <option value="hackathon" className="bg-dark-200">Hackathon</option>
                  <option value="workshop" className="bg-dark-200">Workshop</option>
                  <option value="meetup" className="bg-dark-200">Meetup</option>
                </select>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <MapPin size={16} /> Location Type
                </label>
                <select 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-primary/50 appearance-none"
                  value={formData.locationType}
                  onChange={(e) => setFormData({ ...formData, locationType: e.target.value })}
                >
                  <option value="online" className="bg-dark-200">Online</option>
                  <option value="offline" className="bg-dark-200">Offline</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <Calendar size={16} /> Date & Time
              </label>
              <input 
                type="datetime-local" 
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-primary/50 transition-all"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>

            <div className="space-y-4">
              <label className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <AlignLeft size={16} /> Description
              </label>
              <textarea 
                rows={6}
                required
                placeholder="What is this event about? What will attendees learn or build?"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-primary/50 transition-all resize-none"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 shadow-2xl shadow-primary/30 text-lg"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                'Publish Event'
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
