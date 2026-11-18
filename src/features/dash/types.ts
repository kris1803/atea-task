export interface Subscription {
  id: string;
  customerName: string;
  productName: string;
  status: "active" | "expired" | "suspended";
  quantity: number;
  monthlyCost: number;
  renewalDate: string;
}
