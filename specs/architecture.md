# System Architecture - Ticket 5

## Overview
This document outlines the architectural decisions for the Ticket 5 Next.js application, focusing on core Next.js patterns without external libraries.

## Architecture Principles

### 1. Server-First Rendering
- Default to server components
- Client components only for interactivity
- Minimize JavaScript sent to client

### 2. File-Based Architecture
- Routes defined by file system
- Co-location of related files
- Clear separation of concerns

### 3. Progressive Enhancement
- Works without JavaScript where possible
- Enhanced with client-side features
- Graceful degradation

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         Browser                             │
│  ┌─────────────────────────────────────────────────────┐  │
│  │                   Client Components                  │  │
│  │  (Interactivity, State, Event Handlers)            │  │
│  └─────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              ▲
                              │ Hydration
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     Next.js App Router                      │
│  ┌─────────────────────────────────────────────────────┐  │
│  │                  Server Components                   │  │
│  │          (Data Fetching, Heavy Operations)          │  │
│  └─────────────────────────────────────────────────────┘  │
│                              ▼                              │
│  ┌─────────────────────────────────────────────────────┐  │
│  │                     Route Handlers                   │  │
│  │                    (API Endpoints)                   │  │
│  └─────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Data Sources                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │  External    │  │    Mock      │  │   Local      │    │
│  │    APIs      │  │    Data      │  │   Files      │    │
│  └──────────────┘  └──────────────┘  └──────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

## Component Architecture

### Component Hierarchy
```
<RootLayout>
  <Navigation />           // Server Component
  <Page>                  // Server Component
    <DataDisplay />       // Server Component
    <InteractiveWidget /> // Client Component
  </Page>
  <Footer />              // Server Component
</RootLayout>
```

### Component Types

#### Server Components (Default)
```tsx
// Characteristics:
// - Can be async
// - Direct data fetching
// - No hooks or event handlers
// - Smaller bundle size

async function ServerComponent() {
  const data = await fetchData();
  return <div>{data}</div>;
}
```

#### Client Components
```tsx
// Characteristics:
// - Use 'use client' directive
// - Can use hooks and browser APIs
// - Handle user interactions
// - Increase bundle size

'use client';
function ClientComponent() {
  const [state, setState] = useState();
  return <button onClick={handleClick}>Click</button>;
}
```

## Routing Architecture

### Route Structure
```
app/
├── layout.tsx                 # Root layout
├── page.tsx                   # Home (/)
├── (marketing)/              # Route group
│   ├── about/page.tsx        # /about
│   └── contact/page.tsx      # /contact
├── (app)/                    # Route group
│   ├── dashboard/            
│   │   ├── layout.tsx        # Dashboard layout
│   │   └── page.tsx          # /dashboard
│   └── profile/page.tsx      # /profile
├── blog/
│   ├── layout.tsx            # Blog layout
│   ├── page.tsx              # /blog
│   └── [slug]/
│       ├── page.tsx          # /blog/[slug]
│       └── not-found.tsx     # 404 for blog
└── api/
    └── [...]/route.ts        # API routes
```

### Route Types

1. **Static Routes**: Pre-rendered at build time
2. **Dynamic Routes**: Rendered on demand
3. **API Routes**: Server-side endpoints
4. **Parallel Routes**: Multiple pages in same layout
5. **Intercepting Routes**: Modal-like behavior

## Data Flow Architecture

### Data Fetching Patterns

#### Pattern 1: Direct Fetching in Components
```tsx
// Server component fetches its own data
async function ProductList() {
  const products = await db.products.findAll();
  return <ProductGrid products={products} />;
}
```

#### Pattern 2: Parallel Data Fetching
```tsx
// Fetch multiple data sources simultaneously
async function DashboardPage() {
  const [stats, users, activity] = await Promise.all([
    fetchStats(),
    fetchUsers(),
    fetchActivity()
  ]);
  
  return (
    <>
      <StatsCard data={stats} />
      <UsersList users={users} />
      <ActivityFeed activity={activity} />
    </>
  );
}
```

#### Pattern 3: Waterfall Prevention
```tsx
// Bad: Sequential fetching (waterfall)
const user = await fetchUser();
const posts = await fetchUserPosts(user.id); // Waits for user

// Good: Parallel fetching
const userPromise = fetchUser();
const postsPromise = fetchUserPosts(userId);
const [user, posts] = await Promise.all([userPromise, postsPromise]);
```

## State Management Architecture

### Server State
- Managed through data fetching
- No client-side state management needed
- Revalidation strategies for updates

### Client State
- Local component state with useState
- Form state management
- UI state (modals, toggles)

### State Flow
```
Server State (Database/API)
    ↓
Server Components (Fetch & Render)
    ↓
HTML + RSC Payload
    ↓
Client Hydration
    ↓
Client State (Interactive Updates)
```

## Performance Architecture

### Optimization Strategies

#### 1. Code Splitting
- Automatic per route
- Dynamic imports for heavy components
- Lazy loading client components

#### 2. Streaming
```tsx
// Enable streaming with loading.tsx
export default function Loading() {
  return <Skeleton />;
}

// Or with Suspense
<Suspense fallback={<Loading />}>
  <SlowComponent />
</Suspense>
```

#### 3. Caching Strategies
```tsx
// Static (default)
fetch(url); // Cached indefinitely

// Time-based revalidation
fetch(url, { next: { revalidate: 3600 } }); // 1 hour

// Dynamic (no cache)
fetch(url, { cache: 'no-store' });
```

## Error Handling Architecture

### Error Boundary Hierarchy
```
app/
├── error.tsx              # Global error boundary
├── layout.tsx
├── dashboard/
│   ├── error.tsx         # Dashboard error boundary
│   └── settings/
│       └── error.tsx     # Settings error boundary
```

### Error Flow
1. Error occurs in component
2. Caught by nearest error boundary
3. Error UI displayed
4. Option to retry
5. Log to monitoring service

## Security Architecture

### Security Layers

#### 1. Server Components
- API keys stay on server
- Database queries never exposed
- Sensitive logic hidden

#### 2. Environment Variables
```tsx
// Server-only variables
process.env.DATABASE_URL        // Server only
process.env.API_SECRET          // Server only

// Public variables (exposed to client)
process.env.NEXT_PUBLIC_API_URL // Available everywhere
```

#### 3. API Route Protection
```tsx
export async function GET(request: Request) {
  // Validate authentication
  const session = await validateSession(request);
  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }
  
  // Process request
  return NextResponse.json(data);
}
```

## Development Architecture

### Folder Structure
```
project/
├── app/                   # App router files
│   ├── components/       # Page-specific components
│   ├── lib/             # Page-specific utilities
│   └── api/             # API routes
├── components/           # Shared components
├── lib/                 # Shared utilities
├── public/              # Static assets
├── styles/              # Global styles
└── types/               # TypeScript types
```

### Code Organization Principles

1. **Co-location**: Keep related files together
2. **Single Responsibility**: Each component does one thing
3. **Composition**: Build complex UIs from simple components
4. **Type Safety**: TypeScript for all code
5. **Documentation**: Comments for complex logic

## Testing Architecture

### Testing Layers

#### 1. Unit Tests
- Individual components
- Utility functions
- API route handlers

#### 2. Integration Tests
- Page rendering
- Data fetching
- Form submissions

#### 3. E2E Tests
- User flows
- Critical paths
- Cross-browser testing

## Deployment Architecture

### Build Process
```
Source Code
    ↓
TypeScript Compilation
    ↓
Next.js Build
    ↓
Static Pages + Server Functions
    ↓
Deployment
```

### Deployment Targets
- Vercel (recommended)
- Node.js server
- Docker container
- Static export (limited features)

## Monitoring Architecture

### Metrics to Track

#### Performance
- Core Web Vitals
- Server response times
- API latency
- Bundle sizes

#### Errors
- JavaScript errors
- API failures
- 404 pages
- Form submission failures

#### Usage
- Page views
- User interactions
- API usage
- Popular features

## Migration to Ticket 6

### Preparation for Enhancement

#### Current (Ticket 5)
```
- CSS Modules for styling
- Basic component library
- Mock data or simple APIs
- Manual form handling
```

#### Future (Ticket 6)
```
- Tailwind CSS for styling
- Radix UI for components
- Prisma for database
- NextAuth for authentication
- Enhanced form libraries
```

### Migration Strategy
1. Keep component structure
2. Replace CSS Modules with Tailwind
3. Enhance components with Radix
4. Add database layer with Prisma
5. Implement authentication

## Key Architectural Decisions

### Decision 1: Server Components Default
**Rationale**: Better performance, SEO, and security
**Trade-off**: Less interactivity without client components

### Decision 2: File-Based Routing
**Rationale**: Simpler mental model, automatic code splitting
**Trade-off**: Less flexibility than programmatic routing

### Decision 3: CSS Modules
**Rationale**: Built-in, no additional dependencies for Ticket 5
**Trade-off**: More verbose than utility classes (resolved in Ticket 6)

### Decision 4: TypeScript Strict Mode
**Rationale**: Catch errors at compile time
**Trade-off**: More initial setup time

## Conclusion

This architecture provides a solid foundation for Ticket 5, demonstrating core Next.js concepts without external dependencies. It's designed to be easily enhanced with Tailwind, Radix, and Prisma in Ticket 6 while maintaining the same fundamental structure.