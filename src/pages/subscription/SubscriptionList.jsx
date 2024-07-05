import { useState } from "react";
import { fetchSubscriptions } from "../../services/service";
import { useQuery } from "@tanstack/react-query";
import "../user/User.css";
import { getPaginationGroup } from "../../utils/Pagination";

const SubscriptionList = () => {
  const { data: subscriptionData, isLoading: isSubscriptionLoading } = useQuery(
    {
      queryKey: ["subscriptions"],
      queryFn: fetchSubscriptions,
    }
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [filterPackage, setFilterPackage] = useState("");
  const [filterExpiresOn, setFilterExpiresOn] = useState("");

  const subscriptionsPerPage = 10;

  if (isSubscriptionLoading) {
    return <div className="loading">Loading ...</div>;
  }

  // Apply filters
  let filteredSubscriptions = subscriptionData;

  if (filterPackage) {
    filteredSubscriptions = filteredSubscriptions.filter((subscription) =>
      subscription.package.includes(filterPackage)
    );
  }

  if (filterExpiresOn) {
    filteredSubscriptions = filteredSubscriptions.filter(
      (subscription) =>
        new Date(subscription.expires_on).toLocaleDateString() ===
        new Date(filterExpiresOn).toLocaleDateString()
    );
  }

  const indexOfLastSubscription = currentPage * subscriptionsPerPage;
  const indexOfFirstSubscription =
    indexOfLastSubscription - subscriptionsPerPage;
  const currentSubscriptions = filteredSubscriptions.slice(
    indexOfFirstSubscription,
    indexOfLastSubscription
  );

  const totalSubscriptions = filteredSubscriptions.length;
  const totalPages = Math.ceil(totalSubscriptions / subscriptionsPerPage);

  const handlePackageFilterChange = (e) => {
    setFilterPackage(e.target.value);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleExpiresOnFilterChange = (e) => {
    setFilterExpiresOn(e.target.value);
    setCurrentPage(1); // Reset to first page when filters change
  };

  return (
    <div className="container">
      <h2 className="title">Subscriptions List</h2>

      <div className="filters">
        <input
          type="text"
          className="filter-input"
          placeholder="Filter by Package"
          value={filterPackage}
          onChange={handlePackageFilterChange}
        />
        <input
          type="date"
          className="filter-select"
          value={filterExpiresOn}
          onChange={handleExpiresOnFilterChange}
        />
      </div>

      <div className="subscription__table-container">
        <table className="subscription__table">
          <thead>
            <tr>
              <th>Subscription ID</th>
              <th>Package</th>
              <th>Expires On</th>
            </tr>
          </thead>
          <tbody>
            {currentSubscriptions.map((subscription) => (
              <tr key={subscription.id}>
                <td data-label="Subscription ID">{subscription.id}</td>
                <td data-label="Package">{subscription.package}</td>
                <td data-label="Expires On">
                  {new Date(subscription.expires_on).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {getPaginationGroup(
          currentPage,
          subscriptionsPerPage,
          totalSubscriptions
        ).map((item, index) =>
          item === "..." ? (
            <span key={index} className="dots">
              {item}
            </span>
          ) : (
            <button
              key={index}
              onClick={() => setCurrentPage(item)}
              className={currentPage === item ? "active" : ""}
            >
              {item}
            </button>
          )
        )}
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SubscriptionList;
