import Link from "next/link";
import { Article, Prose } from "@/components/site/article";

export const metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  return (
    <Article
      eyebrow="Legal"
      title="Terms and conditions"
      text="By accessing Kuber Pays services, you agree to these terms. If you do not agree, discontinue use."
    >
      <Prose>
        <p>Do not misuse or exploit the services.</p>
        <p>
          Data is collected, stored, and processed in line with the <Link href="/privacy" className="text-royal">privacy policy</Link>.
          Security of that data is a priority.
        </p>
        <p>
          Kuber Pays is not liable for losses or damages arising from unauthorized access or use of the services.
        </p>
        <p>These terms may be updated. Changes take effect when they are posted.</p>
        <p>The terms are governed by the laws of the applicable jurisdiction.</p>
        <p>
          The checkout and merchant screens in this workspace are a prototype. They do not move money or open a live
          merchant account.
        </p>
      </Prose>
    </Article>
  );
}
