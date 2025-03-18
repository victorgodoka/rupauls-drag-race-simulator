import { Episode } from "./episode";
import { Queen } from "./queens";
import { runways } from "./runways";
import { getCast, saveTrackRecord } from "./storage";

// Lista de desafios possíveis
const challenges = [
  "Acting Challenge",
  "Ball Challenge",
  "Choreography Challenge",
  "Commercial Challenge",
  "Design Challenge",
  "Girl Group Challenge",
  "Improvisation Challenge",
  "Lip Sync Challenge",
  "Makeover Challenge",
  "Music Video Challenge",
  "Photoshoot Challenge",
  "Rumix Challenge",
  "Runway Challenge",
  "Rusical Challenge",
  "Singing Challenge",
  "Stand-Up Challenge",
];

// Seleciona um desafio aleatório
const getRandomChallenge = () => {
  return challenges[Math.floor(Math.random() * challenges.length)];
};

// Calcula as pontuações das Queens
const calculateScores = (queens: Queen[]) => {
  return queens.map((queen) => {
    const maxi = Math.floor(Math.random() * 101); // Pontuação do Maxi Challenge
    const runway = Math.floor(Math.random() * 101); // Pontuação do Runway
    const final = (maxi + runway) / 2; // Média da pontuação

    return { queen, maxi, runway, final };
  });
};

// Função principal para gerar um episódio
export const generateEpisode = async (id: number, totalEpisodes: number): Promise<Episode> => {
  const queens = await getCast();
  console.log(queens)
  if (!queens || queens.length < 6) throw new Error("Elenco insuficiente para gerar episódio!");

  let episodeType: "Talent Show" | "Snatch Game" | "Random";

  if (id === 1) {
    episodeType = "Talent Show";
  } else if (id === totalEpisodes - 1) {
    episodeType = "Snatch Game";
  } else {
    episodeType = "Random";
  }

  const maxiChallenge = episodeType === "Random" ? getRandomChallenge() : episodeType;

  // Calculando as pontuações
  const scores = calculateScores(queens);
  scores.sort((a, b) => b.final - a.final); // Ordenação por pontuação (maior para menor)

  // Definir Top 2
  const top2 = scores.slice(0, 2).map((s) => s.queen);

  // Definir Bottom 3
  const bottom3 = scores.slice(-3).map((s) => s.queen);

  // Escolher Safe no Bottom 3
  const safeQueen = bottom3[Math.floor(Math.random() * bottom3.length)];
  const lipsyncQueens = bottom3.filter((q) => q !== safeQueen);

  // Determinar a vencedora do Lip Sync
  const lipsyncWinner = lipsyncQueens[Math.floor(Math.random() * lipsyncQueens.length)];
  const eliminatedQueen = lipsyncQueens.find((q) => q !== lipsyncWinner) || null;
  const runwayTheme = runways[Math.floor(Math.random() * runways.length)];

  // Criar o episódio
  const episode: Episode = {
    id,
    type: episodeType,
    maxiChallenge,
    queens,
    scores,
    top2,
    bottom3,
    lipsync: { winner: lipsyncWinner, eliminated: eliminatedQueen },
    runwayTheme,
  };

  await saveTrackRecord(episode); // Salvar no IndexedDB

  return episode;
};
