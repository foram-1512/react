import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { getOrderCount } from '../../services/HomeService';

function Dashboard() {
  let location = useLocation();
  let path = "/" + (location?.pathname?.split('/')?.[1] || '');
  const [order, setOrder] = useState([0]);

  useEffect(() => {

    getOrderCount()
      .then(response => {
        console.log(response)
        setOrder(response?.data);
      })
      .catch(error => {
        console.error('Error fetching books:', error);
      });

  }, []);

  if (['/Dashboard', '/OrderListing', '/Addbook', '/BookListing'].includes(path)) {
    return (
      <>
        <AdminSidebar />
        <div className="content-wrapper">
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1 className="m-0">Dashboard</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item active">Dashboard v1</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div className="container-fluid">
            {order.length > 0 ? (
              order.map((o, index) => (
                <div className="row " key={index}>
                  <div className="col-lg-3 col-6">
                    <div className="small-box bg-secondry">
                      <div className="inner">
                        <h3>Total : {o?.total_order}</h3>
                        <h4>Orders</h4>
                      </div>
                      <div className="icon">
                        <i className="ion ion-bag"></i>
                      </div>
                      <a href="#" className="small-box-footer"><i className="fas fa-arrow-circle-right"></i></a>
                    </div>
                  </div>
                  <div className="col-lg-3 col-6">
                    <div className="small-box bg-info">
                      <div className="inner">
                        <h3>Total : {o?.total_user}</h3>
                        <h4>Users</h4>
                      </div>
                      <div className="icon">
                        <i className="ion ion-bag"></i>
                      </div>
                      <a href="#" className="small-box-footer"><i className="fas fa-arrow-circle-right"></i></a>
                    </div>
                  </div>
                </div>
                
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">No Orders Found</td>
              </tr>
            )}
          </div>
        </div>
      </>
    );
  } else {
    
    return null;
  }
}

export default Dashboard;
