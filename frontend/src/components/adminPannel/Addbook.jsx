import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useForm } from 'react-hook-form';
import { addBook } from '../../services/HomeService';
import AdminSidebar from './AdminSidebar';



function Addbook() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const [error, setError] = useState(false);
    const [mes, setMes] = useState('');
    const router = useNavigate();

    const user_id = localStorage.getItem("user_id");


    const bookForm = data => {


        var formData = new FormData();
        formData.append('name', data.name);
        formData.append('thumbnail', data.thumbnail[0]);
        formData.append('title', data.title);
        formData.append('author', data.author);
        formData.append('book_pdf', data.pdf[0]);
        formData.append('pages', data.pages);
        formData.append('price', data.price);
        formData.append('tags', data.tags);
        formData.append('user_id', user_id);

        addBook(formData).then((r) => {

            if (r.code == 1) {
                toast.success(r?.message);
                setTimeout(() => {
                    router('/Dashboard');
                }, 1500);
            } else {
                setMes(r?.message)
                setError('true')
                toast.error(r?.message);
            }
        });
    };


    return (
        <>

            <AdminSidebar />

            <main>
                <section className=" content-wrapper">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 mx-auto col-12">

                                <div className="row">
                                    <h1 className="hero-title text-center mb-5" style={{ marginTop: "25px" }}>Add New Book</h1>

                                    <div className="col-lg-10 col-12 mx-auto">
                                        <form className="addBook-form border border-3 p-5" onSubmit={handleSubmit(bookForm)}>
                                            <div className="row">
                                                <div className="form-floating col-5 mb-4 p-0 ms-4 me-3">
                                                    <input type="text" name="name" id="name" className="form-control" placeholder="Name" {...register("name", { required: "Please enter name" })} />
                                                    <label htmlFor="name">Book Name</label>
                                                    <p className='text-danger'>{errors.name?.message}</p>
                                                </div>

                                                <div className="form-floating col-5 mb-4 p-0">
                                                    <input type="text" name="title" id="title" className="form-control" placeholder="Book Title" {...register("title", { required: "Please enter tilte of the book " })} />
                                                    <label htmlFor="title">Book Title</label>
                                                    <p className='text-danger'>{errors.title?.message}</p>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="form-floating col-5 mb-4 ms-4 p-0 me-3">
                                                    <input type="text" name="author" id="author" className="form-control" placeholder="Book Author Name" {...register("author", { required: "Please enter book author name " })} />
                                                    <label htmlFor="author">Book Author Name</label>
                                                    <p className='text-danger'>{errors.author?.message}</p>
                                                </div>

                                                <div className="form-floating col-5 mb-4 p-0">
                                                    <input type="file" name="thumbnail" id="thumbnail" className="form-control" placeholder="Thumbnail of the book" {...register("thumbnail", { required: "Please enter thumbnail of the book " })} />
                                                    <label htmlFor="thumbnail">Thumbnail of the book</label>
                                                    <p className='text-danger'>{errors.thumbnail?.message}</p>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="form-floating col-5 mb-4 ms-4 p-0 me-3">
                                                    <input type="file" name="pdf" id="pdf" className="form-control" placeholder="pdf of the book" {...register("pdf", { required: "Please enter pdf of the book " })} />
                                                    <label htmlFor="pdf">PDF</label>
                                                    <p className='text-danger'>{errors.pdf?.message}</p>
                                                </div>

                                                <div className="form-floating col-5 mb-4 p-0 ">
                                                    <input type="text" name="pages" id="pages" className="form-control" placeholder="Book pages no" {...register("pages", { required: "Please enter number of pages " })} />
                                                    <label htmlFor="pages">No Of Pages</label>
                                                    <p className='text-danger'>{errors.pages?.message}</p>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="form-floating col-5 mb-4 ms-4 p-0 me-3">
                                                    <input type="text" name="price" id="price" className="form-control" placeholder="Book Price" {...register("price", { required: "Please enter book price " })} />
                                                    <label htmlFor="price">Book Price</label>
                                                    <p className='text-danger'>{errors.price?.message}</p>
                                                </div>

                                                <div className="form-floating col-5 mb-4 p-0">
                                                    <input type="text" name="tags" id="tags" className="form-control" placeholder="Book Tags " {...register("tags", { required: "Please enter book tags  " })} />
                                                    <label htmlFor="tags">Book tags </label>
                                                    <p className='text-danger'>{errors.tags?.message}</p>
                                                </div>
                                            </div>
                                                <button type="submit" className="btn btn-primary ms-5" style={{ width: "460px" }} disabled={isSubmitting}>Add</button>
                                        </form>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </main>


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
                theme="light"
            />
        </>
    );
}

export default Addbook;
