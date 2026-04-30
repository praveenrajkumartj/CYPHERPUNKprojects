import EventForm from '@/components/EventForm';
import MotionDiv from '@/components/MotionDiv';
import { Rocket } from 'lucide-react';

export default function CreateEventPage() {
  return (
    <div className="space-y-12">
      <header className="flex items-center gap-6">
        <div className="w-16 h-16 rounded-[1.5rem] bg-cyan-400/10 flex items-center justify-center border border-cyan-400/20 text-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.1)]">
           <Rocket size={32} />
        </div>
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Deploy <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">New Protocol</span></h1>
          <p className="text-slate-500 font-mono text-sm uppercase tracking-widest">Initialize event sequence // Localhost access granted</p>
        </div>
      </header>

      <EventForm />
    </div>
  );
}
