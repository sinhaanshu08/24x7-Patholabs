import React from 'react';
import './Orders.css'

const Orders = () => {
  return (
    <div style={{margin:'100px'}} className="orders-container">
      <h2>My Orders</h2>
      <div className="order-list">
        <div className="order-item">
          <p>Order #001</p>
          <p>Status: Delivered</p>
          {/* Add more order details here */}
        </div>
        {/* Add more order items as needed */}
      </div>
    </div>
  );
}

export default Orders;
