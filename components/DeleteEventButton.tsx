'use client';

import { useState } from 'react';
import { deleteEvent } from '@/app/actions';
import { Trash2, Loader2, X, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DeleteEventButton({ eventId }: { eventId: string }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteEvent(eventId);
    } catch (err) {
      console.error(err);
      alert('Deletion failed');
    } finally {
      setLoading(false);
      setShowConfirm(false);
    }
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setShowConfirm(true)}
        className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-red-500 hover:border-red-500 transition-all"
        title="Delete Event"
      >
        <Trash2 size={20} />
      </button>

      <AnimatePresence>
        {showConfirm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-md p-10 rounded-[3rem] bg-[#0c1222] border border-red-500/30 shadow-[0_0_50px_rgba(239,68,68,0.1)] space-y-8"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                 <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500 border border-red-500/20">
                    <AlertTriangle size={32} />
                 </div>
                 <h3 className="text-2xl font-bold">Terminate Event?</h3>
                 <p className="text-slate-400">This action will permanently delete the event sequence and all associated attendee data from the grid. This cannot be undone.</p>
              </div>

              <div className="flex gap-4">
                 <button 
                   onClick={() => setShowConfirm(false)}
                   className="flex-1 py-4 rounded-2xl border border-white/10 text-slate-400 font-bold hover:bg-white/5 transition-all"
                 >
                   Cancel
                 </button>
                 <button 
                   onClick={handleDelete}
                   disabled={loading}
                   className="flex-1 py-4 rounded-2xl bg-red-500 text-white font-bold hover:bg-red-400 transition-all flex items-center justify-center gap-2"
                 >
                   {loading ? <Loader2 size={18} className="animate-spin" /> : 'Confirm Delete'}
                 </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
