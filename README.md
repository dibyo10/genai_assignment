# Mentor

A single-deploy Next.js chatbot with three switchable Scaler personas: **Anshuman Singh**, **Abhimanyu Saxena**, and **Kshitij Mishra**. Each mentor stays in their domain and redirects off-topic questions to the right colleague.

## Stack

- Next.js 14 (App Router) — single deploy, no separate backend
- Vercel AI SDK + `@ai-sdk/openai` streaming
- OpenAI `gpt-5.2`
- Tailwind CSS, Fraunces + JetBrains Mono (editorial aesthetic)
- `react-markdown` + `remark-gfm` + `rehype-sanitize` for safe markdown rendering
- Per-mentor threads persisted to `localStorage` (no DB needed)
- Humanizer system prompt suffix to strip AI tells from every response

## Setup

```bash
cp .env.example .env.local       # then fill in OPENAI_API_KEY
npm install
npm run dev
```

Open http://localhost:3000.

## Environment

| Var | Required | Default |
| --- | --- | --- |
| `OPENAI_API_KEY` | yes | — |
| `OPENAI_MODEL`   | no  | `gpt-5.2` |

## Deploy

**Vercel** (recommended, one click):

1. Push the repo to GitHub.
2. Import on [vercel.com/new](https://vercel.com/new).
3. Add `OPENAI_API_KEY` in project env vars.
4. Deploy.

Any Node host (Render, Fly, Railway) also works:

```bash
npm run build
npm start
```

The `/api/chat` route runs on the Edge runtime for fast streaming.

## How the personas work

Each mentor's full system prompt is built server-side from three pieces:

1. **Persona prompt** — background, values, communication style, output format, constraints. Defined per-mentor in `lib/mentors.ts`.
2. **Domain boundaries** — a strict scope plus a redirect rule: if a question falls outside their lane, they name the right mentor and tell the user to switch tabs. They will not answer outside their lane, even partially.
3. **Humanizer suffix** — a long block of writing rules in `lib/humanizer.ts`, distilled from the project humanizer skill. Bans the usual AI tells (delve, tapestry, em-dash overuse, rule-of-three lists, sycophantic openers, generic positive closers, etc.) and forces varied sentence rhythm, contractions, and real opinions.

The three are concatenated in `lib/buildSystemPrompt.ts` and passed to the model. The browser only sends `mentorId` plus the message history — the system prompt itself never leaves the server.

## Project layout

```
app/
  layout.tsx              # Fonts, metadata
  page.tsx                # Tab state, mentor switcher
  globals.css             # Editorial styles, paper grain, prose styles
  api/chat/route.ts       # streamText with gpt-5.2
lib/
  mentors.ts              # Persona configs + domain scope + redirect rules
  humanizer.ts            # Humanizer suffix
  buildSystemPrompt.ts    # Combines all three
components/
  MentorTabs.tsx          # 3-up masthead-style tabs
  MentorChat.tsx          # One thread per mentor (localStorage-backed)
  Markdown.tsx            # Sanitized markdown rendering
  SuggestionChips.tsx     # Empty-state question prompts
  ChatInput.tsx           # Auto-grow textarea + send
```

## Notes

- Threads are kept separately per mentor and persist across reloads.
- Switching mentors does not lose history. Each mentor remembers their own thread.
- Click "Clear conversation" in the sidebar to wipe a single mentor's thread.
- No analytics, no tracking, no DB. The OpenAI key is the only secret.
