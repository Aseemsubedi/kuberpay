import { PageIntro, RevenueChart, StatGrid, TransactionTable, VolumeChart } from "@/components/dashboard/widgets";

export const metadata = { title: "Dashboard" };

export default function DashboardPage() {
  return (
    <>
      <PageIntro title="Dashboard" text="Today across the sample merchant account. Figures are not live." />
      <StatGrid />
      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        <RevenueChart />
        <VolumeChart />
      </div>
      <div className="mt-4">
        <TransactionTable limit={6} />
      </div>
    </>
  );
}
