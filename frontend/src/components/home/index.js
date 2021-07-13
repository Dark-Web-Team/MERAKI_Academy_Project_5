import React from "react";
import { useHistory } from "react-router-dom";
import CitiesSlider from "./../slider/slider";
import "react-slideshow-image/dist/styles.css";
import {
  AiFillFacebook,
  AiFillTwitterCircle,
  AiFillYoutube,
} from "react-icons/ai";
import { GrInstagram } from "react-icons/gr";

import "./home.css";
import "./style.css";
import "./blogs.css";
import "./blog.css";

const slideImages = [
  "http://ar.move2turkey.com/wp-content/uploads//2020/04/Istanbul-Ataturk-Olympic-Stadium-UEFA-Champions-League-Final-20202.jpg",
  "https://www.hatkosport.com/wp-content/uploads/2020/01/ataturk-olimpiyat-stad-1280.jpg",
  "https://tritty.com/images/covers/pool_hall.jpg",
];

export default function Home() {
  const history = useHistory();
  const slides = [
    {
      city: "Paris",
      country: "France",
      img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/paris.jpg",
    },
    {
      city: "Singapore",
      img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/singapore.jpg",
    },
    {
      city: "Prague",
      country: "Czech Republic",
      img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/prague.jpg",
    },
    {
      city: "Amsterdam",
      country: "Netherlands",
      img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/amsterdam.jpg",
    },
    {
      city: "Moscow",
      country: "Russia",
      img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/moscow.jpg",
    },
  ];
  return (
    <>
      <div className="slide-container">
        <CitiesSlider slides={slides} />
      </div>
      <div className="blg">
        <div class="blog-card web">
          <div class="content-mask">
            <span class="categery">Web</span>
            <h1 className="hhh">Improving Website Performance</h1>
            <p className="parag">
              A practical guide to speeding up your website loading-times
            </p>
            <div class="post-detail">
              <span class="icn"></span>
            </div>
          </div>
          <div class="horizontal"></div>
        </div>
        <div class="blog-card python">
          <div class="content-mask">
            <span class="python categery">Booking</span>
            <h1 className="hhh">Booking Website</h1>
            <p>
              The ocean freight industry saw considerable progress in 2019
              toward a future where instant quoting became an actual procurement
              option, as opposed to a theoretical concept. The question in 2020
              is how and where such tools might gain further traction.
            </p>
            <div class="post-detail">
              <span class="icn"></span>
            </div>
          </div>
          <div class="horizontal"></div>
        </div>
        <div>
          <div class="blog-item">
            <a className="itm">
              <div class="icon">
                <img
                  className="imgUrl"
                  src="https://d1p8pldpmo4u0v.cloudfront.net/wp-content/uploads/2018/09/Booking.jpg"
                  alt=""
                />
              </div>
              <div class="contnt">
                <div class="titel">Lorem Ipsum, dizgi ve baskı </div>
                <div class="rounded"></div>

                <p>
                  Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır
                  metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir
                  hurufat numune kitabı...
                </p>
              </div>

              <div class="item-arrow">
                <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
              </div>
            </a>
          </div>
        </div>

        <div>
          <div class="blog-item">
            <a className="itm">
              <div class="icon">
                <img
                  className="imgUrl"
                  src="https://www.joc.com/sites/default/files/field_feature_image/Online%20booking%20keyboard%20concept.jpg"
                  alt=""
                />
              </div>
              <div class="contnt">
                <div class="titel">Lorem Ipsum, dizgi ve baskı </div>
                <div class="rounded"></div>

                <p>
                  Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır
                  metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir
                  hurufat numune kitabı...
                </p>
              </div>

              <div class="item-arrow">
                <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div class="crd-grid">
        <div
          class="crd"
          onClick={() => {
            history.push("/category/sport");
          }}
        >
          <div
            class="crd__background"
            style={{
              backgroundImage: `url(${"https://zst.pila.pl/wp-content/uploads/2021/03/sport.jpg"})`,
            }}
          ></div>
          <div class="crd__content">
            <h3 class="crd__heading">Sports</h3>
          </div>
        </div>

        <div
          class="crd"
          onClick={() => {
            history.push("/category/entertainment");
          }}
        >
          <div
            class="crd__background"
            style={{
              backgroundImage: `url(${"https://media-cdn.tripadvisor.com/media/photo-s/0f/78/39/d0/rooftop.jpg"})`,
            }}
          ></div>
          <div class="crd__content">
            <h3 class="crd__heading">Entertainment</h3>
          </div>
        </div>
      </div>
    </>
  );
}
