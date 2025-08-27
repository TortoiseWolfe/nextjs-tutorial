# Ticket 6: Build a Full-Stack Issue Tracker with Next.js 13+

## 🎯 Course Overview (Part 2 of Ultimate Next.js Series)

> "We'll build and deploy a full-stack production-grade issue tracker. This project includes all the common features you find in modern applications"

**Video**: [Build a Full-Stack App with Next.js, Tailwind, Radix UI, and Prisma](https://youtu.be/J9sfR6HN6BY)  
**Instructor**: Mosh Hamedani  
**Duration**: 7 hours (full course) / 1.5 hours (this tutorial)

### What We're Building

> "By the end of the course you will have a fast, responsive, fully functioning application in the cloud that you can share with your friends or potential employers to get your dream job"

**Production-Grade Features:**
- ✅ Dashboard with charts
- ✅ Filtering, sorting, and pagination
- ✅ Forms with client-side validation
- ✅ User authentication and access control
- ✅ Modal dialogs and toast notifications
- ✅ Professional UI with Radix UI
- ✅ MySQL database with Prisma ORM
- ✅ TypeScript throughout

### Tech Stack [0:00:54]

> "We'll build this with a cutting-edge tech stack for building modern applications"

- **Next.js 13.4** - Full-stack React framework
- **TypeScript** - Type safety throughout
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component library
- **Prisma** - Type-safe database ORM
- **NextAuth** - Authentication (in full course)
- **MySQL** - Production database
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Axios** - HTTP client

## 📚 Prerequisites [0:02:10]

> "This course is the second part of my ultimate Next.js series"

**Required Knowledge:**
- ✅ Basics of Next.js 13+ (client/server components)
- ✅ Routing and API routes
- ✅ Database integration with Prisma
- ✅ Authentication with NextAuth
- ✅ Basic Tailwind CSS

> "If you're unfamiliar with these topics, I highly recommend you go back and start from part one"

---

## 🗺️ Project Roadmap [0:04:38]

> "A lot of my students ask me 'Mosh, I don't know how to start and finish a project'"

### Essential Features (Core) - Build First!
1. **Create an issue** - Primary purpose of issue tracker
2. **View issue details** - Understand the problem
3. **Update an issue** - Modify as needed
4. **Delete an issue** - Remove when resolved

### Advanced Features (Nice to Have)
- User authentication
- Assigning issues to users
- Sorting and filtering
- Pagination
- Dashboard with charts

> "When building this application, we're going to focus on one feature at a time. We're not going to get distracted with the complexity of the entire project"

### Development Philosophy [0:06:10]

> "Our goal is not to come up with a perfect solution right away. There's no such thing as perfect in software. Being a perfectionist wastes a lot of your time."

**Key Principles:**
- Start coding right away
- Build working solutions first
- Refine and improve step by step
- Focus on one feature at a time

---

## Section 1: Project Setup [0:06:49 - 0:11:05]

### Setting Up the Development Environment [0:06:49]

#### Required VS Code Extensions

> "If you want to use VS Code, I want you to install these extensions"

1. **ES7+ React/Redux/React-Native** 
   - Quick React component generation
   - Shortcut: `rafce` for components

2. **JavaScript and TypeScript Nightly**
   - Enhanced TypeScript support

3. **Tailwind CSS IntelliSense**
   - Autocomplete for Tailwind classes

4. **Prisma** [0:07:54]
   - Syntax highlighting for Prisma schemas
   - Autocomplete for Prisma models

### 📝 Creating a New Project [0:08:07]

> "Make sure to use the same version so everything I show you in these videos works the same way on your machine"

```bash
# Create project with specific version
npx create-next-app@13.4.19 issue-tracker

# Configuration prompts:
✔ Would you like to use TypeScript? → Yes
✔ Would you like to use ESLint? → Yes
✔ Would you like to use Tailwind CSS? → Yes
✔ Would you like to use `src/` directory? → No
✔ Would you like to use App Router? → Yes
✔ Would you like to customize the default import alias? → No
```

### Initial Cleanup [0:09:24]

```tsx
// app/page.tsx - Simplify to:
export default function Home() {
  return (
    <div>Hello World</div>
  )
}
```

```css
/* app/globals.css - Remove these properties */
/* Delete: --background-start-rgb */
/* Delete: --background-end-rgb */
/* Remove gradient from body */
```

> "We have this weird background color because of the gradient applied to our body element"

## Section 2: Building the NavBar [0:11:05 - 0:26:14]

### Creating the Navigation Component [0:11:05]

> "In Next.js 13 with the new app router, we don't have to put all our components into a components directory. We can colocate our components with the pages or layouts where they are used"

#### 📝 Create NavBar Component

```tsx
// app/NavBar.tsx
'use client'

import Link from 'next/link'
import { AiFillBug } from 'react-icons/ai'
import { usePathname } from 'next/navigation'
import classnames from 'classnames'

const NavBar = () => {
  const currentPath = usePathname()
  
  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues' },
  ]
  
  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
      <Link href="/"><AiFillBug /></Link>
      <ul className='flex space-x-6'>
        {links.map(link => 
          <Link 
            key={link.href}
            className={classnames({
              'text-zinc-900': link.href === currentPath,
              'text-zinc-500': link.href !== currentPath,
              'hover:text-zinc-800 transition-colors': true
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        )}
      </ul>
    </nav>
  )
}
```

#### Key Decisions Explained:

1. **File Location** [0:11:13]: "Our navigation bar is not a reusable component. The only place where we need it is in our layout"

2. **Semantic HTML** [0:11:58]: Use `<nav>` element instead of `<div>`

3. **Icon Library** [0:15:52]: 
```bash
npm install react-icons@4.11.0
```

### Styling with Tailwind [0:13:36]

**Layout Classes Applied:**
- `flex` - Horizontal layout
- `space-x-6` - Space between children
- `border-b` - Bottom border
- `mb-5` - Bottom margin
- `px-5` - Horizontal padding
- `h-14` - Fixed height
- `items-center` - Vertical centering

### Styling the Active Link [0:19:57]

> "We want to highlight the active link in the navigation bar"

#### Install classnames Package [0:23:52]
```bash
npm install classnames@2.3.2
```

#### Why classnames?
> "As our applications get more complex, we might end up with complicated conditions... tracking what classes are rendered can be a little bit difficult"

**Benefits:**
- Cleaner conditional rendering
- No string manipulation
- Easy to see what classes render when

### Add to Layout [0:13:03]

```tsx
// app/layout.tsx
import NavBar from './NavBar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <main className="p-5">{children}</main>
      </body>
    </html>
  )
}

## Section 3: Database Setup [0:26:15 - 0:36:36]

### Setting Up MySQL [0:26:15]

> "In this section we're going to use MySQL for storing our data"

#### Installation Options:

1. **MySQL Community Server** (Free)
   - Download from: `mysql.com/downloads`
   - Choose MySQL Community Server
   - Select version for your OS
   - **Mac Users**: Choose correct DMG (ARM vs x86)

2. **Remember Root Password** [0:27:24]
   > "Root is like the admin user for our database engine. Whatever password you use for the root user, keep a note of that"

3. **Database Management Tools** [0:27:41]
   - **MySQL Workbench** - Free but "ugly"
   - **DataGrip** (Mosh's choice) - From JetBrains, paid but 30-day trial

### Setting Up Prisma [0:28:14]

> "Let's install Prisma to allow our application to interact with our database"

#### 📝 Installation Steps:

```bash
# Install Prisma
npm install prisma@5.3.1

# Initialize Prisma in project
npx prisma init
```

#### What This Creates [0:28:39]:

1. **prisma/schema.prisma** - Database schema file
2. **.env** - Environment variables file

### Configure Database Connection [0:28:45]

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"  // Changed from postgresql
  url      = env("DATABASE_URL")
}
```

```bash
# .env file
DATABASE_URL="mysql://root:password@localhost:3306/issue-tracker"
```

**URL Format Breakdown:**
- `mysql://` - Protocol
- `root` - Username
- `password` - Your MySQL root password
- `localhost` - Host
- `3306` - MySQL default port
- `issue-tracker` - Database name

### Creating the Issue Model [0:29:56]

> "To store issues in our database, first we have to create a Prisma model"

```prisma
// prisma/schema.prisma
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

#### Model Design Decisions:

1. **Naming Convention** [0:30:08]: 
   > "Use the Pascal naming convention... capitalize the first letter of each word"

2. **Singular Names** [0:30:19]: 
   > "Use singular names. We don't want to call this model 'issues', just the singular name like 'Issue'"

3. **Core Fields Only** [0:30:26]:
   > "At this point we want to add only the absolute essential ones... we're not going to worry about assigning issues to users"

#### Field Explanations:

- **id**: Auto-incrementing integer primary key
- **title**: Limited to 255 characters with `@db.VarChar(255)`
- **description**: Unlimited text with `@db.Text`
- **status**: Enum with three values (OPEN, IN_PROGRESS, CLOSED)
- **createdAt**: Automatically set on creation
- **updatedAt**: Automatically updated on modification

### Apply Database Migration [0:34:06]

```bash
# Format the schema
npx prisma format

# Create and apply migration
npx prisma migrate dev --name initial_migration
```

> "When we create a migration, Prisma creates this migrations folder and for each migration it creates a subfolder with a timestamp"

### Verify in Database [0:35:03]

Connect to database using DataGrip or MySQL Workbench:
- Check `issue-tracker` database exists
- Verify `Issue` table created
- Confirm `_prisma_migrations` table tracks migrations

## Section 4: Building the Issues Feature [0:36:36 - 1:33:03]

### Building an API [0:36:36]

> "Now to store issues, we have to create an API that clients can call"

#### Create Prisma Client Singleton [0:40:07]

> "We should have a single instance of the Prisma client"

```typescript
// prisma/client.ts
import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

#### Create API Route [0:36:44]

```typescript
// app/api/issues/route.ts
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'
import { z } from 'zod'

const createIssueSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  description: z.string().min(1, 'Description is required')
})

export async function POST(request: NextRequest) {
  const body = await request.json()
  const validation = createIssueSchema.safeParse(body)
  
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 })
  }
  
  const newIssue = await prisma.issue.create({
    data: { 
      title: body.title,
      description: body.description 
    }
  })
  
  return NextResponse.json(newIssue, { status: 201 })
}
```

#### Install Zod for Validation [0:37:43]

```bash
npm install zod@3.22.2
```

> "For data validation we use Zod"

### Setting Up Radix UI [0:43:31]

> "To build the new issue page, we're going to use Radix UI which is a very popular component library"

#### Installation & Setup [0:44:11]

```bash
# Install Radix themes
npm install @radix-ui/themes@1.1.2
```

#### Configuration Steps:

1. **Import CSS** [0:44:43]
```tsx
// app/layout.tsx
import '@radix-ui/themes/styles.css'
import './theme-config.css'  // Custom overrides
import './globals.css'       // Global styles
```

2. **Wrap App in Theme** [0:44:59]
```tsx
// app/layout.tsx
import { Theme } from '@radix-ui/themes'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Theme appearance="light" accentColor="violet">
          <NavBar />
          <main className="p-5">{children}</main>
        </Theme>
      </body>
    </html>
  )
}
```

3. **Configure Inter Font** [0:53:26]
```tsx
// app/layout.tsx
import { Inter } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
})
```

```css
/* app/theme-config.css */
.radix-themes {
  --default-font-family: var(--font-inter);
}
```

### Building the New Issue Page [0:46:12]

```tsx
// app/issues/new/page.tsx
'use client'

import { TextField, TextArea, Button } from '@radix-ui/themes'

const NewIssuePage = () => {
  return (
    <div className='max-w-xl'>
      <form className='space-y-3'>
        <TextField.Root>
          <TextField.Input placeholder='Title' />
        </TextField.Root>
        
        <TextArea placeholder='Description' />
        
        <Button>Submit New Issue</Button>
      </form>
    </div>
  )
}
```

> "Because we're building a form and building forms requires user interaction, the text field component cannot be rendered on the server"

### Adding a Markdown Editor [0:57:02]

```bash
npm install react-simplemde-editor@5.2.0 easymde@2.18.0
```

```tsx
// app/issues/new/page.tsx
import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'

// Replace TextArea with:
<SimpleMDE placeholder='Description' />
```

> "This is a react component wrapper around EasyMDE which is a popular JavaScript library for rendering a markdown editor"

### Handling Form Submission [0:59:00]

#### Install Dependencies:
```bash
npm install react-hook-form@7.46.1
npm install axios@1.5.0
```

#### Form Implementation:

```tsx
// app/issues/new/page.tsx
'use client'

import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface IssueForm {
  title: string
  description: string
}

const NewIssuePage = () => {
  const router = useRouter()
  const { register, control, handleSubmit } = useForm<IssueForm>()
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (data: IssueForm) => {
    try {
      setIsSubmitting(true)
      await axios.post('/api/issues', data)
      router.push('/issues')
    } catch (error) {
      setIsSubmitting(false)
      setError('An unexpected error occurred')
    }
  }

  return (
    <div className='max-w-xl'>
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      
      <form 
        className='space-y-3' 
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField.Root>
          <TextField.Input 
            placeholder='Title' 
            {...register('title')}
          />
        </TextField.Root>
        
        <Controller
          name="description"
          control={control}
          render={({ field }) => 
            <SimpleMDE placeholder='Description' {...field} />
          }
        />
        
        <Button disabled={isSubmitting}>
          Submit New Issue
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  )
}
```

### Client-Side Validation [1:14:26]

#### Install Resolver:
```bash
npm install @hookform/resolvers@3.3.1
```

#### Extract Schema for Reuse [1:14:39]

```typescript
// app/validationSchemas.ts
import { z } from 'zod'

export const createIssueSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  description: z.string().min(1, 'Description is required')
})

export type IssueForm = z.infer<typeof createIssueSchema>
```

#### Apply Validation:
```tsx
// app/issues/new/page.tsx
import { zodResolver } from '@hookform/resolvers/zod'
import { createIssueSchema } from '@/app/validationSchemas'

const { 
  register, 
  control, 
  handleSubmit,
  formState: { errors }
} = useForm<IssueForm>({
  resolver: zodResolver(createIssueSchema)
})
```

### Error Message Component [1:20:42]

> "Every time we want to render an error, we have to remember to set these props so our errors look consistent"

```tsx
// app/components/ErrorMessage.tsx
import { Text } from '@radix-ui/themes'
import { PropsWithChildren } from 'react'

const ErrorMessage = ({ children }: PropsWithChildren) => {
  if (!children) return null
  
  return (
    <Text color="red" as="p">
      {children}
    </Text>
  )
}

export default ErrorMessage
```

### Adding a Spinner [1:24:03]

```tsx
// app/components/Spinner.tsx
const Spinner = () => {
  return (
    <div
      className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  )
}
```

### Code Organization Discussion [1:28:30]

> "Software engineering is not black and white. There is no one-size-fits-all"

#### Key Points:

1. **Inline Functions** [1:28:36]:
   - OK for 1-2 lines
   - Extract if more complex
   - Separate logic from markup

2. **HTTP Calls in Components** [1:30:03]:
   > "In this application I don't see any value in moving this logic inside a separate function. That is just unnecessary abstraction"

3. **Pragmatic Approach**:
   > "Every project is different, every application has different requirements. Don't take someone else's solution and apply it as a silver bullet"

## Code Examples from Video

### Prisma Configuration
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

### Building the API
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

## Section 5: Viewing Issues [1:35:32]

> **Mosh**: "Now that we can create issues, let's display them in a beautiful table."

### Issues List Page [1:35:45]

```tsx
// app/issues/page.tsx
import { prisma } from '@/prisma/client';
import { Table } from '@radix-ui/themes';
import IssueStatusBadge from './IssueStatusBadge';
import Link from 'next/link';
import IssueActions from './IssueActions';

export default async function IssuesPage() {
  const issues = await prisma.issue.findMany();
  
  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">Created</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map(issue => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>
                  {issue.title}
                </Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}
```

### Status Badge Component [1:39:15]

> **Mosh**: "Let's create a beautiful badge component to show the status of each issue."

```tsx
// app/issues/IssueStatusBadge.tsx
import { Status } from '@prisma/client';
import { Badge } from '@radix-ui/themes';

const statusMap: Record<Status, { label: string; color: 'red' | 'violet' | 'green' }> = {
  OPEN: { label: 'Open', color: 'red' },
  IN_PROGRESS: { label: 'In Progress', color: 'violet' },
  CLOSED: { label: 'Closed', color: 'green' }
};

export default function IssueStatusBadge({ status }: { status: Status }) {
  return (
    <Badge color={statusMap[status].color}>
      {statusMap[status].label}
    </Badge>
  );
}
```

### Issue Detail Page [1:42:00]

```tsx
// app/issues/[id]/page.tsx
import { prisma } from '@/prisma/client';
import { notFound } from 'next/navigation';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import IssueStatusBadge from '../IssueStatusBadge';
import ReactMarkdown from 'react-markdown';

interface Props {
  params: { id: string }
}

export default async function IssueDetailPage({ params }: Props) {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) }
  });
  
  if (!issue) notFound();
  
  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex gap="3" my="2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose max-w-full" mt="4">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </div>
  );
}
```

### **Follow Along**: Create Issues Display [1:35:32-1:45:00]
```bash
# Create status badge component
touch app/issues/IssueStatusBadge.tsx

# Update issues list page
# Add table with responsive design
# Link to detail pages
```

## Section 6: Updating Issues [1:45:00]

> **Mosh**: "Editing issues should feel seamless. We'll reuse our form component with some smart refactoring."

### Edit Button Component [1:45:30]

```tsx
// app/issues/[id]/EditIssueButton.tsx
import { Pencil2Icon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';
import Link from 'next/link';

export default function EditIssueButton({ issueId }: { issueId: number }) {
  return (
    <Button>
      <Pencil2Icon />
      <Link href={`/issues/${issueId}/edit`}>Edit Issue</Link>
    </Button>
  );
}
```

### Refactored Form Component [1:47:00]

> **Mosh**: "Always think about reusability. This form works for both creating and editing."

```tsx
// app/issues/_components/IssueForm.tsx
'use client';

import { Issue } from '@prisma/client';
import { Button, TextField } from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { issueSchema } from '@/app/validationSchemas';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';

interface IssueFormData {
  title: string;
  description: string;
}

export default function IssueForm({ issue }: { issue?: Issue }) {
  const router = useRouter();
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  
  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema)
  });
  
  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      if (issue) {
        await axios.patch(`/api/issues/${issue.id}`, data);
      } else {
        await axios.post('/api/issues', data);
      }
      router.push('/issues');
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      setError('An unexpected error occurred.');
    }
  });
  
  return (
    <form onSubmit={onSubmit} className="max-w-xl space-y-3">
      <TextField.Root>
        <TextField.Input 
          defaultValue={issue?.title}
          placeholder="Title" 
          {...register('title')} 
        />
      </TextField.Root>
      <ErrorMessage>{errors.title?.message}</ErrorMessage>
      
      <Controller
        name="description"
        control={control}
        defaultValue={issue?.description}
        render={({ field }) => (
          <SimpleMDE placeholder="Description" {...field} />
        )}
      />
      <ErrorMessage>{errors.description?.message}</ErrorMessage>
      
      <Button disabled={isSubmitting}>
        {issue ? 'Update Issue' : 'Submit New Issue'}{' '}
        {isSubmitting && <Spinner />}
      </Button>
    </form>
  );
}
```

### Edit Page [1:51:00]

```tsx
// app/issues/[id]/edit/page.tsx
import { prisma } from '@/prisma/client';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';

const IssueForm = dynamic(
  () => import('@/app/issues/_components/IssueForm'),
  { ssr: false }
);

interface Props {
  params: { id: string }
}

export default async function EditIssuePage({ params }: Props) {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) }
  });
  
  if (!issue) notFound();
  
  return <IssueForm issue={issue} />;
}
```

### Update API Route [1:53:00]

```tsx
// app/api/issues/[id]/route.ts
import { patchIssueSchema } from '@/app/validationSchemas';
import { prisma } from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const validation = patchIssueSchema.safeParse(body);
  
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });
  
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) }
  });
  
  if (!issue)
    return NextResponse.json({ error: 'Invalid issue' }, { status: 404 });
  
  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title: body.title,
      description: body.description
    }
  });
  
  return NextResponse.json(updatedIssue);
}
```

## Section 7: Deleting Issues [1:55:00]

> **Mosh**: "Deleting should be deliberate. Always confirm destructive actions."

### Delete Button with Confirmation [1:55:30]

```tsx
// app/issues/[id]/DeleteIssueButton.tsx
'use client';

import { TrashIcon } from '@radix-ui/react-icons';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Spinner from '@/app/components/Spinner';

export default function DeleteIssueButton({ issueId }: { issueId: number }) {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  
  const deleteIssue = async () => {
    try {
      setDeleting(true);
      await axios.delete(`/api/issues/${issueId}`);
      router.push('/issues');
      router.refresh();
    } catch (error) {
      setDeleting(false);
      setError(true);
    }
  };
  
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red" disabled={isDeleting}>
            <TrashIcon />
            Delete Issue
            {isDeleting && <Spinner />}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to delete this issue? This action cannot be undone.
          </AlertDialog.Description>
          <Flex mt="4" gap="3">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">Cancel</Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button color="red" onClick={deleteIssue}>Delete Issue</Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            This issue could not be deleted.
          </AlertDialog.Description>
          <Button color="gray" variant="soft" mt="2" onClick={() => setError(false)}>
            OK
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
}
```

### Delete API Route [1:59:00]

```tsx
// app/api/issues/[id]/route.ts (add to existing file)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) }
  });
  
  if (!issue)
    return NextResponse.json({ error: 'Invalid issue' }, { status: 404 });
  
  await prisma.issue.delete({
    where: { id: issue.id }
  });
  
  return NextResponse.json({});
}
```

## Section 8: Filtering, Sorting and Pagination [2:02:00]

> **Mosh**: "Large datasets need smart handling. Let's add professional filtering and pagination."

### Filter Component [2:02:30]

```tsx
// app/issues/IssueStatusFilter.tsx
'use client';

import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';

const statuses: { label: string; value?: Status }[] = [
  { label: 'All' },
  { label: 'Open', value: 'OPEN' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Closed', value: 'CLOSED' }
];

export default function IssueStatusFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  return (
    <Select.Root
      defaultValue={searchParams.get('status') || ''}
      onValueChange={(status) => {
        const params = new URLSearchParams();
        if (status) params.append('status', status);
        if (searchParams.get('orderBy'))
          params.append('orderBy', searchParams.get('orderBy')!);
        
        const query = params.size ? '?' + params.toString() : '';
        router.push('/issues' + query);
      }}
    >
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map(status => (
          <Select.Item key={status.value || 'ALL'} value={status.value || ''}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
}
```

### Sorting Implementation [2:05:00]

```tsx
// app/issues/page.tsx (updated)
import { Status } from '@prisma/client';
import Pagination from '@/app/components/Pagination';

interface Props {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
    page: string;
  }
}

export default async function IssuesPage({ searchParams }: Props) {
  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: 'Issue', value: 'title' },
    { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
    { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' },
  ];
  
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
    
  const orderBy = columns
    .map(column => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: 'asc' }
    : undefined;
    
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;
  
  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });
  
  const issueCount = await prisma.issue.count({ where: { status } });
  
  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map(column => (
              <Table.ColumnHeaderCell key={column.value} className={column.className}>
                <Link href={{
                  query: { ...searchParams, orderBy: column.value }
                }}>
                  {column.label}
                </Link>
                {column.value === searchParams.orderBy && <ArrowUpIcon className="inline" />}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        {/* Table body */}
      </Table.Root>
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </Flex>
  );
}
```

### Pagination Component [2:09:00]

> **Mosh**: "A good pagination component can be reused everywhere."

```tsx
// app/components/Pagination.tsx
'use client';

import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import { Button, Flex, Text } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

export default function Pagination({ itemCount, pageSize, currentPage }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageCount = Math.ceil(itemCount / pageSize);
  
  if (pageCount <= 1) return null;
  
  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push('?' + params.toString());
  };
  
  return (
    <Flex align="center" gap="2">
      <Text size="2">
        Page {currentPage} of {pageCount}
      </Text>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => changePage(1)}
      >
        <DoubleArrowLeftIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === pageCount}
        onClick={() => changePage(currentPage + 1)}
      >
        <ChevronRightIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === pageCount}
        onClick={() => changePage(pageCount)}
      >
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
}
```

## Notes Section

### Personal Implementation Notes
<!-- Add your implementation notes here -->

### Challenges Encountered
<!-- Document any issues and their solutions -->

### Customizations Made
<!-- Track any deviations from the tutorial -->

## Section 9: Authentication [2:15:00]

> **Mosh**: "Production apps need authentication. NextAuth makes this incredibly simple."

### NextAuth Setup [2:15:30]

```bash
# Installation
npm install next-auth
npm install @next-auth/prisma-adapter

# Generate secrets
openssl rand -base64 32
```

### NextAuth Configuration [2:16:00]

```tsx
// app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/prisma/client';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
```

### Update Prisma Schema [2:18:00]

```prisma
// prisma/schema.prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  emailVerified DateTime?
  name          String?
  image         String?
  accounts      Account[]
  sessions      Session[]
  assignedIssues Issue[]
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?
  
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@unique([provider, providerAccountId])
  @@index([userId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([userId])
}
```

### Login Component [2:20:00]

> **Mosh**: "The login flow should be seamless and secure."

```tsx
// app/NavBar.tsx
'use client';

import { useSession } from 'next-auth/react';
import { Box, Flex, Container, DropdownMenu, Avatar, Text } from '@radix-ui/themes';
import { Skeleton } from '@/app/components';
import Link from 'next/link';

export default function NavBar() {
  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">🐛 Issue Tracker</Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
}

function AuthStatus() {
  const { status, data: session } = useSession();
  
  if (status === 'loading') 
    return <Skeleton width="3rem" height="2rem" />;
  
  if (status === 'unauthenticated')
    return <Link href="/api/auth/signin">Login</Link>;
  
  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session!.user!.image!}
            fallback="?"
            size="2"
            radius="full"
            className="cursor-pointer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2">{session!.user!.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href="/api/auth/signout">Log out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
}
```

### Session Provider [2:23:00]

```tsx
// app/auth/Provider.tsx
'use client';

import { SessionProvider } from 'next-auth/react';
import { PropsWithChildren } from 'react';

export default function AuthProvider({ children }: PropsWithChildren) {
  return <SessionProvider>{children}</SessionProvider>;
}

// app/layout.tsx
import AuthProvider from './auth/Provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <AuthProvider>
          <Theme>
            <NavBar />
            <main className="p-5">
              <Container>{children}</Container>
            </main>
          </Theme>
        </AuthProvider>
      </body>
    </html>
  );
}
```

### Protecting Routes [2:25:00]

```tsx
// middleware.ts
export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/issues/new',
    '/issues/edit/:id+',
  ],
};

// Or protect in components
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function NewIssuePage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return <div>Please login to create issues</div>;
  }
  
  return <IssueForm />;
}
```

## Section 10: Assigning Issues to Users [2:28:00]

> **Mosh**: "Let's connect issues to users for proper task management."

### Assignee Select Component [2:28:30]

```tsx
// app/issues/[id]/AssigneeSelect.tsx
'use client';

import { Issue, User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { Skeleton } from '@/app/components';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function AssigneeSelect({ issue }: { issue: Issue }) {
  const { data: users, error, isLoading } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then(res => res.data),
    staleTime: 60 * 1000, // 1 minute
    retry: 3,
  });
  
  if (isLoading) return <Skeleton height="2rem" />;
  if (error) return null;
  
  const assignIssue = async (userId: string) => {
    try {
      await axios.patch(`/api/issues/${issue.id}`, {
        assignedToUserId: userId || null,
      });
      toast.success('Changes saved.');
    } catch {
      toast.error('Changes could not be saved.');
    }
  };
  
  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || ''}
        onValueChange={assignIssue}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
}
```

### React Query Setup [2:31:00]

```tsx
// app/QueryClientProvider.tsx
'use client';

import { QueryClient, QueryClientProvider as ReactQueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

const queryClient = new QueryClient();

export default function QueryClientProvider({ children }: PropsWithChildren) {
  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
    </ReactQueryClientProvider>
  );
}

// app/layout.tsx
import QueryClientProvider from './QueryClientProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider>
          <AuthProvider>
            {/* ... */}
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
```

### Users API Endpoint [2:33:00]

```tsx
// app/api/users/route.ts
import { prisma } from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany({
    orderBy: { name: 'asc' },
  });
  
  return NextResponse.json(users);
}
```

## Section 11: Dashboard [2:35:00]

> **Mosh**: "A dashboard gives instant insight into your project's health."

### Dashboard Layout [2:35:30]

```tsx
// app/page.tsx
import { Flex, Grid } from '@radix-ui/themes';
import IssueChart from './IssueChart';
import IssueSummary from './IssueSummary';
import LatestIssues from './LatestIssues';
import { prisma } from '@/prisma/client';
import { Metadata } from 'next';

export default async function Home() {
  const open = await prisma.issue.count({
    where: { status: 'OPEN' },
  });
  const inProgress = await prisma.issue.count({
    where: { status: 'IN_PROGRESS' },
  });
  const closed = await prisma.issue.count({
    where: { status: 'CLOSED' },
  });
  
  return (
    <Grid columns={{ initial: '1', md: '2' }} gap="5">
      <Flex direction="column" gap="5">
        <IssueSummary open={open} inProgress={inProgress} closed={closed} />
        <IssueChart open={open} inProgress={inProgress} closed={closed} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: 'Issue Tracker - Dashboard',
  description: 'View a summary of project issues',
};
```

### Issue Summary Cards [2:37:00]

```tsx
// app/IssueSummary.tsx
import { Status } from '@prisma/client';
import { Card, Flex, Text } from '@radix-ui/themes';
import Link from 'next/link';

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

export default function IssueSummary({ open, inProgress, closed }: Props) {
  const containers: {
    label: string;
    value: number;
    status: Status;
  }[] = [
    { label: 'Open Issues', value: open, status: 'OPEN' },
    { label: 'In-progress Issues', value: inProgress, status: 'IN_PROGRESS' },
    { label: 'Closed Issues', value: closed, status: 'CLOSED' },
  ];
  
  return (
    <Flex gap="4">
      {containers.map((container) => (
        <Card key={container.label}>
          <Flex direction="column" gap="1">
            <Link
              className="text-sm font-medium"
              href={`/issues?status=${container.status}`}
            >
              {container.label}
            </Link>
            <Text size="5" className="font-bold">
              {container.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
}
```

### Chart Component with Recharts [2:39:00]

> **Mosh**: "Visualizations make data come alive."

```tsx
// app/IssueChart.tsx
'use client';

import { Card } from '@radix-ui/themes';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

export default function IssueChart({ open, inProgress, closed }: Props) {
  const data = [
    { label: 'Open', value: open },
    { label: 'In Progress', value: inProgress },
    { label: 'Closed', value: closed },
  ];
  
  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" barSize={60} style={{ fill: 'var(--accent-9)' }} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
```

### Latest Issues Component [2:41:00]

```tsx
// app/LatestIssues.tsx
import { prisma } from '@/prisma/client';
import { Avatar, Card, Flex, Heading, Table } from '@radix-ui/themes';
import Link from 'next/link';
import { IssueStatusBadge } from './components';

export default async function LatestIssues() {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: {
      assignedToUser: true,
    },
  });
  
  return (
    <Card>
      <Heading size="4" mb="5">
        Latest Issues
      </Heading>
      <Table.Root>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex justify="between">
                  <Flex direction="column" align="start" gap="2">
                    <Link href={`/issues/${issue.id}`}>
                      {issue.title}
                    </Link>
                    <IssueStatusBadge status={issue.status} />
                  </Flex>
                  {issue.assignedToUser && (
                    <Avatar
                      src={issue.assignedToUser.image!}
                      fallback="?"
                      size="2"
                      radius="full"
                    />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
}
```

## Performance Optimization [2:43:00]

> **Mosh**: "Performance is not optional. Let's make this lightning fast."

### Metadata for SEO [2:43:30]

```tsx
// app/issues/[id]/page.tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  
  return {
    title: issue?.title,
    description: 'Details of issue ' + issue?.id,
  };
}
```

### Lazy Loading with Dynamic Imports [2:45:00]

```tsx
// Dynamic import for heavy components
import dynamic from 'next/dynamic';

const IssueForm = dynamic(
  () => import('@/app/issues/_components/IssueForm'),
  { 
    ssr: false,
    loading: () => <IssueFormSkeleton />
  }
);
```

### Loading Skeletons [2:46:00]

```tsx
// app/issues/loading.tsx
import { Table } from '@radix-ui/themes';
import { Skeleton } from '@/app/components';

export default function LoadingIssuesPage() {
  const issues = [1, 2, 3, 4, 5];
  
  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map(issue => (
            <Table.Row key={issue}>
              <Table.Cell>
                <Skeleton />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}
```

## Production Deployment [2:48:00]

> **Mosh**: "Let's take this live. Production deployment with Vercel is magical."

### Environment Variables Setup

```bash
# .env.production
DATABASE_URL="mysql://production_connection_string"
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="your-production-secret"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### Build Optimization

```json
// package.json
{
  "scripts": {
    "build": "prisma generate && prisma migrate deploy && next build",
    "postinstall": "prisma generate"
  }
}
```

### Vercel Deployment Commands

```bash
# Deploy to Vercel
vercel --prod

# Set environment variables
vercel env add DATABASE_URL production
vercel env add NEXTAUTH_SECRET production
```

## Course Completion Checklist

- [x] Project setup with Next.js 13+
- [x] Navigation bar with responsive design
- [x] MySQL database integration
- [x] Prisma ORM configuration
- [x] Creating issues with validation
- [x] Viewing issues in tables
- [x] Updating issues
- [x] Deleting issues with confirmation
- [x] Filtering and sorting
- [x] Pagination
- [x] Authentication with NextAuth
- [x] Assigning issues to users
- [x] Dashboard with charts
- [x] Performance optimizations
- [x] Production deployment

## Mosh's Final Words

> **Mosh**: "You've built a production-ready application. This is not a toy - this is real software engineering. Keep building, keep learning, and remember - the best way to learn is by doing."

### What You've Learned
- Modern Next.js with App Router
- Type-safe database access with Prisma
- Authentication flows with NextAuth
- Accessible UI with Radix UI
- Form handling with React Hook Form
- Data validation with Zod
- State management with React Query
- Performance optimization techniques
- Production deployment strategies

### Next Steps from Mosh
1. Add more features (comments, attachments, notifications)
2. Implement real-time updates with WebSockets
3. Add comprehensive testing
4. Create a mobile app with React Native
5. Scale with microservices architecture