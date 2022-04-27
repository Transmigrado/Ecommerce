import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Input from '@mui/material/Input';
import CardMedia from '@mui/material/CardMedia';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import  './product-card-Checkout.scss'

const ProductCardInCheckout = ({ p }) => {

    let dispatch = useDispatch();

    const handleQuantityChange = (e) => {
    
        let count = e.target.value < 1 ? 1 : e.target.value;
        if (count > p.quantity) {
            toast.error(`Max available quantity: ${p.quantity}`);
            return;
        }

        let cart = [];
        if (typeof window !== "undefined") {
            if (localStorage.getItem("cart")) {
                cart = JSON.parse(localStorage.getItem("cart"));
            }

            cart.map((product, i) => {
                if (product.tail === p.tail) {
                    cart[i].count = count;
                }
                return cart;
            });

            localStorage.setItem("cart", JSON.stringify(cart));
            dispatch({
                type: "ADD_TO_CART",
                payload: cart,
            });
        }
    };

    const handleRemove = () => {

        let cart = [];
        if (typeof window !== "undefined") {
            if (localStorage.getItem("cart")) {
                cart = JSON.parse(localStorage.getItem("cart"));
            }
            // [1,2,3,4,5]
            cart.map((product, i) => {
                if (product.tail === p.tail) {
                    cart.splice(i, 1);
                }
                return cart;
            });

            localStorage.setItem("cart", JSON.stringify(cart));
            dispatch({
                type: "ADD_TO_CART",
                payload: cart,
            });
        }
  };

    return (
        <Card className="main-container-products-cart"> 
            <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Imagen</TableCell>
                            <TableCell align="center">Nombre</TableCell>
                            <TableCell align="center">Precio</TableCell>
                            <TableCell align="center">Serie de juegos</TableCell>
                            <TableCell align="center">Cantidad</TableCell>
                            <TableCell align="center">Envío</TableCell>
                            <TableCell align="center">Remover</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">
                                <CardMedia
                                    className="image"
                                    component="img"
                                    height="100"
                                    sx={{objectFit: 'contain'}}
                                    image={p.image}
                                    alt={p.name}
                                />
                            </TableCell>
                            <TableCell align="center">{p.name}</TableCell>
                            <TableCell align="center">${p.finalPrice}</TableCell>
                            <TableCell align="center">{p.gameSeries}</TableCell>

                            <TableCell align="center">
                                <Input
                                    type="number"
                                    className="form-control"
                                    sx= {{width:"100px", paddingLeft:'1rem'}}
                                    value={p.count}
                                    onChange={handleQuantityChange}
                                />
                            </TableCell>

                            <TableCell align="center">
                                {p.shipping === "Yes" ? (
                                    <CheckCircleOutlineIcon className="text-success" />
                                ) : (
                                    <CloseIcon className="text-danger" />
                                )}
                            </TableCell>

                            <TableCell align="center">
                                <DeleteIcon
                                    onClick={handleRemove}
                                    className="delete-icon"
                                />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    
    );
};

export default ProductCardInCheckout;
