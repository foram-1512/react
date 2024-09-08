import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const AdminSidebar = () => {
    let location = useLocation();
    const navigate = useNavigate();
    let path = "/" + (location?.pathname?.split('/')?.[1] || '');
    const handleLogout = () => {
        console.log("lg")
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        navigate('/');
    };
    var name = JSON.parse(localStorage.getItem('name'));
    var role = JSON.parse(localStorage.getItem('role'));
    return (
        <>
            <aside className="main-sidebar sticky-top sidebar elevation-4" style={{ height: "500px" }}>
                <div className="sidebar">
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div className="info">
                            <h4 className='text-dark'>Welcome {name}</h4>
                        </div>
                    </div>

                    <div className="form-inline mt-3">
                        <div className="input-group" data-widget="sidebar-search">
                            <input className="form-control form-control-sidebar " type="search" placeholder="Search" aria-label="Search" />
                            <div className="input-group-append">
                                <button className="btn btn-sidebar">
                                    <i className="fas fa-search fa-fw"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <nav className="mt-3">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            <li className="nav-item ">
                                <Link to="/Dashboard" className="nav-link">
                                    <i className="nav-icon fas fa-home-alt"></i>
                                    <p>Home</p>
                                </Link>
                            </li>

                            {role === 'superadmin' && (
                                <li className="nav-item ">
                                    <Link to="/AddUser" className="nav-link">
                                        <i className="nav-icon fas fa-plus"></i>
                                        <p>Add User</p>
                                    </Link>
                                </li>
                            )}

                            <li className="nav-item">
                                <Link to="/BookListing" className="nav-link">
                                    <i className="nav-icon fas fa-list-alt"></i>
                                    <p>Book Listing</p>
                                </Link>
                            </li>
                            <li className="nav-item ">
                                <Link to="/AddBook" className="nav-link">
                                    <i className="nav-icon fas fa-plus"></i>
                                    <p>Add Book</p>
                                </Link>
                            </li>
                            <li className="nav-item ">
                                <Link to="/OrderListing" className="nav-link">
                                    <i className="nav-icon fas fa-list-alt"></i>
                                    <p>Order Listing</p>
                                </Link>
                            </li>

                            {role === 'superadmin' && (
                                <li className="nav-item ">
                                    <Link to="/Permission" className="nav-link">
                                        <i className="nav-icon fa-solid fa-user-lock"></i>
                                        <p>Permission & Access</p>
                                    </Link>
                                </li>
                            )}

                            <li className="nav-item">
                                <i className="nav-icon fas fa-right-from-bracket ms-5"></i>
                                <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
        </>
    );
};

export default AdminSidebar;
