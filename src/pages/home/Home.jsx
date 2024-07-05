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
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

import {
  FiShoppingBag,
  FiUser,
  FiShoppingCart,
  FiAlertCircle,
} from "react-icons/fi";
import "./Home.css";
import Card from "../../components/card/Card";

const Home = () => {
  const {
    data: users,
    isLoading: isUsersLoading,
    error: usersError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const {
    data: subscriptions,
    isLoading: isSubscriptionsLoading,
    error: subscriptionsError,
  } = useQuery({
    queryKey: ["subscriptions"],
    queryFn: fetchSubscriptions,
  });

  if (isUsersLoading || isSubscriptionsLoading) {
    return <div>Loading...</div>;
  }

  if (usersError || subscriptionsError) {
    return <div>Error loading data</div>;
  }

  const activeUsersCount = users?.filter((user) => user.active === "1").length;
  const inactiveUsersCount = users?.length - activeUsersCount;

  const pieData = [
    { name: "Active Users", value: activeUsersCount },
    { name: "Inactive Users", value: inactiveUsersCount },
  ];

  const COLORS = ["#0088FE", "#00C49F"];

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
    <div className="home-container">
      <h1>Hi, Welcome back 👋</h1>
      <div className="cards-container">
        <Card icon={<FiShoppingBag />} number="714k" label="Weekly Sales" />
        <Card icon={<FiUser />} number="1.35m" label="New Users" />
        <Card icon={<FiShoppingCart />} number="1.72m" label="Item Orders" />
        <Card icon={<FiAlertCircle />} number="234" label="Bug Reports" />
      </div>
      <div className="charts-container">
        <div className="chart">
          <h2>Users by Country</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="country" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="chart">
          <h2>Active vs Inactive Users</h2>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* <div className="chart">
        <h2>Subscriptions Over Time</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={subscriptions}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="startDate" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div> */}
    </div>
  );
};

export default Home;
