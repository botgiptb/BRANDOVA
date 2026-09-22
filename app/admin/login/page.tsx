"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Login failed.");
      }
      router.replace("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0D0D0D] flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-[#C9A84C]/10 blur-[140px] pointer-events-none" />

      <div className="relative w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex w-14 h-14 rounded-2xl bg-[#C9A84C]/12 border border-[#C9A84C]/25 items-center justify-center mb-5">
            <Lock size={22} className="text-[#C9A84C]" />
          </div>
          <h1 className="text-[28px] font-bold text-white tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
            Admin Access
          </h1>
          <p className="text-white/40 text-[14px] mt-2">Enter your password to continue.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#1A1A1A] border border-white/[0.08] rounded-2xl p-7 space-y-4">
          <div>
            <label className="block text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              placeholder="••••••••"
              className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-[14px] text-white placeholder-white/25 focus:outline-none focus:border-[#C9A84C]/60 transition-colors"
            />
          </div>

          {error && <p className="text-[13px] text-red-400 font-medium">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-[14px] font-semibold bg-[#C9A84C] text-[#0D0D0D] hover:bg-[#E8C97A] transition-all duration-200 disabled:opacity-70"
          >
            {loading ? "Signing in…" : <>Sign In <ArrowRight size={15} /></>}
          </button>
        </form>

        <p className="text-center text-white/20 text-[12px] mt-6">Brandova Admin Panel</p>
      </div>
    </main>
  );
}
