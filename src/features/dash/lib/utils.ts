import type {
  SortState,
  Subscription,
  SubscriptionFilterPayload,
} from "../types";

const currency = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "EUR",
});
export const formatCurrency = (n: number) => currency.format(n);

export const summarize = (rows: Subscription[]) => ({
  total: rows.length,
  active: rows.filter((s) => s.status === "active").length,
  monthlyCost: rows.reduce((sum, s) => sum + s.monthlyCost, 0),
});

export const filterSubscriptions = ({
  customerFilter,
  statusFilter,
  subscriptions,
}: SubscriptionFilterPayload) => {
  return subscriptions.filter((subscription) => {
    const customerFilterPass =
      customerFilter.length > 0
        ? subscription.customerName
            .toLowerCase()
            .includes(customerFilter.toLowerCase())
        : true;
    const statusFilterPass =
      statusFilter !== null ? subscription.status === statusFilter : true;

    return customerFilterPass && statusFilterPass;
  });
};

// only one sort yet, can be extended
export const sortSubscriptions = (
  a: Subscription,
  b: Subscription,
  sort: SortState | null,
) => {
  if (sort?.key === "monthlyCost") {
    return sort?.dir === "ascending"
      ? a.monthlyCost - b.monthlyCost
      : b.monthlyCost - a.monthlyCost;
  }
  return 0;
};
