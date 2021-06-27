import React, { useState, useEffect } from "react";
import "./category.css";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import Card from "react-bootstrap/Card";
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
  const [city, setCity] = useState("");


  const getBusinessByType = async () => {
    dispatch(setPath(location.pathname));
    try {
      const category_businesses = await axios.get(
        `http://localhost:5000/business/type/${type}`
      );
      setBusinesses(category_businesses.data);
    } catch (error) {
      setErrMessage(error.data);
    }
  };

  const filterBusinesses = async ()=>{
    if(priceRange === "10000"){
      getBusinessByType()
    }else{
      try {
          const filterResult = await axios.get(`http://localhost:5000/business/filter/${type}/${Number(priceRange)-10}/${Number(priceRange)+10}`);
          setBusinesses(filterResult.data);
      } catch (error) {

      }
    }
  }

  useEffect(() => {
    getBusinessByType();
  }, []);

    useEffect(() => {
      filterBusinesses();
    }, [priceRange,city]);

  return (
    <div>
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
            <option >choose a city</option>
            <option value="zarqa">Zarqa</option>
            <option value="amman">Amman</option>
            <option value="irbid">Irbid</option>
            {/* <option value="10000">All Prices</option> */}
          </Form.Control>
        </Form>

      </div>
      <div className="businesses">
        {businesses.map((elem, i) => {
          return (
            <Card
              key={i}
              style={{ width: `18rem` }}
              className="businessCard bg-dark text-white box"
              id="businessCard"
              onClick={(e) => {
                history.push(`/business/${elem.business_id}`);
              }}
            >
              <Card.Img variant="top" src={elem.main_img} />
              <Card.Body>
                <Card.Title>{elem.displayName}</Card.Title>
                <Card.Title>Price:{elem.booking_price}</Card.Title>
                <Card.Subtitle>{elem.average_rating}</Card.Subtitle>
              </Card.Body>
            </Card>
          );
        })}
      </div>
      {errMessage}
    </div>
  );
};

export default Category;
