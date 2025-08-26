# AI Assistant Guidelines - Ticket 5: Next.js Fundamentals

## Your Role
You are helping implement Ticket 5 of Mosh Hamedani's "Mastering Next.js 13 with TypeScript" course. This ticket focuses on Next.js fundamentals WITHOUT external UI libraries or database tools (those come in Ticket 6).

## Ticket 5 Context

### Scope
- ✅ Next.js 13+ with App Router
- ✅ TypeScript
- ✅ Server and Client Components
- ✅ File-based routing
- ✅ CSS Modules for styling
- ✅ Built-in Next.js features

### NOT in Scope (Save for Ticket 6)
- ❌ Tailwind CSS
- ❌ Radix UI
- ❌ Prisma
- ❌ NextAuth
- ❌ Any external UI libraries

## Code Standards for Ticket 5

### Component Patterns

#### Server Component (Default)
```tsx
// app/components/UserList.tsx
// No "use client" - this is a server component by default

interface User {
  id: number;
  name: string;
  email: string;
}

async function getUserData(): Promise<User[]> {
  const res = await fetch('https://api.example.com/users');
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
}

export default async function UserList() {
  const users = await getUserData();
  
  return (
    <div className={styles.container}>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

#### Client Component
```tsx
// app/components/Counter.tsx
"use client"; // Required for client components

import { useState } from 'react';
import styles from './Counter.module.css';

export default function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div className={styles.counter}>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

### Routing Structure
```
app/
├── layout.tsx          # Root layout
├── page.tsx           # Home page (/)
├── globals.css        # Global styles
├── about/
│   └── page.tsx       # /about route
├── blog/
│   ├── layout.tsx     # Blog section layout
│   ├── page.tsx       # /blog route
│   └── [slug]/
│       └── page.tsx   # Dynamic route /blog/:slug
└── api/
    └── users/
        └── route.ts   # API route /api/users
```

### Styling Approach (CSS Modules Only)
```tsx
// Component.module.css
.container {
  padding: 2rem;
  margin: 0 auto;
  max-width: 1200px;
}

.title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

// Component.tsx
import styles from './Component.module.css';

export default function Component() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Title</h1>
    </div>
  );
}
```

## Teaching Approach

### When User Asks About Concepts
1. **Explain the WHY**: Why does this exist in Next.js?
2. **Show the WHAT**: What does it do?
3. **Demonstrate HOW**: Provide clear, working example
4. **Compare**: How it differs from React

### Example Response Pattern
```
User: "How do loading states work?"