// js/app.js
// Owned by: Systems/Integration
//
// Wires data.js + engine.js + corkboard.js into a playable loop.
// Tracks which event/letter is active and the running clue-word tally
// across the whole game.

let currentEventIndex = 0;
let currentLetterIndex = 0;
let clueTally = []; // clue words caught across the WHOLE game so far

const letterContainer = document.getElementById("letter-text");
const corkboardContainer = document.getElementById("corkboard");
const witnessLabel = document.getElementById("witness-label");
const nextBtn = document.getElementById("next-btn");

let teardownCurrentLetter = null;

function loadLetter() {
  corkboardContainer.classList.add("hidden");
  const event = GAME_DATA.events[currentEventIndex];
  const letter = event.letters[currentLetterIndex];
  witnessLabel.textContent = letter.witness;

  if (teardownCurrentLetter) teardownCurrentLetter();
  teardownCurrentLetter = renderLetter(letterContainer, letter, handleCaught, handleLetterComplete);
}

function handleCaught(_word, _caughtSoFar) {
  // Hook for UI/Visual if they want live notebook feedback while reading.
  // Left intentionally empty in the starter — wire up as needed.
}

function handleLetterComplete(caughtWords) {
  const event = GAME_DATA.events[currentEventIndex];
  const letter = event.letters[currentLetterIndex];
  const lowerClues = letter.clueWords.map((c) => c.toLowerCase());

  caughtWords
    .filter((w) => lowerClues.includes(w.toLowerCase()))
    .forEach((w) => clueTally.push(w));

  if (currentLetterIndex < event.letters.length - 1) {
    currentLetterIndex++;
    loadLetter();
  } else {
    showCorkboard();
  }
}

function showCorkboard() {
  const event = GAME_DATA.events[currentEventIndex];
  renderCorkboard(corkboardContainer, event, clueTally);
  corkboardContainer.classList.remove("hidden");
}

function nextEvent() {
  currentEventIndex++;
  currentLetterIndex = 0;

  if (currentEventIndex < GAME_DATA.events.length) {
    loadLetter();
  } else {
    showEnding();
  }
}

function showEnding() {
  const resolved = clueTally.length >= GAME_DATA.ending.threshold;
  // TODO(integration): render the final letter using renderLetter(), same as
  // any other letter, then once it completes swap in resolvedLine or
  // unresolvedLine based on `resolved` and show it as the last screen.
  witnessLabel.textContent = "Josiah Hale";
  letterContainer.innerHTML = "";
  corkboardContainer.classList.add("hidden");
  if (teardownCurrentLetter) teardownCurrentLetter();
  teardownCurrentLetter = renderLetter(
    letterContainer,
    { text: GAME_DATA.ending.text, inkColor: "#2b1f14" },
    handleCaught,
    () => {
      const line = resolved ? GAME_DATA.ending.resolvedLine : GAME_DATA.ending.unresolvedLine;
      corkboardContainer.innerHTML = `<p>${line}</p>`;
      corkboardContainer.classList.remove("hidden");
    }
  );
}

nextBtn.addEventListener("click", () => {
  if (!corkboardContainer.classList.contains("hidden")) {
    nextEvent();
  }
});

loadLetter();
