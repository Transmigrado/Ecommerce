import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LoadingCard from "../components/cards/LoadingCard";
import ProductCard from "../components/cards/ProductCard";
import { getProducts } from "../functions/product";
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';

const maincontainer = {
    display:'flex',
    justifyContent:'center',
    flexDirection:'column',
    alignItems:'center',
    marginTop:'2rem',
    boxShadow:'none'
}

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
        }else{
            setLoading(false);
            loadAllProducts();
        }
           
    },[]);
    
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
        <Card className="cardroot" sx={maincontainer}>
            { loading ? (
                <LoadingCard count={3} />
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
};

export default Home;