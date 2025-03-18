import { useState, useEffect } from "react";
import { saveQueens, getQueens } from "../utils/storage";
import { Queen, categories, subcategories } from "../utils/queens";

const CreateQueenForm = ({ onQueenAdded }: { onQueenAdded: () => void }) => {
  const [name, setName] = useState("");
  const [imageType, setImageType] = useState<"url" | "upload">("url");
  const [image, setImage] = useState("");
  const [charisma, setCharisma] = useState(3);
  const [uniqueness, setUniqueness] = useState(3);
  const [nerve, setNerve] = useState(3);
  const [talent, setTalent] = useState(3);
  const [category, setCategory] = useState(categories[0]);
  const [subcategoriesSelected, setSubcategoriesSelected] = useState<string[]>(
    []
  );
  const [queensCount, setQueensCount] = useState(0);

  const maxQueens = 999;
  const maxAttribute = 6;
  const totalAttributes = charisma + uniqueness + nerve + talent;

  useEffect(() => {
    const fetchQueens = async () => {
      const existingQueens = await getQueens();
      setQueensCount(existingQueens.length);
    };
    fetchQueens();
  }, []);

  const adjustAttribute = (type: keyof Queen, value: number) => {
    if (value < 1 || value > maxAttribute) return;
    if (totalAttributes - eval(type) + value > 12) return;

    switch (type) {
      case "charisma":
        setCharisma(value);
        break;
      case "uniqueness":
        setUniqueness(value);
        break;
      case "nerve":
        setNerve(value);
        break;
      case "talent":
        setTalent(value);
        break;
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddQueen = async () => {
    if (!name || !image) return alert("All fields must be filled!");
    if (queensCount >= maxQueens)
      return alert("You can only create up to 14 Queens!");
    if (totalAttributes !== 12)
      return alert("The sum of all attributes must be exactly 12!");

    const newQueen: Queen = {
      name,
      image,
      charisma,
      uniqueness,
      nerve,
      talent,
      category,
      subcategories: subcategoriesSelected,
    };

    try {
      const existingQueens = await getQueens();
      const updatedQueens = [...existingQueens, newQueen];

      await saveQueens(updatedQueens);
      onQueenAdded();
      setQueensCount(updatedQueens.length);

      // Reset form
      setName("");
      setImage("");
      setCharisma(3);
      setUniqueness(3);
      setNerve(3);
      setTalent(3);
      setCategory(categories[0]);
      setSubcategoriesSelected([]);
    } catch (error) {
      console.error("Failed to save Queen:", error);
      alert("An error occurred while saving the Queen.");
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md text-white">
      <h2 className="text-xl font-bold mb-4">Create New Queen</h2>

      {queensCount >= maxQueens && (
        <p className="text-red-500 mb-4">Max Queens reached (14/14)!</p>
      )}

      <input
        type="text"
        placeholder="Queen's Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
      />

      <div className="flex space-x-4 mb-3">
        <button
          className={`p-2 rounded w-1/2 ${
            imageType === "url" ? "bg-pink-500" : "bg-gray-700"
          }`}
          onClick={() => setImageType("url")}
        >
          URL
        </button>
        <button
          className={`p-2 rounded w-1/2 ${
            imageType === "upload" ? "bg-pink-500" : "bg-gray-700"
          }`}
          onClick={() => setImageType("upload")}
        >
          Upload
        </button>
      </div>

      {imageType === "url" ? (
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
        />
      ) : (
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
        />
      )}

      <div className="grid grid-cols-4 gap-2">
        {[
          {
            label: "Charisma",
            value: charisma,
            setValue: (val: number) => adjustAttribute("charisma", val),
          },
          {
            label: "Uniqueness",
            value: uniqueness,
            setValue: (val: number) => adjustAttribute("uniqueness", val),
          },
          {
            label: "Nerve",
            value: nerve,
            setValue: (val: number) => adjustAttribute("nerve", val),
          },
          {
            label: "Talent",
            value: talent,
            setValue: (val: number) => adjustAttribute("talent", val),
          },
        ].map(({ label, value, setValue }) => (
          <div key={label}>
            <label>{label}</label>
            <input
              type="number"
              min="1"
              max={maxAttribute}
              value={value}
              onChange={(e) => setValue(+e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>
        ))}
      </div>

      <p
        className={`text-sm mt-2 ${
          totalAttributes !== 12 ? "text-red-500" : "text-green-400"
        }`}
      >
        Total Attributes: {totalAttributes} / 12
      </p>

      <div className="flex space-x-4 mt-3">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-1/2 p-2 rounded bg-gray-700 text-white"
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        <div className="w-1/2">
          <label className="block mb-1">Subcategories</label>
          <div className="grid grid-cols-2 gap-2">
            {subcategories.map((sub) => (
              <label key={sub} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={subcategoriesSelected.includes(sub)}
                  onChange={() =>
                    setSubcategoriesSelected((prev) =>
                      prev.includes(sub)
                        ? prev.filter((s) => s !== sub)
                        : [...prev, sub]
                    )
                  }
                  className="w-4 h-4"
                />
                <span>{sub}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={handleAddQueen}
        className="bg-pink-500 px-4 py-2 rounded w-full mt-4 hover:bg-pink-600 disabled:bg-gray-600"
        disabled={queensCount >= maxQueens || totalAttributes !== 12}
      >
        Add Queen
      </button>
    </div>
  );
};

export default CreateQueenForm;
