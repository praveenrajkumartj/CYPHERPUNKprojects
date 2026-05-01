# Learning & Resource Hub - Implementation Guide

## 🎯 Overview

A complete **Learning & Resource Hub** has been built for the CyberPhunk DAO platform. This system provides a centralized knowledge repository for Web3 education with multiple content types and a professional UI.

---

## 📋 What Was Built

### 1. **Database Schema (Prisma ORM)**
- **Article** - Blog posts with metadata
- **Tutorial** - Step-by-step guides with lessons
- **Lesson** - Individual tutorial chapters
- **ResourceSession** - Recorded videos/workshops
- **HackathonGuide** - Hackathon participation guides
- **Section** - Guide subsections

### 2. **API Routes** (Full CRUD)

#### Blog/Articles (`/api/articles`)
```
GET    /api/articles              # List published articles (paginated)
POST   /api/articles              # Create article (Auth: ADMIN/ORGANIZER)
GET    /api/articles/[id]         # Get single article
PUT    /api/articles/[id]         # Update article
DELETE /api/articles/[id]         # Delete article
```

Query Parameters for GET:
- `published=true` - Only published articles
- `tag=Bitcoin` - Filter by tag
- `page=1` - Pagination
- `limit=10` - Items per page

#### Tutorials (`/api/tutorials`)
```
GET    /api/tutorials             # List all tutorials
POST   /api/tutorials             # Create tutorial with lessons
GET    /api/tutorials/[id]        # Get tutorial with lessons
PUT    /api/tutorials/[id]        # Update tutorial
DELETE /api/tutorials/[id]        # Delete tutorial
```

Query Parameters:
- `category=Solana` - Filter by category
- `difficulty=Beginner` - Filter by difficulty

#### Recorded Sessions (`/api/sessions`)
```
GET    /api/sessions              # List all sessions
POST   /api/sessions              # Create session (Auth: ADMIN)
GET    /api/sessions/[id]         # Get session
PUT    /api/sessions/[id]         # Update session
DELETE /api/sessions/[id]         # Delete session
```

Query Parameters:
- `tag=Solana` - Filter by tag
- `eventName=Hackathon2026` - Filter by event

#### Hackathon Guides (`/api/guides`)
```
GET    /api/guides                # List all guides
POST   /api/guides                # Create guide with sections
GET    /api/guides/[id]           # Get guide with sections
PUT    /api/guides/[id]           # Update guide
DELETE /api/guides/[id]           # Delete guide
```

---

## 🎨 Frontend Pages

### Learning Hub Navigation
- **Route:** `/learn`
- **Features:**
  - Hero section with CTAs
  - Four learning path cards (Blog, Tutorials, Sessions, Guides)
  - Statistics cards
  - Smooth animations with Framer Motion

### Blog & Articles
- **Route:** `/blog`
- **Features:**
  - Grid layout of articles
  - Search functionality
  - Tag-based filtering
  - Read time estimates
  - Cover images

- **Route:** `/blog/[id]`
- **Features:**
  - Full article view with rich text
  - Author information
  - Share functionality
  - Metadata display (date, read time)

### Tutorials
- **Route:** `/tutorials`
- **Features:**
  - Filter by category (Solana, Bitcoin, etc.)
  - Filter by difficulty (Beginner, Intermediate, Advanced)
  - Lesson count display
  - Responsive grid

- **Route:** `/tutorials/[id]`
- **Features:**
  - Sidebar with lesson navigation
  - Step-by-step lesson content
  - Progress bar
  - Previous/Next navigation
  - Current lesson highlighting

### Recorded Sessions
- **Route:** `/sessions`
- **Features:**
  - Video card grid with thumbnails
  - Play button overlay
  - Tag filtering
  - Modal video player
  - YouTube/custom video support

### Hackathon Guides
- **Route:** `/guides`
- **Features:**
  - Guide selector sidebar
  - Expandable sections
  - Structured content
  - Call-to-action for events
  - Clean accordion UI

---

## 🚀 Getting Started

### 1. Run Database Migrations
```bash
npm run prisma:migrate
```

### 2. Seed Sample Data
```bash
npm run seed
```

This will populate the database with:
- Sample articles
- Tutorials with lessons
- Video sessions
- Hackathon guides

### 3. Start Development Server
```bash
npm run dev
```

Access at: `http://localhost:3000/learn`

---

## 📝 API Usage Examples

### Create an Article
```bash
curl -X POST http://localhost:3000/api/articles \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Getting Started with Solana",
    "content": "Solana is a high-performance blockchain...",
    "excerpt": "Learn the basics of Solana development",
    "coverImage": "/images/solana.png",
    "tags": ["Solana", "Blockchain", "Web3"],
    "published": true
  }'
```

### Fetch Published Articles
```bash
curl http://localhost:3000/api/articles?published=true&limit=10
```

### Create Tutorial with Lessons
```bash
curl -X POST http://localhost:3000/api/tutorials \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Solana Smart Contracts 101",
    "description": "Learn to build smart contracts on Solana",
    "category": "Solana",
    "difficulty": "Beginner",
    "lessons": [
      {
        "title": "Setting Up Your Environment",
        "content": "First, install Rust and Cargo..."
      },
      {
        "title": "Your First Program",
        "content": "Let's write your first Solana program..."
      }
    ]
  }'
```

---

## 🔐 Authentication & Authorization

All write operations require authentication:

- **GET requests:** Public (published content)
- **POST/PUT/DELETE:** ADMIN or ORGANIZER role required

Sessions are stored in JWT cookies.

---

## 🎨 Styling & Components

### Technologies
- **Tailwind CSS v4** - Utility-first styling
- **Framer Motion** - Smooth animations
- **lucide-react** - Icon library
- **Next.js Image** - Optimized images

### Color Scheme
- Primary: Cyan (`#00ffff`)
- Secondary: Pink (`#ff1493`)
- Background: Dark (`#050510`)

---

## 📊 Database Schema Details

### Article
```prisma
model Article {
  id          String    @id @default(cuid())
  title       String
  content     String    @db.Text
  excerpt     String?   @db.Text
  coverImage  String?
  authorId    String
  tags        String[]
  readTime    Int?
  published   Boolean   @default(false)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  author      User      @relation(fields: [authorId], references: [id])
}
```

### Tutorial & Lesson
```prisma
model Tutorial {
  id          String
  title       String
  description String   @db.Text
  category    String
  difficulty  String
  lessons     Lesson[]
}

model Lesson {
  id        String
  title     String
  content   String   @db.Text
  order     Int
  tutorialId String
}
```

### ResourceSession
```prisma
model ResourceSession {
  id          String
  title       String
  description String   @db.Text
  videoUrl    String
  thumbnail   String?
  eventName   String?
  date        DateTime
  tags        String[]
}
```

### HackathonGuide & Section
```prisma
model HackathonGuide {
  id          String
  title       String
  description String   @db.Text
  sections    Section[]
}

model Section {
  id      String
  title   String
  content String   @db.Text
  order   Int
  guideId String
}
```

---

## 🔄 Features

✅ **Dynamic Content Management**
- Create, edit, delete articles, tutorials, sessions, guides
- Paginated article listing
- Tag-based filtering across all content types

✅ **User Experience**
- Responsive design (mobile-first)
- Smooth animations and transitions
- Search functionality
- Progress tracking in tutorials
- Video player with modal

✅ **Content Organization**
- Categories and difficulty levels
- Structured lesson progression
- Guide sections with accordions
- Read time estimation

✅ **SEO & Performance**
- Optimized images with Next.js Image
- Semantic HTML structure
- Clean URL structure
- Fast page loads

---

## 🛠️ Customization

### Add New Tutorial Category
Edit seed file or POST to API with new category name.

### Customize Colors
Update Tailwind color classes in component files (cyan, pink, etc.)

### Change Video Player
Modify `/app/sessions/page.tsx` to support additional video platforms.

### Add More Guide Types
Create new models in schema.prisma and corresponding API routes.

---

## 📚 Next Steps

1. **Populate with real content** - Add articles, tutorials, sessions
2. **Integrate with admin dashboard** - Create content management UI
3. **Add user preferences** - Save favorites, track progress
4. **Implement search** - Full-text search across all content
5. **Analytics** - Track user engagement and popular content
6. **Social features** - Comments, discussions, ratings

---

## 📞 Support

For issues or questions:
1. Check the database schema in `prisma/schema.prisma`
2. Review API routes in `app/api/`
3. Inspect page components in `app/learn/`, `app/blog/`, etc.

---

**Built with Next.js 16 • React 19 • TypeScript • Tailwind CSS v4 • Prisma ORM**
