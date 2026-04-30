import HeroSection from '@/components/HeroSection';

export default function HeroDemoPage() {
  return (
    <main className="min-h-screen bg-[#03030a]">
      <HeroSection />
      <div className="h-screen bg-[#03030a] flex items-center justify-center text-slate-500">
         <p>Scroll content below hero to see the scroll hint fade out...</p>
      </div>
    </main>
  );
}
