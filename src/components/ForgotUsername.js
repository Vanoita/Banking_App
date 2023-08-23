import React from 'react';  
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from 'react-helmet';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ForgotUsername() {
    const navigate = useNavigate();
const [accNo,setAccNo] = useState("");

    const submitActionHandler = (event)=>{
        event.preventDefault();
        const baseURL = "http://localhost:8080/checkAccNo/"+accNo;
        const searchURL = "http://localhost:8080/fetchUserId/"+accNo;
        axios.post(baseURL).then((response)=>{
            if(response.data)
            {
                axios.get(searchURL).then((response)=>{alert("Your Username is "+response.data);})
                .catch((error)=>{alert("error occured while loading data" + error);});
            navigate("/");
            }
            else {
                document.getElementById("message").innerHTML = "Account Not Found";
            }
        });
        //navigate("/createNewPassword");
    }

  return (
    <>
    <Helmet>
        <title>Reset Password</title>
    </Helmet>
    <div className="container d-flex flex-row justify-content-center align-items-center mt-4">
        <div className='card' style={{ width: "100%", maxWidth: "500px" }}>
            <form className="p-4" onSubmit={submitActionHandler}>
                <h3 className="my-4 text-center fw-bold" style={{ paddingBottom: "30px" }}>Get UserID</h3>
                <div id="message"></div>
                <div class="form-outline mb-4">
                    <input type="text" class="form-control" value={accNo} onChange={e => setAccNo(e.target.value)} />
                    <label class="form-label">Account Number</label>
                </div>               
                <div className='d-flex justify-content-center'>
                            <button type="submit" class="btn btn-primary btn-block mb-4" 
                            style={{ width: "50%" }} >Get UserID</button>
                        </div>
            </form>
        </div>
    </div>
</>
  )
}

export default ForgotUsername