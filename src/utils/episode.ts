import { Queen } from "./queens";

export type Episode = {
  id: number;
  type: "Talent Show" | "Snatch Game" | "Random";
  maxiChallenge: string;
  queens: Queen[];
  scores: { queen: Queen; maxi: number; runway: number; final: number }[];
  top2: Queen[];
  bottom3: Queen[];
  lipsync: { winner: Queen; eliminated: Queen | null };
  runwayTheme: string;
};
