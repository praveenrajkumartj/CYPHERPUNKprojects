'use server';

import prisma from '@/lib/prisma';

export async function seedHubData() {
  try {
    // 1. Get or Create an Admin user to be the author
    let admin = await prisma.user.findFirst({
      where: { role: 'ADMIN' }
    });

    if (!admin) {
      admin = await prisma.user.create({
        data: {
          name: 'CyberPhunk Admin',
          email: 'admin@cyberphunk.io',
          password: 'securepassword123', // In real apps, use hashed password
          role: 'ADMIN',
          bio: 'Core contributor to CyberPhunk DAO.'
        }
      });
    }

    // 2. Create Articles
    const articles = [
      {
        title: 'The Cyberphunk Manifesto: Why Privacy Is Not Optional',
        content: 'Privacy is necessary for an open society in the electronic age...',
        excerpt: 'A deep dive into the core values of the CyberPhunk movement and why digital privacy is the foundation of freedom.',
        tags: ['MANIFESTO', 'PRIVACY'],
        readTime: 8,
        published: true,
        authorId: admin.id
      },
      {
        title: 'Bitcoin in the Post-Quantum Era: The Hardening of Digital Gold',
        content: 'As quantum computing advances, the Bitcoin network must evolve...',
        excerpt: 'Exploring the technical upgrades and security measures being developed to protect the Bitcoin network.',
        tags: ['BITCOIN', 'SECURITY'],
        readTime: 12,
        published: true,
        authorId: admin.id
      }
    ];

    for (const article of articles) {
      await prisma.article.upsert({
        where: { id: article.title.toLowerCase().replace(/ /g, '-') },
        update: {},
        create: { ...article, id: article.title.toLowerCase().replace(/ /g, '-') }
      });
    }

    // 3. Create Tutorials
    const tutorials = [
      {
        title: 'Solana Development: Zero to Hero',
        description: 'Master the Solana blockchain, from wallet setup to deploying your first smart contract (Program).',
        category: 'SOLANA DEV',
        difficulty: 'BEGINNER',
        lessons: {
          create: [
            { title: 'Environment Setup', content: 'Install Rust, Solana CLI...', order: 1 },
            { title: 'Anchor Framework Basics', content: 'Understanding the Anchor workspace...', order: 2 }
          ]
        }
      },
      {
        title: 'Bitcoin Fundamentals: Protocol Deep Dive',
        description: 'Understand the underlying mechanics of Bitcoin, including PoW, UTXOs, and scripts.',
        category: 'BITCOIN',
        difficulty: 'INTERMEDIATE',
        lessons: {
          create: [
            { title: 'The Block Header', content: 'Breaking down the 80 bytes...', order: 1 }
          ]
        }
      }
    ];

    for (const tutorial of tutorials) {
      await prisma.tutorial.create({
        data: tutorial
      });
    }

    // 4. Create Resource Sessions
    const sessions = [
      {
        title: 'Mastering Solana State Management',
        description: 'A deep dive into PDA (Program Derived Addresses) and account structures on Solana.',
        videoUrl: 'https://youtube.com/watch?v=example1',
        eventName: 'CyberPhunk Workshop #12',
        tags: ['SOLANA', 'PDA', 'ADVANCED']
      },
      {
        title: 'The Future of Bitcoin Layers',
        description: 'Exploring Lightning Network, Stacks, and Ordinals: What is next for the BTC ecosystem.',
        videoUrl: 'https://youtube.com/watch?v=example2',
        eventName: 'Global Web3 Keynote',
        tags: ['BITCOIN', 'LAYERS', 'LIGHTNING']
      }
    ];

    for (const session of sessions) {
      await prisma.resourceSession.create({
        data: session
      });
    }

    return { success: true };
  } catch (err) {
    console.error('Seeding error:', err);
    return { success: false, error: err instanceof Error ? err.message : 'Seeding failed' };
  }
}
