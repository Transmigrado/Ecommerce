import React from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";
import Card from '@mui/material/Card';
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

//import { userCart } from "../functions/user";
import './cart.scss'

const Cart = ({ history }) => {

    const dispatch = useDispatch();
    const { cart, user } = useSelector((state) => ({ ...state }));

    const getTotal = () =>
        cart.reduce((curr, next) => curr + next.count * next.finalPrice, 0);

    const thenEndpointAction = (res) => {
        console.log("CART POST RES", res);
        return res.data.ok && history.push("/checkout");
    };

    const catchEndpointAction = (err) => console.log("cart save err", err);

    const saveOrderToDb = () => {
        /*userCart(cart, user.token)
        .then((res) => thenEndpointAction(res))
        .catch((err) => catchEndpointAction(err));*/
    };

    const saveCashOrderToDb = () => {
        /*dispatch({ type: "COD", payload: true });
        userCart(cart, user.token)
            .then((res) => thenEndpointAction(res))
            .catch((err) => catchEndpointAction(err));*/
    };

    const showCartItems = () => (
        cart.map((p) => (
            <Box paddingTop={5}>
                <ProductCardInCheckout key={p._id} p={p} />
            </Box>
        ))
    );

    return (
        <Box className="box-container">
            <Box className="box-subcontainer">
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12} lg={8}>
                        <Card className="cart-items">
                            <h4>Cart / {cart.length} Product</h4>

                            {!cart.length ? (
                                <p> No products in cart. <Link to="/shop">Continue Shopping.</Link> </p>
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
                                    <p>{c.title} x {c.count} = ${c.finalPrice * c.count}</p>
                                </Box>
                            ))}
                            <hr />
                            Total: <b>${getTotal()}</b>
                            <hr />
                            {user ? (
                            <>
                                <button
                                    onClick={saveOrderToDb}
                                    className="btn btn-sm btn-primary mt-2"
                                    disabled={!cart.length}
                                >
                                    Proceed to Checkout
                                </button>
                                <br />
                                <button
                                    onClick={saveCashOrderToDb}
                                    className="btn btn-sm btn-warning mt-2"
                                    disabled={!cart.length}
                                >
                                    Pay Cash on Delivery
                                </button>
                            </>
                            ) : (
                            <button className="btn btn-sm btn-primary mt-2">
                                <Link
                                    to={{
                                        pathname: "/login",
                                        state: { from: "cart" },
                                    }}
                                >
                                    Login to Checkout
                                </Link>
                            </button>
                            )}
                        </Card>
                    </Grid>    
                </Grid>
            </Box>
        </Box>
    );
}

export default Cart
