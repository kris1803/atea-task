import { useDashPage } from "./useDashPage";
import "./DashStyle.css";
import { formatCurrency } from "../lib/utils";

export const DashPage = () => {
  const {
    dashState,
    subscriptions,
    sort,
    summaryData,
    onChangeClientInput,
    onSelectStatus,
    onPressSortMonthlyCost,
  } = useDashPage();

  return (
    <>
      <h1>Your subscriptions</h1>

      <div className="filters">
        <div>
          <label htmlFor="status-select">Select a Status: </label>
          <select name="statuses" id="status-select" onChange={onSelectStatus}>
            <option value="">All statuses</option>
            <option value="active">Active</option>
            <option value="expired">Expired</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
        <div>
          <label htmlFor="client-filter">Select a Client: </label>
          <input
            id="client-filter"
            type="text"
            onChange={onChangeClientInput}
            placeholder="John Doe..."
          />
        </div>
      </div>

      {dashState.status === "success" ? (
        <table>
          <thead>
            <tr>
              <th>Customer name</th>
              <th>Product name</th>
              <th>Status</th>
              <th>Quantity</th>
              <th aria-sort={sort?.dir ?? "none"}>
                <button onClick={onPressSortMonthlyCost}>Monthly cost</button>
              </th>
              <th>Renewal date</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((sub) => (
              <tr key={sub.id}>
                <td>{sub.customerName}</td>
                <td>{sub.productName}</td>
                <td>{sub.status}</td>
                <td>{sub.quantity}</td>
                <td>{formatCurrency(sub.monthlyCost)}</td>
                <td>{sub.renewalDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
      {dashState.status === "success" && subscriptions.length === 0 ? (
        <p>No subscriptions found.</p>
      ) : null}
      {dashState.status === "loading" ? <p>Loading...</p> : null}
      {dashState.status === "error" ? <p>{dashState.message}</p> : null}

      {dashState.status === "success" ? (
        <dl>
          <dt>Total number of subscriptions</dt>
          <dd>{summaryData.total}</dd>

          <dt>Number of active subscriptions</dt>
          <dd>{summaryData.active}</dd>

          <dt>Total monthly cost</dt>
          <dd>{formatCurrency(summaryData.monthlyCost)}</dd>
        </dl>
      ) : null}
    </>
  );
};
