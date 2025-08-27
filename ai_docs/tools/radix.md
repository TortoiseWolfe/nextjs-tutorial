# Radix UI Documentation

## What is Radix UI?

**Definition**: An open-source component library that provides low-level UI primitives to build high-quality, accessible design systems and web applications.

**Philosophy**: Unstyled, accessible components that you can style to match your design system.

## Why Use Radix UI?

### Problems It Solves
1. **Accessibility Complexity**: WAI-ARIA compliance built-in
2. **Keyboard Navigation**: Complex interactions handled
3. **Focus Management**: Proper focus trapping and restoration
4. **Screen Reader Support**: Announced correctly
5. **Component Behavior**: Complex state management handled

### Benefits
- Zero runtime styles (you control styling)
- Framework agnostic primitives
- Composable architecture
- TypeScript support
- Tree-shakeable
- No design opinions

## Setup in Next.js

### Installation
```bash
# Install Radix Themes (styled components)
npm install @radix-ui/themes

# Or install individual primitives
npm install @radix-ui/react-dialog
npm install @radix-ui/react-dropdown-menu
npm install @radix-ui/react-select
```

### Basic Setup with Radix Themes
```tsx
// app/layout.tsx
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Theme>
          {children}
        </Theme>
      </body>
    </html>
  );
}
```

### Custom Theme Configuration
```tsx
// app/layout.tsx
<Theme
  accentColor="blue"
  grayColor="slate"
  radius="medium"
  scaling="100%"
>
  {children}
</Theme>
```

## Core Concepts

### Primitive Components
Unstyled, accessible building blocks:
- **Dialog**: Modal dialogs
- **DropdownMenu**: Dropdown menus
- **Select**: Custom select inputs
- **Tabs**: Tab interfaces
- **Toast**: Notification toasts
- **Tooltip**: Tooltips
- **Accordion**: Collapsible sections

### Component Anatomy
Each component typically has:
```tsx
import * as Dialog from '@radix-ui/react-dialog';

// Root - Contains all parts
<Dialog.Root>
  // Trigger - Opens the dialog
  <Dialog.Trigger />
  
  // Portal - Renders outside DOM hierarchy
  <Dialog.Portal>
    // Overlay - Background overlay
    <Dialog.Overlay />
    
    // Content - The dialog itself
    <Dialog.Content>
      <Dialog.Title />
      <Dialog.Description />
      <Dialog.Close />
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
```

## Common Components

### Dialog/Modal
```tsx
import * as Dialog from '@radix-ui/react-dialog';

export function Modal() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Open Modal
        </button>
      </Dialog.Trigger>
      
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl">
          <Dialog.Title className="text-lg font-bold mb-2">
            Modal Title
          </Dialog.Title>
          <Dialog.Description className="text-gray-600 mb-4">
            Modal description goes here
          </Dialog.Description>
          <Dialog.Close asChild>
            <button className="bg-gray-200 px-4 py-2 rounded">
              Close
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
```

### Dropdown Menu
```tsx
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

export function Dropdown() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="p-2 rounded hover:bg-gray-100">
          Options
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="bg-white rounded-md shadow-lg p-1 min-w-[180px]">
          <DropdownMenu.Item className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded">
            Edit
          </DropdownMenu.Item>
          <DropdownMenu.Item className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded">
            Duplicate
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="h-px bg-gray-200 my-1" />
          <DropdownMenu.Item className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded text-red-600">
            Delete
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
```

### Select Component
```tsx
import * as Select from '@radix-ui/react-select';

export function SelectDemo() {
  return (
    <Select.Root>
      <Select.Trigger className="inline-flex items-center justify-between rounded px-4 py-2 bg-white border gap-2 min-w-[180px]">
        <Select.Value placeholder="Select an option" />
        <Select.Icon>▼</Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className="bg-white rounded-md shadow-lg">
          <Select.Viewport className="p-1">
            <Select.Item value="option1" className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded">
              <Select.ItemText>Option 1</Select.ItemText>
            </Select.Item>
            <Select.Item value="option2" className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded">
              <Select.ItemText>Option 2</Select.ItemText>
            </Select.Item>
            <Select.Item value="option3" className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded">
              <Select.ItemText>Option 3</Select.ItemText>
            </Select.Item>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
```

### Tabs
```tsx
import * as Tabs from '@radix-ui/react-tabs';

export function TabsDemo() {
  return (
    <Tabs.Root defaultValue="tab1" className="w-full">
      <Tabs.List className="flex border-b">
        <Tabs.Trigger value="tab1" className="px-4 py-2 hover:bg-gray-100 data-[state=active]:border-b-2 data-[state=active]:border-blue-500">
          Tab 1
        </Tabs.Trigger>
        <Tabs.Trigger value="tab2" className="px-4 py-2 hover:bg-gray-100 data-[state=active]:border-b-2 data-[state=active]:border-blue-500">
          Tab 2
        </Tabs.Trigger>
      </Tabs.List>
      
      <Tabs.Content value="tab1" className="p-4">
        Content for Tab 1
      </Tabs.Content>
      <Tabs.Content value="tab2" className="p-4">
        Content for Tab 2
      </Tabs.Content>
    </Tabs.Root>
  );
}
```

## Styling Radix Components

### With Tailwind CSS
```tsx
// Combine Radix primitives with Tailwind utilities
<Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out" />

<Dialog.Content className="fixed top-1/2 left-1/2 max-h-[85vh] w-[90vw] max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-xl">
  {/* Content */}
</Dialog.Content>
```

### With CSS Modules
```css
/* Dialog.module.css */
.overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
}

.content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}
```

### Data Attributes for State
```css
/* Style based on component state */
[data-state="open"] {
  animation: fadeIn 150ms ease;
}

[data-state="closed"] {
  animation: fadeOut 150ms ease;
}

[data-disabled] {
  opacity: 0.5;
  pointer-events: none;
}
```

## Advanced Patterns

### Controlled Components
```tsx
function ControlledDialog() {
  const [open, setOpen] = useState(false);
  
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>Open</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Content>
          {/* Content */}
          <button onClick={() => setOpen(false)}>
            Custom Close
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
```

### Composing Custom Components
```tsx
// Create reusable styled components
const StyledDialog = {
  Overlay: forwardRef(({ className, ...props }, ref) => (
    <Dialog.Overlay
      ref={ref}
      className={cn(
        "fixed inset-0 bg-black/50",
        className
      )}
      {...props}
    />
  )),
  
  Content: forwardRef(({ className, children, ...props }, ref) => (
    <Dialog.Portal>
      <StyledDialog.Overlay />
      <Dialog.Content
        ref={ref}
        className={cn(
          "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          "bg-white rounded-lg p-6 shadow-xl",
          className
        )}
        {...props}
      >
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  ))
};
```

### Form Integration
```tsx
import * as Form from '@radix-ui/react-form';

function ContactForm() {
  return (
    <Form.Root className="w-full max-w-md">
      <Form.Field name="email">
        <Form.Label className="block text-sm font-medium mb-1">
          Email
        </Form.Label>
        <Form.Control asChild>
          <input 
            type="email" 
            required 
            className="w-full px-3 py-2 border rounded"
          />
        </Form.Control>
        <Form.Message match="valueMissing">
          Please enter your email
        </Form.Message>
        <Form.Message match="typeMismatch">
          Please provide a valid email
        </Form.Message>
      </Form.Field>
      
      <Form.Submit asChild>
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          Submit
        </button>
      </Form.Submit>
    </Form.Root>
  );
}
```

## Accessibility Features

### Built-in ARIA Support
- Proper ARIA attributes
- Role management
- Screen reader announcements
- Focus management

### Keyboard Navigation
```tsx
// All components support keyboard navigation
<DropdownMenu.Root>
  {/* Arrow keys to navigate */}
  {/* Enter/Space to select */}
  {/* Escape to close */}
</DropdownMenu.Root>
```

### Focus Management
```tsx
// Focus is trapped within modals
<Dialog.Root>
  <Dialog.Content>
    {/* Focus stays within until closed */}
    {/* Focus returns to trigger on close */}
  </Dialog.Content>
</Dialog.Root>
```

## Best Practices

### 1. Use asChild for Custom Triggers
```tsx
// Merge props with your own component
<Dialog.Trigger asChild>
  <MyCustomButton />
</Dialog.Trigger>
```

### 2. Always Use Portals for Overlays
```tsx
// Renders outside DOM hierarchy to avoid z-index issues
<Dialog.Portal>
  <Dialog.Overlay />
  <Dialog.Content />
</Dialog.Portal>
```

### 3. Provide Labels and Descriptions
```tsx
<Dialog.Content>
  <Dialog.Title>Delete Item</Dialog.Title>
  <Dialog.Description>
    This action cannot be undone.
  </Dialog.Description>
</Dialog.Content>
```

### 4. Handle Loading States
```tsx
function AsyncSelect() {
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState([]);
  
  useEffect(() => {
    fetchOptions().then(data => {
      setOptions(data);
      setLoading(false);
    });
  }, []);
  
  return (
    <Select.Root disabled={loading}>
      {/* Select implementation */}
    </Select.Root>
  );
}
```

## Common Issues & Solutions

### Styling Issues
- Use `asChild` to pass styles to triggers
- Check data attributes for state styling
- Ensure Portal components render correctly

### Z-Index Problems
- Use Portals for overlay components
- Set appropriate z-index on Portal containers
- Check stacking context issues

### TypeScript Errors
```tsx
// Properly type forwarded refs
const MyComponent = forwardRef<
  HTMLButtonElement,
  ButtonProps
>((props, ref) => {
  return <button ref={ref} {...props} />;
});
```

## Integration with Next.js

### With Server Components
```tsx
// Server Component (layout.tsx)
import { DialogProvider } from './providers';

export default function Layout({ children }) {
  return <DialogProvider>{children}</DialogProvider>;
}

// Client Component (providers.tsx)
'use client';
import * as Dialog from '@radix-ui/react-dialog';

export function DialogProvider({ children }) {
  return (
    <Dialog.Root>
      {children}
    </Dialog.Root>
  );
}
```

### With App Router
```tsx
// Use client components for interactive Radix components
'use client';

import * as Accordion from '@radix-ui/react-accordion';

export function FAQ({ items }) {
  return (
    <Accordion.Root type="single" collapsible>
      {items.map(item => (
        <Accordion.Item key={item.id} value={item.id}>
          <Accordion.Trigger>{item.question}</Accordion.Trigger>
          <Accordion.Content>{item.answer}</Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
```

## Resources

- [Official Docs](https://www.radix-ui.com/docs/primitives/overview/introduction)
- [Radix Themes](https://www.radix-ui.com/themes/docs/overview/getting-started)
- [Examples](https://github.com/radix-ui/primitives/tree/main/examples)
- [Component Demos](https://www.radix-ui.com/docs/primitives/components/dialog)
- [Accessibility Guidelines](https://www.radix-ui.com/docs/primitives/overview/accessibility)