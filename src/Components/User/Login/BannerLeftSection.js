
// BannerLeftSection.js
import React, { useState, useEffect } from "react";
import { Modal, Container, Row, Col, Carousel } from 'react-bootstrap';
import "./Login.css";
import knowYourLabTestsImage from '../icons/Know Your Lab Tests.png';
import fastAndReliableResultsImage from '../icons/Fast and Reliable Results.png';
import labTestsAtHomeImage from '../icons/Lab-Tests-at-Home.png';
import Login from './Login'; // Import the Login component
import Signup from '../Signup/Signup'; // Import the Signup component

function BannerLeftSection({ show, handleClose, modalContent }) {
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showSignupForm, setShowSignupForm] = useState(false);

    useEffect(() => {
        if (modalContent === 'login') {
            setShowLoginForm(true);
            setShowSignupForm(false);
        } else if (modalContent === 'signup') {
            setShowLoginForm(false);
            setShowSignupForm(true);
        }
    }, [modalContent]);

    const handleShowLoginForm = () => {
        setShowLoginForm(true);
        setShowSignupForm(false);
    };

    const handleShowSignupForm = () => {
        setShowLoginForm(false);
        setShowSignupForm(true);
    };

    return (
        <Modal show={show} onHide={handleClose} centered size="xl">
            <Modal.Body style={{ padding: '70px' }}>
                <Container fluid>
                    <Row>
                        <Col md={6} className="left-section">
                            <Carousel interval={3000} pause={false} className="scrollable-images" controls={false} indicators={true}>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100 active"
                                        src={labTestsAtHomeImage}
                                        alt="Lab Tests at Home"
                                        style={{ width: '100%', height: '400px' }} // Fixed width and height for carousel images
                                    />
                                    <Carousel.Caption style={{ color: 'black' }}>
                                        <div className="mt-4">
                                            <h4>Lab Tests at Home</h4>
                                            <p>Book any test from any lab. We'll collect the sample and send the reports. Save up to 80% every time.</p>
                                        </div>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src={knowYourLabTestsImage}
                                        alt="Know Your Lab Tests"
                                        style={{ width: '100%', height: '400px' }} // Fixed width and height for carousel images
                                    />
                                    <Carousel.Caption style={{ color: 'black' }}>
                                        <div className="mt-4">
                                            <h4>Know Your Lab Tests</h4>
                                            <p>View information about various lab tests, including their procedures, importance, and results interpretation.</p>
                                        </div>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src={fastAndReliableResultsImage}
                                        alt="Fast and Reliable Results"
                                        style={{ width: '100%', height: '400px' }} // Fixed width and height for carousel images
                                    />
                                    <Carousel.Caption style={{ color: 'black' }}>
                                        <div className="mt-4">
                                            <h5>Fast and Reliable Results</h5>
                                            <p>Get your lab test results quickly and securely. Our advanced processing techniques ensure accurate and reliable results delivered to you in no time.</p>
                                        </div>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            </Carousel>
                        </Col>
                        <Col md={6} className="right-section">
                            <div className="line"></div>
                            <div className="login-section">
                                <Modal.Header closeButton style={{ border: 'none' }}>
                                    {/* Close button */}
                                </Modal.Header>
                                {/* Render login or signup component based on modalContent prop */}
                                {showLoginForm ? (
                                    <div>
                                        <Login onHide={handleClose} />
                                        <p className="text-center">New on 24x7 Patholabs?<span onClick={handleShowSignupForm} style={{ color: '#ff6f61', fontWeight: 'bold', cursor: 'pointer' }}> Sign up</span></p>
                                    </div>
                                ) : (
                                    <div>
                                        <Signup onHide={handleClose} />
                                        <p className="text-center">Already have an account? <span onClick={handleShowLoginForm} style={{ color: '#ff6f61', fontWeight: 'bold', cursor: 'pointer' }}> Login</span></p>
                                    </div>
                                )}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
    );
}

export default BannerLeftSection;
