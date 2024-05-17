import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import "./AdminRouting.css";
import Header from './Header';
import Sidebar from './Sidebar';
import Home from './Home';
import TestInventory from './TestInventory/TestInventory';
import Orders from './Orders/RecentOrders';
import Customers from './Customers/Customers';
import Reports from './Reports/Reports';
import Feedback from './Feedback/Feedback';
import NotFound from '../User/NotFound';

function AdminRouting() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test-inventory/*" element={<TestInventory />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/*" element={<NotFound />} />

      </Routes>
    </div>
  );
}

export default AdminRouting;





