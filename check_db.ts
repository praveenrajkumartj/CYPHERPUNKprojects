import "dotenv/config";
import prisma from './lib/prisma';

async function main() {
  const tutorials = await prisma.tutorial.findMany({
    include: { lessons: true }
  });
  console.log('Database Tutorials count:', tutorials.length);
  console.log('Tutorials:', JSON.stringify(tutorials, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
