import { useState, useEffect } from "react";
import { Button, Container, Table, Modal } from "react-bootstrap";
import axios from 'axios';

const OrderList = () => {
    const [orders, setOrders] = useState([]);


    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/orders');
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
            <Container>
                <h2 className='mt-3 mb-3 text-center'>Orders</h2>
                <Table bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Order Date</th>
                            <th>Customer Name</th>
                            <th>Products</th> 
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.date}</td>
                                <td>{order.customer_name}</td>
                                <td>
                                    {order.products.map((product, index) => (
                                        <div key={index}>
                                            {product.product_name} 
                                        </div>
                                ))}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
    );
};

export default OrderList;