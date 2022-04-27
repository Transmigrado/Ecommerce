import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { validateEmail } from '../../functions/validateEmail'
import { toast } from "react-toastify";
import _ from "lodash";
import "react-quill/dist/quill.snow.css";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import "./checkout.scss"

const defaultValue = () => {
    return {
        name:'',
        phone:'',
        email:'',
        address: ''
    }
}

const Checkout = ({ history }) => {
    const [ products, setProducts ] = useState([]);
    const [ total, setTotal ] = useState(0);
    const [ formData, setFormData ] = useState(defaultValue())
    const [ formError, setFormError ] = useState({})

    const dispatch = useDispatch();
    const { cart } = useSelector((state) => ({ ...state }));
    const { checkout } = useSelector((state) => ({ ...state }));
    const [ checking, setChecking ] = useState(true)

    const [ name, setName] = useState()
    const [ phone, setPhone ] = useState()
    const [ email, setEmail ] = useState()
    const [ address, setAddress] = useState()
   
    const thenEndpointAction = () => history.push("/payment");

    useEffect(() =>{
        if(cart){
            setProducts(cart)
            let total = cart.reduce((curr, next) => curr + next.count * next.finalPrice, 0);
            setTotal(total)
        }
    },[cart])

    useEffect(() => {
        setName(checkout[0]?.comprador?.name)
        setPhone(checkout[0]?.comprador?.phone)
        setEmail(checkout[0]?.comprador?.email)
        setAddress(checkout[0]?.comprador?.address)

        setFormData({
            ... formData, 
            name: checkout[0]?.comprador?.name, 
            phone: checkout[0]?.comprador?.phone,
            email: checkout[0]?.comprador?.email,
            address: checkout[0]?.comprador?.address
        })
        setChecking(false)
    },[checkout])
    
    const emptyCart = () => {
        // remove from local storage
        if (typeof window !== "undefined") {
            localStorage.removeItem("cart");
            localStorage.removeItem("checkout");
        }
        // remove from redux
        dispatch({
            type: "ADD_TO_CART",
            payload: [],
        });
        dispatch({
            type: "ADD_TO_CHECKOUT",
            payload: [],
        });

    };

    const handleOrder = () => {
        let error = {}
        if(!formData.name || !formData.phone || !formData.email || !formData.address){
            if(!formData.name) error.name = true;
            if(!formData.phone) error.phone = true;
            if(!formData.email) error.email = true;
            if(!formData.address) error.address = true;
        } else if (!validateEmail(formData.email)) {
            error.email = true;
        } else {

            let checkoutInfo = {
                comprador:formData,
                products: products
            }
            let checkout = [];

            if (typeof window !== "undefined") {
                if (localStorage.getItem("checkout")) {
                    checkout = JSON.parse(localStorage.getItem("checkout"));
                }
                if(checkout.length === 0){
                    checkout.push({
                        ...checkoutInfo,
                        count: 1,
                    });
                } else {
                    products.map((res) => {
                        let products = checkout[0].products;
                        let exists = products.filter((response) => response.tail === res.tail)
                        if(exists.length === 0){
                            checkout[0].products.push({
                                ...res,
                                count: 1,
                            })
                        }
                    })
                }
            
                let unique = _.uniqWith(checkout,_.isEqual);
        
                localStorage.setItem("checkout", JSON.stringify(unique));
                
                dispatch({
                    type: "ADD_TO_CHECKOUT",
                    payload: unique,
                });
                thenEndpointAction()
            }
            
        }
            setFormError(error)
    }

    const showProductSummary = () =>
        products.map((p, i) => (
            <Box key={i}>
                <p>
                    {p.name} ({p.color}) x {p.count} ={" "}
                    {p.finalPrice * p.count}
                </p>
            </Box>
        ));

    if(checking) return null
    return (
        <Box className="main-payment-container">
            <Card className="checkout-container">
                
                <Grid container spacing={4} padding={5} >
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                    <h4>Datos del comprador</h4>
                        <hr />
                    <Box sx={{'& > :not(style)': {  width: '100%' },}}>
                        <TextField
                            defaultValue={ name ? name : ""}
                            error={formError.name ? true : false } 
                            id="standard-basic" 
                            label="Nombre" 
                            variant="standard" 
                            onChange={(e) => setFormData({... formData, name: e.target.value})}
                        />
                        <TextField
                            defaultValue={ phone ? phone : ""}
                            error={formError.phone ? true : false }
                            id="standard-basic" 
                            label="Teléfono" 
                            variant="standard" 
                            onChange={(e) => setFormData({... formData, phone: e.target.value})}
                        />

                        <TextField
                            defaultValue={ email ? email : ""}
                            error={formError.email ? true : false } 
                            id="standard-basic" 
                            label="Correo" 
                            variant="standard" 
                            onChange={(e) => setFormData({... formData, email: e.target.value})}
                        />

                        <TextField
                            defaultValue={ address ? address : ""}
                            error={formError.address ? true : false } 
                            id="standard-basic" 
                            label="Dirección de entrega" 
                            variant="standard" 
                            onChange={(e) => setFormData({... formData, address: e.target.value})}
                        />
                       
                    </Box>
                       
                    <br/>
                    <br/>
                    <br/>
                     
                      
                   
                        <h4>Resumen del pedido</h4>
                        <hr />
                        <p>Products {products.length}</p>
                        <hr />
                        {showProductSummary()}
                        <hr />
        
                        <p>Cart Total: {total}</p>


                        <Box className="btn-order-summary">
                            <Box className="box-btn-order">
                                <Button
                                    onClick={ () => handleOrder()}
                                    variant="contained"
                                    className="btn-order"
                                    disabled={!products.length}
                                    //onClick={() => history.push("/payment")}
                                >
                                    Realizar pedido
                                </Button>
                            </Box>

                            <Box className="btn-empty-cart">
                                <Button
                                    variant="contained"
                                    disabled={!products.length}
                                    onClick={emptyCart}
                                    className="btn-empty-cart"
                                >
                                    Vaciar carro
                                </Button>
                            </Box>
                        </Box>
                    </Grid> 
                </Grid>
            </Card>
        </Box> 
    );
};

export default Checkout;
