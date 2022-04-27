import React,{ useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { getProductsById } from '../../functions/product';
import DetailsCard from '../../components/cards/DetailsCard'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const ProductDetails = () => {

    let { id } = useParams();
    const [details, setDetails] = useState([]);
    const [loading, setLoading] = useState(false);
    
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