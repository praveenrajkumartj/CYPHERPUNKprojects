'use client';

import { useState } from 'react';
import { applyToProject } from '@/app/actions/projects';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';

interface ProjectApplyButtonProps {
  projectId: string;
  isLoggedIn: boolean;
  hasApplied: boolean;
}

export default function ProjectApplyButton({ projectId, isLoggedIn, hasApplied: initialHasApplied }: ProjectApplyButtonProps) {
  const [loading, setLoading] = useState(false);
  const [hasApplied, setHasApplied] = useState(initialHasApplied);

  const handleApply = async () => {
    if (!isLoggedIn) {
      window.location.href = '/register';
      return;
    }

    setLoading(true);
    try {
      const res = await applyToProject(projectId);
      if (res.success) {
        setHasApplied(true);
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
    <button
      onClick={handleApply}
      disabled={loading || hasApplied}
      className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 ${
        hasApplied 
        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
        : 'bg-cyan-400 text-[#050510] hover:bg-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.2)]'
      }`}
    >
      {loading ? (
        <Loader2 size={18} className="animate-spin" />
      ) : hasApplied ? (
        <>
          <CheckCircle2 size={18} />
          Application Sent
        </>
      ) : (
        <>
          <Send size={18} />
          Request to Join Team
        </>
      )}
    </button>
  );
}
