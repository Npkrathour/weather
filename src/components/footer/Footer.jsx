import React from "react";
import "./Footer.css";
import { BsFacebook } from "react-icons/bs";
import { BiLogoLinkedinSquare } from "react-icons/bi";
import { AiFillInstagram } from "react-icons/ai";
import { FaInstalod } from "react-icons/fa";
import { Link } from "react-router-dom";
const Footer = () => {
  const footerLinks = [
    {
      title: "Home",
      route: "/",
    },
    {
      title: "Weather App",
      route: "/weather-app",
    },
    {
      title: "About Us",
      route: "/About-us",
    },
    {
      title: "Contact Us",
      route: "/contact-us",
    },
  ];
  return (
    <>
      <div className="footer">
        <div className="footer_logo">
          <h1>Footer Logo</h1>
          <h4>Company Name</h4>
        </div>
        <div className="footer_links">
          <ul>
            <h6>Links</h6>
            {footerLinks.map((item, idx) => (
              <li key={idx}>
                <Link to={item.route}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer_links">
          <ul>
            <h6>Pricing Link</h6>
            {footerLinks.map((item, idx) => (
              <li key={idx}>
                <Link to={item.route}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="social_icon">
          <ul>
            <li>
              <a href="">
                <BsFacebook />
              </a>
            </li>
            <li>
              <a href="">
                <BiLogoLinkedinSquare />
              </a>
            </li>
            <li>
              <a href="">
                <AiFillInstagram />
              </a>
            </li>
            <li>
              <a href="">
                <FaInstalod />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Footer;
