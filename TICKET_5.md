# Ticket 5: [Next.js Tutorial for Beginners - Nextjs 13 (App Router) with TypeScript](https://youtu.be/ZVnjOPwW4ZA "Fundamentals and core concepts of Next.js 13+")

## Video Learning Curriculum

> **Note**: Follow along with the video - commands appear exactly when Mosh demonstrates them

### Section 1: Introduction & Prerequisites [0:00:00 - 0:03:16]
- [ ] Course Intro [0:00:00]
- [ ] Prerequisites (React knowledge) [0:02:12]

### Section 2: Next.js Fundamentals & Setup [0:03:16 - 0:13:10]
- [ ] Next.js Fundamentals Overview [0:03:16]
- [ ] What is Next.js? [0:03:54]
- [ ] Setting Up the Development Environment [0:06:34]
- [ ] Creating Your First Next.js Project [0:07:59]

#### 📝 Follow Along at [0:08:27]
**Create the project:**
```bash
npx create-next-app@13.4
```

**When prompted:**
- Project name: `next-app`
- TypeScript? → **Yes**
- ESLint? → **Yes**
- Tailwind CSS? → **No** (added later at 0:47:17)
- `src/` directory? → **No** (keeps structure simple)
- App Router? → **Yes**
- Customize import alias? → **No**

**Navigate to project:**
```bash
cd next-app
```

**Start development server:**
```bash
npm run dev
```

- [ ] Project Structure [0:10:21]

### Section 3: Routing & Navigation [0:13:10 - 0:18:25]
- [ ] Routing and Navigation basics [0:13:10]
- [ ] File-based routing system
- [ ] Creating pages in app directory
- [ ] Dynamic routes
- [ ] Link component for navigation

### Section 4: Components Architecture [0:18:25 - 0:27:19]
- [ ] Client and Server Components [0:18:25]
- [ ] When to use Server Components
- [ ] When to use Client Components
```tsx
// Server Component (Default - No "use client")
export default async function ServerComponent() {
  const data = await fetch('/api/data');
  return <div>{data}</div>;
}

// Client Component (Interactive)
"use client";
import { useState } from 'react';

export default function ClientComponent() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### Section 5: Data Fetching, Caching & Rendering [0:27:19 - 0:39:56]
- [ ] Data Fetching [0:27:19]
- [ ] Caching [0:33:23]
- [ ] Static and Dynamic Rendering [0:35:48]

### Section 6: Styling Next.js Applications [0:39:56 - 0:54:56]
- [ ] Styling Overview [0:39:56]
- [ ] Global Styles [0:40:16]
- [ ] CSS Modules [0:42:50]
- [ ] Tailwind CSS [0:47:17]
- [ ] DaisyUI [0:54:56]

## Key Takeaways from Mosh

### On Next.js Benefits
- "SSR makes applications faster and more search engine friendly"
- "Smaller bundle sizes with server components"
- "Better resource management on the client"

### On Component Strategy
- "Server components are the default for a reason"
- "Client-side navigation reduces server requests"
- "TypeScript catches errors before runtime"

### On Development
- "File-based routing eliminates configuration complexity"
- "The app router provides better code organization"
- "Next.js handles the heavy lifting of optimization"

## Hands-On Exercises from Video
1. Create a users page that fetches data
2. Implement loading and error states
3. Style components with different approaches
4. Build navigation with active states
5. Convert client components to server components

## Common Issues Addressed
- TypeScript configuration
- Module resolution
- Client vs Server component errors
- Hydration mismatches
- CSS Module imports

## Checklist Before Moving to Ticket 6
- [ ] Understand App Router structure
- [ ] Can create server and client components
- [ ] Know when to use which component type
- [ ] Comfortable with file-based routing
- [ ] Can fetch data on the server
- [ ] Understand caching basics
- [ ] Have tried all styling approaches
- [ ] TypeScript types are working

## Learning Notes & Insights
*Document observations and "why" explanations as you watch*

### Setup & Teaching Choices Explained
- [x] **Why no src directory**: Keeps tutorial simple, reduces file nesting, shorter paths in demonstrations
- [x] **Why no Tailwind initially**: Teaches styling progressively - CSS Modules first, then Tailwind to show evolution
- [x] **Why TypeScript**: Industry standard, catches errors early, better learning experience
- [ ] **When to use server vs client components**: (Document as you learn)
- [ ] **Performance implications**: (Note differences as demonstrated)
- [ ] **File organization patterns**: (Observe how Mosh structures the app)

### Personal Learning Notes
<!-- Add your own notes here as you work through the video -->

### Questions to Research
<!-- Track questions that come up during the tutorial -->

### Concepts to Review
<!-- Mark concepts that need more practice -->