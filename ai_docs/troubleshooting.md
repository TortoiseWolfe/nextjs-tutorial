# Troubleshooting Guide

## Common Next.js Issues

### Hydration Errors

#### Problem
"Text content does not match server-rendered HTML"

#### Causes
- Date/time rendering differences
- Random values
- Browser-only APIs in SSR
- Conditional rendering based on client state

#### Solutions
```tsx
// ❌ Bad: Will cause hydration mismatch
function Component() {
  return <div>{new Date().toLocaleString()}</div>;
}

// ✅ Good: Use useEffect for client-only values
function Component() {
  const [date, setDate] = useState<string>('');
  
  useEffect(() => {
    setDate(new Date().toLocaleString());
  }, []);
  
  return <div>{date}</div>;
}

// ✅ Good: Or suppress hydration
return (
  <div suppressHydrationWarning>
    {new Date().toLocaleString()}
  </div>
);
```

### Module Not Found Errors

#### Problem
"Module not found: Can't resolve 'xyz'"

#### Solutions
1. Check import paths (case-sensitive on Linux/Mac)
2. Ensure package is installed: `npm install xyz`
3. Clear cache: `rm -rf .next && npm run dev`
4. Check tsconfig.json paths:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Client Component Issues

#### Problem
"useState is not defined" or hooks not working

#### Solution
Add "use client" directive:
```tsx
"use client"; // Must be at the top

import { useState } from 'react';

export function Component() {
  const [state, setState] = useState();
  // ...
}
```

### Server Component Async Issues

#### Problem
"Objects are not valid as a React child"

#### Solution
Server components can be async, but must be awaited properly:
```tsx
// ❌ Bad: Returning promise
function Page() {
  return fetch('/api/data'); // Returns promise
}

// ✅ Good: Await the data
async function Page() {
  const data = await fetch('/api/data');
  return <div>{data}</div>;
}
```

## TypeScript Issues

### Type Errors with Next.js

#### Problem
"Type error: Cannot find name 'JSX'"

#### Solution
Ensure correct TypeScript configuration:
```json
// tsconfig.json
{
  "compilerOptions": {
    "jsx": "preserve",
    "lib": ["dom", "dom.iterable", "esnext"],
    "module": "esnext",
    "moduleResolution": "bundler"
  }
}
```

### Async Component Types

#### Problem
TypeScript errors with async server components

#### Solution
```tsx
// Define proper types for async components
interface PageProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Page({ params, searchParams }: PageProps) {
  // Component logic
}
```

## Styling Issues

### CSS Modules Not Working

#### Problem
Styles not applying from `.module.css` files

#### Solution
```tsx
// ❌ Bad: Wrong import
import './styles.module.css';

// ✅ Good: Import as module
import styles from './styles.module.css';

// Use with className
<div className={styles.container}>
```

### Tailwind Classes Not Working

#### Problem
Tailwind classes not applying

#### Solutions
1. Check tailwind.config.js content paths:
```javascript
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
}
```

2. Avoid dynamic class names:
```tsx
// ❌ Bad: Dynamic classes won't work
<div className={`text-${color}-500`}>

// ✅ Good: Use complete class names
const colorClasses = {
  red: 'text-red-500',
  blue: 'text-blue-500'
};
<div className={colorClasses[color]}>
```

## Database/Prisma Issues

### Prisma Client Not Generated

#### Problem
"Cannot find module '@prisma/client'"

#### Solution
```bash
# Generate Prisma client
npx prisma generate

# If schema changed, migrate first
npx prisma migrate dev
```

### Database Connection Errors

#### Problem
"Can't reach database server"

#### Solutions
1. Check DATABASE_URL in .env
2. Ensure database is running
3. For development, use connection pool:
```javascript
// lib/prisma.ts
const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
```

## API Route Issues

### 405 Method Not Allowed

#### Problem
API route returning 405 error

#### Solution
Export the correct HTTP method handlers:
```tsx
// app/api/route.ts
export async function GET(request: Request) { }
export async function POST(request: Request) { }
export async function PUT(request: Request) { }
export async function DELETE(request: Request) { }
```

### CORS Errors

#### Problem
"Access to fetch at 'x' from origin 'y' has been blocked by CORS"

#### Solution
Add CORS headers:
```tsx
// app/api/route.ts
export async function GET(request: Request) {
  const response = NextResponse.json({ data });
  
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  
  return response;
}
```

## Build & Deployment Issues

### Build Failures

#### Problem
"Build error occurred"

#### Common Solutions
1. Check for missing environment variables
2. Ensure all imports are correct
3. No browser-only code in server components
4. Run locally first: `npm run build`

### Memory Issues

#### Problem
"JavaScript heap out of memory"

#### Solution
Increase Node memory:
```json
// package.json
{
  "scripts": {
    "build": "NODE_OPTIONS='--max-old-space-size=4096' next build"
  }
}
```

## Environment Variable Issues

### Variables Not Loading

#### Problem
Environment variables undefined

#### Solutions
1. Use correct naming: `NEXT_PUBLIC_` for client-side
2. Restart dev server after changing .env
3. Check .env.local for local overrides
4. Never commit .env files with secrets

```tsx
// Client-side (must have NEXT_PUBLIC_ prefix)
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Server-side (any name)
const secretKey = process.env.SECRET_KEY;
```

## Development Workflow Issues

### Hot Reload Not Working

#### Problem
Changes not reflecting in browser

#### Solutions
1. Clear .next folder: `rm -rf .next`
2. Restart dev server
3. Check for syntax errors
4. Disable browser cache in dev tools

### Port Already in Use

#### Problem
"Port 3000 is already in use"

#### Solutions
```bash
# Find process using port
lsof -i :3000

# Kill process
kill -9 [PID]

# Or use different port
npm run dev -- -p 3001
```

## Performance Issues

### Slow Initial Load

#### Problem
App takes long to load initially

#### Solutions
1. Check bundle size: `npm run build && npm run analyze`
2. Lazy load heavy components
3. Optimize images with next/image
4. Use static generation where possible

### Memory Leaks

#### Problem
App becomes slow over time

#### Common Causes & Solutions
1. Event listeners not cleaned up
2. Timers not cleared
3. Large data in global scope

```tsx
useEffect(() => {
  const timer = setInterval(() => {}, 1000);
  
  // Cleanup function
  return () => clearInterval(timer);
}, []);
```

## Debugging Tips

### Enable Verbose Logging
```javascript
// next.config.js
module.exports = {
  logging: {
    fetches: {
      fullUrl: true
    }
  }
};
```

### Use React DevTools
- Install browser extension
- Check component props
- Monitor re-renders
- Profile performance

### Debug Server Components
```tsx
// Add console.logs (appear in terminal, not browser)
export default async function Page() {
  console.log('Server component rendering');
  const data = await fetchData();
  console.log('Data fetched:', data);
  return <div>{/* ... */}</div>;
}
```

### Debug Build Issues
```bash
# Build with verbose output
npm run build -- --debug

# Analyze bundle
npm install @next/bundle-analyzer
npm run analyze
```