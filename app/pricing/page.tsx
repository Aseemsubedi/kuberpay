import Link from "next/link";
import { Article, Prose } from "@/components/site/article";

export const metadata = { title: "Pricing" };

export default function PricingPage() {
  return (
    <Article
      eyebrow="Solutions"
      title="Transparent pricing for the Canadian market"
      text="For detailed pricing, please contact our sales team."
    >
      <Prose>
        <p>
          We believe in clarity. Pricing is flat, with no hidden charges, so you can scale without surprises. You pay
          for what you use.
        </p>
        <p>
          Kuber Pays is a secure Canadian payment solution for businesses of all sizes, with support for Interac, Visa,
          and Mastercard, fraud protection, and Canadian data residency.
        </p>
      </Prose>
      <Link href="/contact" className="pay-glow mt-8 inline-flex rounded-full bg-royal px-5 py-2.5 text-sm font-semibold text-white">
        Contact sales
      </Link>
    </Article>
  );
}
