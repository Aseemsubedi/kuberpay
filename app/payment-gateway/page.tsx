import { Article, PointGrid, Prose } from "@/components/site/article";

export const metadata = { title: "Payment Gateway" };

export default function PaymentGatewayPage() {
  return (
    <Article
      eyebrow="Products"
      title="The one-stop solution for accepting payments online"
      text="A payment gateway authorizes payments for online merchants. It processes and authorizes the transaction between a customer and a merchant."
    >
      <Prose>
        <p>
          Payment gateways encrypt sensitive information, such as card numbers, so payment details move securely between
          the customer and the merchant.
        </p>
      </Prose>
      <PointGrid
        items={[
          ["Widest range of options", "Debit and credit cards, net banking, mobile wallets, UPI, and EMI."],
          ["Reporting", "Comprehensive MIS reporting and insights on a live dashboard."],
          ["Secure payments", "PCI DSS Level 1 compliance, with encryption around every transaction."],
          ["Every channel", "Accept payments across online stores, mobile apps, and in-store terminals."],
          ["Fraud controls", "Advanced fraud detection, tokenization, and end-to-end encryption."],
          ["One view", "Track payments with analytics, reports, and real-time insight across touchpoints."],
        ]}
      />
    </Article>
  );
}
