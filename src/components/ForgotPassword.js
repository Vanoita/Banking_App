import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from 'react-helmet';
import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function ForgotPassword() {
    const navigate = useNavigate();
    const [userId, setUserId] = useState("");

    const errorToastMessage = (msg) => {
        toast.error(msg, {
          position: toast.POSITION.TOP_RIGHT,
          toastId: "error3"
        });
    }

    const submitActionHandler = (event) => {
        event.preventDefault();
        const baseURL = "http://localhost:8080/checkUserId/" + userId;
        axios.post(baseURL, {}).then((response) => {
            if (response.data) {
                const URL = "/createNewPassword/" + userId;
                navigate(URL);
            }
            else {
                errorToastMessage("User ID not Found");
            };
        });

    }

    return (
        <>
            <Helmet>
                <title>Reset Password</title>
            </Helmet>
            <div className="container d-flex flex-row justify-content-center align-items-center mt-4">
                <div className='card' style={{ width: "100%", maxWidth: "500px" }}>
                    <form className="p-4" onSubmit={submitActionHandler}>
                        <h3 className="my-4 text-center fw-bold" style={{ paddingBottom: "30px" }}>Reset Password</h3>
                        <div class="form-outline mb-4">
                            <input type="text" class="form-control" value={userId} required onChange={e => setUserId(e.target.value)} />
                            <label class="form-label">Enter UserId</label>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <button type="submit" class="btn btn-primary btn-block mb-4"
                                style={{ width: "50%" }} >Reset Password</button>
                        </div>
                        <div className='my-4 text-center'>
                            <Link to="/" style={{textDecoration: "underline"}}>Back to Homepage</Link>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer/>
        </>
    )
}

export default ForgotPassword