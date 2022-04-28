import React,{ useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { getProductsById } from '../../functions/product';
import DetailsCard from '../../components/cards/DetailsCard'

const ProductDetails = () => {

    let { id } = useParams();
    const [details, setDetails] = useState([]);

    useEffect(() => {
        getProductsById(id).then((res) => {
            let info = res.data.amiibo;
            info.finalPrice =8000
            setDetails(info)
        })
    },[id])

    return(
        <>
            <DetailsCard 
                name={details.name}
                image={details.image}
                finalPrice={details.finalPrice} 
            />
        </>
    )
}

export default ProductDetails