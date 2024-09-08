import React, { useState } from "react";
import { useLocation, useNavigate, Link } from 'react-router-dom';



function Navbar() {
    let location = useLocation();
    const navigate = useNavigate();
    // let [data,setdata] = useState([]);
    let path = "/" + (location?.pathname?.split('/')?.[1] || '');
    const userData = localStorage.getItem("proute_token");
    const user = JSON.parse(userData);
    // const name = user[0].name;
    // function logout(){
    //   localStorage.removeItem('proute_token');
    //   location('/')
    // }
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        navigate('/');
    };

    if (path === '/Order'|| path === '/Home' || path === '/AddToCart' || path === '/Subscription') {
        return (
            <>

                <header>

                    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                        <div class="container-fluid">
                            <h3>Book Store</h3>
                            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse" id="navbarResponsive">
                                <ul class="navbar-nav ms-auto">
                                    <li class="nav-item active">
                                        <Link class="nav-link" to="/Home">Home</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link class="nav-link" to="/AddToCart">Cart</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link class="nav-link" to="/Order">My Order</Link>
                                    </li>

                                    <li class="nav-item">
                                        <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </header>

            </>

        )
    }
}

export default Navbar
