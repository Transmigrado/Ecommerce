import React, { useState } from "react";
import { useHistory } from "react-router-dom"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import _ from "lodash";
import { useDispatch } from "react-redux";
import './productCard.scss'

const ProductCard = ({ product }) => {

    const [tooltip, setTooltip] = useState("Click to add");

    const dispatch = useDispatch();
    let history = useHistory();

    const  handleClickProduct = (id) =>  history.push(`/product-details/${id}`)

    const randomPrice = (min=1000, max=100000) => {
        let price = Math.random() * (max - min) + min;
        return Math.trunc(price)
    }

    let price = randomPrice()

    const multiple = (price) => {
        return Math.ceil(price / 10) * 10
    }

    let finalPrice = multiple(price);
    product.finalPrice = finalPrice;

    const handleAddToCart = () => {
        let cart = [];
        if (typeof window !== "undefined") {
            // if cart is in local storage GET it
            if (localStorage.getItem("cart")) {
                cart = JSON.parse(localStorage.getItem("cart"));
            }
            // push new product to cart
            cart.push({
                ...product,
                count: 1,
            });
            // remove duplicates
            let unique = _.uniqWith(cart,_.isEqual);
            // save to local storage
            localStorage.setItem("cart", JSON.stringify(unique));
            // show tooltip
            setTooltip("Added");
            // add to redux state
            dispatch({
                type: "ADD_TO_CART",
                payload: unique,
            });
            // show cart items in side drawer
            dispatch({
                type: "SET_VISIBLE",
                payload: true,
            });
        }
    };

    const { image, name, tail } = product;
  
    return (
        <Card className="product-card">
            <CardMedia
                onClick={()=>handleClickProduct(tail)}
                className="image"
                component="img"
                height="300"
                sx={{objectFit: 'contain'}}
                image={image}
                alt={name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Box className="price-contender">
                    <Typography component="div">
                        <Box className="final-price">
                            $ {product.finalPrice}
                        </Box>
                    </Typography>
                    <Box className="add-to-cart-button" onClick={handleAddToCart}>
                        <AddShoppingCartIcon />
                    </Box>
                </Box>        
          </CardContent>

    </Card>
  );
};

export default ProductCard;
