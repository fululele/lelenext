"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { AuthFieldErrors, login, validateLogin } from "@/lib/auth";

export default function LoginForm() {
  const router = useRouter();
  const { refreshSession } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<AuthFieldErrors>({});
  const [formError, setFormError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");

    const fieldErrors = validateLogin(name, email);
    setErrors(fieldErrors);
    if (fieldErrors.name || fieldErrors.email) {
      return;
    }

    const result = login(name, email);
    if ("error" in result) {
      setFormError(result.error);
      return;
    }

    refreshSession();
    router.push("/search");
  };

  return (
    <main className="flex flex-1 items-center justify-center bg-slate-100 px-4 py-10">
      <section className="w-full max-w-md rounded-2xl bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold text-slate-900">Log in</h1>
        <p className="mt-2 text-sm text-slate-600">
          Enter your name and email to continue to the city search.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
          <div>
            <label
              htmlFor="login-name"
              className="block text-sm font-medium text-slate-700"
            >
              Name
            </label>
            <input
              id="login-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoComplete="name"
              className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="login-email"
              className="block text-sm font-medium text-slate-700"
            >
              Email
            </label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {formError && (
            <p className="text-sm text-red-600" role="alert">
              {formError}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-slate-900 px-6 py-3 font-medium text-white transition hover:bg-slate-700"
          >
            Log in
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Need an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-slate-900 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </section>
    </main>
  );
}
