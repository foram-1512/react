import React, { useState, useEffect, useRef  } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { addNewUser, getUserListing, getDeleteUser,getUpdateUser,getUserDetail } from '../../services/HomeService';
import AdminSidebar from './AdminSidebar';

function AddUser() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(false);
    const [mes, setMes] = useState('');
    const route = useNavigate();
    const [Edituser, SetEdituser] = useState(null);
    const demoModeRef = useRef();

    const user_id = localStorage.getItem("user_id");

    const userForm = (data) => {
        addNewUser({
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
                    toast.success('User added successfully');
                } else {
                    toast.error('Email already registered. Please use a different email.');
                }
            })
            .catch(error => {
                console.error('Adding User failed:', error);
            });
    };

    useEffect(() => {
        getUserListing()
            .then(response => {
                setUsers(response?.data);
            })
            .catch(error => {
                console.error("Error user listing:", error);
            });
    }, []);

    const saveChange = (id) => {

        getUpdateUser(Edituser)
    
          .then(getUpdateUser => {
            console.log("ghjkdfghj", Edituser);
            const editUsers = users?.map(u => {
              return u.id === Edituser?.id ? Edituser : u;
            });
            setUsers(editUsers);
    
            toast.success("User updated successfully");
          })
          .catch(error => {
            console.error("fcvgbhmjmk", error);
            toast.error("Error updating user");
          });
    
      };
    const handleEdit = (id) => {
        getUserDetail({ id: id })
          .then(response => {
            console.log("editid", id);
            SetEdituser(response.data[0]);
          })
          .catch(error => {
            console.error("Error in user listing:", error);
          });
        // Show the modal
        const modal = document.getElementById('demoModal');
        if (modal) {
          modal.classList.add('show');
          modal.style.display = 'block';
        }
      };
    const editModel = (id) => {
        demoModeRef.current.classList.add('fade');
        demoModeRef.current.classList.add('show');
        demoModeRef.current.style.display = 'none';

    };
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                getDeleteUser({ user_id: id })
                    .then(r => {
                        const afterDeleteListing = users.filter((r) => {
                            if (r?.id !== id) {
                                return r;
                            }
                        });
                        setUsers(afterDeleteListing);
                    })
                    .catch(error => {
                        console.error("Error deleting users", error);
                    });
                Swal.fire({
                    title: "Deleted!",
                    text: "User has been deleted.",
                    icon: "success"
                });
            }
        });
    };


    return (
        <>
            <div className="row">
                <div className="col=2">
                    <AdminSidebar />
                </div>
                <div className="col=10">
                    <main>
                        <section className=" content-wrapper">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-8 mx-auto col-12">

                                        <div className="row">
                                            <h1 className="hero-title text-center mb-5" style={{ marginTop: "25px" }}>Add New User</h1>

                                            <div className="col-lg-10 col-12 mx-auto">
                                                <form className="addBook-form border border-3 p-5" onSubmit={handleSubmit(userForm)}>
                                                    <div className="row">
                                                        <div className="form-floating col-11 mb-4 p-0 ms-4 me-3">
                                                            <input type="text" name="name" id="name" className="form-control" placeholder="Name" {...register("name", { required: "Please enter name" })} />
                                                            <label htmlFor="name">Name</label>
                                                            <p className='text-danger'>{errors.name?.message}</p>
                                                        </div>

                                                    </div>
                                                    <div className="row">
                                                        <div className="form-floating col-3 mb-4 p-0 ms-4 me-2">
                                                            <select id="role" {...register("role", { required: "Please select role" })}>
                                                                <option value="">Select Role</option>
                                                                <option value="subadmin">Sub Admin</option>
                                                                <option value="user">User</option>

                                                            </select>
                                                            <p className='text-danger'>{errors.role?.message}</p>
                                                        </div>
                                                        <div className="form-floating col-3 mb-4 p-0 ms-2 me-4">

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

                                                        <div className="form-floating col-3 mb-4 p-0 ms-4 me-2">
                                                            <input id="mobile" type="number" placeholder="Mobile" {...register("mobile", { required: "Please enter Mobile", pattern: { value: /^\d{10}$/, message: "Please enter valid mobile number" } })} />
                                                            {/* <label htmlFor="mobile">Mobile</label> */}
                                                            <p className='text-danger'>{errors.mobile?.message}</p>
                                                        </div>

                                                    </div>
                                                    <div className="row">
                                                        <div className="form-floating col-5 mb-4 p-0 ms-4 me-3">
                                                            <input type="email" name="email" id="email" className="form-control" placeholder="Email address" {...register("email", { required: "Please enter valid email" })} />
                                                            <label htmlFor="email">Email address</label>
                                                            <p className='text-danger'>{errors.email?.message}</p>
                                                        </div>

                                                        <div className="form-floating col-5 mb-4 p-0 ms-4 me-3">
                                                            <input type="password" name="password" id="password" className="form-control" placeholder="Password" {...register("password", { required: "Please enter password" })} />
                                                            <label htmlFor="password">Password</label>
                                                            <p className='text-danger'>{errors.password?.message}</p>
                                                        </div>
                                                    </div>

                                                    <button type="submit" className="btn btn-primary ms-5" style={{ width: "460px" }} disabled={isSubmitting}>Add</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="main content-wraper">
                                        <h2 className='d-flex justify-content-center mt-3'>User List</h2>

                                        <div className="table-responsive mt-5 d-flex justify-content-start me-5">
                                            <table className="table table-striped me-5 " >
                                                <thead>
                                                    <tr>
                                                        <th>User ID</th>
                                                        <th>Name</th>
                                                        <th>Role</th>
                                                        <th>Mobile</th>
                                                        <th>Email</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {users.length > 0 ? (
                                                        users.map((u, index = 1) => (
                                                            <tr key={index}>
                                                                {/* <td>{index + 1}</td> */}
                                                                <td>{u?.id}</td>
                                                                <td>{u?.name}</td>
                                                                <td>{u?.role}</td>
                                                                <td>{u?.mobile}</td>
                                                                <td>{u?.email}</td>
                                                                <td>

                                                                    <>
                                                                        <button className="btn btn-success me-2" onClick={() => handleEdit(u?.id)}>Edit</button>
                                                                        <button className="btn btn-danger" onClick={() => handleDelete(u?.id)}>Delete</button>
                                                                    </>

                                                                </td>
                                                            </tr>

                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan="8" className="text-center">No user Found</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>
                </div>
            </div>
            {/* Edit Modal */}

            <div className="modal fade" ref={demoModeRef} id={`demoModal`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit User</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body border-2">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">User Name</label>
                                    <input type="text" className="form-control" id="name" value={Edituser?.name || ''} onChange={(e) => SetEdituser({ ...Edituser, name: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="author" className="form-label">Role</label>
                                    <input type="text" className="form-control" id="role" value={Edituser?.role || ''} onChange={(e) => SetEdituser({ ...Edituser, role: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Country Code</label>
                                    <input type="text" className="form-control" id="country_code" value={Edituser?.country_code || ''} onChange={(e) => SetEdituser({ ...Edituser, country_code: e.target.value })} />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="pages" className="form-label">Contact Number</label>
                                    <input type="number" className="form-control" id="mobile" value={Edituser?.mobile || ''} onChange={(e) => SetEdituser({ ...Edituser, mobile: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tags" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" value={Edituser?.email || ''} onChange={(e) => SetEdituser({ ...Edituser, email: e.target.value })} />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={() => editModel()} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={() => saveChange(Edituser?.id, Edituser)} className="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
                        </div>
                    </div>
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
                theme="light"
            />

        </>


    );
}

export default AddUser;
