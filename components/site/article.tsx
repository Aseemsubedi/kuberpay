import { PageHero } from "@/components/site/page-hero";
import { SiteFrame } from "@/components/site/frame";

export function Article({
  eyebrow,
  title,
  text,
  children,
}: {
  eyebrow: string;
  title: string;
  text: string;
  children: React.ReactNode;
}) {
  return (
    <SiteFrame>
      <PageHero eyebrow={eyebrow} title={title} text={text} />
      <div className="mx-auto max-w-6xl px-5 py-14">{children}</div>
    </SiteFrame>
  );
}

export function Prose({ children }: { children: React.ReactNode }) {
  return <div className="max-w-3xl space-y-4 text-sm leading-7 text-muted">{children}</div>;
}

export function PointGrid({ items }: { items: Array<[string, string] | string> }) {
  return (
    <div className="mt-8 grid gap-4 md:grid-cols-2">
      {items.map((item) => {
        const [title, text] = Array.isArray(item) ? item : [item, ""];
        return (
          <article key={title} className="glass rounded-3xl p-5">
            <h2 className="font-semibold text-navy">{title}</h2>
            {text ? <p className="mt-2 text-sm leading-6 text-muted">{text}</p> : null}
          </article>
        );
      })}
    </div>
  );
}
