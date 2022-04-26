import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


const StripeCheckout = () => {

    const dispatch = useDispatch();
    const { cart, coupon } = useSelector((state) => ({ ...state }));

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
 
    const getTotal = () =>
        cart.reduce((curr, next) => curr + next.count * next.finalPrice, 0);
        
    const handleSubmit = () => {
      
        setProcessing(true);
      

        // createOrder(payload, user.token).then((res) => {
         
            // empty cart from local storage
            /*if (typeof window !== "undefined") localStorage.removeItem("cart");
            // empty cart from redux
            dispatch({
                type: "ADD_TO_CART",
                payload: [],
            });*/
        //});

        // empty user cart from redux store and local storage
        
   
        setProcessing(false);
        setSucceeded(true);  
    };


    return (
   
        <Grid container spacing={2} justifyContent='center'>
       
        <Grid item xs={10} sm={10} md={8} lg={5}>
            <h4>Amiibo</h4>
            <hr />
            <p>Products</p>

            {cart.map((c, i) => (
                <Box key={i}>
                    <p>{c.name} x {c.count} = ${c.finalPrice * c.count}</p>
                </Box>
            ))}

            <hr />
            Total: <b>${getTotal()}</b>
            <hr />
            <br />            
       
          
        <Button
            onClick={() => handleSubmit()}
            fullWidth="true"
            variant="contained"
            //disabled={processing || disabled || succeeded}
        >
            <span id="button-text">
                {processing ? <div className="spinner" id="spinner"></div> : "Pagar"}
            </span>
        </Button>
        <br />

        <br />
        <p className={succeeded ? "result-message" : "result-message hidden"}>
            Payment Successful.{" "}
            <Link to="/history">See it in your purchase history.</Link>
        </p>
        </Grid>
        </Grid>
   
    );
};

export default StripeCheckout;
