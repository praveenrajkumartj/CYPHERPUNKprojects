'use client';

import { motion } from 'framer-motion';
import { Clock, Zap, CheckCircle2, User, AlertCircle, Coins, ChevronDown, Check, Loader2 } from 'lucide-react';
import { formatDistanceToNow, isBefore, addDays } from 'date-fns';
import { useState } from 'react';
import { applyToBounty, assignBounty, markBountyComplete } from '@/app/actions/projects';

interface BountyCardProps {
  bounty: any;
  isOwner?: boolean;
}

export default function BountyCard({ bounty, isOwner }: BountyCardProps) {
  const [loading, setLoading] = useState(false);
  const [applied, setApplied] = useState(false);

  const deadline = new Date(bounty.deadline);
  const isUrgent = isBefore(deadline, addDays(new Date(), 3));
  const isExpired = isBefore(deadline, new Date());

  const handleApply = async () => {
    setLoading(true);
    try {
      const res = await applyToBounty(bounty.id);
      if (res.success) setApplied(true);
      else alert(res.message);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = async (userId: string) => {
    setLoading(true);
    try {
      const res = await assignBounty(bounty.id, userId);
      if (!res.success) alert(res.message);
    } catch (err) {
      alert('Assignment failed');
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async () => {
    setLoading(true);
    try {
      const res = await markBountyComplete(bounty.id);
      if (!res.success) alert(res.message);
    } catch (err) {
      alert('Update failed');
    } finally {
      setLoading(false);
    }
  };

  const statusColors: Record<string, string> = {
    open: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    in_progress: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
    completed: 'text-indigo-400 bg-indigo-400/10 border-indigo-400/20',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="p-6 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all group"
    >
      <div className="flex flex-col md:flex-row justify-between gap-6">
        <div className="space-y-4 flex-1">
          <div className="flex flex-wrap items-center gap-3">
             <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${statusColors[bounty.status]}`}>
               {bounty.status.replace('_', ' ')}
             </span>
             {isUrgent && bounty.status === 'open' && (
               <span className="px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest bg-red-500/10 text-red-400 border border-red-500/20 flex items-center gap-1.5">
                 <AlertCircle size={12} /> Urgent
               </span>
             )}
          </div>
          
          <div>
            <h4 className="text-xl font-bold text-white mb-2">{bounty.title}</h4>
            <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">
              {bounty.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-bold text-slate-500 uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <Clock size={16} className={isUrgent ? 'text-red-400' : 'text-cyan-400'} />
              {isExpired ? 'Expired' : `Due in ${formatDistanceToNow(deadline)}`}
            </div>
            {bounty.assignee && (
              <div className="flex items-center gap-2">
                <User size={16} className="text-indigo-400" />
                Assignee: <span className="text-white">{bounty.assignee.profile?.name || bounty.assignee.username}</span>
              </div>
            )}
          </div>
        </div>

        <div className="md:w-64 flex flex-col justify-between items-end gap-4">
          <div className="text-right">
             <div className="flex items-center justify-end gap-2 mb-1">
                <Coins size={18} className="text-[#ffd700]" />
                <span className="text-2xl font-black text-white">{bounty.rewardAmount}</span>
             </div>
             <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{bounty.rewardType === 'crypto' ? 'ETH / CRYPTO' : 'USD / FIAT'}</p>
          </div>

          {!isOwner && bounty.status === 'open' && (
            <button
              onClick={handleApply}
              disabled={loading || applied}
              className={`w-full py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                applied 
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 cursor-default' 
                : 'bg-cyan-400 text-[#050510] hover:scale-105 active:scale-95'
              }`}
            >
              {loading ? 'Processing...' : applied ? 'Applied' : 'Apply for Bounty'}
            </button>
          )}

          {isOwner && bounty.status === 'open' && bounty.applications?.length > 0 && (
            <div className="w-full space-y-2">
               <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest text-center">Assign to Applicant</p>
               <div className="flex flex-col gap-2">
                  {bounty.applications.map((app: any) => (
                    <button
                      key={app.id}
                      onClick={() => handleAssign(app.userId)}
                      disabled={loading}
                      className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all text-[10px] font-bold"
                    >
                       <span className="truncate max-w-[120px]">{app.user.username}</span>
                       <Check size={12} className="text-cyan-400" />
                    </button>
                  ))}
               </div>
            </div>
          )}

          {isOwner && bounty.status === 'in_progress' && (
            <button
              onClick={handleComplete}
              disabled={loading}
              className="w-full py-3 rounded-xl bg-indigo-500 text-white text-[10px] font-black uppercase tracking-widest hover:bg-indigo-400 transition-all flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 size={12} className="animate-spin" /> : <CheckCircle2 size={12} />}
              Mark Completed
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
