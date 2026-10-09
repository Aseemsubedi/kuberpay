import Link from "next/link";
import { Article, PointGrid, Prose } from "@/components/site/article";

export const metadata = { title: "Invoice" };

export default function InvoicePage() {
  return (
    <Article
      eyebrow="Products"
      title="Smart invoicing software to get paid faster"
      text="Kuber Pays invoicing helps you create professional invoices, automate payment reminders, and get paid faster. Manage it from anywhere."
    >
      <Prose>
        <p>
          Manage invoices, transactions, and financial operations on a secure, scalable platform, alongside the rest of
          your Kuber Pays activity.
        </p>
      </Prose>
      <PointGrid
        items={[
          ["Workflow automation", "Automate recurring tasks like invoice generation and reminders, so the team can focus on growth."],
          ["Client portal", "Share invoices, discuss pricing, and finalize deals with clients in one place."],
        ]}
      />
      <Link href="/get-started" className="mt-8 inline-flex rounded-full bg-royal px-5 py-2.5 text-sm font-semibold text-white">
        Get started
      </Link>
    </Article>
  );
}
