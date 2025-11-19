import React, { useContext, createContext, useState, useEffect } from "react";
import * as changeCase from "change-case";
const words = [
  "the",
  "i",
  "and",
  "a",
  "is",
  "as",
  "see",
  "like",
  "my",
  "can",
  "to",
  "do",
  "of",
  "said",
  "be",
  "me",
  "from",
  "look",
  "are",
  "was",
  "mom",
  "dad",
  "you",
  "have",
  "your",
  "go",
  // //*Green
  // "no",
  // "so",
  // "say",
  // "she",
  // "we",
  // "come",
  // "here",
  // "play",
  // //*Cherry
  // "or",
  // "for",
  // "by",
  // "one",
  // "two",
  // "into",
  // "they",
  // "went",
  // "will",
  // "has",
];
type Tprops = {
  //Add Props for Context
};

const InternalContext = createContext<ReturnType<typeof internalHook>>(
  undefined as any
);

export function Internal_SightWords(p: Tprops & { children: any }) {
  const hook = internalHook(p);

  return (
    <InternalContext.Provider value={hook}>
      {p.children}
    </InternalContext.Provider>
  );
}
/**
 * hook to access and manipulate context
 * @returns
 */
export function useSightWordsHook() {
  return useContext(InternalContext);
}

function internalHook(p: Tprops) {
  const [active, setActive] = useState<undefined | string>(undefined);
  const [mode, setMode] = useState<"capital" | "lower" | "upper" | undefined>(
    undefined
  );
  const [lives, setLives] = useState(3);
  const [availableWords, setAvailableWords] = useState(words);
  const [backgroundColor, setBackgroundColor] = useState("white");
  useEffect(() => {
    setBackgroundColor("red");
    setTimeout(() => {
      setBackgroundColor("white");
    }, 1000);
  }, [lives]);
  return {
    setNextWord: () => {
      let int = getRandomInt(0, availableWords.length - 1);
      setActive(availableWords[int]);
      setAvailableWords(availableWords.filter((a, index) => index != int));
    },
    reset: () => {
      setActive(undefined);
      setAvailableWords(words);
      setMode(undefined);
    },
    active,
    availableWords,
    mode,
    lives,
    backgroundColor,
    setMode,
    getWordOptions: () => {
      let numbers = getTwoUniqueInts(0, words.length);
      let wordArray = [active, words[numbers[1]], words[numbers[0]]];
      console.log({ wordArray });
      return wordArray.sort(() => Math.random() - 0.5) as string[];
    },
    answer(option: string) {
      if (option === active) {
        let int = getRandomInt(0, availableWords.length - 1);
        setActive(availableWords[int]);
        setAvailableWords(availableWords.filter((a, index) => index != int));
        console.log({ availableWords });
      } else {
        const msg = new SpeechSynthesisUtterance("Woops");
        window.speechSynthesis.speak(msg);
        let value = lives - 1;
        if (value === 1) {
          const msg = new SpeechSynthesisUtterance("Last Try");
          window.speechSynthesis.speak(msg);
        }
        if (value === 0) {
          setActive(undefined);
          setAvailableWords(words);
          setMode(undefined);
          setLives(3);
          const msg = new SpeechSynthesisUtterance("Game Over Try Again");
          window.speechSynthesis.speak(msg);
        } else {
          setLives(value);
        }
      }
    },
  };
}

export function External_SightWords() {
  return (
    <Internal_SightWords>
      <h1>Your Logic Here</h1>
    </Internal_SightWords>
  );
}

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function textMode(mode: "capital" | "lower" | "upper", text: string) {
  if (!text) {
    console.log({ text });
  }
  console.log("text", text);
  switch (mode) {
    case "capital":
      return changeCase.capitalCase(text);
    case "lower":
      return text.toLowerCase();
    case "upper":
      return text.toUpperCase();
  }
}

function getTwoUniqueInts(min: number, max: number) {
  const first = Math.floor(Math.random() * (max - min + 1)) + min;
  let second;

  do {
    second = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (second === first);

  return [first, second];
}
