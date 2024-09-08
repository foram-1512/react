import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import { getModuleListing, addPermission, getUserListing } from '../../services/HomeService';
import AdminSidebar from './AdminSidebar';

function Permission() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [users, setUsers] = useState([]);
  const [modules, setModules] = useState([]);
  const [permissions, setPermissions] = useState({});
  const navigate = useNavigate();

  const user_id = localStorage.getItem("user_id");

  useEffect(() => {
    getModuleListing()
      .then(response => {
        setModules(response?.data);
      })
      .catch(error => {
        console.error("Error fetching module listing:", error);
      });
  }, []);

  useEffect(() => {
    getUserListing()
      .then(response => {
        setUsers(response?.data);
      })
      .catch(error => {
        console.error("Error fetching user listing:", error);
      });
  }, []);

  const handleCheckboxChange = (moduleId, permissionType) => {
    setPermissions(prevPermissions => ({
      ...prevPermissions,
      [moduleId]: {
        ...prevPermissions[moduleId],
        [permissionType]: !prevPermissions[moduleId]?.[permissionType]
      }
    }));
  };

  const onSubmit = () => {
    const payload = [];

    Object.keys(permissions).forEach(moduleId => {
      const modulePermissions = permissions[moduleId];
      const data = {
        user_id: user_id,
        module_id: moduleId,
        is_added: modulePermissions.Create || false,
        is_edit: modulePermissions.Update || false,
        is_view: modulePermissions.View || false,
        is_delete: modulePermissions.Delete || false,
      };
      payload.push(data);
    });

    Promise.all(payload.map(data => addPermission(data)))
      .then(responses => {
        if (responses.every(response => response.data)) {
          toast.success('Permissions saved successfully');
        } else {
          toast.error('Error saving some permissions');
        }
      })
      .catch(error => {
        console.error('Failed to save permissions', error);
        toast.error('Failed to save permissions');
      });
  };

  return (
    <>
      <div className="row">
        <div className="col=">
          <AdminSidebar />
        </div>
        <div className="col=10">
          <main>
            <section className="content-wrapper mb-5">
              <div className="container">
                <h1 className="hero-title text-center mb-5">
                  Access And Permission
                </h1>
                <nav className="navbar bg-body-tertiary">
                  <div className="container-fluid">
                    <a className="navbar-brand"></a>
                    <label>Select User</label>
                    <select className="form-control lg me-2 custom-dropdown">
                      {users.map((u, index) => (
                        <option id={`user-${index}`} value="Select SubAdmin">{u.name}</option>
                      ))}
                    </select>

                  </div>
                </nav>
                <main>
                  <div className="container">
                    {modules.length > 0 ? (
                      <>
                        <table className="table table-danger">
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Name</th>
                              <th>Create</th>
                              <th>Update</th>
                              <th>Delete</th>
                              <th>View</th>
                            </tr>
                          </thead>
                          <tbody>
                            {modules.map((module, index) => (
                              <tr key={index}>
                                <td className='fs-3'>{module.id}</td>
                                <td className='fs-3'>{module.name}</td>
                                {["Create", "Update", "Delete", "View"].map((permission, permIndex) => (
                                  <td key={permIndex} className='fs-3'>
                                    <input
                                      type="checkbox"
                                      className="checkbox fs-3"
                                      checked={permissions[module.id]?.[permission] || false}
                                      onChange={() => handleCheckboxChange(module.id, permission)}
                                    />
                                    <span style={{ marginLeft: '10px' }}>{permission}</span>
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div className="d-grid gap-3 d-md-flex justify-content-md-end">
                          <button
                            type="button"
                            className="btn btn-lg btn-info"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Save Permission"
                            onClick={handleSubmit(onSubmit)}
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            className="btn btn-lg btn-success"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Edit Permission"
                          >
                            Edit
                          </button>
                        </div>
                      </>
                    ) : (
                      <p className="text-center">No Module Found</p>
                    )}
                  </div>
                </main>
              </div>
            </section>
          </main>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Permission;
