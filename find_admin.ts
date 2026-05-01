import prisma from './lib/prisma';

async function main() {
  const admin = await prisma.user.findFirst({
    where: { role: 'ADMIN' }
  });
  console.log(JSON.stringify(admin));
}

main().catch(console.error);
