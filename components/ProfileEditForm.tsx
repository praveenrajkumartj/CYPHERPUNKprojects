'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { User, Mail, Link as LinkIcon, Code, MessageCircle, Link2, MapPin, Sparkles, X, Plus, Save, AlertCircle } from 'lucide-react';
import { updateProfile } from '@/app/actions/networking';

interface ProfileEditFormProps {
  initialData: any;
}

export default function ProfileEditForm({ initialData }: ProfileEditFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    username: initialData.username || '',
    name: initialData.profile?.name || '',
    bio: initialData.profile?.bio || '',
    location: initialData.profile?.location || '',
    walletAddress: initialData.profile?.walletAddress || '',
    githubUrl: initialData.profile?.githubUrl || '',
    twitterUrl: initialData.profile?.twitterUrl || '',
    linkedinUrl: initialData.profile?.linkedinUrl || '',
    lookingForTeam: initialData.profile?.lookingForTeam || false,
    hiring: initialData.profile?.hiring || false,
  });

  const [skills, setSkills] = useState<string[]>(
    initialData.skills?.map((s: any) => s.skill.name) || []
  );
  const [newSkill, setNewSkill] = useState('');

  const addSkill = () => {
    if (newSkill && !skills.includes(newSkill.toLowerCase())) {
      setSkills([...skills, newSkill.toLowerCase()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await updateProfile({ ...formData, skills });
    
    if (res.success) {
      router.push(`/user/${formData.username}`);
      router.refresh();
    } else {
      setError(res.message || 'Update failed');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }}
          className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center gap-3 text-sm"
        >
          <AlertCircle size={18} />
          {error}
        </motion.div>
      )}

      {/* Basic Info Card */}
      <div className="rounded-3xl border border-white/10 bg-[#0c1222]/50 p-8 space-y-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <User className="text-cyan-400" size={20} /> Identity
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Username</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-mono text-sm">@</span>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full bg-[#050510] border border-white/10 rounded-xl py-3 pl-8 pr-4 text-white focus:border-cyan-500/50 focus:outline-none transition-all font-mono"
                placeholder="cypherpunk_zero"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Display Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-[#050510] border border-white/10 rounded-xl py-3 px-4 text-white focus:border-cyan-500/50 focus:outline-none transition-all"
              placeholder="John Doe"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Bio</label>
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            className="w-full bg-[#050510] border border-white/10 rounded-xl py-3 px-4 text-white focus:border-cyan-500/50 focus:outline-none transition-all h-32 resize-none"
            placeholder="Tell the protocol about yourself..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Location</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full bg-[#050510] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-cyan-500/50 focus:outline-none transition-all"
                placeholder="Neo-Tokyo / Remote"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Wallet Address</label>
            <input
              type="text"
              value={formData.walletAddress}
              onChange={(e) => setFormData({ ...formData, walletAddress: e.target.value })}
              className="w-full bg-[#050510] border border-white/10 rounded-xl py-3 px-4 text-white focus:border-cyan-500/50 focus:outline-none transition-all font-mono text-sm"
              placeholder="0x..."
            />
          </div>
        </div>
      </div>

      {/* Socials Card */}
      <div className="rounded-3xl border border-white/10 bg-[#0c1222]/50 p-8 space-y-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <LinkIcon className="text-indigo-400" size={20} /> Socials
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="relative">
              <Code className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input
                type="url"
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                className="w-full bg-[#050510] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-cyan-500/50 focus:outline-none transition-all text-xs"
                placeholder="GitHub URL"
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="relative">
              <MessageCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input
                type="url"
                value={formData.twitterUrl}
                onChange={(e) => setFormData({ ...formData, twitterUrl: e.target.value })}
                className="w-full bg-[#050510] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-cyan-500/50 focus:outline-none transition-all text-xs"
                placeholder="Twitter URL"
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="relative">
              <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input
                type="url"
                value={formData.linkedinUrl}
                onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                className="w-full bg-[#050510] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-cyan-500/50 focus:outline-none transition-all text-xs"
                placeholder="LinkedIn URL"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Skills and Status Card */}
      <div className="rounded-3xl border border-white/10 bg-[#0c1222]/50 p-8 space-y-8">
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="text-yellow-400" size={20} /> Arsenal & Status
          </h3>
          
          <div className="space-y-4">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Skills</label>
            <div className="flex flex-wrap gap-2 mb-4">
              {skills.map((skill) => (
                <span key={skill} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                  {skill}
                  <button type="button" onClick={() => removeSkill(skill)} className="hover:text-white transition-colors">
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                className="flex-1 bg-[#050510] border border-white/10 rounded-xl py-3 px-4 text-white focus:border-cyan-500/50 focus:outline-none transition-all text-sm"
                placeholder="Add a skill (e.g. Solidity, Next.js)"
              />
              <button
                type="button"
                onClick={addSkill}
                className="p-3 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-all"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/5">
          <button
            type="button"
            onClick={() => setFormData({ ...formData, lookingForTeam: !formData.lookingForTeam })}
            className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
              formData.lookingForTeam ? 'bg-pink-500/10 border-pink-500/30 text-pink-400' : 'bg-white/5 border-white/10 text-slate-500'
            }`}
          >
            <div className="flex items-center gap-3">
              <Plus size={18} />
              <span className="text-sm font-bold uppercase tracking-wider">Looking for Team</span>
            </div>
            <div className={`w-10 h-5 rounded-full relative transition-colors ${formData.lookingForTeam ? 'bg-pink-500' : 'bg-slate-700'}`}>
              <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${formData.lookingForTeam ? 'left-6' : 'left-1'}`} />
            </div>
          </button>

          <button
            type="button"
            onClick={() => setFormData({ ...formData, hiring: !formData.hiring })}
            className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
              formData.hiring ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-white/5 border-white/10 text-slate-500'
            }`}
          >
            <div className="flex items-center gap-3">
              <AlertCircle size={18} />
              <span className="text-sm font-bold uppercase tracking-wider">Hiring Engineers</span>
            </div>
            <div className={`w-10 h-5 rounded-full relative transition-colors ${formData.hiring ? 'bg-emerald-500' : 'bg-slate-700'}`}>
              <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${formData.hiring ? 'left-6' : 'left-1'}`} />
            </div>
          </button>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-8 py-4 bg-cyan-500 text-[#050510] rounded-2xl font-black uppercase tracking-[0.2em] shadow-lg shadow-cyan-500/20 hover:bg-cyan-400 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
        >
          {loading ? 'Processing...' : <><Save size={20} /> Save Identity</>}
        </button>
      </div>
    </form>
  );
}
