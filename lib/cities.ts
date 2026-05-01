export interface City {
  name: string;
  itumalo: string;
  faalupega: string;
}

export const cities: City[] = [
  {
    name: "Tokyo",
    itumalo: "Japan",
    faalupega:
      "Tokyo is a fast-paced metropolis where modern design meets long-held traditions. Neighborhoods shift quickly from quiet temples and local markets to neon-lit streets full of food and nightlife. The city is known for efficient transit, careful attention to detail, and a constant sense of movement.",
  },
  {
    name: "Paris",
    itumalo: "France",
    faalupega:
      "Paris is celebrated for its architecture, museums, and cafe culture. Walkable boulevards connect historic landmarks with lively neighborhoods filled with bookstores and bakeries. Its atmosphere blends elegance, art, and everyday street life in a way that feels instantly recognizable.",
  },
  {
    name: "New York",
    itumalo: "United States",
    faalupega:
      "New York City is a dense and energetic global hub with distinct boroughs and communities. It offers world-class theater, finance, cuisine, and public spaces like Central Park. The pace is intense, but its diversity and creativity make it one of the most influential cities in the world.",
  },
  {
    name: "Cairo",
    itumalo: "Egypt",
    faalupega:
      "Cairo sits along the Nile and carries layers of ancient and modern history. Its streets are filled with markets, mosques, and neighborhoods that reflect centuries of cultural exchange. The city's scale and rhythm can feel overwhelming, yet its historical depth is unmatched.",
  },
  {
    name: "Sydney",
    itumalo: "Australia",
    faalupega:
      "Sydney combines urban life with a strong connection to the coast. It is known for its harbor, iconic opera house, and beach culture that shapes daily routines. The city offers a relaxed outdoor lifestyle while remaining a major center for business and the arts.",
  },
  {
    name: "Buenos Aires",
    itumalo: "Argentina",
    faalupega:
      "Buenos Aires is famous for its music, dance, and late-night social culture. European-influenced architecture stands beside colorful districts, independent theaters, and busy cafes. The city feels expressive and literary, with strong local traditions around food and conversation.",
  },
  {
    name: "Nairobi",
    itumalo: "Kenya",
    faalupega:
      "Nairobi is a major East African city with a growing technology and business scene. It is one of the few capitals where wildlife reserves sit close to the urban center, creating a unique setting. The city reflects both rapid development and deep regional cultural roots.",
  },
  {
    name: "Mumbai",
    itumalo: "India",
    faalupega:
      "Mumbai is a coastal megacity known for commerce, cinema, and relentless energy. Historic buildings, modern high-rises, and crowded local trains all define its daily rhythm. It is a city of ambition where many languages, communities, and industries intersect.",
  },
];

/**
 * Returns every city for which every whitespace-separated token appears as a
 * case-insensitive substring somewhere in the name, itumalo, or faalupega.
 */
export function findCities(query: string): City[] {
  const tokens = query
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter((t) => t.length > 0);
  if (tokens.length === 0) {
    return [];
  }

  return cities.filter((city) => {
    const haystack =
      `${city.name} ${city.itumalo} ${city.faalupega}`.toLowerCase();
    return tokens.every((token) => haystack.includes(token));
  });
}
