import { Image } from "react-img-placeholder";

interface QueenProps {
  name: string;
  image: string;
  charisma: number;
  uniqueness: number;
  nerve: number;
  talent: number;
  category: string;
  subcategory?: string;
}

const QueenCard: React.FC<QueenProps> = ({ name, image, charisma, uniqueness, nerve, talent, category, subcategory }) => {
  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-lg text-center">
      <Image
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        src={image as string}
        width={128}
        height={128}
        alt={name}
        className="w-32 h-32 mx-auto rounded-full object-cover"
      />
      <h2 className="mt-2 text-lg font-bold">{name}</h2>
      <p className="text-pink-400">
        {category} - {subcategory}
      </p>
      <div className="grid grid-cols-2 gap-4 my-4">
        <div className="flex flex-col items-center">
          <p>Charisma</p>
          <progress value={charisma / 6}  />
        </div>
        <div className="flex flex-col items-center">
          <p>Uniqueness</p>
          <progress value={uniqueness / 6}  />
        </div>
        <div className="flex flex-col items-center">
          <p>Nerve</p>
          <progress value={nerve / 6}  />
        </div>
        <div className="flex flex-col items-center">
          <p>Talent</p>
          <progress value={talent / 6} />
        </div>
      </div>
    </div>
  );
};

export default QueenCard;
