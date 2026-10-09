import { Hero } from "@/components/home/hero";
import { Ledger } from "@/components/home/ledger";
import { HomeSections } from "@/components/home/sections";
import { SiteFrame } from "@/components/site/frame";

export default function HomePage() {
  return (
    <SiteFrame>
      <Hero />
      <Ledger />
      <HomeSections />
    </SiteFrame>
  );
}
