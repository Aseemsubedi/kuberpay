"use client";

import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Area,
  AreaChart,
} from "recharts";
import { apiKeys, customers, revenueSeries, settlements, transactions } from "@/lib/data";
import { money } from "@/lib/utils";
import { Badge, statusTone } from "@/components/ui/badge";

export function PageIntro({ title, text }: { title: string; text: string }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-1 text-sm text-muted">{text}</p>
    </div>
  );
}

export function StatGrid() {
  const cards = [
    ["Today's Revenue", "$12,450"],
    ["Total Transactions", "8,520"],
    ["Successful Payments", "98%"],
    ["Pending Settlements", "24"],
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map(([label, value]) => (
        <article key={label} className="rounded-2xl border border-line bg-white p-4">
          <p className="text-xs text-muted">{label}</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight">{value}</p>
        </article>
      ))}
    </div>
  );
}

export function RevenueChart() {
  return (
    <div className="h-64 rounded-2xl border border-line bg-white p-4">
      <p className="text-sm font-semibold">Revenue growth</p>
      <div className="mt-3 h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={revenueSeries}>
            <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} />
            <YAxis hide />
            <Tooltip formatter={(value) => money(Number(value))} />
            <Area dataKey="revenue" stroke="#0066ff" fill="#0066ff22" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function VolumeChart() {
  return (
    <div className="h-64 rounded-2xl border border-line bg-white p-4">
      <p className="text-sm font-semibold">Payment volume</p>
      <div className="mt-3 h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={revenueSeries}>
            <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} />
            <YAxis hide />
            <Tooltip />
            <Bar dataKey="volume" fill="#071a3d" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function TransactionTable({ limit }: { limit?: number }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const rows = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesQuery = `${tx.id} ${tx.customer} ${tx.method}`.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = status === "All" || tx.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [query, status]);
  const visible = typeof limit === "number" ? rows.slice(0, limit) : rows;

  return (
    <div className="rounded-2xl border border-line bg-white">
      {typeof limit !== "number" ? (
        <div className="flex flex-col gap-3 border-b border-line p-4 sm:flex-row">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search id, customer, method"
            className="w-full rounded-xl border border-line px-3 py-2 text-sm outline-none focus:border-royal"
          />
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="rounded-xl border border-line px-3 py-2 text-sm"
          >
            {["All", "Success", "Pending", "Failed", "Refunded"].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
      ) : null}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-muted">
            <tr>
              {["Transaction ID", "Customer", "Amount", "Payment Method", "Status", "Date"].map((heading) => (
                <th key={heading} className="px-4 py-3 font-medium">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map((tx) => (
              <tr key={tx.id} className="border-t border-line">
                <td className="px-4 py-3 font-medium">{tx.id}</td>
                <td className="px-4 py-3">
                  {tx.customer}
                  <span className="block text-xs text-muted">{tx.email}</span>
                </td>
                <td className="px-4 py-3">{money(tx.amount)}</td>
                <td className="px-4 py-3">{tx.method}</td>
                <td className="px-4 py-3">
                  <Badge tone={statusTone(tx.status)}>{tx.status}</Badge>
                </td>
                <td className="px-4 py-3 text-muted">{tx.date}</td>
              </tr>
            ))}
            {visible.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted">
                  No transactions match that filter.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function CustomerGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {customers.map((customer) => (
        <article key={customer.name} className="rounded-2xl border border-line bg-white p-5">
          <h2 className="font-semibold">{customer.name}</h2>
          <p className="text-sm text-muted">{customer.contact}</p>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="text-muted">Volume</dt>
              <dd className="font-semibold">{money(customer.volume)}</dd>
            </div>
            <div>
              <dt className="text-muted">Transactions</dt>
              <dd className="font-semibold">{customer.txns}</dd>
            </div>
          </dl>
          <p className="mt-3 text-xs text-muted">Customer since {customer.since}</p>
        </article>
      ))}
    </div>
  );
}

export function SettlementList() {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white">
      {settlements.map((item) => (
        <div key={item.id} className="flex items-center justify-between gap-4 border-b border-line px-4 py-4 last:border-b-0">
          <div>
            <p className="font-medium">{item.id}</p>
            <p className="text-xs text-muted">{item.date} · {item.account}</p>
          </div>
          <div className="text-right">
            <p className="font-semibold">{money(item.amount)}</p>
            <Badge tone={statusTone(item.status)}>{item.status}</Badge>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ApiKeyList() {
  const [revealed, setRevealed] = useState<string | null>(null);
  const [notice, setNotice] = useState("");

  return (
    <div className="space-y-3">
      {apiKeys.map((key) => {
        const hidden = revealed !== key.name;
        const shown = hidden ? `${key.value.slice(0, 10)}••••••••` : key.value;
        return (
          <article key={key.name} className="rounded-2xl border border-line bg-white p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-medium">{key.name}</p>
                <p className="font-mono text-sm text-muted">{shown}</p>
                <p className="mt-1 text-xs text-muted">{key.hint}</p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="rounded-full border border-line px-3 py-1.5 text-xs font-semibold"
                  onClick={() => setRevealed(hidden ? key.name : null)}
                >
                  {hidden ? "Reveal" : "Hide"}
                </button>
                <button
                  type="button"
                  className="rounded-full bg-navy px-3 py-1.5 text-xs font-semibold text-white"
                  onClick={async () => {
                    await navigator.clipboard.writeText(key.value);
                    setNotice(`${key.name} copied. It is a demo value.`);
                  }}
                >
                  Copy
                </button>
              </div>
            </div>
          </article>
        );
      })}
      {notice ? <p className="text-sm text-mint">{notice}</p> : null}
    </div>
  );
}

export function SettingsForm() {
  const [saved, setSaved] = useState(false);
  return (
    <form
      className="max-w-xl space-y-4 rounded-2xl border border-line bg-white p-5"
      onSubmit={(event) => {
        event.preventDefault();
        setSaved(true);
      }}
    >
      <label className="block text-sm">
        Business name
        <input defaultValue="Northline Studio" className="mt-1 w-full rounded-xl border border-line px-3 py-2" />
      </label>
      <label className="block text-sm">
        Support email
        <input defaultValue="finance@northline.io" className="mt-1 w-full rounded-xl border border-line px-3 py-2" />
      </label>
      <label className="block text-sm">
        Settlement currency
        <select defaultValue="USD" className="mt-1 w-full rounded-xl border border-line px-3 py-2">
          <option>USD</option>
          <option>NPR</option>
          <option>EUR</option>
        </select>
      </label>
      <label className="block text-sm">
        Webhook URL
        <input defaultValue="https://northline.io/webhooks/kuber" className="mt-1 w-full rounded-xl border border-line px-3 py-2" />
      </label>
      <button type="submit" className="rounded-full bg-royal px-4 py-2 text-sm font-semibold text-white">
        Save demo settings
      </button>
      {saved ? <p className="text-sm text-mint">Saved in this browser session only.</p> : null}
    </form>
  );
}
