import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import P404 from './components/P404';
import Dashboard from './components/adminPannel/Dashboard';
import Footer from './components/Footer';
import AddUser from './components/adminPannel/AddUser';
import Addbook from './components/adminPannel/Addbook';
import BookListing from './components/adminPannel/BookListing';
import Home from './components/userPanel/Home';
import Navbar from './components/userPanel/Navbar'
import AddToCart from './components/userPanel/AddToCart';
import Order from './components/userPanel/Order';
import OrderListing from './components/adminPannel/OrderListing';
import AdminSidebar from './components/adminPannel/AdminSidebar';
import Subscription from './components/userPanel/Subscription';
import Permission from './components/adminPannel/Permission';



function Router() {

  return (
    <BrowserRouter>
      <Navbar />
      <main>

        <Routes>

          <Route path="*" element={<P404 />} />
          <Route path="/" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/AdminSidebar" element={<AdminSidebar />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/AddUser" element={<AddUser />} />
          <Route path="/Addbook" element={<Addbook />} />
          <Route path="/BookListing" element={<BookListing />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/AddToCart" element={<AddToCart />} />
          <Route path="/Order" element={<Order />} />
          <Route path="/OrderListing" element={<OrderListing />} />
          <Route path="/Subscription" element={<Subscription />} />
          <Route path="/Permission" element={<Permission />} />

        </Routes>

      </main>

      <Footer />

    </BrowserRouter>
  );
}

export default Router;
