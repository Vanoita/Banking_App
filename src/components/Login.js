import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { redirect } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const baseURL = "http://localhost:9080/checkLogin";
    const submitActionHandler = (event) => {
        event.preventDefault();
        // axios.post(baseURL, {
        //     userId: username,
        //     password: password
        // }).then((response) => {
        //     alert("User : "+ username + " Logged In.");
        // }).catch(error => {
        //     alert("error = " + error);
        // });

        alert(JSON.stringify({ 
            username: username,
            password: password
        }));
    };
    return (
        <div className="container d-flex flex-row justify-content-center align-items-center mt-4">
            <div className='card' style={{width:"100%", maxWidth:"500px"}}>
            <form className="p-4" onSubmit={submitActionHandler}>
                <h3 className="my-4 text-center">Online Banking Application</h3>
                <div class="form-outline mb-4">
                    <input type="text" class="form-control" value={username} onChange={e=>setUsername(e.target.value)}/>
                    <label class="form-label">Username</label>
                </div>
                <div class="form-outline mb-4">
                    <input type="password" class="form-control" value={password} onChange={e=>setPassword(e.target.value)} />
                    <label class="form-label">Password</label>
                </div>
                <div class="row mb-4">
                    <div class="col d-flex justify-content-center">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" checked />
                            <label class="form-check-label"> Remember me </label>
                        </div>
                    </div>
                    <div class="col">
                        <a href="#!">Forgot password?</a>
                    </div>
                </div>

                <button type="button" class="btn btn-primary btn-block mb-4" style={{width:"50%"}}>Sign in</button>

                <div class="text-center">
                    <p>Not a member? <a href="#!">Register</a></p>
                </div>
            </form>
            </div>
        </div>
    );
}

export default Login;