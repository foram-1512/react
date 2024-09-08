import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getLogin } from '../services/HomeService';

function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useNavigate();

    const onSubmit = (data) => {
        getLogin({ email: data?.email, password: data?.password })
            .then(r => {
                if (r?.data) {
                    console.log(r?.data[0].token);
                    localStorage.setItem("token", JSON.stringify(r?.data[0].token));
                    localStorage.setItem("user_id", JSON.stringify(r?.data[0].id));
                    localStorage.setItem("name", JSON.stringify(r?.data[0].name));
                    localStorage.setItem("role", JSON.stringify(r?.data[0].role));
                    localStorage.setItem("stripe_id", JSON.stringify(r?.data[0].stripe_id));
                    const Role = r?.data[0].role;
                    if (Role === 'superadmin') {
                        router('/Dashboard', { state: r?.data.data });
                    }else if (Role === 'subadmin') {
                        router('/Dashboard', { state: r?.data.data });
                    } else if (Role === 'user') {
                        
                        router('/Home', { state: r?.data.data });
                    } else {
                        toast.error("Invalid role");
                    }
                } else {
                    toast.error("Invalid credentials");
                    console.log('Login failed:', r?.data);
                }
            })
            .catch(error => {
               toast.error("Data not found")
            });
    };

    return (
        <>
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

            <main>
                <section className="sign-in-form section-padding">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 mx-auto col-12">
                                <h1 className="hero-title text-center mb-5">Login</h1>
                                <div className="row">
                                    <div className="col-lg-8 col-11 mx-auto">
                                        <form className="Login-form" onSubmit={handleSubmit(onSubmit)}>
                                            <div className="form-floating mb-4 p-0">
                                                <input type="email" name="email" id="email" pattern="[^ @]*@[^ @]*" className="form-control" placeholder="Email address"
                                                    {...register("email", { required: "Please enter a valid email" })} />
                                                <label htmlFor="email">Email address</label>
                                                <p className='text-danger'>{errors.email?.message}</p>
                                            </div>
                                            <div className="form-floating p-0">
                                                <input type="password" name="password" id="password" className="form-control" placeholder="Password"
                                                    {...register("password", { required: "Please enter a password" })} />
                                                <label htmlFor="password">Password</label>
                                                <p className='text-danger'>{errors.password?.message}</p>
                                            </div>
                                            <button type="submit" className="btn btn-outline-primary custom-btn form-control mt-4 mb-3">
                                                Login
                                            </button>
                                            <p className="text-center">Don’t have an account? <Link to="/SignUp">Create One</Link></p>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default Login;
