import React, { useState, useEffect } from 'react';
import { getAddToCart, getBookListing } from '../../services/HomeService';
import { Link, useNavigate } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
const Home = () => {
    const navigate = useNavigate();
    const [books, setBooks] = useState([0]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const user_id = localStorage.getItem('user_id');
    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };
    useEffect(() => {
        const fetchBooks = () => {
            getBookListing()
                .then(response => {
                    console.log(response)
                    setBooks(response?.data);
                })
                .catch(error => {
                    console.error('Error fetching books:', error);
                });
        };
        fetchBooks();
    }, []);

    const handleView = (book) => {
        setSelectedBook(book);
    };

    const handleCloseModal = () => {
        setSelectedBook(null);
    };



    const handleOrderNow = (id, price) => {
        getAddToCart({
            user_id: user_id,
            id: id,
            quantity: quantity,
            price: price
        })
            .then(response => {
                console.log(response, "hfdsd")
                setBooks(response?.data?.data);
                navigate('/AddToCart');
            })
            .catch(error => {
                console.error('Error failed to cart:', error);
            });
    }

    return (
        <>
            <ToastContainer />

            <div className="main">
                <div className="d-flex justify-content-between align-items-center" style={{ marginTop: "80px", marginBottom: "50px" }}>
                    <div></div>
                    <h1 className="text-center flex-grow-4" >Book List</h1>
                <Link to="/Subscription" className='btn btn-primary text-light stretched-link'>Add Subscription</Link>
                </div>

                <div className="row row-cols-1 row-cols-md-4 g-4">
                    {books.map((book, index) => (
                        <div className="col" key={index}>
                            <div className="card card-hover h-5 w-5">
                                <img src={book?.thumbnail} className="card-img-top p-2 border border-1" alt="Art cover" style={{ height: '250px' }} />
                                <div className="card-body">
                                    <h5 className="card-title"><b>Title :</b> {book?.title}</h5>
                                    <p className="card-text"><b>Author :</b> {book?.author}</p>
                                    <p className="card-text"><b>No of Pages :</b> {book?.pages}</p>
                                    <p className="card-text"><b>Price :</b> ${book?.price}</p>
                                    <p className="card-text"><b>Tags :</b> {book?.tags}</p>
                                    <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                                        <button className="btn btn-primary me-2" onClick={() => handleView(book)}>View</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            <div className="modal" id="exampleModal" tabIndex="-1" style={{ display: selectedBook ? 'block' : 'none' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Book Details</h5>
                            <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseModal}></button>
                        </div>
                        <div className="modal-body">
                            {selectedBook && (
                                <div>
                                    <h5>Title: {selectedBook?.title}</h5>
                                    <p><b>Author :</b> {selectedBook?.author}</p>
                                    <p><b>No of Pages :</b> {selectedBook?.pages}</p>
                                    <p><b>Price :</b> ${selectedBook?.price}</p>
                                    <p><b>Tags :</b> {selectedBook?.tags}</p>
                                    <p><b>Total_Price:</b> ${selectedBook?.price * quantity}</p>

                                </div>
                            )}
                        </div>
                        <div className="modal-footer">

                            <button className="btn btn-danger" onClick={handleDecrement}>-</button>
                            <span>{quantity}</span>
                            <button className="btn btn-primary" onClick={handleIncrement}>+</button>
                            <button className="btn btn-success" onClick={() => handleOrderNow(selectedBook?.id, selectedBook?.price)}>Add To Cart</button>
                            <button className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Home;
