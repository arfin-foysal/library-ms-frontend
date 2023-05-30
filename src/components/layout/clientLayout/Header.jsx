import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Header() {
  return (
    <Navbar collapseOnSelect expand="lg" style={{backgroundColor:"#033D75"}} variant="white">
      <Container>
              <Navbar.Brand href="#home">
                  <img
                      alt=""
                      src="./../../../../../src/assets/logo/LbrMS-logo-white.png"
                 
                      className="d-inline-block align-top w-50 "
                  />{' '}
                    {/* <span className='text-white'>Book Store</span> */}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className=' text-white' href="#fetures">Home</Nav.Link>
            <Nav.Link className=' text-white' href="#features">All Books</Nav.Link>
            <Nav.Link className=' text-white'  href="#author">Author</Nav.Link>
            <Nav.Link className=' text-white'    href="#contact">Contact Us</Nav.Link>

          </Nav>
          <Nav.Link className=' text-white' href="#features">Login</Nav.Link>
                  
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}




export default Header;