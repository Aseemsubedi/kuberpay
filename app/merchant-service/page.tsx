import Link from "next/link";
import { Article, Prose } from "@/components/site/article";

export const metadata = { title: "Merchant Service Reseller" };

export default function MerchantServicePage() {
  return (
    <Article
      eyebrow="Solutions"
      title="Partner with Kuber Pays and grow recurring revenue"
      text="Deliver secure payment solutions to your clients, and earn as those merchants keep processing."
    >
      <Prose>
        <p>
          Becoming an independent sales partner starts with a straightforward referral. Send new merchants, or existing
          clients, to a complete payment processing solution and share in the monthly revenue.
        </p>
        <p>
          Kuber Pays offers an all-inclusive feature set and one of the more direct integrations in card processing.
          Sign-up is quick. The hosted gateway is built to drop into a merchant’s stack. There are no monthly minimums
          or dues.
        </p>
        <p>
          Resellers receive percentage-based residuals across the processing services. As long as referred clients are
          actively processing, that share continues. The partnership is built around referrals and loyalty, including a
          reseller loyalty offer you can ask the team about.
        </p>
        <p>
          If you already build e-commerce sites, recommending this platform lets those clients accept payments from
          customers, with security, chargeback mitigation, and fraud protection behind the integration.
        </p>
      </Prose>
      <Link href="/contact" className="mt-8 inline-flex rounded-full bg-royal px-5 py-2.5 text-sm font-semibold text-white">
        Talk to partnerships
      </Link>
    </Article>
  );
}
