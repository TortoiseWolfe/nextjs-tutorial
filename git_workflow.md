# Git Workflow Quick Reference

## Current Learning Session
**Active Branch**: `ticket-5/section-1-introduction`
**Video Section**: Introduction (15 min)
**Learning Journal**: `progress/section_1_learning_journal.md`

## Essential Commands for Parallel Terminal

### Starting Your Session
```bash
# 1. Check where you are
git branch --show-current

# 2. Switch to learning branch
git checkout ticket-5/section-1-introduction

# 3. Verify you're on the right branch
git branch --show-current
# Should output: ticket-5/section-1-introduction
```

### During Learning
```bash
# Check what's changed
git status

# See actual changes
git diff

# Stage your learning notes
git add progress/section_1_learning_journal.md
# OR stage everything
git add .

# Commit with meaningful message
git commit -m "Section 1: Notes on SSR vs CSR"
```

### Pushing Your Work
```bash
# First push (sets up tracking)
git push -u origin ticket-5/section-1-introduction

# All subsequent pushes
git push
```

### Creating New Section Branch
```bash
# When ready for Section 2
git checkout main
git pull origin main
git checkout -b ticket-5/section-2-getting-started
```

## Commit Message Patterns

### For Learning Notes
```bash
git commit -m "Section 1: Understanding Next.js benefits"
git commit -m "Section 1: Pre-watch predictions added"
git commit -m "Section 1: Completed introduction with aha moments"
```

### For Code Examples
```bash
git commit -m "Section 2: First Next.js app created"
git commit -m "Section 2: Explored project structure"
```

### For Exercises
```bash
git commit -m "Exercise 1: Multi-page navigation working"
git commit -m "Exercise 1: Fixed routing issue"
```

## Branch Management

### Current Branches Structure
```
main
└── ticket-5/section-1-introduction (YOU ARE HERE)
    Future branches:
    ├── ticket-5/section-2-getting-started
    ├── ticket-5/section-3-routing
    ├── ticket-5/section-4-components
    └── ticket-5/exercise-1-multi-page
```

### Checking Remote Branches
```bash
# See all branches (local and remote)
git branch -a

# See just remote branches
git branch -r

# Fetch latest from remote
git fetch origin
```

## If Things Go Wrong

### Forgot to Switch Branches
```bash
# If you made changes on main by accident
git stash
git checkout ticket-5/section-1-introduction
git stash pop
```

### Want to See What You Changed
```bash
# See commit history
git log --oneline -5

# See what changed in last commit
git show HEAD
```

### Need to Sync with Remote
```bash
# Get latest changes
git fetch origin
git pull origin ticket-5/section-1-introduction
```

## Quick Status Check
Run this anytime to see where you are:
```bash
echo "Branch: $(git branch --show-current)"
echo "Status:"
git status -s
echo "Last commit:"
git log --oneline -1
```

## Remember
- **ALWAYS** check your branch before making changes
- **COMMIT** frequently with descriptive messages
- **PUSH** regularly to save your work
- **NEVER** work directly on main

## Your Learning Workflow
1. `git checkout ticket-5/section-1-introduction` - Start on right branch
2. Watch video section & update learning journal
3. `git add . && git commit -m "Section 1: [what you learned]"` - Save progress
4. `git push` - Backup to remote
5. Repeat for each video section
6. Create PR when section complete for self-review

## 🔄 Merging Back to Main

### Option 1: GitHub Pull Request (RECOMMENDED - Best Practice)
```bash
# 1. Push all your changes to the feature branch
git add .
git commit -m "Section 1: Completed introduction section"
git push origin ticket-5/section-1-introduction

# 2. Go to GitHub and you'll see a banner:
# "ticket-5/section-1-introduction had recent pushes"
# Click "Compare & pull request"

# 3. In the PR:
# - Title: "Section 1: Introduction to Next.js - Completed"
# - Description: What you learned, any aha moments
# - Review your own changes
# - Click "Create pull request"
# - Click "Merge pull request"
# - Click "Delete branch" (cleans up the remote)
```

### Option 2: Command Line Merge (Quick but Less Review)
```bash
# 1. Make sure your feature branch is fully committed
git status  # Should show "nothing to commit"

# 2. Switch to main
git checkout main

# 3. Pull latest main (in case of any updates)
git pull origin main

# 4. Merge your feature branch
git merge ticket-5/section-1-introduction

# 5. Push the updated main
git push origin main

# 6. Delete the feature branch locally
git branch -d ticket-5/section-1-introduction

# 7. Delete the feature branch on remote
git push origin --delete ticket-5/section-1-introduction
```

### Option 3: Using GitHub CLI (If Installed)
```bash
# Create and merge PR from command line
gh pr create --title "Section 1: Introduction Completed" \
             --body "Completed introduction section with learning notes"
             
# View the PR in browser
gh pr view --web

# After review, merge it
gh pr merge --merge --delete-branch
```

## 📝 Why Pull Requests are Better for Learning

1. **Self-Review**: Forces you to look at what you actually learned
2. **Progress History**: Creates a clear record of each learning milestone
3. **Reflection Time**: The PR description makes you summarize your learning
4. **Mistake Prevention**: Can't accidentally mess up main branch
5. **Portfolio Building**: Shows your learning process to potential employers

## 🎯 When to Merge to Main

Merge your feature branch to main when:
- ✅ Section is fully completed
- ✅ Learning journal is filled out
- ✅ You can explain the concepts learned
- ✅ Any code examples are working
- ✅ You've reflected on what you learned

## 🔍 Checking Your Merge History
```bash
# See merge history
git log --graph --oneline --all

# See what branches have been merged
git branch --merged main

# See what branches haven't been merged yet
git branch --no-merged main
```

## 💡 Learning Checkpoint Pattern

Each section follows this pattern:
```
main
  ↓
ticket-5/section-1-introduction (create branch)
  ↓
[watch, learn, commit multiple times]
  ↓
Push to remote
  ↓
Create Pull Request
  ↓
Review your own learning
  ↓
Merge PR to main
  ↓
main (now has Section 1 complete)
  ↓
ticket-5/section-2-getting-started (create next branch)
```

## 🚨 Important Notes

- **Never merge incomplete work** - Each merge should represent completed learning
- **Write meaningful PR descriptions** - This is your learning diary
- **Review your own changes** - Reinforces what you learned
- **Keep main clean** - Only reviewed, understood content goes there