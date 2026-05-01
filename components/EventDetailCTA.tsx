'use client';

import { useState } from 'react';
import { rsvpEvent, bookTicket } from '@/app/actions';
import { Loader2, CheckCircle2, Ticket, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface EventDetailCTAProps {
  eventId: string;
  isRsvped: boolean;
  isBooked: boolean;
  isPaid: boolean;
  isLoggedIn: boolean;
  capacity: number;
  currentCount: number;
}

export default function EventDetailCTA({ eventId, isRsvped, isBooked, isPaid, isLoggedIn, capacity, currentCount }: EventDetailCTAProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedTier, setSelectedTier] = useState<string | null>('Basic');

  const remaining = capacity - currentCount;
  const isSoldOut = remaining <= 0;

  const handleRSVP = async () => {
    if (!isLoggedIn) {
      window.location.href = '/register';
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await rsvpEvent(eventId);
      if (res.success) {
        setSuccess('RSVP Confirmed');
        router.refresh();
      } else {
        setError(res.message || 'Operation failed');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async (tier: string) => {
    if (!isLoggedIn) {
      window.location.href = '/register';
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await bookTicket(eventId, tier);
      if (res.success) {
        setSuccess('Ticket Booked');
        router.refresh();
      } else {
        setError(res.message || 'Operation failed');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-4 p-6 rounded-2xl bg-green-500/10 border border-green-500/30 text-green-400"
      >
        <CheckCircle2 size={24} />
        <div className="font-bold uppercase tracking-widest text-sm">{success}</div>
      </motion.div>
    );
  }

  if (isRsvped || isBooked) {
    return (
      <div className="flex items-center gap-4 p-6 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
        <CheckCircle2 size={24} />
        <div className="font-bold uppercase tracking-widest text-sm">Access Granted</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-2">
         <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Availability</span>
         <span className={`text-[10px] font-bold uppercase tracking-widest ${isSoldOut ? 'text-red-500' : 'text-cyan-400'}`}>
            {isSoldOut ? 'Sold Out' : `${remaining} Slots Left`}
         </span>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-[10px] font-bold uppercase tracking-widest text-center">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Select Access Tier</h4>
        <div className="grid grid-cols-1 gap-3">
          {['Basic', 'Premium', 'VIP'].map((tier) => (
            <button
              key={tier}
              onClick={() => setSelectedTier(tier)}
              className={`p-4 rounded-xl border text-left transition-all ${selectedTier === tier ? 'border-pink-500 bg-pink-500/10' : 'border-white/5 bg-white/5 hover:bg-white/10'}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-white uppercase tracking-widest text-sm">{tier === 'Basic' ? 'BASIC (RSVP)' : tier}</span>
                <span className="text-xs text-slate-400">{tier === 'Basic' ? 'Free' : tier === 'Premium' ? '$49.99' : '$149.99'}</span>
              </div>
            </button>
          ))}
        </div>
        
        <button
          onClick={() => {
            if (selectedTier === 'Basic' && !isPaid) {
              handleRSVP();
            } else if (selectedTier) {
              handleBooking(selectedTier);
            }
          }}
          disabled={loading || !selectedTier || isSoldOut}
          className="w-full py-5 rounded-2xl bg-[#ec4899] text-white font-black uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(236,72,153,0.3)] hover:bg-pink-400 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin w-5 h-5" /> : (
            isSoldOut ? 'SOLD OUT' : (
              isLoggedIn ? (
                <>
                  <Zap size={18} /> 
                  BOOK {selectedTier?.toUpperCase()} TICKET
                </>
              ) : 'SIGN IN TO BOOK'
            )
          )}
        </button>
        
        <p className="text-[10px] text-center text-slate-500 italic uppercase tracking-wider">
          NFT-based ticketing coming soon
        </p>
      </div>
    </div>
  );
}
