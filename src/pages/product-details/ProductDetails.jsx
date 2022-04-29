import React,{ useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProductsById } from '../../functions/product';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import _ from "lodash";
import './product-details.scss'

const ProductDetails = () => {

    let { id } = useParams();
    const [details, setDetails] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        getProductsById(id).then((res) => {
            let info = res.data.amiibo;
            info.finalPrice =8000
            setDetails(info)
        })
    },[id])

    const handleAddToCart = () => {
        let cart = [];
        if (typeof window !== "undefined") {
            // if cart is in local storage GET it
            if (localStorage.getItem("cart")) {
                cart = JSON.parse(localStorage.getItem("cart"));
            }
            // push new product to cart
            cart.push({
                ...details,
                count: 1,
            });
            // remove duplicates
            let unique = _.uniqWith(cart,_.isEqual);
            // save to local storage
            localStorage.setItem("cart", JSON.stringify(unique));
            // show tooltip
            //setTooltip("Added");
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

    return(
        <Box className="product-details-container">
            <Grid container spacing={2} width="90%">
                <Grid item xs={12} sm={12} md={12} lg={6}>
                    <Card className="cart-item-details">
                        <CardMedia
                            className="image-details"
                            component="img"
                            height="500"
                            sx={{objectFit: 'contain'}}
                            image={details.image}
                            alt={details.name}
                        />
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={4} >
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {details.name}
                        </Typography>
                        <hr />
                        <Box className="price-contender">
                            <Typography component="div">
                                <Box className="final-price">
                                $ {details.finalPrice}
                                </Box>
                                <Button
                                    variant="contained"
                                    className="btn-add-to-cart-button"
                                    onClick={() => handleAddToCart()}
                                >
                                    Agregar al carro
                                </Button>
                            </Typography>
                        </Box>        
                    </CardContent>
                </Grid>  
            </Grid>
        </Box>
    )
}

export default ProductDetails