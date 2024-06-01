
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Image } from 'react-bootstrap';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';

import './navbar.css'
function NavBar() {
  return (


<Navbar expand="sm" className="bg-body-tertiary mx-auto flex-column flex-sm-row " data-bs-theme="dark">
<Container className="list-view-container ">

   
    <Nav variant="pills" className="mx-auto ms-1 flex-column flex-sm-row  ">

            <Nav.Item>
            <Nav.Link className="tabs ms-2 ps-3 mb-1 pe-4 me-2" href="/MapSpaceOld">  VIEW  </Nav.Link>
            </Nav.Item>
       
            <Nav.Item>
            <Nav.Link className="tabs ms-2 ps-3 pb-1 mb-0 me-0 pe-2" href="/DirectionsList">  LIST  </Nav.Link>
            </Nav.Item>
    </Nav>

            <Nav.Item>
            <Nav.Link className="tabsedit ms-4 mb-0 mt-5 pt-0 pb-0 me-0" href="/EditRoute">edit</Nav.Link>
            </Nav.Item>
          
            <Navbar.Brand className=" pink mb-4 me-0 pe-0" href="/CreateRoute"> 
        <Image src="/smart_route_small_logo.png" alt="SmartRoute" style={{ height: '40px' }} />
            </Navbar.Brand>
        
</Container>
</Navbar>
);
}

export default NavBar;