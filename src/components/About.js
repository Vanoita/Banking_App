import { Navigate, useLocation, useNavigate } from "react-router-dom";
function About(){
    const location = useLocation();
    return localStorage.getItem('username') ? (
        <div>
            <h1>About Online Banking Application</h1>
        </div>
    ):(
        <Navigate
            replace={true}
            to="/login"
            state={{ from: `${location.pathname}${location.search}` }}
        />
    )
}

export default About;