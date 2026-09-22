import { redirect } from "next/navigation";
import { isAuthed } from "@/lib/auth";
import AdminNav from "./AdminNav";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAuthed())) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#F5F5F2] flex flex-col md:flex-row">
      <AdminNav />
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
