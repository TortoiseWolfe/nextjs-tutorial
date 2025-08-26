# Troubleshooting Guide - Ticket 5

## Common Issues and Solutions

### 1. Hydration Errors

#### Error Message
```
Error: Text content does not match. Server: "X" Client: "Y"
```

#### Common Causes
- Date/time rendering differences
- Random values in initial render
- Browser-only APIs used in server components
- Conditional rendering based on typeof window

#### Solutions

```tsx
// ❌ Problem: Date renders differently on server/client
function Component() {
  return <div>{new Date().toLocaleTimeString()}</div>;
}

// ✅ Solution 1: Suppress hydration warning
function Component() {
  return (
    <div suppressHydrationWarning>
      {new Date().toLocaleTimeString()}
    </div>
  );
}

// ✅ Solution 2: Use client component
'use client';
import { useState, useEffect } from 'react';

function Component() {
  const [time, setTime] = useState<string>();
  
  useEffect(() => {
    setTime(new Date().toLocaleTimeString());
  }, []);
  
  return <div>{time || 'Loading...'}</div>;
}

// ✅ Solution 3: Use consistent initial value
function Component() {
  // Use a static value for initial render
  return <div>Current time: {typeof window !== 'undefined' ? new Date().toLocaleTimeString() : 'Loading...'}</div>;
}
```

### 2. "Cannot read properties of undefined"

#### When Accessing Route Params

```tsx
// ❌ Problem: Params might be undefined
export default function Page({ params }) {
  return <h1>{params.slug}</h1>; // Error if params is undefined
}

// ✅ Solution: Add proper typing and checks
interface PageProps {
  params: {
    slug: string;
  };
}

export default function Page({ params }: PageProps) {
  if (!params?.slug) {
    return <div>Loading...</div>;
  }
  
  return <h1>{params.slug}</h1>;
}
```

### 3. "Module not found" Errors

#### Issue: Can't resolve '@/components/...'

```json
// ✅ Solution: Check tsconfig.json or jsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

#### Issue: CSS Module not found

```tsx
// ❌ Problem: Wrong import path
import styles from './component.module.css';

// ✅ Solution: Ensure exact filename match (case-sensitive)
import styles from './Component.module.css';
```

### 4. Client Component Issues

#### "useState is not defined"

```tsx
// ❌ Problem: Missing 'use client' directive
import { useState } from 'react';

function Component() {
  const [count, setCount] = useState(0); // Error!
}

// ✅ Solution: Add directive
'use client';
import { useState } from 'react';

function Component() {
  const [count, setCount] = useState(0); // Works!
}
```

#### "window is not defined"

```tsx
// ❌ Problem: Accessing window in server component
function Component() {
  const width = window.innerWidth; // Error!
}

// ✅ Solution 1: Use client component
'use client';
import { useState, useEffect } from 'react';

function Component() {
  const [width, setWidth] = useState(0);
  
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);
  
  return <div>Width: {width}</div>;
}

// ✅ Solution 2: Check if window exists
function Component() {
  const width = typeof window !== 'undefined' ? window.innerWidth : 0;
  return <div>Width: {width}</div>;
}
```

### 5. Data Fetching Issues

#### "fetch failed"

```tsx
// ❌ Problem: Using relative URLs in server components
async function Component() {
  const res = await fetch('/api/data'); // Fails - no origin
}

// ✅ Solution: Use absolute URLs
async function Component() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/data`);
  // OR for external APIs
  const res = await fetch('https://api.example.com/data');
}
```

#### Data not updating

```tsx
// ❌ Problem: Cached forever
async function Component() {
  const res = await fetch('https://api.example.com/data');
  // Data never updates
}

// ✅ Solution: Add revalidation
async function Component() {
  const res = await fetch('https://api.example.com/data', {
    next: { revalidate: 60 } // Revalidate every 60 seconds
  });
  // OR
  const res = await fetch('https://api.example.com/data', {
    cache: 'no-store' // Always fetch fresh
  });
}
```

### 6. Layout Issues

#### Layout not applying

```tsx
// ❌ Problem: Wrong file location
// app/blog/layout.tsx (wrong location)

// ✅ Solution: Correct file structure
// app/blog/layout.tsx (correct - applies to all blog pages)
// app/blog/[slug]/layout.tsx (applies only to individual posts)
```

#### Nested layouts not working

```tsx
// ✅ Ensure proper nesting
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body> {/* Must render children */}
    </html>
  );
}

// app/blog/layout.tsx
export default function BlogLayout({ children }) {
  return (
    <div className="blog">
      <BlogSidebar />
      {children} {/* Must render children */}
    </div>
  );
}
```

### 7. Loading State Issues

#### Loading not showing

```tsx
// ❌ Problem: No async operation
export default function Page() {
  return <div>Content</div>; // loading.tsx won't trigger
}

// ✅ Solution: Make component async
export default async function Page() {
  const data = await fetchData(); // Now loading.tsx works
  return <div>{data}</div>;
}
```

#### Loading showing too long

```tsx
// ✅ Solution: Use Suspense for granular control
import { Suspense } from 'react';

export default function Page() {
  return (
    <div>
      <Header /> {/* Shows immediately */}
      <Suspense fallback={<Loading />}>
        <SlowComponent /> {/* Only this part shows loading */}
      </Suspense>
    </div>
  );
}
```

### 8. Error Boundary Issues

#### Error boundary not catching errors

```tsx
// ❌ Problem: Error in event handler
'use client';
function Component() {
  const handleClick = () => {
    throw new Error('Oops!'); // Won't be caught by error.tsx
  };
  
  return <button onClick={handleClick}>Click</button>;
}

// ✅ Solution: Use try-catch in event handlers
'use client';
function Component() {
  const handleClick = () => {
    try {
      // risky operation
    } catch (error) {
      console.error(error);
      // Handle error in UI
    }
  };
  
  return <button onClick={handleClick}>Click</button>;
}
```

### 9. TypeScript Issues

#### "Type error: Cannot find name 'React'"

```tsx
// ✅ Solution: Import React (if needed)
import React from 'react';

// OR update tsconfig.json
{
  "compilerOptions": {
    "jsx": "react-jsx" // Modern JSX transform
  }
}
```

#### Params type errors

```tsx
// ✅ Proper typing for page props
interface PageProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Page({ params, searchParams }: PageProps) {
  // TypeScript happy!
}
```

### 10. API Route Issues

#### "405 Method Not Allowed"

```tsx
// ❌ Problem: Handler not exported for method
// app/api/users/route.ts
export async function GET() { /* ... */ }
// POST request will fail with 405

// ✅ Solution: Export all needed methods
export async function GET() { /* ... */ }
export async function POST() { /* ... */ }
export async function PUT() { /* ... */ }
export async function DELETE() { /* ... */ }
```

#### CORS Issues

```tsx
// ✅ Solution: Add CORS headers
import { NextResponse } from 'next/server';

export async function GET() {
  const response = NextResponse.json({ data: 'example' });
  
  // Add CORS headers
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  return response;
}
```

## Debug Techniques

### 1. Check Component Type
```tsx
// Add console logs to understand rendering
export default function Component() {
  console.log('Rendering on:', typeof window === 'undefined' ? 'server' : 'client');
  return <div>Component</div>;
}
```

### 2. Verify File Structure
```bash
# Use tree command to verify structure
tree app -I 'node_modules'
```

### 3. Check Build Output
```bash
# Build and analyze
npm run build

# Look for:
# - Route types (λ, ○, ●)
# - Bundle sizes
# - Error messages
```

### 4. Enable Debug Mode
```js
// next.config.js
module.exports = {
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};
```

## Prevention Tips

1. **Always type your components** - Catch errors at compile time
2. **Use 'use client' sparingly** - Only when needed
3. **Test loading states** - Add artificial delays during development
4. **Handle errors gracefully** - Always have error boundaries
5. **Check server logs** - Console logs from server components appear in terminal
6. **Use TypeScript strictly** - Enable strict mode in tsconfig.json

## When to Ask for Help

If you've tried the solutions above and still have issues:

1. Check the [Next.js Discord](https://discord.gg/nextjs)
2. Search [GitHub Issues](https://github.com/vercel/next.js/issues)
3. Ask in [Mosh's Forum](https://forum.codewithmosh.com)
4. Create a minimal reproduction

Remember: Most issues in Ticket 5 are about understanding server vs client components!