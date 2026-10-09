import Link from "next/link";
import { featureNotes, products } from "@/lib/content";
import { Reveal } from "@/components/site/reveal";

const pillars = [
  ["Secure payments", "PCI DSS Level 1 compliant"],
  ["Multi-channel support", "Online, in-store, and mobile"],
  ["Powerful dashboard", "Real-time analytics"],
];

const infrastructure = [
  "Secure Transactions",
  "Instant Processing",
  "Real-Time Analytics",
  "Multiple Payment Methods",
  "Advanced Fraud Protection",
  "Global Payment Support",
];

const industries = [
  ["Accept all payment modes", "Support domestic and international cards, card-based and cardless EMIs, and netbanking from 58 banks."],
  ["All-in-one dashboard", "Reports on payments, settlements, refunds, and more, so finance can decide with the same numbers."],
  ["Robust security", "PCI-DSS Level 1 compliance, regular third-party audits, and a dedicated internal security team."],
  ["Multi-channel processing", "Process payments in-store, online, and on mobile, with room to scale as volume grows."],
  ["Built for developers", "Clean APIs, plugins, and libraries across major platforms and languages."],
];

const stats = [
  ["19+", "Trusted by Countries"],
  ["4,000k", "Feedback"],
  ["12+", "Branches"],
  ["65+", "Experts"],
];

export function HomeSections() {
  return (
    <>
      <section>
        <div className="mx-auto max-w-6xl px-5 pb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-royal">Products</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">One stack for taking, sending, and reconciling money</h2>
        </div>
        <div className="mx-auto grid max-w-6xl gap-4 px-5 pb-16 md:grid-cols-2">
          {products.map((product) => (
            <Link key={product.href} href={product.href} className="glass rounded-3xl p-6 transition duration-300 hover:-translate-y-1">
              <h2 className="text-lg font-semibold">{product.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">{product.text}</p>
              <p className="mt-4 text-sm font-semibold text-royal">View product</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-royal">Kuber Pays</p>
          <h2 className="mt-2 max-w-xl text-3xl font-semibold tracking-tight">Smarter payments, trusted by thousands</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
            At Kuber Pays, we empower your business with secure, fast, and seamless payment solutions. Whether you are
            scaling up or just starting out, the platform is designed to support your growth.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {pillars.map(([title, text], index) => (
              <Reveal key={title} delay={index * 0.08}>
              <article className="glass rounded-3xl p-5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(47,123,255,0.12)]">
                <h3 className="text-sm font-semibold uppercase tracking-wide">{title}</h3>
                <p className="mt-2 text-sm text-muted">{text}</p>
              </article>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-sm text-muted">
            Join thousands of businesses using Kuber Pays to simplify payments.{" "}
            <Link href="/company" className="font-semibold text-royal">
              Learn more about us
            </Link>
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">Powerful payment infrastructure</h2>
          <p className="mt-4 text-sm leading-7 text-muted">
            Build, scale, and optimize your payment experience with secure, high-performance infrastructure. Designed
            for modern businesses, the platform keeps transactions moving, insights current, and reach global.
          </p>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {infrastructure.map((item) => (
            <li key={item} className="glass rounded-2xl px-4 py-3 text-sm font-medium transition duration-300 hover:-translate-y-0.5">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="text-3xl font-semibold tracking-tight">Why choose our services?</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
            Discover the features that make the platform efficient, secure, and user-friendly.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {Object.entries(featureNotes).map(([slug, note]) => (
              <Link key={slug} href={`/info/${slug}`} className="glass rounded-3xl p-6 transition duration-300 hover:-translate-y-1 hover:border-royal/40">
                <h3 className="text-lg font-semibold">{note.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{note.summary}</p>
                <p className="mt-4 text-sm font-semibold text-royal">Learn more</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mesh relative overflow-hidden border-y border-line">
        <div className="relative mx-auto max-w-6xl px-5 py-16">
          <h2 className="text-3xl font-semibold tracking-tight">We always strive for excellence</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
            Our commitment to quality and customer satisfaction drives us to deliver the best solutions for businesses
            worldwide.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map(([value, label]) => (
              <div key={label}>
                <p className="grad-text text-4xl font-semibold tracking-tight">{value}</p>
                <p className="mt-1 text-sm text-muted">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-16 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">Understanding our clients</h2>
          <p className="mt-4 text-sm leading-7 text-muted">
            We recognize the unique needs of our clients, delivering payment solutions that streamline complex
            transactions. Staying ahead of the payments landscape gives those clients a competitive advantage.
          </p>
          <p className="mt-4 text-sm leading-7 text-muted">
            Backed by strong security and straightforward technology, the platform is built to keep operations efficient.
          </p>
          <Link href="/solutions" className="mt-6 inline-flex rounded-full bg-royal px-4 py-2 text-sm font-semibold text-white">
            Explore our approach
          </Link>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-royal">Industries we empower</p>
          <h3 className="mt-2 text-2xl font-semibold">Future-ready payment solutions for every sector</h3>
          <p className="mt-3 text-sm leading-7 text-muted">
            Kuber Pays provides payment infrastructure that adapts to an industry’s needs: secure, scalable, and
            globally connected.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto grid max-w-6xl gap-4 px-5 py-16 md:grid-cols-2">
          {industries.map(([title, text]) => (
            <article key={title} className="glass rounded-3xl p-6 transition duration-300 hover:-translate-y-1">
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-5 pb-16">
        <div className="mesh relative mx-auto max-w-6xl overflow-hidden rounded-[32px] border border-line px-8 py-12">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-royal">Get started</p>
          <h2 className="mt-2 max-w-xl text-3xl font-semibold tracking-tight">
            Ready when your next payment is
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-7 text-muted">
            Open a demo account or talk through gateway, invoicing, and virtual accounts with the Canadian team.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/get-started" className="grad-btn pay-glow inline-flex rounded-full bg-royal px-5 py-2.5 text-sm font-semibold text-white">
              Create your account
            </Link>
            <Link href="/contact" className="inline-flex rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold text-navy">
              Contact sales
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
