import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCast, resetSeason } from "../utils/storage";
import { Queen } from "../utils/queens";

const Season = () => {
  const navigate = useNavigate();
  const [, setQueens] = useState<Queen[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCast = async () => {
      setLoading(true);
      try {
        const cast = await getCast(); // Aguarda a resposta do IndexedDB
        if (!cast || cast.length < 6) {
          alert("You need at least 6 Queens to start!");
          navigate("/casting");
        } else {
          setQueens(cast);
        }
      } catch (error) {
        console.error("Error fetching cast:", error);
      }
      setLoading(false);
    };

    fetchCast();
  }, [navigate]);

  const startSeason = async () => {
    await resetSeason(); // Aguarda a limpeza do IndexedDB antes de continuar
    navigate("/season/episode/1");
  };

  if (loading) return <p className="text-gray-400">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-pink-400">
        Drag Race - The Season Begins!
      </h1>
      <p className="text-gray-300 mt-2">Get ready for an iconic season!</p>

      <button
        onClick={startSeason}
        className="mt-6 bg-pink-500 px-6 py-2 rounded text-white font-bold hover:bg-pink-600 transition"
      >
        Start Season
      </button>
    </div>
  );
};

export default Season;
