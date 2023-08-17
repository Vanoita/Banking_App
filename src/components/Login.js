import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';

function Login() {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { state } = useLocation();
    const baseURL = "http://localhost:8080/checkLogin";
    const submitActionHandler = (event) => {
        event.preventDefault();
        axios.post(baseURL, {
            userId: userId,
            password: password
        }).then((response) => {
            alert(JSON.stringify(response))
            // const res = JSON.parse(response.data);
            // if(res.login){
            //     localStorage.setItem('userId',username);
            //     navigate('/dashboard');
            // }
        }).catch(error => {
            alert("error = " + error);
        });

        // localStorage.setItem('username', username);
        // if (state.from) { navigate(state.from); } else { navigate('/'); }
    };
    return (
        <>
            <Helmet>
                <title>Login User</title>
            </Helmet>
            <div className="container d-flex flex-row justify-content-center align-items-center mt-4">
                <div className='card' style={{ width: "100%", maxWidth: "500px" }}>
                    <form className="p-4" onSubmit={submitActionHandler}>
                        <h3 className="my-4 text-center fw-bold" style={{ paddingBottom: "30px" }}>Login</h3>
                        <div class="form-outline mb-4">
                            <input type="text" class="form-control" value={userId} onChange={e => setUserId(e.target.value)} />
                            <label class="form-label">UserId</label>
                        </div>
                        <div class="form-outline mb-4">
                            <input type="password" class="form-control" value={password} onChange={e => setPassword(e.target.value)} />
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
                            <Link to="#">Forgot Password?</Link>
                        </div>
                        <div class="text-center mb-4">
                            <Link to="#">Forgot Username?</Link>
                        </div>
                        <div class="text-center mb-4">
                            <p>Not a member? <Link to="/register">Register</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;