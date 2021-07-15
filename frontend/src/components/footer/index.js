import React from "react";
import { Link,useHistory } from "react-router-dom";
import {
  AiFillFacebook,
  AiFillTwitterCircle,
  AiFillYoutube,
} from "react-icons/ai";
import { GrInstagram } from "react-icons/gr";
const Footer = () => {
  const history = useHistory()
  return (
    <div className="footer">
        <div className="footerch">
          <p style = {{ fontFamily: '"Mukta", sans-serif'}}>Contact Us</p>
          <p style = {{ fontFamily: '"Mukta", sans-serif'}} id="numper_email">055450500</p>
          <p style = {{ fontFamily: '"Mukta", sans-serif'}} id="numper_email">Dark-Web@Dark-Web.com</p>
        </div>
        <div className="footerch">
          <p style = {{ fontFamily: '"Mukta", sans-serif'}}>Our servies</p>

          <ul>
          <Link
              to="/"
              style={{ textDecoration: "none", color: "white" }}
            >
              {" "}
              Home{" "}
            </Link><br/>
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
          <div className="web-page-nameORLogo" onClick={()=>{history.push("/")}}>
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
          </div>
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
