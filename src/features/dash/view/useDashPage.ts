import { useEffect, useMemo, useState } from "react";
import { dashService } from "../../../lib/services";
import type { SortState, Subscription } from "../types";
import {
  filterSubscriptions,
  sortSubscriptions,
  summarize,
} from "../lib/utils";

type DashState =
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
  const [sort, setSort] = useState<SortState | null>(null);

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

  const onPressSortMonthlyCost = () => {
    if (!sort) return setSort({ dir: "ascending", key: "monthlyCost" });
    if (sort.dir === "ascending")
      return setSort({ dir: "descending", key: "monthlyCost" });
    setSort(null);
  };

  const filteredSortedSubscriptions = useMemo(() => {
    if (dashState.status !== "success") return [];
    return [
      ...filterSubscriptions({
        subscriptions: dashState.data,
        customerFilter,
        statusFilter,
      }),
    ].sort((a, b) => sortSubscriptions(a, b, sort));
  }, [dashState, customerFilter, statusFilter, sort]);

  const summaryData = summarize(filteredSortedSubscriptions);

  return {
    dashState,
    subscriptions: filteredSortedSubscriptions,
    sort,
    summaryData,
    onSelectStatus,
    onChangeClientInput,
    onPressSortMonthlyCost,
  };
};
