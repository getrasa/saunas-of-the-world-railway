# Claude Configuration

## Project Overview
This is a Next.js storefront application for Saunas of the World, an e-commerce platform built with React and TypeScript.

## Technology Stack
- **Framework**: Next.js
- **Language**: TypeScript
- **Styling**: Tailwind CSS (using shadcn/ui components)
- **Package Manager**: Yarn

## Project Structure
```
storefront/
├── src/
│   ├── components/     # React components
│   │   └── store/      # Store-specific components (cart, product display, etc.)
│   ├── app/           # Next.js app directory
│   ├── lib/           # Utility functions and shared code
│   └── styles/        # Global styles
├── e2e/               # End-to-end tests (Playwright)
├── public/            # Static assets
└── next.config.js     # Next.js configuration
```

## Key Commands
- **Development**: `npm run dev` - Start the development server
- **Build**: `npm run build` - Build for production
- **Lint**: `npm run lint` - Run ESLint
- **Type Check**: Run TypeScript compiler to check types
- **Tests**: `npm run test-e2e` - Run Playwright end-to-end tests

## Important Files
- `next.config.js` - Next.js configuration
- `components.json` - shadcn/ui component configuration
- `.env.local.template` - Environment variables template

## Development Guidelines
- Follow existing code patterns and conventions
- Use TypeScript for type safety
- Components should be functional React components with hooks
- Use Tailwind CSS for styling, following the existing patterns
- Ensure all changes pass linting before completion

## Current Feature Branch
Working on: `feature/migrate-code` - Migrating and improving storefront code