import { getProjectById, applyToProject } from '@/app/actions/projects';
import { getSession } from '@/lib/auth';
import { notFound } from 'next/navigation';
import { 
  Users, Target, Code, Calendar, ArrowLeft, 
  CheckCircle2, Rocket, Briefcase, Zap, Plus,
  ShieldCheck, ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import MotionDiv from '@/components/MotionDiv';
import SkillBadge from '@/components/SkillBadge';
import BountyCard from '@/components/BountyCard';
import BountyForm from '@/components/BountyForm';
import ProjectApplyButton from '@/components/ProjectApplyButton';
import ProjectApplicationManager from '@/components/ProjectApplicationManager';

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProjectById(id);
  const session = await getSession();

  if (!project) notFound();

  const isOwner = session?.id === project.createdBy;
  const hasApplied = project.applications.some(a => a.userId === session?.id);

  return (
    <main className="min-h-screen bg-[#050510] text-white pt-32 pb-24 px-6 relative">
       {/* Background Elements */}
       <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-[120px]" />
       </div>

       <div className="container mx-auto max-w-7xl relative z-10">
          <Link 
            href="/projects" 
            className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-12 group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Marketplace
          </Link>

          <div className="grid lg:grid-cols-[1fr_380px] gap-16">
             {/* Left Column: Content */}
             <div className="space-y-16">
                <section className="space-y-8">
                   <div className="flex flex-wrap items-center gap-4">
                      <span className="px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-widest">
                         {project.status}
                      </span>
                      <div className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                         <Calendar size={14} /> Deployed {new Date(project.createdAt).toLocaleDateString()}
                      </div>
                   </div>

                   <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.9]">
                      {project.title}
                   </h1>

                   <div className="flex flex-wrap gap-3">
                      {project.skills.map((ps: any) => (
                        <SkillBadge 
                          key={ps.skill.id} 
                          name={ps.skill.name} 
                          className="bg-white/5 border-white/10 text-slate-300 px-4 py-2" 
                        />
                      ))}
                   </div>
                </section>

                <section className="space-y-6">
                   <h3 className="text-xl font-bold flex items-center gap-3">
                      <Rocket className="text-cyan-400" /> Executive Summary
                   </h3>
                   <div className="p-8 md:p-10 rounded-[3rem] bg-[#0c1222]/50 border border-white/5 backdrop-blur-xl leading-relaxed text-slate-300 text-lg">
                      {project.description}
                   </div>
                </section>

                <section className="space-y-8">
                   <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold flex items-center gap-3">
                         <Target className="text-pink-400" /> Active Bounties
                      </h3>
                      {isOwner && <BountyForm projectId={project.id} />}
                   </div>

                   <div className="space-y-4">
                      {project.bounties.length > 0 ? (
                        project.bounties.map((bounty: any) => (
                          <BountyCard key={bounty.id} bounty={bounty} isOwner={isOwner} />
                        ))
                      ) : (
                        <div className="p-12 rounded-[2.5rem] border border-dashed border-white/5 text-center space-y-4">
                           <Briefcase size={32} className="text-slate-700 mx-auto" />
                           <p className="text-slate-500">No active bounties for this project.</p>
                        </div>
                      )}
                   </div>
                </section>
             </div>

             {/* Right Column: Sidebar */}
             <aside className="space-y-8">
                <div className="sticky top-32 space-y-8">
                   {/* Application Card */}
                   <section className="p-8 rounded-[2.5rem] bg-[#0c1222] border border-white/10 space-y-8 shadow-2xl">
                      <div className="space-y-2 text-center">
                         <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Project Status</p>
                         <h4 className="text-2xl font-black text-white">{project.status === 'idea' ? 'Recruiting' : 'In Development'}</h4>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                         <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                            <Users size={20} className="text-cyan-400 mx-auto mb-2" />
                            <p className="text-[10px] font-bold text-slate-500 uppercase">Team Size</p>
                            <p className="font-bold text-white">{project.teamSize}</p>
                         </div>
                         <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                            <ShieldCheck size={20} className="text-pink-400 mx-auto mb-2" />
                            <p className="text-[10px] font-bold text-slate-500 uppercase">Apps</p>
                            <p className="font-bold text-white">{project.applications.length}</p>
                         </div>
                      </div>

                      {!isOwner && (
                        <ProjectApplyButton 
                          projectId={project.id} 
                          isLoggedIn={!!session} 
                          hasApplied={hasApplied} 
                        />
                      )}

                      {isOwner && (
                        <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-widest text-center">
                          You own this project
                        </div>
                      )}
                   </section>

                   {/* Creator Card */}
                   <section className="p-8 rounded-[2.5rem] bg-[#0c1222]/50 border border-white/5 space-y-6">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4">Project Lead</p>
                      <div className="flex items-center gap-4">
                         <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                            {project.creator.profile?.name?.[0] || project.creator.username[0].toUpperCase()}
                         </div>
                         <div>
                            <p className="font-bold text-white">{project.creator.profile?.name || project.creator.username}</p>
                            <p className="text-xs text-slate-500">@{project.creator.username}</p>
                         </div>
                      </div>
                      <Link 
                        href={`/user/${project.creator.username}`}
                        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-bold hover:bg-white/10 transition-all"
                      >
                         View Portfolio <ExternalLink size={14} />
                      </Link>
                   </section>

                   {/* Applicants List (Owner Only) */}
                   {isOwner && project.applications.length > 0 && (
                     <section className="p-8 rounded-[2.5rem] bg-[#0c1222]/50 border border-white/5 space-y-6">
                        <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500">Applications</h4>
                        <div className="space-y-4">
                           {project.applications.map((app: any) => (
                             <div key={app.id} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                   <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[10px] font-bold">
                                      {app.user.username[0].toUpperCase()}
                                   </div>
                                   <span className="text-xs font-medium truncate max-w-[100px]">{app.user.username}</span>
                                </div>
                                <ProjectApplicationManager application={app} />
                             </div>
                           ))}
                        </div>
                     </section>
                   )}
                </div>
             </aside>
          </div>
       </div>
    </main>
  );
}
