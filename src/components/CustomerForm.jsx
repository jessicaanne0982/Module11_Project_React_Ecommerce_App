import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Modal, Spinner } from 'react-bootstrap';
import { object, func } from 'prop-types';
import axios from 'axios';

const CustomerForm = () => {
    const [customer, setCustomer] = useState({ name: '', email: '', phone: '' });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setSubmitting] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            axios.get(`http://127.0.0.1:5000/customers/${id}`)
                .then(response => {
                    setCustomer(response.data);
                })
                .catch(error => setErrorMessage(error.message));
        }
    }, [id]);

    const validateForm = () => {
        let errors = {};
        if (!customer.name) errors.name = 'Customer name is required';
        if (!customer.email) errors.email = 'Customer email is required';
        if (!customer.phone) errors.phone = 'Customer phone is required';
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) return;
        setSubmitting(true);
        try {
            if (id) {
                await axios.put(`http://127.0.0.1:5000/customers/${id}`, customer);
            } else {
                await axios.post('http://127.0.0.1:5000/customers', customer);
            }
            setShowSuccessModal(true);
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCustomer(prevCustomer => ({
            ...prevCustomer,
            [name]: value
        }));
    };

    const handleClose =() => {
        setShowSuccessModal(false);
        setCustomer({name: '', email: '', phone: '' });
        setSubmitting(false);
        navigate('/customers');
    };

    if (isSubmitting) return <p>Submitting customer data...</p>;

    return (
        <>
            <Form className='mx-auto mt-5 p-3 w-75 shadow' onSubmit={handleSubmit}>
                <h2 className='mt-3 mb-3 text-center'>{id ? 'Edit' : 'Add'} Customer</h2>
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                <Form.Group className='p-3 mb-2 bg-white rounded' controlId="customerName">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control
                        type='text'
                        name='name'
                        value={customer.name}
                        onChange={handleChange}
                        isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.name}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className='p-3 mb-2 bg-white rounded' controlId="customerEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        type='email'
                        name='email'
                        value={customer.email}
                        onChange={handleChange}
                        isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.email}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className='p-3 mb-2 bg-white rounded' controlId="customerPhone">
                    <Form.Label>Phone:</Form.Label>
                    <Form.Control
                        type='tel'
                        name='phone'
                        value={customer.phone}
                        onChange={handleChange}
                        isInvalid={!!errors.phone}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.phone}
                    </Form.Control.Feedback>
                </Form.Group>

                <Button className='d-grid gap-2 col-3 mx-auto mb-2' variant='info' type='submit' disabled={isSubmitting}>
                    {isSubmitting ? <Spinner as="span" animation='grow' size='sm' variant='info'/> : 'Submit'}
                </Button>
            </Form>

            <Modal show={showSuccessModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>Customer has successfully been {id ? 'updated' : 'added'}!</Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

CustomerForm.propTypes = {
    selectedCustomer: object,
    onCustomerUpdated: func
}

export default CustomerForm;