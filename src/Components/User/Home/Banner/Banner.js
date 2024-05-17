import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Container, Row, Col } from 'react-bootstrap';

import image1 from '../../images/download (1).jpeg';
import image2 from '../../images/download.jpeg';
import image3 from '../../images/images.jpeg';

import safeIcon from '../../images/Safe_76x76_labs.png';
import homeIcon from '../../images/Lab_delivery_2x.png';
import reportIcon from '../../images/Lab_online_report_2x.png';
import doctorIcon from '../../images/Lab_doctor_2x.png';
import offerIcon from '../../images/Lab_offer_2x.png';

function Banner() {
    return (
        <div style={{ backgroundColor:'#EAECEC',width: '100%', minheight:'400px'}}>
            <Container>
                <Row>
                    {/* Carousel Images */}
                    <Col lg={6}>
                        <Carousel interval={3000} pause={false} className="mb-5">
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={image1}
                                    alt="First slide"
                                    style={{ width: '100%', height: '400px' }} // Fixed width and height for carousel images
                                />
                                <Carousel.Caption>
                                    <h3>First slide label</h3>
                                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={image2}
                                    alt="Second slide"
                                    style={{ width: '100%', height: '400px' }} // Fixed width and height for carousel images
                                />
                                <Carousel.Caption>
                                    <h3>Second slide label</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={image3}
                                    alt="Third slide"
                                    style={{ width: '100%', height: '400px' }} // Fixed width and height for carousel images
                                />
                                <Carousel.Caption>
                                    <h3>Third slide label</h3>
                                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>
                    </Col>

                    {/* Features with Images */}
                     <Col lg={6}>
                        <Row className="mt-4 justify-content-center align-items-center">
                            <p  style={{fontSize:'24px', fontWeight:'700', color:'#212121'}}>Lab Test From The Comfort Of Your Home</p>
                            <p style={{fontSize:'16px',color:'#212121'}}>Trusted by 40 Lakhs+ satisfied customers | 1 Crore+ lab tests booked</p>
                        </Row>

                        <div className="features d-flex justify-content-center mt-4">
                            <Row>
                                <Col>
                                    <div className="feature-item text-center">
                                        <img src={safeIcon} className="icon mb-2" alt="Safe Icon" />
                                        <p>100% Safe & Hygienic</p>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="feature-item text-center">
                                        <img src={homeIcon} className="icon mb-2" alt="Home Icon" />
                                        <p>Home Sample Pick Up</p>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="feature-item text-center">
                                        <img src={reportIcon} className="icon mb-2" alt="Report Icon" />
                                        <p>View Reports Online</p>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="feature-item text-center">
                                        <img src={doctorIcon} className="icon mb-1" alt="Doctor Icon" />
                                        <p>Free Doctor Consultation</p>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="feature-item text-center">
                                        <img src={offerIcon} className="icon mb-2" alt="Offer Icon" />
                                        <p>Best Prices Guaranteed</p>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Banner;
