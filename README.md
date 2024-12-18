# Notes Application

A monorepo containing a Next.js frontend and GraphQL API backend for managing notes with markdown support.

## Prerequisites

- Node.js 18+
- pnpm
- SQLite

## Setup

1. Install dependencies:
```bash
pnpm install
```

2. Set up the database:
```bash
pnpm prisma generate --schema=apps/api/prisma/schema.prisma
pnpm prisma db push --schema=apps/api/prisma/schema.prisma
pnpm prisma db seed
```

3. Configure environment variables:
Create `apps/frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/graphql
```

## Development

1. Start the API server:
```bash
pnpm nx serve api
```

2. In a new terminal, start the frontend:
```bash
pnpm nx serve frontend
```

The application will be available at:
- Frontend: http://localhost:4200
- GraphQL API: http://localhost:3000/graphql

## Project Structure

- `/apps/frontend` - Next.js frontend application with Tailwind CSS styling
  - `/src/app` - Next.js App Router pages and layouts
  - `/src/components` - Reusable React components
  - `/src/graphql` - GraphQL queries and mutations
  - `/src/lib` - Utility functions and configurations

- `/apps/api` - GraphQL API server
  - `/src/resolvers` - GraphQL resolvers
  - `/src/models` - Data models and types
  - `/prisma` - Database schema and migrations

## Features

- Create, read, and list notes
- Markdown support for note content
- Responsive design with Tailwind CSS
- GraphQL API with Apollo Server
- SQLite database with Prisma ORM
- NX monorepo structure for scalability

## Technologies

- Frontend:
  - Next.js 14 with App Router
  - Apollo Client for GraphQL
  - Tailwind CSS for styling
  - React Hook Form for forms
  - Markdown rendering

- Backend:
  - NestJS with GraphQL
  - Apollo Server
  - Prisma ORM
  - SQLite database

## Development Tips

- Use GraphQL Playground at http://localhost:3000/graphql for API exploration
- Tailwind CSS classes follow utility-first principles
- Markdown content supports standard GitHub Flavored Markdown syntax
- NX commands available for various development tasks:
  - `pnpm nx serve [project]` - Start development server
  - `pnpm nx build [project]` - Create production build
  - `pnpm nx test [project]` - Run tests
  - `pnpm nx lint [project]` - Run linting
