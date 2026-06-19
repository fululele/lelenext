"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import CitySearch from "@/components/CitySearch";

export default function ProtectedSearch() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <main className="flex flex-1 items-center justify-center bg-slate-100 px-4 py-10">
        <p className="text-slate-600">Loading…</p>
      </main>
    );
  }

  return <CitySearch />;
}
