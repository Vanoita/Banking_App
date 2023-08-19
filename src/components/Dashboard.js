import { Helmet } from "react-helmet";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";

function Dashboard(){
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("info");
    const [accounts, setAccounts] = useState([]);
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const {state} = useLocation();
    const location = useLocation();

    const fetchAllAccount = (baseURLAccount) => {
        axios
            .get(baseURLAccount)
            .then((response) => {
                setAccounts(response.data);
            })
            .catch((error) => {
                alert("error occured while loading data" + error);
            });
    };
    const fetchUser = (baseURLUser) => {
        axios
            .get(baseURLUser)
            .then((response) => {
                setUser(response.data);
                //alert(JSON.stringify(response))
            })
            .catch((error) => {
                alert("error occured while loading data" + error);
            });
    };
    useEffect(() => {
        const token = localStorage.getItem('userId');
        if(!token) {
            navigate("/login",{state:{from: `${location.pathname}${location.search}`}});
        }
        else {
            const baseURLAccount = "http://localhost:8080/fetchAllAccount/"+token;
            const baseURLUser = "http://localhost:8080/fetchUser/"+token;
            fetchAllAccount(baseURLAccount);
            fetchUser(baseURLUser);
        }

        if(state && state.message && state.type){
            setAlertMessage(state.message);
            setAlertType(state.type);

            window.history.replaceState({state: null}, document.title);
        }
        
    },[alertMessage,alertType, location.pathname, location.search, state, navigate])
    return (
        <>
            <Helmet>
                <title>Dashboard</title>
            </Helmet>
            {alertMessage && <div class={`alert alert-${alertType} text-center`} role="alert">{alertMessage}</div>}
            <div>
                <h1>{user && `Hi ${user.firstName} ${user.lastName}`}, Welcome to Dashboard</h1>
                <div>
                    {accounts.map(acc=>{
                    return (
                        <div>{acc.accNo}</div>
                    )
                    })}
                </div>
            </div>
        </>
    );
}

export default Dashboard;