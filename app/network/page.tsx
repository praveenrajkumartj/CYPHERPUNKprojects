import { getNetworkUsers } from '@/app/actions/networking';
import NetworkingClient from '@/components/NetworkingClient';
import { getSession } from '@/lib/auth';

export default async function NetworkingPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await getSession();
  const params = await searchParams;
  
  const query = typeof params.q === 'string' ? params.q : undefined;
  const hiring = params.hiring === 'true';
  const looking = params.looking === 'true';
  const skills = typeof params.skills === 'string' ? params.skills.split(',') : undefined;

  const users = await getNetworkUsers({
    query,
    hiring,
    lookingForTeam: looking,
    skills,
  });

  return (
    <main className="min-h-screen bg-[#050510] text-white pt-24 pb-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">Network</span>
            </h1>
            <p className="text-slate-400 max-w-xl text-lg">
              Connect with top Web3 builders, find your next co-founder, or hire talented hackers for your protocol.
            </p>
          </div>
        </div>

        <NetworkingClient 
          initialUsers={users} 
          currentUserId={session?.id as string} 
        />
      </div>
    </main>
  );
}
