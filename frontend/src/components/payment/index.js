import React, { useState } from "react";
import axios from "axios";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import "./payment.css";
import { FormControl} from "react-bootstrap";
 import {FaCcVisa,FaCreditCard} from 'react-icons/fa'
 import {GiPayMoney} from 'react-icons/gi'
 import {FaCcApplePay} from 'react-icons/fa'
 import {  useSelector } from "react-redux";
 import { useParams } from "react-router-dom";

export default function Payment() {
  let thisToken = localStorage.getItem("token");
  const newArr = JSON.parse(localStorage.getItem("newArr"));
  const totalPrice = parseInt(localStorage.getItem("totalPrice"));
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [focused, setFocused] = useState("");
  const [pay, setPay] = useState(false)
  const { busnisses_id } = useParams();
  const state = useSelector((state) => {
    return {
      reservation_date: state.reservation.reservation_date,
      reservation_time: state.reservation.reservation_time,
      token:state.login.token
    };
  });

  const reservation = ()=> {
    
    axios.post(
      `http://localhost:5000/reservations/${busnisses_id}`,
      { reservation_date:state.reservation_date, reservation_time:state.reservation_time },
      {
        headers: {
          authorization: "Bearer " + state.token,
        },
      }
    ).then(result=>{
      console.log("result",result.data);
    }).catch((err) => {
      console.log(err);
    });

  }
  
  /*
    
    */
  return (
    <>

        <div className="h4">
          <h4>inter your credit Card details to continue with your payment</h4>
        </div>
      <div className="parant-payment">
      < div className = "cardchldren">
          <Cards
            number={number}
            name={name}
            expiry={expiry}
            cvc={cvc}
            focused={focused}
          />
          
        </div>
        
        <div className="payment-input">
          <div>
          <FormControl
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
            
          </div>
          <div>

         <FormControl
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
          </div>
          <div>
            

           <FormControl
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
          </div>
          <div>
          <FormControl
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
          </div>

          
        </div>
        
        
      </div>

    
      <div className = "button">
          <button onClick={reservation} >Confirm Payment</button>
          {/* {!pay?<button onClick={payNow}>Confirm Payment</button>:<div>Payment done</div>} */}
          
        </div>
        <div className = "iconspayment">
         < FaCcVisa className="icons"/>
         <FaCreditCard className="icons"/>
         <GiPayMoney className="icons"/>
        <FaCcApplePay className="icons"/>
       </div>
        
    </>
  );
}