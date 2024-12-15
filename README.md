# AI Answer Engine

A powerful AI-powered answer engine built with Next.js that uses Groq for chat functionality and web scraping capabilities to provide accurate, context-aware responses.

## Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **Backend**: Next.js API Routes
- **AI Integration**: Groq
- **Web Scraping**: Cheerio, Puppeteer
- **Rate Limiting**: Redis
- **Deployment**: Vercel (recommended)

## Prerequisites

- Node.js 18+
- npm or yarn
- Redis (for rate limiting)

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/team-headstart/ai-answer-engine.git
cd ai-answer-engine
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Then edit `.env.local` with your configuration:

- `GROQ_API_KEY`: Your Groq API key
- `REDIS_URL`: Your Redis connection URL

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development Tasks

The following areas need attention:

- **Frontend (`src/app/page.tsx`)**

  - Update the UI components
  - Implement API response handling
  - Add loading states and error handling

- **Backend (`src/app/api/chat/route.ts`)**

  - Implement Groq chat integration
  - Set up web scraping with Cheerio and Puppeteer
  - Add error handling and validation

- **Middleware (`src/middleware.ts`)**
  - Implement Redis-based rate limiting
  - Add request validation

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial
- [Groq Documentation](https://groq.com/docs) - learn about Groq's AI capabilities
- [Puppeteer Documentation](https://pptr.dev/) - learn about web scraping with Puppeteer
