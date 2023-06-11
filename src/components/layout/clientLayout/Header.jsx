import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { BsCart3 } from "react-icons/bs";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo/LbrMS-logo-white.png";
import avatar from "../../../assets/images/profile-picture.png";
import { BiLogInCircle, BiLogOut } from "react-icons/bi";
import { useState } from "react";

import { Dropdown } from "react-bootstrap";
import { toast } from "react-toastify";
import CartModal from "../../client/views/CartModal";
import { clientLogout } from "../../../features/clientAuthSlice";
import { useDispatch, useSelector } from "react-redux";

function Header() {
  const navigate = useNavigate();

  const authToken = useSelector((state) => state.clientAuth.clientToken);
  const authUser = useSelector((state) => state.clientAuth.clientUser);

  const dispatch = useDispatch();

  const handelLogout = () => {
    dispatch(clientLogout());

    toast.success("Logout Successfully");
    navigate("/");
    window.location.reload(false);
  };

  const [cartShow, setCartShow] = useState(false);
  const cartHandleClose = () => setCartShow(false);
  const cartHandleShow = () => setCartShow(true);

  const borrow = useSelector((state) => state.borrow);

  return (
    <>
      <div className=" sticky-top">

    
      {/* <LoginModal show={show} handleClose={handleClose} /> */}
      <CartModal show={cartShow} handleClose={cartHandleClose} />
      <Navbar
        collapseOnSelect
        expand="lg"
        style={{ backgroundColor: "#033D75" }}
        variant="white"
      >
        <Container>
          <Navbar.Brand>
            <Link to="/">
              <img
                alt=""
                src={logo}
                className="d-inline-block align-top w-50 "
              />
            </Link>

            {/* <span className='text-white'>Book Store</span> */}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NavLink className="text-white mx-2" to="/">
                Home
              </NavLink>
              <NavLink className=" text-white mx-2" to="/allbook">
                All Books
              </NavLink>
              <NavLink className=" text-white mx-2" to="/author">
                Author
              </NavLink>
              <NavLink className=" text-white mx-2" to="/contact">
                Contact Us
              </NavLink>
            </Nav>

            {authToken ? (
              <div>
                <Dropdown>
                  <Dropdown.Toggle
                    variant="white"
                    // className=" border-0"
                    id="dropdown-basic"
                  >
                    {authUser?.image ? (
                      <img
                        className="img-fluid rounded-circle shadow"
                        style={{ width: "30px", height: "30px" }}
                        src={`${import.meta.env.VITE_FILE_URL}${
                          authUser?.image
                        }`}
                        alt=""
                      ></img>
                    ) : (
                      <img
                        className="img-fluid rounded-circle shadow"
                        style={{ width: "30px", height: "30px" }}
                        src={avatar}
                        alt=""
                      ></img>
                    )}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item> {authUser?.name} </Dropdown.Item>
                    <Dropdown.Item > 
                      <Link className="text-dark" to="/client-dashboard">Dashboard</Link>{" "}
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handelLogout()}>
                      <BiLogOut /> Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            ) : (
              <div className="text-white me-3">
                <Link to="/login">
                  Login
                  <BiLogInCircle />
                </Link>
              </div>
            )}

            <div className="mb-1 pointer " onClick={cartHandleShow}>
              <BsCart3 color="white" size={23} />
              <span className="badge bg-danger rounded-circle">
                {borrow?.borrow?.length}
              </span>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
        </div>
    </>
  );
}

export default Header;
