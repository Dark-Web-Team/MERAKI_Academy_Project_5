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
import "./style.css"

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

     


  <div class="crd-grid">
   
    <div class="crd" onClick={()=>{
        history.push("/category/sport")
      }} >
       
      <div class="crd__background" style={{"backgroundImage": `url(${'https://images.unsplash.com/photo-1557177324-56c542165309?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'})`}}></div>
      <div class="crd__content">
        <h3 class="crd__heading">Sports</h3>
      </div>
    </div>
   
    <div class="crd" onClick={()=>{
        history.push("/category/entertainment")
      }} >

      <div class="crd__background" style={{"backgroundImage": `url(${'https://images.unsplash.com/photo-1557187666-4fd70cf76254?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'})`}}></div>
      <div class="crd__content">
       
        <h3 class="crd__heading">Entertainment</h3>
      </div>
    </div>
  
    </div>
   
          {/* <div className="ch" onClick={()=>{
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
          </div> */}
        
      

    
     
        </>
        
    )
}






