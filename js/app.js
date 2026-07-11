// js/app.js
// Owned by: Systems/Integration
//
// Wires data.js + engine.js + corkboard.js into a playable loop.
// Tracks which event/letter is active and the running clue-word tally
// across the whole game.

let currentEventIndex = 0;
let currentLetterIndex = 0;
let clueTally = []; // clue words caught across the WHOLE game so far
let score = 5;
let isGameOver = false;
let sceneIntroShownForCurrentEvent = false;

const letterContainer = document.getElementById("letter-text");
const corkboardContainer = document.getElementById("corkboard");
const witnessLabel = document.getElementById("witness-label");
const nextBtn = document.getElementById("next-btn");
const scoreValue = document.getElementById("score-value");

let teardownCurrentLetter = null;

function updateScoreDisplay() {
  if (scoreValue) {
    scoreValue.textContent = score;
  }
}

function resetGame() {
  currentEventIndex = 0;
  currentLetterIndex = 0;
  clueTally = [];
  score = 5;
  isGameOver = false;
  sceneIntroShownForCurrentEvent = false;
  updateScoreDisplay();
  witnessLabel.textContent = "A Witness's Account";
  corkboardContainer.classList.add("hidden");
  loadLetter();
}

function showSceneIntro() {
  const event = GAME_DATA.events[currentEventIndex];
  sceneIntroShownForCurrentEvent = true;
  corkboardContainer.classList.add("hidden");
  letterContainer.innerHTML = `
    <div class="scene-intro">
      <p class="scene-label">Scene ${currentEventIndex + 1}</p>
      <h2>${event.title}</h2>
      <p class="scene-copy">The next memory is gathering in the ink. Press begin and read the witness account.</p>
      <button id="begin-scene-btn" class="primary-btn">Begin Scene</button>
    </div>
  `;
  witnessLabel.textContent = event.title;
  nextBtn.disabled = true;

  const beginBtn = document.getElementById("begin-scene-btn");
  if (beginBtn) {
    beginBtn.addEventListener("click", () => {
      loadLetter();
    }, { once: true });
  }
}

function loadLetter() {
  if (isGameOver) return;

  corkboardContainer.classList.add("hidden");

  if (currentLetterIndex === 0 && !sceneIntroShownForCurrentEvent) {
    showSceneIntro();
    return;
  }

  const event = GAME_DATA.events[currentEventIndex];
  const letter = event.letters[currentLetterIndex];
  witnessLabel.textContent = letter.witness;

  if (teardownCurrentLetter) teardownCurrentLetter();
  letterContainer.innerHTML = `
    <div class="letter-meta">
      <span class="letter-meta-pill">Clue words: ${letter.clueWords.length}</span>
    </div>
  `;
  const letterBody = document.createElement("div");
  letterBody.className = "letter-body";
  letterContainer.appendChild(letterBody);
  teardownCurrentLetter = renderLetter(letterBody, letter, handleCaught, handleLetterComplete);
  updateScoreDisplay();
}

function showGameOver() {
  if (isGameOver) return;

  isGameOver = true;
  if (teardownCurrentLetter) {
    teardownCurrentLetter();
    teardownCurrentLetter = null;
  }

  letterContainer.innerHTML = `
    <div class="scene-intro game-over">
      <p class="scene-label">The Ink Goes Dark</p>
      <h2>Game Over</h2>
      <p class="scene-copy">Your life reached zero. The memory slips away before you can hold it.</p>
      <button id="restart-btn" class="primary-btn">Try Again</button>
    </div>
  `;
  witnessLabel.textContent = "The Ink Goes Dark";
  nextBtn.disabled = true;
  corkboardContainer.classList.add("hidden");

  const restartBtn = document.getElementById("restart-btn");
  if (restartBtn) {
    restartBtn.addEventListener("click", resetGame, { once: true });
  }
}

function handleCaught(word, _caughtSoFar, isClueWord) {
  if (isGameOver) return;

  if (isClueWord) {
    score += 3;
  } else {
    score -= 1;
  }

  updateScoreDisplay();

  if (score <= 0) {
    showGameOver();
  }
}

function handleLetterComplete(caughtWords) {
  if (isGameOver) return;

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

function getTotalClueWords() {
  return GAME_DATA.events.reduce((total, event) => {
    return total + event.letters.reduce((sum, letter) => sum + letter.clueWords.length, 0);
  }, 0);
}

function getUniqueCaughtClues() {
  const allClues = GAME_DATA.events.flatMap(e => e.letters.flatMap(l => l.clueWords.map(c => c.toLowerCase())));
  const unique = [...new Set(clueTally.map(w => w.toLowerCase()))];
  return unique.filter(c => allClues.includes(c));
}

function checkFinalLetterUnlock() {
  const total = getTotalClueWords();
  const caught = getUniqueCaughtClues().length;
  caught >= total ? showEnding() : showIncompleteScreen(caught, total);
}

function showIncompleteScreen(caught, total) {
  isGameOver = true;
  witnessLabel.textContent = "The Past Slips Away";
  letterContainer.innerHTML = "";
  corkboardContainer.classList.add("hidden");
  if (teardownCurrentLetter) teardownCurrentLetter();

  letterContainer.innerHTML = `
    <div class="scene-intro game-over">
      <p class="scene-label">Memory Incomplete</p>
      <h2>The Final Letter Remains Sealed</h2>
      <p class="scene-copy">You recovered <strong>${caught}</strong> of <strong>${total}</strong> memories. Some words escaped before you could catch them.</p>
      <button id="restart-btn" class="primary-btn">Try Again ↺</button>
    </div>
  `;
  nextBtn.disabled = true;

  const restartBtn = document.getElementById("restart-btn");
  if (restartBtn) restartBtn.addEventListener("click", resetGame, { once: true });
}

function showEndingScreen(resolved) {
  isGameOver = true;
  setTimeout(() => {
    const desk = document.querySelector(".desk");
    const overlay = document.createElement("div");
    overlay.className = "game-over-overlay";
    overlay.innerHTML = `
      <div class="game-over-content">
        <h2>${resolved ? "The Truth Survives" : "The Truth Fades"}</h2>
        <p>${resolved
          ? "You caught enough of the past to understand what happened."
          : "The past remains incomplete. Some things stay buried."}</p>
        <div class="game-over-actions">
          <button id="replay-btn" class="primary-btn">Read Again ↺</button>
          <a href="index.html" class="ghost-btn">Return to Menu</a>
        </div>
      </div>
    `;
    desk.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add("show"));
    document.getElementById("replay-btn").addEventListener("click", () => {
      overlay.remove();
      resetGame();
    });
  }, 2000);

  nextBtn.textContent = "Play Again ↺";
  nextBtn.disabled = false;
  nextBtn.classList.add("ready");
}

function nextEvent() {
  currentEventIndex++;
  currentLetterIndex = 0;
  sceneIntroShownForCurrentEvent = false;

  if (currentEventIndex < GAME_DATA.events.length) {
    loadLetter();
  } else {
    checkFinalLetterUnlock();
  }
}

function showEnding() {
  const resolved = clueTally.length >= GAME_DATA.ending.threshold;
  witnessLabel.textContent = "Josiah Hale";
  letterContainer.innerHTML = "";
  corkboardContainer.classList.add("hidden");
  if (teardownCurrentLetter) teardownCurrentLetter();

  const hiddenText = resolved
    ? GAME_DATA.ending.text
    : "The letter remains too faded to read. The past stays hidden.";

  letterContainer.innerHTML = `
    <div class="letter-meta">
      <span class="letter-meta-pill">Final letter</span>
    </div>
    <div class="letter-body final-letter-body"></div>
  `;
  const finalBody = letterContainer.querySelector(".final-letter-body");
  teardownCurrentLetter = renderLetter(
    finalBody,
    { text: hiddenText, inkColor: "#2b1f14", clueWords: GAME_DATA.ending.clueWords || [] },
    handleCaught,
    () => {
      const line = resolved ? GAME_DATA.ending.resolvedLine : GAME_DATA.ending.unresolvedLine;
      corkboardContainer.innerHTML = `<p>${line}</p>`;
      corkboardContainer.classList.remove("hidden");
      showEndingScreen(resolved);
    }
  );
}

nextBtn.addEventListener("click", () => {
  if (isGameOver) return;
  if (!corkboardContainer.classList.contains("hidden")) {
    nextEvent();
  }
});

updateScoreDisplay();
loadLetter();
