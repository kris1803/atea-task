import { useEffect, useMemo, useState } from "react";
import { dashService } from "../../../lib/services";
import type { Subscription } from "../types";

export type DashState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | {
      status: "success";
      data: Subscription[];
    };

export const useDashPage = () => {
  const [dashState, setDashState] = useState<DashState>({ status: "loading" });
  const [customerFilter, setCustomerFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    Subscription["status"] | null
  >(null);

  useEffect(() => {
    let cancelling = false;
    dashService
      .fetchSubscriptions()
      .then((data) => {
        if (!cancelling) {
          // todo loop over data and parse it
          setDashState({ status: "success", data });
        }
      })
      .catch((err) => {
        if (!cancelling)
          setDashState({
            status: "error",
            message:
              err instanceof Error
                ? err.message
                : "Failed to load subscriptions",
          });
      });

    return () => {
      cancelling = true;
    };
  }, []);

  // here we could have a debounce (ex: from lodash)
  const onChangeClientInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerFilter(event.currentTarget.value);
  };

  const onSelectStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(
      event.currentTarget.value === ""
        ? null
        : (event.currentTarget.value as Subscription["status"]),
    );
  };

  const filteredSubscriptions = useMemo(() => {
    if (dashState.status !== "success") return [];
    return dashState.data.filter((subscription) => {
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
  }, [dashState, customerFilter, statusFilter]);

  return {
    dashState,
    onSelectStatus,
    onChangeClientInput,
    filteredSubscriptions,
  };
};
