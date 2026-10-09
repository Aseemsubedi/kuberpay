import { DemoForm } from "@/components/site/demo-form";
import { SiteFrame } from "@/components/site/frame";

export const metadata = { title: "Login" };

export default function LoginPage() {
  return (
    <SiteFrame>
      <div className="px-5 py-16">
        <DemoForm
          title="Merchant login"
          text="Any email and password open the sample dashboard. This is not an account system."
          submitLabel="Enter dashboard"
          destination="/dashboard"
          fields={[
            { name: "email", label: "Email", type: "email", placeholder: "finance@northline.io" },
            { name: "password", label: "Password", type: "password", placeholder: "demo-password" },
          ]}
        />
      </div>
    </SiteFrame>
  );
}
