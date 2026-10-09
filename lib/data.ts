export type TxStatus = "Success" | "Pending" | "Failed" | "Refunded";

export type Transaction = {
  id: string;
  customer: string;
  email: string;
  amount: number;
  method: "Card" | "Bank" | "Wallet";
  status: TxStatus;
  date: string;
  business: string;
};

export const transactions: Transaction[] = [
  { id: "KP10021", customer: "John Smith", email: "john@northline.io", amount: 250, method: "Card", status: "Success", date: "08 Oct 2026", business: "Northline Studio" },
  { id: "KP10022", customer: "Amina Rahman", email: "amina@harbor.co", amount: 1280, method: "Bank", status: "Success", date: "08 Oct 2026", business: "Harbor Goods" },
  { id: "KP10023", customer: "Leo Martins", email: "leo@fieldnote.app", amount: 89, method: "Wallet", status: "Pending", date: "08 Oct 2026", business: "Fieldnote" },
  { id: "KP10024", customer: "Priya Nair", email: "priya@lumen.shop", amount: 640, method: "Card", status: "Success", date: "07 Oct 2026", business: "Lumen Shop" },
  { id: "KP10025", customer: "Owen Blake", email: "owen@atlasmail.com", amount: 42, method: "Card", status: "Failed", date: "07 Oct 2026", business: "Atlas Mail" },
  { id: "KP10026", customer: "Sofia Chen", email: "sofia@kiln.dev", amount: 2100, method: "Bank", status: "Success", date: "07 Oct 2026", business: "Kiln" },
  { id: "KP10027", customer: "Noah Adeyemi", email: "noah@brightpath.org", amount: 175, method: "Wallet", status: "Refunded", date: "06 Oct 2026", business: "Brightpath" },
  { id: "KP10028", customer: "Maya Ivers", email: "maya@copperlane.com", amount: 960, method: "Card", status: "Success", date: "06 Oct 2026", business: "Copper Lane" },
  { id: "KP10029", customer: "Hassan Ali", email: "hassan@orbitpay.io", amount: 310, method: "Card", status: "Pending", date: "06 Oct 2026", business: "Orbit" },
  { id: "KP10030", customer: "Elena Vogt", email: "elena@paper&pine.co", amount: 54, method: "Wallet", status: "Success", date: "05 Oct 2026", business: "Paper & Pine" },
];

export const revenueSeries = [
  { month: "May", revenue: 182000, volume: 9400 },
  { month: "Jun", revenue: 206000, volume: 11200 },
  { month: "Jul", revenue: 198000, volume: 10840 },
  { month: "Aug", revenue: 241000, volume: 13110 },
  { month: "Sep", revenue: 268000, volume: 14920 },
  { month: "Oct", revenue: 312400, volume: 16880 },
];

export const settlements = [
  { id: "SET-2041", date: "07 Oct 2026", amount: 18420, status: "Paid" as const, account: "•••• 4418" },
  { id: "SET-2040", date: "06 Oct 2026", amount: 12110, status: "Paid" as const, account: "•••• 4418" },
  { id: "SET-2039", date: "05 Oct 2026", amount: 9840, status: "Processing" as const, account: "•••• 4418" },
  { id: "SET-2038", date: "04 Oct 2026", amount: 15220, status: "Paid" as const, account: "•••• 4418" },
];

export const customers = [
  { name: "Northline Studio", contact: "John Smith", volume: 48200, txns: 186, since: "Jan 2025" },
  { name: "Harbor Goods", contact: "Amina Rahman", volume: 91340, txns: 402, since: "Mar 2024" },
  { name: "Lumen Shop", contact: "Priya Nair", volume: 27650, txns: 144, since: "Nov 2025" },
  { name: "Kiln", contact: "Sofia Chen", volume: 120400, txns: 88, since: "Aug 2024" },
  { name: "Copper Lane", contact: "Maya Ivers", volume: 33890, txns: 210, since: "Feb 2025" },
  { name: "Fieldnote", contact: "Leo Martins", volume: 9640, txns: 73, since: "Jun 2026" },
];

export const apiKeys = [
  { name: "Publishable key", value: "pk_demo_4f8c91ab2e7740c1", hint: "Safe to use in a browser demo" },
  { name: "Secret key", value: "sk_demo_91kd20aa77sampleonly", hint: "Sample only. Never a live secret." },
  { name: "Webhook signing", value: "whsec_demo_kuberpays_prototype", hint: "Used to illustrate signed events" },
];

export const plans = [
  {
    name: "Starter",
    audience: "For small businesses",
    price: "1.9% + $0.30",
    detail: "Illustrative rate for the demo",
    points: ["Hosted checkout", "Next-day settlement view", "Email receipts", "Basic dashboard"],
  },
  {
    name: "Business",
    audience: "For growing companies",
    price: "1.5% + $0.25",
    detail: "Illustrative rate for the demo",
    points: ["Payment links and invoices", "Team access", "Refunds and disputes view", "Revenue analytics"],
    featured: true,
  },
  {
    name: "Enterprise",
    audience: "Custom solutions",
    price: "Custom",
    detail: "Scoped with your finance team",
    points: ["Dedicated success manager", "Volume pricing", "Advanced roles", "Custom settlement rules"],
  },
];
