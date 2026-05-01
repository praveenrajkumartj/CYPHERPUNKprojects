import prisma from './lib/prisma';

async function checkSchema() {
  console.log('Project model fields:');
  // @ts-ignore
  console.log(Object.keys(prisma.project));
  
  try {
    const project = await prisma.project.findFirst({
      include: {
        // @ts-ignore
        skills: true
      }
    });
    console.log('Successfully queried skills relation');
  } catch (err: any) {
    console.error('Failed to query skills relation:', err.message);
  }
}

checkSchema();
