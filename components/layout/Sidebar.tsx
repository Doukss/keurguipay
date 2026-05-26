"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { href: "/dashboard", label: "Dashboard", icon: "DB" },
  { href: "/biens", label: "Biens", icon: "BI" },
  { href: "/proprietaires", label: "Proprietaires", icon: "PR" },
  { href: "/locataires", label: "Locataires", icon: "LC" },
  { href: "/loyers", label: "Suivi des loyers", icon: "SL" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="border-b border-slate-800 bg-slate-950 text-slate-300 md:fixed md:inset-y-0 md:left-0 md:w-64 md:border-b-0 md:border-r">
      <div className="flex h-full flex-col">
        <div className="border-b border-slate-800 px-6 py-5">
          <p className="text-xl font-bold tracking-tight text-white">
            KeurGui <span className="text-violet-400">Pay</span>
          </p>
          <p className="mt-1 text-xs text-slate-500">Gestion locative</p>
        </div>

        <nav className="flex gap-2 overflow-x-auto p-3 md:flex-1 md:flex-col md:overflow-visible md:p-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex min-w-max items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition md:min-w-0 ${
                  isActive
                    ? "bg-violet-600 text-white"
                    : "text-slate-400 hover:bg-slate-900 hover:text-white"
                }`}
              >
                <span className="grid h-7 w-7 place-items-center rounded-md bg-white/10 text-[10px] font-bold">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="hidden border-t border-slate-800 p-4 md:block">
          <div className="rounded-lg bg-slate-900 p-3">
            <p className="text-sm font-medium text-white">Mode MVP</p>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              Donnees de demonstration avant connexion Prisma/API.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
