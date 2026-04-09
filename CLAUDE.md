# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Floci Console** is a web-based management UI for [Floci](https://floci.io) — a homelab AWS-compatible cloud platform. It provides a unified interface to browse and manage RDS, S3, ElastiCache, and SQS resources, similar to the AWS Console.

## Stack

- **Backend** — ASP.NET Web API (.NET 10), AWS SDK for .NET pointed at the Floci endpoint
- **Frontend** — React + TypeScript (Node.js 24 LTS), Vite, shadcn/ui, TanStack Query
- **Database** — PostgreSQL (latest) via EF Core (resource metadata, audit log)
- **Infrastructure** — Docker Compose

## Project Structure

```
floci-console/
  src/
    FlociConsole.Api/       # ASP.NET Web API
      Controllers/          # RdsController, S3Controller, ElastiCacheController, SqsController
      Services/             # AWS SDK wrappers (RdsService, S3Service, ...)
      Data/                 # AppDbContext + Migrations/
      Program.cs
      appsettings.json
  web/                      # React SPA (Vite)
    src/
      pages/                # Dashboard, Rds, S3, ElastiCache, Sqs pages
      components/           # Shared UI components (shadcn/ui based)
      api/                  # HTTP client to ASP.NET backend
    package.json
    vite.config.ts
  docker-compose.yml
  .env                      # Floci endpoint + credentials (not committed)
  .env.example
```

## Backend Development Commands

```bash
cd src/FlociConsole.Api
dotnet run                    # starts API (default http://localhost:5000)
dotnet watch                  # run with hot reload
dotnet build                  # build
dotnet ef migrations add <Name>   # add EF Core migration
dotnet ef database update         # apply migrations
```

## Frontend Development Commands

```bash
cd web
npm run dev      # dev server at http://localhost:5173
npm run build    # production build
npm run lint     # ESLint
npx tsc --noEmit # type check

# Add shadcn/ui components
npx shadcn@latest add <component>   # e.g. npx shadcn@latest add table
```

## Running the Application

```bash
cp .env.example .env   # fill in DB_PASSWORD and Floci credentials
docker compose up -d
# App available at http://localhost:3000
```

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `FLOCI_ENDPOINT` | Floci API endpoint | `http://host.docker.internal:4566` |
| `FLOCI_ACCESS_KEY` | Access key | `test` |
| `FLOCI_SECRET_KEY` | Secret key | `test` |
| `DB_PASSWORD` | PostgreSQL password | — |

## Architecture Notes

- The ASP.NET backend uses minimal APIs (`Program.cs`) — no MVC Controller base class needed, but Controllers/ folder exists for grouping route handlers by resource.
- The backend acts as a proxy/adapter: it receives requests from the React frontend, calls the AWS SDK (pointed at Floci), and returns the results. No business logic lives in the frontend.
- The AWS SDK is configured with a custom `ServiceURL` pointing at `FLOCI_ENDPOINT` instead of real AWS. `ForcePathStyle = true` is required for S3.
- The PostgreSQL database (via EF Core) stores resource metadata and audit log — it is not the primary source of truth for cloud resources (Floci is). Run migrations with `dotnet ef database update`.
- The frontend uses TanStack Query for server state management; all data fetching goes through `web/src/api/`.
- UI components are built on shadcn/ui — add new components via the shadcn CLI rather than writing from scratch.
