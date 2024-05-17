import React from 'react';
import { Table } from 'react-bootstrap';

function RecentOrders() {
    const recentOrders = [
        { id: 1, product: 'Product A', price: '$50', status: 'Delivered' },
        { id: 2, product: 'Product B', price: '$30', status: 'Pending' },
        { id: 3, product: 'Product C', price: '$70', status: 'Processing' },
        { id: 4, product: 'Product D', price: '$20', status: 'Delivered' },
        { id: 5, product: 'Product E', price: '$40', status: 'Pending' },
    ];

    return (
        <div className='recent-orders' style={{ color: 'black' }}>
            <h3>Recent Orders</h3>
            <div className="table-responsive">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentOrders.map(order => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.product}</td>
                                <td>{order.price}</td>
                                <td>{order.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default RecentOrders;
