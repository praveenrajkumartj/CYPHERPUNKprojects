"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, CheckCircle2 } from 'lucide-react';

interface Props {
  eventId: string;
  initialIsRSVPed: boolean;
  isAuthenticated: boolean;
}

export default function RSVPButton({ eventId, initialIsRSVPed, isAuthenticated }: Props) {
  const router = useRouter();
  const [isRSVPed, setIsRSVPed] = useState(initialIsRSVPed);
  const [isLoading, setIsLoading] = useState(false);

  const handleRSVP = async () => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`/api/events/${eventId}/rsvp`, {
        method: isRSVPed ? 'DELETE' : 'POST',
      });

      if (res.ok) {
        setIsRSVPed(!isRSVPed);
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
      onClick={handleRSVP}
      disabled={isLoading}
      className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
        isRSVPed 
          ? 'bg-secondary/10 text-secondary border border-secondary/20 hover:bg-secondary/20' 
          : 'bg-primary text-white shadow-xl shadow-primary/20 hover:bg-opacity-90'
      }`}
    >
      {isLoading ? (
        <Loader2 className="animate-spin" size={20} />
      ) : isRSVPed ? (
        <>
          <CheckCircle2 size={20} />
          RSVP'd
        </>
      ) : (
        'RSVP to Event'
      )}
    </button>
  );
}
