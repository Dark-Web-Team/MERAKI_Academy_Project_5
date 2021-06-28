import React,{useState} from "react";
import axios from "axios";
import Form  from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./add_business.css"

const AddBusiness = ()=>{
    const [displayName, setDisplayName] = useState('');
    const [description, setDescription] = useState('');
    const [bookingPrice, setBookingPrice] = useState(0);
    const [city, setCity] = useState('');
    const [openingTime, setOpeningTime] = useState('');
    const [closingTime, setClosingTime] = useState('');
    const [type, setType] = useState('');
    const [main_img, setMain_img] = useState('')

    const {id} = useParams();

    return(<>
    <div className='addBusinss'>
        <Form className="addForm">
            <Form.Group>
                <Form.Label>Business Name</Form.Label>
                <Form.Control type="text" placeholder="Enter business name" onChange={(e)=>{
        setDisplayName(e.target.value)
    }} />
            </Form.Group>
            <Form.Group>
            <Form.Label>Select Business Type</Form.Label>
    <Form.Control as="select" onChange={(e)=>{
        setType(e.target.value)
    }}>
      <option value="sport">sport</option>
      <option value="indoor_entertainment">indoor_entertainment</option>
      <option value="indoor_entertainment">indoor_entertainment</option>
    </Form.Control>
  </Form.Group>
            <Form.Group>
    <Form.Label>Select City</Form.Label>
    <Form.Control as="select" onChange={(e)=>{
        setCity(e.target.value)
    }}>
      <option value="amman">amman</option>
      <option value="zarqa">zarqa</option>
      <option value="irbid">irbid</option>
      <option value="salt">salt</option>
      <option value="karak">karak</option>
      <option value="jarash">jarash</option>
      <option value="ajloun">ajloun</option>
      <option value="mafraq">mafraq</option>
      <option value="ma'an">ma'an</option>
      <option value="tafeleih">tafeleih</option>
      <option value="madaba">madaba</option>
      <option value="aqaba">aqaba</option>
    </Form.Control>
  </Form.Group>
            <Form.Group>
                <Form.Label>Booking Price</Form.Label>
                <Form.Control type="number" placeholder="Enter Booking Price" onChange={(e)=>{
        setBookingPrice(e.target.value)
    }} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Opening Time</Form.Label>
                <Form.Control type="text" placeholder="Enter Opening Time" onChange={(e)=>{
        setOpeningTime(e.target.value)
    }} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Closing Time</Form.Label>
                <Form.Control type="text" placeholder="Enter Closing Time" onChange={(e)=>{
        setClosingTime(e.target.value)
    }} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Main Business Image</Form.Label>
                <Form.Control type="text" placeholder="Enter Main Image" onChange={(e)=>{
        setMain_img(e.target.value)
    }} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description of Business</Form.Label>
              <Form.Control as="textarea" rows={3} onChange={(e)=>{
        setDescription(e.target.value)
    }} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
        </Form>
    </div>
    </>)
}

export default AddBusiness