export interface City {
  name: string;
  itumalo: string;
  malaefono: string;
  faalupega: string;
}

export const cities: City[] = [
  {
    name: "Aua",
    itumalo: "Launiusaelua",
    malaefono: "Paepaeulupo'o, Paepae ala",
    faalupega:
      "Afio mai le sa'ousoali'i (Unitoa), Afio mai le matua (Liufau) le tama aitu ma tagata, susu mai ali'i o le faleono (Ponausuia, Uli, Tilo, Afu, Niumatalolo, Saoimanulua), mamalu mai Paopaoailua ma Tufaga ma le launiusaelua",
  },
  {
    name: "Pago Pago",
    itumalo: "Launiusaelua",
    malaefono: "Gagamoe",
    faalupega:
      "Afio mai Mauga, le Ma'oputasi, le tama fa'asausau a Sua ma le Vaifanua, Fofo ma Aitulagi, Itu'au ma Alataua, susu mai tei (Fanene, Lealaifuaneva, Uifa'atali), susu mai anoalo (Asuega, Teo, Tuimaletavai, Olotoa, Leota), susu mai matua (Taito, Pulumataala), susu mai nofofanau (Gi, Vaivao), susu mai anoaloifale (Lea'oa, Fa'afitinalo), mamalu mai lau tofa Tua'olo, na fale agafulu ai le motu, mamalu mai le falefa (Fuga, Mageo, Poiali'i, Logo), ma le launiusaelua",
  },
  {
    name: "Tokyo",
    itumalo: "Japan",
    malaefono: "Ueno Park Commons",
    faalupega:
      "Tokyo is a fast-paced metropolis where modern design meets long-held traditions. Neighborhoods shift quickly from quiet temples and local markets to neon-lit streets full of food and nightlife. The city is known for efficient transit, careful attention to detail, and a constant sense of movement.",
  },
  {
    name: "Paris",
    itumalo: "France",
    malaefono: "Esplanade des Invalides",
    faalupega:
      "Paris is celebrated for its architecture, museums, and cafe culture. Walkable boulevards connect historic landmarks with lively neighborhoods filled with bookstores and bakeries. Its atmosphere blends elegance, art, and everyday street life in a way that feels instantly recognizable.",
  },
  {
    name: "New York",
    itumalo: "United States",
    malaefono: "Washington Square Park",
    faalupega:
      "New York City is a dense and energetic global hub with distinct boroughs and communities. It offers world-class theater, finance, cuisine, and public spaces like Central Park. The pace is intense, but its diversity and creativity make it one of the most influential cities in the world.",
  },
  {
    name: "Cairo",
    itumalo: "Egypt",
    malaefono: "Al-Azhar Midan",
    faalupega:
      "Cairo sits along the Nile and carries layers of ancient and modern history. Its streets are filled with markets, mosques, and neighborhoods that reflect centuries of cultural exchange. The city's scale and rhythm can feel overwhelming, yet its historical depth is unmatched.",
  },
  {
    name: "Sydney",
    itumalo: "Australia",
    malaefono: "Hyde Park North",
    faalupega:
      "Sydney combines urban life with a strong connection to the coast. It is known for its harbor, iconic opera house, and beach culture that shapes daily routines. The city offers a relaxed outdoor lifestyle while remaining a major center for business and the arts.",
  },
  {
    name: "Buenos Aires",
    itumalo: "Argentina",
    malaefono: "Plaza de Mayo",
    faalupega:
      "Buenos Aires is famous for its music, dance, and late-night social culture. European-influenced architecture stands beside colorful districts, independent theaters, and busy cafes. The city feels expressive and literary, with strong local traditions around food and conversation.",
  },
  {
    name: "Nairobi",
    itumalo: "Kenya",
    malaefono: "Uhuru Gardens Grounds",
    faalupega:
      "Nairobi is a major East African city with a growing technology and business scene. It is one of the few capitals where wildlife reserves sit close to the urban center, creating a unique setting. The city reflects both rapid development and deep regional cultural roots.",
  },
  {
    name: "Mumbai",
    itumalo: "India",
    malaefono: "Shivaji Park Maidan",
    faalupega:
      "Mumbai is a coastal megacity known for commerce, cinema, and relentless energy. Historic buildings, modern high-rises, and crowded local trains all define its daily rhythm. It is a city of ambition where many languages, communities, and industries intersect.",
  },
];

function parseSearchTokens(query: string): string[] {
  return query
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter((t) => t.length > 0);
}

function haystackMatchesTokens(haystack: string, tokens: string[]): boolean {
  const h = haystack.toLowerCase();
  return tokens.every((token) => h.includes(token));
}

/**
 * Returns every city for which every whitespace-separated token appears as a
 * case-insensitive substring somewhere in the name, itumalo, malaefono, or faalupega.
 */
export function findCities(query: string): City[] {
  const tokens = parseSearchTokens(query);
  if (tokens.length === 0) {
    return [];
  }

  return cities.filter((city) =>
    haystackMatchesTokens(
      `${city.name} ${city.itumalo} ${city.malaefono} ${city.faalupega}`,
      tokens,
    ),
  );
}

/**
 * Returns every city for which every whitespace-separated token appears as a
 * case-insensitive substring of malaefono only.
 */
export function findCitiesByMalaefono(query: string): City[] {
  const tokens = parseSearchTokens(query);
  if (tokens.length === 0) {
    return [];
  }

  return cities.filter((city) =>
    haystackMatchesTokens(city.malaefono, tokens),
  );
}
