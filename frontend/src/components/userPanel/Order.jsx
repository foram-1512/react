import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCartListing, add_order, cart_remove, getOrderPlaced , getPaymentGenerate} from '../../services/HomeService';


const Order = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [loading, setLoading] = useState(true);
    const user_id = localStorage.getItem('user_id');
    // console.log("id1234567890-", user_id);

    function calculatePrice(items) {
        let total = 0;
        if (items) {
            items.forEach((item) => {
                if (item.price && item.qty) {
                    total += item.price * item.qty;
                }
            });
        }
        setTotalPrice(total);
    }

    const handlePlaceOrder = () => {
        generatePaymentLink();
        orderPlaced();
    };

    useEffect(() => {
        const fetchCartItems = () => {
            getCartListing({ "user_id": user_id })
                .then(response => {
                    console.log("CI",response?.data);
                    setCartItems(response?.data);
                    calculatePrice(response?.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching books:', error);
                    setLoading(false);
                });
        };
        fetchCartItems();
    }, [user_id]);

    const handleOrderNow = (id, book_id, per_price, qty) => {
        add_order({
            cart_id: id,
            user_id: user_id,
            book_id: book_id,
            qty: qty,
            per_price: per_price
        })
            .then(response => {
                console.log(response)
                navigate('/Order');
                //toast.success("Order successfully placed!");
            })
            .catch(error => {
                console.error('Error failed to cart:', error);
            });
    }

    const handleRemoveItem = (id) => {
        cart_remove({ id: id })
            .then(response => {
                if (response?.data?.success) {
                    
                    const updatedCartItems = cartItems.filter(item => item.id !== id);
                    setCartItems(updatedCartItems);
                    calculatePrice(updatedCartItems);
                    toast.success("Item removed from cart successfully");
                } else {
                    toast.error("Item not removed from cart successfully");
                }
            })
            .catch(error => {
                console.error('Error removing item from cart:', error);
                toast.error("Failed to remove item from cart");
            });
    };

    const orderPlaced = () => {
        getOrderPlaced({ "user_id": user_id })
        .then(response => {
            console.log(response)
            // setTimeout(() => {
            //     navigate('/PlaceOrder');
            // }, 1500);
           
            toast.success("Order successfully placed!");
        })
        .catch(error => {
            console.error('Error failed to placed order:', error);
        });
    };

    const generatePaymentLink = () => {
        console.log("object", cartItems)
        getPaymentGenerate(cartItems)
        .then(response => {
            // console.log("order",response)
            window.open(response?.data.url, "_self");
            // setTimeout(() => {
            //     // navigate('/PlaceOrder');
            // }, 1500);
           
            toast.success("Order successfully placed!");
        })
        .catch(error => {
            console.error('Error failed to placed order:', error);
        });
    };

    return (
        <>
            <div className='container' style={{ marginTop: '100px' }}>
                <h2 style={{ marginTop: "80px" }}>Cart Items</h2>

                <table className="table table-striped table-light mt-5 ">
                    <thead>
                        <tr>
                            <th scope="col" className="th">Id</th>
                            <th scope="col" className="th">Book Name</th>
                            <th scope="col" className="th">Price</th>
                            <th scope="col" className="th">Quantity</th>
                            <th scope="col" className="th">Total Price</th>
                            <th scope="col" className="th">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems?.length > 0 ? (
                            cartItems?.map((b, index) => (
                                <tr key={index}>
                                    <td className="th">{b?.id}</td>
                                    <td className="th">{b?.title}</td>
                                    <td className="th">{b?.price}</td>
                                    <td className="th">{b?.qty}</td>
                                    <td className="th">${(b?.price) * (b?.qty)}</td>
                                    <td className="th">
                                        <button className='ms-2 btn btn-danger' onClick={() => handleRemoveItem(b.id)}>Cancel</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">No Books Found</td>
                            </tr>
                        )}
                        <th>
                            <td><>Grand Total :</> ${totalPrice}</td>
                        </th>
                    </tbody>
                </table>

                <div className='d-flex justify-content-center mt-5 mb-5'>
                    <button className="btn btn-dark ms-2" onClick={() => handlePlaceOrder() }>Place Order</button>
                </div>
            </div>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light" />
        </>
    );
};

export default Order;
