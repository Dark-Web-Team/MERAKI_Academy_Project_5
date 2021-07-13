import React, { useState, useEffect } from "react";
import "./category.css";
import "./card.css";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import ShowRating from "./ShowRating";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { setPath } from "../../reducers/lastVisited";

const Category = () => {
  const { type } = useParams();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const [businesses, setBusinesses] = useState([]);
  const [errMessage, setErrMessage] = useState("");
  const [priceRange, setPriceRange] = useState("10000");
  const [city, setCity] = useState("all");
  const [page, setPage] = useState(1);
  const [isThereNextPage, setIsThereNextPage] = useState(false);

  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const nextPage = () => {
    if (businesses.length === 8) {
      setPage(page + 1);
    }
  };

  const getBusinessByType = async () => {
    dispatch(setPath(location.pathname));
    try {
      const category_businesses = await axios.get(
        `http://localhost:5000/business/type/${type}/${page}`
      );

      if (category_businesses.data.length === 8) {
        setIsThereNextPage(true);
      } else {
        setIsThereNextPage(false);
      }
      setBusinesses(category_businesses.data);
    } catch (error) {
      setErrMessage(error.data);
    }
  };

  const filterBusinesses = async () => {
    if (priceRange === "10000" && city === "all") {
      getBusinessByType();
      return;
    }

    if (priceRange === "10000") {
      try {
        const filterResult = await axios.get(
          `http://localhost:5000/business/filter1/${type}/${city}/${page}`
        );
        if (filterResult.data.length === 8) {
          setIsThereNextPage(true);
        } else {
          setIsThereNextPage(false);
        }
        setBusinesses(filterResult.data);
      } catch (error) {
        throw error;
      }
      return;
    }

    if (city === "all") {
      try {
        const filterResult = await axios.get(
          `http://localhost:5000/business/filter/${type}/${
            Number(priceRange) - 10
          }/${Number(priceRange) + 10}/${page}`
        );
        if (filterResult.data.length === 8) {
          setIsThereNextPage(true);
        } else {
          setIsThereNextPage(false);
        }
        setBusinesses(filterResult.data);
      } catch (error) {}
      return;
    }

    try {
      const filterResult = await axios.get(
        `http://localhost:5000/business/filter2/${type}/${
          Number(priceRange) - 10
        }/${Number(priceRange) + 10}/${city}/${page}`
      );
      if (filterResult.data.length === 8) {
        setIsThereNextPage(true);
      } else {
        setIsThereNextPage(false);
      }
      setBusinesses(filterResult.data);
    } catch (error) {}
  };

  useEffect(() => {
    getBusinessByType();
  }, []);

  useEffect(() => {
    filterBusinesses();
  }, [priceRange, city, page]);

  return (
    <div className="category_Page">
      <div className="filter_section">
        <Form style={{ width: "15vw" }}>
          <Form.Control
            as="select"
            onChange={(e) => {
              setPriceRange(e.target.value);
            }}
          >
            <option value="10000">choose a price range</option>
            <option value="10">0-20</option>
            <option value="30">20-40</option>
            <option value="50">40-60</option>
            <option value="10000">All Prices</option>
          </Form.Control>
        </Form>

        <Form style={{ width: "15vw" }}>
          <Form.Control
            as="select"
            onChange={(e) => {
              setCity(e.target.value);
            }}
          >
            <option value="all">choose a city</option>
            <option value="zarqa">Zarqa</option>
            <option value="amman">Amman</option>
            <option value="irbid">Irbid</option>
          </Form.Control>
        </Form>
      </div>
      <div className="businesses">
        {businesses.map((elem, i) => {
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
      <div className="paginationButtons">
        {page > 1 ? (
          <a
            href="#"
            className="pagination"
            id="previous"
            onClick={() => previousPage()}
          >
            ❮
          </a>
        ) : (
          ""
        )}
        {isThereNextPage ? (
          <a
            href="#"
            className="pagination"
            id="next"
            onClick={() => nextPage()}
          >
            ❯
          </a>
        ) : (
          ""
        )}
      </div>
      {errMessage}
    </div>
  );
};

export default Category;
