import Link from "next/link";
import { Article, PointGrid, Prose } from "@/components/site/article";

export const metadata = { title: "White Label Solutions" };

export default function WhiteLabelPage() {
  return (
    <Article
      eyebrow="Products"
      title="Your brand on the checkout. Our technology underneath."
      text="White-label technology is licensed software one company builds and another rebrands. It lets a business launch without rebuilding the stack."
    >
      <Prose>
        <p>
          Kuber Pays white-label checkout can carry your logo and brand color. You stay with your customers. We run the
          payment technology.
        </p>
        <p>
          The vendor platform is plug-and-play: add your company name, logo, icons, URLs, emails, and other brand
          elements. Once it matches your identity, you sell and manage the product as your own.
        </p>
      </Prose>
      <PointGrid
        items={[
          ["Scale your offering", "Add a payments product without a multi-year build."],
          ["Scale your costs", "Avoid the heavy upfront investment of a from-scratch gateway."],
          ["Boost revenue", "Package payments with the services you already sell."],
          ["Grow reputation", "The experience your customer sees carries your name."],
          ["Improve retention", "Keep merchants inside a product you operate."],
          ["Focus on your brand", "We handle fulfillment. You handle growth."],
        ]}
      />
      <Link href="/contact" className="pay-glow mt-8 inline-flex rounded-full bg-royal px-5 py-2.5 text-sm font-semibold text-white">
        Contact us
      </Link>
    </Article>
  );
}
