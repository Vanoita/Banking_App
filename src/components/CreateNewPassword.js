import React, { useState } from 'react'
import axios from 'axios';
import { Navigate, useNavigate, useParams } from 'react-router';

function CreateNewPassword() {
    const [pass,setPass] = useState("");
    const [confPass,setConfPass] = useState("");
    let {refId} = useParams();
    const navigate = useNavigate();

    const submitActionHandler = (event)=>{
        event.preventDefault();
        if(pass!== confPass) {
            document.getElementById('message').innerHTML = "Passwords do not match";
        }
        else {
        const baseURL = "http://localhost:8080/createNewPassword/"+refId;
        axios.post(baseURL,pass).then((response)=>{
            alert("Password changed successfully");
            navigate("/login");
        }); }
    }
  return (
    <div className="container d-flex flex-row justify-content-center align-items-center mt-4">
                <div className='card' style={{ width: "100%", maxWidth: "500px" }}>
                    <form className="p-4" onSubmit={submitActionHandler}>
                        <h3 className="my-4 text-center fw-bold" style={{ paddingBottom: "30px" }}>Create New Password</h3>
                        <div class="form-outline mb-4">
                            <div id="message">{refId}</div>
                            <input type="password" class="form-control" value={pass} onChange={e => setPass(e.target.value)} />
                            <label class="form-label">New Password</label>
                        </div>
                        <div class="form-outline mb-4">
                            <input type="text" class="form-control" value={confPass} onChange={e => setConfPass(e.target.value)} />
                            <label class="form-label">Confirm New Password</label>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <button type="submit" class="btn btn-primary btn-block mb-4" 
                            style={{ width: "50%" }} >Submit</button>
                        </div>
                        </form>
                        </div></div>
  )
}

export default CreateNewPassword;