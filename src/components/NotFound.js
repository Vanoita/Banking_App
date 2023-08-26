import React from 'react';
import { Helmet } from 'react-helmet';
import '../notfound.css';

function NotFound() {
    return (
        <>
            <Helmet>
                <title>Page Not Found</title>
            </Helmet>
            <div id="notfound" style={{backgroundColor: "#000"}}>
                <div class="notfound">
                    <div class="notfound-404">
                        <h1>404</h1>
                        <h2>Page not found</h2>
                    </div>
                    {localStorage.getItem('userId') ? <a href="/dashboard">Dashboard</a> : <a href="/">Homepage</a>}
                </div>
            </div>
        </>
    )
}

export default NotFound