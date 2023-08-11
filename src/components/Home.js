import { Navigate, useLocation, useNavigate } from "react-router-dom";

function Home(){
    const location = useLocation();
    return localStorage.getItem('username') ? (
        <div>
            <h1>Hello {localStorage.getItem('username')}! Welcome to Online Banking Application</h1>
        </div>
    ):(
        <Navigate
            replace={true}
            to="/login"
            state={{ from: `${location.pathname}${location.search}` }}
        />
    )
}

export default Home;