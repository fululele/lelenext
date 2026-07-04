This is a [Next.js](https://nextjs.org) frontend for Faalupega.

The NestJS API lives in the separate [`faalupega-api`](../../faalupega-api) project.

## Getting Started

### Frontend

```bash
npm install
cp .env.local.example .env.local   # if present, or set NEXT_PUBLIC_API_URL
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Set the API URL in `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### API

In the `faalupega-api` repo:

```bash
npm install
cp .env.example .env
npm run db:up
npm run dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |

## Deploy

Deploy this repo as a Next.js app. Point `NEXT_PUBLIC_API_URL` at your deployed API. Deploy the API separately from `faalupega-api`.
