import { Article } from "@/components/site/article";
import { PaymentProof } from "@/components/proof/payment-proof";
import { transactions } from "@/lib/data";
import { money } from "@/lib/utils";

const payment = transactions.find((item) => item.id === "KP10021");

export const metadata = { title: "Payment Proof" };

const ideas = [
  ["The payment already happened", "Kuber already collected the money. This page does not charge the card again."],
  ["We save the number once", "After the money arrives, we write the payment number on a public record."],
  ["Anyone can check it", "A customer, a manager, or an auditor types the number and sees Yes or No. No phone call."],
];

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
      title="Anyone can check a payment number"
      text="After the money arrives, we save that number once. Anyone can type it and see Yes or No. The record does not hold the customer's money."
    >
      <div className="mx-auto max-w-5xl">
        <p className="text-center text-sm font-semibold uppercase tracking-[0.16em] text-royal">What we are showing</p>
        <p className="mx-auto mt-3 max-w-2xl text-center text-lg leading-8 text-navy">
          {payment.customer} paid {money(payment.amount)}. The number is {payment.id}. That number is already saved, so Check says Yes.
        </p>

        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {ideas.map(([title, text], index) => (
            <li key={title} className="glass rounded-3xl p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-royal">{index + 1}</p>
              <p className="mt-3 text-lg font-semibold text-navy">{title}</p>
              <p className="mt-2 text-sm leading-6 text-muted">{text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10">
          <PaymentProof payment={payment} />
        </div>
      </div>
    </Article>
  );
}
