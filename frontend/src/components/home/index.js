import React from 'react'
import {  useHistory  } from "react-router-dom";
import { Slide } from 'react-slideshow-image';
import { Link } from 'react-router-dom';
import CitiesSlider from "./../slider/slider"
import 'react-slideshow-image/dist/styles.css';
import { Card , Button } from 'react-bootstrap';
import {AiFillFacebook,AiFillTwitterCircle,AiFillYoutube} from 'react-icons/ai'
import {GrInstagram} from 'react-icons/gr'

import "./home.css"


const slideImages = [
    "http://ar.move2turkey.com/wp-content/uploads//2020/04/Istanbul-Ataturk-Olympic-Stadium-UEFA-Champions-League-Final-20202.jpg",
    "https://www.hatkosport.com/wp-content/uploads/2020/01/ataturk-olimpiyat-stad-1280.jpg",
    "https://tritty.com/images/covers/pool_hall.jpg"
  ];

export default function Home() {
  const history = useHistory();
  const slides = [
    {
      city: 'Paris',
      country: 'France',
      img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/paris.jpg',
    },
    {
      city: 'Singapore',
      img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/singapore.jpg',
    },
    {
      city: 'Prague',
      country: 'Czech Republic',
      img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/prague.jpg',
    },
    {
      city: 'Amsterdam',
      country: 'Netherlands',
      img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/amsterdam.jpg',
    },
    {
      city: 'Moscow',
      country: 'Russia',
      img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/moscow.jpg',
    },
  ];
    return (
        <>
        
        <div className="slide-container">
        <CitiesSlider  slides={slides} />
        {/* <Slide>
          <div className="each-slide">
            <div className="imageSlider" style={{'backgroundImage': `url(${slideImages[0]})`}}>
              
            </div>
          </div>
          <div className="each-slide">
            <div className ="imageSlider" style={{'backgroundImage': `url(${slideImages[1]})`}}>
            </div>
          </div>
          <div className="each-slide">
            <div className="imageSlider" style={{'backgroundImage': `url(${slideImages[2]})`}}>
            </div>
          </div>
        </Slide> */}
      </div>

      <div className= "parintcatgory" >
          <div className="ch" onClick={()=>{
        history.push("/category/sport")
      }} >
              <img src ='https://mediaassets.wtxl.com/wtxl.com/content/tncms/assets/v3/editorial/7/c9/7c9aef76-82df-11e2-b688-001a4bcf6878/5131619d5b5fa.image.jpg'/>
              <div className="overlay">
         <div className="text"></div>
         </div>

          </div>
          <div className="ch" onClick={()=>{
        history.push("/category/entertainment")
      }} >
          <img src ='http://www.genesisgujarat.com/img/Entertainment.jpg'/> 
          <div className="overlay">
         <div className="text"></div>
         </div>
          </div>
        
      </div>

      <div className = "footer">

        <div className="footerparent">

        <div className="footerch">
          <p>Contact Us</p>
          <p id="numper_email">055450500</p>
          <p id="numper_email">Dark-Web@Dark-Web.com</p>
          </div>
          <div className="footerch">
          <p>Our servies</p>

          <ul>
            <li >Home</li>
            <Link  to="/about_us" style={{ textDecoration: 'none', color: "white" }}> About Us </Link>
          </ul>

          
        </div>
        <div className="footerch">
        <p id="text_booking">Dark-Web Booking</p>
        <div className = "iconsparant">

        < AiFillFacebook className="icons"/>
        <GrInstagram className="icons"/>
        <AiFillTwitterCircle className="icons"/>
        <AiFillYoutube className="icons"/>
        </div>

          
        </div>
        

        </div>


      </div>

     
        </>
        
    )
}






