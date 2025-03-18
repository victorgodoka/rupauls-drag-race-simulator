export interface Queen {
  name: string;
  image: string;
  charisma: number;
  uniqueness: number;
  nerve: number;
  talent: number;
  category: string;
  subcategories: string[];
}

export const categories = ["Fashion Queen", "Comedy Queen", "Pageant Queen", "Theater Queen", "Music Queen", "Unique Queen"];
export type Category = (typeof categories)[number];

export const subcategories = ["Fishy", "Size", "Asian", "Black", "Latina"];
export type Subcategory = (typeof subcategories)[number];
