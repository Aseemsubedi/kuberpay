import { ApiKeyList, PageIntro } from "@/components/dashboard/widgets";

export const metadata = { title: "API Keys" };

export default function ApiKeysPage() {
  return (
    <>
      <PageIntro title="API Keys" text="Sample keys for the developer story. They do not authenticate against a live API." />
      <ApiKeyList />
    </>
  );
}
