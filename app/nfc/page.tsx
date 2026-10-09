import { Article, PointGrid, Prose } from "@/components/site/article";

export const metadata = { title: "NFC Solution" };

export default function NfcPage() {
  return (
    <Article
      eyebrow="Solutions"
      title="Accept contactless payments, securely and instantly"
      text="Use a compatible smartphone or terminal. Setup is fast, security is enterprise-grade, and reconciliation stays in the same ledger."
    >
      <PointGrid
        items={[
          ["Phone as the point of sale", "Turn a compatible smartphone into a secure point of sale, without an extra terminal."],
          ["Tokenized cards", "EMV contactless flows and tokenized card storage keep data protected."],
          ["Offline capture", "Capture offline, then retry and reconcile when the connection returns."],
          ["Fast rollout", "Enable devices and staff in minutes with role-based access and device binding."],
        ]}
      />
      <h2 className="mt-10 text-xl font-semibold">How a tap completes</h2>
      <ol className="mt-4 max-w-2xl list-decimal space-y-2 pl-5 text-sm leading-7 text-muted">
        <li>The merchant enters the amount in the mobile app.</li>
        <li>An NFC-enabled debit or credit card is tapped on the merchant’s phone.</li>
        <li>EMV transaction data is captured and sent to the acquirer.</li>
        <li>Merchant and customer get instant confirmation.</li>
      </ol>
      <Prose>
        <p className="mt-6">Shorter queues, and a checkout people are more willing to finish.</p>
      </Prose>
    </Article>
  );
}
