
# Task Management System (Frontend)

This is the frontend for a full-stack Task Management System, built with Next.js, TypeScript, and Material-UI. It connects to a NestJS backend API for user authentication and task management.

## Features

- User registration and login (JWT authentication)
- Task dashboard: view, create, edit, and delete tasks
- Protected routes (redirects unauthenticated users to login)
- Redirects authenticated users away from public pages
- Reusable form components and hooks
- Environment variable for API URL configuration
- Clean, modular code structure

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router, TypeScript)
- [Material-UI (MUI)](https://mui.com/) for UI components
- [React Context](https://react.dev/reference/react/createContext) for authentication state
- [NestJS](https://nestjs.com/) backend (not included in this repo)

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm
- A running backend API (see below)

### Installation

1. Clone the repository:
   ```powershell
   git clone <repo-url>
   cd task-managment
   ```
2. Install dependencies:
   ```powershell
   npm install
   ```
3. Configure the API URL:
   - Edit `.env.local` and set `NEXT_PUBLIC_API_URL` to your backend API base URL (default: `http://localhost:3000`).

4. Start the development server:
   ```powershell
   npm run dev
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

- `src/app/auth/` — Login and registration pages
- `src/app/tasks/` — Task dashboard, new, and edit pages
- `src/components/TaskFormFields.tsx` — Reusable task form fields with validation
- `src/context/AuthContext.tsx` — Authentication context provider
- `src/hooks/useFetch.ts` — Reusable fetch hook for API calls
- `src/types/` — TypeScript types and interfaces

## Environment Variables

- `NEXT_PUBLIC_API_URL` — Base URL for the backend API (set in `.env.local`)

## Customization

- Update the API URL in `.env.local` to match your backend.
- The frontend expects the backend to provide JWT authentication and RESTful endpoints for users and tasks.

## Backend

This project is designed to work with a NestJS backend (not included here) that provides:
- User registration and login endpoints (`/auth/register`, `/auth/login`)
- JWT authentication
- CRUD endpoints for tasks (`/tasks`)

## License

This project is licensed under the MIT License.

---

For questions or issues, please open an issue or contact the maintainer.
