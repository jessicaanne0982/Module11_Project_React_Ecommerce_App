import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Modal, Spinner, FormSelect } from 'react-bootstrap';
import axios from 'axios';

const OrderForm = () => {
    const [order, setOrder] = useState({ customer_id: '', products: [] });
    const [customers, setCustomers] = useState([]);
    const [products, setProducts ] = useState([]);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setSubmitting] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/customers')
        .then(response => setCustomers(response.data))
        .catch(error => setErrorMessage(error.message));

        axios.get('http://127.0.0.1:5000/products')
        .then(response => setProducts(response.data))
        .catch(error => setErrorMessage(error.message));
    }, []);

    const validateForm = () => {
        let errors = {};
        if (!order.customer_id) errors.customer_id = 'Customer is required';
        if (!order.products.length === 0) errors.products = 'Order must contain at least one product';
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) return;
        setSubmitting(true);
        try {
            const formattedProducts = order.products.map(productId => ({
                product_id: parseInt(productId), 
                quantity:  1
            }));
    
            const orderData = {
                customer_id: order.customer_id,
                products: formattedProducts 
            };

            console.log("Sending Order data:", orderData) // DELETE AFTER DEBUGGING

            await axios.post('http://127.0.0.1:5000/orders', orderData);
            setShowSuccessModal(true);
        
        } catch (error) {
            setErrorMessage(error.message);
            if (error.response) {
                console.error('Error Response:', error.response);  // backend (status, data)  DELETE THESE WHEN WORKING!!!
            } else if (error.request) {
                console.error('Error Request:', error.request);  // THIS IS THE ERROR I'M RECEIVING
            } else {
                console.error('General Error:', error.message);  
            }
        } finally {
            setSubmitting(false);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setOrder(prevOrder => ({
            ...prevOrder,
            [name]: value
        }));
    };

    const handleProductChange = (event) => {
        const { options } = event.target;
        const selectedProducts = Array.from(options)
            .filter(option => option.selected)
            .map(option => option.value);
        setOrder(prevOrder => ({
            ...prevOrder,
            products: selectedProducts
        }));
    };

    const handleClose = () => {
        setShowSuccessModal(false);
        setOrder({ name: '', products: [] });
        setSubmitting(false);
        navigate('/orders');
    };

    if (isSubmitting) return <p>Submitting order... </p>;

    return (
        <>
            <Form className='mx-auto mt-5 p-3 w-75 shadow' onSubmit={handleSubmit}>
                <h2 className='mt-3 mb-3 text-center'>Create Order </h2>
                {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}

                <Form.Group className='p-3 mb-2 bg-white rounded' controlId='OrderCustomer'>
                    <Form.Label>Customer:</Form.Label>
                    <Form.Control
                        as='select'
                        name='customer_id'
                        value={order.customer_id}
                        onChange={handleChange}
                        isInvalid={!!errors.customer_id}
                    >
                    <option value=''>Select Customer</option>
                    {customers.map(customer => (
                        <option key={customer.id} value={customer.id}>
                            {customer.name}
                        </option>
                    ))}
                    </Form.Control>
                    <Form.Control.Feedback type='invalid'>
                        {errors.name}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className='p-2 mb-2 bg-white rounded' controlId='orderProducts'>
                    <Form.Label>Products:</Form.Label>
                    <Form.Control
                        as='select'
                        multiple
                        name='products'
                        value={order.products}
                        onChange={handleProductChange}
                        isInvalid={!!errors.products}
                    >

                    {products.map(product => (
                        <option key={product.id} value={product.id}>
                            {product.name} - ${product.price}
                        </option>
                    ))}
                    </Form.Control>
                    <Form.Control.Feedback type='invalid'>
                        {errors.products}
                    </Form.Control.Feedback>
                </Form.Group>

                <Button className='d-grid gap-2 col-3 mx-auto mb-2' variant='info' type='submit' disabled={isSubmitting}>
                    {isSubmitting ? <Spinner as="span" animation='grow' size='sm' variant='info' /> : 'Submit'}
                </Button>
            </Form>

            <Modal show={showSuccessModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>Order has been successfully entered!</Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default OrderForm;