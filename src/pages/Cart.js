import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";
//import { userCart } from "../functions/user";

const Cart = ({ history }) => {

    const dispatch = useDispatch();
    const { cart, user } = useSelector((state) => ({ ...state }));

    const getTotal = () =>
        cart.reduce((curr, next) => curr + next.count * next.price, 0);

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
        <Box className="container-fluid pt-2">
            <Box className="row">
                <Box className="col-md-8">
                    <h4>Cart / {cart.length} Product</h4>

                    {!cart.length ? (
                        <p> No products in cart. <Link to="/shop">Continue Shopping.</Link> </p>
                    ) : (
                        showCartItems()
                    )}

                </Box>
                <Box className="col-md-4">
                    <h4>Order Summary</h4>
                    <hr />
                    <p>Products</p>
                    {cart.map((c, i) => (
                        <Box key={i}>
                            <p>{c.title} x {c.count} = ${c.price * c.count}</p>
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
                </Box>
            </Box>
        </Box>
    );
}

export default Cart
