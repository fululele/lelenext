"use client";

import { FormEvent, useState } from "react";
import { City, findCities } from "@/lib/cities";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<City[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResults(findCities(query));
    setHasSearched(true);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <section className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-center text-3xl font-bold text-slate-900">
          City Finder
        </h1>
        <p className="mt-2 text-center text-sm text-slate-600 sm:text-base">
          Search by city, country, or any word from the descriptions.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-6 flex flex-col gap-3 sm:flex-row"
        >
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="City, country, or keywords…"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
          />
          <button
            type="submit"
            className="rounded-lg bg-slate-900 px-6 py-3 font-medium text-white transition hover:bg-slate-700"
          >
            Search
          </button>
        </form>

        {hasSearched && (
          <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
            {results.length > 0 ? (
              <div className="space-y-4">
                <p className="text-sm font-medium text-slate-600">
                  {results.length === 1
                    ? "1 city matched"
                    : `${results.length} cities matched`}
                </p>
                <ul className="space-y-4">
                  {results.map((city) => (
                    <li key={city.name}>
                      <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                        <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
                          {city.name}
                        </h2>
                        <p className="mt-1 text-sm font-medium text-slate-600">
                          {city.country}
                        </p>
                        <p className="mt-3 leading-7 text-slate-700">
                          {city.description}
                        </p>
                      </article>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-slate-700">
                No cities found. Try different city, country, or keywords.
              </p>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
