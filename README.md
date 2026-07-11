# The Ink Remembers

The Ink Remembers is a short, text-driven mystery game built for the Echoes and Reflections jam. The player reads fading letters, catches important words before they disappear, and gradually reconstructs the story of Josiah Hale through the clues they manage to keep.

## How to Play

- Open [index.html](index.html) in a browser to start the game.
- Read each letter carefully.
- Click or tap words you want to catch before they fade away.
- After each event, the caught words are used to fill in a corkboard summary.
- If you collect enough clues, the final ending resolves more clearly.

## Run Locally

This project has no build step and no dependencies.

You can run it in either of these ways:

- Open [index.html](index.html) directly in your browser.
- Or serve the folder locally with a simple static server, for example:
  - VS Code Live Server
  - `python3 -m http.server`

## Project Structure

- [index.html](index.html) — main page and script wiring
- [css/style.css](css/style.css) — visual styling for the letter, corkboard, and UI
- [js/data.js](js/data.js) — narrative content, events, letters, and clue words
- [js/engine.js](js/engine.js) — the fade-and-catch letter mechanic
- [js/corkboard.js](js/corkboard.js) — corkboard summary rendering
- [js/app.js](js/app.js) — game flow, state, and transitions
- [docs/game-explainer.md](docs/game-explainer.md) — design overview and story context
- [docs/team-tasks.md](docs/team-tasks.md) — team roles and 48-hour plan

## Team Roles

The project is split into four clear ownership areas:

- Mechanic Engineer → [js/engine.js](js/engine.js)
- Narrative Writer → [js/data.js](js/data.js)
- UI/Visual + Corkboard → [css/style.css](css/style.css) and [js/corkboard.js](js/corkboard.js)
- Systems/Integration → [js/app.js](js/app.js), playtesting, and submission prep

## Current Status

The starter scaffold is in place and the first event, “Last Seen at the Docks,” is already wired up as a working reference. The rest of the content, polish, and ending flow are still being expanded.

## Notes

This is intentionally a lightweight jam project built with plain HTML, CSS, and vanilla JavaScript. The goal is to keep the scope small, playable, and easy to ship quickly.
