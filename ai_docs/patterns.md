# Code Patterns & Best Practices - Ticket 5

## Server Component Patterns

### Pattern 1: Direct Data Fetching
```tsx
// ✅ Good: Fetch directly in server component
async function ProductList() {
  const products = await fetch('https://api.example.com/products');
  return <ProductGrid products={products} />;
}

// ❌ Bad: Using useEffect in client component
'use client';
function ProductList() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch('/api/products').then(/*...*/);
  }, []);
}
```

### Pattern 2: Parallel Data Fetching
```tsx
// ✅ Good: Parallel fetching
async function DashboardPage() {
  // Start all fetches simultaneously
  const statsPromise = fetchStats();
  const usersPromise = fetchUsers();
  const activityPromise = fetchActivity();
  
  // Wait for all to complete
  const [stats, users, activity] = await Promise.all([
    statsPromise,
    usersPromise,
    activityPromise
  ]);
  
  return (
    <>
      <StatsCard data={stats} />
      <UsersList users={users} />
      <ActivityFeed activity={activity} />
    </>
  );
}

// ❌ Bad: Sequential fetching
async function DashboardPage() {
  const stats = await fetchStats();
  const users = await fetchUsers();
  const activity = await fetchActivity();
  // Each waits for previous to complete
}
```

### Pattern 3: Component Composition
```tsx
// ✅ Good: Server parent with client children
// ParentComponent.tsx (Server Component)
async function ArticlePage({ slug }: { slug: string }) {
  const article = await getArticle(slug);
  
  return (
    <article>
      <h1>{article.title}</h1>
      <p>{article.content}</p>
      <LikeButton articleId={article.id} />
      <CommentSection articleId={article.id} />
    </article>
  );
}

// LikeButton.tsx (Client Component)
'use client';
import { useState } from 'react';

export function LikeButton({ articleId }: { articleId: string }) {
  const [liked, setLiked] = useState(false);
  return (
    <button onClick={() => setLiked(!liked)}>
      {liked ? '❤️' : '🤍'} Like
    </button>
  );
}
```

## Client Component Patterns

### Pattern 4: Client Component Boundaries
```tsx
// ✅ Good: Minimal client component boundary
'use client';
// Only the interactive part is a client component
export function SearchBar() {
  const [query, setQuery] = useState('');
  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search..."
    />
  );
}

// ❌ Bad: Entire page as client component
'use client';
export default function EntirePage() {
  // Making entire page client when only search needs interactivity
  return (
    <div>
      <Header />
      <SearchBar />
      <StaticContent />
      <Footer />
    </div>
  );
}
```

### Pattern 5: Props from Server to Client
```tsx
// ✅ Good: Serializable props only
// Server Component
async function Page() {
  const user = await getUser(); // Returns { id, name, email }
  return <ClientComponent user={user} />;
}

// ❌ Bad: Non-serializable props
async function Page() {
  const user = await getUser();
  // Functions can't be passed to client components
  return <ClientComponent 
    user={user}
    onUpdate={() => updateUser()} // ❌ Functions can't serialize
  />;
}
```

## Routing Patterns

### Pattern 6: Dynamic Routes with TypeScript
```tsx
// app/blog/[slug]/page.tsx
interface PageProps {
  params: {
    slug: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default async function BlogPost({ params, searchParams }: PageProps) {
  const post = await getPost(params.slug);
  const page = searchParams.page ?? '1';
  
  return <Article post={post} />;
}

// Generate static params for build time
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map(post => ({
    slug: post.slug,
  }));
}
```

### Pattern 7: Route Groups for Organization
```
app/
├── (marketing)/        # Group without URL impact
│   ├── layout.tsx     # Shared marketing layout
│   ├── page.tsx       # /
│   ├── about/
│   │   └── page.tsx   # /about
│   └── pricing/
│       └── page.tsx   # /pricing
├── (app)/             # Main app group
│   ├── layout.tsx     # Different layout for app
│   ├── dashboard/
│   │   └── page.tsx   # /dashboard
│   └── settings/
│       └── page.tsx   # /settings
```

## Layout Patterns

### Pattern 8: Nested Layouts
```tsx
// app/layout.tsx - Root layout
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

// app/admin/layout.tsx - Admin section layout
export default function AdminLayout({ children }) {
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{children}</main>
    </div>
  );
}

// Composes: RootLayout > AdminLayout > Page
```

### Pattern 9: Template vs Layout
```tsx
// layout.tsx - Persists state between navigations
export default function Layout({ children }) {
  return (
    <div>
      <Sidebar /> {/* State preserved on navigation */}
      {children}
    </div>
  );
}

// template.tsx - Re-renders on navigation
export default function Template({ children }) {
  return (
    <div>
      <AnimatedHeader /> {/* Re-animates on each navigation */}
      {children}
    </div>
  );
}
```

## Loading State Patterns

### Pattern 10: Granular Loading States
```tsx
// ✅ Good: Multiple suspense boundaries
export default function Page() {
  return (
    <div>
      <Suspense fallback={<HeaderSkeleton />}>
        <Header />
      </Suspense>
      
      <div className="grid">
        <Suspense fallback={<SidebarSkeleton />}>
          <Sidebar />
        </Suspense>
        
        <Suspense fallback={<ContentSkeleton />}>
          <MainContent />
        </Suspense>
      </div>
    </div>
  );
}

// ❌ Bad: Single loading state for everything
export default function Page() {
  return (
    <Suspense fallback={<FullPageLoader />}>
      <Header />
      <Sidebar />
      <MainContent />
    </Suspense>
  );
}
```

### Pattern 11: Loading with Skeleton UI
```tsx
// loading.tsx
export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/4 mb-4" />
      <div className="h-4 bg-gray-200 rounded w-full mb-2" />
      <div className="h-4 bg-gray-200 rounded w-3/4" />
    </div>
  );
}
```

## Error Handling Patterns

### Pattern 12: Granular Error Boundaries
```tsx
// app/dashboard/error.tsx
'use client';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  // Log to error reporting service
  useEffect(() => {
    console.error(error);
  }, [error]);
  
  return (
    <div className="error-container">
      <h2>Dashboard Error</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Retry</button>
    </div>
  );
}
```

### Pattern 13: Not Found Handling
```tsx
// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation';

export default async function BlogPost({ params }) {
  const post = await getPost(params.slug);
  
  if (!post) {
    notFound(); // Triggers not-found.tsx
  }
  
  return <Article post={post} />;
}

// app/blog/[slug]/not-found.tsx
export default function NotFound() {
  return (
    <div>
      <h2>Post Not Found</h2>
      <Link href="/blog">Back to Blog</Link>
    </div>
  );
}
```

## API Route Patterns

### Pattern 14: Type-Safe API Routes
```tsx
// app/api/posts/route.ts
import { z } from 'zod';
import { NextResponse } from 'next/server';

// Define schema
const PostSchema = z.object({
  title: z.string().min(1).max(100),
  content: z.string().min(1),
  published: z.boolean().default(false),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate with schema
    const validatedData = PostSchema.parse(body);
    
    // Create post
    const post = await createPost(validatedData);
    
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { errors: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
```

### Pattern 15: API Middleware Pattern
```tsx
// lib/api-middleware.ts
export function withAuth(handler: Function) {
  return async (request: Request, ...args: any[]) => {
    const session = await getSession(request);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    return handler(request, ...args, session);
  };
}

// app/api/protected/route.ts
export const GET = withAuth(async (request, { session }) => {
  // Access session here
  return NextResponse.json({ user: session.user });
});
```

## CSS Module Patterns

### Pattern 16: Component Styles
```css
/* Button.module.css */
.button {
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-weight: 500;
  transition: all 0.2s;
}

.primary {
  background: blue;
  color: white;
}

.secondary {
  background: gray;
  color: white;
}

.button:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
```

```tsx
// Button.tsx
import styles from './Button.module.css';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', children }: ButtonProps) {
  return (
    <button className={`${styles.button} ${styles[variant]}`}>
      {children}
    </button>
  );
}
```

### Pattern 17: Global Styles with CSS Modules
```css
/* app/globals.css */
:root {
  --primary-color: #0070f3;
  --text-color: #333;
  --background: #fff;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: system-ui, -apple-system, sans-serif;
  color: var(--text-color);
  background: var(--background);
}
```

## Performance Patterns

### Pattern 18: Image Optimization
```tsx
import Image from 'next/image';

// ✅ Good: Using Next.js Image component
export function ProductCard({ product }) {
  return (
    <div>
      <Image
        src={product.image}
        alt={product.name}
        width={300}
        height={200}
        loading="lazy"
      />
    </div>
  );
}

// ❌ Bad: Using regular img tag
export function ProductCard({ product }) {
  return <img src={product.image} alt={product.name} />;
}
```

### Pattern 19: Font Optimization
```tsx
// app/layout.tsx
import { Inter, Roboto_Mono } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
});

export default function RootLayout({ children }) {
  return (
    <html className={`${inter.variable} ${robotoMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

## Key Takeaways

1. **Server by default**: Start with server components, add client only when needed
2. **Compose, don't wrap**: Small client components within server components
3. **Parallel over sequential**: Fetch data simultaneously when possible
4. **Granular boundaries**: Suspense and error boundaries at component level
5. **Type everything**: Full TypeScript for safety
6. **CSS Modules for now**: Keep styling simple until Ticket 6 (Tailwind)

Remember: These patterns are for Ticket 5. In Ticket 6, we'll enhance with Tailwind, Radix UI, and Prisma!