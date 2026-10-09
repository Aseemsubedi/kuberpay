import { SolutionsView } from "@/components/solutions/view";
import { SiteFrame } from "@/components/site/frame";

export const metadata = { title: "Solutions & Features" };

export default function SolutionsPage() {
  return (
    <SiteFrame>
      <SolutionsView />
    </SiteFrame>
  );
}
