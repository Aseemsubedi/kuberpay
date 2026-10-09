import { PageIntro, SettingsForm } from "@/components/dashboard/widgets";

export const metadata = { title: "Settings" };

export default function SettingsPage() {
  return (
    <>
      <PageIntro title="Settings" text="Merchant profile for the prototype. Saving stays in this session." />
      <SettingsForm />
    </>
  );
}
