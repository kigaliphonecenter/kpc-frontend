import React, { useState, useEffect} from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import {getCategory, updateCategory } from "./apiAdmin";

const UpdateCategory = ( { match }) => {
    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    // destructure user and token from localstorage
    const { user, token } = isAuthenticated();

 const init = categoryId => {
        getCategory(categoryId).then(data => {
            if (data.error) {
                setError(data.error);
                setSuccess(false);
            } else {
                // populate the state
                setName();
            
            }
        });
    };

    const handleChange = e => {
        setError("");
        setName(e.target.value);
    };

    const clickSubmit = e => {
        e.preventDefault();
        setError("");
        setSuccess(false);
        // make request to api to create category
        updateCategory(match.params.categoryId, user._id, token).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
              // setName();
                setError("");
                setSuccess(true);
            }
        });
    };
     useEffect(() => {
        init(match.params.categoryId);
    }, []);

    const newCategoryFom = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group ">
                <label className="text-muted">Name</label>
                <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    value={name}
                    autoFocus
                    required
                />
            </div>
            <button className="btn btn-outline-primary">Update Category</button>
        </form>
    );

    const showSuccess = () => {
        if (success) {
            return <h3 className="text-success">{name} is created</h3>;
        }
    };

    const showError = () => {
        if (error) {
            return <h3 className="text-danger">Category should be unique</h3>;
        }
    };

    const goBack = () => (
        <div className="mt-5">
            <Link to="/admin/dashboard" className="text-warning">
                Back to Dashboard
            </Link>
        </div>
    );

    return (
        <Layout
            title="Add a new category"
            description={`Hi ${user.name} You Are Welcome, Ready To Add a New Category?`}
        >
            <div className="row mt-5">
                <div className="col-md-8 offset-md-2">
                    {showSuccess()}
                    {showError()}
                    {newCategoryFom()}
                    {goBack()}
                </div>
            </div>
        </Layout>
    );
};

export default UpdateCategory;