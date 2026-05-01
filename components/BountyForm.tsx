'use client';

import { useState } from 'react';
import { createBounty } from '@/app/actions/projects';
import { motion, AnimatePresence } from 'framer-motion';
import { Coins, Clock, Plus, Loader2, X, Send } from 'lucide-react';

interface BountyFormProps {
  projectId: string;
}

export default function BountyForm({ projectId }: BountyFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    rewardAmount: '0.1',
    rewardType: 'crypto',
    deadline: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await createBounty({
        ...formData,
        projectId,
        rewardAmount: Number(formData.rewardAmount) || 0,
      });
      if (res.success) {
        setIsOpen(false);
        setFormData({ title: '', description: '', rewardAmount: '0.1', rewardType: 'crypto', deadline: '' });
      } else {
        alert(res.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-3 px-6 py-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-bold text-xs uppercase tracking-widest hover:bg-cyan-500/20 transition-all"
        >
          <Plus size={16} /> New Bounty
        </button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-[2rem] bg-[#0c1222] border border-white/10 space-y-6 shadow-2xl relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-bold flex items-center gap-3">
              <Coins className="text-[#ffd700]" /> Issue New Bounty
            </h4>
            <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white"><X size={20} /></button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Task Title</label>
              <input 
                type="text" 
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-cyan-500/50"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Task Description</label>
              <textarea 
                rows={3}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-cyan-500/50 resize-none"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Reward Type</label>
                <select 
                  className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-cyan-500/50 appearance-none"
                  value={formData.rewardType}
                  onChange={(e) => setFormData({ ...formData, rewardType: e.target.value })}
                >
                  <option value="crypto">Crypto (ETH/SOL)</option>
                  <option value="fiat">Fiat (USD/EUR)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Reward Amount</label>
                <input 
                  type="number" 
                  step="0.001"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-cyan-500/50"
                  value={formData.rewardAmount}
                  onChange={(e) => setFormData({ ...formData, rewardAmount: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Deadline</label>
                <input 
                  type="date" 
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-cyan-500/50"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-cyan-400 text-[#050510] font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all disabled:opacity-50"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <><Send size={16} /> Deploy Bounty</>}
            </button>
          </form>
        </motion.div>
      )}
    </div>
  );
}
