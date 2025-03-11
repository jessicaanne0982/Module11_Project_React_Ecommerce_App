import { Image, Container, Row, Col, Button } from 'react-bootstrap';

function HomePage() {
    return (
        <Container style={{ minHeight: '100vh' }}>
            <Image src="src/assets/home-page-img.png" className="d-block mx-auto p-5"alt="Image of a stop sign" fluid />
            <Row>
                <Col className="text-center">
                    <h2 className="display-6">Welcome!</h2>
                    <p className="lead">The E-Commerce Application is your one-stop <br />
                        destination for all you gym apparel needs
                    </p>
                </Col>
            </Row>
            
        </Container>
    )
}

export default HomePage;