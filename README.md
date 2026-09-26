# AI Prompt Library

A searchable library of prompts for large language models. Each prompt is
annotated with the **prompt-engineering techniques** it uses (role, context,
constraints, output format, grounding...) and a short explanation of *why* it
works, so it's a reference for writing your own prompts, not just a list to copy.

## Features

- 9 prompts across **Coding**, **Learning** and **Productivity**
- **Live search** across titles, prompt text and techniques
- **Category filters** (accessible toggle buttons with `aria-pressed`)
- **One-click copy** to the clipboard, with a fallback message if the clipboard is blocked
- `[PLACEHOLDERS]` highlighted so it's obvious what to fill in
- Responsive grid that works on phones

## How it's built

Plain HTML, CSS and JavaScript — no framework or build step.

| File | Purpose |
|---|---|
| `prompts.js` | The data: one object per prompt |
| `app.js` | Renders cards, search, filters and copy buttons |
| `style.css` | Styling, with colours as CSS custom properties |

The page is **data-driven**: adding a prompt means adding one object to
`prompts.js`; the cards, filters and counts update automatically. All content
is inserted with `textContent` rather than `innerHTML`, so prompt text can
never be interpreted as HTML.

## Running it

Open `index.html` in a browser. To host it, enable **GitHub Pages** in the
repo settings (Settings → Pages → Deploy from branch → `main` / root).
