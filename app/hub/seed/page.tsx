'use client';

import { seedHubData } from './seed';
import { useState } from 'react';

export default function SeedPage() {
  const [status, setStatus] = useState<string>('idle');

  const handleSeed = async () => {
    setStatus('seeding...');
    const res = await seedHubData();
    if (res.success) {
      setStatus('success!');
    } else {
      setStatus('error: ' + res.error);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-20">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-8">Hub Database Seeder</h1>
        <p className="text-slate-500 mb-12">Initialize the Intelligence Repository with starting data.</p>
        <button 
          onClick={handleSeed}
          className="bg-cyan-400 text-black px-12 py-4 rounded-full font-bold hover:bg-cyan-300 transition-all"
        >
          {status === 'idle' ? 'EXECUTE SEED' : status.toUpperCase()}
        </button>
      </div>
    </div>
  );
}
