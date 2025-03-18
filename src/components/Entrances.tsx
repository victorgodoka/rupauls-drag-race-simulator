import { entrances } from "../utils/entrances";
import { Queen } from "../utils/queens";
import Quote from "./Quote";

const Entrances = ({ queens }: { queens: Queen[] }) => {
  return (
    <div className="grid grid-cols-2 gap-4 grid-auto-rows-fr my-4">
      {queens.map((queen) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const categoryQuotes = entrances[queen.category] || [];
        const randomQuote =
          categoryQuotes.length > 0
            ? categoryQuotes[Math.floor(Math.random() * categoryQuotes.length)]
            : "I'm here to slay, honey!";

        return <Quote quote={randomQuote} queen={queen} showCategory />;
      })}
    </div>
  );
};

export default Entrances;
