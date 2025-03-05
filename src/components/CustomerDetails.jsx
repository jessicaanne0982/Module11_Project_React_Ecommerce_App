import { array, func } from 'prop-types';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, ListGroup, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const CustomerDetails = () => {
    const [customers, setCustomers] = useState([]);
    const navigate = useNavigate();

    const fetchCustomers = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/customers');
            setCustomers(response.data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    const deleteCustomer = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:5000/customers/${id}`);
            fetchCustomers();
        } catch (error) {
            console.error('Error deleting customer:', error);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    return (
        <Container>
            <Row>
                <Col>
                    <h2 className='mt-3 mb-3 text-center'>Customers</h2>
                    <ListGroup>
                        {customers.map(customer => (
                            <ListGroup.Item key={customer.id} className='d-flex justify-content-between align-items-center shadow-sm p-3 mb-3 bg-white rounded'>
                                {customer.name}
                                <div>
                                    <Button variant='info' onClick={() => navigate(`/edit-customer/${customer.id}`)} className='me-2'>Edit</Button>
                                    <Button variant='danger' onClick={() => deleteCustomer(customer.id)}>Delete</Button>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
};

CustomerDetails.propTypes = {
    customers: array,
    onEditCustomer: func,
    onCustomerDelete: func
}

export default CustomerDetails;