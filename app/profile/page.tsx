import { getSession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import ProfileEditForm from '@/components/ProfileEditForm';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const session = await getSession();
  if (!session) redirect('/login');

  const user = await prisma.user.findUnique({
    where: { id: session.id as string },
    include: {
      profile: true,
      skills: {
        include: { skill: true }
      }
    }
  });

  if (!user) redirect('/login');

  return (
    <main className="min-h-screen bg-[#050510] text-white pt-24 pb-20 px-6">
      <div className="container mx-auto max-w-3xl">
        <div className="mb-12">
          <h1 className="text-4xl font-black tracking-tight text-white mb-2">
            Edit <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">Profile</span>
          </h1>
          <p className="text-slate-400">Configure your digital identity on the CypherPunk protocol.</p>
        </div>

        <ProfileEditForm initialData={user} />
      </div>
    </main>
  );
}
