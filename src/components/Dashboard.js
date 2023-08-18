import { Helmet } from "react-helmet";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useState } from "react";

function Dashboard(){
    const [userId, setUserId] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("info");
    const navigate = useNavigate();
    const {state} = useLocation();
    const location = useLocation();
    useEffect(() => {
        const token = localStorage.getItem('userId');
        if(!token) {
            navigate("/login",{state:{from: `${location.pathname}${location.search}`}});
        }
        setUserId(token);

        if(state && state.message && state.type){
            setAlertMessage(state.message);
            setAlertType(state.type);
        }
        
    })
    return (
        <>
            <Helmet>
                <title>Dashboard</title>
            </Helmet>
            {/* {alertMessage && <div class={`alert alert-${alertType} text-center`} role="alert">{alertMessage}</div>} */}
            <div>
                <h1>Welcome to Dashboard</h1>
                <h2>{userId}</h2>
            </div>
        </>
    );
}

export default Dashboard;