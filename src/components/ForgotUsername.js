import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from 'react-helmet';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function ForgotUsername() {
    const [accNo, setAccNo] = useState("");
    const [userId, setUserId] = useState("");

    const errorToastMessage = (msg) => {
        toast.error(msg, {
          position: toast.POSITION.TOP_RIGHT,
          toastId: "error3"
        });
    }

    const submitActionHandler = (event) => {
        event.preventDefault();
        const baseURL = "http://localhost:8080/checkAccNo/" + accNo;
        const searchURL = "http://localhost:8080/fetchUserId/" + accNo;
        axios.post(baseURL).then((response) => {
            if (response.data) {
                axios.get(searchURL).then((response) => { 
                    setUserId(response.data);
                    setAccNo("");
                })
                .catch((error) => { alert("error occured while loading data" + error); });
            }
            else {
                errorToastMessage("Account Not Found");
            }
        });
    }

    return (
        <>
            <Helmet>
                <title>Get UserId</title>
            </Helmet>
            {userId && <div class="alert alert-info text-center" role="alert">Your UserId is '{userId}'. </div>}
            <div className="container d-flex flex-row justify-content-center align-items-center mt-4">
                <div className='card' style={{ width: "100%", maxWidth: "500px" }}>
                    <form className="p-4" onSubmit={submitActionHandler}>
                        <h3 className="my-4 text-center fw-bold" style={{ paddingBottom: "30px" }}>Get UserID</h3>
                        <div class="form-outline mb-4">
                            <input required type="text" class="form-control" value={accNo} onChange={e => setAccNo(e.target.value)} />
                            <label class="form-label">Account Number</label>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <button type="submit" class="btn btn-primary btn-block mb-4"
                                style={{ width: "50%" }} >Get UserID</button>
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

export default ForgotUsername