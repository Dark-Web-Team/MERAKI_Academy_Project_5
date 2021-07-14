import React from "react";
import { Link } from "react-router-dom";
import {
  AiFillFacebook,
  AiFillTwitterCircle,
  AiFillYoutube,
} from "react-icons/ai";
import { GrInstagram } from "react-icons/gr";
const Footer = () => {
  return (
    <div className="footer">
        <div className="footerch">
          <p>Contact Us</p>
          <p id="numper_email">055450500</p>
          <p id="numper_email">Dark-Web@Dark-Web.com</p>
        </div>
        <div className="footerch">
          <p>Our servies</p>

          <ul>
            <li>Home</li>
            <Link
              to="/about_us"
              style={{ textDecoration: "none", color: "white" }}
            >
              {" "}
              About Us{" "}
            </Link>
          </ul>
        </div>
        <div className="footerch">
          <p
            style={{
              fontFamily: '"Mukta", sans-serif',
              fontSize: "30px",
            }}
          >
            Dark-Web
            <span
              style={{
                fontFamily: '"Mukta", sans-serif',
                fontSize: "30px",
                color: " #ffc300",
              }}
            >
              -Booking
            </span>
          </p>
          <div className="iconsparant">
            <AiFillFacebook className="icons" />
            <GrInstagram className="icons" />
            <AiFillTwitterCircle className="icons" />
            <AiFillYoutube className="icons" />
          </div>
        </div>
    </div>
  );
};

export default Footer;
