import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import Menu from "../core/Menu";
import Footer from "../core/Footer";
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
                <h1 style={{ color: '#FED700', fontSize: '35px', fontWeight: '400' }} className="p-3 text-center">
                    Total orders: {orders.length}
                </h1>
            );
        } else {
            return <h1 className="text-warning">No orders</h1>;
        }
    };

    const showInput = (key, value) => (

        <span>
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
        <span className="form-group">

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
        </span>
    );


    const Product = o => {
        return (o.products.map((p) =>
            <div className="pValue" >
                <span>{showInput("Title: ", p.title)}</span> <br />
                <span>{showInput("Price [Rwf]: ", p.price)}</span> <br />
                <span >{showInput("Total: ", p.count)}</span> <br />

            </div>
        ))
    }
    const columns = ["Update Status", "Status", "Amount (Rwf)", "Ordered by", "Ordered On",
        "Delivery Phone Number", "Delivery District", "Delivery Phone Color",
        "Delivery Sector", "Delivery Cell", "Delivery Village", "Delivery Address", "Ordered Product"];


    const data = orders.map(o => (
        [showStatus(o), `${o.status}`, `${o.amount}`, `${o.user.name}`,
        `${moment(o.createdAt).fromNow()}`, `+250 ${o.phone}`, `${o.district}`,
        `${o.color}`, ` ${o.sector}`,
        ` ${o.cell}`, ` ${o.village}`, ` ${o.address}`, Product(o)]
    ));


    const options = {
        filterType: 'checkbox',
    };

    return (
        <div>
            <Menu />

            <div className=" orders m-auto">
                {showOrdersLength()}
                <MUIDataTable
                    title={"Orders List"}
                    data={data}
                    columns={columns}
                    options={options}
                />
            </div>
            <Footer />
        </div>

    );


};

export default Orders;