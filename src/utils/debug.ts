import { Queen } from "./queens";

export const generateQueens = (count: number): Queen[] => {
  const queenNames = [
    "Ivana Tinkle", "Anita Cocktail", "Ella Gance", "Bea Haven", "Sharon Needles", "Tess Tosterone", "Ophelia Balls", "Rita Book",
    "Crystal Vixen", "Lola Vuitton", "Ava Garde", "Fifi Fabulous", "Mona Lott", "Verona Velvet", "Bambi Bambastic", "Zara Glamour",
    "Sassy Supreme", "Kitty Couture", "Roxie Glitter", "Cleo Patra", "Barbie Q", "Diva Divine", "Trixie Twinkle", "Scarlet Fever",
    "Carmen Getit", "Penny Tration", "Lush LaBelle", "Bella Bangs", "Victoria Secret", "Madame Moxie", "Joanna Jet", "Sindy Sin",
    "Gigi Gorgeous", "Tina Turnover", "Miss Behave", "Glitter Galore", "Luscious Luxe", "Cherry Bomb", "Velvet Valentine", "Bubbles Champagne",
    "Chardonnay Bliss", "Ruby Razzmatazz", "Venus Valentine", "Misty Mirage", "Candy Cane", "Silky Satin", "Peachy Keen", "Lexa Lush",
    "Daphne DeLight", "Glamazon Goddess", "Sandy Shores", "Crystal Clear", "Zelda Zest", "Amber Amour", "Nina Noir", "Dolly Diamond",
    "Ivory Envy", "Ginger Snap", "Misty Midnight", "Delilah Dazzle", "Heidi Ho", "Sasha Sizzle", "Poppy Pizazz", "Electra Elegance",
    "Pearl Perfection", "Gilda Glam", "Margo Magnifique", "Dixie Darling", "Yasmin Yass", "Nikita Nectar", "Coco Chanelle", "Aurora Allure",
    "Valerie Vogue", "Trixie Tinsel", "Chloe Couture", "Jazz Jasmine", "Bonnie Bonanza", "Opal Opulence", "Miley Mayhem", "Dolly Danger",
    "Selena Sparkle", "Mimosa Mirage", "Rosie Radiance", "Fiona Fierce", "Celeste Serene", "Nova Nebula", "Zinnia Zest", "Portia Prestige",
    "Vixen Valentine", "Lola Lush", "Tessa Tease", "Brandy Blaze", "Athena Ambrosia", "Kiki Khaos", "Miranda Majesty", "Blossom Bliss",
    "Regina Royale", "Saffron Sunset", "Tatiana Twinkle", "Jade Jewel", "Lyra Lumina", "Cassidy Crimson", "Bianca Blaze", "Gemma Glitz",
    "Cynthia Celeste", "Naomi Nectar"
  ];

  const categories = ["Fashion Queen", "Comedy Queen", "Pageant Queen", "Theater Queen", "Music Queen", "Unique Queen"];

  const selectedNames = [...queenNames].sort(() => 0.5 - Math.random()).slice(0, count);
  const queens = [];

  for (const name of selectedNames) {
    const charisma = Math.floor(Math.random() * 6) + 1;
    const uniqueness = Math.floor(Math.random() * 6) + 1;
    const nerve = Math.floor(Math.random() * 6) + 1;
    const talent = 12 - (charisma + uniqueness + nerve); // Garantindo soma 12

    if (talent < 1 || talent > 6) continue; // Se a soma der errado, ignora essa Queen

    const category = categories[Math.floor(Math.random() * categories.length)];

    queens.push({
      name,
      image: `https://xsgames.co/randomusers/avatar.php?g=female&v=${Date.now()}-${Math.random().toString().replace(".", "")}`,
      charisma,
      uniqueness,
      nerve,
      talent,
      subcategories: [],
      category
    });
  }

  return queens;
};
