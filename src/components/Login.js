import React from 'react';
import { Helmet } from 'react-helmet';
import bg1 from "../asset/bg1.jpg";
import LoginForm from './LoginForm';

function Login() {
    return (
        <>
            <Helmet>
                <title>Login User</title>
            </Helmet>
            <div className="container-fluid vh-100" >
                <div class="row h-100">
                    <div className="col-5 d-flex justify-content-center align-items-center" style={{ backgroundColor: "#F5F5F5" }}>
                        <LoginForm />
                    </div>
                    <div className="col-7 overflow-hidden p-0">
                        <img src={bg1} alt="BG" className="h-100 w-100" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;