"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Send, CheckCircle2 } from 'lucide-react';

interface Props {
  projectId: string;
  initialHasApplied: boolean;
  isAuthenticated: boolean;
}

export default function ApplyButton({ projectId, initialHasApplied, isAuthenticated }: Props) {
  const router = useRouter();
  const [hasApplied, setHasApplied] = useState(initialHasApplied);
  const [isLoading, setIsLoading] = useState(false);

  const handleApply = async () => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`/api/projects/${projectId}/apply`, {
        method: 'POST',
      });

      if (res.ok) {
        setHasApplied(true);
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleApply}
      disabled={isLoading || hasApplied}
      className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
        hasApplied 
          ? 'bg-green-500/10 text-green-500 border border-green-500/20' 
          : 'bg-primary text-white shadow-xl shadow-primary/20 hover:bg-opacity-90'
      }`}
    >
      {isLoading ? (
        <Loader2 className="animate-spin" size={20} />
      ) : hasApplied ? (
        <>
          <CheckCircle2 size={20} />
          Application Sent
        </>
      ) : (
        <>
          <Send size={20} />
          Send Application
        </>
      )}
    </button>
  );
}
