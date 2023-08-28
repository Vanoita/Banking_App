import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { customAlphabet } from 'nanoid';
import { useEffect } from 'react';
import bg1 from "../asset/bg1.jpg";

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
            if (res.userId) {
                localStorage.setItem('userId', res.userId);
                navigate("/dashboard", { state: { message: "Registered Successfully!", type: "success" } });
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
            <Helmet>
                <title>Register User</title>
            </Helmet>
            <div className="container-fluid vh-100">
                <div class="row h-100">
                    <div className="col-7 overflow-hidden p-0">
                        <img src={bg1} alt="BG" className="h-100 w-100" />
                    </div>
                    <div className="col-5 d-flex justify-content-center align-items-center" style={{ backgroundColor: "#F5F5F5" }}>
                        <div className='my-2' style={{ maxWidth: "400px", width: "100%" }}>
                            <form className="p-2 was-validated" onSubmit={submitActionHandler}>
                                <h3 className="my-4 text-center fw-bold" style={{ paddingBottom: "20px" }}><span style={{ color: "orange" }}>Online &nbsp;</span><span style={{ color: "#6096B4" }}>Banking System</span></h3>
                                <h3 className="my-4 text-center fw-bold" style={{ paddingBottom: "20px" }}>Register</h3>
                                <div class="row">
                                    <div class="col-md-6 mb-4 pb-3">
                                        <div class="form-outline">
                                            <input type="text" required value={firstName} onChange={e => setFirstName(e.target.value)} class="form-control form-control-lg" />
                                            <label class="form-label" >First name</label>
                                            <div id="feedbackin" class="invalid-feedback">
                                                Please fill this field!
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6 mb-4 pb-3">
                                        <div class="form-outline">
                                            <input type="text" required value={lastName} onChange={e => setLastName(e.target.value)} class="form-control form-control-lg" />
                                            <label class="form-label">Last name</label>
                                            <div id="feedbackin" class="invalid-feedback">
                                                Please fill this field!
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-outline mb-4">
                                    <input type="email" required class="form-control" id="email" value={email} onChange={e => setEmail(e.target.value)} />
                                    <label class="form-label">Email</label>
                                    <div id="feedbackin" class="invalid-feedback">
                                        Please enter a valid email
                                    </div>
                                </div>
                                <div class="form-outline mb-4">
                                    <input type="password" required class="form-control" id="validationPassword" minlength="8" value={password} onChange={e => setPassword(e.target.value)} />
                                    <label class="form-label">Password</label>
                                    <div id="feedbackin" class="invalid-feedback">
                                        Atleast 8 characters, Number, special character, Capital letter and small letter
                                    </div>
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
                </div>
            </div>
        </>
    );
}

export default Register;