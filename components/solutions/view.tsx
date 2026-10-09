"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Cloud, Code2, Lock, MessageSquare, Shield, Smartphone, Workflow, Zap } from "lucide-react";

const features = [
  {
    icon: Workflow,
    title: "Seamless Automation",
    text: "Streamline your workflows with advanced automation tools designed to save time and reduce manual effort.",
  },
  {
    icon: MessageSquare,
    title: "Collaboration Made Easy",
    text: "Empower your team with real-time communication, shared dashboards, and better decision-making tools.",
  },
  {
    icon: Shield,
    title: "Enterprise-Grade Security",
    text: "Protect your business data with multi-layer encryption, access controls, and compliance standards.",
  },
  {
    icon: Zap,
    title: "Data-Driven Insights",
    text: "Gain powerful insights with interactive reports and AI-powered analytics for smarter strategies.",
  },
  {
    icon: Code2,
    title: "Developer Friendly",
    text: "Clean APIs, SDKs, and integrations for rapid customization and scalability.",
  },
  {
    icon: Smartphone,
    title: "Mobile Optimized",
    text: "Access your business insights on the go with our responsive mobile-first design.",
  },
  {
    icon: Cloud,
    title: "Cloud Powered",
    text: "Secure cloud infrastructure ensures uptime, scalability, and performance.",
  },
  {
    icon: Lock,
    title: "Dedicated Support",
    text: "Our team is available 24/7 to help you succeed at every step of your journey.",
  },
];

export function SolutionsView() {
  const track = useRef<HTMLDivElement>(null);

  function scrollBy(distance: number) {
    track.current?.scrollBy({ left: distance, behavior: "smooth" });
  }

  return (
    <>
      <section>
        <div className="mx-auto max-w-6xl px-5 py-16">
          <div className="flex items-end justify-between gap-6">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Why Choose <span className="text-royal">Kuber ERP</span>?
              </h1>
              <p className="mt-4 text-sm leading-7 text-muted">
                We always strive to understand our customers&apos; expectations and exceed them. By listening,
                innovating, and improving, we ensure seamless experiences and reliable solutions. Your satisfaction is
                our priority.
              </p>
            </div>
            <div className="hidden gap-2 sm:flex">
              <button
                type="button"
                aria-label="Previous features"
                onClick={() => scrollBy(-320)}
                className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                aria-label="Next features"
                onClick={() => scrollBy(320)}
                className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
          <div ref={track} className="mt-8 flex snap-x gap-4 overflow-x-auto pb-2">
            {features.map((feature, index) => (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="glass w-[280px] shrink-0 snap-start rounded-3xl p-6 transition duration-300 hover:-translate-y-1"
              >
                <feature.icon className="text-royal" size={22} />
                <h2 className="mt-4 text-lg font-semibold">{feature.title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted">{feature.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Join 493+ Businesses Today!</h2>
            <p className="mt-4 text-sm leading-7 text-muted">
              Scale faster with <span className="font-semibold text-navy">Kuber Pays</span>. Unlock secure, seamless,
              and smart payment solutions designed for modern businesses.
            </p>
            <ul className="mt-6 space-y-3 text-sm font-medium">
              <li>Instant Account Setup</li>
              <li>Boost Your Transactions</li>
              <li>Enterprise-Grade Security</li>
            </ul>
            <Link href="/get-started" className="mt-8 inline-flex rounded-full bg-royal px-5 py-3 text-sm font-semibold text-white">
              Create Your Account
            </Link>
          </div>
          <div className="glass rounded-3xl p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-royal">Kuber Pays</p>
            <p className="mt-3 text-2xl font-semibold tracking-tight">Secure, seamless, and smart payments.</p>
            <p className="mt-3 text-sm leading-6 text-muted">
              The same platform behind the gateway, invoicing, virtual accounts, and white-label checkout.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
