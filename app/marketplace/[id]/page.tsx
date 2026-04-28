import { Metadata } from 'next';
import prisma from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import { Briefcase, User, Calendar, ArrowLeft, Send } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import ApplyButton from '@/components/ApplyButton';
import { getSession } from '@/lib/auth';

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await prisma.project.findUnique({
    where: { id: params.id },
  });
  return {
    title: `${project?.title || 'Project'} | Cyberphunk`,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const project = await prisma.project.findUnique({
    where: { id: params.id },
    include: {
      creator: {
        select: { name: true, bio: true }
      },
      _count: {
        select: { applications: true }
      }
    }
  });

  if (!project) return <div>Not found</div>;

  const session = await getSession();
  const hasApplied = session ? await prisma.projectApplication.findUnique({
    where: {
      projectId_userId: {
        projectId: project.id,
        userId: session.id as string
      }
    }
  }) : false;

  return (
    <main className="min-h-screen bg-dark-300">
      <Navbar />

      <div className="pt-32 pb-20 container mx-auto px-6 max-w-5xl">
        <Link href="/marketplace" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-8 group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Marketplace
        </Link>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  project.status === 'OPEN' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500'
                }`}>
                  {project.status}
                </span>
                <span className="text-slate-500 text-xs font-medium flex items-center gap-2">
                  <Calendar size={14} /> Posted on {format(new Date(project.createdAt), 'MMM dd, yyyy')}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">{project.title}</h1>
              
              <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold mb-4">Description</h2>
                <div className="text-slate-400 leading-relaxed text-lg whitespace-pre-wrap">
                  {project.description}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="glass-card p-8 rounded-[2rem]">
              <h3 className="text-lg font-bold mb-6">Apply to Project</h3>
              <p className="text-sm text-slate-400 mb-8">
                Interested in building this? Send your application to the creator.
              </p>
              
              <ApplyButton 
                projectId={project.id} 
                initialHasApplied={!!hasApplied} 
                isAuthenticated={!!session} 
              />
            </div>

            <div className="glass-card p-8 rounded-[2rem]">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">Project Creator</h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-white font-bold">
                  {project.creator.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold">{project.creator.name}</p>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Founder</p>
                </div>
              </div>
              <p className="text-sm text-slate-400 line-clamp-3">
                {project.creator.bio || 'Verified Cyberphunk builder and innovator.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
