import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../functions/product";
import LoadingCard from "../../components/cards/loading-card/LoadingCard";
import ProductCard from "../../components/cards/product-cart/ProductCard";
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import './home.scss'

const Home = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    let dispatch = useDispatch();
    const { product } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        setLoading(true);
        if(product){
            setProducts(product.data.amiibo);
            setLoading(false);
        } else {
            setLoading(false);
            loadAllProducts();
        }
    },[])
    
    const loadAllProducts = () => {
        setLoading(true);
        getProducts().then((res) => {
            setProducts(res.data.amiibo);
            dispatch({
                type: "ADD_PRODUCTS",
                payload: res,
              });
            setLoading(false);
        });
    };
    
    return (
        <Card className="main-container">
            { loading ? (
                <LoadingCard count={12} />
            ) : (
                <Grid container spacing={2} width="90%">
                    {products.map((product, index) => (
                        <Grid key={index} item xs={12} sm={6} md={4} lg={3} >
                            <ProductCard product={product} />
                        </Grid>    
                    ))}
                </Grid>
            )}
       </Card>
    )
}

export default Home;