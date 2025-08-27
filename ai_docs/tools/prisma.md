# Prisma Documentation

## What is Prisma?

**Definition**: Prisma is a next-generation Node.js and TypeScript ORM (Object-Relational Mapping) that provides a type-safe database client, migrations, and a visual database browser.

**Philosophy**: Database access should be type-safe, auto-completed, and feel natural in your programming language.

## Why Use Prisma?

### Problems It Solves
1. **Type Safety**: End-to-end type safety from database to application
2. **SQL Complexity**: No need to write raw SQL queries
3. **Migration Management**: Automated schema migrations
4. **Database Agnostic**: Works with multiple databases
5. **Development Experience**: Auto-completion and type checking

### Benefits
- Generated TypeScript types from schema
- Intuitive data modeling
- Automated migrations
- Visual database browser (Prisma Studio)
- Optimized query engine
- Protection against SQL injection

## Setup in Next.js

### Installation
```bash
# Install Prisma
npm install prisma --save-dev
npm install @prisma/client

# Initialize Prisma
npx prisma init

# This creates:
# - prisma/schema.prisma (Schema file)
# - .env (Environment variables)
```

### Configuration
```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"  // or "postgresql", "sqlite", "mongodb"
  url      = env("DATABASE_URL")
}
```

### Environment Setup
```bash
# .env
DATABASE_URL="mysql://username:password@localhost:3306/dbname"

# For development with PlanetScale
DATABASE_URL="mysql://username:password@aws.connect.psdb.cloud/dbname?sslaccept=strict"
```

## Schema Definition

### Basic Models
```prisma
// prisma/schema.prisma

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  role      Role     @default(USER)
  posts     Post[]
  profile   Profile?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String   @db.VarChar(255)
  content   String?  @db.Text
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@index([authorId])
}

model Profile {
  id     Int    @id @default(autoincrement())
  bio    String @db.Text
  user   User   @relation(fields: [userId], references: [id])
  userId Int    @unique
}

enum Role {
  USER
  ADMIN
}
```

### Issue Tracker Schema (From Ticket 6)
```prisma
model Issue {
  id          Int      @id @default(autoincrement())
  title       String   @db.VarChar(255)
  description String   @db.Text
  status      Status   @default(OPEN)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  assignedTo  User?    @relation(fields: [assignedToUserId], references: [id])
  assignedToUserId String?
  
  @@index([status])
  @@index([assignedToUserId])
}

enum Status {
  OPEN
  IN_PROGRESS
  CLOSED
}
```

## Prisma Client Setup

### Singleton Pattern for Next.js
```typescript
// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
```

## Common Operations

### Create Operations
```typescript
// Create single record
const user = await prisma.user.create({
  data: {
    email: 'user@example.com',
    name: 'John Doe',
  },
});

// Create with relations
const post = await prisma.post.create({
  data: {
    title: 'Hello World',
    content: 'This is my first post',
    author: {
      connect: { id: userId },
    },
  },
});

// Create many
const users = await prisma.user.createMany({
  data: [
    { email: 'user1@example.com', name: 'User 1' },
    { email: 'user2@example.com', name: 'User 2' },
  ],
});
```

### Read Operations
```typescript
// Find unique
const user = await prisma.user.findUnique({
  where: { id: 1 },
});

// Find first
const user = await prisma.user.findFirst({
  where: {
    email: { contains: '@example.com' },
  },
});

// Find many
const users = await prisma.user.findMany({
  where: {
    role: 'USER',
  },
  orderBy: {
    createdAt: 'desc',
  },
  take: 10,
  skip: 0,
});

// Include relations
const userWithPosts = await prisma.user.findUnique({
  where: { id: 1 },
  include: {
    posts: true,
    profile: true,
  },
});

// Select specific fields
const userEmail = await prisma.user.findUnique({
  where: { id: 1 },
  select: {
    email: true,
    name: true,
  },
});
```

### Update Operations
```typescript
// Update single
const user = await prisma.user.update({
  where: { id: 1 },
  data: {
    name: 'Updated Name',
  },
});

// Update many
const updateUsers = await prisma.user.updateMany({
  where: {
    role: 'USER',
  },
  data: {
    role: 'ADMIN',
  },
});

// Upsert (update or create)
const user = await prisma.user.upsert({
  where: { email: 'user@example.com' },
  update: { name: 'Updated Name' },
  create: {
    email: 'user@example.com',
    name: 'New User',
  },
});
```

### Delete Operations
```typescript
// Delete single
const user = await prisma.user.delete({
  where: { id: 1 },
});

// Delete many
const deleteUsers = await prisma.user.deleteMany({
  where: {
    email: { contains: 'test' },
  },
});

// Cascade delete (configured in schema)
// Deleting a user will delete related posts if configured
```

## Advanced Queries

### Filtering
```typescript
// Complex where conditions
const posts = await prisma.post.findMany({
  where: {
    OR: [
      { title: { contains: 'prisma' } },
      { content: { contains: 'database' } },
    ],
    AND: {
      published: true,
    },
    NOT: {
      authorId: 1,
    },
  },
});

// Date filtering
const recentPosts = await prisma.post.findMany({
  where: {
    createdAt: {
      gte: new Date('2024-01-01'),
      lt: new Date('2024-12-31'),
    },
  },
});
```

### Aggregations
```typescript
// Count
const userCount = await prisma.user.count({
  where: { role: 'USER' },
});

// Aggregate
const result = await prisma.post.aggregate({
  _avg: { views: true },
  _sum: { views: true },
  _min: { createdAt: true },
  _max: { createdAt: true },
});

// Group by
const groupedPosts = await prisma.post.groupBy({
  by: ['published'],
  _count: {
    _all: true,
  },
});
```

### Transactions
```typescript
// Sequential transactions
const [user, post] = await prisma.$transaction([
  prisma.user.create({ data: { email: 'user@example.com' } }),
  prisma.post.create({ data: { title: 'Post' } }),
]);

// Interactive transactions
await prisma.$transaction(async (tx) => {
  const user = await tx.user.create({
    data: { email: 'user@example.com' },
  });
  
  const post = await tx.post.create({
    data: {
      title: 'Post',
      authorId: user.id,
    },
  });
  
  return { user, post };
});
```

## API Routes Integration

### GET Endpoint
```typescript
// app/api/issues/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = 10;
  
  const issues = await prisma.issue.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: { createdAt: 'desc' },
  });
  
  return NextResponse.json(issues);
}
```

### POST Endpoint
```typescript
// app/api/issues/route.ts
export async function POST(request: Request) {
  const body = await request.json();
  
  // Validate with Zod
  const validation = issueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }
  
  const issue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
      status: 'OPEN',
    },
  });
  
  return NextResponse.json(issue, { status: 201 });
}
```

### PUT Endpoint
```typescript
// app/api/issues/[id]/route.ts
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const id = parseInt(params.id);
  
  const issue = await prisma.issue.update({
    where: { id },
    data: body,
  });
  
  return NextResponse.json(issue);
}
```

### DELETE Endpoint
```typescript
// app/api/issues/[id]/route.ts
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  
  await prisma.issue.delete({
    where: { id },
  });
  
  return new NextResponse(null, { status: 204 });
}
```

## Migrations

### Creating Migrations
```bash
# Create migration from schema changes
npx prisma migrate dev --name init

# Apply migrations
npx prisma migrate deploy

# Reset database (dev only)
npx prisma migrate reset
```

### Migration Files
```sql
-- migrations/20240101000000_init/migration.sql
CREATE TABLE `User` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(191) NOT NULL,
  `name` VARCHAR(191),
  PRIMARY KEY (`id`),
  UNIQUE (`email`)
);
```

## Seeding Data

### Seed Script
```typescript
// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create users
  const alice = await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      email: 'alice@prisma.io',
      name: 'Alice',
      posts: {
        create: {
          title: 'Check out Prisma with Next.js',
          content: 'https://www.prisma.io/nextjs',
          published: true,
        },
      },
    },
  });
  
  console.log({ alice });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

### Package.json Configuration
```json
{
  "prisma": {
    "seed": "ts-node prisma/seed.ts"
  },
  "scripts": {
    "db:seed": "prisma db seed"
  }
}
```

## Best Practices

### 1. Use Singleton Pattern
Prevent multiple Prisma Client instances in development.

### 2. Handle Errors Properly
```typescript
try {
  const user = await prisma.user.create({ data });
} catch (error) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      // Unique constraint violation
      return { error: 'Email already exists' };
    }
  }
  throw error;
}
```

### 3. Use Transactions for Related Operations
Ensure data consistency with transactions.

### 4. Optimize Queries
```typescript
// Use select to fetch only needed fields
const users = await prisma.user.findMany({
  select: {
    id: true,
    email: true,
  },
});

// Use include wisely
const user = await prisma.user.findUnique({
  where: { id },
  include: {
    posts: {
      where: { published: true },
      take: 5,
    },
  },
});
```

### 5. Type Safety
```typescript
// Use generated types
import { User, Post, Prisma } from '@prisma/client';

// Input types
type UserCreateInput = Prisma.UserCreateInput;
type UserWhereInput = Prisma.UserWhereInput;
```

## Common Issues & Solutions

### Connection Issues
```bash
# Test connection
npx prisma db pull

# Check DATABASE_URL format
# MySQL: mysql://USER:PASSWORD@HOST:PORT/DATABASE
# PostgreSQL: postgresql://USER:PASSWORD@HOST:PORT/DATABASE
```

### Migration Issues
```bash
# Baseline existing database
npx prisma db pull
npx prisma migrate dev --name init

# Fix migration conflicts
npx prisma migrate resolve
```

### Type Generation
```bash
# Regenerate Prisma Client
npx prisma generate

# Add to build script
"build": "prisma generate && next build"
```

## Prisma Studio

### Launch Studio
```bash
npx prisma studio
```

Features:
- Visual database browser
- Edit data directly
- Filter and sort
- View relations
- Export data

## Resources

- [Official Docs](https://www.prisma.io/docs)
- [Prisma with Next.js](https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices)
- [Prisma Playground](https://playground.prisma.io)
- [Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)
- [Error Reference](https://www.prisma.io/docs/reference/api-reference/error-reference)