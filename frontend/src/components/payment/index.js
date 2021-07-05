import React, { useState } from "react";
import axios from "axios";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import "./payment.css";
import {  Form } from "react-bootstrap";
import { FaCcVisa, FaCreditCard } from "react-icons/fa";
import { GiPayMoney } from "react-icons/gi";
import { FaCcApplePay } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from './checkoutForm';

const promise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

export default function Payment() {
  let thisToken = localStorage.getItem("token");
  const newArr = JSON.parse(localStorage.getItem("newArr"));
  const totalPrice = parseInt(localStorage.getItem("totalPrice"));
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [focused, setFocused] = useState("");
  const [pay, setPay] = useState(false);
  const { busnisses_id } = useParams();
  const [saveCard, setSaveCard] = useState(false);



  const state = useSelector((state) => {
    return {
      reservation_date: state.reservation.reservation_date,
      reservation_time: state.reservation.reservation_time,
      token: state.login.token,
    };
  });

  const reservation = () => {
    axios
      .post(
        `http://localhost:5000/reservations/${busnisses_id}`,
        {
          reservation_date: state.reservation_date,
          reservation_time: state.reservation_time,
        },
        {
          headers: {
            authorization: "Bearer " + state.token,
          },
        }
      )
      .then((result) => {
        console.log("result", result.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .post(
        `${process.env.REACT_APP_BACKEND_SERVER}sendEmail`,
        {
          date: state.reservation_date,
          time: state.reservation_time,
        },
        {
          headers: {
            authorization: "Bearer " + state.token,
          },
        }
      )
      .then((result) => {
        console.log("sent successfully");
      })
      .catch((err) => {
        console.log(err);
      });

      if(saveCard){
        axios.post(`${process.env.REACT_APP_BACKEND_SERVER}creditCards`,{
          cardNumber: number,
          cardHolder: name,
          expiryDate: expiry
        },
        {
          headers: {
            authorization: "Bearer " + state.token,
          },
        })
        .then((response)=>{
          console.log('card added')
        })
        .catch((err)=>{
          console.log(err)
        })
      }
  };

  /*
    
    */
  return (
    <>
      <div className="h4">
        <h4>enter your credit Card details to continue with your payment</h4>
      </div>
      {/* <div className="parant-payment">
        <div className="cardchldren">
          <Cards
            number={number}
            name={name}
            expiry={expiry}
            cvc={cvc}
            focused={focused}
          />
        </div>

        <Form className="payment-input">
          <Form.Group>
            <Form.Control
              type='text'
              name="number"
              placeholder="number"
              aria-label="Large"
              aria-describedby="inputGroup-sizing-sm"
              onChange={(e) => {
                setNumber(e.target.value);
              }}
              onFocus={(e) => {
                setFocused(e.target.name);
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type='text'
              name="name"
              placeholder="Name"
              aria-label="Large"
              aria-describedby="inputGroup-sizing-sm"
              onChange={(e) => {
                setName(e.target.value);
              }}
              onFocus={(e) => {
                setFocused(e.target.name);
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type='text'
              name="expiry"
              placeholder="MM/YY expiry"
              aria-label="Large"
              aria-describedby="inputGroup-sizing-sm"
              onChange={(e) => {
                setExpiry(e.target.value);
              }}
              onFocus={(e) => {
                setFocused(e.target.name);
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type='text'
              name="cvc"
              placeholder="Cvc"
              aria-label="Large"
              aria-describedby="inputGroup-sizing-sm"
              onChange={(e) => {
                setCvc(e.target.value);
              }}
              onFocus={(e) => {
                setFocused(e.target.name);
              }}
            />
            <Form.Group>
              <Form.Check type="checkbox" label="Save Credit Card" onChange={()=>{
                console.log(saveCard)
                setSaveCard(!saveCard)
              }} />
            </Form.Group>
          </Form.Group>
        </Form>
      </div> */}

      {/* <div className="button">
        <button onClick={reservation}>Confirm Payment</button>
      </div> */}
      <div className='parant-payment'>
      <div className='online_payment'>
            <Elements stripe = {promise}>
                <CheckoutForm businessId={busnisses_id} />
            </Elements>
        </div>
        </div>
      <div className="iconspayment">
        <FaCcVisa className="icons" />
        <FaCreditCard className="icons" />
        <GiPayMoney className="icons" />
        <FaCcApplePay className="icons" />
      </div>
    </>
  );
}
