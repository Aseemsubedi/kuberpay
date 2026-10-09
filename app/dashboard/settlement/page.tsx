import { PageIntro, SettlementList } from "@/components/dashboard/widgets";

export const metadata = { title: "Settlement" };

export default function SettlementPage() {
  return (
    <>
      <PageIntro title="Settlement" text="Payout batches prepared for the demo bank account •••• 4418." />
      <SettlementList />
    </>
  );
}
