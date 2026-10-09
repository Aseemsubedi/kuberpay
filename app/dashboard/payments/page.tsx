import { PageIntro, TransactionTable } from "@/components/dashboard/widgets";

export const metadata = { title: "Payments" };

export default function PaymentsPage() {
  return (
    <>
      <PageIntro title="Payments" text="Successful and in-flight payments for the demo merchant." />
      <TransactionTable />
    </>
  );
}
