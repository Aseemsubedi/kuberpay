"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { revenueSeries, transactions } from "@/lib/data";
import { Badge, statusTone } from "@/components/ui/badge";

function cad(value: number) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);
}

export function Ledger() {
  const latest = revenueSeries[revenueSeries.length - 1];
  const previous = revenueSeries[revenueSeries.length - 2];
  const change = ((latest.revenue - previous.revenue) / previous.revenue) * 100;

  return (
    <section id="ledger" className="mx-auto max-w-6xl scroll-mt-28 px-5 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-royal">Live ledger</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">Payments your finance team can read</h2>
        </div>
        <p className="max-w-sm text-sm leading-6 text-muted">
          October volume, authorization, and the latest payments. These figures are sample data in this prototype.
        </p>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <article className="grad-frame rounded-3xl p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-muted">October volume</p>
              <p className="mt-1 text-4xl font-semibold tracking-tight">{cad(latest.revenue)}</p>
              <p className="mt-2 text-sm font-medium text-mint">+{change.toFixed(1)}% vs {previous.month}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted">Payments</p>
              <p className="mt-1 text-2xl font-semibold tracking-tight">{latest.volume.toLocaleString("en-CA")}</p>
              <p className="mt-2 text-sm text-muted">98% successful</p>
            </div>
          </div>
          <div className="mt-6 h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueSeries}>
                <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} stroke="#5c6d88" />
                <Tooltip
                  formatter={(value) => cad(Number(value))}
                  contentStyle={{ borderRadius: 12, borderColor: "#e4ebf5", fontSize: 13 }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#2f7bff" fill="#2f7bff22" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="glass rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Recent payments</h3>
            <p className="text-xs text-muted">CAD</p>
          </div>
          <ul className="mt-2 divide-y divide-line">
            {transactions.slice(0, 6).map((tx) => (
              <li key={tx.id} className="flex items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{tx.customer}</p>
                  <p className="text-xs text-muted">
                    {tx.id} · {tx.method} · {tx.date}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-sm font-semibold">{cad(tx.amount)}</p>
                  <Badge tone={statusTone(tx.status)}>{tx.status}</Badge>
                </div>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
