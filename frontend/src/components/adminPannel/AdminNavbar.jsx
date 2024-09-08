import React from 'react'
import {Link, useLocation, useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

const AdminNavbar = () => {
    let location = useLocation();
    const navigate = useNavigate();
    // let [data,setdata] = useState([]);
    let path = "/" + (location?.pathname?.split('/')?.[1] || '');
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        navigate('/');
    };
    if (path === '/OrderListing'|| path === '/Dashboard' || path === '/BookListing' || path === '/AddBook' || path === '/AddUser') {
    return (
        <>
        <div className="row">
            <div className="col-2">
                {/* <AdminSidebar/> */}
            </div>
            <div className="col-10">
            <nav className="nav">
                <nav class="main-header navbar navbar-expand navbar-white navbar-light">

                    <ul class="navbar-nav">
                       
                        <li class="nav-item d-none d-sm-inline-block">
                            <Link to="/Home" class="nav-link">Home</Link>
                        </li>

                    </ul>

                    <ul class="navbar-nav ml-auto">

                        <li class="nav-item">
                            <a class="nav-link" data-widget="navbar-search" href="#" role="button">
                                <i class="fas fa-search"></i>
                            </a>
                            <div class="navbar-search-block">
                                <form class="form-inline">
                                    <div class="input-group input-group-sm">
                                        <input class="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
                                        <div class="input-group-append">
                                            <button class="btn btn-navbar" type="submit">
                                                <i class="fas fa-search"></i>
                                            </button>

                                            <li class="nav-item">
                                                <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
                                            </li>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </li>
                        <li class="nav-item">

                        </li>
                        <li class="nav-item">

                        </li>
                    </ul>
                </nav>
                </nav>

            </div>
        </div>
        </>
    )
}
}

export default AdminNavbar
