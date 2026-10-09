"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function DemoForm({
  title,
  text,
  submitLabel,
  destination,
  fields,
}: {
  title: string;
  text: string;
  submitLabel: string;
  destination?: string;
  fields: Array<{ name: string; label: string; type?: string; placeholder: string }>;
}) {
  const router = useRouter();
  const [done, setDone] = useState(false);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (destination) {
      router.push(destination);
      return;
    }
    setDone(true);
  }

  return (
    <form onSubmit={onSubmit} className="glass mx-auto max-w-lg rounded-3xl p-6">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="mt-2 text-sm leading-6 text-muted">{text}</p>
      <div className="mt-5 space-y-4">
        {fields.map((field) => (
          <label key={field.name} className="block text-sm font-medium">
            {field.label}
            <input
              required
              name={field.name}
              type={field.type ?? "text"}
              placeholder={field.placeholder}
              className="mt-1 w-full rounded-xl border border-line bg-[#f5f7fb] px-3 py-2.5 font-normal outline-none focus:border-royal"
            />
          </label>
        ))}
      </div>
      <button type="submit" className="mt-6 rounded-full bg-royal px-5 py-2.5 text-sm font-semibold text-white">
        {submitLabel}
      </button>
      {done ? <p className="mt-4 text-sm text-mint">Saved as a demo message. No inbox was contacted.</p> : null}
    </form>
  );
}
