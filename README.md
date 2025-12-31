# Swed News

News processing monorepo with four services: collector, enricher, processor, and publisher.

## Getting Started

### Prerequisites

- Node.js 18+
- Docker and Docker Compose

### Installation

```bash
npm install
```

### Running with Docker

Start all services with PostgreSQL:

```bash
docker-compose up
```

Start only PostgreSQL:

```bash
docker-compose up postgres
```

### Development

Run individual services:

```bash
npm run dev:collector
npm run dev:enricher
npm run dev:processor
npm run dev:publisher
```

## Services

- **Collector**: Collects news from various sources
- **Enricher**: Enriches collected news data
- **Processor**: Processes enriched news
- **Publisher**: Publishes processed news

## Database

PostgreSQL is available at:

- Host: localhost
- Port: 5432
- Database: swed_news
- User: postgres
- Password: postgres
