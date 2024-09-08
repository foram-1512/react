import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUpdateStatus, getUpdateStatusReject, getAdminOrderList } from '../../services/HomeService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminSidebar from './AdminSidebar';

const OrderListing = () => {
    const [orders, setOrders] = useState([]);
    const [acceptedOrders, setAcceptedOrders] = useState([]);
    const [rejectedOrders, setRejectedOrders] = useState([]);
    const navigate = useNavigate();


    const handleAcceptOrder = async (orderId) => {
        try {
            await getUpdateStatus({ id: orderId });
            const updatedOrders = orders.map(order => {
                if (order.id === orderId) {
                    return { ...order, accepted: true ,status: 'Accepted'};
                } else {
                    return order;
                }
            });
            setAcceptedOrders([...acceptedOrders, orderId]);
            toast.success("Status Updated");
            setOrders(updatedOrders);
        } catch (error) {
            console.error('Error accepting order:', error);
        }
    };

    const handleRejectOrder = async (orderId) => {
        try {
            await getUpdateStatusReject({ id: orderId });
            const updatedOrders = orders.map(order => {
                if (order.id === orderId) {
                    return { ...order, status: 'Rejected' };
                } else {
                    return order;
                }
            });
            setRejectedOrders([...rejectedOrders, orderId]);
            toast.success("Status Updated");
            setOrders(updatedOrders);
        } catch (error) {
            console.error('Error rejecting order:', error);
        }
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await getAdminOrderList();
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    return (
        <>
            <ToastContainer />


            <div className="row">
                <div className="col-2">
                    <AdminSidebar />

                </div>
                <div className="col-10">

                    <body id="body-pd">
                        <div className="main content-wraper">
                            <h1 className='d-flex justify-content-center mt-3'>Order Details</h1>

                            <div className="table-responsive mt-5 d-flex justify-content-start me-5">
                                <table className="table table-striped me-5 " >
                                    <thead>
                                        <tr>
                                            <th>Order ID</th>
                                            {/* <th>User Id</th>
                                    <th>Book ID</th> */}
                                            <th>Quantity</th>
                                            <th>Total Price</th>
                                            <th>Order Date</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.length > 0 ? (
                                            orders.map((order, index = 1) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    {/* <td>{order.user_id}</td>
                                                    <td>{order.book_id}</td> */}
                                                    <td>{order.total_qty}</td>
                                                    <td>${order.total_amount || 0}</td>
                                                    <td>{order.order_date}</td>
                                                    <td>{order.status}</td>
                                                    <td>
                                                        {order.status === 'Pending' && !acceptedOrders.includes(order.id) && !rejectedOrders.includes(order.id) && (
                                                            <>
                                                                <button className="btn btn-success me-2" onClick={() => handleAcceptOrder(order.id)}>Accept</button>
                                                                <button className="btn btn-danger" onClick={() => handleRejectOrder(order.id)}>Reject</button>
                                                            </>
                                                        )}
                                                        {acceptedOrders.includes(order.id) && <span>Accepted</span>}
                                                        {rejectedOrders.includes(order.id) && <span>Rejected</span>}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="8" className="text-center">No Orders Found</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </body>
                    

                </div>
            </div>




        </>
    );
};

export default OrderListing;
