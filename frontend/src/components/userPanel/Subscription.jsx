import React, { useState, useEffect} from 'react';
import { getSubscriptionListing ,getSubscriptionPage} from '../../services/HomeService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';


const Subscription = () => {
    const route = useNavigate();
    const [subscriptionData, setsubscriptionData] = useState([]);
    const stripe_id = JSON.parse(localStorage.getItem("stripe_id")); 
    useEffect(() => {
        console.log(stripe_id,"fghj");
        getSubscriptionListing()
        .then(response => {
            setsubscriptionData(response?.data);
        })
        .catch(error => {
          console.error("Error Subscription listing:", error);
        });
    }, []);

    const getUrl = (id) => {
        getSubscriptionPage({
            price_id:id,
            customer_id:stripe_id
        }) 
        .then(response => {
            console.log("order",response)
            window.open(response?.data.url, "_self");
            route('/Home');
            toast.success("Subscription successfully done!");
        })
        .catch(error => {
            console.error('Error failed to Subscription', error);
        });
    };

    const cancleSubscrption = (id) => {
        // getSubscriptionPage({
        //     price_id:id,
        //     customer_id:stripe_id
        // }) 
        // .then(response => { 
        //     console.log("order",response)
        //     window.open(response?.data.url, "_self");
        //     route('/Home');
        //     toast.success("Subscription successfully done!");
        // })
        // .catch(error => {
        //     console.error('Error failed to Subscription', error);
        // });
    };
  return (
  <>
  <section className="pricing-section">
        <div className="container">
            <div className="sec-title text-center">
                <span className="title">Get plan</span>
                <h2>Choose a Subscription Plan</h2>
            </div>
           
            <div className="outer-box">

                <div className="row">
                {subscriptionData?.length > 0 ? (
                            subscriptionData?.map((s, index) => (
                    <div className="pricing-block col-lg-4 col-md-6 col-sm-12 wow fadeInUp">
                        <div className="inner-box">
                            <div className="icon-box">
                                <div className="icon-outer"><i className="fas fa-paper-plane"></i></div>
                            </div>
                            <div className="price-box">
                                <div className="title">{s.name}</div>
                                <h4 className="price">${s.price}</h4>
                            </div>
                            <div className='text'>
                              <p className="text">{s.description}</p>
                            </div>
                            <div class="btn-box">
                                <Link to="" class="theme-btn" onClick={() => getUrl(s.price_id) }>BUY PLAN</Link>
                                <Link to="" class="theme-btn" onClick={() => cancleSubscrption(s.price_id) }>BUY PLAN</Link>
                            </div>
                        </div>
                    </div>
                    ))
                ) : (
                    <tr>
                        <td colSpan="6" className="text-center">No Plan Found</td>
                    </tr>
                )}
   
                </div>
            </div>
               
        </div>
    </section>
    
  </>
  )
}

export default Subscription
