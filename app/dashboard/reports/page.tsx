import { PageIntro, RevenueChart, VolumeChart } from "@/components/dashboard/widgets";

export const metadata = { title: "Reports" };

export default function ReportsPage() {
  return (
    <>
      <PageIntro title="Reports" text="Revenue and payment volume for May through October 2026. Sample series." />
      <div className="grid gap-4 xl:grid-cols-2">
        <RevenueChart />
        <VolumeChart />
      </div>
    </>
  );
}
