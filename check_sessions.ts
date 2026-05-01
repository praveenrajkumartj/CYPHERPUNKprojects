import prisma from './lib/prisma';

async function main() {
  const sessions = await prisma.resourceSession.findMany();
  console.log(JSON.stringify(sessions, null, 2));
}

main().catch(console.error);
