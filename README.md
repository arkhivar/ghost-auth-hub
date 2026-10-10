# Ghost Auth Hub

**A prototype for managing member access across multiple Ghost sites from one place.**

## The problem

When someone runs several Ghost publications, it can be difficult to see which people have access to which site and manage that access consistently. Ghost Auth Hub explores a shared admin console for that work.

## The idea

The intended workflow is to connect Ghost sites, review members and their access across those sites, and manage access centrally instead of repeating the same work in each site's admin. The current interface also sketches out site, comment, and Fediverse sections.

## What exists today

This is an early-stage prototype, not a working Ghost integration. It has a React/TypeScript dashboard, an Express/TypeScript server, and basic email/password accounts stored in MySQL. The dashboard panels mostly use hard-coded example data.

Ghost Admin API connections, member syncing, and real access changes have **not** been implemented. The app's own sign-in is separate from Ghost member authentication; it does not provide single sign-on for Ghost sites.

## Limitations and safety

The dashboard currently has a demo authentication bypass enabled. Session configuration is also prototype-level. **Do not expose this app publicly or use it with real Ghost credentials or member data.** Treat every user, site, comment, and activity shown in the dashboard as sample content.

## Run locally

The app expects a MySQL-compatible `DATABASE_URL`. Keep `SESSION_SECRET` in the environment rather than in this repository.

```sh
npm install
npm run dev
```

Useful checks:

```sh
npm run check
npm run build
```
