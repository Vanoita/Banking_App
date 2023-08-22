import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { useEffect } from 'react';


function AdminLogin(){
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
            if(res.login){
                localStorage.setItem('userId', userId);
                if (state && state.from) { navigate(state.from, {state:{message: res.message, type: "success"}}); } 
                else { navigate('/dashboard',  {state:{message: res.message, type: "success"}}); }
            }
            else{
                setAlertMessage(res.message)
            }
        }).catch(error => {
            alert("error = " + error);
        });
    };
    useEffect(() => {
        const token = localStorage.getItem('userId');
        if(token) {
            navigate("/dashboard", {state:{message: "You're already Login.", type: "warning"}});
        }
    },[navigate])


    return(
        <>
        <h3 className="my-4 text-center fw-bold" style={{ paddingBottom: "30px" }}>Hello Admin...</h3>
       
        

        <Helmet>
                <title>Login Admin</title>
        </Helmet>
            {alertMessage && <div class="alert alert-danger text-center" role="alert">{alertMessage}</div>}
            <div className="container d-flex flex-row justify-content-center align-items-center mt-4">
                <div className='card' style={{ width: "100%", maxWidth: "500px" }}>
                    <form className="p-4" onSubmit={submitActionHandler}>
                        <h3 className="my-4 text-center fw-bold" style={{ paddingBottom: "30px" }}>Admin Login</h3>
                        <div class="form-outline mb-4">
                            <input type="text" required class="form-control" value={userId} onChange={e => setUserId(e.target.value)} />
                            <label class="form-label">UserId</label>
                        </div>
                        <div class="form-outline mb-4">
                            <input type="password" required class="form-control" value={password} onChange={e => setPassword(e.target.value)} />
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
                        </form>
                        </div>
                        </div>

        </>

        
    );


}

export default AdminLogin;