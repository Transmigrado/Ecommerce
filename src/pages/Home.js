import React, { useEffect, useState } from "react";
import LoadingCard from "../components/cards/LoadingCard";
import { getProducts } from "../functions/product";

const Home = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadAllProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadAllProducts = () => {
        setLoading(true);
        // sort, order, limit
        getProducts().then((res) => {
            setProducts(res.data);
            setLoading(false);
            console.log(res.data);
        });
    };

    return (
        <div className="container">
            { loading ? (
                <LoadingCard count={3} />
            ) : (
                <div className="row">
                    {products.map((product) => (
                        <div key={product._id} className="col-md-4">
                            {/*<ProductCard product={product} />*/}
                        </div>
                    ))}
                </div>
            )}
        </div>  
    )
};

export default Home;