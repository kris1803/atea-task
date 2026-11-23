export interface Subscription {
  id: string;
  customerName: string;
  productName: string;
  status: "active" | "expired" | "suspended";
  quantity: number;
  monthlyCost: number;
  renewalDate: string;
}

export type SubscriptionFilterPayload = {
  subscriptions: Subscription[];
  customerFilter: string;
  statusFilter: Subscription["status"] | null;
};

export type SortState = {
  key: keyof Subscription;
  dir: "ascending" | "descending";
};
