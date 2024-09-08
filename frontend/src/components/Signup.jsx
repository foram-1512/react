import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import { getSignup } from '../services/HomeService';


function Signup() {
    const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm();
    const [error, setError] = useState(false);
    const [mes, setMes] = useState('');
    const route = useNavigate();
    const password = watch("password", "");

    const signupForm = (data) => {
        getSignup({
            name: data?.name,
            role: data?.role,
            country_code: data?.country_code,
            mobile: data?.mobile,
            email: data?.email,
            password: data?.password,
          })
            .then(response => {
                if (response.data) {  
                    console.log(response.data)     
                    toast.success('Registration successful');
                   route('/');               
                } else {
                    toast.error('Email already registered. Please use a different email.');
                }
            })
            .catch(error => {
                console.error('Registration failed:', error);
            });
    };
  
    return (
        <>
            <main>
                <section className="sign-up-form section-padding">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 mx-auto col-12">
                                <h1 className="hero-title text-center mb-5">Registration</h1>
                                <div className="row">
                                    <div className="col-lg-8 col-11 mx-auto">
                                        <form className="signup-form" onSubmit={handleSubmit(signupForm)}>
                                            <div className="form-floating mb-4 p-0">
                                                <input type="text" name="name" id="name" className="form-control" placeholder="Name" {...register("name", { required: "Please enter name" })} />
                                                <label htmlFor="name">Name</label>
                                                <p className='text-danger'>{errors.name?.message}</p>
                                            </div>

                                            <div className="form-floating mb-4 p-0">
                                                <select id="role" {...register("role", { required: "Please select role" })}>
                                                    <option value="">Select Role</option>
                                                    <option value="admin">Admin</option>
                                                    <option value="user">User</option>
                                                </select>
                                                <p className='text-danger'>{errors.role?.message}</p>
                                            </div>
                                            <div className="field">
                                                <select name="country_code" id="country_code" className='select'
                                                    {...register("country_code", { required: "Please enter Country Code" })}>
                                                    <option>+91 India</option>
                                                    <option>+267 Botswana</option>
                                                    <option>+93 Afganistan</option>
                                                    <option>+81 Japan</option>
                                                    <option>+1 Canada</option>
                                                </select>
                                                <p className='text-danger'>{errors.country_code?.message}</p>

                                            </div>

                                            <div className="field">
                                                <input id="mobile" type="number" placeholder="Mobile" {...register("mobile", { required: "Please enter Mobile", pattern: { value: /^\d{10}$/, message: "Please enter valid mobile number" } })} />
                                                <label htmlFor="mobile">Mobile</label>
                                                <p className='text-danger'>{errors.mobile?.message}</p>
                                            </div>
                                            
                                            <div className="form-floating mb-4">
                                                <input type="email" name="email" id="email" className="form-control" placeholder="Email address" {...register("email", { required: "Please enter valid email" })} />
                                                <label htmlFor="email">Email address</label>
                                                <p className='text-danger'>{errors.email?.message}</p>
                                            </div>
                                            
                                            <div className="form-floating mb-4">
                                                <input type="password" name="password" id="password" className="form-control" placeholder="Password" {...register("password", { required: "Please enter password" })} />
                                                <label htmlFor="password">Password</label>
                                                <p className='text-danger'>{errors.password?.message}</p>
                                            </div>

                                            <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>Sign up</button>
                                        </form>
                                    </div>
                                </div>
                                <p className="mt-3 text-center">Have an account? <Link to="/" className="text-decoration-none">Log in</Link></p>
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

export default Signup;
