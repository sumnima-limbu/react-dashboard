import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import "./DashboardLayout.css";
import Navbar from "../navbar/Navbar";

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">
      <div className="dashboard-layout__sidebar">
        <Sidebar />
      </div>
      <div className="dashboard-layout__main">
        <Navbar />
        <div className="dashboard-layout__content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
