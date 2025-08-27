# Ticket 5: Next.js Tutorial for Beginners

## Video Information
**Title**: Next.js Tutorial for Beginners - Nextjs 13 (App Router) with TypeScript  
**URL**: https://youtu.be/ZVnjOPwW4ZA  
**Focus**: Fundamentals and core concepts of Next.js 13+

## Project Setup

### Step 1: Create the Next.js Project
```bash
npx create-next-app@latest nextjs-tutorial --typescript --tailwind --app
```

### Step 2: Navigate to the Project
```bash
cd nextjs-tutorial
```

### Step 3: Start the Development Server
```bash
npm run dev
```

When prompted, select:
- ✔ Would you like to use TypeScript? → **Yes**
- ✔ Would you like to use ESLint? → **Yes**
- ✔ Would you like to use Tailwind CSS? → **Yes**
- ✔ Would you like to use `src/` directory? → **No**
- ✔ Would you like to use App Router? → **Yes**
- ✔ Would you like to customize the default import alias? → **No**

## Video Curriculum Breakdown

### Section 1: Introduction & Prerequisites [0:00:00 - 0:03:16]
- Course Intro [0:00:00]
- Prerequisites (React knowledge) [0:02:12]

### Section 2: Next.js Fundamentals [0:03:16 - 0:13:10]
- Next.js Fundamentals Overview [0:03:16]
- What is Next.js? [0:03:54]
- Setting Up the Development Environment [0:06:34]
- Creating Your First Next.js Project [0:07:59]
- Project Structure [0:10:21]

### Section 3: Routing & Navigation [0:13:10 - 0:18:25]
- Routing and Navigation basics [0:13:10]
- File-based routing system
- Creating pages in app directory
- Dynamic routes
- Link component for navigation

### Section 4: Components Architecture [0:18:25 - 0:27:19]
- Client and Server Components [0:18:25]
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
- Data Fetching [0:27:19]
- Caching [0:33:23]
- Static and Dynamic Rendering [0:35:48]

### Section 6: Styling Next.js Applications [0:39:56 - 0:54:56]
- Styling Overview [0:39:56]
- Global Styles [0:40:16]
- CSS Modules [0:42:50]
- Tailwind CSS [0:47:17]
- DaisyUI [0:54:56]

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

## Video Progress Tracking

### Introduction (15 min)
- [ ] Prerequisites
- [ ] What is Next.js?
- [ ] Course Overview

### Getting Started (20 min)
- [ ] Installation
- [ ] Creating Next Project
- [ ] Project Files
- [ ] Dev Environment

### Routing & Navigation (30 min)
- [ ] Creating Routes
- [ ] Navigation
- [ ] Dynamic Routes
- [ ] Catch-all Routes

### Building UIs (25 min)
- [ ] Defining Routes
- [ ] Pages
- [ ] Layouts
- [ ] Links and Navigation

### Client and Server Components (20 min)
- [ ] Client vs Server Rendering
- [ ] Server Components
- [ ] Client Components
- [ ] When to Use Which

### Data Fetching (25 min)
- [ ] Fetching on the Server
- [ ] Static Rendering
- [ ] Dynamic Rendering
- [ ] Incremental Static Regeneration

### Caching (15 min)
- [ ] Data Cache
- [ ] Full Route Cache
- [ ] Router Cache
- [ ] Revalidation

### Styling (20 min)
- [ ] Global Styles
- [ ] CSS Modules
- [ ] Tailwind CSS
- [ ] DaisyUI

## Notes Section

### Personal Learning Notes
<!-- Add your own notes here as you work through the video -->

### Questions to Research
<!-- Track questions that come up during the tutorial -->

### Concepts to Review
<!-- Mark concepts that need more practice -->