"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";

export default function Header() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="text-lg font-semibold text-slate-900">
          Faalupega
        </Link>

        <nav className="flex items-center gap-4 text-sm font-medium">
          {user ? (
            <>
              <span className="hidden text-slate-600 sm:inline">
                Hello, {user.name}
              </span>
              <Link
                href="/search"
                className={
                  pathname === "/search"
                    ? "text-slate-900"
                    : "text-slate-600 hover:text-slate-900"
                }
              >
                Search
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="text-slate-600 hover:text-slate-900"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className={
                  pathname === "/login"
                    ? "text-slate-900"
                    : "text-slate-600 hover:text-slate-900"
                }
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="rounded-lg bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-700"
              >
                Sign up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
