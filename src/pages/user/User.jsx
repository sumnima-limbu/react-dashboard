import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers, fetchSubscriptions } from "../../services/service";
import {
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import "./User.css";
import { getPaginationGroup } from "../../utils/Pagination";
import { useNavigate } from "react-router-dom";

const User = () => {
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const { data: subscriptionData, isLoading: isSubscriptionLoading } = useQuery(
    {
      queryKey: ["subscriptions"],
      queryFn: fetchSubscriptions,
    }
  );

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const [selectedUser, setSelectedUser] = useState(null);
  const [userSubscriptions, setUserSubscriptions] = useState([]);

  const [nameFilter, setNameFilter] = useState("");
  const [usernameFilter, setUsernameFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (selectedUser && subscriptionData) {
      const filteredSubscriptions = subscriptionData.filter(
        (subscription) => subscription.userId === selectedUser
      );
      setUserSubscriptions(filteredSubscriptions);
    }
  }, [selectedUser, subscriptionData]);

  const handleUserClick = (userId) => {
    navigate(`/subscription/${userId}`);
  };

  if (isLoading || isSubscriptionLoading) {
    return <div className="loading">Loading ...</div>;
  }

  if (isError) {
    return <div className="error">Error fetching users</div>;
  }

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  const filteredUsers = users
    ?.filter(
      (user) =>
        user.first_name.toLowerCase().includes(nameFilter.toLowerCase()) ||
        user.last_name.toLowerCase().includes(nameFilter.toLowerCase())
    )
    .filter((user) =>
      user.username.toLowerCase().includes(usernameFilter.toLowerCase())
    )
    .filter((user) => (countryFilter ? user.country === countryFilter : true));

  const currentUsers = filteredUsers?.slice(indexOfFirstUser, indexOfLastUser);

  const totalUsers = filteredUsers?.length;
  const totalPages = Math.ceil(totalUsers / usersPerPage);

  const countryData = users?.reduce((acc, user) => {
    const country = user.country;
    if (!acc[country]) {
      acc[country] = 0;
    }
    acc[country] += 1;
    return acc;
  }, {});

  const chartData = countryData
    ? Object.keys(countryData).map((country) => ({
        country,
        count: countryData[country],
      }))
    : [];

  return (
    <div className="container">
      <h1 className="title">Users</h1>
      <div className="filters">
        <input
          type="text"
          className="filter-input"
          placeholder="Filter by name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />
        <input
          type="text"
          className="filter-input"
          placeholder="Filter by username"
          value={usernameFilter}
          onChange={(e) => setUsernameFilter(e.target.value)}
        />
        <select
          className="filter-select"
          value={countryFilter}
          onChange={(e) => setCountryFilter(e.target.value)}
        >
          <option value="">All countries</option>
          {Object.keys(countryData || {}).map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
      <div className="user__table-container">
        <table className="user__table">
          <thead>
            <tr>
              <th style={{ width: "20%" }}>Full Name</th>
              <th style={{ width: "10%" }}>Username</th>
              <th style={{ width: "30%" }}>Email</th>
              <th style={{ width: "15%" }}>Address</th>
              <th style={{ width: "10%" }}>Country</th>
              <th style={{ width: "10%" }}>Join Date</th>
              <th style={{ width: "10%" }}>Active</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers?.map((user) => (
              <tr key={user.id} onClick={() => handleUserClick(user.id)}>
                <td data-label="Full Name" style={{ width: "20%" }}>
                  {user.first_name} {user.middle_name} {user.last_name}
                </td>
                <td data-label="Username" style={{ width: "10%" }}>
                  {user.username}
                </td>
                <td data-label="Email" style={{ width: "30%" }}>
                  {user.email}
                </td>
                <td data-label="Address" style={{ width: "15%" }}>
                  {user.address}
                </td>
                <td data-label="Country" style={{ width: "10%" }}>
                  {user.country}
                </td>
                <td data-label="Join Date" style={{ width: "10%" }}>
                  {new Date(user.join_date * 1000).toLocaleDateString()}
                </td>
                <td data-label="Active" style={{ width: "10%" }}>
                  {user.active === "1" ? "Yes" : "No"}
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
        {getPaginationGroup(currentPage, usersPerPage, totalUsers).map(
          (item, index) =>
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

      {/* <div className="chart">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="country" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div> */}
    </div>
  );
};

export default User;
