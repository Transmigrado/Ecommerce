import React from "react";
import StripeCheckout from "../../components/striper-checkout/StripeCheckout";
import Typography from '@mui/material/Typography';
import "./stripe.scss";

const Payment = () => {
  return (
    <div className="payment-container">
        <Typography gutterBottom variant="h1" component="div" fontSize={20} justifyContent='center'display='flex' >
          Completa tu compra
        </Typography>
        <div className="stripeCheckout">
          <StripeCheckout />
        </div>
    </div>
  );
};

export default Payment;
