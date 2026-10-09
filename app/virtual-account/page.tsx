import { Article, PointGrid, Prose } from "@/components/site/article";

export const metadata = { title: "Virtual Account" };

export default function VirtualAccountPage() {
  return (
    <Article
      eyebrow="Products"
      title="Smarter transaction banking with virtual accounts"
      text="Corporates need clearer control of cash and liquidity. Virtual accounts are how many of them get it."
    >
      <Prose>
        <p>
          Virtual accounts let businesses make and receive payments, including NEFT, RTGS, and IMPS style flows, and
          reconcile those payments in real time. Kuber Pays offers on-demand virtual accounts for corporate clients.
        </p>
        <p>
          A self-serve virtual account management engine sits beside a unified dashboard, reporting, and integrated
          payments, so corporates see the position clearly and banks can manage the relationship.
        </p>
      </Prose>
      <PointGrid
        items={[
          ["Complex structures", "Built for corporates with several banking relationships and layered accounting."],
          ["Liquidity", "Simplifies cash and liquidity management, supports inter-company loans, and improves straight-through reconciliation."],
        ]}
      />
    </Article>
  );
}
