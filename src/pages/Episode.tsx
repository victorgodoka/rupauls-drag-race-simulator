import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { generateEpisode } from "../utils/gameLogic";
import { Episode } from "../utils/episode";
import Entrances from "../components/Entrances";
import { ruvision } from "../utils/ruvision";
import { initial } from "../utils/initial";
import RuGif from "../components/RuGif";
import { maxidescriptions } from "../utils/maxidescriptions";
import { confessionals } from "../utils/confessionals"; // Importando confessionals
import { rucritiques } from "../utils/rucritiques"; // Importando críticas de RuPaul
import Quote from "../components/Quote";
import { challengeContext } from "../utils/challengeContext";
import { winnerQuotes } from "../utils/winnerQuotes";
import { eliminationQuotes } from "../utils/eliminationQuotes";
import { lipsync } from "../utils/lipsync"; // Narrativa do lipsync
import { ruquotes } from "../utils/ruquotes"; // Falas da RuPaul para eliminadas
import { eliminations } from "../utils/eliminations"; // Quotes das queens eliminadas

const EpisodePage = () => {
  const { id } = useParams<{ id: string }>(); // Pegando o ID da URL
  const navigate = useNavigate();
  const episodeId = Number(id);
  const totalEpisodes = 12; // Defina dinamicamente se necessário

  const [episode, setEpisode] = useState<Episode | null>(null);
  const [loading, setLoading] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);

  useEffect(() => {
    if (isNaN(episodeId) || episodeId < 1) {
      navigate("/season/episode/1"); // Redireciona para o primeiro episódio se o ID for inválido
      return;
    }

    const fetchEpisode = async () => {
      setLoading(true);
      try {
        const newEpisode = await generateEpisode(episodeId, totalEpisodes);
        setEpisode(newEpisode);

        // Determina a vencedora do episódio entre as Top 2
        if (newEpisode.top2 && newEpisode.scores) {
          const top2Scores = newEpisode.scores.filter((s) =>
            newEpisode.top2.includes(s.queen)
          );
          const topWinner = top2Scores.sort((a, b) => b.final - a.final)[0]
            ?.queen.name;
          setWinner(topWinner);
        }
      } catch (error) {
        console.error("Error generating episode:", error);
        setEpisode(null);
      }
      setLoading(false);
    };

    fetchEpisode();
  }, [episodeId, totalEpisodes, navigate]);

  const getRandomContext = (
    type: "top" | "bottom",
    queen1: string,
    queen2: string
  ) => {
    const contextArray = challengeContext[type];
    return contextArray[Math.floor(Math.random() * contextArray.length)]
      .replace("{name1}", queen1)
      .replace("{name2}", queen2);
  };

  if (loading) return <p className="text-gray-400 text-center">Loading...</p>;
  if (!episode)
    return (
      <p className="text-red-400 text-center">Failed to generate episode.</p>
    );

  // Selecionando as duas melhores e as duas piores queens
  const sortedScores = [...episode.scores].sort((a, b) => b.final - a.final);
  const bestQueens = sortedScores.slice(0, 2).map((s) => s.queen);
  const worstQueens = sortedScores.slice(-2).map((s) => s.queen);

  const getRandomConfessional = (type: "struggles" | "confidence") => {
    const confessionalArray = confessionals[type];
    return confessionalArray[
      Math.floor(Math.random() * confessionalArray.length)
    ];
  };

  // Determinar as queens "safe" (nem top 3, nem bottom 3)
  const safeQueens = episode.queens.filter(
    (q) => !episode.top2.includes(q) && !episode.bottom3.includes(q)
  );

  // Determina a queen salva no bottom 3 (a de maior pontuação entre as 3)
  const safeFromBottom = [...episode.bottom3].sort(
    (a, b) => b.final - a.final
  )[0];

  // Pegando críticas aleatórias para as queens do Top 2 e Bottom 3
  const getRandomCritique = (type: "positive" | "negative") => {
    const critiqueArray = rucritiques[type];
    return critiqueArray[Math.floor(Math.random() * critiqueArray.length)];
  };

  // Função para pegar uma fala aleatória de RuPaul ao eliminar uma queen
  const getRandomRuEliminationQuote = (name: string) => {
    return ruquotes[Math.floor(Math.random() * ruquotes.length)].replace(
      "{name}",
      name
    );
  };

  // Função para pegar uma fala aleatória de uma queen eliminada
  const getRandomQueenEliminationQuote = () => {
    return eliminations[Math.floor(Math.random() * eliminations.length)];
  };

  // Função para selecionar a narrativa do lipsync com base na diferença de pontuação
  const getLipsyncNarrative = (
    queen1: string,
    queen2: string,
    score1: number,
    score2: number
  ) => {
    const diff = Math.abs(score1 - score2);
    const category = diff > 10 ? "bigdifference" : "paired";
    const narratives = lipsync.losing[category];
    return narratives[Math.floor(Math.random() * narratives.length)]
      .replace("{name1}", queen1)
      .replace("{name2}", queen2);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white text-center">
      <div className="container mx-auto p-6 flex flex-col items-center max-w-3xl">
        <h1 className="text-3xl font-bold text-pink-400">
          Episode {episode.id}: {episode.maxiChallenge}
        </h1>
        <p className="text-gray-300 mb-4">Category: {episode.type}</p>

        {episode.id === 1 && <Entrances queens={episode.queens} />}
        {episode.id !== 1 && (
          <p className="text-gray-300 my-2">
            {initial[Math.floor(Math.random() * initial.length)]}
          </p>
        )}

        <p className="text-gray-300 italic text-2xl my-2">
          Uuuuh girl!!! She done already done had herses!!
        </p>

        <RuGif />

        {
          ruvision[episode.maxiChallenge][
            Math.floor(Math.random() * ruvision[episode.maxiChallenge].length)
          ]
        }

        <h2 className="text-xl font-bold mt-4 text-purple-400">
          This week’s Maxi Challenge is:
        </h2>
        <h3 className="text-2xl font-bold text-pink-300">
          {episode.maxiChallenge}
        </h3>
        <p className="text-lg italic text-gray-200">
          {maxidescriptions[episode.maxiChallenge]}
        </p>

        {/* Contexto antes dos confessionals */}
        <h2 className="text-xl font-bold mt-6 text-green-400">
          Confidence is key!
        </h2>
        <p className="text-gray-300 italic">
          {getRandomContext("top", bestQueens[0].name, bestQueens[1].name)}
        </p>

        <div className="grid grid-cols-2 gap-4 my-6">
          {bestQueens.map((queen) => (
            <Quote
              key={queen.name}
              queen={queen}
              quote={getRandomConfessional("confidence")}
            />
          ))}
        </div>

        <h2 className="text-xl font-bold mt-6 text-red-400">
          Doubt starts creeping in...
        </h2>
        <p className="text-gray-300 italic">
          {getRandomContext("bottom", worstQueens[0].name, worstQueens[1].name)}
        </p>

        <div className="grid grid-cols-2 gap-4 my-6">
          {worstQueens.map((queen) => (
            <Quote
              key={queen.name}
              queen={queen}
              quote={getRandomConfessional("struggles")}
            />
          ))}
        </div>

        {/* Safe Queens Judgment */}
        <h2 className="text-xl font-bold mt-4 text-green-400">
          Now queens, I've made some decisions.
        </h2>

        <p className="text-gray-300 italic my-2">
          Now, when I say your name, please step forward...
        </p>

        <p className="text-gray-300">
          {safeQueens.length > 0
            ? `${safeQueens
                .map((q) => q.name)
                .join(", ")}, this week you are all... ${
                episodeId === totalEpisodes - 2
                  ? "safe. But remember, safe is not a good look at this point of the competition."
                  : "safe."
              }`
            : "No queens are safe tonight!"}
        </p>

        <p className="text-gray-300 italic my-2">"You may leave the stage."</p>

        <h2 className="text-xl font-bold mt-4 text-blue-400">
          Now it's time for the Judges critiques
        </h2>

        {episode.top2.map((queen) => (
          <p key={queen.name} className="text-gray-300 italic my-2">
            {getRandomCritique("positive").replace("{name}", queen.name)}
          </p>
        ))}

        <h2 className="text-xl font-bold my-4 text-yellow-400">
          {winner}, Condragulations, you are the winner of this week's maxi
          challenge!
        </h2>

        <Quote
          queen={bestQueens.find((q) => q.name === winner)!}
          quote={
            winnerQuotes[
              bestQueens.find((q) => q.name === winner)?.category ||
                "Unique Queen"
            ][Math.floor(Math.random() * winnerQuotes["Fashion Queen"].length)]
          }
        />

        <h2 className="text-xl font-bold mt-4 text-gray-200">
          You and {episode.top2.find((q) => q.name !== winner)?.name} may join
          the other girls.
        </h2>

        <h2 className="text-xl font-bold my-4 text-purple-400">
          RuPaul's Judgement
        </h2>

        {episode.bottom3.map((queen) => (
          <p key={queen.name} className="text-gray-300 italic my-2">
            {getRandomCritique("negative").replace("{name}", queen.name)}
          </p>
        ))}

        {/* Queens up for elimination */}
        <h2 className="text-xl font-bold my-4 text-red-400">
          The bottom queens react...
        </h2>

        <div className="grid grid-cols-2 gap-4 my-4">
          {episode.bottom3
            .filter((q) => q.name !== safeFromBottom.name) // Apenas as duas que vão dublar
            .map((queen) => (
              <Quote
                key={queen.name}
                queen={queen}
                quote={
                  eliminationQuotes[queen.category]?.upForElimination[
                    Math.floor(
                      Math.random() *
                        eliminationQuotes[queen.category]?.upForElimination
                          .length
                    )
                  ] || "Oh honey, this is NOT the moment I wanted!"
                }
              />
            ))}
        </div>

        {/* Queen safe from bottom */}
        <h2 className="text-xl font-bold my-4 text-green-400">
          {safeFromBottom.name}, you are safe.
        </h2>
        <Quote
          queen={safeFromBottom}
          quote={
            eliminationQuotes[safeFromBottom.category]?.safeFromBottom[
              Math.floor(
                Math.random() *
                  eliminationQuotes[safeFromBottom.category]?.safeFromBottom
                    .length
              )
            ] || "Oh thank Ru, I was NOT ready to lip sync tonight!"
          }
        />

        <h2 className="text-xl font-bold mt-4 text-red-400">
          Lipsync for your lives!
        </h2>

        <p className="text-gray-300">
          Two queens stand before me... Ladies, this is your last chance to
          impress me and save yourself from elimination. The time has come for
          you to lip sync for your life. Good luck and don't fuck it up.
        </p>

        <p className="text-gray-300 italic my-4 font-medium">
          {getLipsyncNarrative(
            episode.lipsync.winner.name,
            episode.lipsync.eliminated?.name || "",
            episode.scores.find(
              (s) => s.queen.name === episode.lipsync.winner.name
            )?.final || 0,
            episode.scores.find(
              (s) => s.queen.name === episode.lipsync.eliminated?.name
            )?.final || 0
          )}
        </p>

        <h2 className="text-xl font-bold mt-4 text-green-400">
          Ladies, I've made my decision. {episode.lipsync.winner.name}, shantay
          you stay! You may join the other girls.
        </h2>

        {/* Quote da Queen vencedora do lipsync */}
        <Quote
          queen={episode.lipsync.winner}
          quote={
            episode.lipsync.winner.wins > 2
              ? lipsync.winning.assassin[
                  Math.floor(Math.random() * lipsync.winning.assassin.length)
                ].replace("{wins}", episode.lipsync.winner.wins.toString())
              : lipsync.winning.general[
                  Math.floor(Math.random() * lipsync.winning.general.length)
                ]
          }
        />

        {/* Caso haja eliminação */}
        {episode.lipsync.eliminated && (
          <>
            <h2 className="text-xl font-bold mt-4 text-red-400">
              {episode.lipsync.eliminated.name},{" "}
              {getRandomRuEliminationQuote(episode.lipsync.eliminated.name)}
            </h2>
            <h2 className="text-xl font-bold text-red-500">Sashay away.</h2>

            <Quote
              queen={episode.lipsync.eliminated}
              quote={getRandomQueenEliminationQuote()}
            />
          </>
        )}

        <button
          onClick={() => navigate(`/season/episode/${episodeId + 1}`)}
          className="mt-6 bg-pink-500 px-6 py-2 rounded text-white font-bold hover:bg-pink-600 transition"
        >
          Next Episode
        </button>
      </div>
    </div>
  );
};

export default EpisodePage;
