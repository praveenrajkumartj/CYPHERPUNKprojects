"use client";

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { User, Mail, MapPin, Briefcase, Code, Wallet, Loader2, Save, Tag } from 'lucide-react';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    location: '',
    walletAddress: '',
    skills: [] as string[],
  });
  const [skillInput, setSkillInput] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch('/api/profile');
      const data = await res.json();
      if (res.ok) {
        setUser(data);
        setFormData({
          name: data.name || '',
          bio: data.bio || '',
          location: data.location || '',
          walletAddress: data.walletAddress || '',
          skills: data.skills?.map((s: any) => s.skill.name) || [],
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const addSkill = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault();
      if (!formData.skills.includes(skillInput.trim())) {
        setFormData({ ...formData, skills: [...formData.skills, skillInput.trim()] });
      }
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    setFormData({ ...formData, skills: formData.skills.filter(s => s !== skill) });
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-dark-300 flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={48} />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-dark-300">
      <Navbar />

      <div className="pt-32 pb-20 container mx-auto px-6 max-w-4xl">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">My Profile</h1>
            <p className="text-slate-400">Manage your identity in the Cyberphunk ecosystem.</p>
          </div>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-3 bg-primary text-white rounded-xl font-bold flex items-center gap-2 hover:bg-opacity-90 transition-all active:scale-95 disabled:opacity-50 shadow-lg shadow-primary/20"
          >
            {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
            Save Changes
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="space-y-8">
            <div className="glass-card p-8 rounded-[2rem] flex flex-col items-center text-center">
              <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-primary to-secondary p-1 mb-6">
                <div className="w-full h-full rounded-[2.2rem] bg-dark-200 flex items-center justify-center text-4xl font-black">
                  {formData.name.charAt(0)}
                </div>
              </div>
              <h2 className="text-xl font-bold mb-1">{formData.name}</h2>
              <p className="text-slate-500 text-sm mb-6 capitalize">{user.role}</p>
              
              <div className="w-full space-y-4 pt-6 border-t border-white/5">
                <div className="flex items-center gap-3 text-slate-400 text-sm">
                  <Mail size={16} /> {user.email}
                </div>
                <div className="flex items-center gap-3 text-slate-400 text-sm">
                  <MapPin size={16} /> {formData.location || 'Not specified'}
                </div>
              </div>
            </div>

            <div className="glass-card p-8 rounded-[2rem]">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">Wallet</h3>
              <div className="flex items-center gap-3 text-slate-300 bg-white/5 p-4 rounded-xl border border-white/10 break-all text-xs font-mono">
                <Wallet size={16} className="shrink-0 text-secondary" />
                {formData.walletAddress || 'No wallet connected'}
              </div>
            </div>
          </div>

          {/* Main Info */}
          <div className="md:col-span-2 space-y-8">
            <div className="glass-card p-8 rounded-[2rem] space-y-6">
              <div className="space-y-4">
                <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">Full Name</label>
                <input 
                  type="text" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">Bio</label>
                <textarea 
                  rows={4}
                  placeholder="Tell the community about yourself..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-all resize-none"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                />
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">Location</label>
                <input 
                  type="text" 
                  placeholder="City, Country"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-all"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">Wallet Address</label>
                <input 
                  type="text" 
                  placeholder="0x..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white font-mono text-sm focus:outline-none focus:border-primary/50 transition-all"
                  value={formData.walletAddress}
                  onChange={(e) => setFormData({ ...formData, walletAddress: e.target.value })}
                />
              </div>
            </div>

            <div className="glass-card p-8 rounded-[2rem]">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">Skills & Expertise</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {formData.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-xs font-bold rounded-full flex items-center gap-2">
                    {skill}
                    <button onClick={() => removeSkill(skill)} className="hover:text-white">×</button>
                  </span>
                ))}
              </div>
              <div className="relative">
                <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="text" 
                  placeholder="Add a skill (Press Enter)"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-primary/50 transition-all"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={addSkill}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
