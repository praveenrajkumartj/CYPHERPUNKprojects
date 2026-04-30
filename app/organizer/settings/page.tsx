import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { Settings, Shield, Bell, CreditCard, Lock, Globe, User, Save } from 'lucide-react';

export default async function OrganizerSettingsPage() {
  const session = await getSession();
  if (!session) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.id as string }
  });

  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-4xl font-bold tracking-tight mb-2">Protocol <span className="text-pink-500">Configuration</span></h1>
        <p className="text-slate-500 font-mono text-sm uppercase tracking-widest">Adjust node parameters // Identity management</p>
      </header>

      <div className="grid lg:grid-cols-[1fr_300px] gap-12">
        <div className="space-y-8">
           <section className="p-10 rounded-[3rem] bg-[#0c1222]/50 border border-white/5 space-y-8">
              <h3 className="text-xl font-bold flex items-center gap-3"><User size={20} className="text-cyan-400" /> Identity Settings</h3>
              <div className="grid md:grid-cols-2 gap-8">
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2">Public Name</label>
                    <input type="text" defaultValue={user?.name} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-cyan-500/50 transition-all" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2">Contact Email</label>
                    <input type="email" defaultValue={user?.email} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-slate-500 focus:outline-none cursor-not-allowed" disabled />
                 </div>
                 <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2">Bio / Mission Statement</label>
                    <textarea rows={4} defaultValue={user?.bio || ''} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-cyan-500/50 transition-all resize-none" />
                 </div>
              </div>
           </section>

           <section className="p-10 rounded-[3rem] bg-[#0c1222]/50 border border-white/5 space-y-8">
              <h3 className="text-xl font-bold flex items-center gap-3"><Shield size={20} className="text-pink-500" /> Security Protocol</h3>
              <div className="space-y-6">
                 <div className="flex items-center justify-between p-6 rounded-3xl bg-black/20 border border-white/5">
                    <div className="flex items-center gap-4">
                       <Lock size={20} className="text-slate-500" />
                       <div>
                          <p className="font-bold text-white">Two-Factor Authentication</p>
                          <p className="text-xs text-slate-500">Secure your account with biological or mobile verification.</p>
                       </div>
                    </div>
                    <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-all">Enable</button>
                 </div>
                 
                 <div className="flex items-center justify-between p-6 rounded-3xl bg-black/20 border border-white/5">
                    <div className="flex items-center gap-4">
                       <Globe size={20} className="text-slate-500" />
                       <div>
                          <p className="font-bold text-white">Public Profile Visibility</p>
                          <p className="text-xs text-slate-500">Toggle whether your organizer profile is visible on the network.</p>
                       </div>
                    </div>
                    <div className="w-12 h-6 rounded-full bg-cyan-400/20 border border-cyan-400/50 relative p-1 cursor-pointer">
                       <div className="w-4 h-4 rounded-full bg-cyan-400 ml-auto shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                    </div>
                 </div>
              </div>
           </section>
        </div>

        <aside className="space-y-8">
           <div className="sticky top-32 space-y-8">
              <section className="p-8 rounded-[2.5rem] bg-[#0c1222] border border-white/10 space-y-6 shadow-2xl">
                 <h3 className="text-lg font-bold">Actions</h3>
                 <button className="w-full py-4 rounded-2xl bg-cyan-400 text-[#050510] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all active:scale-95 shadow-lg shadow-cyan-400/20">
                    <Save size={18} /> Save Changes
                 </button>
                 <p className="text-[10px] text-slate-500 text-center uppercase tracking-widest">Protocol version 1.0.4-stable</p>
              </section>

              <nav className="space-y-2">
                 {[
                    { label: 'General', icon: Settings, active: true },
                    { label: 'Notifications', icon: Bell, active: false },
                    { label: 'Billing & Tiers', icon: CreditCard, active: false },
                 ].map((link, i) => (
                   <button key={i} className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest border transition-all ${link.active ? 'bg-white/5 border-white/10 text-white' : 'border-transparent text-slate-500 hover:text-slate-300'}`}>
                      <link.icon size={18} />
                      {link.label}
                   </button>
                 ))}
              </nav>
           </div>
        </aside>
      </div>
    </div>
  );
}
