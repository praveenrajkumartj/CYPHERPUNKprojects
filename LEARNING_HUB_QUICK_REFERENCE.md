# Learning Hub - Quick Reference Guide

## 🚀 Quick Start

### 1. Setup Database
```bash
# Create migration for new schema
npx prisma migrate dev --name add_learning_hub

# Seed with sample data
npm run seed
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Access the Hub
- Learning Hub: http://localhost:3000/learn
- Blog: http://localhost:3000/blog
- Tutorials: http://localhost:3000/tutorials
- Sessions: http://localhost:3000/sessions
- Guides: http://localhost:3000/guides

---

## 📦 File Structure

```
app/
├── learn/
│   └── page.tsx                 # Main learning hub
├── blog/
│   ├── page.tsx                 # Blog listing
│   └── [id]/
│       └── page.tsx             # Article detail
├── tutorials/
│   ├── page.tsx                 # Tutorial listing
│   └── [id]/
│       └── page.tsx             # Tutorial detail
├── sessions/
│   └── page.tsx                 # Video sessions
├── guides/
│   └── page.tsx                 # Hackathon guides
└── api/
    ├── articles/
    │   ├── route.ts             # GET/POST articles
    │   └── [id]/
    │       └── route.ts         # GET/PUT/DELETE single article
    ├── tutorials/
    │   ├── route.ts             # GET/POST tutorials
    │   └── [id]/
    │       └── route.ts         # GET/PUT/DELETE single tutorial
    ├── sessions/
    │   ├── route.ts             # GET/POST sessions
    │   └── [id]/
    │       └── route.ts         # GET/PUT/DELETE single session
    └── guides/
        ├── route.ts             # GET/POST guides
        └── [id]/
            └── route.ts         # GET/PUT/DELETE single guide

prisma/
├── schema.prisma                # Database schema
├── seed.ts                       # Seed data
└── migrations/                   # Migration files
```

---

## 🔌 API Quick Reference

### Articles
```bash
# Get all published articles
curl http://localhost:3000/api/articles?published=true

# Get article by ID
curl http://localhost:3000/api/articles/article-id-here

# Create article (requires auth)
curl -X POST http://localhost:3000/api/articles \
  -H "Content-Type: application/json" \
  -d '{"title": "My Article", "content": "..."}'

# Update article
curl -X PUT http://localhost:3000/api/articles/article-id \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated Title"}'

# Delete article
curl -X DELETE http://localhost:3000/api/articles/article-id
```

### Tutorials
```bash
# Get all tutorials
curl http://localhost:3000/api/tutorials

# Get tutorials by category
curl http://localhost:3000/api/tutorials?category=Solana

# Get tutorials by difficulty
curl http://localhost:3000/api/tutorials?difficulty=Beginner

# Get single tutorial
curl http://localhost:3000/api/tutorials/tutorial-id
```

### Sessions
```bash
# Get all sessions
curl http://localhost:3000/api/sessions

# Filter by tag
curl http://localhost:3000/api/sessions?tag=Solana

# Filter by event
curl http://localhost:3000/api/sessions?eventName=Hackathon2026
```

### Guides
```bash
# Get all guides
curl http://localhost:3000/api/guides

# Get single guide with sections
curl http://localhost:3000/api/guides/guide-id
```

---

## 🎨 Component Props & Examples

### ArticleCard
```tsx
<ArticleCard
  title="Bitcoin Basics"
  excerpt="Learn the fundamentals..."
  coverImage="/images/bitcoin.png"
  readTime={8}
  tags={['Bitcoin', 'Blockchain']}
  date="2026-05-01"
/>
```

### TutorialCard
```tsx
<TutorialCard
  title="Solana Development"
  category="Solana"
  difficulty="Beginner"
  lessonCount={5}
/>
```

### VideoCard
```tsx
<VideoCard
  title="ZKP Workshop"
  videoUrl="https://youtube.com/..."
  tags={['ZKProofs']}
  date="2026-04-20"
/>
```

---

## 🔐 Authentication Notes

- **Public endpoints:** All GET requests for published content
- **Protected endpoints:** POST, PUT, DELETE require JWT token
- **Required role:** ADMIN or ORGANIZER
- **Token location:** `token` cookie (httpOnly)

Test with admin account:
- Email: `admin@cyberphunk.io`
- Password: `password123`

---

## 🛠️ Common Tasks

### Add a New Article via API
```bash
curl -X POST http://localhost:3000/api/articles \
  -H "Content-Type: application/json" \
  -H "Cookie: token=YOUR_JWT_TOKEN" \
  -d '{
    "title": "Understanding DeFi",
    "content": "DeFi stands for decentralized finance...",
    "excerpt": "An intro to DeFi",
    "tags": ["DeFi", "Finance"],
    "published": true
  }'
```

### Create a Complete Tutorial
```bash
curl -X POST http://localhost:3000/api/tutorials \
  -H "Content-Type: application/json" \
  -H "Cookie: token=YOUR_JWT_TOKEN" \
  -d '{
    "title": "Advanced Solana",
    "description": "Learn advanced Solana patterns",
    "category": "Solana",
    "difficulty": "Advanced",
    "lessons": [
      {
        "title": "Lesson 1",
        "content": "Content here"
      },
      {
        "title": "Lesson 2", 
        "content": "More content"
      }
    ]
  }'
```

### Add Video Session
```bash
curl -X POST http://localhost:3000/api/sessions \
  -H "Content-Type: application/json" \
  -H "Cookie: token=YOUR_JWT_TOKEN" \
  -d '{
    "title": "Workshop: ZKProofs",
    "description": "Advanced workshop",
    "videoUrl": "https://youtube.com/embed/...",
    "tags": ["ZKProofs", "Workshop"],
    "eventName": "Hackathon 2026"
  }'
```

---

## 🎯 Styling Classes Reference

### Colors
- Primary: `text-cyan-400`, `bg-cyan-400`, `border-cyan-400`
- Secondary: `text-pink-500`, `bg-pink-500`, `border-pink-500`
- Success: `text-emerald-400`
- Warning: `text-yellow-400`
- Error: `text-red-400`

### Components
- Cards: `rounded-2xl border border-white/10 bg-[#0a0f1d]`
- Buttons: `px-4 py-2 rounded-lg font-bold uppercase tracking-wider`
- Container: `container mx-auto max-w-6xl px-6`

---

## 📊 Database Queries

### Get article count
```prisma
const count = await prisma.article.count({ where: { published: true } });
```

### Get most popular tags
```prisma
const articles = await prisma.article.findMany({ where: { published: true } });
const tags = articles.flatMap(a => a.tags);
const tagCounts = tags.reduce((acc, tag) => {
  acc[tag] = (acc[tag] || 0) + 1;
  return acc;
}, {});
```

### Get tutorial with most lessons
```prisma
const tutorials = await prisma.tutorial.findMany({
  include: { lessons: true }
});
const longest = tutorials.reduce((prev, curr) => 
  curr.lessons.length > prev.lessons.length ? curr : prev
);
```

---

## 🐛 Troubleshooting

**Q: Articles not showing up?**
A: Check `published: true` flag. Only published articles show in public listing.

**Q: API returns 401 Unauthorized?**
A: Make sure you're logged in and have ADMIN/ORGANIZER role. Check JWT token in cookies.

**Q: Images not loading?**
A: Verify image paths exist in `/public/images/`. Use Next.js Image component.

**Q: Lesson navigation not working?**
A: Ensure lessons have `order` field set correctly for sorting.

---

## 📚 Resources

- [Prisma Docs](https://www.prisma.io/docs/)
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)

---

**Last Updated:** May 1, 2026
