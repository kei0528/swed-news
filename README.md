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

### Testing

Each service has comprehensive unit and integration tests using Jest.

Run tests for a specific service:

```bash
# Run all tests
npm run test --workspace=collector

# Run unit tests only
npm run test:unit --workspace=collector

# Run integration tests only
npm run test:integration --workspace=collector

# Run tests in watch mode
npm run test:watch --workspace=collector

# Generate coverage report
npm run test:coverage --workspace=collector
```

Replace `collector` with `enricher`, `processor`, or `publisher` for other services.

## Database

PostgreSQL is available at:

- Host: localhost
- Port: 5432
- Database: swed_news
- User: postgres
- Password: postgres
