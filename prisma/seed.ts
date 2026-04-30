import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import bcrypt from 'bcryptjs';
import "dotenv/config";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // Clean up
  await prisma.ticket.deleteMany();
  await prisma.registration.deleteMany();
  await prisma.schedule.deleteMany();
  await prisma.speaker.deleteMany();
  await prisma.event.deleteMany();
  await prisma.user.deleteMany();

  // Create an organizer
  const hashedPassword = await bcrypt.hash('password123', 10);
  const organizer = await prisma.user.create({
    data: {
      name: 'Cyberphunk Admin',
      email: 'admin@cyberphunk.io',
      password: hashedPassword,
      role: 'ADMIN',
      bio: 'Leading the decentralized revolution.',
    },
  });

  // Create Events
  const events = [
    {
      title: 'Cyberphunk Hackathon 2026',
      description: 'The ultimate privacy hackathon.',
      longDescription: 'Join hundreds of developers from around the world for a 48-hour sprint building privacy-preserving protocols and zero-knowledge tools. Prize pool of $80k in crypto.',
      type: 'hackathon',
      locationType: 'online',
      location: 'https://discord.gg/cyberphunk',
      date: new Date('2026-05-17T09:00:00Z'),
      bannerImage: '/images/blog_featured.png',
      organizerId: organizer.id,
      speakers: {
        create: [
          { name: 'Satoshi Jr', designation: 'Cryptography Lead', image: '/images/avatar_1.png' },
          { name: 'Vitalik Fan', designation: 'Smart Contract Expert', image: '/images/avatar_2.png' },
        ]
      },
      schedules: {
        create: [
          { time: '09:00 AM', title: 'Opening Ceremony', description: 'Kickoff and mission briefing.' },
          { time: '11:00 AM', title: 'Hacking Starts', description: 'Form teams and start building.' },
          { time: '02:00 PM', title: 'ZKP Workshop', description: 'Technical deep dive into zero-knowledge proofs.' },
        ]
      }
    },
    {
      title: 'Web3 Protocol Conference',
      description: 'Deep dive into decentralized networking.',
      longDescription: 'A two-day conference focusing on the next generation of networking protocols, p2p systems, and decentralized infrastructure.',
      type: 'meetup',
      locationType: 'offline',
      location: 'Cyber Hub, Berlin',
      date: new Date('2026-06-12T10:00:00Z'),
      bannerImage: '/images/defi_cube.png',
      organizerId: organizer.id,
      speakers: {
        create: [
          { name: 'Alice Node', designation: 'P2P Architect', image: '/images/avatar_3.png' },
        ]
      },
      schedules: {
        create: [
          { time: '10:00 AM', title: 'Keynote: The State of P2P', description: 'Current challenges and future trends.' },
          { time: '01:00 PM', title: 'Networking Lunch', description: 'Meet other builders.' },
        ]
      }
    },
    {
      title: 'ZKP Masterclass',
      description: 'Master Zero Knowledge Proofs.',
      longDescription: 'An intensive 8-week course covering the mathematics and implementation of SNARKs, STARKs, and other ZK protocols.',
      type: 'workshop',
      locationType: 'online',
      location: 'Zoom / Cyberphunk Portal',
      date: new Date('2026-08-15T15:00:00Z'),
      bannerImage: '/images/zkp_phone.png',
      organizerId: organizer.id,
      speakers: {
        create: [
          { name: 'Bob Proof', designation: 'Math Professor', image: '/images/avatar_4.png' },
        ]
      },
      schedules: {
        create: [
          { time: '03:00 PM', title: 'Session 1: The Basics', description: 'Introduction to polynomial commitments.' },
        ]
      }
    }
  ];

  for (const eventData of events) {
    await prisma.event.create({
      data: eventData,
    });
  }

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
