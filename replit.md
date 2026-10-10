# Ghost Auth Hub

## Purpose

An early-stage admin dashboard for managing users and access across multiple Ghost sites. The interface also includes site, comment, and Fediverse management sections. These admin panels currently use sample data; Ghost API integration is not wired up yet.

## Frontend

- React 18 and TypeScript, built with Vite.
- React Router provides the dashboard and `/auth` routes.
- Tailwind CSS and shadcn/ui components provide the interface.
- The dashboard currently has a demo authentication bypass enabled in `client/src/pages/Index.tsx`.

## Backend and storage

- Express.js with TypeScript serves the app and `/api/auth/*` endpoints.
- Email/password accounts are stored in MySQL through Drizzle ORM.
- Passwords are hashed with bcrypt; Express sessions handle sign-in state.

## Current scope

- Keep future work focused on the Ghost administration and authentication hub.
- Treat the admin panels as prototypes until real Ghost API connections are implemented.