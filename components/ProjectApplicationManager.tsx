'use client';

import { useState } from 'react';
import { updateProjectApplicationStatus } from '@/app/actions/projects';
import { Check, X, Loader2 } from 'lucide-react';

export default function ProjectApplicationManager({ application }: { application: any }) {
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (status: 'ACCEPTED' | 'REJECTED') => {
    setLoading(true);
    try {
      const res = await updateProjectApplicationStatus(application.id, status);
      if (!res.success) alert(res.message);
    } catch (error) {
      alert('Action failed');
    } finally {
      setLoading(false);
    }
  };

  if (application.status !== 'PENDING') {
    return (
      <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${
        application.status === 'ACCEPTED' ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'
      }`}>
        {application.status}
      </span>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleUpdate('ACCEPTED')}
        disabled={loading}
        className="p-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-green-500/20 transition-all"
        title="Approve"
      >
        {loading ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
      </button>
      <button
        onClick={() => handleUpdate('REJECTED')}
        disabled={loading}
        className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all"
        title="Reject"
      >
        {loading ? <Loader2 size={12} className="animate-spin" /> : <X size={12} />}
      </button>
    </div>
  );
}
