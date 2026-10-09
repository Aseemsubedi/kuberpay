import { notFound } from "next/navigation";
import { featureNotes } from "@/lib/content";
import { Article, Prose } from "@/components/site/article";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(featureNotes).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = featureNotes[slug as keyof typeof featureNotes];
  return { title: note?.title ?? "Kuber Pays" };
}

export default async function InfoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = featureNotes[slug as keyof typeof featureNotes];
  if (!note) notFound();

  return (
    <Article eyebrow="Platform" title={note.title} text={note.summary}>
      <Prose>
        <p>{note.body}</p>
      </Prose>
    </Article>
  );
}
