"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { revenueSeries, transactions } from "@/lib/data";
import { money } from "@/lib/utils";
import { Badge, statusTone } from "@/components/ui/badge";

export function AnalyticsPreview() {
  return (
    <section className="bg-[#eef3f9]">
      <div className="mx-auto grid max-w-6xl gap-6 px-5 py-20 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-royal">Analytics</p>
          <h2 className="mt-2 text-2xl font-semibold">Payment trends your finance team can read</h2>
          <p className="mt-2 text-sm text-muted">Revenue reports, volume, and a recent transaction history. Figures are sample data.</p>
          <div className="mt-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueSeries}>
                <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis hide />
                <Tooltip formatter={(value) => money(Number(value))} />
                <Area type="monotone" dataKey="revenue" stroke="#0066ff" fill="#0066ff22" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h3 className="font-semibold">Recent transactions</h3>
          <div className="mt-4 divide-y divide-line">
            {transactions.slice(0, 5).map((tx) => (
              <div key={tx.id} className="flex items-center justify-between gap-3 py-3">
                <div>
                  <p className="text-sm font-medium">{tx.customer}</p>
                  <p className="text-xs text-muted">{tx.id} · {tx.method}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">{money(tx.amount)}</p>
                  <Badge tone={statusTone(tx.status)}>{tx.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
