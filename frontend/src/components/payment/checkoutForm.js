import React,{useState, useEffect} from 'react';
import {
    CardElement,
    useStripe,
    useElements
  } from "@stripe/react-stripe-js";
import axios from "axios";
import Form from "react-bootstrap/Form"
import './stripe_payment.css';
import { useSelector } from 'react-redux';


const CheckoutForm = ({businessId}) =>{
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState('');

    const stripe = useStripe();
    const elements = useElements();

    const state = useSelector((state) => {
      return {
        reservation_date: state.reservation.reservation_date,
        reservation_time: state.reservation.reservation_time,
        token: state.login.token,
      };
    });

    useEffect(() => {
        axios.post(`${process.env.REACT_APP_BACKEND_SERVER}create-payment-intent`,{
            business_id: Number(businessId)
        })
        .then((response)=>{
            console.log(response)
            setClientSecret(response.data.clientSecret)
        })
        .catch((err)=>{
            console.log(err.response)
        })    
    }, [])

    const cardStyle = {
        style: {
          base: {
            color: "#32325d",
            fontFamily: 'Arial, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
              color: "#32325d"
            }
          },
          invalid: {
            color: "#fa755a",
            iconColor: "#fa755a"
          }
        }
      };

    const handleChange = async (event)=>{
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret,{
            payment_method: {
                card: elements.getElement(CardElement)
            }
        });

        if (payload.error) {
          setError(`Payment failed ${payload.error.message}`);
          setProcessing(false);
        } else {
          setError(null);
          setProcessing(false);
          setSucceeded(true);
          axios
      .post(
        `${process.env.REACT_APP_BACKEND_SERVER}reservations/${businessId}`,
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
        }
    };


    return (
        <div>
            <Form className="payment-form" onSubmit={handleSubmit}>
                <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
                <button
        disabled={processing || disabled || succeeded}
        type="submit">
            <span id="button-text">
          {processing ? (
            <div className="spinner" id="spinner"></div>
          ) : (
            "Pay now"
          )}
        </span>
        </button>
        {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      {/* Show a success message upon completion */}
      <p className={succeeded ? "result-message" : "result-message hidden"}>
        Payment succeeded
      </p>
            </Form>
        </div>
    )
};

export default CheckoutForm;