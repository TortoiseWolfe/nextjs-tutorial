# Next.js Core Concepts - Ticket 5

## 1. Server Components (Default in App Router)

### What They Are
React components that render on the server and send HTML to the client. They're the default in Next.js 13+ App Router.

### Why They Exist
- **Performance**: Smaller JavaScript bundles (no component code sent to client)
- **Security**: Keep sensitive data and API keys on server
- **SEO**: Full HTML content available for crawlers
- **Direct Data Access**: Can directly query databases

### Key Characteristics
- Can be async functions
- Can fetch data directly
- Cannot use hooks (useState, useEffect)
- Cannot use browser APIs
- Cannot have event handlers

### Example
```tsx
// This is a server component (default, no directive needed)
async function ProductList() {
  // Direct database or API access
  const products = await db.query('SELECT * FROM products');
  
  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}
```

## 2. Client Components

### What They Are
Traditional React components that run in the browser, marked with `"use client"` directive.

### Why They Exist
- **Interactivity**: Handle user events (clicks, input)
- **Browser APIs**: Access window, document, localStorage
- **State Management**: Use hooks like useState, useEffect
- **Third-party Libraries**: Many npm packages require client environment

### Key Characteristics
- Must have `"use client"` directive at top
- Can use all React hooks
- Can have event handlers
- Increase JavaScript bundle size
- Hydrate on client after server render

### Example
```tsx
"use client";

import { useState } from 'react';

function InteractiveCounter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

## 3. File-Based Routing

### What It Is
Your file system structure defines your application routes. No need for a separate router configuration.

### Why It Exists
- **Simplicity**: File structure = URL structure
- **Convention**: Predictable patterns
- **Automatic Code Splitting**: Each route is automatically code-split
- **Type Safety**: TypeScript can infer route params

### Special Files
- `page.tsx` - Makes a route publicly accessible
- `layout.tsx` - Wraps page and nested segments
- `loading.tsx` - Shown while page is loading
- `error.tsx` - Error boundary for the route
- `not-found.tsx` - 404 page for the segment

### Route Types
```
Static:       /about         → app/about/page.tsx
Dynamic:      /blog/[slug]   → app/blog/[slug]/page.tsx
Catch-all:    /docs/[...path] → app/docs/[...path]/page.tsx
Optional:     [[...path]]    → Matches with or without params
Groups:       (marketing)     → Organizational, no URL impact
```

## 4. Layouts

### What They Are
Shared UI that wraps pages and preserves state during navigation.

### Why They Exist
- **Shared UI**: Navigation, sidebars, footers
- **State Preservation**: Don't re-render on navigation
- **Performance**: Only page content changes
- **Nesting**: Compose complex UIs

### Root Layout (Required)
```tsx
export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

### Nested Layouts
Layouts compose - each segment's layout wraps its children:
```
app/layout.tsx          → Wraps entire app
app/blog/layout.tsx     → Wraps all blog pages
app/blog/[slug]/page.tsx → Final page content
```

## 5. Data Fetching

### What Changed from Pages Router
- No more `getServerSideProps` or `getStaticProps`
- Fetch directly in components
- Components can be async
- Automatic request deduplication

### Fetching in Server Components
```tsx
async function UserProfile({ userId }: { userId: string }) {
  const user = await fetch(`/api/users/${userId}`);
  return <div>{user.name}</div>;
}
```

### Caching Strategies
```tsx
// Static (cached forever)
fetch(url);

// Revalidate every 60 seconds
fetch(url, { next: { revalidate: 60 } });

// No cache (dynamic)
fetch(url, { cache: 'no-store' });
```

## 6. Loading States

### What They Are
UI shown while async operations complete (data fetching, lazy loading).

### Why They're Critical
- **User Experience**: Immediate feedback
- **Perceived Performance**: App feels faster
- **Prevent Layout Shift**: Reserve space for content

### Implementation Methods

#### Method 1: loading.tsx file
```tsx
// app/dashboard/loading.tsx
export default function Loading() {
  return <Skeleton />;
}
```

#### Method 2: Suspense Boundaries
```tsx
<Suspense fallback={<Loading />}>
  <AsyncComponent />
</Suspense>
```

## 7. Error Boundaries

### What They Are
Components that catch JavaScript errors in their child component tree.

### Why They Exist
- **Resilience**: Prevent entire app crash
- **User Experience**: Show fallback UI
- **Recovery**: Offer retry mechanisms

### Implementation
```tsx
// app/dashboard/error.tsx
'use client'; // Must be client component

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

## 8. Route Handlers (API Routes)

### What They Are
Backend endpoints in your Next.js app, replacing Pages Router API routes.

### Why They Exist
- **Full-Stack**: Frontend and backend in one project
- **Type Safety**: Share types between frontend/backend
- **Simplicity**: No separate backend server needed
- **Edge Compatible**: Can run on edge runtime

### Implementation
```tsx
// app/api/posts/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const posts = await getPosts();
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const body = await request.json();
  const post = await createPost(body);
  return NextResponse.json(post, { status: 201 });
}
```

## 9. Streaming & Suspense

### What It Is
Progressively rendering and sending UI to client as it becomes ready.

### Why It Matters
- **Faster TTFB**: Send HTML immediately
- **Better UX**: Show content as available
- **Optimal Loading**: Prioritize critical content

### Example
```tsx
function Page() {
  return (
    <>
      <Header /> {/* Renders immediately */}
      <Suspense fallback={<LoadingSidebar />}>
        <Sidebar /> {/* Might take time */}
      </Suspense>
      <Suspense fallback={<LoadingContent />}>
        <MainContent /> {/* Might take longer */}
      </Suspense>
    </>
  );
}
```

## 10. Metadata API

### What It Is
Type-safe way to define page metadata (title, description, OG tags).

### Why Use It
- **SEO**: Better search engine optimization
- **Social Sharing**: Rich previews on social media
- **Type Safety**: TypeScript support
- **Dynamic**: Can be based on page content

### Static Metadata
```tsx
export const metadata = {
  title: 'About Us',
  description: 'Learn about our company',
};
```

### Dynamic Metadata
```tsx
export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  return {
    title: post.title,
    openGraph: {
      images: [post.image],
    },
  };
}
```

## Key Takeaway
Each concept in Next.js 13+ App Router is designed to make React applications:
- **Faster**: Better performance out of the box
- **Simpler**: Less configuration and boilerplate
- **More Powerful**: Full-stack capabilities
- **Type-Safe**: Better TypeScript integration

Remember: "Understand what each concept is trying to DO" - this understanding is groundbreaking for your technical growth!