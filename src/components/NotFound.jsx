import { NavLink } from "react-router-dom";
import { Nav } from 'react-bootstrap';
import { Image, Container, Row, Col, Button } from 'react-bootstrap';

function NotFound() {
    return (
        <Container style={{ minHeight: '100vh' }}>
            <Image src="src/assets/stop-sign.jpeg" className="w-50 d-block mx-auto p-5"alt="Image of a stop sign" fluid />
            <Row>
                <Col className="text-center">
                    <h2 className="display-6">404 - Not Found</h2>
                    <p className="lead">Sorry, the page you are looking for does not exist.</p>

                    <Nav className="d-flex justify-content-center lead text-decoration-underline">
                        <Nav.Link as={NavLink} to="/" activeclassname="active" >
                            Return to the Home Page 
                        </Nav.Link>
                    </Nav>
                </Col>
            </Row>
            
        </Container>
    )
}

export default NotFound;