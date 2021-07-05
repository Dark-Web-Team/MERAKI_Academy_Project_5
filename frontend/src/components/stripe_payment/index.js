import React from 'react'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from '../payment/checkoutForm';

const promise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const Stripe_payment=({business_id})=>{
    console.log('business1', business_id)
    return(
        <div>
            <Elements stripe = {promise}>
                <CheckoutForm businessId={business_id} />
            </Elements>
        </div>
    )
}

export default Stripe_payment;