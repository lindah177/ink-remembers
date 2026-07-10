# The Ink Remembers — What We're Building

## The idea in one sentence
A short mystery game where you read fading letters about a man who vanished — you can only catch some of the words before they disappear, so every read gives you a different, incomplete piece of the truth.

## The jam theme connection
- **Echo** = the letters themselves. They're traces of things that already happened, decaying in front of you as you read.
- **Reflection** = the act of catching words and piecing them into a sentence. You're not just observing the past — you're reshaping it into something you can understand. That's the literal meaning of *reflectere*: "to bend back."

## How a play session works
1. Player opens a letter from one of three witnesses.
2. The letter's text appears. Words fade out one at a time, in a random order, a couple seconds apart.
3. Player clicks/taps a word before it fully fades, "catching" it into their notebook.
4. Once both letters for an event are read, the caught words auto-fill into a short summary sentence on a corkboard. Missing words show as ink blots, not blanks — it should feel like decay, not a fill-in-the-blank quiz.
5. This repeats across 5 events. A running tally tracks how many "clue words" (specially flagged important words) the player caught overall.
6. At the end, Josiah's own final letter appears. If the tally is high enough, the last line resolves into the truth. If not, it stays broken and the game gives a softer, uncertain ending.

That's the whole game. One mechanic, reused five times, with a single branching line at the end.

## Worked example (this one's already built in the starter repo)

**Event: "Last Seen at the Docks"**

**Tom's letter (blue ink):**
> I saw him at the docks past midnight. He was not alone. The other man wore a grey coat and carried no lantern.

**Corwin's letter (red ink):**
> I was nowhere near the harbor that night. I was at the tavern, alone, nursing a bad mood and a worse debt.

**Clue words flagged in the data:** `midnight`, `grey` (from Tom) and `tavern`, `debt` (from Corwin)

**If the player catches all 4 clue words**, the corkboard shows:
> Tom saw Josiah near the docks around **midnight** and noticed a **grey** coat. Corwin claims he was at the **tavern**, worried about a **debt**.

**If the player only catches 1 or 2**, the corkboard shows:
> Tom saw Josiah near the docks around **midnight** and noticed a ▓▓▓ coat. Corwin claims he was at the ▓▓▓, worried about a ▓▓▓.

Same letters every time — but which words survive is different each read, so different players (and different playthroughs) end up with a different, personal version of the story.

## What's NOT in scope for the jam build
- No voice acting, no complex animation, no branching dialogue trees — just text, timers, and one branching final line.
- No physics, no combat, no multiplayer.
- No save system — one sitting, start to finish.

## Full story bible (for the Narrative Writer)
- **Josiah Hale** — the missing person, a chart-maker in the coastal town of Marrow's End.
- **Mara Hale** (sister, brown ink) — knew him best, saw him last at home.
- **Tom Reyes** (harbor hand, blue ink) — saw him at the docks, terse and factual.
- **Corwin Vane** (estranged business partner, red ink) — had a public falling-out with Josiah days before.

**The 5 events:** The Last Breakfast → The Argument → Last Seen at the Docks (built) → The Letter He Sent Himself → The Search. Full letter-by-letter breakdown is in the original design doc — ping the person who has it if it's not already dropped into `js/data.js`.
