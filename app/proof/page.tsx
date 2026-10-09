import { Article } from "@/components/site/article";
import { PaymentProof } from "@/components/proof/payment-proof";
import { transactions } from "@/lib/data";
import { money } from "@/lib/utils";

const payment = transactions.find((item) => item.id === "KP10021");

export const metadata = { title: "Payment Proof" };

export default function ProofPage() {
  if (!payment) {
    return (
      <Article eyebrow="For the business" title="Payment check" text="The sample payment is not available in this build.">
        <p className="text-sm text-muted">Payment KP10021 could not be read from the sample list.</p>
      </Article>
    );
  }

  return (
    <Article
      eyebrow="For the business"
      title="Customers can check a payment themselves"
      text="Today someone calls us to ask if a payment arrived. This adds a public Yes or No for the payment number."
    >
      <div className="mx-auto max-w-3xl">
        <p className="text-center text-sm text-muted">One example, already done</p>
        <p className="mt-2 text-center text-2xl font-semibold text-navy">
          {payment.customer} · {money(payment.amount)} · {payment.id}
        </p>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          <li className="glass rounded-3xl p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-royal">1. Customer</p>
            <p className="mt-3 text-lg font-semibold text-navy">Pays</p>
            <p className="mt-2 text-sm leading-6 text-muted">
              {payment.customer} pays {money(payment.amount)}. The payment number is {payment.id}.
            </p>
          </li>
          <li className="glass rounded-3xl p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-royal">2. Kuber</p>
            <p className="mt-3 text-lg font-semibold text-navy">Saves it once</p>
            <p className="mt-2 text-sm leading-6 text-muted">After the money arrives, we save that number. We do not save it again.</p>
          </li>
          <li className="glass rounded-3xl p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-royal">3. Anyone</p>
            <p className="mt-3 text-lg font-semibold text-navy">Checks</p>
            <p className="mt-2 text-sm leading-6 text-muted">
              The customer, a manager, or an auditor types {payment.id} and sees Yes. No phone call.
            </p>
          </li>
        </ol>
        <div className="mt-10">
          <PaymentProof payment={payment} />
        </div>
      </div>
    </Article>
  );
}
