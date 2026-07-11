// js/corkboard.js
// Owned by: UI/Visual + Corkboard Builder
//
// Fills an event's corkboardTemplate with caught clue words.
// Any clue word the player never caught renders as an ink blot instead.

function renderCorkboard(container, event, allCaughtWords) {
  // Collect every clue from every witness letter
  const allClues = event.letters.flatMap(letter => letter.clueWords);

  // Convert caught words to lowercase for comparison
  const caughtWords = allCaughtWords.map(word => word.toLowerCase());

  let html = event.corkboardTemplate;
  let recovered = 0;

  // Replace each placeholder in the template
  allClues.forEach((clue, index) => {
    const found = caughtWords.includes(clue.toLowerCase());
    if (found) {
      recovered++;
    }

    // Each revealed word gets a slightly later animation delay than the
    // one before it, so they "pin up" one at a time instead of all at once
    const replacement = found
      ? `<strong class="revealed-word" style="animation-delay:${index * 0.15}s">${clue}</strong>`
      : `<span class="blot-text">██████</span>`;

    html = html.replace(`{${index}}`, replacement);
  });

  // A row of dots giving an at-a-glance sense of how much was recovered,
  // alongside the exact count already shown in text
  const dots = allClues
    .map((_, i) => `<span class="memory-dot${i < recovered ? " filled" : ""}"></span>`)
    .join("");

  // Reset the fade-in state before rebuilding the content. Without this,
  // "show" stays applied from the previous corkboard and the transition
  // gets skipped on the 2nd+ event — it would just pop in instantly.
  container.classList.remove("show");

  // Build the corkboard
  container.innerHTML = `
        <h2>The Ink Remembers...</h2>
        <p class="memory-progress">
            You recovered <strong>${recovered}</strong> of
            <strong>${allClues.length}</strong> memories.
        </p>
        <div class="memory-dots">${dots}</div>
        <div class="memory-summary">
${html}
        </div>
    `;

  // Show the corkboard
  container.classList.remove("hidden");

  // Force a reflow so the browser registers the "show" removal above before
  // we re-add it below — otherwise the two class changes get batched into
  // one update and the fade-in transition never plays.
  void container.offsetWidth;

  // Trigger fade-in animation
  requestAnimationFrame(() => {
    container.classList.add("show");
  });

  // Let the player know it's time to move on. The counterpart to this —
  // setting next-btn back to disabled and removing "ready" — belongs in
  // loadLetter() over in app.js, so this fully resets each round. Not
  // touched here since app.js wasn't part of today's files.
  const nextBtn = document.getElementById("next-btn");
  if (nextBtn) {
    nextBtn.disabled = false;
    nextBtn.classList.add("ready");
  }
}