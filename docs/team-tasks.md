# Team Tasks — 48 Hours, 4 People

Stack for everyone: **plain HTML, CSS, and vanilla JavaScript. No framework, no build step, no backend.** Open `index.html` in a browser and it runs — that's the whole deploy story, which matters when the clock is running out.

Each role owns a specific file so merge conflicts stay rare. Read `game-explainer.md` first — everyone should understand the whole game before splitting up.

---

## 1. Mechanic Engineer — owns `js/engine.js`

**What:** Build and maintain the fade-and-catch engine — the one thing the entire game is built on. It takes a letter (text + timing) and handles rendering the words, fading them out on a timer, catching them on click, and dropping the ink-blot effect when a word is lost.

**Why this person:** Whoever's most comfortable with DOM manipulation and timing/animation logic. This is the technically riskiest piece — if it's solid, everyone else has a stable foundation to build on.

**Stack:** Vanilla JS, `setTimeout`, DOM APIs, CSS transitions.

**Milestones:**
- Hour 6: matches the prototype — one hardcoded letter fades and catches correctly.
- Hour 16: **generalized** — works for any letter object passed in, not just the hardcoded one. This unblocks everyone else, so don't slip this one.

---

## 2. Narrative Writer — owns `js/data.js`

**What:** Write all 5 events (both witnesses' letters per event), decide which words are "clues," and write the corkboard summary sentence for each event, plus the two ending variants.

**Why this person:** Doesn't need deep JS skill — just needs to follow the data shape the Mechanic Engineer sets up (documented at the top of `data.js`). Good fit if someone on the team is stronger at writing than code.

**Stack:** Plain JS objects/arrays. Copy-paste the existing "docks" event as a template.

**Milestones:**
- Hour 10: 2 more events written and dropped into `data.js`.
- Hour 24: all 5 events + both ending lines finalized.

---

## 3. UI/Visual + Corkboard — owns `css/style.css` and `js/corkboard.js`

**What:** Build the visual identity (parchment, ink, candlelight — see the starter's existing look for the direction), and the corkboard logic that fills caught clue words into the summary template, showing ink blots for anything missed.

**Why this person:** Whoever's strongest at CSS and visual polish. Also a reasonable fit if they want a small, self-contained bit of JS logic (`corkboard.js` is short).

**Stack:** CSS (transitions, layout, custom properties), a small amount of vanilla JS.

**Milestones:**
- Hour 12: corkboard renders a static example sentence correctly, blots and all.
- Hour 20: full visual pass — matches the parchment/ink direction across every screen.

---

## 4. Systems/Integration — owns `js/app.js`, README, and submission

**What:** Wire everything together — which event/letter is currently active, navigation between them, the running clue-word tally across the whole game, and triggering the correct ending. Also: continuously merge everyone's pieces (don't wait until hour 47), playtest for bugs, and handle the itch.io upload + submission form.

**Why this person:** Whoever's most comfortable thinking about state and most likely to actually finish the merge/submission chores under time pressure — this role is as much about herding the project home as writing code.

**Stack:** Vanilla JS (app state/controller), basic git for merging everyone's branches.

**Milestones:**
- Hour 14: can navigate between 2 dummy events using placeholder data.
- Hour 30: full game loop wired end-to-end and playable start to finish, even with rough content/art.
- Hour 40+: bug fixes and submission only — nobody starts new features past this point.

---

## Suggested 48-hour timeline

| Hours | Focus |
|---|---|
| 0–2 | **Whole team together.** Confirm the letter/event data shape before splitting up — this single agreement prevents most integration pain later. Already drafted in `js/data.js` comments; just make sure everyone's actually read it. |
| 2–16 | Parallel work, everyone in their own file. |
| 16 | **First integration checkpoint.** Generalized engine + 2 real events + basic navigation should combine into an ugly-but-playable slice. |
| 16–32 | Keep building in parallel. Merge into `app.js` every few hours, not once at the end. |
| 32–40 | All content in, full visual pass in, playtesting starts. |
| 40–48 | Bug fixes only. Submission ready by hour 46 to leave a buffer. |

## Why this split works
- Different owned files → rare merge conflicts.
- The riskiest piece (the engine) is owned by one person and generalized early, so everyone else builds against a stable contract instead of guessing.
- The Narrative role doesn't require deep coding — lowers risk if someone's less experienced with JS.
