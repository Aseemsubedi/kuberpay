import Link from "next/link";

const sample = `POST /payment/create

{
  "amount": 100,
  "currency": "USD"
}

{
  "status": "success",
  "transaction_id": "KP12345"
}`;

export function DevTeaser() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-20 lg:grid-cols-2">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-royal">Developers</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight">Build Powerful Payment Experiences</h2>
        <p className="mt-3 text-sm leading-6 text-muted">
          A sample create-payment call for the prototype. It documents the shape of the product. It does not reach a
          processor.
        </p>
        <Link href="/developers" className="mt-6 inline-flex rounded-full bg-royal px-4 py-2 text-sm font-semibold text-white">
          Open developer portal
        </Link>
      </div>
      <pre className="overflow-auto rounded-3xl bg-navy p-6 text-sm leading-6 text-blue-100">
        <code>{sample}</code>
      </pre>
    </section>
  );
}
