'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProject } from '@/app/actions/projects';
import { motion } from 'framer-motion';
import { Rocket, Target, Users, Code, AlignLeft, Plus, X, Loader2, Send } from 'lucide-react';

export default function ProjectForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    teamSize: 1,
    status: 'idea',
  });
  const [skillInput, setSkillInput] = useState('');
  const [skills, setSkills] = useState<string[]>([]);

  const addSkill = () => {
    if (skillInput && !skills.includes(skillInput.toLowerCase())) {
      setSkills([...skills, skillInput.toLowerCase()]);
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await createProject({ ...formData, skills });
      if (res.success) {
        router.push(`/projects/${res.projectId}`);
      } else {
        alert(res.message);
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-12 pb-20">
      <header className="text-center space-y-4">
        <div className="w-20 h-20 rounded-3xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center mx-auto mb-6">
          <Rocket className="text-cyan-400" size={32} />
        </div>
        <h1 className="text-5xl font-black tracking-tight">Deploy New <span className="text-cyan-400">Project</span></h1>
        <p className="text-slate-500 text-lg">Broadcast your vision to the Cypherpunk network.</p>
      </header>

      <div className="grid md:grid-cols-[1fr_350px] gap-12">
        <div className="space-y-12">
           {/* Core Details */}
           <section className="p-10 rounded-[3rem] bg-[#0c1222]/50 border border-white/5 space-y-8 backdrop-blur-xl">
              <h3 className="text-xl font-bold flex items-center gap-3">
                <AlignLeft className="text-cyan-400" /> Project Core
              </h3>
              
              <div className="space-y-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2">Project Title</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Nexus DEX Protocol"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-white text-xl focus:outline-none focus:border-cyan-500/50 transition-all"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2">Description</label>
                  <textarea 
                    rows={6}
                    required
                    placeholder="Describe the problem you're solving and your technical approach..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-white focus:outline-none focus:border-cyan-500/50 transition-all resize-none leading-relaxed"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
              </div>
           </section>

           {/* Skills Section */}
           <section className="p-10 rounded-[3rem] bg-[#0c1222]/50 border border-white/5 space-y-8 backdrop-blur-xl">
              <h3 className="text-xl font-bold flex items-center gap-3">
                <Code className="text-pink-400" /> Required Stacks
              </h3>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <input 
                    type="text" 
                    placeholder="e.g. Solidity, Rust, React..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-pink-500/50"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                  />
                  <button 
                    type="button"
                    onClick={addSkill}
                    className="px-6 rounded-2xl bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10"
                  >
                    <Plus size={20} />
                  </button>
                </div>

                <div className="flex flex-wrap gap-3">
                  {skills.map(skill => (
                    <span 
                      key={skill}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-bold uppercase tracking-widest"
                    >
                      {skill}
                      <button type="button" onClick={() => removeSkill(skill)}><X size={14} /></button>
                    </span>
                  ))}
                  {skills.length === 0 && (
                    <p className="text-slate-600 text-xs italic p-4 border border-dashed border-white/5 rounded-2xl w-full text-center">No skills added yet.</p>
                  )}
                </div>
              </div>
           </section>
        </div>

        <aside className="space-y-8">
           <div className="sticky top-32 space-y-8">
              {/* Settings Sidebar */}
              <section className="p-8 rounded-[2.5rem] bg-[#0c1222] border border-white/10 space-y-8 shadow-2xl">
                 <h3 className="text-lg font-bold">Parameters</h3>
                 
                 <div className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Development Stage</label>
                       <select 
                         className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-cyan-500/50"
                         value={formData.status}
                         onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                       >
                         <option value="idea">Idea / Whitepaper</option>
                         <option value="building">Building / MVP</option>
                         <option value="launched">Launched / Mainnet</option>
                       </select>
                    </div>

                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Target Team Size</label>
                       <input 
                         type="number"
                         min={1}
                         className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-cyan-500/50"
                         value={formData.teamSize}
                         onChange={(e) => setFormData({ ...formData, teamSize: parseInt(e.target.value) })}
                       />
                    </div>
                 </div>

                 <button 
                   type="submit"
                   disabled={loading}
                   className="w-full py-5 rounded-2xl bg-cyan-400 text-[#050510] font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all active:scale-95 disabled:opacity-50 shadow-[0_0_40px_rgba(34,211,238,0.2)]"
                 >
                   {loading ? <Loader2 size={18} className="animate-spin" /> : <><Send size={18} /> Deploy Project</>}
                 </button>
              </section>

              <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-indigo-500/10 to-transparent border border-indigo-500/20 text-center space-y-4">
                 <Users size={24} className="text-indigo-400 mx-auto" />
                 <p className="text-xs text-slate-400 leading-relaxed">
                   Your project will be visible to the entire community immediately after deployment.
                 </p>
              </div>
           </div>
        </aside>
      </div>
    </form>
  );
}
