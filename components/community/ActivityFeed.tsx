'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder, User, CheckCircle, Clock, Loader2, Zap } from 'lucide-react';
import { getActivities } from '@/app/community/actions';
import { formatDistanceToNow } from 'date-fns';

type Activity = {
  id: string;
  type: string;
  message: string;
  createdAt: Date;
  user?: {
    name: string;
    id: string;
  } | null;
};

export default function ActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async (pageNum = 1) => {
    setLoading(true);
    const res = await getActivities(pageNum, 10);
    if (res.success) {
      if (res.activities!.length < 10) setHasMore(false);
      setActivities(prev => pageNum === 1 ? res.activities! : [...prev, ...res.activities!]);
      setPage(pageNum);
    }
    setLoading(false);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'PROJECT_CREATED': return <Folder className="w-4 h-4 text-cyan-400" />;
      case 'USER_JOINED': return <User className="w-4 h-4 text-pink-500" />;
      case 'TASK_POSTED': return <CheckCircle className="w-4 h-4 text-emerald-400" />;
      default: return <Zap className="w-4 h-4 text-yellow-400" />;
    }
  };

  return (
    <div className="rounded-3xl border border-white/5 bg-[#080b19] p-8">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-sm font-bold tracking-[0.3em] uppercase flex items-center gap-3">
          <Zap className="w-4 h-4 text-cyan-400" /> Live Activity Feed
        </h3>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Real-time</span>
        </div>
      </div>

      <div className="space-y-4">
        {activities.length === 0 && !loading && (
          <div className="py-12 text-center">
            <p className="text-slate-500 text-sm italic">No recent activity found. Be the first to take action!</p>
          </div>
        )}

        <AnimatePresence mode="popLayout">
          {activities.map((activity, i) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i % 10 * 0.05 }}
              className="group p-4 rounded-xl bg-white/5 border border-white/5 flex items-start gap-4 hover:bg-white/10 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                {getIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-300 leading-relaxed">
                  <span className="font-bold text-white hover:text-cyan-400 cursor-pointer transition-colors">
                    {activity.user?.name || 'Anonymous'}
                  </span>{' '}
                  {activity.message}
                </p>
                <div className="flex items-center gap-2 mt-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                  <Clock className="w-3 h-3" />
                  {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-start gap-4 animate-pulse">
                <div className="w-10 h-10 rounded-lg bg-white/10 shrink-0" />
                <div className="flex-1 space-y-2 py-1">
                  <div className="h-4 bg-white/10 rounded w-3/4" />
                  <div className="h-3 bg-white/10 rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {hasMore && !loading && (
          <button
            onClick={() => loadActivities(page + 1)}
            className="w-full py-4 text-[10px] font-bold text-slate-500 hover:text-cyan-400 uppercase tracking-[0.3em] transition-colors border border-dashed border-white/10 rounded-xl mt-4"
          >
            Load More Activities
          </button>
        )}
      </div>
    </div>
  );
}
