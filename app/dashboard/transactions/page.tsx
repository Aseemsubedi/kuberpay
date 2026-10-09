import { PageIntro, TransactionTable } from "@/components/dashboard/widgets";

export const metadata = { title: "Transactions" };

export default function TransactionsPage() {
  return (
    <>
      <PageIntro title="Transactions" text="Search the sample ledger by customer, method, or status." />
      <TransactionTable />
    </>
  );
}
