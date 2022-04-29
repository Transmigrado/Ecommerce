import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';

const History = () => {
  
    const { order } = useSelector((state) => ({ ...state }));

    const showOrderInTable = (order) => (
        <TableContainer component={Paper}>
            <Table sx={{ width: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>  
                        <TableCell >Title</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Count</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {order[0]?.products.map((p, i) => (
                       <TableRow
                       key={i}
                       sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell >{p.name}</TableCell>
                        <TableCell align="right">{p.finalPrice}</TableCell>
                        <TableCell align="right">{p.count}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

    const showEachOrders = () =>
        order.map((order, i) => (
            <Box key={i} className="m-5 p-3 card" paddingTop={4}>
                {showOrderInTable(order)}
            </Box>
        ));

    return (
        <Card className="container-fluid">
            <CardContent className="row">
                <Box sx={{width:'650px'}}>
                    <h4>
                        { order.length > 0
                            ? "User purchase orders"
                            : "No purchase orders"}
                    </h4>
                    {showEachOrders()}
                </Box>
            </CardContent>
        </Card >
    );
};

export default History;
