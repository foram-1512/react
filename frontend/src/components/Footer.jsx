import React, { useState } from "react";
import { useLocation, Link } from 'react-router-dom';


function Footer() {
    let location = useLocation();
    let path = "/" + (location?.pathname?.split('/')?.[1] || '');

   

    if (path === '/' || path === '/SignUp' || path === '/Dashboard' || path === '/Home' || path === '/AddToCart'
    || path === '/Order'|| path === '/OrderListing'|| path === '/AddBook' || path === '/P404' || path === '/BookListing'
    ) {
        return (
            <>
                <footer class="main-footer d-flex justify-content-center " >
                    <strong>Copyright &copy; 2024-2025 <Link to="">Foram Panchal</Link>. </strong>
                    All rights reserved.
                    <div class="float-right  d-none d-sm-inline-block">
                        <b>Version</b> 3.2.0
                    </div>
                </footer>
            </>

        )
    }
}

export default Footer
