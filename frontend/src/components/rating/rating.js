import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { FaStar } from "react-icons/fa";
import axios from "axios";
import "./rating.css";
import { useDispatch, useSelector } from "react-redux";


export default function Rating({ id, thisToken, setInfo }) {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const history = useHistory()
  const state = useSelector((state) => {
    return {
      token: state.login.token,
    };
  });
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
                  if (state.token){
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
                  }else{
                    history.push("/login")
                  }
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
