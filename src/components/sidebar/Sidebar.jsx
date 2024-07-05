import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

import Logo from "../../assets/logo-icon.svg";

import { HiOutlineHome, HiUsers } from "react-icons/hi";
import { MdOutlineCardMembership } from "react-icons/md";
const Sidebar = () => {
  const location = useLocation();

  const linkItems = [
    {
      title: "Home",
      url: "/",
      icon: <HiOutlineHome />,
    },
    {
      title: "Users",
      url: "/users",
      icon: <HiUsers />,
    },
    {
      title: "Subscriptions",
      url: "/subscriptions",
      icon: <MdOutlineCardMembership />,
    },
  ];

  return (
    <>
      <div className="sidebar">
        <Link to="/" className="sidebar__logo">
          <img src={Logo} alt="logo" />
          <p className="sidebar__logo-title">Dashboard</p>
        </Link>

        <div className="sidebar__menu">
          {linkItems.map((linkItem, index) => (
            <Link
              to={linkItem.url}
              key={index}
              className={`sidebar__menu-item ${
                location.pathname === linkItem.url ? "sidebar-active" : ""
              }`}
            >
              {linkItem.icon && (
                <span className="sidebar__menu-icon">{linkItem.icon}</span>
              )}
              <span className="sidebar__menu-title">{linkItem.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
