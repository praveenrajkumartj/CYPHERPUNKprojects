try {
  const prisma = require('@prisma/client');
  console.log('Successfully loaded @prisma/client');
} catch (e) {
  console.error('Failed to load @prisma/client');
  console.error(e);
}
