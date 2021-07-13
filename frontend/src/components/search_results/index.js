import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory, useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { setPath } from "../../reducers/lastVisited";
import ShowRating from "../category/ShowRating";
import "./card.css";
import "./search_results.css";

const Search_results = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { search } = useParams();

  const [results, setResults] = useState([]);
  const [errMessage, setErrMessage] = useState("");
  useEffect(async () => {
    dispatch(setPath(location.pathname));
    try {
      const searchResult = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER}business/search/${search}`
      );
      console.log("results", searchResult);
      setResults(searchResult.data);
    } catch (error) {}
  }, [search]);

  return (
    <>
      <div className="businesses">
        {results.map((elem, i) => {
          return (
            <div
              class="card"
              key={i}
              onClick={(e) => {
                history.push(`/business/${elem.business_id}`);
              }}
            >
              <span
                class="card-header"
                style={{ backgroundImage: `url(${elem.main_img})` }}
              >
                <span class="card-title">
                  <h3>{elem.displayName}</h3>
                </span>
              </span>

              <span class="card-summary">
                Price: {elem.booking_price}
                <br />
                City: {elem.city}
                <ShowRating rate={elem.average_rating} />
              </span>
            </div>
          );
        })}
      </div>
      {errMessage}
    </>
  );
};

export default Search_results;
