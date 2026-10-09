import { CustomerGrid, PageIntro } from "@/components/dashboard/widgets";

export const metadata = { title: "Customers" };

export default function CustomersPage() {
  return (
    <>
      <PageIntro title="Customers" text="Businesses paying through the sample gateway." />
      <CustomerGrid />
    </>
  );
}
