import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

import Logo from "../../assets/logo-icon.svg";

import { HiOutlineHome, HiUsers } from "react-icons/hi";
import { MdOutlineCardMembership } from "react-icons/md";

const Sidebar = () => {
  const location = useLocation();
  // const isActive = location.pathname === url;

  const linkItems = [
    {
      title: "Home",
      url: "/",
      icon: <HiOutlineHome />,
    },
    {
      title: "Subscriptions",
      url: "/subscriptions",
      icon: <MdOutlineCardMembership />,
    },
    {
      title: "Users",
      url: "/users",
      icon: <HiUsers />,
    },
    // {
    //   title: "Reports",
    //   url: "/reports",
    //   icon: <HiOutlineHome />,
    // },
  ];

  return (
    <div className="sidebar">
      <Link to="/" className="sidebar__logo">
        <img src={Logo} alt="logo" />
        <p className="sidebar__logo-title">Dashboard</p>
      </Link>

      <div
        className="sidebar__menu"
        //  style={{ border: "1px solid red" }}
      >
        {linkItems?.map((linkItem, index) => {
          return (
            <Link
              to={linkItem.url}
              key={index}
              // className={`${
              //   isActive ? "sidebar-active" : ""
              // } sidebar__menu-item`}
              className="sidebar__menu-item"
              activeClassName="sidebar-active"
            >
              {linkItem?.icon && (
                <span className="sidebar__menu-icon">{linkItem?.icon}</span>
              )}
              <span className="sidebar__menu-title">{linkItem.title}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
