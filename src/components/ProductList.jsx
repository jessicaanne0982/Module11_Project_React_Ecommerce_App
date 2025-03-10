import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Table, Modal } from "react-bootstrap";
import { array, func } from 'prop-types';
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const navigate = useNavigate();

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:5000/products/${id}`);
            fetchProducts();
            setShowSuccessModal(true);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleClose = () => {
        setShowSuccessModal(false);
        navigate('/products');
    };

    return (
        <>
            <Container>
                <h2 className='mt-3 mb-3 text-center'>Products</h2>
                <Table bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Product ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.quantity}</td>
                                <td className="d-flex justify-content-center align-items-center">
                                    <Button variant="info" onClick={() => navigate(`/edit-product/${product.id}`)} className="gap-5 col-3 mx-auto mb-2">
                                        Edit
                                    </Button>
                                    <Button variant="danger" onClick={() => deleteProduct(product.id)} className="gap-5 col-3 mx-auto mb-2">
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
                <Modal.Body>Product has been successfully deleted!</Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>     
        </>
    );
};

ProductList.propTypes = {
    products: array,
    onEditProduct: func,
    onProductDeleted: func
}

export default ProductList;