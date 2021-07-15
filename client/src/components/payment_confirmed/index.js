import React from "react";
import "./payment_confirmed.css";
import { useHistory } from "react-router";
import Button from "react-bootstrap/Button";

const PaymentConfirm = () => {
  const history = useHistory();
  return (
    <>
      <div className="donateConfirm">
        <div className="midBox">
          <p className="text1">Reservation confirmed</p>
          <p className="text2">Thank you for using our Services</p>
          <Button
            variant="outline-info"
            size="lg"
            onClick={() => {
              history.push("/");
            }}
          >
            Go to home
          </Button>
        </div>
      </div>
    </>
  );
};

export default PaymentConfirm;
