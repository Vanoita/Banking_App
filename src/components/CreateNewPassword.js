import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet';

function CreateNewPassword() {
    const [pass, setPass] = useState("");
    const [confPass, setConfPass] = useState("");
    let { refId } = useParams();
    const navigate = useNavigate();

    const errorToastMessage = (msg) => {
        toast.error(msg, {
            position: toast.POSITION.TOP_RIGHT,
            toastId: "error4"
        });
    }

    const successToastMessage = async(msg) => {
        toast.success(msg, {
          position: toast.POSITION.TOP_RIGHT,
          toastId: "success3"
        });
        setTimeout(function(){ navigate("/"); }, 3000);
    }

    const submitActionHandler = (event) => {
        event.preventDefault();
        if (pass !== confPass) {
            errorToastMessage("Passwords do not match!");
        }
        else {
            const baseURL = "http://localhost:8080/createNewPassword/" + refId;
            axios.post(baseURL, pass).then((response) => {
                successToastMessage("Password changed successfully");
            });
        }
    }
    return (
        <>
            <Helmet>
                <title>Reset Password</title>
            </Helmet>
            <div className="container d-flex flex-row justify-content-center align-items-center mt-4">
                <div className='card' style={{ width: "100%", maxWidth: "500px" }}>
                    <form className="p-4" onSubmit={submitActionHandler}>
                        <h3 className="my-4 text-center fw-bold" style={{ paddingBottom: "30px" }}>Create New Password</h3>
                        <div class="form-outline mb-4">
                            <div id="message"></div>
                            <input type="password" required class="form-control" value={pass} onChange={e => setPass(e.target.value)} />
                            <label class="form-label">New Password</label>
                        </div>
                        <div class="form-outline mb-4">
                            <input type="password" required class="form-control" value={confPass} onChange={e => setConfPass(e.target.value)} />
                            <label class="form-label">Confirm New Password</label>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <button type="submit" class="btn btn-primary btn-block mb-4"
                                style={{ width: "50%" }} >Change Password</button>
                        </div>
                        <div className='my-4 text-center'>
                            <Link to="/" style={{ textDecoration: "underline" }}>Back to Homepage</Link>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default CreateNewPassword;