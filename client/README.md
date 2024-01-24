This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Prerequisites

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

## Before running the application

You will need to create an **.env** file the contains the following environment variables:

```bash
# Next.js

NEXT_PUBLIC_API_BASE_URL=http://localhost:3100
NEXT_PUBLIC_API_ENDPOINT_PATH_GRAPHQL=/graphql
NEXT_PUBLIC_DATE_FORMAT=DD/MM/YYYY
NEXT_PUBLIC_DEFAULT_TABLE_PAGE_SIZE=10
NEXT_PUBLIC_MAX_TABLE_PAGE_SIZE=50
```

Ensure the URL and port in the `NEXT_PUBLIC_API_BASE_URL` environment variable matches what you've set for the server.

Once you have created the .env file above along with setting appropriate values for the environment variables, you can start up the web application by simply run the following command:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser and you will be redirected to the task management page at [http://localhost:3000/tasks](http://localhost:3000/tasks).

## Notes

I have completed both the **required** and **should have** user stories.

In terms of handling the key risk of having a huge volume of tasks being created, there are considerations for both the frontend and the backend.

With the frontend, the main consideration I can see is related to how many records are retrieved in one API request. This can easily be handled with pagination. Additionally, caching data can also help so that unnecessary requests to the server are minimized.

With the backend, the main consideration will be with the cloud infrastructure where we can ensure that:

- the VMs hosting the API is configured for auto-scaling
- the database is configured with auto-scaling

At the application level, other considerations could be to configure rate-limiting so that excessive requests can be throttled to keep the API from being overloaded.

### Improvements

- Add unit and E2E tests