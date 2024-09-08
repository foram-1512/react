import { fetchWrapper } from '../utils/fetch.wrapper';

export function getLogin(body) {
    return fetchWrapper(
      `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_AUTH}/login`, body, "POST",false
    );
  }

  export function getSignup(body) {
    return fetchWrapper(
      `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_AUTH}/registration`, body, "POST",false
    );
  }
  
  export function addNewUser(body) {
    return fetchWrapper(
      `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_AUTH}/addUser`, body, "POST",false
    );
  }

  export function addBook(body) {
    return fetchWrapper(
      `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_AUTH}/add_book`, body, "POST",false
    );
  }
  

  export function addPermission(body) {
    return fetchWrapper(
      `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_AUTH}/add_permission`, body, "POST",false
    );
  }
  
  export function getModuleListing(body) {
    return fetchWrapper(
      `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_AUTH}/module_listing`, body, "GET",true
    );
  }

  export function getUserListing(body) {
    return fetchWrapper(
      `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_AUTH}/user_listing`, body, "GET",true
    );
  }
  
  export function getUserDetail(body) {
    return fetchWrapper(
      `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_AUTH}/view_userDetail`, body, "POST",true
    );
  }
  export function getDeleteUser(body) {
    return fetchWrapper(
      `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_AUTH}/delete_user`, body, "POST",true
    );
  }
  
  export function getUpdateUser(body) {
    return fetchWrapper(
      `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_AUTH}/edit_user`, body, "POST",true
    );
  }
  export function getBookListing(body) {
    return fetchWrapper(
      `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_AUTH}/book_listing`, body, "GET",true
    );
  }

  export function getDeleteBook(body) {
    return fetchWrapper(
      `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_AUTH}/delete_book`, body, "POST",true
    );
  }

  export function getUpdateBook(body) {
    return fetchWrapper(
      `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_AUTH}/edit_book`, body, "POST",true
    );
  }

  export function getBookDetail(body) {
    return fetchWrapper(
      `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_AUTH}/view_bookDetail`, body, "POST",true
    );
  }

  export function getUpdateStatus(body) {
    return fetchWrapper(
      `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_AUTH}/update_status`, body, "POST",true
    );
  }

  export function getUpdateStatusReject(body) {
    return fetchWrapper(
      `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_AUTH}/update_status_reject`, body, "POST",true
    );
  }

  export function getAdminOrderList(body) {
    return fetchWrapper(
      `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_AUTH}/admin_order_listing`, body, "POST",true
    );
  }
  
  export function getCartListing(body) {
    return fetchWrapper(
      `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_AUTH}/cart_listing`, body, "POST",true
    );
  }

  export function add_order(body) {
    return fetchWrapper(
      `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_AUTH}/add_order`, body, "POST",true
    );
  }

  export function cart_remove(body) {
    return fetchWrapper(
      `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_AUTH}/cart_remove`, body, "POST",true
    );
  }
  
  export function getAddToCart(body) {
    return fetchWrapper(
      `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_AUTH}/add_to_cart`, body, "POST",true
    );
  }

  export function getOrderListing(body) {
    return fetchWrapper(
      `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_AUTH}/order_listing`, body, "POST",true
    );
  }

  export function getOrderCount(body) {
    return fetchWrapper(
      `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_AUTH}/order_Count`, body, "POST",true
    );
  }

  
  export function getOrderPlaced(body) {
    return fetchWrapper(
      `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_AUTH}/place_order`, body, "POST",true
    );
  }

    
  export function getPaymentGenerate(body) {
    return fetchWrapper(
      `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_AUTH}/paymentLinkGeneration`, body, "POST",true
    );
  }
  
  export function getSubscriptionListing(body) {
    return fetchWrapper(
      `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_AUTH}/subscription_listing`, body, "POST",true
    );
  }
    
  export function getSubscriptionPage(body) {
    return fetchWrapper(
      `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_AUTH}/get_subscription_page`, body, "POST",true
    );
  }



// export function getLogin(body) {

//     return fetchWrapper.getheaderdata1(`http://localhost:3344/api/V1/Auth/login`, body);
// }

// export function getSignup(body) {

//     return fetchWrapper.getheaderdata1(`http://localhost:3344/api/V1/Auth/registration`, body);
// }

// export function addBook(body) {
//     console.log("ddddddd");
//     return fetchWrapper.getdata(`http://localhost:3344/api/V1/Auth/add_book`, body);
// }

// export function getBookListing() {
   
//     return fetchWrapper.get(`http://localhost:3344/api/V1/Auth/book_listing`,{});
// }

// export function getDeleteBook(body) {
//     return fetchWrapper.getheaderdata(`http://localhost:3344/api/V1/Auth/delete_book`, body);
// }

// export function getUpdateBook(body) {
//     console.log("foram", body);
//     return fetchWrapper.getheaderdata(`http://localhost:3344/api/V1/Auth/edit_book`, body);
// }   

// export function getBookDetail(body) {
//     console.log("foram     ghjkulp", body);
//     return fetchWrapper.getheaderdata(`http://localhost:3344/api/V1/Auth/view_bookDetail`, body);
// }
