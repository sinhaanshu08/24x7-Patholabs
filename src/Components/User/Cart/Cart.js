import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap'; // Import Spinner from react-bootstrap
import { useCart } from './CartContext';
import trash from '../icons/trash.svg';
import myconsultations from '../icons/my-consultations-icon.svg';
import marketing from '../icons/marketing.png';
import noinventoryfound from '../icons/noinventoryfound.svg';
import './Cart.css';
import { getAuth } from 'firebase/auth'; // Import Firebase authentication methods
import BannerLeftSection from './../Login/BannerLeftSection';

import { Link, useNavigate } from 'react-router-dom';


function Cart() {
    const { cartItems, removeFromCart } = useCart();
    const [isChecked, setIsChecked] = useState(() => {

        // Initialize the checkbox state from local storage, default to false if not found

        return localStorage.getItem('hardCopyChecked') === 'true' ? true : false;

    });
    const [loading, setLoading] = useState(true); // State variable for tracking loading state
    const [showLoginModal, setShowLoginModal] = useState(false);
    const navigate = useNavigate();

    const [priceDetails, setPriceDetails] = useState({

        totalMRPTotal: 0,

        totalPriceDiscount: 0,

        totalToBePaid: 0,

        totalSavings: 0,

        hardCopyAmount: 0

    });

    useEffect(() => {
        localStorage.setItem('priceDetails', JSON.stringify(priceDetails));


        const handleBeforeUnload = () => {
            localStorage.removeItem('addedItems');
            localStorage.removeItem('priceDetails');


        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        // Simulate loading delay
        setTimeout(() => {
            setLoading(false);
        }, 1000); // Simulate 2 seconds of loading time

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [cartItems, priceDetails]);

    // Function to check if the user is logged in with a phone number using Firebase
    const handleSchedule = () => {
        const auth = getAuth(); // Get Firebase auth instance
        auth.onAuthStateChanged((user) => { // Check if a user is logged in
            if (user) {
                // User is signed in
                // Check if the user's phone number is verified
                if (user.phoneNumber) {
                    // Phone number is verified
                    // console.log('User is logged in with phone number:', user.phoneNumber);
                    navigate('/patient-detials', { state: { cartItems, priceDetails, isChecked } }); // Pass cart data to patient-details page

                    // Navigate or perform the action
                } else {
                    // Phone number is not verified
                    // console.log('User is not logged in with a verified phone number');
                    // Show login modal
                    setShowLoginModal(true);
                }
            } else {
                // User is signed out
                // console.log('User is not logged in');
                // Show login modal
                setShowLoginModal(true);
            }
        });
    };


    useEffect(() => {

        const updatePriceDetails = () => {
            // Calculate total M.R.P. Total
            const totalMRPTotal = cartItems.reduce((acc, item) => acc + item.totalAmount, 0);

            // Calculate total Price Discount
            const totalPriceDiscount = cartItems.reduce((acc, item) => acc + (item.totalAmount - item.payableAmount), 0);

            // Calculate total To be Paid
            const totalToBePaid = cartItems.reduce((acc, item) => acc + item.payableAmount, 0);

            // Calculate total Savings
            const totalSavings = totalMRPTotal - totalToBePaid;

            // Calculate additional amount for Hard copy of reports
            const hardCopyAmount = isChecked ? 150 : 0;
            setPriceDetails({

                totalMRPTotal,

                totalPriceDiscount,

                totalToBePaid,

                totalSavings,

                hardCopyAmount

            });

        };
        // Save the state of the checkbox to local storage

        localStorage.setItem('hardCopyChecked', isChecked);
        updatePriceDetails();

    }, [cartItems, isChecked,]);
    const handleRemoveFromCart = (itemId) => {
        // Remove the item from the cart
        removeFromCart(itemId);

        // Update the state of the checkbox when an item is removed
        updateHardCopyState();
    };

    const updateHardCopyState = () => {
        // Check if there are any items in the cart that require a hard copy
        const hasHardCopyItem = cartItems.some(item => item.requiresHardCopy);
        setIsChecked(hasHardCopyItem);
    };
    return (
        <div style={{ margin: '100px' }}>
            <Container>
                {loading ? ( // Display loader if loading state is true
                    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                        <section className="sec-loading">
                            <div className="one"></div>
                        </section>
                    </div>
                ) : (
                    <>
                        <Row className="mt-4">
                            <h4>My Cart</h4>
                            <p>{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart</p>
                            {cartItems.length > 0 && (
                                <>
                                    <Col>
                                        <h5>Order Overview</h5>
                                    </Col>
                                    <Col className="text-right">
                                        <Link to="/" style={{ textDecoration: 'none' }}>
                                            <h5><span style={{ color: "#ff6f61", fontWeight: '700' }}>+ ADD MORE TESTS</span></h5>
                                        </Link>
                                    </Col>
                                </>
                            )}
                        </Row>
                        {cartItems.length > 0 ? (
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
                                                        <div style={{ fontSize: '16px', color: '#757575', cursor: 'pointer', fontWeight: '600' }}>
                                                            <span variant="danger" onClick={() => handleRemoveFromCart(item.id)}>
                                                                {<img src={trash} alt="trash" />} Remove</span>
                                                        </div>
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
                                <Col md={4} style={{ backgroundColor: '#f8f8f8' }}>
                                    <Row>
                                        <Col md={12}>
                                            <h4>Price Details</h4>

                                            <Card className="mb-4" style={{ backgroundColor: '#fff' }}>
                                                <Card.Body>
                                                    <Row >
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
                                                                    <p>₹{priceDetails.totalToBePaid + priceDetails.hardCopyAmount}</p>
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
                                            <h4>Value add-ons</h4>
                                            <Card className="mb-4" style={{ backgroundColor: '#fff' }}>
                                                <Card.Body>
                                                    <div style={{ display: 'flex', alignItems: '' }}>
                                                        <div style={{ flex: '0 0 48px', marginRight: '10px' }}>
                                                            <img src={marketing} height="48px" width="48px" alt="marketing" />
                                                        </div>
                                                        <div style={{ flex: '1' }}>
                                                            <p><b>Hard copy of reports</b></p>
                                                            <p>Reports will be delivered within 3-4 working days. Hard copy charges are non-refundable once the reports have been dispatched.</p>
                                                            <p><b>₹150</b> per person</p>
                                                        </div>
                                                        <div style={{ flex: '0 0 24px', fontSize: '24px' }}>
                                                            <Form.Check type="checkbox" style={{ transform: 'scale(1)', marginLeft: '-12px', marginRight: '10px' }} onChange={(e) => setIsChecked(e.target.checked)} checked={isChecked} />
                                                        </div>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col md={12}>
                                            {/* <Link to="/" style={{ textDecoration: 'none'}}> */}
                                            <BannerLeftSection show={showLoginModal} handleClose={() => setShowLoginModal(false)} modalContent="login" />

                                            <Button className='w-100 add-to-cart' variant="primary" style={{}} onClick={handleSchedule}>Schedule</Button>
                                            {/* </Link> */}
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        ) : (
                            <div className="d-flex flex-column justify-content-center align-items-center" style={{ maxHeight: '80vh' }}>
                                <img src={noinventoryfound} alt="noinventoryfound" />
                                <h5>Labs Cart is Empty!</h5>
                                <p>Looks like you have no lab tests in your cart yet.</p>
                                <Link to="/" style={{ textDecoration: 'none' }}>
                                    <Button className='add-to-cart' variant="primary" style={{ width: '500px' }}>ADD TESTS</Button>
                                </Link>
                            </div>
                        )}
                    </>
                )}
            </Container>
        </div>
    );
}

export default Cart;

