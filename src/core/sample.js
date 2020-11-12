import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";

import {
    listOrders,
    getStatusValues,
    updateOrderStatus
} from "./apiAdmin";
import moment from "moment";

const Orders = () => {

    const [orders, setOrders] = useState([]);
    const [statusValues, setStatusValues] = useState([]);

    const { user, token } = isAuthenticated();

    const loadOrders = () => {
        listOrders(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setOrders(data);
            }
        });
    };

    const loadStatusValues = () => {
        getStatusValues(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setStatusValues(data);
            }
        });
    };

    useEffect(() => {
        loadOrders();
        loadStatusValues();
    }, []);

    const showOrdersLength = () => {
        if (orders.length > 0) {
            return (
                <h1 className="text-warning display-2">
                    Total orders: {orders.length}
                </h1>
            );
        } else {
            return <h1 className="text-warning">No orders</h1>;
        }
    };

    const showInput = (key, value) => (

        <span className="">
            {key}
            <strong className='text-center'>{value}</strong>

        </span>


    );

    const handleStatusChange = (e, orderId) => {
        console.log("Update Order Status ");

        updateOrderStatus(user._id, token, orderId, e.target.value).then(
            data => {
                if (data.error) {
                    console.log("Status update failed");
                } else {
                    loadOrders();
                }
            }
        );
    };

    const showStatus = o => (
        <div className="form-group">
            <h3 className="h5">{o.status}</h3>
            <select
                className="form-control"
                style={{ width: '100px' }}
                onChange={e => handleStatusChange(e, o._id)}
            >
                <option>Update Status</option>
                {statusValues.map((status, index) => (
                    <option key={index} value={status}>
                        {status}
                    </option>
                ))}
            </select>
        </div>
    );


    return (
        <Layout>

            <div className="col-md-12 col-sm-12  offset-md-0">
                {showOrdersLength()}
                <table id="myTable" className="table table-striped table-bordered">
                    <thead >
                        <tr>
                            <th scope="col">Status</th>
                            <th scope="col">Amount (Rwf)</th>
                            <th scope="col">Ordered by</th>
                            <th scope="col">Ordered on</th>
                            <th scope="col">Delivery Phone </th>
                            <th scope="col">Delivery District</th>
                            <th scope="col">Delivery Phone color</th>
                            <th scope="col">Delivery Sector</th>
                            <th scope="col">Delivery Cell</th>
                            <th scope="col">Delivery Village</th>
                            <th scope="col">Delivery Address</th>
                            <th scope="col">Ordered Product</th>
                        </tr>
                    </thead>



                    <tbody style={{ fontSize: '10px' }}>
                        {orders.map((o, oIndex) => {
                            return (


                                <tr key={oIndex}>
                                    <td>{showStatus(o)}</td>
                                    <td>{o.amount}</td>
                                    <td>{o.user.name}</td>
                                    <td> <span> {moment(o.createdAt).fromNow()}</span></td>
                                    <td>{o.phone}</td>
                                    <td>{o.district}</td>
                                    <td>{o.color}</td>
                                    <td>{o.sector}</td>
                                    <td>{o.cell}</td>
                                    <td>{o.village}</td>
                                    <td>{o.village}</td>
                                    {o.products.map((p, pIndex) => (
                                        <tr style={{ background: 'none' }} key={pIndex}>




                                                <td>{showInput("Title:", p.title)}</td>
                                                <td>{showInput("Price [Rwf]:", p.price)}</td>
                                                <td>{showInput("Total:", p.count)}</td>
                                            

                                            
                                        </tr>
                                    ))}
                                </tr>



                            );
                        })}
                    </tbody>

                </table>
            </div>
            <div>

            </div>
        </Layout>
    );


};

export default Orders;