import Link from "next/link";

export function Hero() {
  return (
    <section className="mesh relative overflow-hidden">
      <div className="relative mx-auto grid max-w-6xl items-center gap-6 px-5 pb-8 pt-14 lg:min-h-[560px] lg:grid-cols-[0.92fr_1.08fr] lg:pt-16">
        <div className="max-w-xl">
          <p className="rise inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 text-xs font-semibold text-navy">
            <ContactlessBadge />
            Now accepting contactless
          </p>
          <h1 className="rise rise-2 mt-5 text-[42px] font-semibold leading-[0.98] tracking-[-0.045em] text-navy sm:text-[60px]">
            <span className="block">Powering payments</span>
            <span className="grad-text block">in Canada</span>
          </h1>
          <p className="rise rise-3 mt-5 max-w-md text-[15px] leading-7 text-muted">
            From start-ups to large enterprises and everything in between, we’ve got the end-to-end commerce solutions,
            data-driven insights, and expert local support businesses of all sizes count on.
          </p>
          <div className="rise rise-3 mt-8 flex flex-wrap gap-3">
            <Link href="/solution-and-features" className="grad-btn pay-glow inline-flex rounded-full bg-royal px-6 py-3 text-sm font-semibold text-white">
              Explore solutions
            </Link>
            <Link href="#ledger" className="inline-flex rounded-full border border-line bg-white px-6 py-3 text-sm font-semibold text-navy">
              See the ledger
            </Link>
          </div>
          <ul className="mt-8 flex flex-wrap gap-2">
            {["Interac", "Visa", "Mastercard", "Bank transfer"].map((rail) => (
              <li key={rail} className="rounded-full border border-line bg-white/80 px-3 py-1 text-xs font-semibold text-navy">
                {rail}
              </li>
            ))}
          </ul>
        </div>
        <CardStage />
      </div>
    </section>
  );
}

function ContactlessBadge() {
  return (
    <span className="grid h-5 w-5 place-items-center rounded-md border border-line text-royal">
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <path
          d="M8 7c3.2 2.2 3.2 7.8 0 10M12 5c4.6 3.2 4.6 10.8 0 14M16 3c6 4.2 6 13.8 0 18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

function CardStage() {
  return (
    <div id="card-stage" className="relative mx-auto h-[320px] w-full max-w-[640px] [perspective:1100px] sm:h-[420px] lg:h-[500px]" aria-hidden="true">
      <svg viewBox="0 0 640 280" className="absolute bottom-0 left-0 w-[112%] max-w-none">
        <defs>
          <linearGradient id="metal-side" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f4f6f8" />
            <stop offset="0.45" stopColor="#b7bec7" />
            <stop offset="1" stopColor="#8d959e" />
          </linearGradient>
          <linearGradient id="metal-top" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#fbfcfd" />
            <stop offset="0.5" stopColor="#d5dbe2" />
            <stop offset="1" stopColor="#eef1f4" />
          </linearGradient>
          <pattern id="brush" width="4" height="4" patternUnits="userSpaceOnUse">
            <rect width="4" height="4" fill="#e6ebf0" />
            <rect width="4" height="1" fill="#ffffff" opacity="0.8" />
            <rect y="2" width="4" height="1" fill="#9aa3ad" opacity="0.28" />
          </pattern>
        </defs>
        <polygon points="48,188 620,146 620,214 48,256" fill="url(#metal-side)" />
        <polygon points="48,188 620,146 690,96 118,138" fill="url(#brush)" />
        <polygon points="48,188 620,146 620,154 48,196" fill="#ffffff" opacity="0.65" />
        <polygon points="58,232 610,192 620,200 68,240" fill="#0066ff" opacity="0.5" />
      </svg>

      <div className="float-card absolute inset-0">
        <div className="absolute right-[0%] bottom-[196px] z-10 w-[200px] sm:w-[240px]">
          <Card tone="ink" className="origin-bottom -rotate-x-[14deg] -rotate-z-[6deg]" />
        </div>
        <div className="absolute bottom-[108px] left-[2%] z-20 w-[220px] sm:w-[268px]">
          <Card tone="blue" className="origin-bottom -rotate-x-[12deg] rotate-z-[3deg]" />
        </div>
      </div>
    </div>
  );
}

function Card({ tone, className }: { tone: "ink" | "blue"; className: string }) {
  const face =
    tone === "ink"
      ? "bg-[linear-gradient(160deg,#2a2d33_0%,#111214_42%,#050506_100%)]"
      : "bg-[linear-gradient(165deg,#2f7bff_0%,#0057f5_46%,#003ec4_100%)]";

  return (
    <div className={`${className} [transform-style:preserve-3d]`}>
      <div className="absolute inset-x-3 -bottom-2 h-4 rounded-b-[16px] bg-black/40 blur-[1px]" />
      <div className={`relative aspect-[1.62/1] rounded-[18px] ${face} p-5 text-white shadow-[0_24px_30px_rgba(0,0,0,0.22)]`}>
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-[13px] font-bold text-navy">K</span>
          <span className="text-sm font-semibold tracking-tight">Kuber Pays</span>
        </div>
        {tone === "blue" ? (
          <div className="absolute bottom-5 left-5 flex items-center gap-3">
            <span className="relative h-8 w-11 overflow-hidden rounded-[4px] bg-[linear-gradient(135deg,#f3e2a8,#c6a15a_45%,#f8efcf_70%,#a8843d)]">
              <span className="absolute inset-x-1 top-1 h-px bg-black/20" />
              <span className="absolute inset-x-1 top-3 h-px bg-black/20" />
              <span className="absolute inset-y-1 left-4 w-px bg-black/25" />
            </span>
            <svg viewBox="0 0 24 24" className="h-6 w-6 text-white/90">
              <path
                d="M7 8c2.4 1.8 2.4 6.2 0 8M11.5 6c3.4 2.6 3.4 9.4 0 12M16 4c4.4 3.4 4.4 12.6 0 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </div>
        ) : null}
      </div>
    </div>
  );
}
