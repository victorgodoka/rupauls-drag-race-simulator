import { useState, useEffect } from "react";
import { getQueens, resetEverything, saveQueens } from "../utils/storage";
import CreateQueenForm from "../components/CreateQueenForm";
import QueenCard from "../components/QueenCard";
import { Queen } from "../utils/queens";
import { generateQueens } from "../utils/debug";

export default function Create() {
  const [queens, setQueens] = useState<Queen[]>([]);

  const generateRandomQueens = () => {
    saveQueens(generateQueens(25));
  };

  useEffect(() => {
    const fetchQueens = async () => {
      const data = await getQueens();
      setQueens(data);
    };
    fetchQueens();
  }, [queens]);

  const handleQueenAdded = async () => {
    const updatedQueens = await getQueens();
    setQueens(updatedQueens);
  };

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold text-pink-400">Create Queens</h1>
      <div className="flex items-center justify-center space-x-4 my-4">
        <button className="bg-pink-400 text-white p-3 rounded-lg cursor-pointer" onClick={generateRandomQueens}>Generate Random Data</button>
        <button className="bg-pink-400 text-white p-3 rounded-lg cursor-pointer" onClick={resetEverything}>Reset Data</button>
      </div>
      <CreateQueenForm onQueenAdded={handleQueenAdded} />

      <h2 className="text-xl font-bold mt-6">Queens List</h2>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {queens.length === 0 ? (
          <p className="text-gray-400">No Queens created yet.</p>
        ) : (
          queens.map((queen, index) => <QueenCard key={index} {...queen} />)
        )}
      </div>
    </div>
  );
}
