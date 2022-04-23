/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
//import { Card, Tooltip } from "antd";
//import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
//import laptop from "../../image/laptop.png";
import { Link } from "react-router-dom";
//$WinREAgentimport { showAverage } from "../../functions/rating";
import _ from "lodash";
import { useDispatch } from "react-redux";
import productCard from './productCard.scss'

const ProductCard = ({ product }) => {

  const [tooltip, setTooltip] = useState("Click to add");

  const dispatch = useDispatch();

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

  console.log(product)

  const handleAddToCart = () => {

    // create cart array
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
      // console.log('unique', unique)
      localStorage.setItem("cart", JSON.stringify(unique));
      // show tooltip
      setTooltip("Added");

      // add to reeux state
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

  // destructure
  const { image, name, gameSeries } = product;
 
  return (
    <Card className="product-card" >
      <CardMedia
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


      {/*<Card
        cover={
          <img
            alt="prod-image"
            src={image && image.length ? image[0].url : null}
            style={{ height: "150px", objectFit: "cover" }}
            className="p-1"
          />
        }
        actions={[
          
          <Tooltip amiiboSeries={tooltip}>
            <a onClick={handleAddToCart} disabled={product.quantity < 1}>
              {<ShoppingCartOutlined className="text-danger" />} <br />
              {product.quantity < 1 ? "Out of stock" : "Add to Cart"}
            </a>
          </Tooltip>,
        ]}
      >
        <Meta
          
          gameSeries={`${gameSeries && gameSeries.substring(0, 40)}...`}
        />
      </Card>*/}
    </Card>
  );
};

export default ProductCard;
