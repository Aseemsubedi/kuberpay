"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  FileBarChart,
  KeyRound,
  Landmark,
  LayoutDashboard,
  Menu,
  Receipt,
  Settings,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { Logo } from "@/components/site/logo";
import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/payments", label: "Payments", icon: Wallet },
  { href: "/dashboard/transactions", label: "Transactions", icon: Receipt },
  { href: "/dashboard/customers", label: "Customers", icon: Users },
  { href: "/dashboard/settlement", label: "Settlement", icon: Landmark },
  { href: "/dashboard/reports", label: "Reports", icon: FileBarChart },
  { href: "/dashboard/api-keys", label: "API Keys", icon: KeyRound },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const nav = (
    <nav className="flex flex-col gap-1">
      {links.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm",
              active ? "bg-royal text-white" : "text-white/70 hover:bg-white/5 hover:text-white",
            )}
          >
            <link.icon size={16} />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-[#f3f6fb] text-navy">
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col bg-navy px-4 py-5 text-white lg:flex">
        <Logo light />
        <p className="mt-6 px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">Merchant</p>
        <div className="mt-3">{nav}</div>
        <p className="mt-auto px-3 text-xs leading-5 text-white/40">Sample account · Demo data only</p>
      </aside>

      {open ? (
        <div className="fixed inset-0 z-50 bg-navy p-5 text-white lg:hidden">
          <div className="flex items-center justify-between">
            <Logo light />
            <button type="button" aria-label="Close navigation" onClick={() => setOpen(false)}>
              <X />
            </button>
          </div>
          <div className="mt-8">{nav}</div>
        </div>
      ) : null}

      <div className="lg:pl-64">
        <header className="flex items-center justify-between border-b border-line bg-white px-5 py-4">
          <button type="button" className="lg:hidden" aria-label="Open navigation" onClick={() => setOpen(true)}>
            <Menu />
          </button>
          <p className="text-sm text-muted">Northline Studio · Prototype merchant</p>
          <Link href="/" className="text-sm font-semibold text-royal">
            Back to site
          </Link>
        </header>
        <div className="px-5 py-6">{children}</div>
      </div>
    </div>
  );
}
