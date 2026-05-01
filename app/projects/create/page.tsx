import ProjectForm from '@/components/ProjectForm';

export default function CreateProjectPage() {
  return (
    <main className="min-h-screen bg-[#050510] text-white pt-32 pb-24 px-6">
      <div className="container mx-auto max-w-7xl">
        <ProjectForm />
      </div>
    </main>
  );
}
