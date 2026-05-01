import { getPublicProfile } from '@/app/actions/networking';
import { notFound } from 'next/navigation';
import PublicProfileClient from '@/components/PublicProfileClient';
import { getSession } from '@/lib/auth';

export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const user = await getPublicProfile(username);
  
  if (!user) notFound();

  const session = await getSession();

  return (
    <main className="min-h-screen bg-[#050510] text-white pt-24 pb-20 px-6">
      <div className="container mx-auto max-w-5xl">
        <PublicProfileClient 
          user={user} 
          currentUserId={session?.id as string} 
        />
      </div>
    </main>
  );
}
