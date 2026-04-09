# Floci Console

**Floci Console** is a web-based management UI for [Floci](https://floci.io), providing a unified interface to browse and manage your local cloud resources across RDS, S3, ElastiCache, SQS and more. Think AWS Console, but for your homelab.

## Stack

- **Backend** — ASP.NET Web API, AWS SDK for .NET (pointed at Floci endpoint)
- **Frontend** — React, TypeScript, shadcn/ui, TanStack Query
- **Database** — PostgreSQL (resource metadata, audit log)
- **Infrastructure** — Docker Compose

## Features

- Browse and manage RDS instances and snapshots
- Explore S3 buckets and objects
- View ElastiCache clusters
- Monitor SQS queues
- Resource tagging and audit log

## Prerequisites

- Docker and Docker Compose
- A running Floci instance

## Getting Started

1. Clone the repository

```bash
git clone https://github.com/your-username/floci-console.git
cd floci-console
```

2. Copy the example environment file and fill in your values

```bash
cp .env.example .env
```

3. Start the application

```bash
docker compose up -d
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Configuration

| Variable | Description | Default |
|---|---|---|
| `FLOCI_ENDPOINT` | Floci API endpoint | `http://host.docker.internal:4566` |
| `FLOCI_ACCESS_KEY` | Access key | `test` |
| `FLOCI_SECRET_KEY` | Secret key | `test` |
| `DB_PASSWORD` | PostgreSQL password | — |

## Project Structure

```
floci-console/
  src/
    FlociConsole.Api/       # ASP.NET Web API
      Controllers/          # RDS, S3, ElastiCache, SQS
      Services/             # AWS SDK wrappers
      Data/                 # EF Core + PostgreSQL
  web/                      # React SPA
    src/
      pages/                # Dashboard, RDS, S3, ...
      components/           # Shared UI components
      api/                  # API client
  docker-compose.yml
  .env.example
```

## License

MIT
