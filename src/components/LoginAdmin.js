import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { useEffect } from 'react';
import bg1 from "../asset/bg1.jpg";

function LoginAdmin() {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const navigate = useNavigate();
    const { state } = useLocation();
    const baseURL = "http://localhost:8080/checkLogin";
    const submitActionHandler = (event) => {
        event.preventDefault();
        axios.post(baseURL, {
            userId: userId,
            password: password
        }).then((response) => {
            const res = response.data;
            if (res.login) {
                localStorage.setItem('userId', userId);
                if (state && state.from) { navigate(state.from, { state: { message: res.message, type: "success" } }); }
                else { navigate('/adminDashboard', { state: { message: res.message, type: "success" } }); }
            }
            else {
                setAlertMessage(res.message)
            }
        }).catch(error => {
            alert("error = " + error);
        });
    };
    useEffect(() => {
        const token = localStorage.getItem('userId');
        if (token) {
            navigate("/adminDashboard", { state: { message: "You're already Login.", type: "warning" } });
        }
    }, [navigate])
    return (
        <>
            <Helmet>
                <title>Login Admin</title>
            </Helmet>
            {alertMessage && <div class="alert alert-danger text-center" role="alert">{alertMessage}</div>}
            <div className="container-fluid vh-100">
                <div class="row h-100">
                    <div className="col-5 d-flex justify-content-center align-items-center" style={{backgroundColor: "#F5F5F5"}}>
                        <div className='my-2' style={{maxWidth: "400px", width: "100%"}}>
                            <form className="p-2" onSubmit={submitActionHandler}>
                                <h3 className="my-4 text-center fw-bold" style={{ paddingBottom: "20px" }}><span style={{color: "orange"}}>Online &nbsp;</span><span style={{color: "#6096B4"}}>Banking System</span></h3>
                                <h3 className="my-4 text-center fw-bold" style={{ paddingBottom: "20px" }}>Login</h3>
                                <div class="form-outline mb-4">
                                    <input type="text" required class="form-control" value={userId} onChange={e => setUserId(e.target.value)}/>
                                    <label class="form-label">UserId</label>
                                </div>
                                <div class="form-outline mb-4">
                                    <input type="password" required class="form-control" value={password} onChange={e => setPassword(e.target.value)}/>
                                    <label class="form-label">Password</label>
                                </div>
                                <div class="row mb-4">
                                    <div class="col d-flex justify-content-center">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="" />
                                            <label class="form-check-label"> Remember me </label>
                                        </div>
                                    </div>
                                </div>

                                <div className='d-flex justify-content-center'>
                                    <button type="submit" class="btn btn-primary btn-block mb-4" style={{ width: "50%" }}>Sign in</button>
                                </div>

                                <div class="text-center mb-4">
                                    <Link to="/forgotPassword">Forgot Password?</Link>
                                </div>
                                <div class="text-center mb-4">
                                    <Link to="/forgotUsername">Forgot Username?</Link>
                                </div>
                                <div class="text-center mb-4">
                                    <p>Not a member? <Link to="/register">Register</Link></p>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-7 overflow-hidden p-0">
                        <img src={bg1} alt="BG" className="h-100 w-100" style={{transform: "scaleX(-1)"}}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginAdmin;