import { array, func } from 'prop-types';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Table, Modal } from 'react-bootstrap';
import axios from 'axios';

const CustomerDetails = () => {
    const [customers, setCustomers] = useState([]);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
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
            setShowSuccessModal(true);
        } catch (error) {
            console.error('Error deleting customer:', error);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleClose = () => {
        setShowSuccessModal(false);
        navigate('/customers');
    };

    return (
        <>
            <Container>
                <h2 className='mt-3 mb-3 text-center'>Customers</h2>
                <Table bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map(customer => (
                            <tr key={customer.id}>
                                <td>{customer.name}</td>
                                <td>{customer.email}</td>
                                <td>{customer.phone}</td>
                                <td className="d-flex justify-content-center align-items-center">
                                    <Button variant="info" onClick={() => navigate(`/edit-customer/${customer.id}`)} className="gap-5 col-3 mx-auto mb-2">
                                        Edit
                                    </Button>
                                    <Button variant="danger" onClick={() => deleteCustomer(customer.id)} className="mx-auto gap-5 col-3 mx-auto mb-2">
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>

            <Modal show={showSuccessModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>Customer has been successfully deleted!</Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>   
    );
};

CustomerDetails.propTypes = {
    customers: array,
    onEditCustomer: func,
    onCustomerDelete: func
}

export default CustomerDetails;