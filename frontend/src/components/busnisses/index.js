import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./style.css";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

export default function Busnisses() {
  const [pictures, setPictures] = useState([]);
  const [errMessage, setErrMessage] = useState("");
  const { id } = useParams();
  let arr;
  const getimages = async () => {
    try {
      const picture = await axios.get(`http://localhost:5000/image/${id}`);
      arr = picture.data.map((elem, i) => {
        return { original: elem.image, thumbnail: elem.image };
      });
      setPictures(arr);
    } catch (error) {
        setErrMessage(error.data);
    }
  };
  useEffect(() => {
    getimages();
  }, []);
  return (
    <>
      <div className="parent">
        <div className="gallery">
          <ImageGallery items={pictures} />
          {errMessage}
        </div>
        <div className="information">kkkkkk</div>
      </div>
    </>
  );
}
