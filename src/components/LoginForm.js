import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function LoginForm() {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { state } = useLocation();
    const baseURL = "http://localhost:8080/checkLogin";

    const errorToastMessage = (msg) => {
        toast.error(msg, {
            position: toast.POSITION.TOP_RIGHT,
            toastId: "error1"
        });
    };

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
                else { navigate('/dashboard', { state: { message: res.message, type: "success" } }); }
            }
            else {
                errorToastMessage(res.message);
            }
        }).catch(error => {
            alert("error = " + error);
        });
    };
    useEffect(() => {
        const token = localStorage.getItem('userId');
        if (token) {
            navigate("/dashboard", { state: { message: "Login Already!", type: "error" } });
        }
    }, [navigate])
    return (
        <>
            <div className='my-2' style={{ maxWidth: "400px", width: "100%" }}>
                <form className="p-2 was-validated" onSubmit={submitActionHandler}>
                    <h3 className="my-4 text-center fw-bold" style={{ paddingBottom: "20px" }}><span style={{ color: "orange" }}>Online &nbsp;</span><span style={{ color: "#6096B4" }}>Banking System</span></h3>
                    <h3 className="my-4 text-center fw-bold" style={{ paddingBottom: "20px" }}>Login</h3>
                    <div class="form-outline mb-4">
                        <input type="text" id='validationCustom01'
                            aria-describedby="inputGroupPrepend" required minLength="8" class="form-control" value={userId} onChange={e => setUserId(e.target.value)} />
                        <label class="form-label">UserId</label>
                        <div id="feedbackin" class="invalid-feedback">
                            Enter Valid UserId
                        </div>
                    </div>
                    <div class="form-outline mb-4">
                        <input type="password" required class="form-control" id="validationPassword" minlength="8" value={password} onChange={e => setPassword(e.target.value)} />
                        <label class="form-label">Password</label>
                        <div id="feedbackin" class="invalid-feedback">
                            Atleast 8 characters, Number, special character, Capital letter and small letter
                        </div>
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
            <ToastContainer />
        </>
    )
}

export default LoginForm