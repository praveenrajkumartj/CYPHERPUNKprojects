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
  await prisma.activityLog.deleteMany();
  await prisma.userSkill.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.ticket.deleteMany();
  await prisma.registration.deleteMany();
  await prisma.schedule.deleteMany();
  await prisma.speaker.deleteMany();
  await prisma.event.deleteMany();
  await prisma.article.deleteMany();
  await prisma.tutorial.deleteMany();
  await prisma.resourceSession.deleteMany();
  await prisma.hackathonGuide.deleteMany();
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

  // Create some skills
  const skills = await Promise.all([
    prisma.skill.create({ data: { name: 'Rust' } }),
    prisma.skill.create({ data: { name: 'Solidity' } }),
    prisma.skill.create({ data: { name: 'Cryptography' } }),
    prisma.skill.create({ data: { name: 'React' } }),
    prisma.skill.create({ data: { name: 'Next.js' } }),
  ]);

  // Create some users with contribution scores
  const users = await Promise.all([
    prisma.user.create({
      data: {
        name: 'Neo Matrix',
        email: 'neo@cyberphunk.io',
        password: hashedPassword,
        contributionScore: 1250,
        bio: 'Just trying to wake everyone up.',
        skills: { create: [{ skillId: skills[0].id }, { skillId: skills[1].id }] }
      }
    }),
    prisma.user.create({
      data: {
        name: 'Trinity Phunk',
        email: 'trinity@cyberphunk.io',
        password: hashedPassword,
        contributionScore: 980,
        bio: 'The code is my reality.',
        skills: { create: [{ skillId: skills[2].id }, { skillId: skills[3].id }] }
      }
    }),
    prisma.user.create({
      data: {
        name: 'Morpheus Dev',
        email: 'morpheus@cyberphunk.io',
        password: hashedPassword,
        contributionScore: 850,
        bio: 'I show you how deep the rabbit hole goes.',
        skills: { create: [{ skillId: skills[0].id }, { skillId: skills[4].id }] }
      }
    })
  ]);

  // Create some activities
  await prisma.activityLog.createMany({
    data: [
      { type: 'USER_JOINED', message: 'joined the Cyberphunk revolution!', userId: users[0].id },
      { type: 'PROJECT_CREATED', message: 'created a new project: Decentralized VPN', userId: users[1].id },
      { type: 'TASK_POSTED', message: 'posted a new bounty: Audit Smart Contract', userId: users[2].id },
      { type: 'USER_JOINED', message: 'joined the Cyberphunk revolution!', userId: users[2].id },
    ]
  });

  // Create sample articles
  await Promise.all([
    prisma.article.create({
      data: {
        title: 'Bitcoin at $1M: From Cypherpunk Dream to Global Reserve',
        content: 'Bitcoin represents the culmination of decades of cypherpunk research. From David Chaum\'s DigiCash to Satoshi Nakamoto\'s Bitcoin, we explore how privacy-focused cryptography became the foundation of the world\'s most valuable digital asset.\n\nThe journey began with the recognition that digital privacy was essential for human freedom. Satoshi understood this and embedded privacy principles into Bitcoin\'s very architecture through decentralization and pseudonymous transactions.',
        excerpt: 'How Satoshi Nakamoto\'s white paper transformed from a mailing list post to the foundation of a multi-trillion asset class.',
        coverImage: '/images/blog_bitcoin.png',
        authorId: organizer.id,
        tags: ['Bitcoin', 'Privacy', 'Cypherpunk'],
        readTime: 8,
        published: true,
      }
    }),
    prisma.article.create({
      data: {
        title: 'Zero-Knowledge Proofs: The Cryptographic Magic Behind Private Transactions',
        content: 'Zero-knowledge proofs (ZKPs) are one of the most powerful tools in modern cryptography. They allow us to prove knowledge of something without revealing the thing itself.\n\nZK-SNARKs enable systems like Zcash to hide transaction details while still proving they are valid. This breakthrough in privacy technology is now being used to scale Ethereum and power privacy-focused applications across the Web3 ecosystem.',
        excerpt: 'Understanding ZK-SNARKs and ZK-STARKs — the cryptographic magic that enables Zcash, StarkNet, and Aleo.',
        coverImage: '/images/project_nodeguard.png',
        authorId: organizer.id,
        tags: ['Cryptography', 'ZKProofs', 'Privacy'],
        readTime: 12,
        published: true,
      }
    }),
    prisma.article.create({
      data: {
        title: 'Solana: High-Performance Blockchain for the Masses',
        content: 'Solana revolutionized blockchain scalability with its innovative Proof of History consensus mechanism. By creating a verifiable history of events, Solana achieves 65,000+ TPS without compromising on decentralization.',
        excerpt: 'How Solana became the fastest blockchain and what makes it perfect for Web3 developers.',
        authorId: organizer.id,
        tags: ['Solana', 'Blockchain'],
        readTime: 6,
        published: true,
      }
    })
  ]);

  // Create sample tutorials
  const tutorials = await Promise.all([
    prisma.tutorial.create({
      data: {
        title: 'Solana Smart Contract Development 101',
        description: 'Learn to build fast and scalable smart contracts on Solana using Rust and the Anchor framework.',
        category: 'Solana',
        difficulty: 'Beginner',
        lessons: {
          create: [
            { 
              title: 'Setting Up Your Development Environment', 
              content: 'To start building on Solana, you need a robust local environment. \n\n1. **Rust**: The core language for Solana programs. Install via rustup.\n2. **Solana CLI**: Provides tools for generating keys, deploying programs, and interacting with the cluster.\n3. **Anchor Framework**: The "Ruby on Rails" of Solana. It handles boilerplate for serialization and account validation, making development safer and faster.\n\nRun `anchor init my_project` to scaffold your first project and explore the `programs/` and `tests/` directories.', 
              order: 0 
            },
            { 
              title: 'Understanding Accounts and State', 
              content: 'Solana uses a unique Account Model. Unlike Ethereum, where state is stored within the contract itself, Solana programs (contracts) are "stateless". \n\n- **Data Accounts**: Store the actual state of an application.\n- **Program Accounts**: Store the executable code.\n- **Account Ownership**: Only the program that "owns" an account can modify its data.\n- **Rent**: Accounts require a small balance of SOL to remain on-chain, which is returned if the account is closed.', 
              order: 1 
            },
            { 
              title: 'Your First Hello World Program', 
              content: 'In Anchor, a basic program consists of a `#[program]` module containing instructions. \n\n- **Instructions**: Functions that define what your program does.\n- **Context**: Every instruction receives a `Context` struct that provides access to the accounts involved in the transaction.\n- **Deployment**: Use `anchor build` and `anchor deploy` to push your code to the Devnet cluster for testing.', 
              order: 2 
            }
          ]
        }
      }
    }),
    prisma.tutorial.create({
      data: {
        title: 'Bitcoin Transactions Deep Dive',
        description: 'Understand how Bitcoin transactions work, from UTXOs to multisig wallets.',
        category: 'Bitcoin',
        difficulty: 'Intermediate',
        lessons: {
          create: [
            { 
              title: 'The UTXO Model', 
              content: 'The Unspent Transaction Output (UTXO) model is the fundamental way Bitcoin tracks ownership. \n\n- **No Balances**: There are no "account balances" in Bitcoin. Instead, your wallet scans the blockchain for outputs that belong to your public key and haven\'t been spent yet.\n- **Inputs and Outputs**: Every transaction "consumes" existing UTXOs as inputs and "creates" new UTXOs as outputs.\n- **Atomic Nature**: If you have a 1.0 BTC UTXO but want to send 0.1 BTC, the network consumes the entire 1.0 BTC input, creates a 0.1 BTC output for the recipient, and a 0.9 BTC "change" output back to you.\n- **Parallelization**: Since UTXOs are independent, the network can process multiple transactions simultaneously if they don\'t share the same inputs.', 
              order: 0 
            },
            { 
              title: 'Script and Opcodes', 
              content: 'Bitcoin uses a simple, stack-based language called **Script** to define spending conditions.\n\n- **Stack-Based**: Operations push data onto a stack and pop it off to perform logic (e.g., `OP_ADD`).\n- **P2PKH (Pay-to-Public-Key-Hash)**: The most common script type. It requires a signature from the private key and the public key itself to "unlock" the funds.\n- **Non-Turing Complete**: Script intentionally lacks loops to prevent infinite loop attacks, making it highly predictable and secure.\n- **Key Opcodes**: `OP_DUP`, `OP_HASH160`, `OP_EQUALVERIFY`, and `OP_CHECKSIG` are the building blocks of most Bitcoin transactions.', 
              order: 1 
            },
            { 
              title: 'Building a Custom Transaction', 
              content: 'Constructing a Bitcoin transaction involves four key steps:\n\n1. **UTXO Selection**: Identifying unspent outputs in your wallet that total more than the amount you want to send plus the miner fee.\n2. **Drafting (Transaction Hex)**: Creating a raw data structure that lists your inputs and your desired outputs (recipient address and change address).\n3. **Signing**: Applying your cryptographic signature to each input. This proves you have the right to spend those specific UTXOs.\n4. **Broadcasting**: Pushing the signed hex to the network via a node. Once a miner includes it in a block, the transaction is "confirmed".', 
              order: 2 
            }
          ]
        }
      }
    }),
    prisma.tutorial.create({
      data: {
        title: 'Web3 JavaScript Fundamentals',
        description: 'Master Web3.js and Ethers.js libraries for building decentralized applications.',
        category: 'Web3',
        difficulty: 'Beginner',
        lessons: {
          create: [
            { 
              title: 'Introduction to Web3.js', 
              content: 'Web3.js is a collection of libraries that allow you to interact with a local or remote ethereum node using HTTP, IPC or WebSocket. \n\n- **Providers**: These act as the bridge between your app and the blockchain (e.g., Infura, Alchemy, or a local Geth node).\n- **JSON-RPC**: The underlying protocol used for communication. Web3.js abstracts these complex requests into simple JavaScript methods like `web3.eth.getBalance()`.', 
              order: 0 
            },
            { 
              title: 'Working with Smart Contracts', 
              content: 'To interact with a contract, you need its **ABI (Application Binary Interface)** and its **Address**.\n\n- **ABI**: A JSON file that describes the contract\'s functions and how to call them.\n- **Methods**: You can call "read-only" methods (view/pure) instantly for free, but "state-changing" methods require sending a transaction and paying gas fees.', 
              order: 1 
            },
            { 
              title: 'Building a Simple Wallet', 
              content: 'A basic wallet manages your private keys and signatures.\n\n- **Key Management**: NEVER store private keys in plain text. Use encrypted keystores or hardware wallet integrations.\n- **Transaction Lifecycle**: Create -> Sign -> Broadcast -> Wait for Confirmation. You can track progress using event listeners or by polling the transaction hash.', 
              order: 2 
            }
          ]
        }
      }
    })
  ]);

  // Create sample sessions
  const sessions = [
    {
      title: 'How to Win a Web3 Hackathon',
      description: 'Patrick Collins shares the ultimate strategy for building winning projects at Web3 hackathons, focusing on MVP focus and presentation.',
      videoUrl: 'https://www.youtube.com/embed/n_W728EwP8E',
      thumbnail: 'https://img.youtube.com/vi/n_W728EwP8E/hqdefault.jpg',
      eventName: 'Cyfrin Updraft',
      tags: ['Hackathon', 'Workshop'],
      date: new Date('2026-05-10T10:00:00Z')
    },
    {
      title: 'Zero Knowledge Proofs - Explained',
      description: 'A comprehensive visual explanation of ZK-Proofs and how they enable privacy-preserving transactions on the blockchain.',
      videoUrl: 'https://www.youtube.com/embed/H59v6-E97S4',
      thumbnail: 'https://img.youtube.com/vi/H59v6-E97S4/hqdefault.jpg',
      eventName: 'Simply Explained',
      tags: ['ZKProofs', 'Cryptography'],
      date: new Date('2026-04-20T14:00:00Z')
    },
    {
      title: 'Solana Proof of History Explained',
      description: 'Dive deep into Solana\'s core innovation: Proof of History (PoH) and how it enables sub-second block times and high throughput.',
      videoUrl: 'https://www.youtube.com/embed/0p_fUoGInC8',
      thumbnail: 'https://img.youtube.com/vi/0p_fUoGInC8/hqdefault.jpg',
      eventName: 'Solana Foundation',
      tags: ['Solana', 'Events'],
      date: new Date('2026-04-15T10:00:00Z')
    },
    {
      title: 'The History of Cryptography',
      description: 'From ancient ciphers to RSA and modern zero-knowledge tech. Explore the evolution of encryption through the ages.',
      videoUrl: 'https://www.youtube.com/embed/f4O6vS0_F3I',
      thumbnail: 'https://img.youtube.com/vi/f4O6vS0_F3I/hqdefault.jpg',
      eventName: 'Computerphile',
      tags: ['Cryptography', 'Education'],
      date: new Date('2026-03-12T09:00:00Z')
    },
    {
      title: 'Building a Fullstack dApp on Solana',
      description: 'A hands-on workshop building a decentralized application from scratch using Rust, Anchor, and React.',
      videoUrl: 'https://www.youtube.com/embed/T_H_x_K-S-I',
      thumbnail: 'https://img.youtube.com/vi/T_H_x_K-S-I/hqdefault.jpg',
      eventName: 'Developer Workshop',
      tags: ['Solana', 'Workshop', 'Development'],
      date: new Date('2026-03-25T15:00:00Z')
    },
    {
      title: 'ZK-SNARKs in a Nutshell',
      description: 'Understanding the technical implementation of SNARKs and how they compare to STARKs in modern privacy protocols.',
      videoUrl: 'https://www.youtube.com/embed/h7nS7-7Y6O8',
      thumbnail: 'https://img.youtube.com/vi/h7nS7-7Y6O8/hqdefault.jpg',
      eventName: 'ZK Podcast',
      tags: ['ZKProofs', 'Cryptography'],
      date: new Date('2026-02-18T11:00:00Z')
    },
    {
      title: 'Public Key Cryptography: RSA Encryption',
      description: 'Learn the mathematical foundations of RSA and how prime numbers secure the modern internet.',
      videoUrl: 'https://www.youtube.com/embed/4zahvcJ9glg',
      thumbnail: 'https://img.youtube.com/vi/4zahvcJ9glg/hqdefault.jpg',
      eventName: 'Art of the Problem',
      tags: ['Cryptography'],
      date: new Date('2026-01-30T10:00:00Z')
    },
    {
      title: 'What is Solana? Deep Dive',
      description: 'A complete overview of the Solana ecosystem, architecture, and its potential for high-performance DeFi.',
      videoUrl: 'https://www.youtube.com/embed/yA8Z9rX3X_8',
      thumbnail: 'https://img.youtube.com/vi/yA8Z9rX3X_8/hqdefault.jpg',
      eventName: 'Coin Bureau',
      tags: ['Solana', 'Events'],
      date: new Date('2025-12-20T14:00:00Z')
    },
    {
      title: 'Solana Breakpoint Highlights',
      description: 'The best moments and announcements from the Solana Breakpoint global conference.',
      videoUrl: 'https://www.youtube.com/embed/CisM2Z7-rFw',
      thumbnail: 'https://img.youtube.com/vi/CisM2Z7-rFw/hqdefault.jpg',
      eventName: 'Breakpoint 2024',
      tags: ['Solana', 'Events'],
      date: new Date('2025-11-15T09:00:00Z')
    },
    {
      title: 'Anchor Framework for Beginners',
      description: 'Master the Anchor framework to build secure Solana programs faster and with better abstractions.',
      videoUrl: 'https://www.youtube.com/embed/0U_C8J-rF-0',
      thumbnail: 'https://img.youtube.com/vi/0U_C8J-rF-0/hqdefault.jpg',
      eventName: 'Solana Workshop',
      tags: ['Solana', 'Workshop'],
      date: new Date('2025-10-25T13:00:00Z')
    },
    {
      title: 'The Rise of Decentralized AI',
      description: 'Exploring the intersection of blockchain and artificial intelligence in the next generation of Web3.',
      videoUrl: 'https://www.youtube.com/embed/9vY6L5M6m_A',
      thumbnail: 'https://img.youtube.com/vi/9vY6L5M6m_A/hqdefault.jpg',
      eventName: 'Future Tech Summit',
      tags: ['Events', 'AI', 'Web3'],
      date: new Date('2025-09-10T16:00:00Z')
    }
  ];

  for (const sessionData of sessions) {
    await prisma.resourceSession.create({
      data: sessionData,
    });
  }

  // Create sample guides
  await Promise.all([
    prisma.hackathonGuide.create({
      data: {
        title: 'How to Participate in Cyberphunk Hackathon',
        description: 'Your complete guide to participating in Cyberphunk Hackathon 2026 and winning big!',
        sections: {
          create: [
            { 
              title: 'Registration & Team Setup', 
              content: 'Success starts with a strong team. \n\n- **Verification**: Ensure all members have verified their Cyberphunk profiles to be eligible for rewards.\n- **Team Size**: Optimal teams are 3-4 members with diverse skills (Frontend, Backend, Cryptography, Design).\n- **Collaboration**: Set up a shared GitHub repo and a Discord channel for your team immediately.', 
              order: 0 
            },
            { 
              title: 'Choosing Your Challenge', 
              content: 'Focus is key. Don\'t try to build everything. \n\n- **Thematic Fit**: Choose a challenge that aligns with your team\'s strengths.\n- **Judging Criteria**: Most Cyberphunk challenges prioritize **Privacy**, **Security**, and **User Experience**. Read the rubric in the "Challenges" tab before starting.', 
              order: 1 
            },
            { 
              title: 'Building Your MVP', 
              content: 'In a 48-hour hackathon, "Done is better than perfect". \n\n- **Core Loop**: Identify the one feature that proves your concept and build it first.\n- **Tooling**: Use the provided starter kits to save time on authentication and wallet connection.\n- **Documentation**: A clear README and a clean code structure will earn you extra points from the technical judges.', 
              order: 2 
            },
            { 
              title: 'Submitting Your Project', 
              content: 'The final push. \n\n- **Demo Video**: Record a 2-3 minute video walkthrough. Focus on the *problem* you solved and the *how* of your implementation.\n- **Deployment**: Ensure your app is deployed to a public URL (e.g., Vercel, Netlify) so judges can interact with it.', 
              order: 3 
            },
            { 
              title: 'Winning Strategies', 
              content: 'What sets winners apart? \n\n- **Pitching**: Your presentation is as important as your code. Explain the impact of your project.\n- **Mentor Feedback**: Use the Discord "Mentor Support" channel early and often. They can help you avoid common pitfalls and refine your idea.', 
              order: 4 
            }
          ]
        }
      }
    }),
    prisma.hackathonGuide.create({
      data: {
        title: 'Building Privacy-First Applications',
        description: 'Master the principles of building applications with privacy at their core.',
        sections: {
          create: [
            { 
              title: 'Privacy Fundamentals', 
              content: 'Privacy is not about having something to hide; it\'s about having the right to decide what you reveal.\n\n- **Anonymity vs Pseudonymity**: Understand that Bitcoin addresses are pseudonymous, not anonymous. For true privacy, you need tools like mixers or zero-knowledge proofs.\n- **Confidentiality**: Ensuring that only authorized parties can access transaction data.', 
              order: 0 
            },
            { 
              title: 'Choosing the Right Tools', 
              content: 'The cryptographic landscape is evolving fast.\n\n- **ZK-SNARKs**: Great for efficiency and small proof sizes, but often require a "trusted setup".\n- **ZK-STARKs**: No trusted setup and quantum-resistant, but proofs are significantly larger.\n- **Libraries**: Use established ones like `snarkjs`, `circom`, or Solana\'s `light-protocol`.', 
              order: 1 
            },
            { 
              title: 'Implementation Best Practices', 
              content: 'The "Golden Rule" of crypto: **Never roll your own cryptography.**\n\n- **Auditability**: Privacy doesn\'t mean lack of transparency in the protocol logic. Ensure your proofs are verifiable by anyone.\n- **Metadata Protection**: Protecting the payload is only half the battle. You must also protect transaction timing, IP addresses, and user patterns.', 
              order: 2 
            },
            { 
              title: 'Testing & Deployment', 
              content: 'Privacy bugs are often silent. \n\n- **Regression Testing**: Ensure new features don\'t accidentally leak data that was previously private.\n- **User Education**: Your application should clearly communicate what is private and what is shared with the network.', 
              order: 3 
            }
          ]
        }
      }
    })
  ]);

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
