
// MyNavbar.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar, Dropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import cartLogo from './icons/cart-logo.svg';
import { useCart } from './Cart/CartContext';
import "./Navbar.css";
import BannerLeftSection from './Login/BannerLeftSection';
import { getAuth, signOut } from 'firebase/auth';
import userAvatar from './icons/user-avatar.png';

function MyNavbar({ isAuthenticated }) {
  const { cartItems } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const auth = getAuth();

  const openModal = (content) => {
    setShowModal(true);
    setModalContent(content);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalContent(null);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('User logged out successfully');
      })
      .catch((error) => {
        console.error('Error occurred during logout:', error);
      });
  };

  return (
    <>
      <Navbar fixed="top" expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand as={Link} to="/"><span className="logo">24x7 Patholabs</span></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="mx-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <div className="d-flex justify-content-center align-items-center mx-5" style={{ gap: '100px' }}>
                <LinkContainer to="/" exact>
                  <Nav.Link className="nav-link-custom">Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/about">
                  <Nav.Link className="nav-link-custom">About Us</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/contact">
                  <Nav.Link className="nav-link-custom">Contact Us</Nav.Link>
                </LinkContainer>
              </div>
            </Nav>

            <Nav className="ms-auto align-items-center mx-2">
              {isAuthenticated ? (
                <Dropdown align="end">
                  <Dropdown.Toggle variant="link" id="dropdown-basic">
                    <img src={userAvatar} alt="User Avatar" className="avatar d-inline-block align-top me-2 mt-2 mx-2" height="30"
                      width="30" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/profile">My Profile</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/orders">Orders</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <>
                  <Nav.Link onClick={() => openModal('login')} className="nav-link-custom">Login</Nav.Link>
                  <span className=" d-lg">|</span>
                  <Nav.Link onClick={() => openModal('signup')} className="nav-link-custom">Sign Up</Nav.Link>
                </>
              )}
              <div className="position-relative ms-2 mx-3">
                <Link to="/cart" className="d-flex align-items-center text-decoration-none">
                  <img
                    src={cartLogo}
                    alt="Cart Logo"
                    height="30"
                    width="30"
                    className="d-inline-block align-top me-2 mt-2 mx-2"
                  />
                  {cartItems.length > 0 && (
                    <span className="cart-badge position-absolute top-0 start-100 translate-middle badge mx-1" style={{
                      fontSize: '0.9rem', backgroundColor: '#ff6f61', boxShadow: '0 0 1px #333', borderRadius: '5px'
                    }}>
                      {cartItems.length}
                    </span>
                  )}
                </Link>
              </div>
              <Nav.Link as={Link} to="/help" className="nav-link-custom ms-2 mx-3">Need Help?</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <BannerLeftSection
        show={showModal}
        handleClose={closeModal}
        modalContent={modalContent}
        />
    </>
  );
}

export default MyNavbar;

