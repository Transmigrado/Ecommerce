import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import _ from "lodash";


const StripeCheckout = () => {

    const dispatch = useDispatch();
    const { checkout } = useSelector((state) => ({ ...state }));
  
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
 
    const getTotal = () =>
        checkout[0].products.reduce((curr, next) => curr + next.count * next.finalPrice, 0);
        
    const handleClickPayment = () => {
        setProcessing(true);
        let order = [];
        if (typeof window !== "undefined") {
            if (localStorage.getItem("order")) {
              order = JSON.parse(localStorage.getItem("order"));
              console.log("order",order)
            }
            order.push({
              ...checkout,
              count: 1,
            });
            let unique = _.uniqWith(order,_.isEqual);
            localStorage.setItem("order", JSON.stringify(unique));
            emptyCart()
        }
    }

    const emptyCart = () => {
        // remove from local storage
        if (typeof window !== "undefined") {
            localStorage.removeItem("cart");
            localStorage.removeItem("checkout");
        }
        // remove from redux
        dispatch({
            type: "ADD_TO_CART",
            payload: [],
        });
        dispatch({
            type: "ADD_TO_CHECKOUT",
            payload: [],
        });
    };

    return (
   
        <Grid container spacing={2} justifyContent='center'>
       
        <Grid item xs={10} sm={10} md={8} lg={5}>
            <h4>Amiibo</h4>
            <hr />
            <p>Nombre: {checkout[0].comprador.name} </p>
            <p>Teléfono: {checkout[0].comprador.phone} </p>
            <p>Correo: {checkout[0].comprador.email} </p>
            <p>Dirección: {checkout[0].comprador.address} </p>
            <hr />
            <p>Products</p>

            {checkout[0].products.map((c, i) => (
                <Box key={i}>
                    <p>{c.name} x {c.count} = ${c.finalPrice * c.count}</p>
                </Box>
            ))}

            <hr />
            Total: <b>${getTotal()}</b>
            <hr />
            <br />            
       
          
        <Button
            onClick={() => handleClickPayment()}
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
