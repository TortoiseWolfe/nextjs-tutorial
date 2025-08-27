# Key Concepts - Next.js Course

## Core Next.js Concepts

### Server-Side Rendering (SSR)
**What**: Pages are rendered on the server before sending to client  
**Why**: Better SEO, faster initial load, smaller bundle sizes  
**When**: Default for all components unless marked with "use client"  

### Client-Side Rendering (CSR)
**What**: JavaScript runs in the browser to render content  
**Why**: Interactive features, state management, browser APIs  
**When**: Components marked with "use client" directive  

### App Router
**What**: File-based routing system in the app directory  
**Why**: Simplified routing, better code organization, layouts support  
**How**: Directory structure maps to URL structure  

### React Server Components (RSC)
**What**: Components that render on the server only  
**Why**: Direct database access, secure API keys, smaller bundles  
**Default**: All components are server components unless specified  

### Data Fetching Patterns

#### Static Generation (SG)
- Pages built at build time
- Cached and served from CDN
- Best for content that doesn't change often

#### Dynamic Rendering
- Pages rendered on each request
- Fresh data on every load
- Used when data changes frequently

#### Incremental Static Regeneration (ISR)
- Static pages that update after deployment
- Best of both worlds: speed + freshness
- Revalidate on time intervals

## Component Patterns

### Server Components
```tsx
// No "use client" - runs on server
async function ServerComponent() {
  const data = await fetchData(); // Direct DB access OK
  return <div>{data}</div>;
}
```

### Client Components
```tsx
"use client";
// Runs in browser - has access to hooks
function ClientComponent() {
  const [state, setState] = useState();
  return <button onClick={handleClick}>Click</button>;
}
```

### Hybrid Approach
```tsx
// Server component wrapper
async function Page() {
  const data = await fetchData();
  return <ClientInteractivity initialData={data} />;
}
```

## Routing Concepts

### Dynamic Routes
- `[id]` - Single dynamic segment
- `[...slug]` - Catch-all segments
- `[[...slug]]` - Optional catch-all

### Route Groups
- `(folder)` - Organize without affecting URL
- Useful for layouts and organization

### Parallel Routes
- `@folder` - Render multiple pages simultaneously
- Used for modals, sidebars

### Intercepting Routes
- `(.)` - Intercept same level
- `(..)` - Intercept one level up
- Used for modals over content

## Rendering Strategies

### Streaming
- Send HTML in chunks as it's ready
- Better perceived performance
- Loading states for slow parts

### Suspense Boundaries
```tsx
<Suspense fallback={<Loading />}>
  <SlowComponent />
</Suspense>
```

### Error Boundaries
```tsx
// error.tsx
export default function Error({ error, reset }) {
  return <div>Something went wrong!</div>;
}
```

## Caching Layers

### Request Memoization
- Deduplicates identical requests
- Within single render pass
- Automatic optimization

### Data Cache
- Caches fetch results
- Persists across requests
- Revalidation strategies

### Full Route Cache
- Entire HTML/RSC payload
- Static routes at build time
- Fastest possible serving

### Router Cache
- Client-side navigation cache
- Instant back/forward
- Prefetching optimization

## TypeScript Integration

### Type Safety Benefits
- Catch errors at compile time
- Better IDE support
- Self-documenting code
- Refactoring confidence

### Common Patterns
```tsx
// Props typing
interface Props {
  title: string;
  count?: number;
}

// API response typing
type ApiResponse = {
  data: User[];
  error?: string;
};

// Form data typing
interface FormData {
  email: string;
  password: string;
}
```

## Performance Optimization

### Code Splitting
- Automatic with App Router
- Route-based splitting
- Dynamic imports for heavy components

### Image Optimization
```tsx
import Image from 'next/image';

<Image 
  src="/hero.jpg" 
  alt="Hero" 
  width={1200} 
  height={600}
  priority // Load eagerly for above-fold
/>
```

### Font Optimization
```tsx
import { Inter } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap' 
});
```

## SEO Fundamentals

### Metadata API
```tsx
export const metadata = {
  title: 'Page Title',
  description: 'Page description',
  openGraph: {
    title: 'OG Title',
    images: ['/og-image.jpg']
  }
};
```

### Dynamic Metadata
```tsx
export async function generateMetadata({ params }) {
  const product = await getProduct(params.id);
  return {
    title: product.name,
    description: product.description
  };
}
```

## Key Principles

### Progressive Enhancement
- Start with server-rendered HTML
- Layer on client interactivity
- Works without JavaScript

### Islands Architecture
- Most content is static (server)
- Interactive "islands" (client)
- Optimal performance balance

### Composition Over Configuration
- Component composition patterns
- Layouts and templates
- Reusable UI patterns

## Mental Models

### Think Server-First
1. Start with server components
2. Add client only when needed
3. Keep state close to usage
4. Minimize client bundles

### Data Flow
1. Fetch on server when possible
2. Pass data down as props
3. Client fetching for user-specific
4. Cache aggressively

### Performance Budget
1. Measure bundle sizes
2. Monitor Core Web Vitals
3. Optimize critical path
4. Lazy load below fold