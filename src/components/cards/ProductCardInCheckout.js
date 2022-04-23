import React from "react";
import ModalImage from "react-modal-image";
//import laptop from "../../images/laptop.png";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import CardMedia from '@mui/material/CardMedia';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
/*import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
} from "@ant-design/icons";*/

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}
const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];
const ProductCardInCheckout = ({ p }) => {
  console.log('p',p)
  const colors = ["Black", "Brown", "Silver", "White", "Blue"];
  let dispatch = useDispatch();

  const handleColorChange = (e) => {
    console.log("color changed", e.target.value);

    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, i) => {
        if (product._id === p._id) {
          cart[i].color = e.target.value;
        }
        return cart;
      });

      //  console.log('cart udpate color', cart)
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleQuantityChange = (e) => {
    // console.log("available quantity", p.quantity);
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
        if (product._id === p._id) {
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
    // console.log(p._id, "to remove");
    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // [1,2,3,4,5]
      cart.map((product, i) => {
        if (product._id === p._id) {
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
   
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Imagen</TableCell>
            <TableCell align="right">Nombre</TableCell>
            <TableCell align="right">Precio</TableCell>
            <TableCell align="right">Serie de juegos</TableCell>
            <TableCell align="right">Color</TableCell>
            <TableCell align="right">Cantidad</TableCell>
            <TableCell align="right">Envío</TableCell>
            <TableCell align="right">Remover</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                <CardMedia
                  className="image"
                  component="img"
                  height="150"
                  sx={{objectFit: 'contain'}}
                  image={p.image}
                  alt={p.name}
                />
              </TableCell>
              <TableCell align="right">{p.name}</TableCell>
              <TableCell align="right">${p.finalPrice}</TableCell>
              <TableCell align="right">{p.gameSeries}</TableCell>
              <TableCell align="right">
                <select
                  onChange={handleColorChange}
                  name="color"
                  className="form-control"
                >
                  {p.color ? (
                    <option value={p.color}>{p.color}</option>
                  ) : (
                    <option>Select</option>
                  )}
                  {colors
                    .filter((c) => c !== p.color)
                    .map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                </select>
              </TableCell>
              <TableCell align="right">
                <input
                  type="number"
                  className="form-control"
                  value={p.count}
                  onChange={handleQuantityChange}
                />
              </TableCell>

              <TableCell align="right">
                {p.shipping === "Yes" ? (
                  <CheckCircleOutlineIcon className="text-success" />
                ) : (
                  <CloseIcon className="text-danger" />
                )}
              </TableCell>

              <TableCell align="right">
                <DeleteIcon
                  onClick={handleRemove}
                  className="text-danger pointer"
                />
              </TableCell>


            </TableRow>
            
        </TableBody>
      </Table>
    </TableContainer>

   
  );
};

export default ProductCardInCheckout;
