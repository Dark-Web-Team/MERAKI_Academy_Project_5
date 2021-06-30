import React, { useState } from "react";
import axios from "axios";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import "./payment.css";
import {
    FormControl
   
  } from "react-bootstrap";

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

  
  /*
    
    */
  return (
    <>
      <div>
        <div className="h4">
          <h4>inter your credit Card details to continue with your payment</h4>
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
        <div>
          <Cards
            number={number}
            name={name}
            expiry={expiry}
            cvc={cvc}
            focused={focused}
          />
        </div>
        <div className = "button">
          {/* {!pay?<button onClick={payNow}>Confirm Payment</button>:<div>Payment done</div>} */}
          
        </div>
      </div>
    </>
  );
}