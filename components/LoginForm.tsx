"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import {
  LoginFieldErrors,
  login,
  validateLoginCredentials,
} from "@/lib/auth";

export default function LoginForm() {
  const router = useRouter();
  const { refreshSession } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginFieldErrors>({});
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");

    const credentials = { email, password };
    const fieldErrors = validateLoginCredentials(credentials);
    setErrors(fieldErrors);
    if (fieldErrors.email || fieldErrors.password) {
      return;
    }

    setIsSubmitting(true);
    const result = await login(credentials);
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
        <h1 className="text-2xl font-bold text-slate-900">Log in</h1>
        <p className="mt-2 text-sm text-slate-600">
          Sign in with your email and password.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
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
              autoComplete="username email"
              className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="login-password"
              className="block text-sm font-medium text-slate-700"
            >
              Password
            </label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
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
            {isSubmitting ? "Logging in…" : "Log in"}
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
