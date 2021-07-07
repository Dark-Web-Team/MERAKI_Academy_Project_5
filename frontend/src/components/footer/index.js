import React from "react";
import { Link } from 'react-router-dom';
import {AiFillFacebook,AiFillTwitterCircle,AiFillYoutube} from 'react-icons/ai'
import {GrInstagram} from 'react-icons/gr'
const Footer = () => {
  return (
    <div className="footer">
      <div className="footerparent">
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
          <p id="text_booking">Dark-Web Booking</p>
          <div className="iconsparant">
            <AiFillFacebook className="icons" />
            <GrInstagram className="icons" />
            <AiFillTwitterCircle className="icons" />
            <AiFillYoutube className="icons" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
