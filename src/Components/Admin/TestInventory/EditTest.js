import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Row, Col, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { db } from '../../../Firebase/Firebase'; // Import update from Firebase.js
import { useNavigate, useLocation } from 'react-router-dom';
import { ref, update } from 'firebase/database';
function EditTest() {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = location.state?.testPackage; // Retrieve ID from location.state
    console.log(location)
    const handleNavigation = () => {
        navigate('/admin/dashboard/test-inventory');
    };
    const [packageName, setPackageName] = useState('');
    const [reportTime, setReportTime] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedTestFor, setSelectedTestFor] = useState([]);
    const [sampleRequired, setSampleRequired] = useState([]);
    const [newSample, setNewSample] = useState('');
    const [testDetails, setTestDetails] = useState([]);
    const [newTestName, setNewTestName] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [testPreparation, setTestPreparation] = useState('');
    const [totalAmount, setTotalAmount] = useState(0);
    const [discountPercent, setDiscountPercent] = useState('0');
    const [payableAmount, setPayableAmount] = useState(0);
    const [editingIndex, setEditingIndex] = useState(-1);
    useEffect(() => {
        const testPackage = location.state?.testPackage;
        if (testPackage) {
            // Set state values with test package details
            setPackageName(testPackage.packageName);
            setReportTime(testPackage.reportTime);
            setSelectedCategory(testPackage.selectedCategory);
            setSelectedTestFor(testPackage.selectedTestFor);
            setSampleRequired(testPackage.sampleRequired);
            setTestDetails(testPackage.testDetails);
            setTotalAmount(testPackage.totalAmount);
            setTestPreparation(testPackage.testPreparation);
            setDiscountPercent(testPackage.discountPercent);
            setPayableAmount(testPackage.payableAmount);
            console.log(testPackage)
        }
    }, [location.state]);
    const categories = [
        'Full Body Check Up',
        'Fever',
        'Women Health',
        'Diabetes',
        'Fitness',
        'Covid 19',
        'Senior Citizen',
        'Lifestyle Habits'
    ];
    useEffect(() => {
        calculatePayableAmount(totalAmount, discountPercent);
    }, [totalAmount, discountPercent]);
    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };
    const handleTestForChange = (e) => {
        const value = e.target.value;
        if (selectedTestFor.includes(value)) {
            setSelectedTestFor(selectedTestFor.filter(item => item !== value));
        } else {
            setSelectedTestFor([...selectedTestFor, value]);
        }
    };
    const handleAddTest = () => {
        let errorMessage = '';
        if (!newTestName) {
            errorMessage = 'Please enter a test name.';
        } else if (!newDescription) {
            errorMessage = 'Please enter a description.';
        } else if (!newPrice) {
            errorMessage = 'Please enter a price.';
        } else if (!packageName) {
            errorMessage = 'Please enter a package name.';
        } else if (selectedCategory === '') {
            errorMessage = 'Please select a category.';
        } else if (selectedTestFor.length === 0) {
            errorMessage = 'Please select at least one test for.';
        } else if (sampleRequired.length === 0) {
            errorMessage = 'Please add sample required for the test.';
        }
        if (errorMessage) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: errorMessage,
                confirmButtonText: 'OK'
            });
        } else {
            const updatedTests = [...testDetails];
            if (editingIndex === -1) {
                const newTest = {
                    testName: newTestName,
                    description: newDescription,
                    price: parseFloat(newPrice),
                };
                updatedTests.push(newTest);
                setTestDetails(updatedTests);
                setNewTestName('');
                setNewDescription('');
                setNewPrice('');
                calculateTotalAmount(updatedTests);
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Test added successfully!',
                    confirmButtonText: 'OK'
                });
            } else {
                updatedTests[editingIndex] = {
                    testName: newTestName,
                    description: newDescription,
                    price: parseFloat(newPrice),
                };
                setEditingIndex(-1);
                setTestDetails(updatedTests);
                setNewTestName('');
                setNewDescription('');
                setNewPrice('');
                calculateTotalAmount(updatedTests);
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Test updated successfully!',
                    confirmButtonText: 'OK'
                });
            }
        }
    };
    const handleEditTestPackage = async () => {
        let errorMessage = '';
        if (!id) {
            errorMessage = 'Package ID not found.';
            console.log(errorMessage);
            return;
        }
        // Defensive check for other variables
        if (!packageName || packageName.trim() === '') {
            errorMessage = 'Please enter a package name.';
        } else if (!reportTime || reportTime.trim() === '') {
            errorMessage = 'Please enter the estimated report time.';
        } else if (selectedCategory === '') {
            errorMessage = 'Please select a category.';
        } else if (selectedTestFor.length === 0) {
            errorMessage = 'Please select at least one test for.';
        } else if (sampleRequired.length === 0) {
            errorMessage = 'Please add sample required for the test.';
        } else if (!testPreparation || testPreparation.trim() === '') {
            errorMessage = 'Please enter test preparation details.';
        }
        if (errorMessage) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: errorMessage,
                confirmButtonText: 'OK'
            });
        } else {
            // Update test package details
            try {
                const updatedPackageData = {
                    packageName,
                    reportTime,
                    selectedCategory,
                    selectedTestFor,
                    sampleRequired,
                    testDetails,
                    totalAmount,
                    testPreparation,
                    discountPercent,
                    payableAmount,
                };
                // Update the test package in the database using the package ID or any other identifier
                // Example: await update(ref(db, `testPackages/${packageId}`), updatedPackageData);
                // await update(ref(db, `testPackages/${packageId}`), updatedPackageData);
                // Cap payableAmount at totalAmount

                const payable = payableAmount > totalAmount ? totalAmount : payableAmount;

                updatedPackageData.payableAmount = payable;
                await update(ref(db, `testPackages/${id}`), updatedPackageData);
                // Success message
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Test package updated successfully!',
                    confirmButtonText: 'OK'
                });
                handleNavigation();
            } catch (error) {
                // Error handling
                console.error('Error updating package: ', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to update test package. Please try again later.',
                    confirmButtonText: 'OK',
                });
            }
        };
    }
    const handleRemoveTest = (index) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to remove this test?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, remove it!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedTests = [...testDetails];
                updatedTests.splice(index, 1);
                setTestDetails(updatedTests);
                calculateTotalAmount(updatedTests);
                calculatePayableAmount(totalAmount, discountPercent); // Recalculate payable amount
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Test removed successfully!',
                    confirmButtonText: 'OK'
                });
            }
        });
    };
    const calculateTotalAmount = (tests) => {
        let total = 0;
        tests.forEach(test => {
            total += test.price;
        });
        setTotalAmount(total);
    };
    const calculatePayableAmount = (totalAmount, discountPercent) => {
        const discount = parseFloat(discountPercent);
        // If discount percentage is empty or invalid, set it to 0
        const validDiscount = discount >= 0 && discount <= 100 ? discount : 0;
        const discountAmount = (totalAmount * validDiscount) / 100;
        const payable = totalAmount - discountAmount;
        setPayableAmount(payable >= 0 ? payable : 0);
    };
    const handleEditTest = (index) => {
        const test = testDetails[index];
        setEditingIndex(index); // Set the editing index
        setNewTestName(test.testName);
        setNewDescription(test.description);
        setNewPrice(test.price.toString());
    };
    const handleClear = () => {
        setNewTestName('');
        setNewDescription('');
        setNewPrice('');
        setEditingIndex(-1);
    };
    const handleAddSampleRequired = () => {
        if (newSample) {
            setSampleRequired([...sampleRequired, newSample]);
            setNewSample(''); // Clear input field after adding
        }
    };
    const handleRemoveSample = (index) => {
        const updatedSampleRequired = [...sampleRequired];
        updatedSampleRequired.splice(index, 1);
        setSampleRequired(updatedSampleRequired);
    };
    const handleDiscountChange = (e) => {
        const discount = e.target.value.trim() === '' ? 0 : parseFloat(e.target.value);
        // Only allow numbers and decimal numbers
        const validDiscount = /^\d*\.?\d*$/.test(e.target.value) ? discount : 0;
        // Show message if discount is greater than 100
        if (validDiscount > 100) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Discount percentage cannot be greater than 100.',
                confirmButtonText: 'OK',
            });
        } else {
            setDiscountPercent(validDiscount);
            calculatePayableAmount(totalAmount, validDiscount);
        }
    };
    return (
        <div className="page-container">
            <main className="main-content">
                <div className="page-header">
                    <h3>Edit Test Package</h3>
                </div>
                <div className="edit-test-form">
                    <Card>
                        <Card.Body>
                            <Form>
                                <Row className="mb-3">
                                    <Col>
                                        <Form.Group controlId="packageName">
                                            <Form.Label>Package Name:</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={packageName}
                                                onChange={(e) => setPackageName(e.target.value)}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="reportTime">
                                            <Form.Label>Estimated Report Time:</Form.Label>
                                            <Form.Label className="mx-2" style={{ fontSize: '12px' }}>
                                                e.g.: 24 hour/ 2-3 days
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={reportTime}
                                                onChange={(e) => setReportTime(e.target.value)}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <Form.Group controlId="category">
                                            <Form.Label>Category:</Form.Label>
                                            <Form.Control
                                                as="select"
                                                value={selectedCategory}
                                                onChange={handleCategoryChange}
                                                required
                                            >
                                                <option value="">Select Category</option>
                                                {categories.map((category, index) => (
                                                    <option key={index} value={category}>{category}</option>
                                                ))}
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Test For:</Form.Label>
                                            <div>
                                                <Form.Check
                                                    inline
                                                    label="Male"
                                                    type="checkbox"
                                                    id="maleCheckbox"
                                                    value="Male"
                                                    checked={selectedTestFor.includes("Male")}
                                                    onChange={handleTestForChange}
                                                />
                                                <Form.Check
                                                    inline
                                                    label="Female"
                                                    type="checkbox"
                                                    id="femaleCheckbox"
                                                    value="Female"
                                                    checked={selectedTestFor.includes("Female")}
                                                    onChange={handleTestForChange}
                                                />
                                            </div>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <Form.Group controlId="sampleRequired">
                                            <Form.Label>Sample Required for Test:</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Add Sample"
                                                value={newSample}
                                                onChange={(e) => setNewSample(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <div className="mt-4">
                                            <Button className="me-2" onClick={handleAddSampleRequired}>Add</Button>
                                            <Button variant="secondary" onClick={() => setNewSample('')}>Clear</Button>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <div className="d-flex flex-wrap">
                                            {sampleRequired.map((sample, index) => (
                                                <div key={index} className="d-flex align-items-center mb-2 me-2">
                                                    <span className="me-2">{sample}</span>
                                                    <Button variant="danger" size="sm" onClick={() => handleRemoveSample(index)}>Remove</Button>
                                                </div>
                                            ))}
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>Sr No.</th>
                                                    <th>Test Name</th>
                                                    <th>Description</th>
                                                    <th>Price</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {testDetails.map((test, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{test.testName}</td>
                                                        <td>{test.description}</td>
                                                        <td>{test.price}</td>
                                                        <td>
                                                            <div className="d-flex" style={{ textAlign: 'center' }}>
                                                                <Button variant="primary" size="sm" onClick={() => handleEditTest(index)}>Edit</Button>
                                                                <Button variant="danger" size="sm" className="ms-2" onClick={() => handleRemoveTest(index)}>Remove</Button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <Form.Group controlId="newTestName">
                                            <Form.Label>Test Name:</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={newTestName}
                                                onChange={(e) => setNewTestName(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Row className="mb-3">
                                        <Col>
                                            <Form.Group controlId="newDescription">
                                                <Form.Label>Description:</Form.Label>
                                                <Form.Control
                                                    as="textarea" 
                                                    rows={3} // 
                                                    value={newDescription}
                                                    onChange={(e) => setNewDescription(e.target.value)}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Col>
                                        <Form.Group controlId="newPrice">
                                            <Form.Label>Price:</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={newPrice}
                                                onChange={(e) => setNewPrice(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col>
                                        <Button className="me-2 mt-4" onClick={handleAddTest}>{editingIndex === -1 ? 'Add' : 'Update'}</Button>
                                        <Button variant="secondary mt-4" onClick={handleClear}>Clear</Button>
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <Form.Group controlId="totalAmount">
                                            <Form.Label>Total Amount:</Form.Label>
                                            <Form.Control type="number" value={totalAmount} onChange={(e) => setTotalAmount(e.target.value)} disabled />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="discountPercent">
                                            <Form.Label>Discount %:</Form.Label>
                                            <Form.Control type="number" value={discountPercent} onChange={handleDiscountChange} min="0" max="100" />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="payableAmount">
                                            <Form.Label>Payable Amount:</Form.Label>
                                            <Form.Control type="number" value={payableAmount} disabled />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <Form.Group controlId="testPreparation">
                                            <Form.Label>Test Preparation:</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={3}
                                                value={testPreparation}
                                                onChange={(e) => setTestPreparation(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Button type="button" variant='success' className="me-3" disabled={testDetails.length === 0} onClick={handleEditTestPackage}>Update</Button>
                                <Button type="button" variant='secondary' onClick={handleNavigation}>Cancel</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </main>
        </div>
    );
}
export default EditTest;