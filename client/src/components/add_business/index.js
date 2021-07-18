import React, { useState } from "react";
import {  useHistory } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import "./add_business.css";
import Alert from "react-bootstrap/Alert";
import Map from './../googleMap/index'

const AddBusiness = () => {
  const [displayName, setDisplayName] = useState("");
  const [description, setDescription] = useState("");
  const [bookingPrice, setBookingPrice] = useState(0);
  const [city, setCity] = useState("amman");
  const [openingTime, setOpeningTime] = useState("");
  const [closingTime, setClosingTime] = useState("");
  const [type, setType] = useState("sport");
  const [main_img, setMain_img] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [errPresent, setErrPresent] = useState(false);
  const [businessCheck, setBusinessCheck] = useState('Please enter your business name')
  const [marker, setMarker] = useState([]);
  const user_id = useSelector(state => state.login.user_id)
  const [validated, setValidated] = useState(false);

  const history = useHistory()

  const handleSubmit = async (event) => {
      const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      return
    } else {

    setValidated(true);
    event.preventDefault();
    
    try {
      const addConfirm = await axios.post(
        `/business`,
        {
          displayName,
          description,
          booking_price:bookingPrice,
          city,
          opening_time:openingTime,
          closing_time:closingTime,
          type,
          main_img,
          owner_id: user_id,
          lat:marker[0].lat,
          lng:marker[0].lng
        }
      );
      if (addConfirm.status === 201 ){
        history.push(`/business/${addConfirm.data.id}`)
      }
      
      if (addConfirm.data.code === `ER_DUP_ENTRY`){
        setBusinessCheck(`business name already exists`);
        
      }
    }
     catch (err) {
      setErrPresent(true);
      setErrMessage(err.response.data);
    }
}
  };

  return (
    <>
      <div className="addBusinss">
        <Form className="addForm" noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Business Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter business name"
              onChange={(e) => {
                setDisplayName(e.target.value);
              }}
              required
            />
            <Form.Control.Feedback type="invalid">
              {businessCheck}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Select Business Type</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => {
                setType(e.target.value);
              }}
              required
            >
              <option value="sport">Sport</option>
              <option value="entertainment">Entertainment</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Please choose your business type.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Select City</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => {
                setCity(e.target.value);
              }}
              required
            >
              <option value="amman">Amman</option>
              <option value="zarqa">Zarqa</option>
              <option value="irbid">Irbid</option>
              <option value="salt">Salt</option>
              <option value="karak">Karak</option>
              <option value="jarash">Jarash</option>
              <option value="ajloun">Ajloun</option>
              <option value="mafraq">Mafraq</option>
              <option value="ma'an">Ma'an</option>
              <option value="tafeleih">Tafeleih</option>
              <option value="madaba">Madaba</option>
              <option value="aqaba">Aqaba</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Please choose a city.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Booking Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Booking Price"
              onChange={(e) => {
                setBookingPrice(parseInt(e.target.value));
              }}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter a booking price.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Opening Time</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => {
                setOpeningTime(e.target.value);
              }}
              required
            >
              <option value="12 pm">12:00 PM</option>
              <option value="1 pm">1:00 PM</option>
              <option value="2 pm">2:00 PM</option>
              <option value="3 pm">3:00 PM</option>
              <option value="4 pm">4:00 PM</option>
              <option value="5 pm">5:00 PM</option>
              <option value="6 pm">6:00 PM</option>
              <option value="7 pm">7:00 PM</option>
              <option value="8 pm">8:00 PM</option>
              <option value="9 pm">9:00 PM</option>
              <option value="10 pm">10:00 PM</option>
              <option value="11 pm">11:00 PM</option>
              <option value="12 am">12:00 AM</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Please choose an opening time.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Closing Time</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => {
                setClosingTime(e.target.value);
              }}
              required
            >
              <option value="12 pm">12:00 PM</option>
              <option value="1 pm">1:00 PM</option>
              <option value="2 pm">2:00 PM</option>
              <option value="3 pm">3:00 PM</option>
              <option value="4 pm">4:00 PM</option>
              <option value="5 pm">5:00 PM</option>
              <option value="6 pm">6:00 PM</option>
              <option value="7 pm">7:00 PM</option>
              <option value="8 pm">8:00 PM</option>
              <option value="9 pm">9:00 PM</option>
              <option value="10 pm">10:00 PM</option>
              <option value="11 pm">11:00 PM</option>
              <option value="12 am">12:00 AM</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Please choose a closing time.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Main Business Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Main Image"
              onChange={(e) => {
                setMain_img(e.target.value);
              }}
              required
            />
             <Form.Control.Feedback type="invalid">
              Please enter a main image URL.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Description of Business</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              required
            />
             <Form.Control.Feedback type="invalid">
              Please enter a brief description of your business.
            </Form.Control.Feedback>
          </Form.Group>
          <Map  marker = {marker} setMarker = {setMarker} />
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
          {errPresent && (
            <div>
              <br />{" "}
              <Alert
                variant="danger"
                style={{ width: "35vw", textAlign: "center" }}
              >
                {errMessage}
              </Alert>
            </div>
          )}
        </Form>
       
      </div>
    </>
  );
};

export default AddBusiness;
