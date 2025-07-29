# Minerva Frontend Redesign: Chakra UI to shadcn/ui Migration

## Overview
This document outlines the complete migration from Chakra UI to shadcn/ui for the Minerva frontend. This redesign will modernize the UI with a more contemporary design system while maintaining all existing functionality.

## Migration Strategy

### Phase 1: Foundation Setup (Week 1)
**Priority: Critical**

#### shadcn/ui Installation & Configuration
- [ ] Install shadcn/ui CLI: `npx shadcn-ui@latest init`
- [ ] Configure shadcn/ui with custom theme colors (keeping brand color #c96442)
- [ ] Set up Tailwind CSS configuration for shadcn/ui components
- [ ] Install required dependencies: `lucide-react`, `class-variance-authority`, `clsx`, `tailwind-merge`
- [ ] Configure TypeScript paths for shadcn/ui components
- [ ] Set up custom CSS variables for consistent theming

#### Theme System Migration
- [ ] Create new theme configuration using CSS variables
- [ ] Map existing Chakra UI color palette to shadcn/ui theme
- [ ] Set up dark/light mode with `next-themes` (keeping existing functionality)
- [ ] Configure responsive breakpoints to match current design
- [ ] Create custom font configuration (maintaining Lora serif font)

#### Project Structure Reorganization
```
src/
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── forms/             # Form-specific components
│   ├── layout/            # Layout components
│   ├── features/          # Feature-specific components
│   └── icons/             # Custom icon components
├── lib/
│   ├── utils.ts           # Utility functions (cn helper, etc.)
│   └── validations.ts     # Form validation schemas
├── styles/
│   └── globals.css        # Global styles and CSS variables
└── hooks/                 # Custom React hooks
```

### Phase 2: Core Component Migration (Weeks 2-3)
**Priority: High**

#### Essential shadcn/ui Components Installation
- [ ] Install base components: `Button`, `Input`, `Label`, `Card`, `Badge`
- [ ] Install form components: `Form`, `Select`, `Textarea`, `Checkbox`, `RadioGroup`
- [ ] Install layout components: `Sheet`, `Dialog`, `Drawer`, `Separator`
- [ ] Install data components: `Table`, `Pagination`, `Command`, `Popover`
- [ ] Install feedback components: `Toast`, `Alert`, `Loading Spinner`
- [ ] Install navigation components: `DropdownMenu`, `Tabs`, `Breadcrumb`

#### Component-by-Component Migration Plan

##### 1. Layout Components Migration
**Target Files**: `menubar.tsx`, `ThemeToggle.tsx`

**Before (Chakra UI)**:
```tsx
import { Box, Flex, Heading, Button } from '@chakra-ui/react'
import { useColorMode } from '@chakra-ui/react'
```

**After (shadcn/ui)**:
```tsx
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useTheme } from 'next-themes'
```

- [ ] Replace `Flex` and `Box` with Tailwind CSS classes and div elements
- [ ] Replace `useColorMode` with `useTheme` from next-themes
- [ ] Replace Chakra UI buttons with shadcn/ui Button component
- [ ] Implement responsive navigation with shadcn/ui Sheet component

##### 2. Form Components Migration
**Target Files**: `AddBookDrawer.tsx`, `EditBookDrawer.tsx`

- [ ] Replace Chakra UI `Drawer` with shadcn/ui `Sheet` component
- [ ] Replace `FormControl`, `FormLabel`, `Input` with shadcn/ui form components
- [ ] Implement `react-hook-form` with `zod` validation (shadcn/ui pattern)
- [ ] Replace `Select` component with shadcn/ui `Select`
- [ ] Replace `Textarea` with shadcn/ui `Textarea`
- [ ] Replace `NumberInput` with shadcn/ui `Input` with number type
- [ ] Replace `Button` components with shadcn/ui variants

##### 3. Data Display Components Migration
**Target Files**: `BookTable.tsx`, `PaginationControls.tsx`

- [ ] Replace Chakra UI `Table` with shadcn/ui `Table` component
- [ ] Replace `Thead`, `Tbody`, `Tr`, `Th`, `Td` with shadcn/ui table components
- [ ] Replace `IconButton` with shadcn/ui `Button` variants
- [ ] Replace pagination buttons with shadcn/ui `Pagination` component
- [ ] Implement sorting icons using `lucide-react` icons
- [ ] Replace `Badge` with shadcn/ui `Badge` component

##### 4. Modal/Drawer Components Migration
**Target Files**: `BookDetailsDrawer.tsx`, `NewsletterModal.tsx`

- [ ] Replace Chakra UI `Drawer` with shadcn/ui `Sheet`
- [ ] Replace `Modal` with shadcn/ui `Dialog`
- [ ] Replace `ModalOverlay`, `ModalContent` with shadcn/ui dialog components
- [ ] Update close button styling with shadcn/ui patterns
- [ ] Implement proper focus management with shadcn/ui

##### 5. Search & Filter Components Migration
**Target Files**: `SearchWrapper.tsx`, `TableControls.tsx`

- [ ] Replace Chakra UI `Input` with shadcn/ui `Input`
- [ ] Replace `InputGroup`, `InputLeftElement` with Tailwind CSS classes
- [ ] Replace search icons with `lucide-react` icons
- [ ] Implement command palette with shadcn/ui `Command` component
- [ ] Replace filter dropdowns with shadcn/ui `Select` and `Popover`

### Phase 3: Advanced Component Implementation (Week 4)
**Priority: High**

#### Custom Component Development
- [ ] Create custom `BookCard` component using shadcn/ui `Card`
- [ ] Develop responsive `BookGrid` component for mobile views
- [ ] Build custom `RatingDisplay` component using shadcn/ui primitives
- [ ] Create `ProgressBar` component for reading progress
- [ ] Implement `BookCover` component with proper image handling

#### Mobile-First Responsive Design
- [ ] Implement mobile-responsive table that transforms to cards
- [ ] Create slide-out navigation for mobile using shadcn/ui `Sheet`
- [ ] Design touch-friendly book management interface
- [ ] Implement swipe gestures for book actions
- [ ] Create responsive pagination for mobile screens

#### Animation & Interaction Enhancements
- [ ] Add smooth transitions using Tailwind CSS and `framer-motion`
- [ ] Implement loading states with shadcn/ui `Skeleton` components
- [ ] Add hover effects and micro-interactions
- [ ] Create smooth page transitions
- [ ] Implement progressive loading for book covers

### Phase 4: Advanced Features & Polish (Week 5)
**Priority: Medium**

#### Enhanced Search Interface
- [ ] Implement command palette for quick actions using shadcn/ui `Command`
- [ ] Create advanced filter sidebar with shadcn/ui form components
- [ ] Add search suggestions with shadcn/ui `Popover`
- [ ] Implement saved searches functionality
- [ ] Create search history with clear/manage options

#### Data Visualization Components
- [ ] Create reading statistics cards using shadcn/ui `Card`
- [ ] Implement progress charts with custom components
- [ ] Build reading streak visualization
- [ ] Create genre distribution displays
- [ ] Implement reading goals tracking interface

#### Accessibility & Performance
- [ ] Ensure all components meet WCAG 2.1 AA standards
- [ ] Implement proper focus management throughout app
- [ ] Add keyboard shortcuts with proper indicators
- [ ] Optimize component bundle sizes
- [ ] Implement proper error boundaries with shadcn/ui styling

### Phase 5: Testing & Optimization (Week 6)
**Priority: High**

#### Testing Infrastructure Update
- [ ] Update all component tests for shadcn/ui components
- [ ] Create visual regression tests for new design
- [ ] Test dark/light mode functionality thoroughly
- [ ] Verify responsive design across all breakpoints
- [ ] Test accessibility with screen readers

#### Performance Optimization
- [ ] Audit bundle size after migration
- [ ] Optimize component imports and tree shaking
- [ ] Implement proper code splitting
- [ ] Add performance monitoring for key interactions
- [ ] Optimize image loading and caching

## Detailed Component Mapping

### Chakra UI → shadcn/ui Component Mapping

| Chakra UI Component | shadcn/ui Replacement | Migration Notes |
|-------------------|---------------------|----------------|
| `Box`, `Flex` | Tailwind CSS classes | Use div with Tailwind flex, grid classes |
| `Button` | `Button` | Direct replacement with variant props |
| `Input` | `Input` | Direct replacement with shadcn/ui styling |
| `Select` | `Select` | New component structure with SelectTrigger, SelectContent |
| `Modal` | `Dialog` | DialogTrigger, DialogContent, DialogHeader pattern |
| `Drawer` | `Sheet` | SheetTrigger, SheetContent, SheetHeader pattern |
| `Table` | `Table` | TableHeader, TableBody, TableRow, TableCell structure |
| `Badge` | `Badge` | Direct replacement with variant props |
| `Card` | `Card` | CardHeader, CardContent, CardFooter structure |
| `Toast` | `toast()` function | Functional approach with Sonner integration |
| `FormControl` | `Form` | react-hook-form integration required |
| `IconButton` | `Button` variant | Use Button with size="icon" variant |
| `useColorMode` | `useTheme` | next-themes integration |
| `ColorModeScript` | `ThemeProvider` | next-themes provider pattern |

### Theme Configuration Migration

#### Color Palette Mapping
```css
/* Chakra UI colors */
--chakra-colors-brand-500: #c96442;

/* shadcn/ui CSS variables */
:root {
  --primary: 25 69 66; /* #c96442 in HSL */
  --primary-foreground: 0 0% 98%;
  --secondary: 210 40% 98%;
  --secondary-foreground: 222.2 84% 4.9%;
  /* ... additional color mappings */
}
```

#### Typography Migration
```css
/* Current Lora font configuration */
@import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&display=swap');

/* Tailwind font configuration */
module.exports = {
  theme: {
    fontFamily: {
      sans: ['Lora', 'serif'],
      serif: ['Lora', 'serif'],
    }
  }
}
```

## Risk Assessment & Mitigation

### High Risk Items
- **Component Functionality Loss**: Ensure all Chakra UI features are replicated
- **Design System Consistency**: Maintain visual consistency during migration
- **Performance Regression**: Monitor bundle size and rendering performance

### Medium Risk Items
- **Theme System Changes**: Ensure dark/light mode continues working
- **Mobile Responsiveness**: Verify responsive behavior across devices
- **Accessibility Compliance**: Maintain current accessibility standards

### Mitigation Strategies
- **Feature Parity Checklist**: Document all current functionality before migration
- **Progressive Migration**: Migrate components in isolated branches
- **Visual Regression Testing**: Screenshot comparison for design consistency
- **Performance Monitoring**: Bundle analysis before/after migration

## Success Metrics

### Performance Targets
- Bundle size reduction of 15-20% compared to Chakra UI
- First Contentful Paint improvement of 10-15%
- Component render time optimization
- Improved Lighthouse performance scores

### User Experience Goals
- Maintain or improve current user satisfaction
- Ensure zero functionality regression
- Improve mobile user experience
- Enhanced accessibility compliance
- Faster perceived loading times

### Development Experience Improvements
- Better TypeScript integration with shadcn/ui
- Improved component customization flexibility
- Better integration with Tailwind CSS
- More maintainable component architecture
- Enhanced developer productivity

## Post-Migration Cleanup

### Dependency Removal
- [ ] Remove all Chakra UI related packages
- [ ] Remove Emotion dependencies (if not used elsewhere)
- [ ] Clean up unused CSS and theme files
- [ ] Update package.json and remove unused scripts

### Documentation Updates
- [ ] Update component documentation for new shadcn/ui patterns
- [ ] Create new theme customization guide
- [ ] Update development setup instructions
- [ ] Create migration guide for future shadcn/ui updates

### Code Quality
- [ ] Run final linting and type checking
- [ ] Update all component PropTypes/interfaces
- [ ] Clean up any temporary migration code
- [ ] Optimize component organization and exports

This migration plan ensures a systematic, low-risk transition from Chakra UI to shadcn/ui while maintaining all existing functionality and improving the overall user experience.