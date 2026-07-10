// js/data.js
// Owned by: Narrative Writer
//
// Add one object per event. Each event needs:
//   id, title, letters: [{ witness, inkColor, text, clueWords }, ...], corkboardTemplate
//
// corkboardTemplate uses {0}, {1}, {2}... referring to clueWords in the order
// they appear across this event's letters (letters[0].clueWords first, then
// letters[1].clueWords, and so on). Any clue word the player didn't catch
// gets swapped for an ink blot automatically — you don't need to handle that.
//
// clueWords must be lowercase, single words, spelled exactly as they appear
// in the letter text (punctuation is stripped automatically when matching).

const GAME_DATA = {
  events: [
    {
      id: "docks",
      title: "Last Seen at the Docks",
      letters: [
        {
          witness: "Tom Reyes",
          inkColor: "#2b3a4a",
          text: "I saw him at the docks past midnight. He was not alone. The other man wore a grey coat and carried no lantern.",
          clueWords: ["midnight", "grey"]
        },
        {
          witness: "Corwin Vane",
          inkColor: "#5a1f1f",
          text: "I was nowhere near the harbor that night. I was at the tavern, alone, nursing a bad mood and a worse debt.",
          clueWords: ["tavern", "debt"]
        }
      ],
      corkboardTemplate: "Tom saw Josiah near the docks around {0} and noticed a {1} coat. Corwin claims he was at the {2}, worried about a {3}."
    }

    // TODO(narrative): add these 4 more events, same shape as above —
    // see docs/game-explainer.md for the story bible and witness details.
    //   { id: "breakfast", title: "The Last Breakfast", ... }
    //   { id: "argument", title: "The Argument", ... }
    //   { id: "letter-to-self", title: "The Letter He Sent Himself", ... }
    //   { id: "search", title: "The Search", ... }
  ],

  ending: {
    text: "Whoever finds this — I am sorry for the worry. By the time you read this I will already be gone. There is a debt I could not disappear any other way. Don't follow. I will write again when it is safe, if it is ever safe.",
    clueWords: ["disappear", "follow", "safe"],
    threshold: 6, // total clue words caught across the WHOLE game needed for the resolved ending
    resolvedLine: "...safe on Aldern Island. The debt can chase a dead man all it wants.",
    unresolvedLine: "...gone, and that will have to be enough of an answer."
  }
};
