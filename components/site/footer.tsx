import Link from "next/link";
import { contact } from "@/lib/content";
import { Logo } from "@/components/site/logo";

const columns = [
  {
    title: "Products",
    links: [
      ["Payment Gateway", "/payment-gateway"],
      ["Invoice", "/invoice"],
      ["Virtual Account", "/virtual-account"],
      ["White Label", "/whitelabel"],
    ],
  },
  {
    title: "Solutions",
    links: [
      ["Solutions & Features", "/solution-and-features"],
      ["NFC Solution", "/nfc"],
      ["Merchant Reseller", "/merchant-service"],
      ["Pricing", "/pricing"],
    ],
  },
  {
    title: "Company",
    links: [
      ["Overview", "/company"],
      ["FAQ's", "/faqs"],
      ["Developers", "/developers"],
      ["Contact", "/contact"],
    ],
  },
  {
    title: "Legal",
    links: [
      ["Terms & Conditions", "/terms"],
      ["Privacy Policy", "/privacy"],
      ["Merchant demo", "/dashboard"],
      ["Checkout demo", "/checkout"],
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-white text-navy">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.2fr_2fr]">
        <div>
          <Logo />
          <p className="mt-4 text-sm leading-6 text-muted">
            {contact.address[0]}
            <br />
            {contact.address[1]}
          </p>
          <p className="mt-3 text-sm text-muted">{contact.phone}</p>
          <a href={`mailto:${contact.email}`} className="mt-1 block text-sm text-muted hover:text-navy">
            {contact.email}
          </a>
          <p className="mt-3 text-xs text-muted">LEI: {contact.lei}</p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {columns.map((column) => (
            <div key={column.title}>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">{column.title}</p>
              <ul className="mt-3 space-y-2">
                {column.links.map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="text-sm text-navy/75 hover:text-royal">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-xs text-muted sm:flex-row sm:justify-between">
          <p>© 2026 Kuber Pays. All rights reserved.</p>
          <p>Kuber Pays is a trademark of Kuber Pays Inc. This interface is a product prototype.</p>
        </div>
      </div>
    </footer>
  );
}
