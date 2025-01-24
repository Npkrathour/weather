import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { FiAlignCenter } from "react-icons/fi";

const Header = () => {
  const navLinks = [
    {
      title: "Home",
      route: "/",
    },
    {
      title: "Weather App",
      route: "/weather-app",
    },
    {
      title: "about Us",
      route: "/about-us",
    },
    {
      title: "Contact Us",
      route: "/contact-us",
    },
  ];

  return (
    <div>
      <nav className="navbar">
        <div className="navbar_logo">Navbar</div>
        <ul className="navLinks">
          {navLinks.map((item, idx) => (
            <li key={idx}>
              <Link to={item.route}>{item.title}</Link>
            </li>
          ))}
        </ul>
        <div className="toggle_icon">
          <FiAlignCenter />
        </div>
      </nav>
    </div>
  );
};

export default Header;
