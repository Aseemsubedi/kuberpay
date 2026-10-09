export function PageHero({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <section className="mesh relative overflow-hidden border-b border-line text-navy">
      <div className="rise relative mx-auto max-w-6xl px-5 py-16">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-royal">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted">{text}</p>
      </div>
    </section>
  );
}
