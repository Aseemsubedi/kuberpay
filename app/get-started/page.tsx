import { DemoForm } from "@/components/site/demo-form";
import { SiteFrame } from "@/components/site/frame";

export const metadata = { title: "Get Started" };

export default function GetStartedPage() {
  return (
    <SiteFrame>
      <div className="px-5 py-16">
        <DemoForm
          title="Create a merchant account"
          text="This opens the sample merchant workspace. No application is filed and no account is created."
          submitLabel="Open sample account"
          destination="/dashboard"
          fields={[
            { name: "business", label: "Business name", placeholder: "Northline Studio" },
            { name: "email", label: "Work email", type: "email", placeholder: "finance@northline.io" },
            { name: "country", label: "Country", placeholder: "Nepal" },
          ]}
        />
      </div>
    </SiteFrame>
  );
}
