import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";

export function SiteFrame({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
