import React from "react";
import "./donation_confirmed.css";
import { useHistory } from "react-router";

const PaymentConfirm = ()=>{
    const history=useHistory()
    return (<>
    <div className="donateConfirm">
        <div className="midBox">
        <p className="text1">Thank You For Your Donation</p>
        <button className="homeButton" onClick={()=>{history.push("/")}}>Go to home</button>
        </div>
    </div>
    </>)
}

export default PaymentConfirm;