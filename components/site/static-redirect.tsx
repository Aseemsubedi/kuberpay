const pagesPrefix = process.env.GITHUB_PAGES === "true" ? "/kuberpay" : "";
const pagesSlash = process.env.GITHUB_PAGES === "true" ? "/" : "";

export function StaticRedirect({ href }: { href: string }) {
  const target = `${pagesPrefix}${href}${pagesSlash}`;

  return (
    <main className="mx-auto max-w-6xl px-5 py-16 text-navy">
      <meta httpEquiv="refresh" content={`0; url=${target}`} />
      <p>
        Continue to{" "}
        <a className="font-semibold text-royal" href={target}>
          {href}
        </a>
        .
      </p>
    </main>
  );
}
