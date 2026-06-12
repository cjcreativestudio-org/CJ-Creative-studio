# Dribbble MCP Server — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a standalone TypeScript MCP server that exposes a `search_dribbble` tool Claude Code can call to pull design inspiration shots from Dribbble by keyword.

**Architecture:** Local stdio MCP server using `@modelcontextprotocol/sdk`. Three source files: `types.ts` (shared types), `dribbble.ts` (API client, fully tested), `index.ts` (MCP server wiring). Token loaded from `DRIBBBLE_ACCESS_TOKEN` env var passed via Claude Code settings.

**Tech Stack:** TypeScript 5, `@modelcontextprotocol/sdk`, `dotenv`, `vitest` for tests, `tsx` for dev, `tsc` for build.

---

## File Map

| File | Responsibility |
|---|---|
| `src/types.ts` | `Shot`, `SearchInput`, `DribbbleApiShot` types |
| `src/dribbble.ts` | `searchShots()` — fetch wrapper, token auth, response parsing, error throwing |
| `src/index.ts` | MCP server: registers `search_dribbble` tool, handles stdio transport |
| `tests/dribbble.test.ts` | Unit tests for `searchShots()` — all happy + error paths |
| `package.json` | Dependencies, scripts |
| `tsconfig.json` | TypeScript config |
| `.env.example` | Token template (committed) |
| `.env` | Real token (never committed) |
| `README.md` | Setup and Claude Code registration instructions |

---

## Task 1: Initialise repository

**Files:**
- Create: `C:/Users/ollie/dribbble-mcp/package.json`
- Create: `C:/Users/ollie/dribbble-mcp/tsconfig.json`
- Create: `C:/Users/ollie/dribbble-mcp/.gitignore`
- Create: `C:/Users/ollie/dribbble-mcp/.env.example`

- [ ] **Step 1: Create directory and init git**

```bash
mkdir C:/Users/ollie/dribbble-mcp
cd C:/Users/ollie/dribbble-mcp
git init
mkdir src tests
```

- [ ] **Step 2: Write package.json**

```json
{
  "name": "dribbble-mcp",
  "version": "1.0.0",
  "description": "MCP server for searching Dribbble design inspiration",
  "type": "module",
  "main": "dist/index.js",
  "scripts": {
    "build": "tsc",
    "dev": "tsx src/index.ts",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.0.0",
    "dotenv": "^16.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "tsx": "^4.0.0",
    "typescript": "^5.0.0",
    "vitest": "^2.0.0"
  }
}
```

- [ ] **Step 3: Write tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "Node16",
    "moduleResolution": "Node16",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "declaration": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "tests"]
}
```

- [ ] **Step 4: Write .gitignore**

```
node_modules/
dist/
.env
```

- [ ] **Step 5: Write .env.example**

```
DRIBBBLE_ACCESS_TOKEN=your-personal-access-token-here
```

- [ ] **Step 6: Install dependencies**

```bash
cd C:/Users/ollie/dribbble-mcp
npm install
```

Expected: `node_modules/` created, no errors.

- [ ] **Step 7: Commit**

```bash
cd C:/Users/ollie/dribbble-mcp
git add package.json tsconfig.json .gitignore .env.example
git commit -m "init: project scaffold"
```

---

## Task 2: Write types.ts

**Files:**
- Create: `C:/Users/ollie/dribbble-mcp/src/types.ts`

- [ ] **Step 1: Write types.ts**

```typescript
// The shape returned to Claude from the search_dribbble tool
export type Shot = {
  title: string
  image_url: string
  designer: string
  tags: string[]
  url: string
}

// Input schema for the search_dribbble tool
export type SearchInput = {
  query: string
  count?: number
}

// Raw shape returned by the Dribbble API v2
export type DribbbleApiShot = {
  title: string
  html_url: string
  images: {
    normal: string
    hidpi?: string
  }
  tags: string[]
  user: {
    login: string
    name: string
  }
}
```

- [ ] **Step 2: Verify TypeScript compiles cleanly**

```bash
cd C:/Users/ollie/dribbble-mcp
npx tsc --noEmit
```

Expected: no output (no errors).

- [ ] **Step 3: Commit**

```bash
git add src/types.ts
git commit -m "feat: add shared TypeScript types"
```

---

## Task 3: Write dribbble.ts and tests

**Files:**
- Create: `C:/Users/ollie/dribbble-mcp/src/dribbble.ts`
- Create: `C:/Users/ollie/dribbble-mcp/tests/dribbble.test.ts`

- [ ] **Step 1: Write the failing tests**

Create `tests/dribbble.test.ts`:

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { searchShots } from '../src/dribbble.js'

const mockShot = {
  title: 'Restaurant Website',
  html_url: 'https://dribbble.com/shots/123',
  images: {
    normal: 'https://cdn.dribbble.com/normal.png',
    hidpi: 'https://cdn.dribbble.com/hidpi.png',
  },
  tags: ['restaurant', 'web design'],
  user: { login: 'designerlogin', name: 'Designer Name' },
}

beforeEach(() => {
  vi.restoreAllMocks()
})

describe('searchShots', () => {
  it('calls Dribbble API with correct URL params and auth header', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => [mockShot],
    })

    await searchShots('test-token', 'restaurant website', 10)

    expect(global.fetch).toHaveBeenCalledOnce()
    const [url, options] = (global.fetch as ReturnType<typeof vi.fn>).mock.calls[0]
    expect(url).toContain('q=restaurant+website')
    expect(url).toContain('per_page=10')
    expect(url).toContain('sort=relevance')
    expect(options.headers.Authorization).toBe('Bearer test-token')
  })

  it('returns parsed Shot array from API response', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => [mockShot],
    })

    const shots = await searchShots('test-token', 'restaurant', 15)

    expect(shots).toHaveLength(1)
    expect(shots[0]).toEqual({
      title: 'Restaurant Website',
      image_url: 'https://cdn.dribbble.com/hidpi.png',
      designer: 'designerlogin',
      tags: ['restaurant', 'web design'],
      url: 'https://dribbble.com/shots/123',
    })
  })

  it('uses normal image when hidpi is absent', async () => {
    const shotNoHidpi = {
      ...mockShot,
      images: { normal: 'https://cdn.dribbble.com/normal.png' },
    }
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => [shotNoHidpi],
    })

    const shots = await searchShots('test-token', 'restaurant', 15)
    expect(shots[0].image_url).toBe('https://cdn.dribbble.com/normal.png')
  })

  it('caps count at 30', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => [],
    })

    await searchShots('test-token', 'query', 100)

    const [url] = (global.fetch as ReturnType<typeof vi.fn>).mock.calls[0]
    expect(url).toContain('per_page=30')
  })

  it('returns empty array when API returns no results', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => [],
    })

    const shots = await searchShots('test-token', 'xyzzy', 15)
    expect(shots).toEqual([])
  })

  it('throws UNAUTHORIZED error on 401', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 401,
      statusText: 'Unauthorized',
    })

    await expect(searchShots('bad-token', 'query')).rejects.toThrow('UNAUTHORIZED')
  })

  it('throws RATE_LIMITED error on 429', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 429,
      statusText: 'Too Many Requests',
    })

    await expect(searchShots('token', 'query')).rejects.toThrow('RATE_LIMITED')
  })

  it('throws generic error on other non-ok status', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 503,
      statusText: 'Service Unavailable',
    })

    await expect(searchShots('token', 'query')).rejects.toThrow('DRIBBBLE_ERROR: 503')
  })
})
```

- [ ] **Step 2: Run tests — verify they all fail**

```bash
cd C:/Users/ollie/dribbble-mcp
npm test
```

Expected: all tests FAIL with `Cannot find module '../src/dribbble.js'`.

- [ ] **Step 3: Write dribbble.ts**

Create `src/dribbble.ts`:

```typescript
import type { Shot, DribbbleApiShot } from './types.js'

const DRIBBBLE_API_BASE = 'https://api.dribbble.com/v2'

function parseShot(raw: DribbbleApiShot): Shot {
  return {
    title: raw.title,
    image_url: raw.images.hidpi ?? raw.images.normal,
    designer: raw.user.login,
    tags: raw.tags,
    url: raw.html_url,
  }
}

export async function searchShots(
  token: string,
  query: string,
  count: number = 15
): Promise<Shot[]> {
  const url = new URL(`${DRIBBBLE_API_BASE}/shots`)
  url.searchParams.set('q', query)
  url.searchParams.set('per_page', String(Math.min(count, 30)))
  url.searchParams.set('sort', 'relevance')

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  })

  if (response.status === 401) {
    throw new Error('UNAUTHORIZED: Check DRIBBBLE_ACCESS_TOKEN in .env')
  }

  if (response.status === 429) {
    throw new Error('RATE_LIMITED: Wait 60 seconds and try again')
  }

  if (!response.ok) {
    throw new Error(`DRIBBBLE_ERROR: ${response.status} ${response.statusText}`)
  }

  const shots: DribbbleApiShot[] = await response.json()
  return shots.map(parseShot)
}
```

- [ ] **Step 4: Run tests — verify they all pass**

```bash
npm test
```

Expected: 8 tests PASS. If any fail, fix `dribbble.ts` before continuing.

- [ ] **Step 5: Commit**

```bash
git add src/dribbble.ts tests/dribbble.test.ts
git commit -m "feat: add Dribbble API client with tests"
```

---

## Task 4: Write index.ts (MCP server)

**Files:**
- Create: `C:/Users/ollie/dribbble-mcp/src/index.ts`

- [ ] **Step 1: Write index.ts**

```typescript
import 'dotenv/config'
import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js'
import { searchShots } from './dribbble.js'
import type { SearchInput } from './types.js'

const token = process.env.DRIBBBLE_ACCESS_TOKEN
if (!token) {
  console.error(
    'Error: DRIBBBLE_ACCESS_TOKEN is not set.\n' +
    'Add it to your .env file or pass it via Claude Code mcpServers env config.'
  )
  process.exit(1)
}

const server = new Server(
  { name: 'dribbble-mcp', version: '1.0.0' },
  { capabilities: { tools: {} } }
)

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'search_dribbble',
      description:
        'Search Dribbble for design inspiration shots by keyword. ' +
        'Returns shots with title, image URL, designer, tags, and direct link. ' +
        'Use track type and client brief keywords to construct the query. ' +
        'Example queries: "restaurant website dark atmosphere", "construction trades bold trust".',
      inputSchema: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'Search keywords — e.g. "restaurant website dark atmosphere"',
          },
          count: {
            type: 'number',
            description: 'Number of results to return. Default 15, max 30.',
          },
        },
        required: ['query'],
      },
    },
  ],
}))

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name !== 'search_dribbble') {
    throw new Error(`Unknown tool: ${request.params.name}`)
  }

  const { query, count = 15 } = request.params.arguments as SearchInput

  if (!query || typeof query !== 'string' || query.trim() === '') {
    return {
      content: [{ type: 'text', text: 'Error: query must be a non-empty string.' }],
      isError: true,
    }
  }

  try {
    const shots = await searchShots(token, query.trim(), count)

    if (shots.length === 0) {
      return {
        content: [
          {
            type: 'text',
            text: `No shots found for query "${query}". Try broader or different keywords.`,
          },
        ],
      }
    }

    return {
      content: [{ type: 'text', text: JSON.stringify(shots, null, 2) }],
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return {
      content: [{ type: 'text', text: `Error: ${message}` }],
      isError: true,
    }
  }
})

const transport = new StdioServerTransport()
await server.connect(transport)
```

- [ ] **Step 2: Verify TypeScript compiles cleanly**

```bash
cd C:/Users/ollie/dribbble-mcp
npx tsc --noEmit
```

Expected: no output (no errors).

- [ ] **Step 3: Commit**

```bash
git add src/index.ts
git commit -m "feat: add MCP server entry point"
```

---

## Task 5: Build and smoke test

**Files:**
- No new files — build output goes to `dist/`

- [ ] **Step 1: Create your .env file**

```bash
cd C:/Users/ollie/dribbble-mcp
cp .env.example .env
```

Open `.env` and replace `your-personal-access-token-here` with your actual Dribbble personal access token. Save. Do not commit this file.

- [ ] **Step 2: Build**

```bash
npm run build
```

Expected: `dist/` directory created containing `index.js`, `dribbble.js`, `types.js` and `.d.ts` files. No TypeScript errors.

- [ ] **Step 3: Smoke test — run the server**

In one terminal, start the server:

```bash
cd C:/Users/ollie/dribbble-mcp
node dist/index.js
```

Expected: server starts silently (no output means it's waiting on stdin). If you see `Error: DRIBBBLE_ACCESS_TOKEN is not set` — check your `.env` file exists and contains the token.

Kill the server with `Ctrl+C` once confirmed it starts without errors.

- [ ] **Step 4: Run full test suite one final time**

```bash
npm test
```

Expected: 8 tests PASS.

- [ ] **Step 5: Verify nothing sensitive is staged**

```bash
git status
```

Expected: `.env` and `dist/` both appear as untracked but NOT as staged — they are covered by `.gitignore`. If either appears as staged, run `git rm --cached .env` or `git rm --cached -r dist/` and verify `.gitignore` is correct before continuing.

---

## Task 6: Register in Claude Code

**Files:**
- Modify: `C:/Users/ollie/.claude/settings.json` (or `settings.local.json` if it exists)

- [ ] **Step 1: Open Claude Code settings**

```bash
code C:/Users/ollie/.claude/settings.json
```

If the file doesn't exist yet, create it.

- [ ] **Step 2: Add the dribbble MCP server entry**

Add the following inside the `mcpServers` object (create the object if it doesn't exist):

```json
{
  "mcpServers": {
    "dribbble": {
      "command": "node",
      "args": ["C:/Users/ollie/dribbble-mcp/dist/index.js"],
      "env": {
        "DRIBBBLE_ACCESS_TOKEN": "paste-your-token-here"
      }
    }
  }
}
```

Replace `paste-your-token-here` with your actual Dribbble personal access token. This keeps the token out of any committed file.

- [ ] **Step 3: Restart Claude Code**

Close and reopen the Claude Code CLI. The MCP server will be registered automatically on startup.

- [ ] **Step 4: Verify Claude can see the tool**

In a new Claude Code session, type:

```
What MCP tools do you have available?
```

Expected: Claude lists `search_dribbble` as an available tool.

- [ ] **Step 5: Live test**

Ask Claude:

```
Use search_dribbble to find inspiration for a restaurant website. Query: "restaurant website dark atmosphere editorial"
```

Expected: Claude calls the tool and returns a list of 15 Dribbble shots with titles, image URLs, designers, and tags.

---

## Task 7: Write README.md

**Files:**
- Create: `C:/Users/ollie/dribbble-mcp/README.md`

- [ ] **Step 1: Write README.md**

```markdown
# dribbble-mcp

A local MCP server for searching Dribbble design inspiration. Built for the CJ Studio workflow — called during Phase 1 to pull reference shots automatically from a keyword query.

## Setup

### 1. Install

```bash
cd C:/Users/ollie/dribbble-mcp
npm install
```

### 2. Get a Dribbble personal access token

1. Go to [dribbble.com/account/applications](https://dribbble.com/account/applications)
2. Open your registered application
3. Generate a personal access token
4. Copy it — you'll need it in the next step

### 3. Create your .env file

```bash
cp .env.example .env
```

Open `.env` and replace the placeholder with your token:

```
DRIBBBLE_ACCESS_TOKEN=your-actual-token-here
```

### 4. Build

```bash
npm run build
```

### 5. Register in Claude Code

Add to `~/.claude/settings.json`:

```json
{
  "mcpServers": {
    "dribbble": {
      "command": "node",
      "args": ["/absolute/path/to/dribbble-mcp/dist/index.js"],
      "env": {
        "DRIBBBLE_ACCESS_TOKEN": "your-actual-token-here"
      }
    }
  }
}
```

Restart Claude Code. The `search_dribbble` tool will be available in all sessions.

## Tool: search_dribbble

Search Dribbble for design inspiration shots.

**Input:**
- `query` (string, required) — search keywords
- `count` (number, optional) — results to return, default 15, max 30

**Output:** JSON array of shots:
```json
[
  {
    "title": "Restaurant Website",
    "image_url": "https://cdn.dribbble.com/...",
    "designer": "designerlogin",
    "tags": ["restaurant", "web design", "dark"],
    "url": "https://dribbble.com/shots/123"
  }
]
```

**Example queries by track:**
- Hospitality: `"restaurant website dark atmosphere editorial"`
- Trades: `"construction trades website bold trust"`
- Professional Services: `"professional services clean minimal authority"`
- Creative: `"portfolio photography dark cinematic"`

## Development

```bash
npm run dev       # run with tsx (no build needed)
npm test          # run tests
npm run build     # compile to dist/
```
```

- [ ] **Step 2: Commit README**

```bash
cd C:/Users/ollie/dribbble-mcp
git add README.md
git commit -m "docs: add setup and usage README"
```

---

## Completion Checklist

- [ ] `npm test` passes (8 tests)
- [ ] `npm run build` produces `dist/` with no TypeScript errors
- [ ] Server starts without errors when run directly with `node dist/index.js`
- [ ] `search_dribbble` tool appears when Claude lists available tools
- [ ] Live test returns real Dribbble shots for a sample query
- [ ] `.env` is NOT committed (check `git status`)
- [ ] `README.md` committed and covers full setup

---

## What Comes Next

- **Plan C: `behance-mcp`** — same pattern, Adobe Behance API, API key auth (simpler than token). Build after this is proven.
