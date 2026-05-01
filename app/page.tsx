"use client";

import { FormEvent, useState } from "react";
import { City, findCityByName } from "@/lib/cities";

export default function Home() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<City | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult(findCityByName(query));
    setHasSearched(true);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <section className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-center text-3xl font-bold text-slate-900">
          City Explorer
        </h1>
        <p className="mt-2 text-center text-sm text-slate-600 sm:text-base">
          Search for a city to read a quick description.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-6 flex flex-col gap-3 sm:flex-row"
        >
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Enter a city name..."
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
            {result ? (
              <article>
                <h2 className="text-2xl font-semibold text-slate-900">
                  {result.name}
                </h2>
                <p className="mt-1 text-sm font-medium text-slate-600">
                  {result.country}
                </p>
                <p className="mt-4 leading-7 text-slate-700">
                  {result.description}
                </p>
              </article>
            ) : (
              <p className="text-slate-700">
                City not found. Try searching for another city.
              </p>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
