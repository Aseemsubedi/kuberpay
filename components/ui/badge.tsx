import { cn } from "@/lib/utils";

const tones = {
  success: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  pending: "bg-amber-50 text-amber-800 ring-amber-100",
  failed: "bg-rose-50 text-rose-700 ring-rose-100",
  neutral: "bg-slate-100 text-slate-600 ring-slate-200",
  info: "bg-blue-50 text-royal ring-blue-100",
};

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: keyof typeof tones;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function statusTone(status: string) {
  if (status === "Success" || status === "Paid" || status === "Active") return "success" as const;
  if (status === "Pending" || status === "Processing") return "pending" as const;
  if (status === "Failed") return "failed" as const;
  return "neutral" as const;
}
