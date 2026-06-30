"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import {
  SignUpFieldErrors,
  signUp,
  validateSignUpCredentials,
} from "@/lib/auth";

export default function SignUpForm() {
  const router = useRouter();
  const { refreshSession } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<SignUpFieldErrors>({});
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");

    const credentials = { firstName, lastName, email, password };
    const fieldErrors = validateSignUpCredentials(credentials);
    setErrors(fieldErrors);
    if (
      fieldErrors.firstName ||
      fieldErrors.lastName ||
      fieldErrors.email ||
      fieldErrors.password
    ) {
      return;
    }

    setIsSubmitting(true);
    const result = await signUp(credentials);
    setIsSubmitting(false);

    if ("error" in result) {
      setFormError(result.error);
      return;
    }

    await refreshSession();
    router.push("/search");
  };

  return (
    <main className="flex flex-1 items-center justify-center bg-slate-100 px-4 py-10">
      <section className="w-full max-w-md rounded-2xl bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold text-slate-900">Sign up</h1>
        <p className="mt-2 text-sm text-slate-600">
          Create an account with your name, email, and password.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="signup-first-name"
                className="block text-sm font-medium text-slate-700"
              >
                First name
              </label>
              <input
                id="signup-first-name"
                type="text"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                autoComplete="given-name"
                className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="signup-last-name"
                className="block text-sm font-medium text-slate-700"
              >
                Last name
              </label>
              <input
                id="signup-last-name"
                type="text"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                autoComplete="family-name"
                className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="signup-email"
              className="block text-sm font-medium text-slate-700"
            >
              Email
            </label>
            <input
              id="signup-email"
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

          <div>
            <label
              htmlFor="signup-password"
              className="block text-sm font-medium text-slate-700"
            >
              Password
            </label>
            <input
              id="signup-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="new-password"
              className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
            <p className="mt-1 text-xs text-slate-500">
              At least 8 characters.
            </p>
          </div>

          {formError && (
            <p className="text-sm text-red-600" role="alert">
              {formError}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-slate-900 px-6 py-3 font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Creating account…" : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-slate-900 hover:underline">
            Log in
          </Link>
        </p>
      </section>
    </main>
  );
}
