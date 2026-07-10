// js/corkboard.js
// Owned by: UI/Visual + Corkboard Builder
//
// Fills an event's corkboardTemplate with caught clue words.
// Any clue word the player never caught renders as an ink blot instead.

function renderCorkboard(container, event, allCaughtWords) {
  const allClues = event.letters.flatMap((l) => l.clueWords);
  const lowerCaught = allCaughtWords.map((w) => w.toLowerCase());

  let html = event.corkboardTemplate;
  allClues.forEach((clue, i) => {
    const wasCaught = lowerCaught.includes(clue.toLowerCase());
    const display = wasCaught
      ? `<strong>${clue}</strong>`
      : '<span class="blot-text">▓▓▓</span>';
    html = html.replace(`{${i}}`, display);
  });

  container.innerHTML = html;
}
