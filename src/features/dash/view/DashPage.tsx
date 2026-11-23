import { useDashPage } from "./useDashPage";
import "./DashStyle.css";

export const DashPage = () => {
  const {
    dashState,
    filteredSubscriptions,
    onChangeClientInput,
    onSelectStatus,
  } = useDashPage();

  return (
    <>
      <h1>Your subscriptions</h1>

      <div className="filters">
        <div>
          <label htmlFor="status-select">Select a Status: </label>
          <select name="statuses" id="status-select" onChange={onSelectStatus}>
            <option value="">--Please choose an option--</option>
            <option value="active">Active</option>
            <option value="expired">Expired</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
        <div>
          <label htmlFor="client-filter">Select a Client: </label>
          <input
            name="client-filter"
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
              <th>Monthly cost</th>
              <th>Renewal date</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubscriptions.map((sub) => (
              <tr key={sub.id}>
                <td>{sub.customerName}</td>
                <td>{sub.productName}</td>
                <td>{sub.status}</td>
                <td>{sub.quantity}</td>
                <td>{sub.monthlyCost}</td>
                <td>{sub.renewalDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
      {dashState.status === "success" && filteredSubscriptions.length === 0 ? (
        <p>No subscriptions found.</p>
      ) : null}
      {dashState.status === "loading" ? <p>Loading...</p> : null}
      {dashState.status === "error" ? <p>{dashState.message}</p> : null}
    </>
  );
};
