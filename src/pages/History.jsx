import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const History = () => {
  
    const { order } = useSelector((state) => ({ ...state }));
   console.log(order)
    const showOrderInTable = (order) => (
        <div className="responsive-table container">
            <table className="table table-bordered">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Price</th>
                        <th scope="col">Color</th>
                        <th scope="col">Count</th>
                    </tr>
                </thead>
                <tbody>
                    {order[0]?.products.map((p, i) => (
                        <tr key={i}>
                            <td>
                              <b>{p.name}</b>
                            </td>
                            <td>{p.finalPrice}</td>
                            <td>{p.color}</td>
                            <td>{p.count}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const showEachOrders = () =>
        order.map((order, i) => (
            <div key={i} className="m-5 p-3 card">
                { console.log(order)/*<ShowPaymentInfo order={order} />*/}
                {showOrderInTable(order)}
            </div>
        ));

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col text-center">
                    <>
                    <h4>
                        { order.length > 0
                            ? "User purchase orders"
                            : "No purchase orders"}
                    </h4>
                    {showEachOrders()}
                    </>
                </div>
            </div>
        </div>
    );
};

export default History;
