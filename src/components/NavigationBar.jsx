import { NavLink } from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap';

function NavigationBar() {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/" >E-Commerce Web Application</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={NavLink} to="/" activeclassname="active">
                        Home 
                    </Nav.Link>

                    <Nav.Link as={NavLink} to="/customers" activeclassname="active">
                        Customers 
                    </Nav.Link>

                    <Nav.Link as={NavLink} to="/add-customer" activeclassname="active">
                        Add Customer 
                    </Nav.Link> 

                    <Nav.Link as={NavLink} to="/products" activeclassname="active">
                        Products 
                    </Nav.Link>
                    
                    <Nav.Link as={NavLink} to="/add-product" activeclassname="active">
                        Add Products 
                    </Nav.Link>

                    <Nav.Link as={NavLink} to="/orders" activeclassname="active">
                        Orders 
                    </Nav.Link>
                    
                    <Nav.Link as={NavLink} to="/add-order" activeclassname="active">
                        Place Order 
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
};

export default NavigationBar;