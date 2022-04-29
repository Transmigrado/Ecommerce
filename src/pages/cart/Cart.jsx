import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductCardInCheckout from "../../components/cards/product-cart-checkout/ProductCardInCheckout";
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import './cart.scss'

const Cart = ({ history }) => {

    const { cart } = useSelector((state) => ({ ...state }));

    const getTotal = () =>
        cart.reduce((curr, next) => curr + next.count * next.finalPrice, 0);

    const thenEndpointAction = () => history.push("/checkout");
  
    const showCartItems = () => (
        cart.map((p) => (
            <Box paddingTop={5}>
                <ProductCardInCheckout key={p._id} p={p} />
            </Box>
        ))
    )

    return (
        <Box className="box-container">
            <Box className="box-subcontainer">
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12} lg={8}>
                        <Card className="cart-items">
                            <h4>Productos en el carro / {cart.length}</h4>

                            {!cart.length ? (
                                <p> No products in cart. <Link to="/">Continue Shopping.</Link> </p>
                            ) : (
                                showCartItems()
                            )}
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={4} >
                        <Card className="order-summary-container">
                            <h4>Order Summary</h4>
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
                          
                            <Button
                                variant="contained"
                                className="btn-add-to-cart"
                                disabled={!cart.length}
                                onClick={thenEndpointAction}
                            >
                                Ir a pagar
                            </Button>
                            <br />
                        </Card>
                    </Grid>    
                </Grid>
            </Box>
        </Box>
    );
}

export default Cart
