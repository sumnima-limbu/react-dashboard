// import React from "react";
import "./Navbar.css";

import { IoMdNotifications } from "react-icons/io";
import { HiUserCircle } from "react-icons/hi2";

const Navbar = () => {
  return (
    <header className="header">
      <nav className="nav">
        <span className="nav__container">
          <IoMdNotifications className="nav__icon" />
        </span>
        <span className="nav__container">
          <HiUserCircle className="nav__icon" />
          <p>Sumnima Limbu</p>
        </span>
      </nav>
    </header>
  );
};

export default Navbar;
