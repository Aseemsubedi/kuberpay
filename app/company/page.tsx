import { Article, PointGrid, Prose } from "@/components/site/article";

export const metadata = { title: "Company" };

export default function CompanyPage() {
  return (
    <Article
      eyebrow="Company"
      title="Payments infrastructure for businesses of every size"
      text="Kuber Pays is a digital payments platform for accepting, routing, and reconciling payments, with automation, real-time analytics, and reliability built in."
    >
      <Prose>
        <p>
          The mission is to simplify and accelerate digital payments for every business: transparent pricing, instant
          setup, and a customer-first experience.
        </p>
        <p>
          The aim is borderless commerce on intelligent infrastructure, with real-time insight and 99.99% uptime, so
          businesses can grow with confidence.
        </p>
        <p>
          We listen, improve, and try to exceed what customers expect. Satisfaction is the priority.
        </p>
      </Prose>
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          ["19+", "Countries"],
          ["4,000k", "Feedback"],
          ["12+", "Branches"],
          ["65+", "Experts"],
        ].map(([value, label]) => (
          <div key={label} className="glass rounded-3xl p-5">
            <p className="text-3xl font-semibold">{value}</p>
            <p className="mt-1 text-sm text-muted">{label}</p>
          </div>
        ))}
      </div>
      <PointGrid
        items={[
          ["One platform", "Cards, UPI, netbanking, wallets, payouts, invoicing, and virtual accounts."],
          ["Security", "Enterprise-grade PCI-DSS compliance, risk controls, and fraud detection."],
          ["Canada first", "Interac, Visa, and Mastercard, with Canadian data residency."],
        ]}
      />
    </Article>
  );
}
