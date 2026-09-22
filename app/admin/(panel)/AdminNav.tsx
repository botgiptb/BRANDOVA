"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, BarChart3, Images, Inbox, LogOut, ExternalLink } from "lucide-react";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/work", label: "Work Images", icon: Images },
  { href: "/admin/tickets", label: "Tickets", icon: Inbox },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  };

  return (
    <aside className="w-full md:w-60 md:min-h-screen bg-[#0D0D0D] border-b md:border-b-0 md:border-r border-white/[0.06] flex md:flex-col shrink-0">
      <div className="p-5 md:p-6 flex items-center gap-3 md:border-b border-white/[0.06]">
        <img src="/brandova.png" alt="Brandova" className="h-7 w-auto object-contain" />
        <span className="text-[11px] font-bold text-[#C9A84C] uppercase tracking-widest hidden md:inline">Admin</span>
      </div>

      <nav className="flex md:flex-col gap-1 p-3 md:p-4 flex-1 overflow-x-auto">
        {links.map((l) => {
          const active = l.href === "/admin" ? pathname === "/admin" : pathname.startsWith(l.href);
          const Icon = l.icon;
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] font-medium transition-all whitespace-nowrap ${
                active ? "bg-[#C9A84C] text-[#0D0D0D]" : "text-white/50 hover:text-white hover:bg-white/[0.05]"
              }`}
            >
              <Icon size={16} />
              <span>{l.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-3 md:p-4 md:border-t border-white/[0.06] flex md:flex-col gap-1">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] font-medium text-white/50 hover:text-white hover:bg-white/[0.05] transition-all"
        >
          <ExternalLink size={16} />
          <span className="hidden md:inline">View Site</span>
        </a>
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] font-medium text-white/50 hover:text-red-400 hover:bg-red-500/[0.08] transition-all"
        >
          <LogOut size={16} />
          <span className="hidden md:inline">Log Out</span>
        </button>
      </div>
    </aside>
  );
}
