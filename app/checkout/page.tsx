import { CheckoutForm } from "@/components/checkout/form";
import { SiteFrame } from "@/components/site/frame";

export const metadata = { title: "Secure Payment" };

export default function CheckoutPage() {
  return (
    <SiteFrame>
      <div className="mx-auto max-w-5xl px-5 py-12">
        <CheckoutForm />
      </div>
    </SiteFrame>
  );
}
