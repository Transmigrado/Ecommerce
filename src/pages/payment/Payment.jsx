import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckout from "../../components/StripeCheckout";
import "./stripe.scss";

const Payment = () => {
  return (
    <div className="container p-5 text-center">
      <h4>Completa tu compra</h4>
        <div className="stripeCheckout">
          <StripeCheckout />
        </div>
    </div>
  );
};

export default Payment;
