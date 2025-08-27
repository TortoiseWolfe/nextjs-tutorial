# Ticket 6: Build a Full-Stack Issue Tracker

## Video Information
**Title**: Build a Full-Stack App with Next.js, Tailwind, Radix UI, and Prisma  
**URL**: https://youtu.be/J9sfR6HN6BY  
**Focus**: Production-ready Issue Tracker application

## Repository Setup
```bash
# Option 1: Fork from Ticket 5
git clone [your-forked-repo]
cd issue-tracker

# Option 2: Fresh start with tools included
npx create-next-app@latest issue-tracker --typescript --tailwind --app
cd issue-tracker
```

## Video Project Roadmap
Building a complete Issue Tracking System with:
- User authentication
- Issue CRUD operations  
- Dashboard with statistics
- Filtering and sorting
- Modern UI with Radix components
- Production database with Prisma

## Video Curriculum Breakdown

### Part 1: Project Foundation

#### Setting Up Development Environment
```bash
# Install core dependencies shown in video
npm install @radix-ui/themes @radix-ui/react-icons
npm install prisma @prisma/client
npm install react-markdown @uiw/react-md-editor
```

#### Building the NavBar
- Logo and branding
- Navigation links
- Active link styling with Tailwind
- Responsive design

### Part 2: Creating Issues Module (65 min)

#### Database Setup
```bash
# MySQL setup
# Create database for development
```

#### Prisma Configuration
```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model Issue {
  id          Int      @id @default(autoincrement())
  title       String   @db.VarChar(255)
  description String   @db.Text
  status      Status   @default(OPEN)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

enum Status {
  OPEN
  IN_PROGRESS
  CLOSED
}
```

#### Building the API
```tsx
// app/api/issues/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { issueSchema } from '@/app/validationSchemas';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = issueSchema.safeParse(body);
  
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }
  
  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description }
  });
  
  return NextResponse.json(newIssue, { status: 201 });
}
```

#### Radix UI Integration
- Setting up Radix Theme
- Customizing theme colors
- Building form with Radix components
- Text fields and text areas
- Buttons and feedback

#### New Issue Page Features
- Markdown editor integration
- Client-side validation with Zod
- Error handling and display
- Loading spinner
- Toast notifications

### Part 3: Viewing Issues Module

#### Issue List Page
- Fetching all issues
- Table layout with Radix
- Status badges
- Sorting functionality
- Links to detail pages

#### Issue Detail Page
- Displaying markdown content
- Issue metadata
- Edit and delete buttons
- Confirmation dialogs

### Part 4: Advanced Features

#### Code Organization Discussion
- Component structure
- Shared components
- Utility functions
- Type definitions
- API route patterns

## Key Tools & Their Purposes

### Tailwind CSS
**What**: Utility-first CSS framework  
**Why**: Rapid UI development without writing CSS  
**How**: Classes directly in JSX  

### Radix UI
**What**: Unstyled, accessible component primitives  
**Why**: Accessibility without the complexity  
**How**: Compose with Tailwind for styling  

### Prisma
**What**: Type-safe database ORM  
**Why**: TypeScript from database to frontend  
**How**: Schema-first development  

### MySQL
**What**: Relational database  
**Why**: Production-ready data persistence  
**How**: Connected via Prisma  

## Implementation Patterns from Video

### Form Pattern with Validation
```tsx
'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { issueSchema } from '@/app/validationSchemas';

export default function IssueForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(issueSchema)
  });
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  );
}
```

### Error Component Pattern
```tsx
import { Text } from '@radix-ui/themes';

export function ErrorMessage({ children }: { children?: string }) {
  if (!children) return null;
  
  return (
    <Text color="red" as="p">
      {children}
    </Text>
  );
}
```

## Video Progress Tracking

### Introduction & Setup (10 min)
- [ ] Introduction
- [ ] Source Code
- [ ] Prerequisites  
- [ ] Development Tools
- [ ] Development Workflow

### Project Setup (15 min)
- [ ] Setting Up the Project
- [ ] Building the NavBar
- [ ] Styling the Active Link

### Creating Issues (65 min)
- [ ] Setting Up MySQL
- [ ] Setting Up Prisma
- [ ] Creating the Issue Model
- [ ] Building an API
- [ ] Setting Up Radix UI
- [ ] Building the New Issue Page
- [ ] Customizing Radix UI Theme
- [ ] Adding a Markdown Editor
- [ ] Handling Form Submission
- [ ] Handling Errors
- [ ] Implementing Client-Side Validation
- [ ] Extracting the ErrorMessage Component
- [ ] Adding a Spinner
- [ ] Discussion: Code Organization

### Viewing Issues (54 min)
- [ ] Showing Issues
- [ ] Building the Issue Status Badge
- [ ] Adding Loading Skeletons
- [ ] Showing Issue Details
- [ ] Styling the Issue Detail Page
- [ ] Adding Markdown Preview
- [ ] Building a Custom Link Component

### Updating Issues (45 min)
- [ ] Building the Edit Button
- [ ] Applying Single Responsibility Principle
- [ ] Building the Edit Issue Page
- [ ] Building a Dynamic Issue Form

### Deleting Issues (25 min)
- [ ] Building the Delete Button
- [ ] Adding a Confirmation Dialog Box
- [ ] Handling Delete Errors
- [ ] Improving the UX

## Common Issues from Video Comments
- Radix UI font customization issues
- Extra attributes from server warnings
- Prisma connection pool in development
- TypeScript strict mode errors
- Hydration mismatches with markdown

## Success Criteria for Ticket 6
- [ ] All CRUD operations working
- [ ] Validation on client and server
- [ ] Accessible UI with Radix
- [ ] Responsive design with Tailwind
- [ ] Database properly configured
- [ ] Clean code organization
- [ ] No TypeScript errors
- [ ] Ready for authentication (next phase)

## Mosh's Key Points
- "Radix handles accessibility, you handle styling"
- "Validate on client for UX, validate on server for security"
- "Prisma gives you confidence with types"
- "Keep API routes simple and focused"
- "Extract components when they're reused"

## Notes Section

### Personal Implementation Notes
<!-- Add your implementation notes here -->

### Challenges Encountered
<!-- Document any issues and their solutions -->

### Customizations Made
<!-- Track any deviations from the tutorial -->