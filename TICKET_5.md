# Ticket 5: Next.js Fundamentals - Detailed Notes

## Repository: Tkt_005
**Focus**: Core Next.js concepts without external libraries  
**Goal**: Master fundamentals before adding tools in Ticket 6

## 🎯 Learning Objectives Breakdown

### 1. React → Next.js Transition

#### Key Differences
| React | Next.js |
|-------|---------|
| Client-side rendering | Server-first rendering |
| React Router needed | File-based routing built-in |
| Manual optimization | Automatic optimizations |
| Separate API needed | API routes included |
| Manual code splitting | Automatic code splitting |

#### Mental Model Shift
```tsx
// React way (client-side)
useEffect(() => {
  fetch('/api/data')
    .then(res => res.json())
    .then(setData);
}, []);

// Next.js way (server component)
async function Component() {
  const data = await fetch('https://api.example.com/data');
  return <div>{data}</div>;
}
```

### 2. File-Based Routing Deep Dive

#### Basic Structure
```
app/
├── page.tsx                 # / (home)
├── about/
│   └── page.tsx            # /about
├── blog/
│   ├── page.tsx            # /blog
│   ├── [slug]/
│   │   └── page.tsx        # /blog/[slug] (dynamic)
│   └── [...segments]/
│       └── page.tsx        # /blog/a/b/c (catch-all)
├── (marketing)/            # Route group (no URL impact)
│   ├── layout.tsx
│   ├── about/
│   └── contact/
└── @modal/                 # Parallel route
    └── page.tsx
```

#### Special Files
- `page.tsx` - Defines a route
- `layout.tsx` - Shared UI for segment and children
- `loading.tsx` - Loading UI
- `error.tsx` - Error boundary
- `not-found.tsx` - 404 page
- `template.tsx` - Similar to layout but re-renders

### 3. Server vs Client Components

#### Decision Tree
```
Need interactivity (onClick, onChange)? → Client Component
Need useState, useEffect? → Client Component
Need browser APIs? → Client Component
Need to fetch data? → Server Component (preferred)
Need to access backend? → Server Component
Large dependencies? → Server Component
```

#### Server Component Benefits
- Smaller bundle size
- Direct database access
- Better SEO
- Secure API keys
- Faster initial load

#### Client Component Use Cases
- Forms with state
- Interactive charts
- Third-party client libraries
- Custom hooks
- Browser-only features

### 4. Data Fetching Patterns

#### Server Component Fetching
```tsx
// Direct in component (recommended)
async function ProductList() {
  const products = await fetch('https://api.example.com/products', {
    next: { revalidate: 60 } // ISR: revalidate every 60 seconds
  });
  
  return (
    <ul>
      {products.map(p => <li key={p.id}>{p.name}</li>)}
    </ul>
  );
}
```

#### Parallel Data Fetching
```tsx
async function Page() {
  // Start fetches in parallel
  const usersPromise = fetchUsers();
  const postsPromise = fetchPosts();
  
  // Wait for both
  const [users, posts] = await Promise.all([
    usersPromise,
    postsPromise
  ]);
  
  return (
    <>
      <UserList users={users} />
      <PostList posts={posts} />
    </>
  );
}
```

### 5. Layout System

#### Root Layout (Required)
```tsx
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav>Global Navigation</nav>
        {children}
        <footer>Global Footer</footer>
      </body>
    </html>
  );
}
```

#### Nested Layouts
```tsx
// app/blog/layout.tsx
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="blog-layout">
      <aside>Blog Sidebar</aside>
      <main>{children}</main>
    </div>
  );
}
```

### 6. Loading & Error States

#### Loading State
```tsx
// app/blog/loading.tsx
export default function Loading() {
  return (
    <div className="loading-spinner">
      <p>Loading blog posts...</p>
    </div>
  );
}
```

#### Error Boundary
```tsx
// app/blog/error.tsx
'use client'; // Error components must be client components

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
```

### 7. API Routes (App Router)

#### Basic API Route
```tsx
// app/api/users/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const users = await getUsersFromDB();
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newUser = await createUser(body);
  return NextResponse.json(newUser, { status: 201 });
}
```

#### Dynamic API Route
```tsx
// app/api/users/[id]/route.ts
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = await getUser(params.id);
  if (!user) {
    return NextResponse.json(
      { error: 'User not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(user);
}
```

## 🔧 Common Patterns

### Pattern 1: Composition with Server/Client
```tsx
// Server Component (parent)
async function ProductPage() {
  const product = await getProduct();
  
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <AddToCartButton productId={product.id} />
    </div>
  );
}

// Client Component (child)
'use client';
function AddToCartButton({ productId }: { productId: string }) {
  return <button onClick={() => addToCart(productId)}>Add to Cart</button>;
}
```

### Pattern 2: Streaming with Suspense
```tsx
import { Suspense } from 'react';

function Page() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<Loading />}>
        <SlowDataComponent />
      </Suspense>
    </div>
  );
}
```

### Pattern 3: Metadata API
```tsx
// app/blog/[slug]/page.tsx
export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}
```

## 🚨 Common Pitfalls

### 1. Hydration Mismatch
**Problem**: Server and client render differently  
**Solution**: Ensure consistent initial render
```tsx
// Bad
<div>{new Date().toLocaleString()}</div>

// Good
<div suppressHydrationWarning>{new Date().toLocaleString()}</div>
```

### 2. Using Client Components Unnecessarily
**Problem**: Making everything client components  
**Solution**: Default to server, use client only when needed

### 3. Incorrect Data Fetching
**Problem**: Fetching in client when server is better  
**Solution**: Fetch in server components when possible

### 4. Missing Loading States
**Problem**: No feedback during data fetching  
**Solution**: Always add loading.tsx or Suspense

## ✅ Checklist Before Ticket 6

### Conceptual Understanding
- [ ] I understand why server components are default
- [ ] I know when to use client components
- [ ] I can explain file-based routing
- [ ] I understand the layout system
- [ ] I know how data fetching works

### Practical Implementation
- [ ] Created multiple routes (static and dynamic)
- [ ] Implemented both server and client components
- [ ] Added loading and error states
- [ ] Created API routes
- [ ] Used CSS Modules for styling
- [ ] Implemented layouts at multiple levels

### Ready for Ticket 6 Indicators
- [ ] Comfortable with Next.js project structure
- [ ] Can build features without external libraries
- [ ] Understand component boundaries
- [ ] Know how to debug common issues
- [ ] Ready to add Tailwind, Radix, Prisma

## 📝 Mosh's Key Quotes

> "It's not just React with routing"

> "Don't make everything a client component"

> "Loading states are not optional"

> "Understand before you copy"

> "Master the fundamentals first"

## 🎯 Success Metrics

You've mastered Ticket 5 when you can:
1. Build a multi-page app with just Next.js
2. Explain server vs client components to someone else
3. Implement data fetching without useEffect
4. Create proper loading and error boundaries
5. Structure routes using the file system

---

**Next Step**: Once all checkboxes are complete, move to Ticket 6 for full-stack enhancement with Tailwind, Radix, and Prisma!