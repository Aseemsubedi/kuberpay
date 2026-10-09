import { Article, PointGrid, Prose } from "@/components/site/article";

export const metadata = { title: "Technology Stack" };

const sample = `POST /payment/create

{
  "amount": 100,
  "currency": "CAD"
}`;

export default function DevelopersPage() {
  return (
    <Article
      eyebrow="Developers"
      title="Integrate in minutes, with the stack you already use"
      text="SDKs, REST APIs, and plugins across major platforms. Documentation, reference apps, and 24/7 support sit beside the integration."
    >
      <PointGrid
        items={[
          ["Client APIs", "PHP, Python, Java, Node.js, and .NET."],
          ["Web checkout", "JavaScript checkout for the browser."],
          ["Mobile SDKs", "iOS and Android."],
          ["Plugins", "PrestaShop, OpenCart, WooCommerce, and Magento."],
          ["Hybrid apps", "Cordova."],
          ["Go-live", "Create an order and generate a payment link. Launch is measured in minutes, not weeks."],
        ]}
      />
      <pre className="mt-8 max-w-xl overflow-auto rounded-3xl bg-navy p-6 font-mono text-sm leading-6 text-blue-100">
        <code>{sample}</code>
      </pre>
      <Prose>
        <p className="mt-4">
          The sample above shows the shape of a create-payment call in this prototype. It does not reach a live
          processor.
        </p>
      </Prose>
    </Article>
  );
}
