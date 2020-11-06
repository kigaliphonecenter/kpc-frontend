import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getCategories, getProducts, deleteProduct, deleteCategory } from "./apiAdmin";

const ManageProducts = () => {
  
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const { user, token } = isAuthenticated();

    const loadProducts = () => {
        getProducts().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setProducts(data);
            }
        });
    };
    const loadCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setCategories(data);
            }
        });
    };

    const destroy = productId => {
        deleteProduct(productId, user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadProducts();
            }
        });
    };
    const destroyCategories = categoryId => {
        deleteCategory(categoryId, user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadCategories();
            }
        });
    };

    useEffect(() => {
        loadProducts();
          loadCategories();
    }, []);

    return (
        <Layout
            title="Manage Products"
            description="Perform CRUD on products"
            className="container-fluid mt-5"
        >
            <div className="row">
                <div className="col-md-9 m-auto">
                    <h2 className="text-center">
                        Total {products.length} products
                    </h2>
                    <hr />
                    <ul className="list-group">
                        {products.map((p, i) => (
                            <li
                                key={i}
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >
                                <strong>{p.title}</strong>
                                <Link to={`/admin/product/update/${p._id}`}>
                                    <span className="badge badge-warning badge-pill">
                                        Update
                                    </span>
                                </Link>
                                <span
                                style={{cursor: 'pointer'}}
                                    onClick={() => destroy(p._id)}
                                    className="badge badge-danger badge-pill"
                                >
                                    Delete
                                </span>
                            </li>
                        ))}
                    </ul>
                    <br />
                </div>
            </div>
        <div
            title="Manage Products"
            description="Perform CRUD on products"
            className="container-fluid mt-5"
        >
            <div className="row">
                <div className="col-md-9 m-auto">
                    <h2 className="text-center">
                        Total {categories.length} Categories
                    </h2>
                    <hr />
                    <ul className="list-group">
                        {categories.map((c, i) => (
                            <li
                                key={i}
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >
                                <strong>{c.name}</strong>
                                 {/* <Link to={`/admin/category/update/${c._id}`}>
                                    <span className="badge badge-warning badge-pill">
                                        Update
                                    </span>
                                </Link> */}
                                <span
                                style={{cursor: 'pointer'}}
                                    onClick={() => destroyCategories(c._id)}
                                    className="badge badge-danger badge-pill"
                                >
                                    Delete
                                </span>
                            </li>
                        ))}
                    </ul>
                    <br />
                </div>
            </div>
        </div>
        </Layout>
    );
};

export default ManageProducts;