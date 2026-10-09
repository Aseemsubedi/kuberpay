import { DemoForm } from "@/components/site/demo-form";
import { contact } from "@/lib/content";
import { PageHero } from "@/components/site/page-hero";
import { SiteFrame } from "@/components/site/frame";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <SiteFrame>
      <PageHero
        eyebrow="Contact"
        title="Let’s make something great together"
        text="We’re here to answer your questions, discuss partnership opportunities, or provide support."
      />
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="text-sm leading-7 text-muted">
          <p>{contact.address[0]}</p>
          <p>{contact.address[1]}</p>
          <p className="mt-4">{contact.phone}</p>
          <p>{contact.email}</p>
          <p className="mt-4 text-xs">LEI: {contact.lei}</p>
        </div>
        <DemoForm
          title="Send a message"
          text="This demo keeps your note in the browser. A confirmation appears here. It is not delivered to the Kuber Pays inbox."
          submitLabel="Submit"
          fields={[
            { name: "name", label: "Name", placeholder: "Your name" },
            { name: "email", label: "Email", type: "email", placeholder: "you@company.com" },
            { name: "phone", label: "Phone", placeholder: "+1" },
            { name: "message", label: "Message", placeholder: "How can we help?" },
          ]}
        />
      </div>
    </SiteFrame>
  );
}
