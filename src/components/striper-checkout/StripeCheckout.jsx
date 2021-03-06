import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import _ from "lodash";
import './striper-checkout.scss'

const StripeCheckout = () => {

    const dispatch = useDispatch();
    const { checkout } = useSelector((state) => ({ ...state }));
    const [succeeded, setSucceeded] = useState(false);
 
    const getTotal = () =>
        checkout[0]?.products.reduce((curr, next) => curr + next.count * next.finalPrice, 0);
        
    const handleClickPayment = () => {
       
        let order = [];
        if (typeof window !== "undefined") {
            if (localStorage.getItem("order")) {
              order = JSON.parse(localStorage.getItem("order"));
            }
            order.push({
              ...checkout,
              count: 1,
            });
            let unique = _.uniqWith(order,_.isEqual);
            localStorage.setItem("order", JSON.stringify(unique));
            // add to redux state
            dispatch({
                type: "ADD_TO_ORDER",
                payload: unique,
            });
            emptyCart()
            setSucceeded(true)
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
                <p>Nombre: {checkout[0]?.comprador?.name} </p>
                <p>Tel??fono: {checkout[0]?.comprador?.phone} </p>
                <p>Correo: {checkout[0]?.comprador?.email} </p>
                <p>Direcci??n: {checkout[0]?.comprador?.address} </p>
                <hr />
                <p>Products</p>

                {checkout[0]?.products?.map((c, i) => (
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
                    disabled={!checkout.length}
                    className="btn-pagar"
                >
                    <span>
                    Pagar
                    </span>
                </Button>
                <br />

                <br />
            
                {succeeded ?  
                    <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert className="pago-success" severity="success">Pago exitoso.{" "}  <Link to="/history">Ver en su historial de compras.</Link> </Alert>
                    </Stack>
                : null}           

            </Grid>
        </Grid>
   
    );
};

export default StripeCheckout;
