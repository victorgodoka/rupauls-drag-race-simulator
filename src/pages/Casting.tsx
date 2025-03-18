import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getQueens, saveCast } from "../utils/storage";
import QueenCard from "../components/QueenCard";
import { Queen } from "../utils/queens";

const Casting = () => {
  const [queens, setQueens] = useState<Queen[]>([]);
  const [selectedQueens, setSelectedQueens] = useState<Queen[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQueens = async () => {
      try {
        const data = await getQueens(); // Busca as Queens no IndexedDB
        setQueens(data);
      } catch (err) {
        console.error("Error loading queens from IndexedDB:", err);
      }
    };
    fetchQueens();
  }, []);

  const toggleQueenSelection = (queen: Queen) => {
    setSelectedQueens((prev) =>
      prev.includes(queen)
        ? prev.filter((q) => q !== queen)
        : prev.length < 14
        ? [...prev, queen]
        : prev
    );
  };

  const handleNext = async () => {
    if (selectedQueens.length >= 6 && selectedQueens.length <= 14) {
      try {
        await saveCast(selectedQueens); // Salva as Queens no IndexedDB
        navigate("/season");
      } catch (err) {
        console.error("Failed to save selection:", err);
        alert("Failed to save selection due to storage issue.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-pink-400 mb-4">
        Select Your Queens
      </h1>
      <p className="text-gray-300 mb-2">
        Choose 6 to 14 Queens to start the season.
      </p>
      <p
        className={`mb-4 ${
          selectedQueens.length < 6 ? "text-red-400" : "text-green-400"
        }`}
      >
        Selected: {selectedQueens.length} / 14
      </p>

      <div className="grid grid-cols-3 gap-4">
        {queens.length === 0 ? (
          <p>No Queens available. Create some first!</p>
        ) : (
          queens.map((queen) => (
            <div
              key={queen.name}
              className={`cursor-pointer transition transform hover:scale-105 ${
                selectedQueens.includes(queen) ? "ring-4 ring-pink-500" : ""
              }`}
              onClick={() => toggleQueenSelection(queen)}
            >
              <QueenCard {...queen} />
            </div>
          ))
        )}
      </div>

      <button
        onClick={handleNext}
        className="mt-6 bg-pink-500 px-6 py-2 rounded text-white font-bold hover:bg-pink-600 transition disabled:bg-gray-600"
        disabled={selectedQueens.length < 6}
      >
        Next
      </button>
    </div>
  );
};

export default Casting;
