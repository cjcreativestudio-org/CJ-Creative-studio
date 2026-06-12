# Dribbble MCP Server — Design Spec
**Date:** 2026-06-06
**Authors:** Ollie & Josh (CJ Studio)
**Status:** Approved for implementation

---

## Overview

A standalone TypeScript MCP server that gives Claude Code a `search_dribbble` tool. Called during Phase 1 of the CJ Studio workflow to automatically pull design inspiration from Dribbble based on the client's track type and brief keywords. Results are returned as structured JSON for human curation before feeding into the moodboard.

**Goal:** Replace manual Dribbble browsing in Phase 1 with a single Claude tool call that returns 10–15 relevant, tagged reference shots.

---

## Repository

**Location:** `C:/Users/ollie/dribbble-mcp/` — standalone repo, not inside cj-studio or cj-workflow.

**Rationale:** Agency-level tool, reusable across all client projects. Behance MCP will follow the same standalone pattern.

---

## Architecture

Local stdio MCP server. Claude Code spawns it as a subprocess on demand. No deployment, no hosted endpoint — the Dribbble access token stays on the local machine.

```
dribbble-mcp/
  src/
    index.ts       ← MCP server entry point: registers tool, handles stdio transport
    dribbble.ts    ← Dribbble API client: fetch wrapper, token auth, response parsing
    types.ts       ← TypeScript types: Shot, SearchInput, SearchResult
  .env             ← DRIBBBLE_ACCESS_TOKEN (never committed)
  .env.example     ← safe template committed to git
  package.json
  tsconfig.json
  README.md        ← setup and Claude Code registration instructions
```

---

## Tool Definition

### `search_dribbble`

**Description:** Search Dribbble for design inspiration shots by keyword. Returns shots with title, image URL, designer, tags, and direct link.

**Input schema:**
```typescript
{
  query: string,   // search keywords — e.g. "restaurant website dark atmosphere"
  count?: number   // number of results to return, default 15, max 30
}
```

**Output:** Array of `Shot` objects returned as MCP tool content (JSON string).

```typescript
type Shot = {
  title: string        // shot title as listed on Dribbble
  image_url: string    // direct URL to the shot preview image
  designer: string     // Dribbble username of the designer
  tags: string[]       // tags attached to the shot
  url: string          // full Dribbble URL for viewing the shot
}
```

**Usage in workflow:** Claude constructs the query from the assigned track + 3–5 keywords from `templates/brief.md`. Example queries:
- Hospitality: `"restaurant website dark atmosphere editorial"`
- Trades: `"construction trades website bold trust"`
- Professional Services: `"professional services clean minimal authority"`
- Creative: `"portfolio photography dark cinematic"`

---

## API Integration

**API:** Dribbble API v2 — `https://api.dribbble.com/v2/shots`

**Auth:** Personal access token via `Authorization: Bearer {token}` header. Token loaded from `DRIBBBLE_ACCESS_TOKEN` environment variable.

**Request:**
```
GET https://api.dribbble.com/v2/shots
  ?q={query}
  &per_page={count}
  &sort=relevance
```

**Response fields used:** `title`, `images.normal` (image URL), `user.login` (designer), `tags`, `html_url`.

---

## Error Handling

| Condition | Response to Claude |
|---|---|
| 401 Unauthorized | `"Dribbble token invalid or expired. Check DRIBBBLE_ACCESS_TOKEN in .env."` |
| 429 Rate Limited | `"Dribbble rate limit hit. Wait 60 seconds and try again."` |
| Empty results | `"No shots found for query '{query}'. Try broader or different keywords."` |
| Network failure | `"Could not reach Dribbble API. Check your internet connection."` |

All errors are returned as MCP tool errors (not thrown exceptions) so Claude can surface them as readable messages.

---

## Registration in Claude Code

After building, register the server in `~/.claude/settings.json`:

```json
{
  "mcpServers": {
    "dribbble": {
      "command": "node",
      "args": ["C:/Users/ollie/dribbble-mcp/dist/index.js"],
      "env": {
        "DRIBBBLE_ACCESS_TOKEN": "your-token-here"
      }
    }
  }
}
```

Alternatively, load the token from a local `.env` file using `dotenv` at server startup rather than passing it via the Claude Code config — this is the preferred approach so the token is not stored in `settings.json`.

---

## What This Is Not

- **Not a full Dribbble client** — only `search_dribbble` is exposed. No shot detail, no designer lookup, no likes or follows.
- **Not deployed** — runs locally only. No Vercel function, no cloud hosting.
- **Not shared with clients** — internal CJ Studio tool only.
