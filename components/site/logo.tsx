import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-royal text-sm font-bold text-white shadow-[0_0_24px_rgba(47,123,255,0.65)]">
        K
      </span>
      <span className={cn("text-[15px] font-semibold tracking-tight", light ? "text-white" : "text-navy")}>
        Kuber Pays
      </span>
    </Link>
  );
}
