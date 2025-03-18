import { Queen } from "../utils/queens";
import { Image } from "react-img-placeholder";

const Quote = ({
  quote,
  queen,
  showCategory,
}: {
  quote: string;
  queen: Queen;
  showCategory?: boolean
}) => (
  <figure className="max-w-screen-md mx-auto flex items-center justify-center flex-col bg-gray-950 w-full rounded-xl p-4 relative">
    <svg
      className="w-10 h-10 mx-auto mb-3 text-gray-500 absolute -z-0 right-4 top-4 opacity-75"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 18 14"
    >
      <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
    </svg>
    <blockquote className="z-10">
      <p className="text-2xl italic font-medium text-white">{quote}</p>
    </blockquote>
    <figcaption className="flex items-center justify-center mt-6 space-x-3 rtl:space-x-reverse">
      <Image
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        src={queen.image}
        width={48}
        height={48}
        alt={queen.name}
        className="w-12 h-12 rounded-full"
      />
      <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-500 dark:divide-gray-700">
        <cite className="pe-3 font-medium text-white">{queen.name}</cite>
        {showCategory && <cite className="ps-3 text-sm text-gray-500 dark:text-gray-400">
          {queen.category}
        </cite>}
      </div>
    </figcaption>
  </figure>
);

export default Quote;
