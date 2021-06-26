import React,{useState,useEffect} from 'react';
import './category.css';
import {useParams,useHistory,useLocation} from "react-router-dom";
import {useDispatch} from "react-redux";
import axios from 'axios';
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button'
import { setPath } from '../../reducers/lastVisited';

const Category = () => {
    const {type} = useParams();
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();

    const [businesses, setBusinesses] = useState([]);
    const [errMessage, setErrMessage] = useState("");
    const [priceRange, setPriceRange] = useState(10000)

    const getBusinessByType = async ()=>{
        dispatch(setPath(location.pathname));
        try {
            const category_businesses = await axios.get(`http://localhost:5000/business/type/${type}`)
            setBusinesses(category_businesses.data)
       } catch (error) {
           setErrMessage(error.data)
       }
    }


    useEffect(()=>{
        getBusinessByType()
    },[])

    return (
        <div>
            <div className="filter-section">
                <Form>
                <Form.Control
          as="select"
          custom
        >
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="black">Black</option>
          <option value="orange">Orange</option>
        </Form.Control>

                </Form>
                {/* <Form>
  <Form.Group className="mb-3" controlId="formBasicEmail">
  <Form.Select aria-label="Default select example">
  <option>Open this select menu</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
</Form.Select>
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form> */}
            </div>
            <div className="businesses">
            {businesses.map((elem,i)=>{
                return <Card key={i} style={{width:`18rem`}} className="businessCard" onClick={(e)=>{
                    history.push(`/business/${elem.business_id}`)
                }}>
                    <Card.Img variant='top' src={elem.main_img}/>
                    <Card.Body>
                        <Card.Title>{elem.displayName}</Card.Title>
                        <Card.Title>Price:{elem.booking_price}</Card.Title>
                        <Card.Subtitle>{elem.average_rating}</Card.Subtitle>
                    </Card.Body>
                </Card>
            })}
            </div>
            {errMessage}
        </div>
    )
}

export default Category