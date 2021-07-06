import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import "./rating.css";

export default function Rating({ id, thisToken, setInfo }) {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  return (
    <div>
      <div className="rating">
        {[...Array(5)].map((element, i) => {
          let ratingValue = i + 1;
          return (
            <label>
              <input 
              className="radio-inputForRate"
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() => {
                  setRating(ratingValue);
                  axios
                    .post(
                      `http://localhost:5000/rating/${id}`,
                      {
                        rate: ratingValue,
                      },
                      {
                        headers: {
                          authorization: "Bearer " + thisToken,
                        },
                      }
                    )
                    .then((result) => {
                      setInfo(Math.random());
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
              />
              <FaStar
                size={22}
                color={
                  ratingValue <= (hover || rating) ? "rgb(231, 231, 9)" : "gray"
                }
                onMouseEnter={() => {
                  setHover(ratingValue);
                }}
                onMouseLeave={() => {
                  setHover(null);
                }}
              />
            </label>
          );
        })}
        
      </div>
    </div>
  );
}
