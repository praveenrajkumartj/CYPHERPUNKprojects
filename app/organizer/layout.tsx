import Navbar from '@/components/Navbar';
import { LayoutGrid, Calendar, Users, Plus, Settings, BarChart3 } from 'lucide-react';
import Link from 'next/link';

export default function OrganizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebarLinks = [
    { name: 'Overview', href: '/organizer', icon: LayoutGrid },
    { name: 'My Events', href: '/organizer/events', icon: Calendar },
    { name: 'Create Event', href: '/organizer/events/new', icon: Plus },
    { name: 'Global Stats', href: '/organizer/stats', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-[#050510] text-white">
      <Navbar />
      
      <div className="flex pt-20 h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 border-r border-white/5 bg-[#0c1222]/50 backdrop-blur-xl hidden md:flex flex-col">
          <div className="p-8 space-y-8 flex-1">
            <div className="space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 px-4">Management</p>
              <nav className="space-y-1">
                {sidebarLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/5 transition-all group"
                  >
                    <link.icon size={18} className="group-hover:scale-110 transition-transform" />
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 px-4">Advanced</p>
              <nav className="space-y-1">
                <Link href="/organizer/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-pink-400 hover:bg-pink-400/5 transition-all group">
                   <Settings size={18} /> Settings
                </Link>
              </nav>
            </div>
          </div>

          <div className="p-6 border-t border-white/5">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/20">
               <p className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-1">PRO ACCOUNT</p>
               <p className="text-xs text-slate-400">Unlimited events enabled</p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-transparent via-[#0c1222]/20 to-transparent">
          <div className="p-8 md:p-12 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
