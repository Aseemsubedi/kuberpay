"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "@/components/site/logo";

const menus = [
  {
    label: "Products",
    href: "/payment-gateway",
    items: [
      ["Payment Gateway", "/payment-gateway"],
      ["Invoice", "/invoice"],
      ["Virtual Account", "/virtual-account"],
      ["White Label Solutions", "/whitelabel"],
    ],
  },
  {
    label: "Solutions",
    href: "/solutions",
    items: [
      ["Solutions & Features", "/solution-and-features"],
      ["NFC Solution", "/nfc"],
      ["Merchant Service Reseller", "/merchant-service"],
      ["Pricing", "/pricing"],
      ["FAQ's", "/faqs"],
      ["Terms & Conditions", "/terms"],
      ["Privacy Policy", "/privacy"],
    ],
  },
  {
    label: "Company",
    href: "/company",
    items: [["Company Overview", "/company"]],
  },
  {
    label: "Developers",
    href: "/developers",
    items: [["Technology Stack", "/developers"]],
  },
];

export function Navbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState<string | null>(null);

  function go(href: string) {
    setOpen(false);
    router.push(href);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/85 text-navy backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-5">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex">
          {menus.map((menu) => (
            <div
              key={menu.label}
              className="relative"
              onMouseEnter={() => setSection(menu.label)}
              onMouseLeave={() => setSection(null)}
            >
              <Link href={menu.href} className="flex items-center gap-1 rounded-full px-3 py-2 text-[13px] text-navy/70 hover:text-navy">
                {menu.label}
                <ChevronDown size={14} />
              </Link>
              {section === menu.label ? (
                <div className="absolute left-0 top-full min-w-56 rounded-2xl border border-line bg-white p-2 shadow-[0_20px_50px_rgba(7,26,61,0.12)]">
                  {menu.items.map(([label, href]) => (
                    <Link key={href} href={href} className="block rounded-xl px-3 py-2 text-sm text-navy/80 hover:bg-[#f5f7fb]">
                      {label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
          <Link href="/contact" className="rounded-full px-3 py-2 text-[13px] text-navy/70 hover:text-navy">
            Contact
          </Link>
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <Link href="/login" className="rounded-full px-3 py-2 text-sm text-navy/75 hover:text-navy">
            Sign In
          </Link>
          <Link href="/get-started" className="pay-glow rounded-full bg-royal px-4 py-2 text-sm font-semibold text-white">
            Sign Up
          </Link>
        </div>
        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-lg border border-line lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      {open ? (
        <div className="max-h-[70vh] overflow-auto border-t border-line bg-white px-5 py-4 lg:hidden">
          {menus.map((menu) => (
            <div key={menu.label} className="mb-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{menu.label}</p>
              <div className="mt-2 flex flex-col gap-2">
                {menu.items.map(([label, href]) => (
                  <Link key={href} href={href} onClick={() => go(href)} className="text-sm text-navy/85">
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <Link href="/contact" onClick={() => go("/contact")} className="block text-sm text-navy">
            Contact
          </Link>
          <div className="mt-4 flex gap-3">
            <Link href="/login" onClick={() => go("/login")} className="text-sm font-semibold">
              Sign In
            </Link>
            <Link href="/get-started" onClick={() => go("/get-started")} className="pay-glow rounded-full bg-royal px-4 py-2 text-sm font-semibold text-white">
              Sign Up
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
