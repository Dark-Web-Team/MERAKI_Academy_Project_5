import React, { useState } from "react";
import "react-credit-cards/es/styles-compiled.css";
import "./payment.css";
import { Button } from "react-bootstrap";
import { FaCcVisa, FaCreditCard } from "react-icons/fa";
import { GiPayMoney } from "react-icons/gi";
import { FaCcApplePay } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./checkoutForm";

const promise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

export default function Payment() {
  const { busnisses_id } = useParams();

  const history = useHistory();

  const state = useSelector((state) => {
    return {
      reservation_date: state.reservation.reservation_date,
      reservation_time: state.reservation.reservation_time,
      token: state.login.token,
    };
  });

  return (
    <>
      {state.reservation_date ? (
        <div>
          {" "}
          <div className="h4">
            <h4>
              enter your credit Card details to continue with your payment
            </h4>
          </div>
          <div className="parant-payment">
            <div className="online_payment">
              <Elements stripe={promise}>
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
        </div>
      ) : (
        <div className="donateConfirm">
          <div className="midBox">
            <p className="text1">Something went wrong with your request</p>
            <p className="text2">It happens to the best of us</p>
            <Button
              variant="outline-info"
              size="lg"
              onClick={() => {
                history.goBack();
              }}
            >
              Go Back
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
