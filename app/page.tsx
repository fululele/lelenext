"use client";

import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";

export default function Home() {
  const { user } = useAuth();

  return (
    <main className="flex flex-1 items-center justify-center bg-slate-100 px-4 py-16">
      <section className="w-full max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Explore villages and their stories
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Search by name, itumalo, malaefono, suafa, or words in faalupega.
          Sign up or
          log in to get started.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {user ? (
            <Link
              href="/search"
              className="rounded-lg bg-slate-900 px-6 py-3 font-medium text-white transition hover:bg-slate-700"
            >
              Go to search
            </Link>
          ) : (
            <>
              <Link
                href="/signup"
                className="rounded-lg bg-slate-900 px-6 py-3 font-medium text-white transition hover:bg-slate-700"
              >
                Sign up
              </Link>
              <Link
                href="/login"
                className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-medium text-slate-900 transition hover:bg-slate-50"
              >
                Log in
              </Link>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
