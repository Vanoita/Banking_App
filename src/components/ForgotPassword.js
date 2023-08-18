import React from 'react';  
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from 'react-helmet';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
    const navigate = useNavigate();
const [userId,setUserId] = useState("");

    const submitActionHandler = (event)=>{
        event.preventDefault();
        // const baseURL = "https://localhost:8080/checkUserId";
        // axios.post(baseURL,{userId}).then((response)=>{
        //     alert(response);
        // });
        // // navigate("/verifyOTP");
    }

  return (
    <>
    <Helmet>
        <title>Reset Password</title>
    </Helmet>
    <div className="container d-flex flex-row justify-content-center align-items-center mt-4">
        <div className='card' style={{ width: "100%", maxWidth: "500px" }}>
            <form className="p-4" onSubmit={submitActionHandler}>
                <h3 className="my-4 text-center fw-bold" style={{ paddingBottom: "30px" }}>Reset Password</h3>
                <h6 id="message"></h6>
                <div class="form-outline mb-4">
                    <input type="text" class="form-control" value={userId} onChange={e => setUserId(e.target.value)} />
                    <label class="form-label">UserId</label>
                </div>               
                <div className='d-flex justify-content-center'>
                            <button type="submit" class="btn btn-primary btn-block mb-4" 
                            style={{ width: "50%" }} >Send OTP</button>
                        </div>
            </form>
        </div>
    </div>
</>
  )
}

export default ForgotPassword