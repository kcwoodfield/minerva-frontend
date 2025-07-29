# Minerva Frontend - Claude Development Guide

## Project Overview
Minerva is a modern book library management web application built with Next.js, React, and Chakra UI. The frontend provides an intuitive interface for managing personal book collections with responsive design and comprehensive book management features.

## Development Context

### Current Architecture
- **Next.js 14.1.0** with App Router
- **React 18** with TypeScript for type safety
- **Chakra UI** as primary component library and design system
- **Framer Motion** for smooth animations
- **next-themes** for dark/light mode switching

### Key Files & Locations
- **App Structure**: `src/app/` - Next.js 14 App Router pages and layouts
- **Components**: `src/components/` - Reusable React components
- **Types**: `src/types/` - TypeScript type definitions
- **Utilities**: `src/lib/` - Helper functions and utilities
- **Middleware**: `src/middleware.ts` - Next.js middleware for auth
- **Root Config**: `next.config.mjs`, `tsconfig.json`, `package.json`

### Component Architecture
```
src/components/
├── BookTable.tsx           # Main data table with sorting/filtering
├── SearchWrapper.tsx       # Search functionality component
├── AddBookDrawer.tsx       # Book creation form drawer
├── EditBookDrawer.tsx      # Book editing form drawer
├── BookDetailsDrawer.tsx   # Detailed book view component
├── PaginationControls.tsx  # Pagination UI component
├── menubar.tsx            # Top navigation bar
├── ThemeToggle.tsx        # Dark mode toggle
└── NewsletterModal.tsx    # Newsletter signup modal
```

### Current Features
- Responsive book library table with sorting and filtering
- Real-time search across multiple book fields
- Comprehensive book management (CRUD operations)
- URL-based state management for search/pagination
- Dark/light theme switching with system preference detection
- Newsletter signup with cookie-based tracking
- Google Analytics integration

## Development Guidelines

### Code Style & Conventions
- Use **TypeScript** for all new components and utilities
- Follow **React** functional component patterns with hooks
- Use **Chakra UI** components and design tokens consistently
- Implement **responsive design** mobile-first approach
- Write **clean, readable JSX** with proper component composition

### Component Development Standards
- Create **reusable, composable** components
- Use proper **TypeScript interfaces** for all props
- Implement **error boundaries** for robust error handling
- Follow **accessibility best practices** (ARIA labels, keyboard navigation)
- Use **React.memo** for performance optimization when needed

### State Management Patterns
- Use **React hooks** (useState, useEffect, useReducer) for local state
- Implement **URL-based state** for shareable/bookmarkable states
- Consider **React Query** or **SWR** for server state management
- Use **Zustand** or **Redux Toolkit** for complex global state needs

### Styling Guidelines
- Use **Chakra UI** components and design system
- Implement **responsive breakpoints**: `base`, `sm`, `md`, `lg`, `xl`
- Follow **design tokens** for consistent spacing, colors, typography
- Use **color mode values** for dark/light theme support
- Create **custom theme extensions** when needed

## Common Development Tasks

### Creating New Components
1. Create component file in appropriate `src/components/` subdirectory
2. Define TypeScript interface for props
3. Implement component using Chakra UI design system
4. Add responsive design considerations
5. Include proper accessibility attributes
6. Write unit tests for component functionality

### API Integration Patterns
```typescript
// Current pattern - direct fetch in components
const fetchBooks = async () => {
  const response = await fetch(`${API_URL}/api/library/?${params}`);
  const data = await response.json();
  setBooks(data.books);
};

// Recommended pattern - custom hooks
const useBooks = (searchParams: SearchParams) => {
  // Custom hook with error handling, loading states, etc.
};
```

### Adding New Pages
1. Create page component in `src/app/` directory following App Router conventions
2. Implement proper metadata for SEO
3. Add loading and error states
4. Ensure responsive design across all breakpoints
5. Test navigation and URL state management

### Theme Customization
```typescript
// Extend Chakra UI theme in theme.ts
const theme = extendTheme({
  colors: {
    brand: {
      50: '#fff5f5',
      // ... color scale
      900: '#742a2a',
    },
  },
  fonts: {
    heading: 'Lora, serif',
    body: 'Lora, serif',
  },
});
```

## Testing Strategy

### Unit Testing
- Use **Jest** and **React Testing Library**
- Test component rendering and user interactions
- Mock API calls and external dependencies
- Achieve >80% code coverage

### Integration Testing
- Use **Cypress** for end-to-end testing
- Test complete user workflows (add book, search, edit, delete)
- Test responsive behavior across device sizes
- Verify accessibility compliance

### Testing Commands
```bash
# Run unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Run Cypress tests
npm run cypress:open

# Generate coverage report
npm run test:coverage
```

## Development Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Type checking
npm run type-check
```

## Performance Optimization

### Current Optimizations
- **Next.js Image** component for optimized image loading
- **Dynamic imports** for code splitting
- **React.memo** for expensive component renders
- **URL-based state** to reduce unnecessary re-renders

### Recommended Improvements
- Implement **virtual scrolling** for large book lists
- Add **React Query** for intelligent caching
- Use **React.lazy** for route-based code splitting
- Optimize **bundle size** with proper tree shaking

## Accessibility Guidelines

### Current Implementation
- Semantic HTML structure with proper headings
- Keyboard navigation support for interactive elements
- Color contrast compliance for light/dark themes
- Screen reader friendly component labels

### Enhancement Areas
- Add comprehensive **ARIA labels** throughout app
- Implement **focus management** for drawers and modals
- Create **high contrast** theme option
- Add **keyboard shortcuts** for power users

## API Integration

### Current Backend Integration
```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Book management endpoints
GET    /api/library/          # List books
POST   /api/library/          # Create book
PUT    /api/library/{id}      # Update book
DELETE /api/library/{id}      # Delete book
```

### Authentication (Currently Disabled)
- JWT-based authentication ready but disabled
- Cookie-based session management implemented
- Login page exists but not enforced
- Middleware configured for auth protection

## Common Issues & Solutions

### State Management
- **Problem**: Component re-renders on every search
- **Solution**: Debounce search input and optimize useEffect dependencies

### Performance
- **Problem**: Slow table rendering with many books
- **Solution**: Implement virtual scrolling or pagination optimization

### Mobile Responsiveness
- **Problem**: Table doesn't work well on mobile
- **Solution**: Create card-based layout for small screens

## Development Environment Variables
```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_GA_MEASUREMENT_ID=your-ga-id
AUTH_ENABLED=false
LOGIN_USERNAME=admin
LOGIN_PASSWORD=your-password
```

## Current Development Priorities
1. **Mobile-First Redesign** - Responsive table and card layouts
2. **Testing Infrastructure** - Jest, RTL, and Cypress setup
3. **State Management** - React Query integration for API calls
4. **Performance** - Virtual scrolling and optimization
5. **PWA Features** - Service worker and offline support

## Useful Commands
```bash
# Analyze bundle size
npm run analyze

# Check TypeScript errors
npx tsc --noEmit

# Format code with Prettier
npm run format

# Check for unused dependencies
npx depcheck

# Update dependencies
npm run update-deps
```

## Design System Reference

### Chakra UI Theme Tokens
- **Primary Color**: `#c96442` (brand orange)
- **Fonts**: Lora (serif) for all text
- **Breakpoints**: `sm: 30em, md: 48em, lg: 62em, xl: 80em`
- **Spacing**: Chakra UI default spacing scale (0-96)

### Component Patterns
- Use **Chakra UI components** as building blocks
- Create **compound components** for complex UI patterns
- Implement **responsive props** for mobile-first design
- Follow **Chakra UI naming conventions** for consistency

Refer to `project-plan.md` for detailed development roadmap and feature specifications.