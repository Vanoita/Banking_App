import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { customAlphabet } from 'nanoid';
import { useEffect } from 'react';

function Register() {
    const nanoid = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 8);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const baseURL = "http://localhost:8080/registerUser";
    const submitActionHandler = (event) => {
        event.preventDefault();
        axios.post(baseURL, {
            userId: nanoid(),
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        }).then((response) => {
            const res = response.data;
            if(res.userId){
                localStorage.setItem('userId', res.userId);
                navigate("/dashboard",  {state:{message: "You're Registered Successfully!", type: "success"}});
            }

        }).catch(error => {
            alert("error = " + error);
        });
    };
    useEffect(() => {
        const token = localStorage.getItem('userId');
        if(token) {
            navigate("/dashboard", {state:{message: "You're still Login. First Logout and then try to register.", type: "warning"}});
        }
    },[navigate])
    return (
        <>
            <Helmet>
                <title>Register User</title>
            </Helmet>
            <div className="container d-flex flex-row justify-content-center align-items-center mt-4">
                <div className='card' style={{ width: "100%", maxWidth: "500px" }}>
                    <form className="p-4" onSubmit={submitActionHandler}>
                        <h3 className="my-4 text-center fw-bold" style={{ paddingBottom: "30px" }}>Online Banking Application</h3>
                        <div class="row">
                            <div class="col-md-6 mb-4 pb-3">
                                <div class="form-outline">
                                    <input type="text" required value={firstName} onChange={e => setFirstName(e.target.value)} class="form-control form-control-lg" />
                                    <label class="form-label" >First name</label>
                                </div>
                            </div>
                            <div class="col-md-6 mb-4 pb-3">
                                <div class="form-outline">
                                    <input type="text" required value={lastName} onChange={e => setLastName(e.target.value)} class="form-control form-control-lg" />
                                    <label class="form-label">Last name</label>
                                </div>
                            </div>
                        </div>
                        <div class="form-outline mb-4">
                            <input type="text" required class="form-control" value={email} onChange={e => setEmail(e.target.value)} />
                            <label class="form-label">Email</label>
                        </div>
                        <div class="form-outline mb-4">
                            <input type="password" required class="form-control" value={password} onChange={e => setPassword(e.target.value)} />
                            <label class="form-label">Password</label>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <button type="submit" class="btn btn-primary btn-block mb-4" style={{ width: "50%" }}>Register</button>
                        </div>
                        <div class="text-center mb-4">
                            <p>Already registered? <Link to="/login">Login</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Register;