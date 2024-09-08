import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCartListing ,add_order,cart_remove} from '../../services/HomeService';

const AddToCart = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [counts, setCounts] = useState({});
    const [loading, setLoading] = useState(true);
    const user_id = localStorage.getItem('user_id');
    useEffect(() => {
        const fetchCartItems = () => {
            getCartListing({"user_id":user_id})
                .then(response => {
                    console.log(response);
                    setCartItems(response?.data); 
                    //toast.success("Iteam Added Into Cart");
                    navigate('/AddToCart')
                })
                .catch(error => {
                    console.error('Error fetching books:', error);
                });
        };
        fetchCartItems();
    }, []);
    const handleOrderNow = (id, book_id, per_price, qty) => {
        add_order({
            cart_id: id,
            user_id: user_id,
            book_id: book_id,
            qty: qty,
            per_price:per_price
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
        cart_remove( { id: id })
            .then(response => {

                if (response?.data?.success) {
                    setCartItems(cartItems?.filter(item => item.id !== id));
                    toast.error("Item not removed from cart successfully");
                } else {
                    toast.success("Item removed from cart successfully");
                }
            })
            .catch(error => {
                console.error('Error removing item from cart:', error);
                toast.error("Failed to remove item from cart");
            });
    };
  

    return (
        <>
            <div className='container' style={{marginTop:'100px'}}>
                <h2 style={{ marginTop: "80px" }}>Cart Items</h2>
         
                <table className="table table-striped table-light mt-5 " >
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
                                        <button className='ms-2 btn btn-danger' onClick={() => handleRemoveItem(b.id)}>Cancle</button>                                       
                                    </td>                                    
                                </tr>
                            ))                            
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">No Books Found</td>
                            </tr>
                        )}
                        <br/><br/>
                        <button className="btn btn-dark ms-2" onClick={() => handleOrderNow(cartItems)}>Order Now</button>
                    </tbody>
                </table>
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
                theme="light"/>
        </>
    );
};

export default AddToCart;
