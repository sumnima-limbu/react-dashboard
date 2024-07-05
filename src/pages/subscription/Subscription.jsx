import { useState, useEffect } from "react";
import { fetchSubscriptions } from "../../services/service";
import { useParams } from "react-router-dom";
import "../user/User.css";
import { getPaginationGroup } from "../../utils/Pagination";

const Subscription = () => {
  const { id } = useParams();
  const [subscriptionData, setSubscriptionData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const subscriptionsPerPage = 10;

  console.log("user-id", id);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await fetchSubscriptions();
      setSubscriptionData(data.filter((sub) => sub.user_id == id));
      setIsLoading(false);
    };

    fetchData();
  }, [id]);

  console.log("subscription- Data", subscriptionData);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  const indexOfLastSubscription = currentPage * subscriptionsPerPage;
  const indexOfFirstSubscription =
    indexOfLastSubscription - subscriptionsPerPage;
  const currentSubscriptions = subscriptionData.slice(
    indexOfFirstSubscription,
    indexOfLastSubscription
  );

  const totalSubscriptions = subscriptionData.length;
  const totalPages = Math.ceil(totalSubscriptions / subscriptionsPerPage);

  return (
    <div className="container">
      <h2 className="title">Subscriptions for User ID: {id}</h2>
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
              <td>{subscription.id}</td>
              <td>{subscription.package}</td>
              <td>{new Date(subscription.expires_on).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
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

export default Subscription;
