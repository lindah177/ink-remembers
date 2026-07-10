# The Ink Remembers

A short mystery game for the "Echoes and Reflections" jam. Letters fade as you read them — catch the words that matter before they're gone, and piece together what happened to Josiah Hale.

## Run it

No build step, no install. Just open `index.html` in a browser.

If you want live-reload while developing, any static server works — e.g. the VS Code "Live Server" extension, or `python3 -m http.server` from this folder.

## Structure

```
index.html               entry point, wires everything together
css/style.css             all visual styling
js/data.js                 all game content — events, letters, clue words   (Narrative owns this)
js/engine.js                the fade-and-catch mechanic                     (Mechanic Engineer owns this)
js/corkboard.js             fills the corkboard summary from caught clues   (UI/Visual owns this)
js/app.js                    game state — active event/letter, ending logic  (Integration owns this)
docs/game-explainer.md    what we're building, plain language, worked example
docs/team-tasks.md          who's doing what, plus the 48-hour plan
```

## Team

Full role breakdown is in `docs/team-tasks.md`. Quick reference:

- **Mechanic Engineer** → `js/engine.js`
- **Narrative Writer** → `js/data.js`
- **UI/Visual** → `css/style.css`, `js/corkboard.js`
- **Integration** → `js/app.js`, playtesting, submission

## Status

Starter scaffold. One event ("Last Seen at the Docks") works end-to-end as a working reference. Everything else — the remaining 4 events, visual polish, and the ending screen — is marked `TODO` in the relevant files.
