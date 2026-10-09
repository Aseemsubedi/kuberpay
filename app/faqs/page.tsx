import { faqs } from "@/lib/content";
import { Article } from "@/components/site/article";

export const metadata = { title: "FAQ's" };

export default function FaqsPage() {
  return (
    <Article
      eyebrow="Solutions"
      title="Everything you need to know about Kuber Pays in Canada"
      text="Short answers for businesses evaluating the platform."
    >
      <div className="glass max-w-3xl divide-y divide-line rounded-3xl">
        {faqs.map((item) => (
          <article key={item.q} className="px-6 py-5">
            <h2 className="font-semibold">{item.q}</h2>
            <p className="mt-2 text-sm leading-6 text-muted">{item.a}</p>
          </article>
        ))}
      </div>
    </Article>
  );
}
