import React from 'react'
import {  useHistory  } from "react-router-dom";
import { Slide } from 'react-slideshow-image';
import { Link } from 'react-router-dom';

import 'react-slideshow-image/dist/styles.css';
import { Card , Button } from 'react-bootstrap';
import {AiFillFacebook,AiFillTwitterCircle,AiFillYoutube} from 'react-icons/ai'
import {GrInstagram} from 'react-icons/gr'

import "./home.css"


const slideImages = [
    "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/a46ca431492539.5653447fb71fc.png",
    "https://cdn.mosoah.com/wp-content/uploads/2020/01/06174024/%D8%B5%D9%88%D8%B1-%D9%85%D9%84%D8%A7%D8%B9%D8%A821-825x510.jpg",
    "https://tritty.com/images/covers/pool_hall.jpg"
  ];

export default function Home() {
  const history = useHistory();

    return (
        <>
        
        <div className="slide-container">
        <Slide>
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
        </Slide>
      </div>

      <div className= "parintcatgory" >
          <div className="ch" onClick={()=>{
        history.push("/category/sport")
      }} >
              <img src ='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvhNj6DYX96vHENP9mIUbQmuYc4VLnzLo7z9eqLbhT0VHQ7MsnMGBBHji-7JxrF-uhAmo&usqp=CAU'/>
              <div className="overlay">
         <div className="text">Sport</div>
         </div>

          </div>
          <div className="ch" onClick={()=>{
        history.push("/category/entertainment")
      }} >
          <img src ='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvhNj6DYX96vHENP9mIUbQmuYc4VLnzLo7z9eqLbhT0VHQ7MsnMGBBHji-7JxrF-uhAmo&usqp=CAU'/> 
          <div className="overlay">
         <div className="text">Hello World</div>
         </div>
          </div>
          <div className="ch">

          <img src ='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvhNj6DYX96vHENP9mIUbQmuYc4VLnzLo7z9eqLbhT0VHQ7MsnMGBBHji-7JxrF-uhAmo&usqp=CAU'/>
          <div className="overlay">
         <div className="text">Hello World</div>
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






