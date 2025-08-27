# System Architecture

## Overview

The Issue Tracker is a full-stack web application built with Next.js 13+, utilizing server-side rendering, API routes, and a MySQL database. The architecture follows a layered approach with clear separation of concerns.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────┐
│                    Client Browser                    │
│                  (React Components)                  │
└─────────────────┬───────────────────────────────────┘
                  │ HTTP/HTTPS
                  ▼
┌─────────────────────────────────────────────────────┐
│                  Next.js Frontend                    │
│  ┌──────────────────────────────────────────────┐  │
│  │            App Router (Pages)                 │  │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐    │  │
│  │  │   Home   │ │  Issues  │ │   New    │    │  │
│  │  │   Page   │ │   List   │ │  Issue   │    │  │
│  │  └──────────┘ └──────────┘ └──────────┘    │  │
│  └──────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────┐  │
│  │           React Components                    │  │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐    │  │
│  │  │  NavBar  │ │   Form   │ │  Table   │    │  │
│  │  └──────────┘ └──────────┘ └──────────┘    │  │
│  └──────────────────────────────────────────────┘  │
└─────────────────┬───────────────────────────────────┘
                  │ Internal API Calls
                  ▼
┌─────────────────────────────────────────────────────┐
│                  Next.js Backend                     │
│  ┌──────────────────────────────────────────────┐  │
│  │              API Routes                       │  │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐    │  │
│  │  │   GET    │ │   POST   │ │   PUT    │    │  │
│  │  │  Issues  │ │  Issue   │ │  Issue   │    │  │
│  │  └──────────┘ └──────────┘ └──────────┘    │  │
│  └──────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────┐  │
│  │           Business Logic Layer                │  │
│  │     (Validation, Data Processing)            │  │
│  └──────────────────────────────────────────────┘  │
└─────────────────┬───────────────────────────────────┘
                  │ Prisma ORM
                  ▼
┌─────────────────────────────────────────────────────┐
│                  MySQL Database                      │
│  ┌──────────────────────────────────────────────┐  │
│  │                 Tables                        │  │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐    │  │
│  │  │  Issues  │ │  Users   │ │ Sessions │    │  │
│  │  └──────────┘ └──────────┘ └──────────┘    │  │
│  └──────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

## Technology Stack

### Frontend
- **Framework**: Next.js 13+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **Markdown**: React Markdown

### Backend
- **Runtime**: Node.js
- **Framework**: Next.js API Routes
- **ORM**: Prisma
- **Validation**: Zod
- **Authentication**: NextAuth.js (future)

### Database
- **Primary**: MySQL
- **Alternative**: PostgreSQL
- **Development**: SQLite

### DevOps
- **Version Control**: Git
- **Package Manager**: npm/yarn
- **Build Tool**: Next.js built-in
- **Linting**: ESLint
- **Formatting**: Prettier

## Directory Structure

```
issue-tracker/
├── app/                      # App Router pages and layouts
│   ├── api/                  # API routes
│   │   └── issues/
│   │       ├── route.ts      # GET, POST /api/issues
│   │       └── [id]/
│   │           └── route.ts  # GET, PUT, DELETE /api/issues/[id]
│   ├── issues/               # Issue pages
│   │   ├── page.tsx          # Issue list
│   │   ├── new/
│   │   │   └── page.tsx      # Create issue
│   │   └── [id]/
│   │       ├── page.tsx      # Issue detail
│   │       └── edit/
│   │           └── page.tsx  # Edit issue
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home page
│   ├── globals.css           # Global styles
│   └── error.tsx             # Error boundary
├── components/               # Reusable components
│   ├── ui/                   # UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Table.tsx
│   ├── issues/               # Issue-specific components
│   │   ├── IssueForm.tsx
│   │   ├── IssueList.tsx
│   │   └── StatusBadge.tsx
│   └── layout/               # Layout components
│       ├── NavBar.tsx
│       └── Footer.tsx
├── lib/                      # Utilities and helpers
│   ├── prisma.ts             # Prisma client singleton
│   ├── validations/          # Zod schemas
│   │   └── issue.ts
│   └── utils/                # Helper functions
│       ├── dates.ts
│       └── format.ts
├── prisma/                   # Database schema
│   ├── schema.prisma         # Prisma schema
│   ├── migrations/           # Database migrations
│   └── seed.ts               # Seed data
├── public/                   # Static assets
├── types/                    # TypeScript types
│   └── index.d.ts
└── config/                   # Configuration files
    ├── site.ts               # Site metadata
    └── constants.ts          # App constants
```

## Data Flow

### Creating an Issue

```
User Input → Client Validation → API Request → Server Validation 
→ Database Insert → Response → Client Update → UI Feedback
```

1. **User fills form** in `/issues/new`
2. **Client-side validation** with React Hook Form + Zod
3. **POST request** to `/api/issues`
4. **Server validation** with same Zod schema
5. **Prisma creates** record in database
6. **API returns** created issue
7. **Client redirects** to issue list
8. **Toast shows** success message

### Fetching Issues

```
Page Load → Server Component → Database Query → Render HTML 
→ Send to Client → Hydrate → Interactive
```

1. **User navigates** to `/issues`
2. **Server component** runs on server
3. **Prisma queries** database
4. **HTML generated** with data
5. **Sent to browser** as HTML
6. **React hydrates** for interactivity

## Component Architecture

### Server Components (Default)
- Pages (`page.tsx`)
- Layouts (`layout.tsx`)
- Data fetching components
- Static content components

### Client Components ("use client")
- Forms with state
- Interactive buttons
- Modals and dialogs
- Components using hooks
- Browser API usage

### Component Hierarchy

```
RootLayout
├── NavBar (Client - for active states)
├── Page (Server)
│   ├── IssueList (Server)
│   │   ├── Table (Server)
│   │   └── StatusBadge (Server)
│   └── Pagination (Client - interactive)
└── Footer (Server)
```

## API Architecture

### RESTful Endpoints

| Method | Endpoint | Purpose | Request Body | Response |
|--------|----------|---------|--------------|----------|
| GET | /api/issues | List all issues | - | Issue[] |
| GET | /api/issues/[id] | Get single issue | - | Issue |
| POST | /api/issues | Create issue | CreateIssueDto | Issue |
| PUT | /api/issues/[id] | Update issue | UpdateIssueDto | Issue |
| DELETE | /api/issues/[id] | Delete issue | - | 204 No Content |

### Request/Response Flow

```typescript
// Request validation
const validation = issueSchema.safeParse(body);
if (!validation.success) {
  return NextResponse.json(validation.error, { status: 400 });
}

// Business logic
const issue = await prisma.issue.create({
  data: validation.data
});

// Response
return NextResponse.json(issue, { status: 201 });
```

## Database Design

### Entity Relationship Diagram

```
┌─────────────┐      ┌─────────────┐
│   Issues    │      │    Users    │
├─────────────┤      ├─────────────┤
│ id (PK)     │      │ id (PK)     │
│ title       │      │ email       │
│ description │      │ name        │
│ status      │◄────►│ image       │
│ createdAt   │      │ role        │
│ updatedAt   │      │ createdAt   │
│ assignedTo  │      │ updatedAt   │
└─────────────┘      └─────────────┘
       │                    │
       └────────────────────┘
         Many-to-One
```

### Indexes
- Primary keys: Automatic
- Foreign keys: `assignedToUserId`
- Search optimization: `status`, `createdAt`

## State Management

### Server State
- Managed by Next.js caching
- Revalidation strategies
- Database as source of truth

### Client State
- Form state with React Hook Form
- UI state with useState
- Loading states
- Error states

### Cache Strategy

```typescript
// Static data (build time)
export const revalidate = 3600; // 1 hour

// Dynamic data (request time)
export const dynamic = 'force-dynamic';

// On-demand revalidation
revalidatePath('/issues');
revalidateTag('issues');
```

## Security Architecture

### Input Validation
- Client-side: User experience
- Server-side: Security
- Database: Constraints

### Authentication (Future)
```
User Login → NextAuth → JWT/Session → Protected Routes
                ↓
          Database Session
```

### Authorization
- Route protection with middleware
- API route guards
- Role-based access control

### Security Headers
```typescript
// next.config.js
const securityHeaders = [
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  }
];
```

## Performance Optimization

### Build-Time Optimization
- Static generation where possible
- Image optimization with next/image
- Font optimization with next/font
- Code splitting automatic

### Runtime Optimization
- Server components reduce bundle
- Streaming for faster TTFB
- Partial prerendering
- Edge runtime for API routes

### Database Optimization
- Connection pooling
- Indexed queries
- Pagination
- Select only needed fields

## Deployment Architecture

### Development
```
Local Development → Git Push → GitHub
```

### Production
```
GitHub → Vercel/Railway → CDN → Users
           ↓
        Database
```

### Environment Variables
- Development: `.env.local`
- Production: Platform secrets
- Never committed to Git

## Monitoring & Logging

### Application Monitoring
- Performance metrics
- Error tracking
- User analytics
- API response times

### Database Monitoring
- Query performance
- Connection pool status
- Storage usage
- Backup status

### Logging Strategy
```typescript
// Development
console.log('[API]', method, path, status);

// Production
logger.info({
  method,
  path,
  status,
  duration,
  userId
});
```

## Scalability Considerations

### Horizontal Scaling
- Stateless application
- Database connection pooling
- CDN for static assets
- Load balancing ready

### Vertical Scaling
- Optimize database queries
- Implement caching layers
- Use background jobs
- Optimize bundle size

### Future Enhancements
- Redis for caching
- Queue for background jobs
- WebSocket for real-time
- Microservices architecture