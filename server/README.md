# checkbox-ai-server

**checkbox-ai-server** is an Apollo GraphQL server that is used to handle task management.

# Prerequisites

## Docker

Install Docker Desktop (https://www.docker.com/products/docker-desktop).

## Bun

Install Bun (https://bun.sh/docs/installation).

TL;DR

If you already have **npm** installed, just run the command below:

```bash
npm install -g bun
```

Otherwise, see the URL above for other installation options.

# Getting started

## Installation

To install all the required dependencies, simply run:

```bash
bun install
```

## Before running the server

You will need to create an **.env** file the contains the following environment variables:

```bash
# PostgreSQL
# Set your own POSTGRES_PASSWORD

POSTGRES_HOST=localhost
POSTGRES_NAME=postgres
POSTGRES_PASSWORD=XXX
POSTGRES_PORT=5433
POSTGRES_USER=postgres

# Prisma

# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:${POSTGRES_PORT}/postgres?pgBouncer=true
SHADOW_DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:${POSTGRES_PORT}/postgres_shadow?pgBouncer=true

# Seed test data

SEED_TEST_DATA_TOTAL_TASK_RECORDS=100

# Server

SERVER_PORT=3100
```

Once you have created the .env file above along with setting appropriate values for the environment variables, you'll need to start the PostgreSQL database in a Docker container.

To do so, simply run the following command:

```bash
docker-compose up -d
```

## Running the server

You can start the server by running the following command:

```bash
bun run start:dev
```

This command will essentially create the Task table in the database and add seed data to it before starting the server.

The seed data can be updated at any time by running the following command:

```bash
bun run db:seed
```

The seeder will basically delete all existing data and recreate it. You can change how many rows of data is created by setting the `SEED_TEST_DATA_TOTAL_TASK_RECORDS` environment variable.

## Notes

In order to get this up and running as quickly as possible due to time constraints, I decided to just create an API using Apollo GraphQL Server and made use of the `typegraphql-prisma` plugin to auto-generate the GraphQL resolvers that can handle all the required queries and mutations for task management.

Obviously, using a code generation plugin here comes with some trade offs, such as the auto-generated resolvers not being able to handle any custom business logic (not that there's any with this technical test). However, for the purposes of this technical test, it should hopefully suffice.

I did create a more traditional Node.js REST API using **Fastify** (https://fastify.dev) which is similar to **Express.js** but is more performant. I can show this as well if necessary as it contains a bit more backend code that I wrote instead of having it auto-generated.