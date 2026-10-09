import { contact } from "@/lib/content";
import { Article, Prose } from "@/components/site/article";

export const metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <Article
      eyebrow="Legal"
      title="Privacy policy"
      text="Kuber Pays values your privacy and is committed to protecting personal information. This policy explains how data is collected, used, and safeguarded."
    >
      <Prose>
        <p>
          Personal information may include your name, email, phone number, financial details, and usage data when you
          interact with the platform.
        </p>
        <p>That information is used to provide services, process transactions, strengthen security, and improve the experience.</p>
        <p>
          Data is not sold. It may be shared with trusted partners only for payment processing, compliance, or service
          improvements.
        </p>
        <p>Security protocols include encryption, firewalls, and regular monitoring.</p>
        <p>Cookies personalize the experience and help analyze traffic. You can disable cookies in your browser.</p>
        <p>You can ask to access, update, or delete personal data by contacting support.</p>
        <p>This policy may be updated. Changes are posted on this page with a new date.</p>
        <p>
          Questions: {contact.email}. On this prototype, the contact form does not transmit what you type.
        </p>
      </Prose>
    </Article>
  );
}
