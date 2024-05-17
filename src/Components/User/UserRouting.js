import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import MyNavbar from './Navbar';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home/Home';
import About from './About/About';
import Contact from './Contact/Contact';
// import Login from './Login/Login';
// import Signup from './Signup/Signup';
import Help from './Help/Help';
import NotFound from './NotFound';
import PackageDetails from './Home/Content/PackageDetails';
import Cart from './Cart/Cart';
import { CartProvider } from './Cart/CartContext';
import Profile from './Profile/Profile';
import Orders from './Orders/Orders';
import PatientDetails from './PatientDetials/PatientDetials';
import OrderSummary from './OrderSummary/OrderSummary';

function UserRouting() {
    
const [user, setUser] = useState(() => {
    // const auth = getAuth();  
    const user = localStorage.getItem('user');
    
    return user ? JSON.parse(user) : null;
    
    });

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            localStorage.setItem('user', JSON.stringify(user));


        });
        return () => unsubscribe();
    }, []);

    return (
        <div>
            <CartProvider>
                <MyNavbar isAuthenticated={user !== null} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    {/* <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} /> */}
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/help" element={<Help />} />
                    <Route path="/package-details/:id" element={<PackageDetails />} />
                    
                    {/* Private routes for authenticated users */}
                    <Route
                        path="/profile"
                        element={<PrivateUserRoute isAuthenticated={user !== null} element={<Profile />} />}
                    />
                    <Route
                        path="/orders"
                        element={<PrivateUserRoute isAuthenticated={user !== null} element={<Orders />} />}
                    />
                     <Route
                        path="/patient-detials"
                        element={<PrivateUserRoute isAuthenticated={user !== null} element={<PatientDetails />} />}
                    />
                      <Route
                        path="/order-summary"
                        element={<PrivateUserRoute isAuthenticated={user !== null} element={<OrderSummary />} />}
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </CartProvider>
        </div>
    );
}

// Custom route component to check authentication
const PrivateUserRoute = ({ element, isAuthenticated }) => {
    return isAuthenticated ? element : <Navigate to="/" />;
};

export default UserRouting;



