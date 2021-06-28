import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
import "./add_business.css";
import Alert from "react-bootstrap/Alert";

const AddBusiness = () => {
  const [displayName, setDisplayName] = useState("");
  const [description, setDescription] = useState("");
  const [bookingPrice, setBookingPrice] = useState(0);
  const [city, setCity] = useState("");
  const [openingTime, setOpeningTime] = useState("");
  const [closingTime, setClosingTime] = useState("");
  const [type, setType] = useState("");
  const [main_img, setMain_img] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [errPresent, setErrPresent] = useState(false);

  const { id } = useParams();

  const handleSubmit = async () => {
      if (displayName === "" || description === "" || bookingPrice === "" || city === "" || openingTime === "" || closingTime === "" || type === "" || main_img === ""){
        setErrPresent(true);
        setErrMessage(`please fill all fileds`);
        return
      }
    try {
      const addConfirm = await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER}business`,
        {
          displayName,
          description,
          bookingPrice,
          city,
          openingTime,
          closingTime,
          type,
          main_img,
          owner_id: id,
        }
      );
      if (addConfirm.data.code === `ER_DUP_ENTRY`){
        setErrPresent(true);
        setErrMessage(`business name already exists`);
      }
    } catch (err) {
      console.log(err.response);
      setErrPresent(true);
      setErrMessage(err.response.data);
    }
  };

  return (
    <>
      <div className="addBusinss">
        <Form className="addForm">
          <Form.Group>
            <Form.Label>Business Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter business name"
              onChange={(e) => {
                setDisplayName(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Select Business Type</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => {
                setType(e.target.value);
              }}
            >
              <option value="sport">Sport</option>
              <option value="entertainment">Entertainment</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Select City</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => {
                setCity(e.target.value);
              }}
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
          </Form.Group>
          <Form.Group>
            <Form.Label>Booking Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Booking Price"
              onChange={(e) => {
                setBookingPrice(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Opening Time</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Opening Time"
              onChange={(e) => {
                setOpeningTime(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Closing Time</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Closing Time"
              onChange={(e) => {
                setClosingTime(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Main Business Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Main Image"
              onChange={(e) => {
                setMain_img(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description of Business</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </Form.Group>
        </Form>
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
      </div>
    </>
  );
};

export default AddBusiness;
