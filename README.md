# Next.js Course Implementation - Tickets 5 & 6

## Course: Mastering Next.js 13 with TypeScript
**Instructor**: Mosh Hamedani  
**Current Ticket**: 5  
**Repository**: `Tkt_005`

## 🌳 Git Workflow - Breaking the Main Branch Habit

### Branch Naming Convention
```bash
# For learning sections
ticket-5/section-{number}-{topic}
ticket-5/exercise-{number}

# For features (Ticket 6)
ticket-6/feature-{name}
ticket-6/bugfix-{issue}
```

### Current Branch Strategy
```bash
# Start new section
git checkout -b ticket-5/section-1-introduction

# Make changes and commit regularly
git add .
git commit -m "Section 1: Understanding SSR concepts"

# Push to remote when ready
git push -u origin ticket-5/section-1-introduction

# Create PR for review and merge to main
```

### Active Branches
- `main` - Stable, reviewed content
- `ticket-5/section-1-introduction` - Currently working (YOU ARE HERE)

### Quick Terminal Commands
```bash
# Essential commands for parallel terminal
git checkout ticket-5/section-1-introduction  # Switch to learning branch
git branch --show-current                      # Verify you're on right branch
git status                                      # Check what's changed
git add . && git commit -m "Section 1: [topic]" # Save your progress
git push                                        # Backup to remote
```

📋 **Full Git Workflow Guide**: [git_workflow.md](./git_workflow.md)

---

## 🎫 Ticket 5: Next.js Tutorial for Beginners
**Video**: <a href="https://youtu.be/ZVnjOPwW4ZA" target="_blank">Next.js Tutorial for Beginners - Nextjs 13 (App Router) with TypeScript</a>  
**Repository**: `TortoiseWolfe/nextjs-tutorial`  
**Status**: In Progress  
**Current Branch**: `ticket-5/section-1-introduction`

### Video Curriculum Progress
- [ ] **Introduction & Prerequisites**
- [ ] **Next.js Fundamentals**
  - [ ] What is Next.js?
  - [ ] Setting Up Development Environment
  - [ ] Creating Your First Next.js Project
  - [ ] Project Structure
- [ ] **Routing and Navigation**
  - [ ] File-based routing with App Router
  - [ ] Dynamic routes
  - [ ] Navigation with Link component
- [ ] **Components Deep Dive**
  - [ ] Client Components
  - [ ] Server Components
  - [ ] When to use which
- [ ] **Data Management**
  - [ ] Data Fetching strategies
  - [ ] Caching mechanisms
  - [ ] Static vs Dynamic Rendering
- [ ] **Styling Evolution**
  - [ ] Global Styles
  - [ ] CSS Modules
  - [ ] Tailwind CSS setup
  - [ ] DaisyUI components

### Key Concepts from Video
- "Server-side rendering makes apps faster and SEO-friendly"
- "Client components for interactivity, Server components for data"
- "File-based routing eliminates manual route configuration"
- "TypeScript provides type safety and better development experience"

---

## 🎫 Ticket 6: Build Full-Stack Issue Tracker
**Video**: <a href="https://youtu.be/J9sfR6HN6BY" target="_blank">Build a Full-Stack App with Next.js, Tailwind, Radix UI, and Prisma</a>  
**Repository**: [To be created after Ticket 5]  
**Status**: Not Started

### Video Curriculum Progress

#### Project Setup
- [ ] Introduction & Prerequisites
- [ ] Source Code overview
- [ ] Project Roadmap
- [ ] Development Environment Setup
- [ ] Creating New Project

#### Building the Foundation
- [ ] **NavBar Implementation**
  - [ ] Building the NavBar
  - [ ] Styling the Active Link
  
#### Creating Issues Module (65 minutes)
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

#### Viewing Issues Module (54 minutes)
- [ ] Fetching issues
- [ ] Displaying issue list
- [ ] Issue details page
- [ ] Status badges
- [ ] Filtering and sorting

#### Additional Features (Based on full course)
- [ ] User authentication (NextAuth)
- [ ] Dashboard with charts
- [ ] Pagination
- [ ] Search functionality
- [ ] Deployment preparation

### Tool Understanding Framework
For each tool, document:
1. **What it does**: Core functionality
2. **Why we use it**: Problems it solves
3. **How it integrates**: With Next.js and other tools
4. **Best practices**: Mosh's recommended patterns

---

## 🏗️ Issue Tracker Project Structure

### Current Implementation Phase
- [ ] Phase 1: Basic setup (Ticket 5 foundations)
- [ ] Phase 2: UI enhancement (Tailwind + Radix)
- [ ] Phase 3: Database integration (Prisma)
- [ ] Phase 4: Authentication (NextAuth)
- [ ] Phase 5: Full features
- [ ] Phase 6: Deployment

### Today's Focus
**Working on**: Starting documentation structure  
**Ticket**: 5  
**Objective**: Understanding Next.js fundamentals  
**Implementation**: Setting up learning environment  

## 📝 Daily Learning Log
| Date | Ticket | Topic | Key Learning | Challenges |
|------|--------|-------|--------------|------------|
| | | | | |

## 🔧 Tool Integration Notes

### Tailwind CSS
- **Purpose**: Utility-first styling
- **Integration**: PostCSS with Next.js
- **Key Pattern**: Component composition with utilities

### Radix UI
- **Purpose**: Accessible, unstyled components
- **Integration**: With Tailwind for styling
- **Key Pattern**: Headless component architecture

### Prisma
- **Purpose**: Type-safe database ORM
- **Integration**: API routes and server components
- **Key Pattern**: Schema-first development

## 🐛 Common Issues & Solutions

### Ticket 5 Issues
- **Issue**: TypeScript configuration errors
  - **Solution**: Check tsconfig.json settings
  - **Prevention**: Use recommended Next.js TypeScript setup

### Ticket 6 Issues
- **Issue**: Tool integration conflicts
  - **Solution**: Check version compatibility
  - **Prevention**: Use Mosh's specified versions

## 📚 Resources

### Official Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Radix UI](https://www.radix-ui.com/docs)
- [Prisma](https://www.prisma.io/docs)

### Course Materials
- [Mosh's Course](https://codewithmosh.com/p/mastering-next-js-13-with-typescript)
- [Ticket 5 Repo](https://github.com/TortoiseWolfe/nextjs-tutorial)
- [Course Support Forum](https://forum.codewithmosh.com)

### Quick References
- 📺 <a href="https://youtu.be/ZVnjOPwW4ZA" target="_blank">React to Next.js in 100 Seconds</a> - Quick overview

## 💡 Philosophical Approach
*"It may get easy to be lost in the tooling terms... Understand what each tool is trying to DO. What functionality they ADD. This will be groundbreaking for both your technical knowledge and thinking."*

## 🚀 Next Steps
1. Complete current ticket objectives
2. Understand tool purposes, not just syntax
3. Build with intention and understanding
4. Document learnings for future reference

---

*"The sky is the limit from here. We are so excited you are here."*