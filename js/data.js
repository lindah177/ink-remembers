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
       id: "breakfast",
      title: "The Last Breakfast",
      letters: [
        {
          witness: "Mara Hale",
          inkColor: "#4a3018",
          text: "He burned letters in the hearth before I woke. Ash still on his sleeve. He pressed our mother's ring into my palm and said nothing.",
          clueWords: ["letters", "ring"]
        },
        {
          witness: "Tom Reyes",
          inkColor: "#2b3a4a",
          text: "I came early. He was packing a bag by the window. He slipped a second ring into his pocket when he saw me. He did not smile.",
          clueWords: ["bag", "pocket"]
        }
      ],
      corkboardTemplate: "Mara saw him burn {0} and give her the {1}. Tom arrived early and saw him packing a {2}, hiding a second ring in his {3}."
    },
    {

     id: "argument",
      title: "The Argument",
      letters: [
        {
          witness: "Corwin Vane",
          inkColor: "#5a1f1f",
          text: "The stranger left before the shouting began. Fine coat, no name. Josiah was already angry when I returned from the back room.",
          clueWords: ["stranger", "returned"]
        },
        {
          witness: "Tom Reyes",
          inkColor: "#2b3a4a",
          text: "I was outside the door. The stranger was still inside when Halvard's name was shouted. Then a chair scraped. Then silence.",
          clueWords: ["halvard", "silence"]
        }
      ],
      corkboardTemplate: "Corwin says the {0} left before the fight, and he only {1} afterward. Tom heard {2}'s name shouted while the stranger was still inside, then {3}."
    },

    
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
    },
    {
       id: "letter-to-self",
      title: "The Letter He Sent Himself",
      letters: [
        {
          witness: "Mara Hale",
          inkColor: "#4a3018",
          text: "We searched the desk together. Behind the ledger I found a coded list. Names and numbers in cipher. Tom looked away.",
          clueWords: ["coded", "cipher"]
        },
        {
          witness: "Tom Reyes",
          inkColor: "#2b3a4a",
          text: "We searched the desk together. I found the same list. It was in plain hand, not cipher. Directions to the coast. Mara must have misread it.",
          clueWords: ["plain", "directions"]
        }
      ],
      corkboardTemplate: "Mara found a {0} list in {1}. Tom says it was {2} writing, with {3} to the coast. They cannot both be right."
    },

    {
    id: "search",
      title: "The Search",
      letters: [
        {
          witness: "Corwin Vane",
          inkColor: "#5a1f1f",
          text: "We forced the shed lock together. Behind the rope I found a sealed letter. Mara was checking the window. I put it in my coat.",
          clueWords: ["lock", "sealed"]
        },
        {
          witness: "Mara Hale",
          inkColor: "#4a3018",
          text: "We forced the shed together. His compass sat on the sill. Placed, not dropped. Corwin turned away fast when I looked at him.",
          clueWords: ["compass", "placed"]
        }
      ],
      corkboardTemplate: "Corwin and Mara forced the {0} together. Corwin found a {1} letter and hid it. Mara found the {2}, deliberately {3}, and saw Corwin flinch."
    },

  ],

  ending: {
    text: "Whoever finds this — I am sorry for the worry. By the time you read this I will already be gone. There is a debt I could not disappear any other way. Don't follow. I will write again when it is safe, if it is ever safe.",
    clueWords: ["disappear", "follow", "safe"],
    threshold: 6, // total clue words caught across the WHOLE game needed for the resolved ending
    resolvedLine: "...safe on Aldern Island. The debt can chase a dead man all it wants.",
    unresolvedLine: "...gone, and that will have to be enough of an answer."
  }
};
