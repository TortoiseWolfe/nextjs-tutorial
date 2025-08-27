# Tailwind CSS Documentation

## What is Tailwind CSS?

**Definition**: A utility-first CSS framework that provides low-level utility classes to build custom designs directly in your markup.

**Philosophy**: Instead of writing custom CSS, you compose designs using pre-built utility classes.

## Why Use Tailwind?

### Problems It Solves
1. **CSS Naming Fatigue**: No more inventing class names like `sidebar-inner-wrapper`
2. **CSS File Growth**: Your CSS stops growing with utility reuse
3. **Design Consistency**: Constrained set of values ensures consistency
4. **Development Speed**: Rapid prototyping and iteration
5. **Responsive Design**: Built-in responsive modifiers

### Benefits
- No context switching between HTML and CSS
- Smaller production CSS (with PurgeCSS)
- Design system constraints built-in
- Excellent IDE support with IntelliSense
- No CSS specificity issues

## Setup in Next.js

### Installation
```bash
# During project creation
npx create-next-app@latest my-app --tailwind

# Or add to existing project
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Configuration
```javascript
// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1e40af',
        secondary: '#64748b',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

### Global CSS
```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom utilities */
@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
```

## Core Concepts

### Utility Classes
```tsx
// Instead of writing CSS
<div className="mt-4 p-6 bg-white rounded-lg shadow-md">
  <h2 className="text-2xl font-bold text-gray-900">Title</h2>
  <p className="mt-2 text-gray-600">Description</p>
</div>
```

### Responsive Design
```tsx
// Mobile-first responsive design
<div className="w-full md:w-1/2 lg:w-1/3">
  <p className="text-sm md:text-base lg:text-lg">
    Responsive text
  </p>
</div>
```

### State Variants
```tsx
// Hover, focus, active states
<button className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
  Click me
</button>

// Dark mode
<div className="bg-white dark:bg-gray-900 text-black dark:text-white">
  Dark mode support
</div>
```

### Flexbox & Grid
```tsx
// Flexbox
<div className="flex items-center justify-between gap-4">
  <div className="flex-1">Item 1</div>
  <div className="flex-1">Item 2</div>
</div>

// Grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div>Grid item</div>
</div>
```

## Common Patterns

### Card Component
```tsx
export function Card({ title, description }) {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white">
      <div className="px-6 py-4">
        <h3 className="font-bold text-xl mb-2">{title}</h3>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
    </div>
  );
}
```

### Navigation Bar
```tsx
export function NavBar() {
  return (
    <nav className="bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <a href="/" className="font-bold text-xl">Logo</a>
            <a href="/about" className="hover:text-gray-300">About</a>
            <a href="/contact" className="hover:text-gray-300">Contact</a>
          </div>
        </div>
      </div>
    </nav>
  );
}
```

### Form Styling
```tsx
export function Form() {
  return (
    <form className="max-w-md mx-auto">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Email
        </label>
        <input 
          type="email"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Submit
      </button>
    </form>
  );
}
```

## Advanced Features

### Custom Components with CVA
```tsx
import { cva } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium',
  {
    variants: {
      variant: {
        default: 'bg-blue-500 text-white hover:bg-blue-600',
        outline: 'border border-gray-300 bg-transparent hover:bg-gray-100',
        ghost: 'hover:bg-gray-100',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-10 px-4',
        lg: 'h-11 px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export function Button({ variant, size, className, ...props }) {
  return (
    <button 
      className={buttonVariants({ variant, size, className })}
      {...props}
    />
  );
}
```

### Animation Utilities
```tsx
// Builtin animations
<div className="animate-pulse">Loading...</div>
<div className="animate-spin">⟳</div>
<div className="animate-bounce">↓</div>

// Custom animations
<div className="transition-all duration-300 ease-in-out hover:scale-105">
  Hover to scale
</div>
```

### Container Queries
```tsx
// Responsive based on container, not viewport
<div className="@container">
  <div className="@lg:flex @lg:gap-4">
    <div className="@lg:w-1/2">Content adapts to container</div>
  </div>
</div>
```

## Best Practices

### 1. Component Extraction
```tsx
// Extract repeated patterns
const styles = {
  button: 'bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded',
  card: 'bg-white rounded-lg shadow-md p-6',
  input: 'border rounded px-3 py-2 focus:outline-none focus:ring-2',
};
```

### 2. Avoid Dynamic Classes
```tsx
// ❌ Bad: Dynamic classes don't work
<div className={`text-${color}-500`} />

// ✅ Good: Use complete class names
const colors = {
  red: 'text-red-500',
  blue: 'text-blue-500',
};
<div className={colors[color]} />
```

### 3. Use Design Tokens
```javascript
// tailwind.config.js
theme: {
  extend: {
    colors: {
      primary: {
        50: '#eff6ff',
        500: '#3b82f6',
        900: '#1e3a8a',
      }
    },
    spacing: {
      '18': '4.5rem',
      '88': '22rem',
    }
  }
}
```

### 4. Responsive Breakpoints
```tsx
// Mobile-first approach
<div className="
  text-sm      // mobile
  sm:text-base // 640px+
  md:text-lg   // 768px+
  lg:text-xl   // 1024px+
  xl:text-2xl  // 1280px+
">
```

## Integration with Next.js

### With App Router
```tsx
// app/layout.tsx
import './globals.css'; // Import Tailwind

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}
```

### With CSS Modules
```css
/* Component.module.css */
.custom {
  @apply bg-blue-500 text-white p-4 rounded-lg;
}
```

### With Styled JSX
```tsx
<style jsx>{`
  div {
    @apply bg-red-500 text-white;
  }
`}</style>
```

## Common Issues & Solutions

### Classes Not Applied
- Check `content` paths in config
- Ensure classes aren't dynamically generated
- Restart dev server after config changes

### Production Build Size
- PurgeCSS automatically removes unused styles
- Use `npm run build` to see final size
- Check for unnecessary plugins

### IntelliSense Not Working
```json
// VS Code settings.json
{
  "tailwindCSS.includeLanguages": {
    "typescript": "javascript",
    "typescriptreact": "javascript"
  }
}
```

## Performance Tips

1. **Use PurgeCSS**: Automatic in production
2. **Avoid @apply in components**: Use utilities directly
3. **Minimize custom CSS**: Leverage utilities
4. **Use CSS variables**: For dynamic values
5. **Optimize fonts**: Use next/font

## Resources

- [Official Docs](https://tailwindcss.com/docs)
- [Tailwind Play](https://play.tailwindcss.com/)
- [Headless UI](https://headlessui.com/) - Unstyled components
- [Tailwind UI](https://tailwindui.com/) - Premium components
- [Heroicons](https://heroicons.com/) - Icons by Tailwind team