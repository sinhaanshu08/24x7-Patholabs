import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import myconsultations from '../icons/my-consultations-icon.svg';
import { useNavigate } from 'react-router-dom';

const OrderSummary = () => {
    // Retrieve data from localStorage
    const storedData = JSON.parse(localStorage.getItem('orderData'));
    const navigate = useNavigate();

    // Destructure the stored data safely to prevent errors if it's undefined
    const { selectedPatient, selectedDate, selectedTime, cartItems, priceDetails, isChecked } = storedData || {};

    // Check if any of the required data is missing before rendering
    if (!selectedPatient || !selectedDate || !selectedTime || !cartItems) {
        return <div>Error: Missing data in order summary.</div>;
    }

    // Function to format time with AM/PM indicator
    const formatTime = (timeString) => {
        const time = new Date(`1970-01-01T${timeString}`);
        return time.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    };
    return (
        <div style={{ margin: '100px' }}>
            <Container>
                <Row className="mt-4">
                    <Col>
                        <h4>Order Summary</h4>
                    </Col>
                </Row>
                <Row>
                    <Col md={8}>
                        <Card className="mb-4 shadow-lg border-0" style={{ backgroundColor: 'white' }}>
                            <Card.Header className="text-white text-center" style={{ backgroundColor: '#ff6f61' }}>
                                <h3 className="m-0">Patient Details</h3>
                            </Card.Header>
                            <Card.Body>
                                <Card.Title className="mb-3" >Selected Patient</Card.Title>
                                <Row className="mb-3">
                                    <Col md={6}>
                                        <p><strong>Name:</strong> {selectedPatient.name}</p>
                                    </Col>
                                    <Col md={6}>
                                        <p><strong>Gender:</strong> {selectedPatient.gender}</p>

                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col md={6}>
                                        <p><strong>Email:</strong> {selectedPatient.email}</p>
                                    </Col>
                                    <Col md={6}>
                                        <p><strong>Age:</strong> {selectedPatient.age}</p>
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col md={6}>
                                        <p><strong>Contact Number:</strong> {selectedPatient.contactNumber}</p>
                                    </Col>
                                    <Col md={6}>
                                        <p><strong>Address:</strong> {selectedPatient.address}</p>
                                    </Col>
                                </Row>
                                <Card.Title className="mb-3">Selected Date and Time</Card.Title>
                                <Row>
                                    <Col md={6}>
                                        <p><strong>Date:</strong> {selectedDate}</p>
                                    </Col>
                                    <Col md={6}>
                                        <p><strong>Time:</strong> {formatTime(selectedTime)}</p>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} style={{ backgroundColor: '#f8f8f8' }}>
                        <Row>
                            <Col md={12}>
                                <h4>Price Details</h4>

                                <Card className="mb-4" style={{ backgroundColor: '#fff' }}>
                                    <Card.Body>
                                        <Row>
                                            <Col md={12}>
                                                <div style={{ display: 'flex', alignItems: 'center', fontWeight: '500' }}>
                                                    <p>M.R.P. Total</p>
                                                    <div style={{ flex: 1, textAlign: 'right' }}>
                                                        <p>₹{priceDetails.totalMRPTotal}</p>
                                                    </div>
                                                </div>
                                                {priceDetails.totalPriceDiscount > 0 && (
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <p>Price Discount</p>
                                                        <div style={{ flex: 1, textAlign: 'right' }}>
                                                            <p>- ₹{priceDetails.totalPriceDiscount}</p>
                                                        </div>
                                                    </div>
                                                )}
                                                {isChecked && (
                                                    <div style={{ display: 'flex', alignItems: 'center', fontWeight: '600', borderTop: '1px solid #eee', borderBottom: '1px solid #eee' }}>
                                                        <p className='mt-2'>Hard copy of reports</p>
                                                        <div style={{ flex: 1, textAlign: 'right' }}>
                                                            <p>₹{priceDetails.hardCopyAmount}</p>
                                                        </div>
                                                    </div>
                                                )}
                                                <div className='mt-2' style={{ display: 'flex', alignItems: 'center' }}>
                                                    <p><b>TO BE PAID</b></p>
                                                    <div style={{ flex: 1, textAlign: 'right' }}>
                                                        <p>₹{priceDetails.totalToBePaid}</p>
                                                    </div>
                                                </div>
                                                {priceDetails.totalPriceDiscount > 0 && (
                                                    <div style={{
                                                        display: 'flex', alignItems: 'center', backgroundColor: '#e4f8e9', marginLeft: '-31px',
                                                        marginRight: '-31px',
                                                        marginBottom: '-24px', borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px'
                                                    }}>
                                                        <p style={{ marginLeft: '32px', marginTop: '3px' }}>Total Savings <span style={{ color: '#1aab2a', fontWeight: '700', fontSize: '18px', marginLeft: '5px' }}>₹{priceDetails.totalSavings}</span></p>
                                                    </div>
                                                )}
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={12}>
                                <Button className='w-100 add-to-cart mb-3' variant="primary" style={{}}>Checkout</Button>

                                <Button className='w-100 mb-4' variant="secondary" style={{}} onClick={() => navigate(-1)}>Back</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col md={8}>
                        <Card className="mb">
                            <div style={{ padding: '20px', backgroundColor: '#fffcf8 ', margin: '-8px -15px 0 -15px', borderTopLeftRadius: '5px', borderTopRightRadius: '5px', fontWeight: 500 }}>
                                PATHOLABS TESTS ({cartItems.length})
                                <Card.Title style={{ marginBottom: 0, marginTop: 15, fontSize: 25 }}>24x7 Patholabs</Card.Title>
                            </div>
                            <Card.Body>
                                <div style={{ fontSize: '18px' }}>
                                    {cartItems.map((item, index) => (
                                        <div key={index}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <p><b>{item.packageName}</b></p>
                                                <div style={{ flex: 1, textAlign: 'right' }}>
                                                    <p><b>₹{item.payableAmount}</b> </p>
                                                </div>
                                            </div>
                                            {item.discountPercent > 0 && (
                                                <div style={{ marginTop: '-12px', flex: 1, textAlign: 'right', textDecoration: 'line-through', color: '#757575' }}>
                                                    <p><b>₹{item.totalAmount}</b> </p>
                                                </div>
                                            )}

                                            <hr />
                                        </div>
                                    ))}
                                </div>
                                <div style={{ color: "#997b3d", backgroundColor: 'rgba(247, 182, 50, .2)', margin: '0px -31px -24px -31px', borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px', display: 'flex', alignItems: 'center' }}>
                                    <p style={{ marginLeft: '40px', textAlign: 'center', marginTop: "10px" }}><img className="mx-1 mb-1" src={myconsultations} alt="myconsultations" /></p>
                                    <div style={{ display: 'flex', flexDirection: 'row', gap: '50px', marginTop: "10px" }}>
                                        <p><b>Consult a Doctor FREE with this order!</b></p>
                                        <p>You can consult online once your test report is generated</p>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>


                </Row>
            </Container>
        </div>
    );
};

export default OrderSummary;
