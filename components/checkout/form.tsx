"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Lock } from "lucide-react";

export function CheckoutForm() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const card = String(data.get("card") ?? "").replace(/\s/g, "");
    const expiry = String(data.get("expiry") ?? "");
    const cvv = String(data.get("cvv") ?? "");
    if (card.length < 12 || !expiry.includes("/") || cvv.length < 3) {
      setError("Use a sample card shape: 16 digits, MM/YY, and a 3-digit CVV. Nothing is sent.");
      return;
    }
    setError("");
    setName(String(data.get("name") ?? "Customer"));
    setOpen(true);
    event.currentTarget.reset();
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
      <aside className="glass rounded-3xl p-6">
        <p className="text-xs uppercase tracking-[0.16em] text-royal">Invoice NL-1042</p>
        <h2 className="mt-3 text-2xl font-semibold">Northline Studio</h2>
        <p className="mt-2 text-sm text-muted">Brand workshop deposit, paid through the Kuber Pays checkout demo.</p>
        <p className="mt-8 text-4xl font-semibold tracking-tight">$250.00</p>
        <p className="mt-6 text-xs leading-5 text-muted">
          This screen imitates a customer payment page. Submitting it only opens a success state on this device.
        </p>
      </aside>
      <form onSubmit={submit} className="glass rounded-3xl p-6">
        <div className="flex items-center gap-2 text-royal">
          <Lock size={16} />
          <h1 className="text-lg font-semibold text-navy">Secure Payment</h1>
        </div>
        <p className="mt-2 text-sm text-muted">Do not enter a real card. These fields never leave the browser.</p>
        <div className="mt-5 grid gap-4">
          <Field label="Customer Name" name="name" placeholder="John Smith" />
          <Field label="Email" name="email" type="email" placeholder="john@northline.io" />
          <Field label="Card Number" name="card" placeholder="4242 4242 4242 4242" inputMode="numeric" />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Expiry" name="expiry" placeholder="MM/YY" />
            <Field label="CVV" name="cvv" placeholder="123" inputMode="numeric" />
          </div>
        </div>
        {error ? <p className="mt-3 text-sm text-rose-700">{error}</p> : null}
        <button type="submit" className="mt-6 w-full rounded-full bg-royal py-3 text-sm font-semibold text-white">
          Pay Securely
        </button>
      </form>
      {open ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-navy/70 px-5">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 text-center">
            <p className="text-sm font-semibold text-mint">Payment Successful</p>
            <h2 className="mt-2 text-2xl font-semibold">Thanks{name ? `, ${name}` : ""}</h2>
            <p className="mt-3 text-sm text-muted">Transaction ID</p>
            <p className="font-mono text-lg font-semibold">KP20261008992</p>
            <p className="mt-2 text-sm text-muted">$250.00 · Simulated</p>
            <div className="mt-6 flex justify-center gap-3">
              <button type="button" className="rounded-full border border-line px-4 py-2 text-sm" onClick={() => setOpen(false)}>
                Close
              </button>
              <Link href="/dashboard/transactions" className="rounded-full bg-navy px-4 py-2 text-sm font-semibold text-white">
                View transactions
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Field({
  label,
  name,
  placeholder,
  type = "text",
  inputMode,
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  inputMode?: "numeric" | "text" | "email";
}) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <input
        required
        name={name}
        type={type}
        inputMode={inputMode}
        placeholder={placeholder}
        autoComplete="off"
        className="mt-1 w-full rounded-xl border border-line bg-[#f5f7fb] px-3 py-2.5 font-normal outline-none focus:border-royal"
      />
    </label>
  );
}
