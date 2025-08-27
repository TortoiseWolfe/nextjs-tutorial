# Code Patterns and Best Practices

## Component Organization

### File Structure Pattern
```
app/
├── (auth)/           # Route group for auth pages
│   ├── login/
│   └── register/
├── dashboard/
│   ├── components/   # Page-specific components
│   ├── layout.tsx    # Dashboard layout
│   └── page.tsx      # Dashboard page
├── components/       # Shared components
│   ├── ui/          # Basic UI components
│   └── features/    # Feature components
└── lib/             # Utilities and helpers
```

### Component Naming Convention
- PascalCase for components: `UserProfile.tsx`
- camelCase for utilities: `formatDate.ts`
- kebab-case for routes: `user-profile/page.tsx`

## Server Component Patterns

### Data Fetching Pattern
```tsx
// ✅ Good: Fetch in server component
export default async function ProductPage({ params }) {
  const product = await getProduct(params.id);
  
  return (
    <div>
      <h1>{product.name}</h1>
      <ProductActions product={product} />
    </div>
  );
}
```

### Parallel Data Fetching
```tsx
// ✅ Good: Parallel fetching
export default async function Dashboard() {
  // Start all fetches simultaneously
  const userPromise = getUser();
  const postsPromise = getPosts();
  const statsPromise = getStats();
  
  // Wait for all to complete
  const [user, posts, stats] = await Promise.all([
    userPromise,
    postsPromise,
    statsPromise
  ]);
  
  return <DashboardLayout {...{user, posts, stats}} />;
}
```

## Client Component Patterns

### State Management Pattern
```tsx
"use client";

export function Counter() {
  const [count, setCount] = useState(0);
  
  // Keep logic close to state
  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  
  return (
    <div>
      <button onClick={decrement}>-</button>
      <span>{count}</span>
      <button onClick={increment}>+</button>
    </div>
  );
}
```

### Form Handling Pattern
```tsx
"use client";

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const formData = new FormData(e.currentTarget);
      await submitForm(formData);
      setStatus('success');
    } catch (error) {
      setStatus('error');
    }
  }
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button disabled={status === 'loading'}>
        {status === 'loading' ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
}
```

## API Route Patterns

### RESTful API Pattern
```tsx
// app/api/products/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '1';
  
  const products = await getProducts({ page });
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const body = await request.json();
  
  // Validate input
  const validated = productSchema.parse(body);
  
  const product = await createProduct(validated);
  return NextResponse.json(product, { status: 201 });
}
```

### Error Handling Pattern
```tsx
// app/api/protected/route.ts
export async function GET(request: Request) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const data = await fetchProtectedData();
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
```

## Layout Patterns

### Nested Layout Pattern
```tsx
// app/dashboard/layout.tsx
export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="dashboard">
      <Sidebar />
      <main className="dashboard-content">
        {children}
      </main>
    </div>
  );
}
```

### Conditional Layout Pattern
```tsx
// app/layout.tsx
export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const session = await getSession();
  
  return (
    <html>
      <body>
        {session ? <AuthenticatedNav /> : <PublicNav />}
        {children}
      </body>
    </html>
  );
}
```

## Loading State Patterns

### Skeleton Pattern
```tsx
// app/products/loading.tsx
export default function Loading() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="bg-gray-300 h-48 rounded" />
          <div className="bg-gray-300 h-4 mt-2 rounded" />
          <div className="bg-gray-300 h-4 mt-1 w-2/3 rounded" />
        </div>
      ))}
    </div>
  );
}
```

### Streaming Pattern
```tsx
// app/page.tsx
import { Suspense } from 'react';

export default function Page() {
  return (
    <div>
      <h1>Dashboard</h1>
      
      <Suspense fallback={<StatsSkeleton />}>
        <Stats />
      </Suspense>
      
      <Suspense fallback={<ChartSkeleton />}>
        <Chart />
      </Suspense>
      
      <Suspense fallback={<TableSkeleton />}>
        <RecentActivity />
      </Suspense>
    </div>
  );
}
```

## Error Handling Patterns

### Error Boundary Pattern
```tsx
// app/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  
  return (
    <div className="error-container">
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

### Not Found Pattern
```tsx
// app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="not-found">
      <h2>404 - Page Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
```

## Database Patterns (Prisma)

### Singleton Pattern
```tsx
// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
```

### Repository Pattern
```tsx
// lib/repositories/user.ts
import { prisma } from '@/lib/prisma';

export async function getUsers() {
  return prisma.user.findMany();
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id }
  });
}

export async function createUser(data: UserInput) {
  return prisma.user.create({ data });
}
```

## Validation Patterns

### Zod Schema Pattern
```tsx
// lib/validations/product.ts
import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  price: z.number().positive(),
  stock: z.number().int().min(0)
});

export type ProductInput = z.infer<typeof productSchema>;
```

### Form Validation Pattern
```tsx
"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export function ProductForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ProductInput>({
    resolver: zodResolver(productSchema)
  });
  
  const onSubmit = async (data: ProductInput) => {
    // Handle validated data
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} />
      {errors.name && <span>{errors.name.message}</span>}
      {/* More fields */}
    </form>
  );
}
```

## Performance Patterns

### Dynamic Import Pattern
```tsx
// Lazy load heavy component
import dynamic from 'next/dynamic';

const HeavyChart = dynamic(
  () => import('@/components/HeavyChart'),
  { 
    loading: () => <p>Loading chart...</p>,
    ssr: false // Disable SSR if using browser-only features
  }
);
```

### Memoization Pattern
```tsx
"use client";

import { useMemo } from 'react';

export function ExpensiveList({ items, filter }) {
  const filteredItems = useMemo(
    () => items.filter(item => item.name.includes(filter)),
    [items, filter]
  );
  
  return (
    <ul>
      {filteredItems.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

## Security Patterns

### Authentication Check Pattern
```tsx
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/dashboard/:path*'
};
```

### Environment Variables Pattern
```tsx
// lib/config.ts
const requiredEnvVars = [
  'DATABASE_URL',
  'NEXTAUTH_SECRET',
  'NEXTAUTH_URL'
] as const;

// Validate on startup
requiredEnvVars.forEach(varName => {
  if (!process.env[varName]) {
    throw new Error(`Missing required environment variable: ${varName}`);
  }
});

export const config = {
  databaseUrl: process.env.DATABASE_URL!,
  authSecret: process.env.NEXTAUTH_SECRET!,
  authUrl: process.env.NEXTAUTH_URL!
};