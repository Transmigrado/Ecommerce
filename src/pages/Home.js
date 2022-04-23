import React, { useEffect, useState } from "react";
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

    useEffect(() => {
        loadAllProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const loadAllProducts = () => {
        setLoading(true);
        // sort, order, limit
        getProducts().then((res) => {
            setProducts(res.data.amiibo);
            setLoading(false);
        });
    };

    useEffect(() =>{
        products?.map((res) => {
            console.log(res)
        })
    },[products])

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